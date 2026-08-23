import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { findScenario, scenarios } from "./fixtures";
import {
  createInitialState,
  dataContextReducer,
  setClock,
} from "./reducer";
import type { DataContextState } from "./types";

const FROZEN_TIME = 1_700_000_000_000;

function driveToGoverned(
  state: DataContextState,
  scenarioId: string
): DataContextState {
  const afterSelect = dataContextReducer(state, {
    type: "SELECT_SCENARIO",
    scenarioId,
  });
  return dataContextReducer(afterSelect, { type: "CONFIRM_GOVERNANCE" });
}

function driveToDecided(
  state: DataContextState,
  scenarioId: string
): DataContextState {
  const governed = driveToGoverned(state, scenarioId);
  return dataContextReducer(governed, { type: "DECIDE_ACTION" });
}

describe("dataContextReducer", () => {
  beforeEach(() => {
    setClock(() => FROZEN_TIME);
  });

  afterEach(() => {
    setClock(() => Date.now());
  });

  it("test_positive_decision", () => {
    const cleanScenarios = scenarios.filter(
      (s) => s.expectedCompleteness === "complete"
    );
    expect(cleanScenarios.length).toBeGreaterThanOrEqual(2);

    for (const scenario of cleanScenarios) {
      const runOne = driveToDecided(createInitialState(), scenario.id);
      const runTwo = driveToDecided(createInitialState(), scenario.id);

      expect(runOne).toEqual(runTwo);
      expect(runOne.status).toBe("decision_taken");
      expect(runOne.decision).toEqual(scenario.decision);
      expect(runOne.contextLayer!.completeness).toBe("complete");
      expect(runOne.contextLayer!.fields).toEqual(
        scenario.expectedContextFields
      );
    }
  });

  it("test_decisions_differ_across_scenarios", () => {
    const onboarding = driveToDecided(
      createInitialState(),
      "scenario-onboarding-intake"
    );
    const renewal = driveToDecided(
      createInitialState(),
      "scenario-renewal-signals"
    );

    expect(onboarding.decision!.action).not.toBe("");
    expect(renewal.decision!.action).not.toBe("");
    expect(onboarding.decision!.action).not.toBe(renewal.decision!.action);
    expect(onboarding.runId).not.toBe(renewal.runId);
  });

  it("test_partial_context_governance", () => {
    const scenario = findScenario("scenario-incomplete-refund")!;
    const governed = driveToGoverned(createInitialState(), scenario.id);

    expect(governed.status).toBe("governed");
    expect(governed.contextLayer!.completeness).toBe("partial");

    const excluded = governed.sources.find((s) => !s.includedInContext)!;
    expect(excluded.name).toBe("support_message");
    expect(excluded.exclusionReason).toContain("missing required field");
    expect(excluded.exclusionReason).toContain("refund_reason");

    const included = governed.sources.filter((s) => s.includedInContext);
    expect(included.length).toBe(1);
    for (const source of included) {
      expect(source.exclusionReason).toBeNull();
    }

    const decided = dataContextReducer(governed, { type: "DECIDE_ACTION" });
    expect(decided.status).toBe("decision_taken");
    expect(decided.decision!).toEqual(scenario.decision);
    expect(decided.decision!.action).not.toBe("");
    expect(decided.error).toBeNull();
  });

  it("test_conflict_resolution", () => {
    const scenario = findScenario("scenario-owner-conflict")!;
    const governed = driveToGoverned(createInitialState(), scenario.id);

    expect(governed.contextLayer!.fields["owner_name"]).toBe("Ravi P.");
    expect(governed.contextLayer!.fields).toEqual(
      scenario.expectedContextFields
    );
    expect(governed.contextLayer!.completeness).toBe("complete");
    expect(scenario.evidence).toContain("most recent source wins");
  });

  it("test_source_data_persistence", () => {
    const scenario = findScenario("scenario-onboarding-intake")!;

    const afterSelect = dataContextReducer(createInitialState(), {
      type: "SELECT_SCENARIO",
      scenarioId: scenario.id,
    });
    const rawsBefore = afterSelect.sources.map((s) => `${s.name}=${s.raw}`);

    const afterGovernance = dataContextReducer(afterSelect, {
      type: "CONFIRM_GOVERNANCE",
    });
    expect(afterGovernance.sources.map((s) => `${s.name}=${s.raw}`)).toEqual(
      rawsBefore
    );
    for (const source of afterGovernance.sources) {
      if (source.includedInContext) expect(source.normalized).not.toBeNull();
    }

    const afterDecision = dataContextReducer(afterGovernance, {
      type: "DECIDE_ACTION",
    });
    expect(afterDecision.sources.map((s) => `${s.name}=${s.raw}`)).toEqual(
      rawsBefore
    );
  });

  it("test_duplicate_dispatch", () => {
    const scenario = scenarios[0];
    let state = dataContextReducer(createInitialState(), {
      type: "SELECT_SCENARIO",
      scenarioId: scenario.id,
    });

    const logLengthBefore = state.transitionLog.length;
    const runIdBefore = state.runId;

    state = dataContextReducer(state, {
      type: "SELECT_SCENARIO",
      scenarioId: scenario.id,
    });

    expect(state.transitionLog.length).toBe(logLengthBefore);
    expect(state.runId).toBe(runIdBefore);

    const normalizingEntries = state.transitionLog.filter(
      (entry) => entry.toStatus === "normalizing"
    );
    expect(normalizingEntries.length).toBe(1);

    const duplicateEvents = state.events.filter(
      (event) => event.decision === "duplicate_select_ignored"
    );
    expect(duplicateEvents.length).toBe(1);
  });

  it("test_malformed_input", () => {
    const emptyIdResult = dataContextReducer(createInitialState(), {
      type: "SELECT_SCENARIO",
      scenarioId: "",
    });

    expect(emptyIdResult.status).toBe("idle");
    expect(emptyIdResult.error).not.toBeNull();
    expect(emptyIdResult.sources.length).toBe(0);
    expect(emptyIdResult.events.at(-1)?.result).toBe("error");

    const unknownIdResult = dataContextReducer(createInitialState(), {
      type: "SELECT_SCENARIO",
      scenarioId: "does-not-exist",
    });

    expect(unknownIdResult.status).toBe("idle");
    expect(unknownIdResult.error).not.toBeNull();
    expect(unknownIdResult.scenarioId).toBeNull();
    expect(unknownIdResult.contextLayer).toBeNull();

    const emptyReason = emptyIdResult.events.at(-1)?.reason ?? "";
    const unknownReason = unknownIdResult.events.at(-1)?.reason ?? "";
    expect(emptyReason).toContain("empty scenario id");
    expect(unknownReason).toContain("unknown scenario id");
    expect(unknownReason).toContain("does-not-exist");
    expect(emptyReason).not.toBe(unknownReason);

    const recovery = dataContextReducer(emptyIdResult, {
      type: "SELECT_SCENARIO",
      scenarioId: scenarios[0].id,
    });
    expect(recovery.status).toBe("normalizing");
    expect(recovery.error).toBeNull();
  });

  it("test_boundary_terminal", () => {
    const decided = driveToDecided(createInitialState(), scenarios[0].id);
    const failed = dataContextReducer(
      dataContextReducer(createInitialState(), {
        type: "SELECT_SCENARIO",
        scenarioId: scenarios[0].id,
      }),
      { type: "SIMULATE_SOURCE_FAILURE" }
    );
    expect(decided.status).toBe("decision_taken");
    expect(failed.status).toBe("source_failed");

    for (const terminal of [decided, failed]) {
      for (const action of [
        { type: "CONFIRM_GOVERNANCE" },
        { type: "DECIDE_ACTION" },
      ] as const) {
        const logLengthBefore = terminal.transitionLog.length;
        const after = dataContextReducer(terminal, action);

        expect(after.status).toBe(terminal.status);
        expect(after.transitionLog.length).toBe(logLengthBefore);

        const lastEvent = after.events.at(-1)!;
        expect(lastEvent.result).toBe("no-op");
        expect(lastEvent.reason).toContain("terminal");

        const expectedDecision =
          action.type === "CONFIRM_GOVERNANCE"
            ? "confirm_governance_ignored"
            : "decide_action_ignored";
        expect(lastEvent.decision).toBe(expectedDecision);
      }
    }

    const prematureDecide = dataContextReducer(
      dataContextReducer(createInitialState(), {
        type: "SELECT_SCENARIO",
        scenarioId: scenarios[0].id,
      }),
      { type: "DECIDE_ACTION" }
    );
    expect(prematureDecide.status).toBe("normalizing");
    expect(prematureDecide.decision).toBeNull();
    expect(prematureDecide.events.at(-1)?.reason).toContain(
      "not yet governed"
    );
  });

  it("test_simulate_source_failure", () => {
    const scenario = scenarios[1];

    const afterSelect = dataContextReducer(createInitialState(), {
      type: "SELECT_SCENARIO",
      scenarioId: scenario.id,
    });

    const failed = dataContextReducer(afterSelect, {
      type: "SIMULATE_SOURCE_FAILURE",
    });

    expect(failed.status).toBe("source_failed");

    const failureEvent = failed.events.at(-1)!;
    expect(failureEvent.result).toBe("error");
    expect(failureEvent.error).not.toBeNull();
    expect(failureEvent.decision).toBe("source_failure_simulated");

    const lastEntry = failed.transitionLog.at(-1)!;
    expect(lastEntry.fromStatus).toBe("normalizing");
    expect(lastEntry.toStatus).toBe("source_failed");

    const idleNoOp = dataContextReducer(createInitialState(), {
      type: "SIMULATE_SOURCE_FAILURE",
    });
    expect(idleNoOp.status).toBe("idle");
    expect(idleNoOp.transitionLog.length).toBe(0);
    expect(idleNoOp.events.at(-1)?.result).toBe("no-op");

    const terminalStates: DataContextState[] = [
      driveToGoverned(createInitialState(), scenario.id),
      driveToDecided(createInitialState(), scenario.id),
      failed,
    ];

    for (const terminal of terminalStates) {
      const logLengthBefore = terminal.transitionLog.length;
      const ignored = dataContextReducer(terminal, {
        type: "SIMULATE_SOURCE_FAILURE",
      });
      expect(ignored.status).toBe(terminal.status);
      expect(ignored.transitionLog.length).toBe(logLengthBefore);
      expect(ignored.events.at(-1)?.decision).toBe(
        "source_failure_simulation_ignored"
      );
      expect(ignored.events.at(-1)?.result).toBe("no-op");
    }
  });

  it("test_restart", () => {
    const snapshot = createInitialState();

    const failedRun = dataContextReducer(
      dataContextReducer(createInitialState(), {
        type: "SELECT_SCENARIO",
        scenarioId: scenarios[0].id,
      }),
      { type: "SIMULATE_SOURCE_FAILURE" }
    );
    expect(failedRun.status).toBe("source_failed");

    const midRunScenarios: DataContextState[] = [
      dataContextReducer(createInitialState(), {
        type: "SELECT_SCENARIO",
        scenarioId: scenarios[0].id,
      }),
      driveToGoverned(createInitialState(), scenarios[1].id),
      driveToDecided(createInitialState(), scenarios[3].id),
      failedRun,
    ];

    for (const scenarioState of midRunScenarios) {
      expect(scenarioState.status).not.toBe("idle");
      const restarted = dataContextReducer(scenarioState, {
        type: "RESTART",
      });
      expect(restarted).toEqual(snapshot);
    }
  });
});
