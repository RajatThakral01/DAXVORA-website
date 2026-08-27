type EventResult = "accepted" | "rejected" | "no-op" | "error";

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

export const REDACTION_NOTE = "no client data present — nothing redacted";

export interface TransitionEntry<Status extends string> {
  fromStatus: Status;
  toStatus: Status;
  reason: string;
  timestamp: number;
}
