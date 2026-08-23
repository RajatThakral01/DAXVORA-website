export type HaloAgentStatus =
  | "idle"
  | "routing"
  | "specialist_a"
  | "specialist_b"
  | "human_escalation";

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

export interface TransitionEntry {
  fromStatus: HaloAgentStatus;
  toStatus: HaloAgentStatus;
  reason: string;
  timestamp: number;
}

export type EventResult = "accepted" | "rejected" | "no-op" | "error";

export interface ObservabilityEvent {
  runId: string;
  decision: string;
  reason: string;
  action: string;
  result: EventResult;
  error: string | null;
  timingMs: number;
  redactionNote: string;
}

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
  | { type: "RESTART" };

export const REDACTION_NOTE = "no client data present — nothing redacted";
