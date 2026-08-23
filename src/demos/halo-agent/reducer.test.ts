import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  FALLBACK_ROUTE,
  findPersona,
  personas,
  resolveExpectedRoute,
} from "./fixtures";
import { createInitialState, haloAgentReducer, setClock } from "./reducer";
import type { HaloAgentState } from "./types";

const FROZEN_TIME = 1_700_000_000_000;

function driveToRouted(state: HaloAgentState, personaId: string): HaloAgentState {
  const afterSelect = haloAgentReducer(state, {
    type: "SELECT_PERSONA",
    personaId,
  });
  const persona = findPersona(personaId);
  if (!persona) throw new Error(`fixture missing: ${personaId}`);
  return haloAgentReducer(afterSelect, {
    type: "ROUTE_DECISION",
    result: resolveExpectedRoute(persona),
  });
}

describe("haloAgentReducer", () => {
  beforeEach(() => {
    setClock(() => FROZEN_TIME);
  });

  afterEach(() => {
    setClock(() => Date.now());
  });

  it("test_positive_routing", () => {
    for (const persona of personas.filter((p) => !p.signalAmbiguous)) {
      const runOne = driveToRouted(createInitialState(), persona.id);
      const runTwo = driveToRouted(createInitialState(), persona.id);

      expect(runOne).toEqual(runTwo);
      expect(runOne.status).toBe(persona.expectedRoute);
      expect(resolveExpectedRoute(persona)).toBe(persona.expectedRoute);
    }
  });

  it("test_negative_fallback", () => {
    const ambiguous = personas.find((p) => p.signalAmbiguous);
    expect(ambiguous).toBeDefined();

    const resolvedRoute = resolveExpectedRoute(ambiguous!);
    expect(resolvedRoute).toBe(FALLBACK_ROUTE);

    const finalState = driveToRouted(createInitialState(), ambiguous!.id);

    const validStatuses = [
      "idle",
      "routing",
      "specialist_a",
      "specialist_b",
      "human_escalation",
    ] as const;
    expect(validStatuses).toContain(finalState.status);
    expect(finalState.status).toBeDefined();
    expect(finalState.status).not.toBe("");
    expect(finalState.status).toBe("specialist_b");
    expect(finalState.error).toBeNull();
  });

  it("test_context_persistence", () => {
    const persona = personas[0];
    const afterSelect = haloAgentReducer(createInitialState(), {
      type: "SELECT_PERSONA",
      personaId: persona.id,
    });
    const beforePanel = afterSelect.contextPanel!;
    const beforeTag = beforePanel.customerTag;
    const beforeProfile = beforePanel.profileField;
    const beforeHistory = beforePanel.historyExcerpt;

    const afterRoute = haloAgentReducer(afterSelect, {
      type: "ROUTE_DECISION",
      result: resolveExpectedRoute(persona),
    });
    const afterPanel = afterRoute.contextPanel!;

    expect(afterPanel.customerTag).toBe(beforeTag);
    expect(afterPanel.profileField).toBe(beforeProfile);
    expect(afterPanel.historyExcerpt).toBe(beforeHistory);

    expect(afterPanel.customerTag).toBe(persona.context.customerTag);
    expect(afterRoute.status).not.toBe("routing");
    expect(afterRoute.transitionLog.length).toBe(
      afterSelect.transitionLog.length + 1
    );
  });

  it("test_handoff_reason_updates", () => {
    for (const persona of personas) {
      const afterSelect = haloAgentReducer(createInitialState(), {
        type: "SELECT_PERSONA",
        personaId: persona.id,
      });
      const reasonBefore = afterSelect.contextPanel!.handoffReason;

      const afterRoute = haloAgentReducer(afterSelect, {
        type: "ROUTE_DECISION",
        result: resolveExpectedRoute(persona),
      });
      const reasonAfter = afterRoute.contextPanel!.handoffReason;

      expect(reasonAfter).not.toBe(reasonBefore);
      expect(reasonAfter).toBe(persona.handoffReasonByRoute[afterRoute.status as keyof typeof persona.handoffReasonByRoute]);
    }
  });

  it("test_duplicate_dispatch", () => {
    const persona = personas[0];
    let state = haloAgentReducer(createInitialState(), {
      type: "SELECT_PERSONA",
      personaId: persona.id,
    });

    const logLengthBefore = state.transitionLog.length;
    const runIdBefore = state.runId;

    state = haloAgentReducer(state, {
      type: "SELECT_PERSONA",
      personaId: persona.id,
    });

    expect(state.transitionLog.length).toBe(logLengthBefore);
    expect(state.runId).toBe(runIdBefore);

    const routingEntries = state.transitionLog.filter(
      (entry) => entry.fromStatus === "idle" && entry.toStatus === "routing"
    );
    expect(routingEntries.length).toBe(1);

    const duplicateEvents = state.events.filter(
      (event) => event.decision === "duplicate_select_ignored"
    );
    expect(duplicateEvents.length).toBe(1);
  });

  it("test_malformed_input", () => {
    const emptyIdResult = haloAgentReducer(createInitialState(), {
      type: "SELECT_PERSONA",
      personaId: "",
    });

    expect(emptyIdResult.status).toBe("idle");
    expect(emptyIdResult.error).not.toBeNull();
    expect(emptyIdResult.transitionLog.length).toBe(0);
    expect(emptyIdResult.events.at(-1)?.result).toBe("error");

    const unknownIdResult = haloAgentReducer(createInitialState(), {
      type: "SELECT_PERSONA",
      personaId: "does-not-exist",
    });

    expect(unknownIdResult.status).toBe("idle");
    expect(unknownIdResult.error).not.toBeNull();
    expect(unknownIdResult.personaId).toBeNull();
    expect(unknownIdResult.contextPanel).toBeNull();

    const emptyReason = emptyIdResult.events.at(-1)?.reason ?? "";
    const unknownReason = unknownIdResult.events.at(-1)?.reason ?? "";
    expect(emptyReason).toContain("empty persona id");
    expect(unknownReason).toContain("unknown persona id");
    expect(unknownReason).toContain("does-not-exist");
    expect(emptyReason).not.toBe(unknownReason);

    const recovery = haloAgentReducer(emptyIdResult, {
      type: "SELECT_PERSONA",
      personaId: personas[0].id,
    });

    expect(recovery.status).toBe("routing");
    expect(recovery.error).toBeNull();
  });

  it("test_boundary_escalation", () => {
    const escalationPersona = personas.find(
      (p) => p.expectedRoute === "human_escalation"
    );
    const specialistPersona = personas[0];
    expect(escalationPersona).toBeDefined();
    expect(specialistPersona.expectedRoute).toBe("specialist_a");

    const terminalPersonas = [escalationPersona!, specialistPersona];

    for (const persona of terminalPersonas) {
      const terminal = driveToRouted(createInitialState(), persona.id);
      expect(terminal.status).toBe(persona.expectedRoute);

      const logLengthBefore = terminal.transitionLog.length;

      const extraTarget =
        persona.expectedRoute === "specialist_a"
          ? "specialist_b"
          : "specialist_a";

      const afterExtraRoute = haloAgentReducer(terminal, {
        type: "ROUTE_DECISION",
        result: extraTarget,
      });

      expect(afterExtraRoute.status).toBe(terminal.status);
      expect(afterExtraRoute.status).not.toBe("routing");
      expect(afterExtraRoute.transitionLog.length).toBe(logLengthBefore);

      const ignoredEvent = afterExtraRoute.events.at(-1);
      expect(ignoredEvent?.decision).toBe("route_decision_ignored");
      expect(ignoredEvent?.result).toBe("no-op");
      expect(ignoredEvent?.reason).toContain("terminal");
    }
  });

  it("test_restart", () => {
    const snapshot = createInitialState();

    const failedRun = haloAgentReducer(
      haloAgentReducer(createInitialState(), {
        type: "SELECT_PERSONA",
        personaId: personas[0].id,
      }),
      { type: "SIMULATE_PROVIDER_FAILURE" }
    );
    expect(failedRun.status).toBe("route_failed");

    const midRunScenarios: HaloAgentState[] = [
      driveToRouted(createInitialState(), personas[0].id),
      driveToRouted(createInitialState(), personas[2].id),
      haloAgentReducer(createInitialState(), {
        type: "SELECT_PERSONA",
        personaId: personas[1].id,
      }),
      failedRun,
    ];

    for (const scenario of midRunScenarios) {
      expect(scenario.status).not.toBe("idle");
      const restarted = haloAgentReducer(scenario, { type: "RESTART" });
      expect(restarted).toEqual(snapshot);
    }
  });

  it("test_simulated_provider_failure", () => {
    const persona = personas[0];

    const afterSelect = haloAgentReducer(createInitialState(), {
      type: "SELECT_PERSONA",
      personaId: persona.id,
    });
    const beforePanel = afterSelect.contextPanel!;

    const failed = haloAgentReducer(afterSelect, {
      type: "SIMULATE_PROVIDER_FAILURE",
    });

    expect(failed.status).toBe("route_failed");

    const failureEvent = failed.events.at(-1)!;
    expect(failureEvent.result).toBe("error");
    expect(failureEvent.error).not.toBeNull();
    expect(failureEvent.decision).toBe("routing_provider_failed_simulated");

    expect(failed.contextPanel!.customerTag).toBe(beforePanel.customerTag);
    expect(failed.contextPanel!.profileField).toBe(beforePanel.profileField);
    expect(failed.contextPanel!.historyExcerpt).toBe(
      beforePanel.historyExcerpt
    );
    expect(failed.contextPanel!.handoffReason).toContain("failure");

    const lastEntry = failed.transitionLog.at(-1)!;
    expect(lastEntry.fromStatus).toBe("routing");
    expect(lastEntry.toStatus).toBe("route_failed");

    const idleNoOp = haloAgentReducer(createInitialState(), {
      type: "SIMULATE_PROVIDER_FAILURE",
    });
    expect(idleNoOp.status).toBe("idle");
    expect(idleNoOp.transitionLog.length).toBe(0);
    expect(idleNoOp.events.at(-1)?.decision).toBe(
      "provider_failure_simulation_ignored"
    );
    expect(idleNoOp.events.at(-1)?.result).toBe("no-op");

    const terminalStates: HaloAgentState[] = [
      driveToRouted(createInitialState(), persona.id),
      driveToRouted(createInitialState(), personas[2].id),
      failed,
    ];

    for (const terminal of terminalStates) {
      const logLengthBefore = terminal.transitionLog.length;
      const ignored = haloAgentReducer(terminal, {
        type: "SIMULATE_PROVIDER_FAILURE",
      });
      expect(ignored.status).toBe(terminal.status);
      expect(ignored.transitionLog.length).toBe(logLengthBefore);
      expect(ignored.events.at(-1)?.decision).toBe(
        "provider_failure_simulation_ignored"
      );
      expect(ignored.events.at(-1)?.result).toBe("no-op");
    }
  });

  it("test_route_decision_after_route_failed_is_named_noop", () => {
    const failed = haloAgentReducer(
      haloAgentReducer(createInitialState(), {
        type: "SELECT_PERSONA",
        personaId: personas[0].id,
      }),
      { type: "SIMULATE_PROVIDER_FAILURE" }
    );
    expect(failed.status).toBe("route_failed");

    const logLengthBefore = failed.transitionLog.length;

    const afterRoute = haloAgentReducer(failed, {
      type: "ROUTE_DECISION",
      result: "specialist_a",
    });

    expect(afterRoute.status).toBe("route_failed");
    expect(afterRoute.transitionLog.length).toBe(logLengthBefore);
    expect(afterRoute.events.at(-1)?.decision).toBe("route_decision_ignored");
    expect(afterRoute.events.at(-1)?.result).toBe("no-op");

    const reason = afterRoute.events.at(-1)?.reason ?? "";
    expect(reason).toContain("route_failed");
    expect(reason).not.toContain("human owns the thread");
  });
});
