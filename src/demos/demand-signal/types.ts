import type {
  ObservabilityEvent,
  TransitionEntry as SharedTransitionEntry,
} from "../shared/observability";

export type { EventResult, ObservabilityEvent } from "../shared/observability";
export { REDACTION_NOTE } from "../shared/observability";

export type DemandSignalStatus =
  | "idle"
  | "validating"
  | "classified"
  | "scored"
  | "attributed"
  | "routed"
  | "signal_rejected"
  | "pipeline_failed";

export interface RawSignal {
  source: string;
  payload: string;
}

export interface ValidationRecord {
  valid: boolean;
  reason: string;
}

export interface ClassificationRecord {
  category: string;
  confidence: "high" | "medium" | "low";
}

export interface ScoreRecord {
  value: number;
  band: "hot" | "warm" | "cold";
}

export interface AttributionRecord {
  channel: string;
  touchpoints: string[];
}

export interface RoutingRecord {
  destination: string;
  reason: string;
}

export type TransitionEntry = SharedTransitionEntry<DemandSignalStatus>;

export interface DemandSignalState {
  status: DemandSignalStatus;
  signalId: string | null;
  rawSignal: RawSignal | null;
  validation: ValidationRecord | null;
  classification: ClassificationRecord | null;
  score: ScoreRecord | null;
  attribution: AttributionRecord | null;
  routing: RoutingRecord | null;
  transitionLog: TransitionEntry[];
  runId: string;
  selectionCount: number;
  error: string | null;
  events: ObservabilityEvent[];
  runStartedAt: number | null;
}

export type DemandSignalAction =
  | { type: "SELECT_SIGNAL"; signalId: string }
  | { type: "VALIDATE" }
  | { type: "CLASSIFY" }
  | { type: "SCORE" }
  | { type: "ATTRIBUTE" }
  | { type: "SIMULATE_PIPELINE_FAILURE" }
  | { type: "RESTART" };
