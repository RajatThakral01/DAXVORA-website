import type { ContextPanel, RouteTarget } from "./types";

export interface PersonaFixture {
  id: string;
  label: string;
  context: Omit<ContextPanel, "handoffReason">;
  expectedRoute: RouteTarget;
  handoffReasonByRoute: Record<RouteTarget, string>;
  signalAmbiguous: boolean;
  evidence: string;
}

export const FALLBACK_ROUTE: RouteTarget = "specialist_b";

export const personas: PersonaFixture[] = [
  {
    id: "persona-invoice-mismatch",
    label: "Invoice doesn't match what we were quoted",
    context: {
      customerTag: "billing-question",
      profileField: "account_type: founder-led, 6-person team",
      historyExcerpt:
        "Visitor: 'Our last invoice is $400 higher than the scope we agreed.'",
    },
    expectedRoute: "specialist_a",
    handoffReasonByRoute: {
      specialist_a:
        "Billing variance detected — routed to revenue-operations specialist.",
      specialist_b:
        "Routed to demand-generation specialist (not expected for this fixture).",
      human_escalation:
        "Escalated to human operator (not expected for this fixture).",
    },
    signalAmbiguous: false,
    evidence:
      "Build evidence (PRD §7.5): fixture persona-invoice-mismatch MUST end " +
      "in status specialist_a with billing-specific handoff reason; context " +
      "panel fields unchanged across the transition.",
  },
  {
    id: "persona-pipeline-question",
    label: "Where do our inbound leads actually come from?",
    context: {
      customerTag: "demand-signal",
      profileField: "account_type: founder-led, 12-person team",
      historyExcerpt:
        "Visitor: 'We get leads but can't tell which channel produces them.'",
    },
    expectedRoute: "specialist_b",
    handoffReasonByRoute: {
      specialist_a:
        "Routed to revenue-operations specialist (not expected for this fixture).",
      specialist_b:
        "Channel-attribution question — routed to demand-generation specialist.",
      human_escalation:
        "Escalated to human operator (not expected for this fixture).",
    },
    signalAmbiguous: false,
    evidence:
      "Build evidence (PRD §7.5): fixture persona-pipeline-question MUST end " +
      "in status specialist_b with attribution-specific handoff reason; context " +
      "panel fields unchanged across the transition.",
  },
  {
    id: "persona-ask-for-human",
    label: "I want to talk to a person before sharing anything",
    context: {
      customerTag: "human-requested",
      profileField: "account_type: founder-led, 3-person team",
      historyExcerpt:
        "Visitor: 'No offense to your bot, but I'd rather describe this to a human.'",
    },
    expectedRoute: "human_escalation",
    handoffReasonByRoute: {
      specialist_a:
        "Routed to revenue-operations specialist (not expected for this fixture).",
      specialist_b:
        "Routed to demand-generation specialist (not expected for this fixture).",
      human_escalation:
        "Visitor explicitly requested a human — escalated per controls policy.",
    },
    signalAmbiguous: false,
    evidence:
      "Build evidence (PRD §7.5): fixture persona-ask-for-human MUST end in " +
      "status human_escalation; further ROUTE_DECISION dispatches are a named " +
      "no-op (terminal state, human owns the thread).",
  },
  {
    id: "persona-vague-inquiry",
    label: "Just exploring… not sure what I need yet",
    context: {
      customerTag: "unclassified",
      profileField: "account_type: unknown",
      historyExcerpt:
        "Visitor: 'Someone said you do AI stuff? We have data everywhere.'",
    },
    expectedRoute: "specialist_b",
    handoffReasonByRoute: {
      specialist_a:
        "Routed to revenue-operations specialist (fallback path taken).",
      specialist_b:
        "Signal too ambiguous to classify — routed to fallback specialist_b.",
      human_escalation:
        "Escalated to human operator (not expected for this fixture).",
    },
    signalAmbiguous: true,
    evidence:
      "Build evidence (PRD §7.5 + negative acceptance criterion): ambiguous " +
      "signal MUST resolve to defined fallback route (FALLBACK_ROUTE = " +
      "specialist_b), never an undefined/broken status.",
  },
];

export function findPersona(personaId: string): PersonaFixture | undefined {
  return personas.find((p) => p.id === personaId);
}

export function resolveExpectedRoute(persona: PersonaFixture): RouteTarget {
  if (persona.signalAmbiguous) {
    return FALLBACK_ROUTE;
  }
  return persona.expectedRoute;
}
