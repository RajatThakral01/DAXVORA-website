import type {
  ObservabilityEvent,
  TransitionEntry as SharedTransitionEntry,
} from "../shared/observability";

export type { ObservabilityEvent } from "../shared/observability";
type TransitionEntry = SharedTransitionEntry<DataContextStatus>;

export type DataContextStatus =
  | "idle"
  | "normalizing"
  | "governed"
  | "decision_taken"
  | "source_failed";

export interface SourceRecord {
  name: string;
  raw: string;
  normalized: string | null;
  includedInContext: boolean;
  exclusionReason: string | null;
}

export interface ContextLayer {
  fields: Record<string, string>;
  completeness: "complete" | "partial";
}

export interface DecisionRecord {
  action: string;
  reason: string;
}

export interface DataContextState {
  status: DataContextStatus;
  scenarioId: string | null;
  sources: SourceRecord[];
  contextLayer: ContextLayer | null;
  decision: DecisionRecord | null;
  transitionLog: TransitionEntry[];
  runId: string;
  selectionCount: number;
  error: string | null;
  events: ObservabilityEvent[];
  runStartedAt: number | null;
}

export type DataContextAction =
  | { type: "SELECT_SCENARIO"; scenarioId: string }
  | { type: "CONFIRM_GOVERNANCE" }
  | { type: "DECIDE_ACTION" }
  | { type: "SIMULATE_SOURCE_FAILURE" }
  | { type: "RESTART" };
