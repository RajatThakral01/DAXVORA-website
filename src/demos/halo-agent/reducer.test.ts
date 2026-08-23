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

    const midRunScenarios: HaloAgentState[] = [
      driveToRouted(createInitialState(), personas[0].id),
      driveToRouted(createInitialState(), personas[2].id),
      haloAgentReducer(createInitialState(), {
        type: "SELECT_PERSONA",
        personaId: personas[1].id,
      }),
    ];

    for (const scenario of midRunScenarios) {
      expect(scenario.status).not.toBe("idle");
      const restarted = haloAgentReducer(scenario, { type: "RESTART" });
      expect(restarted).toEqual(snapshot);
    }
  });
});
