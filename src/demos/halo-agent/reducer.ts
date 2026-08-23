import { findPersona } from "./fixtures";
import {
  REDACTION_NOTE,
  type ContextPanel,
  type HaloAgentAction,
  type HaloAgentState,
  type ObservabilityEvent,
} from "./types";

export function createInitialState(): HaloAgentState {
  return {
    status: "idle",
    personaId: null,
    contextPanel: null,
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

const INITIAL_HANDOFF_REASON =
  "Router qualifier evaluating inbound scenario.";

function makeRunId(selectionCount: number, personaId: string): string {
  return `run-${String(selectionCount).padStart(3, "0")}-${personaId}`;
}

function makeEvent(
  state: HaloAgentState,
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

export function haloAgentReducer(
  state: HaloAgentState,
  action: HaloAgentAction
): HaloAgentState {
  switch (action.type) {
    case "SELECT_PERSONA": {
      const persona = findPersona(action.personaId);

      if (!persona || action.personaId.trim() === "") {
        const reason =
          action.personaId.trim() === ""
            ? "empty persona id"
            : `unknown persona id "${action.personaId}"`;
        return {
          ...state,
          error: `rejected_select:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SELECT_PERSONA",
              "select_persona_rejected",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const isDuplicateSelection =
        state.personaId === action.personaId && state.status !== "idle";

      if (isDuplicateSelection) {
        return {
          ...state,
          error: null,
          events: [
            ...state.events,
            makeEvent(
              state,
              "SELECT_PERSONA",
              "duplicate_select_ignored",
              `persona "${action.personaId}" already active in this run`,
              "no-op",
              null
            ),
          ],
        };
      }

      const now = clock();
      const selectionCount = state.selectionCount + 1;
      const contextPanel: ContextPanel = {
        customerTag: persona.context.customerTag,
        profileField: persona.context.profileField,
        historyExcerpt: persona.context.historyExcerpt,
        handoffReason: INITIAL_HANDOFF_REASON,
      };

      return {
        status: "routing",
        personaId: persona.id,
        contextPanel,
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: "routing",
            reason: INITIAL_HANDOFF_REASON,
            timestamp: now,
          },
        ],
        runId: makeRunId(selectionCount, persona.id),
        selectionCount,
        error: null,
        events: [
          ...state.events,
          makeEvent(
            state,
            "SELECT_PERSONA",
            "select_persona_accepted",
            `run started for persona "${persona.label}"`,
            "accepted",
            null
          ),
        ],
        runStartedAt: now,
      };
    }

    case "ROUTE_DECISION": {
      if (state.status !== "routing") {
        const reason =
          state.status === "idle"
            ? "no active routing run"
            : `status "${state.status}" is terminal — human owns the thread`;
        return {
          ...state,
          events: [
            ...state.events,
            makeEvent(
              state,
              "ROUTE_DECISION",
              "route_decision_ignored",
              reason,
              "no-op",
              null
            ),
          ],
        };
      }

      const persona = state.personaId ? findPersona(state.personaId) : undefined;

      if (!persona) {
        const reason = `active persona "${state.personaId}" not found`;
        return {
          ...state,
          error: `route_failed:${reason}`,
          events: [
            ...state.events,
            makeEvent(
              state,
              "ROUTE_DECISION",
              "route_decision_failed",
              reason,
              "error",
              reason
            ),
          ],
        };
      }

      const now = clock();
      const target = action.result;
      const reason =
        persona.handoffReasonByRoute[target] ??
        `Routed to ${target}.`;

      return {
        ...state,
        status: target,
        contextPanel: {
          customerTag: persona.context.customerTag,
          profileField: persona.context.profileField,
          historyExcerpt: persona.context.historyExcerpt,
          handoffReason: reason,
        },
        transitionLog: [
          ...state.transitionLog,
          {
            fromStatus: state.status,
            toStatus: target,
            reason,
            timestamp: now,
          },
        ],
        error: null,
        events: [
          ...state.events,
          makeEvent(
            state,
            "ROUTE_DECISION",
            `routed_to_${target}`,
            reason,
            "accepted",
            null
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
