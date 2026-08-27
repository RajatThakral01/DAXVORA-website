export type HaloAgentStatus =
  | "idle"
  | "routing"
  | "specialist_a"
  | "specialist_b"
  | "human_escalation"
  | "route_failed";

export type RouteTarget = Extract<
  HaloAgentStatus,
  "specialist_a" | "specialist_b" | "human_escalation"
>;

export interface ContextPanel {
  customerTag: string;
  profileField: string;
  historyExcerpt: string;
  handoffReason: string;
}

import type {
  ObservabilityEvent,
  TransitionEntry as SharedTransitionEntry,
} from "../shared/observability";

export type { ObservabilityEvent } from "../shared/observability";
export { REDACTION_NOTE } from "../shared/observability";

type TransitionEntry = SharedTransitionEntry<HaloAgentStatus>;

export interface HaloAgentState {
  status: HaloAgentStatus;
  personaId: string | null;
  contextPanel: ContextPanel | null;
  transitionLog: TransitionEntry[];
  runId: string;
  selectionCount: number;
  error: string | null;
  events: ObservabilityEvent[];
  runStartedAt: number | null;
}

export type HaloAgentAction =
  | { type: "SELECT_PERSONA"; personaId: string }
  | { type: "ROUTE_DECISION"; result: RouteTarget }
  | { type: "SIMULATE_PROVIDER_FAILURE" }
  | { type: "RESTART" };
