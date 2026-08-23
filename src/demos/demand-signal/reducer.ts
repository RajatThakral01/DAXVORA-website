import { findSignal } from "./fixtures";
import { REDACTION_NOTE } from "../shared/observability";
import type {
  DemandSignalAction,
  DemandSignalState,
  DemandSignalStatus,
  ObservabilityEvent,
} from "./types";

export function createInitialState(): DemandSignalState {
  return {
    status: "idle",
    signalId: null,
    rawSignal: null,
    validation: null,
    classification: null,
    score: null,
    attribution: null,
    routing: null,
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

const VALIDATION_PENDING_REASON =
  "Signal selected — awaiting validation.";

function makeRunId(selectionCount: number, signalId: string): string {
  return `run-${String(selectionCount).padStart(3, "0")}-${signalId}`;
}

function invalidActionNoOpReason(status: DemandSignalStatus): string {
  switch (status) {
    case "idle":
      return "no active signal run";
    case "validating":
      return 'status "validating" — awaiting VALIDATE';
    case "classified":
      return 'status "classified" — awaiting CLASSIFY';
    case "scored":
      return 'status "scored" — awaiting SCORE';
    case "attributed":
      return 'status "attributed" — awaiting ATTRIBUTE';
    case "routed":
      return 'status "routed" is terminal — run complete';
    case "signal_rejected":
      return 'status "signal_rejected" is terminal — signal failed validation';
    case "pipeline_failed":
      return 'status "pipeline_failed" is terminal — RESTART to retry';
  }
}

function parsePayloadFields(
  payload: string
): Record<string, string> {
  const pairs: Record<string, string> = {};
  for (const segment of payload.split(";")) {
    const separator = segment.indexOf("=");
    if (separator === -1) continue;
    const key = segment.slice(0, separator).trim();
    const value = segment.slice(separator + 1).trim();
    if (key !== "") pairs[key] = value;
  }
  return pairs;
}

function makeEvent(
  state: DemandSignalState,
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

export function demandSignalReducer(
  state: DemandSignalState,
  action: DemandSignalAction
): DemandSignalState {
  switch (action.type) {
    case "SELECT_SIGNAL": {
      const signal = findSignal(action.signalId);

      if (!signal || action.signalId.trim() === "") {
        const reason =
          action.signalId.trim() === ""
            ? "empty signal id"
            : `unknown signal id "${action.signalId}"`;
        return {
          ...state,
          error: `rejected_select:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SELECT_SIGNAL",
              "select_signal_rejected",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const isDuplicateSelection =
        state.signalId === action.signalId && state.status !== "idle";

      if (isDuplicateSelection) {
        return {
          ...state,
          error: null,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SELECT_SIGNAL",
              "duplicate_select_ignored",
              `signal "${action.signalId}" already active in this run`,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const selectionCount = state.selectionCount + 1;

      return {
        status: "validating",
        signalId: signal.id,
        rawSignal: { source: signal.source, payload: signal.payload },
        validation: null,
        classification: null,
        score: null,
        attribution: null,
        routing: null,
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "validating",
            reason: VALIDATION_PENDING_REASON,
            timestamp: now,
          },
        ],
        runId: makeRunId(selectionCount, signal.id),
        selectionCount,
        error: null,
        events: [
          ...state.events,
          makeEvent(
            state,
            "SELECT_SIGNAL",
            "select_signal_accepted",
            `run started for signal "${signal.label}"`,
            "accepted",
            null
          ),
        ],
        runStartedAt: now,
      };
    }

    case "VALIDATE": {
      if (state.status !== "validating") {
        const reason = invalidActionNoOpReason(state.status);
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "VALIDATE",
              "validate_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const signal = state.signalId ? findSignal(state.signalId) : undefined;

      if (!signal) {
        const reason = `active signal "${state.signalId}" not found`;
        return {
          ...state,
          error: `validation_failed:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "VALIDATE",
              "validate_failed",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const payloadFields = parsePayloadFields(signal.payload);
      const missing = signal.requiredFields.filter(
        (field) => !(field in payloadFields)
      );
      const valid = missing.length === 0;
      const validationReason =
        valid
          ? "all required fields present"
          : `missing required field(s): ${missing.join(", ")}`;

      if (!valid) {
        return {
          ...state,
          status: "signal_rejected",
          validation: { valid: false, reason: validationReason },
          transitionLog: [
            ...state.transitionLog,
            {
              fromStatus: state.status,
              toStatus: "signal_rejected",
              reason: validationReason,
              timestamp: now,
            },
          ],
          error: validationReason,
          events: [
            ...state.events,
            makeEvent(
              state,
              "VALIDATE",
              "signal_rejected_at_validation",
              validationReason,
              "error",
              validationReason
            ),
          ],
        };
      }

      return {
        ...state,
        status: "classified",
        validation: { valid: true, reason: validationReason },
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "classified",
            reason: validationReason,
            timestamp: now,
          },
        ],
        error: null,
        events: [
          ...state.events,
          makeEvent(
            state,
            "VALIDATE",
            "signal_validated",
            validationReason,
            "accepted",
            null
          ),
        ],
      };
    }

    case "CLASSIFY": {
      if (state.status !== "classified") {
        const reason = invalidActionNoOpReason(state.status);
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "CLASSIFY",
              "classify_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const signal = state.signalId ? findSignal(state.signalId) : undefined;

      if (!signal) {
        const reason = `active signal "${state.signalId}" not found`;
        return {
          ...state,
          error: `classification_failed:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "CLASSIFY",
              "classify_failed",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const { category, confidence } = signal.expectedClassification;
      const reason = `classified as ${category} (${confidence} confidence)`;

      return {
        ...state,
        status: "scored",
        classification: { category, confidence },
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "scored",
            reason,
            timestamp: now,
          },
        ],
        error: null,
        events: [
          ...state.events,
          makeEvent(state, "CLASSIFY", `classified_${category}`, reason, "accepted", null),
        ],
      };
    }

    case "SCORE": {
      if (state.status !== "scored") {
        const reason = invalidActionNoOpReason(state.status);
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SCORE",
              "score_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const signal = state.signalId ? findSignal(state.signalId) : undefined;

      if (!signal) {
        const reason = `active signal "${state.signalId}" not found`;
        return {
          ...state,
          error: `scoring_failed:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SCORE",
              "score_failed",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const { value, band } = signal.expectedScore;
      const reason = `scored ${value} (${band} band)`;

      return {
        ...state,
        status: "attributed",
        score: { value, band },
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "attributed",
            reason,
            timestamp: now,
          },
        ],
        error: null,
        events: [
          ...state.events,
          makeEvent(state, "SCORE", `scored_${band}`, reason, "accepted", null),
        ],
      };
    }

    case "ATTRIBUTE": {
      if (state.status !== "attributed") {
        const reason = invalidActionNoOpReason(state.status);
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "ATTRIBUTE",
              "attribute_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const signal = state.signalId ? findSignal(state.signalId) : undefined;

      if (!signal) {
        const reason = `active signal "${state.signalId}" not found`;
        return {
          ...state,
          error: `attribution_failed:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "ATTRIBUTE",
              "attribute_failed",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const { channel, touchpoints } = signal.expectedAttribution;
      const { destination, reason: routingReason } = signal.expectedRouting;
      const reason = `routed to ${destination} via ${channel}`;

      return {
        ...state,
        status: "routed",
        attribution: { channel, touchpoints },
        routing: { destination, reason: routingReason },
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "routed",
            reason,
            timestamp: now,
          },
        ],
        error: null,
        events: [
          ...state.events,
          makeEvent(state, "ATTRIBUTE", `routed_${destination}`, reason, "accepted", null),
        ],
      };
    }

    case "SIMULATE_PIPELINE_FAILURE": {
      const failureEligible: DemandSignalStatus[] = [
        "validating",
        "classified",
        "scored",
        "attributed",
      ];

      if (!failureEligible.includes(state.status)) {
        const reason = invalidActionNoOpReason(state.status);
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SIMULATE_PIPELINE_FAILURE",
              "pipeline_failure_simulation_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const reason = `Simulated pipeline failure at the ${state.status} stage.`;

      return {
        ...state,
        status: "pipeline_failed",
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "pipeline_failed",
            reason,
            timestamp: now,
          },
        ],
        error: reason,
        events: [
          ...state.events,
          makeEvent(
            state,
            "SIMULATE_PIPELINE_FAILURE",
            "pipeline_failure_simulated",
            reason,
            "error",
            "simulated pipeline failure — fixture-driven, no real system contacted"
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
