import { findScenario, type ScenarioSourceSeed } from "./fixtures";
import { REDACTION_NOTE } from "../shared/observability";
import type {
  ContextLayer,
  DataContextAction,
  DataContextState,
  DataContextStatus,
  DecisionRecord,
  ObservabilityEvent,
  SourceRecord,
} from "./types";

export function createInitialState(): DataContextState {
  return {
    status: "idle",
    scenarioId: null,
    sources: [],
    contextLayer: null,
    decision: null,
    transitionLog: [],
    runId: "",
    selectionCount: 0,
    error: null,
    events: [],
    runStartedAt: null,
  };
}

let clock: () => number = () => Date.now();

export function setClock(next: () => number): void {
  clock = next;
}

const GOVERNANCE_PENDING_REASON =
  "Scenario selected — sources awaiting normalization and governance.";

function makeRunId(selectionCount: number, scenarioId: string): string {
  return `run-${String(selectionCount).padStart(3, "0")}-${scenarioId}`;
}

function invalidActionNoOpReason(status: DataContextStatus): string {
  switch (status) {
    case "idle":
      return "no active scenario run";
    case "normalizing":
      return 'status "normalizing" — context not yet governed';
    case "governed":
      return 'status "governed" — awaiting DECIDE_ACTION';
    case "decision_taken":
      return 'status "decision_taken" is terminal — run complete';
    case "source_failed":
      return 'status "source_failed" is terminal — RESTART to retry';
  }
}

function parseNormalizedFields(
  raw: string
): Record<string, string> {
  const pairs: Record<string, string> = {};
  for (const segment of raw.split(";")) {
    const separator = segment.indexOf("=");
    if (separator === -1) continue;
    const key = segment.slice(0, separator).trim();
    const value = segment.slice(separator + 1).trim();
    if (key !== "") pairs[key] = value;
  }
  return pairs;
}

function normalizeSources(seeds: ScenarioSourceSeed[]): {
  sources: SourceRecord[];
  contextLayer: ContextLayer;
} {
  const sources: SourceRecord[] = [];
  const fields: Record<string, string> = {};
  let excludedCount = 0;

  for (const seed of seeds) {
    const pairs = parseNormalizedFields(seed.raw);
    const missing = seed.requiresFields.filter(
      (field) => !(field in pairs)
    );

    if (missing.length > 0) {
      excludedCount += 1;
      sources.push({
        name: seed.name,
        raw: seed.raw,
        normalized: null,
        includedInContext: false,
        exclusionReason: `missing required field(s): ${missing.join(", ")}`,
      });
      continue;
    }

    for (const [key, value] of Object.entries(pairs)) {
      fields[key] = value;
    }

    sources.push({
      name: seed.name,
      raw: seed.raw,
      normalized: JSON.stringify(pairs),
      includedInContext: true,
      exclusionReason: null,
    });
  }

  return {
    sources,
    contextLayer: {
      fields,
      completeness: excludedCount === 0 ? "complete" : "partial",
    },
  };
}

function makeEvent(
  state: DataContextState,
  actionType: string,
  decision: string,
  reason: string,
  result: ObservabilityEvent["result"],
  error: string | null
): ObservabilityEvent {
  const now = clock();
  return {
    runId: state.runId,
    decision,
    reason,
    action: actionType,
    result,
    error,
    timingMs: state.runStartedAt === null ? 0 : now - state.runStartedAt,
    redactionNote: REDACTION_NOTE,
  };
}

export function dataContextReducer(
  state: DataContextState,
  action: DataContextAction
): DataContextState {
  switch (action.type) {
    case "SELECT_SCENARIO": {
      const scenario = findScenario(action.scenarioId);

      if (!scenario || action.scenarioId.trim() === "") {
        const reason =
          action.scenarioId.trim() === ""
            ? "empty scenario id"
            : `unknown scenario id "${action.scenarioId}"`;
        return {
          ...state,
          error: `rejected_select:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SELECT_SCENARIO",
              "select_scenario_rejected",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const isDuplicateSelection =
        state.scenarioId === action.scenarioId && state.status !== "idle";

      if (isDuplicateSelection) {
        return {
          ...state,
          error: null,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SELECT_SCENARIO",
              "duplicate_select_ignored",
              `scenario "${action.scenarioId}" already active in this run`,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const selectionCount = state.selectionCount + 1;

      return {
        status: "normalizing",
        scenarioId: scenario.id,
        sources: scenario.sourceSeeds.map((seed) => ({
          name: seed.name,
          raw: seed.raw,
          normalized: null,
          includedInContext: false,
          exclusionReason: null,
        })),
        contextLayer: null,
        decision: null,
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "normalizing",
            reason: GOVERNANCE_PENDING_REASON,
            timestamp: now,
          },
        ],
        runId: makeRunId(selectionCount, scenario.id),
        selectionCount,
        error: null,
        events: [
          ...state.events,
          makeEvent(
            state,
            "SELECT_SCENARIO",
            "select_scenario_accepted",
            `run started for scenario "${scenario.label}"`,
            "accepted",
            null
          ),
        ],
        runStartedAt: now,
      };
    }

    case "CONFIRM_GOVERNANCE": {
      if (state.status !== "normalizing") {
        const reason = invalidActionNoOpReason(state.status);
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "CONFIRM_GOVERNANCE",
              "confirm_governance_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const scenario = state.scenarioId
        ? findScenario(state.scenarioId)
        : undefined;

      if (!scenario) {
        const reason = `active scenario "${state.scenarioId}" not found`;
        return {
          ...state,
          error: `governance_failed:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "CONFIRM_GOVERNANCE",
              "confirm_governance_failed",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const { sources, contextLayer } = normalizeSources(scenario.sourceSeeds);
      const includedCount = sources.filter((s) => s.includedInContext).length;
      const reason =
        includedCount === sources.length
          ? `all ${includedCount} source(s) normalized into governed context`
          : `${includedCount} of ${sources.length} source(s) included after governance`;

      return {
        ...state,
        status: "governed",
        sources,
        contextLayer,
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "governed",
            reason,
            timestamp: now,
          },
        ],
        error: null,
        events: [
          ...state.events,
          makeEvent(
            state,
            "CONFIRM_GOVERNANCE",
            "governance_confirmed",
            reason,
            "accepted",
            null
          ),
        ],
      };
    }

    case "DECIDE_ACTION": {
      if (state.status !== "governed") {
        const reason = invalidActionNoOpReason(state.status);
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "DECIDE_ACTION",
              "decide_action_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const scenario = state.scenarioId
        ? findScenario(state.scenarioId)
        : undefined;

      if (!scenario) {
        const reason = `active scenario "${state.scenarioId}" not found`;
        return {
          ...state,
          error: `decision_failed:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "DECIDE_ACTION",
              "decision_failed",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const decision: DecisionRecord = scenario.decision;

      return {
        ...state,
        status: "decision_taken",
        decision,
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "decision_taken",
            reason: decision.reason,
            timestamp: now,
          },
        ],
        error: null,
        events: [
          ...state.events,
          makeEvent(
            state,
            "DECIDE_ACTION",
            `decision_${decision.action}`,
            decision.reason,
            "accepted",
            null
          ),
        ],
      };
    }

    case "SIMULATE_SOURCE_FAILURE": {
      if (state.status !== "normalizing") {
        const reason = invalidActionNoOpReason(state.status);
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SIMULATE_SOURCE_FAILURE",
              "source_failure_simulation_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const reason =
        "Simulated source failure — pipeline halted before governance.";

      return {
        ...state,
        status: "source_failed",
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "source_failed",
            reason,
            timestamp: now,
          },
        ],
        error: reason,
        events: [
          ...state.events,
          makeEvent(
            state,
            "SIMULATE_SOURCE_FAILURE",
            "source_failure_simulated",
            reason,
            "error",
            "simulated source failure — fixture-driven, no real system contacted"
          ),
        ],
      };
    }

    case "RESTART": {
      return createInitialState();
    }

    default: {
      return state;
    }
  }
}
