import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { findSignal, signals } from "./fixtures";
import {
  createInitialState,
  demandSignalReducer,
  setClock,
} from "./reducer";
import type { DemandSignalAction, DemandSignalState } from "./types";

const FROZEN_TIME = 1_700_000_000_000;

const STEP_ACTIONS: DemandSignalAction[] = [
  { type: "VALIDATE" },
  { type: "CLASSIFY" },
  { type: "SCORE" },
  { type: "ATTRIBUTE" },
];

function driveToRouted(state: DemandSignalState, signalId: string): DemandSignalState {
  let current = demandSignalReducer(state, {
    type: "SELECT_SIGNAL",
    signalId,
  });
  for (const step of STEP_ACTIONS) {
    current = demandSignalReducer(current, step);
  }
  return current;
}

describe("demandSignalReducer", () => {
  beforeEach(() => {
    setClock(() => FROZEN_TIME);
  });

  afterEach(() => {
    setClock(() => Date.now());
  });

  it("test_positive_routing", () => {
    const cleanSignals = signals.filter(
      (s) => s.expectedValidation.valid
    );
    expect(cleanSignals.length).toBe(4);

    for (const signal of cleanSignals) {
      const runOne = driveToRouted(createInitialState(), signal.id);
      const runTwo = driveToRouted(createInitialState(), signal.id);

      expect(runOne).toEqual(runTwo);
      expect(runOne.status).toBe("routed");
      expect(runOne.validation!.valid).toBe(true);
      expect(runOne.classification).toEqual(signal.expectedClassification);
      expect(runOne.score).toEqual(signal.expectedScore);
      expect(runOne.attribution).toEqual(signal.expectedAttribution);
      expect(runOne.routing).toEqual(signal.expectedRouting);
    }
  });

  it("test_signal_rejection", () => {
    const invalid = findSignal("signal-missing-email")!;

    const afterSelect = demandSignalReducer(createInitialState(), {
      type: "SELECT_SIGNAL",
      signalId: invalid.id,
    });
    const afterValidate = demandSignalReducer(afterSelect, {
      type: "VALIDATE",
    });

    expect(afterValidate.status).toBe("signal_rejected");
    expect(afterValidate.validation!.valid).toBe(false);
    expect(afterValidate.validation!.reason).toContain(
      "missing required field"
    );
    expect(afterValidate.validation!.reason).toContain("email");
    expect(afterValidate.classification).toBeNull();
    expect(afterValidate.score).toBeNull();
    expect(afterValidate.error).not.toBeNull();

    const lastEvent = afterValidate.events.at(-1)!;
    expect(lastEvent.result).toBe("error");
    expect(lastEvent.decision).toBe("signal_rejected_at_validation");

    const stillRejected = demandSignalReducer(afterValidate, {
      type: "CLASSIFY",
    });
    expect(stillRejected.status).toBe("signal_rejected");
    expect(stillRejected.classification).toBeNull();
  });

  it("test_score_band_variation", () => {
    const hot = driveToRouted(createInitialState(), "signal-webinar-demo");
    const cold = driveToRouted(createInitialState(), "signal-community-mention");

    expect(hot.score!.band).toBe("hot");
    expect(cold.score!.band).toBe("cold");
    expect(hot.score!.value).not.toBe(cold.score!.value);
    expect(hot.attribution!.touchpoints.length).toBeGreaterThan(
      cold.attribution!.touchpoints.length
    );
    expect(hot.routing!.destination).not.toBe(cold.routing!.destination);
    expect(cold.classification!.confidence).toBe("low");
  });

  it("test_signal_persistence", () => {
    const signal = findSignal("signal-webinar-demo")!;
    const fingerprint = `${signal.source}|${signal.payload}`;

    let state = demandSignalReducer(createInitialState(), {
      type: "SELECT_SIGNAL",
      signalId: signal.id,
    });
    expect(`${state.rawSignal!.source}|${state.rawSignal!.payload}`).toBe(
      fingerprint
    );

    for (const step of STEP_ACTIONS) {
      state = demandSignalReducer(state, step);
      expect(`${state.rawSignal!.source}|${state.rawSignal!.payload}`).toBe(
        fingerprint
      );
    }
    expect(state.status).toBe("routed");
  });

  it("test_duplicate_dispatch", () => {
    const signal = signals[0];
    let state = demandSignalReducer(createInitialState(), {
      type: "SELECT_SIGNAL",
      signalId: signal.id,
    });

    const logLengthBefore = state.transitionLog.length;
    const runIdBefore = state.runId;

    state = demandSignalReducer(state, {
      type: "SELECT_SIGNAL",
      signalId: signal.id,
    });

    expect(state.transitionLog.length).toBe(logLengthBefore);
    expect(state.runId).toBe(runIdBefore);

    const validatingEntries = state.transitionLog.filter(
      (entry) => entry.toStatus === "validating"
    );
    expect(validatingEntries.length).toBe(1);

    const duplicateEvents = state.events.filter(
      (event) => event.decision === "duplicate_select_ignored"
    );
    expect(duplicateEvents.length).toBe(1);
  });

  it("test_malformed_input", () => {
    const emptyIdResult = demandSignalReducer(createInitialState(), {
      type: "SELECT_SIGNAL",
      signalId: "",
    });

    expect(emptyIdResult.status).toBe("idle");
    expect(emptyIdResult.error).not.toBeNull();
    expect(emptyIdResult.rawSignal).toBeNull();
    expect(emptyIdResult.events.at(-1)?.result).toBe("error");

    const unknownIdResult = demandSignalReducer(createInitialState(), {
      type: "SELECT_SIGNAL",
      signalId: "does-not-exist",
    });

    expect(unknownIdResult.status).toBe("idle");
    expect(unknownIdResult.error).not.toBeNull();
    expect(unknownIdResult.signalId).toBeNull();

    const emptyReason = emptyIdResult.events.at(-1)?.reason ?? "";
    const unknownReason = unknownIdResult.events.at(-1)?.reason ?? "";
    expect(emptyReason).toContain("empty signal id");
    expect(unknownReason).toContain("unknown signal id");
    expect(unknownReason).toContain("does-not-exist");
    expect(emptyReason).not.toBe(unknownReason);

    const recovery = demandSignalReducer(emptyIdResult, {
      type: "SELECT_SIGNAL",
      signalId: signals[0].id,
    });
    expect(recovery.status).toBe("validating");
    expect(recovery.error).toBeNull();
  });

  it("test_boundary_terminal", () => {
    const routed = driveToRouted(createInitialState(), signals[0].id);

    const rejected = demandSignalReducer(
      demandSignalReducer(createInitialState(), {
        type: "SELECT_SIGNAL",
        signalId: "signal-missing-email",
      }),
      { type: "VALIDATE" }
    );

    const failed = demandSignalReducer(
      demandSignalReducer(createInitialState(), {
        type: "SELECT_SIGNAL",
        signalId: signals[0].id,
      }),
      { type: "SIMULATE_PIPELINE_FAILURE" }
    );

    const terminals = [
      { state: routed, name: "routed" },
      { state: rejected, name: "signal_rejected" },
      { state: failed, name: "pipeline_failed" },
    ];

    for (const terminal of terminals) {
      for (const action of STEP_ACTIONS) {
        const logLengthBefore = terminal.state.transitionLog.length;
        const after = demandSignalReducer(terminal.state, action);

        expect(after.status).toBe(terminal.name);
        expect(after.transitionLog.length).toBe(logLengthBefore);

        const lastEvent = after.events.at(-1)!;
        expect(lastEvent.result).toBe("no-op");
        expect(lastEvent.reason).toContain("terminal");
        expect(lastEvent.reason).toContain(`"${terminal.name}"`);
      }

      const failureLogLengthBefore = terminal.state.transitionLog.length;
      const afterFailure = demandSignalReducer(terminal.state, {
        type: "SIMULATE_PIPELINE_FAILURE",
      });

      expect(afterFailure.status).toBe(terminal.name);
      expect(afterFailure.transitionLog.length).toBe(failureLogLengthBefore);

      const failureNoOpEvent = afterFailure.events.at(-1)!;
      expect(failureNoOpEvent.result).toBe("no-op");
      expect(failureNoOpEvent.decision).toBe(
        "pipeline_failure_simulation_ignored"
      );
      expect(failureNoOpEvent.reason).toContain("terminal");
      expect(failureNoOpEvent.reason).toContain(`"${terminal.name}"`);
    }

    const prematureClassify = demandSignalReducer(
      demandSignalReducer(createInitialState(), {
        type: "SELECT_SIGNAL",
        signalId: signals[0].id,
      }),
      { type: "CLASSIFY" }
    );
    expect(prematureClassify.status).toBe("validating");
    expect(prematureClassify.events.at(-1)?.reason).toContain(
      "awaiting VALIDATE"
    );
  });

  it("test_simulate_pipeline_failure", () => {
    let progressing = demandSignalReducer(createInitialState(), {
      type: "SELECT_SIGNAL",
      signalId: signals[0].id,
    });
    const entryStates: DemandSignalState[] = [{ ...progressing }];

    for (let i = 0; i < 3; i++) {
      progressing = demandSignalReducer(progressing, STEP_ACTIONS[i]);
      if (i < 2) entryStates.push({ ...progressing });
    }
    entryStates.push({ ...progressing });

    const eligibleStatuses = [
      "validating",
      "classified",
      "scored",
      "attributed",
    ] as const;
    expect(entryStates.map((s) => s.status)).toEqual([
      ...eligibleStatuses,
    ]);

    for (const entry of entryStates) {
      const failed = demandSignalReducer(entry, {
        type: "SIMULATE_PIPELINE_FAILURE",
      });

      expect(failed.status).toBe("pipeline_failed");

      const failureEvent = failed.events.at(-1)!;
      expect(failureEvent.result).toBe("error");
      expect(failureEvent.error).not.toBeNull();
      expect(failureEvent.decision).toBe("pipeline_failure_simulated");
      expect(failureEvent.reason).toContain(`${entry.status} stage`);

      const lastEntry = failed.transitionLog.at(-1)!;
      expect(lastEntry.fromStatus).toBe(entry.status);
      expect(lastEntry.toStatus).toBe("pipeline_failed");
    }

    const idleNoOp = demandSignalReducer(createInitialState(), {
      type: "SIMULATE_PIPELINE_FAILURE",
    });
    expect(idleNoOp.status).toBe("idle");
    expect(idleNoOp.events.at(-1)?.result).toBe("no-op");

    const routedTerminal = driveToRouted(createInitialState(), signals[0].id);
    const routedNoOp = demandSignalReducer(routedTerminal, {
      type: "SIMULATE_PIPELINE_FAILURE",
    });
    expect(routedNoOp.status).toBe("routed");
    expect(routedNoOp.events.at(-1)?.decision).toBe(
      "pipeline_failure_simulation_ignored"
    );
  });

  it("test_duplicate_retry_recognized_as_repeat", () => {
    const routed = driveToRouted(createInitialState(), "signal-webinar-demo");
    expect(routed.status).toBe("routed");
    const receiptBefore = routed.routing;
    const runIdBefore = routed.runId;
    const logLengthBefore = routed.transitionLog.length;

    const repeat = demandSignalReducer(routed, {
      type: "SELECT_SIGNAL",
      signalId: "signal-webinar-demo",
    });

    expect(repeat.routing).toEqual(receiptBefore);
    expect(repeat.runId).toBe(runIdBefore);
    expect(repeat.transitionLog.length).toBe(logLengthBefore);
    const dupEvent = repeat.events.at(-1)!;
    expect(dupEvent.decision).toBe("duplicate_select_ignored");
    expect(dupEvent.result).toBe("no-op");
  });

  it("test_boundary_threshold_tie_breaking", () => {
    const first = driveToRouted(createInitialState(), "signal-threshold-boundary");
    const second = driveToRouted(createInitialState(), "signal-threshold-boundary");

    expect(first).toEqual(second);
    expect(first.status).toBe("routed");
    expect(first.score).toEqual({ value: 80, band: "hot" });
    expect(first.score!.value).toBe(80);
    expect(first.score!.band).toBe("hot");
    const signal = findSignal("signal-threshold-boundary")!;
    expect(signal.evidence).toContain("threshold value belongs to the higher band");
  });

  it("test_restart", () => {
    const snapshot = createInitialState();

    const rejectedRun = demandSignalReducer(
      demandSignalReducer(createInitialState(), {
        type: "SELECT_SIGNAL",
        signalId: "signal-missing-email",
      }),
      { type: "VALIDATE" }
    );
    expect(rejectedRun.status).toBe("signal_rejected");

    const failedRun = demandSignalReducer(
      demandSignalReducer(createInitialState(), {
        type: "SELECT_SIGNAL",
        signalId: signals[0].id,
      }),
      { type: "SIMULATE_PIPELINE_FAILURE" }
    );
    expect(failedRun.status).toBe("pipeline_failed");

    const midRunScenarios: DemandSignalState[] = [
      demandSignalReducer(createInitialState(), {
        type: "SELECT_SIGNAL",
        signalId: signals[0].id,
      }),
      driveToRouted(createInitialState(), signals[1].id),
      rejectedRun,
      failedRun,
    ];

    for (const scenario of midRunScenarios) {
      expect(scenario.status).not.toBe("idle");
      const restarted = demandSignalReducer(scenario, { type: "RESTART" });
      expect(restarted).toEqual(snapshot);
    }
  });
});
