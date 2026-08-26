import type { JSX } from "react";
import Reveal from "../../src/components/Reveal";
import DiscoveryCtaStrip from "../../src/components/DiscoveryCtaStrip";
import DomainTile from "../../src/components/DomainTile";
import HeroSection from "../../src/components/HeroSection";

export const metadata = {
  title: "Operating Domains — DAXVORA",
  description:
    "Twelve operating domains assessed as a single complete-business reference. Start with one vertical or build a coordinated multi-domain system.",
};

const DOMAINS: Array<{ name: string; opportunities: string; start?: boolean }> = [
  {
    name: "Foundation, governance & control",
    opportunities:
      "Identity, data quality, permissions, event history, audit trails, exception queues, approvals, orchestration, and founder control views.",
    start: true,
  },
  {
    name: "Demand generation",
    opportunities:
      "Market signals, audience building, lead capture, enrichment, scoring, routing, attribution, and campaign feedback.",
  },
  {
    name: "Marketing & content",
    opportunities:
      "Research, content operations, channel distribution, asset reuse, performance learning, and brand controls.",
  },
  {
    name: "Sales orchestration",
    opportunities:
      "Qualification, account context, follow-up, proposal support, pipeline movement, handoffs, and forecasting inputs.",
  },
  {
    name: "Customer experience & LTV",
    opportunities:
      "Omnichannel service, retained context, onboarding, issue resolution, renewals, retention signals, and next-best action.",
  },
  {
    name: "Operations & SOPs",
    opportunities:
      "Intake, routing, task execution, quality checks, exception handling, documentation, and operating dashboards.",
  },
  {
    name: "Finance & profitability",
    opportunities:
      "Reconciliation support, cash visibility, margin inputs, anomaly detection, reporting, and decision-ready summaries.",
  },
  {
    name: "Supply chain & procurement",
    opportunities:
      "Demand signals, stock visibility, supplier workflows, purchasing triggers, delays, and escalation.",
  },
  {
    name: "Manufacturing & quality",
    opportunities:
      "Work-order context, quality evidence, inspection routing, issue analysis, and controlled traceability.",
  },
  {
    name: "Market intelligence & strategy",
    opportunities:
      "External signals, competitor monitoring, opportunity synthesis, scenario inputs, and executive briefings.",
  },
  {
    name: "Partnerships & distribution",
    opportunities:
      "Partner intake, enablement, performance signals, channel coordination, and relationship context.",
  },
  {
    name: "Product & R&D",
    opportunities:
      "Feedback synthesis, requirements, experimentation records, product knowledge, and launch coordination.",
  },
];

export default function OperatingDomainsPage(): JSX.Element {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        eyebrow="Coverage / business domains / 05"
        h1={<>Full-business coverage.<br />Start with one vertical.</>}
        subtext="Twelve domains assessed as a complete-business lens. Scope follows actual pain, readiness, data, risk, and direction — not a package."
        ariaLabel="Operating domains overview"
      />

      {/* ── DOMAINS GRID ─────────────────────────────────── */}
      <section
        style={{ background: "var(--dx-bone)", padding: "var(--section-gap) 0" }}
        aria-label="Twelve operating domains"
      >
        <div className="page-wrap">
          <Reveal>
            <h2 style={{ marginBottom: "0.5rem" }}>
              Twelve domains, one architecture
            </h2>
            <p className="t-body-lg text-graphite" style={{ marginBottom: "2.5rem", maxWidth: "54ch" }}>
              Coverage is generalized from an internal client architecture reference.
              It is not a claim that every domain is already deployed for every client.
            </p>
          </Reveal>

          <div className="domains-grid" role="list">
            {DOMAINS.map((domain, i) => (
              <Reveal key={domain.name} delay={Math.min(i * 40, 300)} style={{ height: "100%" }}>
                <DomainTile
                  index={i + 1}
                  name={domain.name}
                  opportunities={domain.opportunities}
                />
              </Reveal>
            ))}
          </div>

          {/* Start with one callout */}
          <Reveal delay={200}>
            <div className="domain-callout" role="complementary" aria-label="Start with one vertical">
              <div className="domain-callout__text">
                <h3 className="domain-callout__headline">
                  Start with one vertical. Build the full picture over time.
                </h3>
                <p className="domain-callout__sub">
                  Foundation, governance & control is the most common starting point —
                  it establishes the data layer every other domain depends on.
                  One conversation maps your readiness and identifies where to begin.
                </p>
              </div>
              <a href="/contact" className="btn btn--primary">
                Book a discovery call
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <DiscoveryCtaStrip />
    </>
  );
}
