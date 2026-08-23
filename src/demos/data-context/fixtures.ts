import type { ContextLayer, DecisionRecord } from "./types";

export interface ScenarioSourceSeed {
  name: string;
  raw: string;
  requiresFields: string[];
}

export interface ScenarioFixture {
  id: string;
  label: string;
  sourceSeeds: ScenarioSourceSeed[];
  expectedContextFields: Record<string, string>;
  expectedCompleteness: ContextLayer["completeness"];
  decision: DecisionRecord;
  evidence: string;
}

export const scenarios: ScenarioFixture[] = [
  {
    id: "scenario-onboarding-intake",
    label: "New intake form plus matching CRM note",
    sourceSeeds: [
      {
        name: "form_submission",
        raw: "email=founder@acme.example; company_name=Acme Studio; team_size=6",
        requiresFields: [],
      },
      {
        name: "crm_note",
        raw: "company_name=Acme Studio; engagement_interest=data_foundation",
        requiresFields: [],
      },
    ],
    expectedContextFields: {
      email: "founder@acme.example",
      company_name: "Acme Studio",
      team_size: "6",
      engagement_interest: "data_foundation",
    },
    expectedCompleteness: "complete",
    decision: {
      action: "queue_data_foundation_discovery_call",
      reason:
        "Complete intake for Acme Studio with explicit data-foundation interest.",
    },
    evidence:
      "Build evidence (PRD §7.5): two clean sources merge into a complete " +
      "context layer and produce the discovery-call decision.",
  },
  {
    id: "scenario-renewal-signals",
    label: "Support sentiment paired with billing tier",
    sourceSeeds: [
      {
        name: "support_message",
        raw: "contract_end=2027-02-01; renewal_sentiment=at_risk",
        requiresFields: [],
      },
      {
        name: "billing_record",
        raw: "plan_tier=growth; mrr_band=10k_25k",
        requiresFields: [],
      },
    ],
    expectedContextFields: {
      contract_end: "2027-02-01",
      renewal_sentiment: "at_risk",
      plan_tier: "growth",
      mrr_band: "10k_25k",
    },
    expectedCompleteness: "complete",
    decision: {
      action: "open_renewal_review_task",
      reason:
        "Renewal-risk sentiment near contract end on a growth-tier account.",
    },
    evidence:
      "Build evidence (PRD §7.5): a second clean pair produces a DIFFERENT " +
      "decision than scenario-onboarding-intake (renewal review, not " +
      "discovery call) — proves routing is data-driven, not hardcoded.",
  },
  {
    id: "scenario-incomplete-refund",
    label: "Payment event without a stated refund reason",
    sourceSeeds: [
      {
        name: "payment_event",
        raw: "amount=249.00; currency=USD",
        requiresFields: [],
      },
      {
        name: "support_message",
        raw: "channel=email",
        requiresFields: ["refund_reason"],
      },
    ],
    expectedContextFields: {
      amount: "249.00",
      currency: "USD",
    },
    expectedCompleteness: "partial",
    decision: {
      action: "queue_manual_refund_review",
      reason:
        "Partial context: payment captured without a stated refund reason.",
    },
    evidence:
      "Build evidence (PRD §5.2 negative criterion): the support_message " +
      "source is missing required field 'refund_reason' after normalization, " +
      "so governance MUST exclude it with a stated exclusionReason and mark " +
      "the context partial — never crash, never silently include bad data. " +
      "A defined manual-review decision must still be reachable.",
  },
  {
    id: "scenario-owner-conflict",
    label: "Two CRM records disagreeing on account owner",
    sourceSeeds: [
      {
        name: "older_crm_export",
        raw: "owner_name=Dana K.; region=west",
        requiresFields: [],
      },
      {
        name: "recent_crm_update",
        raw: "owner_name=Ravi P.; stage=negotiation",
        requiresFields: [],
      },
    ],
    expectedContextFields: {
      owner_name: "Ravi P.",
      region: "west",
      stage: "negotiation",
    },
    expectedCompleteness: "complete",
    decision: {
      action: "verify_account_owner_before_outreach",
      reason:
        "Conflicting owner records resolved to most recent update; verification queued.",
    },
    evidence:
      "Build evidence (PRD §5.2 + conflict acceptance): precedence rule is " +
      "'most recent source wins', where sources are ordered oldest-to-newest " +
      "in sourceSeeds and later positions overwrite earlier ones per field. " +
      "owner_name MUST resolve to Ravi P. (recent_crm_update), not Dana K.",
  },
];

export function findScenario(scenarioId: string): ScenarioFixture | undefined {
  return scenarios.find((s) => s.id === scenarioId);
}
