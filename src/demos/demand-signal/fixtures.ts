import type {
  AttributionRecord,
  ClassificationRecord,
  RoutingRecord,
  ScoreRecord,
  ValidationRecord,
} from "./types";

export interface SignalFixture {
  id: string;
  label: string;
  source: string;
  payload: string;
  requiredFields: string[];
  expectedValidation: ValidationRecord;
  expectedClassification: ClassificationRecord;
  expectedScore: ScoreRecord;
  expectedAttribution: AttributionRecord;
  expectedRouting: RoutingRecord;
  evidence: string;
}

export const signals: SignalFixture[] = [  {
    id: "signal-webinar-demo",
    label: "Webinar signup asking for a demo",
    source: "webinar_signup",
    payload:
      "email=ceo@growthco.example; company=GrowthCo; intent=demo_request; campaign=q3-webinar; touch=q3-webinar,retargeting_ad; channel=paid_events",
    requiredFields: ["email", "intent"],
    expectedValidation: {
      valid: true,
      reason: "all required fields present",
    },
    expectedClassification: {
      category: "demo_request",
      confidence: "high",
    },
    expectedScore: { value: 92, band: "hot" },
    expectedAttribution: {
      channel: "paid_events",
      touchpoints: ["q3-webinar", "retargeting_ad"],
    },
    expectedRouting: {
      destination: "senior_ae_queue",
      reason: "High-intent demo request from a multi-touch paid campaign.",
    },
    evidence:
      "Build evidence (PRD §7.5): clean high-confidence signal MUST reach " +
      "routed with hot band and MULTI-touchpoint attribution.",
  },
  {
    id: "signal-newsletter-pricing",
    label: "Newsletter reply asking about pricing",
    source: "newsletter_reply",
    payload:
      "email=ops@harbor.example; company=Harbor Ltd; intent=pricing_question; campaign=spring-newsletter; touch=newsletter; channel=owned_media",
    requiredFields: ["email", "intent"],
    expectedValidation: {
      valid: true,
      reason: "all required fields present",
    },
    expectedClassification: {
      category: "pricing_question",
      confidence: "medium",
    },
    expectedScore: { value: 64, band: "warm" },
    expectedAttribution: {
      channel: "owned_media",
      touchpoints: ["newsletter"],
    },
    expectedRouting: {
      destination: "sdr_queue",
      reason: "Pricing interest from an owned-media single touch.",
    },
    evidence:
      "Build evidence (PRD §7.5): second clean signal MUST reach routed with " +
      "a DIFFERENT score band (warm) and DIFFERENT routing destination " +
      "(sdr_queue vs senior_ae_queue) — proves the pipeline is data-driven.",
  },
  {
    id: "signal-missing-email",
    label: "Form submission with no identifying email",
    source: "form_submission",
    payload: "company=GhostCo; intent=demo_request; campaign=unknown",
    requiredFields: ["email", "intent"],
    expectedValidation: {
      valid: false,
      reason: "missing required field(s): email",
    },
    expectedClassification: { category: "", confidence: "low" },
    expectedScore: { value: 0, band: "cold" },
    expectedAttribution: { channel: "", touchpoints: [] },
    expectedRouting: { destination: "", reason: "" },
    evidence:
      "Build evidence (PRD §7.5 negative criterion): genuinely checkable " +
      "validity condition — required field 'email' absent from payload. " +
      "VALIDATE must route to signal_rejected with that specific reason and " +
      "MUST NOT proceed to classification.",
  },
  {
    id: "signal-community-mention",
    label: "Neutral community forum mention",
    source: "community_mention",
    payload:
      "handle=@bitloop; context=forum_thread; sentiment=neutral; touch=community_thread; channel=community",
    requiredFields: ["context"],
    expectedValidation: {
      valid: true,
      reason: "all required fields present",
    },
    expectedClassification: {
      category: "general_interest",
      confidence: "low",
    },
    expectedScore: { value: 21, band: "cold" },
    expectedAttribution: {
      channel: "community",
      touchpoints: ["community_thread"],
    },
    expectedRouting: {
      destination: "nurture_sequence",
      reason: "Low-signal mention with no stated intent; nurture instead of sales.",
    },
    evidence:
      "Build evidence (PRD §7.5): low-confidence signal that still VALIDATES " +
      "but scores into the cold band with single-source attribution — proves " +
      "scoring is not binary (hot-vs-rejected).",
  },
  {
    id: "signal-threshold-boundary",
    label: "Score exactly at hot threshold",
    source: "webinar_signup",
    payload:
      "email=threshold@test.example; company=Threshold Co; intent=demo_request; campaign=q3-webinar; touch=q3-webinar; channel=paid_events",
    requiredFields: ["email", "intent"],
    expectedValidation: {
      valid: true,
      reason: "all required fields present",
    },
    expectedClassification: {
      category: "demo_request",
      confidence: "high",
    },
    expectedScore: { value: 80, band: "hot" },
    expectedAttribution: {
      channel: "paid_events",
      touchpoints: ["q3-webinar"],
    },
    expectedRouting: {
      destination: "senior_ae_queue",
      reason: "At-threshold score assigned to higher band per documented rule.",
    },
    evidence:
      "Build evidence (PRD §5.3 boundary tie-breaking): score 80 is exactly at " +
      "the hot threshold (hot >=80, warm 50-79, cold <50). Documented rule: " +
      "threshold value belongs to the higher band — 80 → hot, not warm. Verifies " +
      "tie at threshold is handled deterministically, not arbitrarily.",
  },
];

export function findSignal(signalId: string): SignalFixture | undefined {
  return signals.find((s) => s.id === signalId);
}
