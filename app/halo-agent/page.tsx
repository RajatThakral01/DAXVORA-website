import type { JSX } from "react";
import HaloSchematic from "../../src/components/HaloSchematic";
import HaloAgentDemo from "../../src/demos/halo-agent/HaloAgentDemo";
import Reveal from "../../src/components/Reveal";
import DiscoveryCtaStrip from "../../src/components/DiscoveryCtaStrip";

export const metadata = {
  title: "Halo Agent — DAXVORA",
  description:
    "Halo Agent keeps context across every handoff. Shared context, channels, routing, specialist transfer, retained history, action layer, controls, and human escalation.",
};

const ELEMENTS: Array<{
  term: string;
  statement: string;
}> = [
  {
    term: "Shared context",
    statement:
      "A permission-aware view of profile fields, tags, preferences, orders, issues, and consent — created from customer data the business already holds.",
  },
  {
    term: "Channels",
    statement:
      "Meets customers where the client operates: voice, SMS, email, website chat, WhatsApp, CRM tasks, and internal queues.",
  },
  {
    term: "Routing",
    statement:
      "A router and qualifier select the right specialist for the inbound scenario, using governed context — not a hardcoded rule.",
  },
  {
    term: "Specialist transfer",
    statement:
      "Narrowly responsible agents (sales, support, billing) receive the relevant context on transfer, with the handoff reason visible.",
  },
  {
    term: "Retained history",
    statement:
      "Prior conversations, commitments, and outcomes persist across channel changes so the customer never restarts the relationship.",
  },
  {
    term: "Action layer",
    statement:
      "Controlled next steps — answer, schedule, update a record, create a task, prepare a quote, or request information — instead of text alone.",
  },
  {
    term: "Controls",
    statement:
      "Permissions, confidence thresholds, cost limits, quality review, audit history, and kill switches keep the system reviewable and reversible.",
  },
  {
    term: "Human escalation",
    statement:
      "A distinct terminal path where a human takes control, with all prior context handed off and no silent automated re-routing.",
  },
];

export default function HaloAgentPage(): JSX.Element {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" aria-label="Halo Agent overview">
        <div className="dot-grid hero__dot-grid" aria-hidden="true" />
        <div className="hero__bottom-rule" aria-hidden="true" />
        <div className="hero__inner">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Signature system / Halo Agent / 06
          </span>
          <h1 className="hero__h1">
            Halo Agent keeps context<br />
            across every handoff.
          </h1>
          <p className="hero__subtext">
            A coordinated customer-facing system that carries useful context across
            every supported channel and specialist transfer. A customer should not
            have to restart the relationship every time they change channel.
          </p>
        </div>
      </section>

      {/* ── SCHEMATIC ────────────────────────────────────── */}
      <section
        className="halo-schematic-frame"
        aria-label="Halo Agent architecture diagram"
      >
        <div className="halo-schematic-frame__inner">
          <HaloSchematic />
          <p className="halo-schematic-frame__caption">
            Shared context at the center — channels on the left, specialists and
            human escalation on the right.
          </p>
        </div>
      </section>

      {/* ── 8 ELEMENTS GRID ─────────────────────────────── */}
      <section
        style={{ background: "var(--dx-bone)", padding: "var(--section-gap) 0" }}
        aria-label="Halo Agent system elements"
      >
        <div className="page-wrap">
          <Reveal>
            <h2 style={{ marginBottom: "0.5rem" }}>Eight system elements</h2>
            <p className="t-body-lg text-graphite" style={{ marginBottom: "2.5rem", maxWidth: "52ch" }}>
              Each element is designed to make the system reviewable, reversible,
              and useful to a human decision-maker — not to obscure how it works.
            </p>
          </Reveal>

          <div className="halo-elements-grid" role="list">
            {ELEMENTS.map((el, i) => (
              <Reveal key={el.term} delay={Math.min(i * 50, 280)} style={{ height: "100%" }}>
                <article
                  className="halo-element-card"
                  role="listitem"
                  style={{ height: "100%" }}
                >
                  <h3 className="halo-element-card__name">{el.term}</h3>
                  <p className="halo-element-card__body">{el.statement}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO ─────────────────────────────────────────── */}
      <section
        className="demo-section"
        aria-label="Interactive Halo Agent demo"
        style={{ borderTop: "2px solid var(--dx-signal)" }}
      >
        <div className="demo-section__inner">
          <Reveal>
            <div className="demo-section__header">
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontWeight: 700,
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--dx-graphite)",
                    marginBottom: "0.625rem",
                  }}
                >
                  System demo
                </span>
                <h2 style={{ marginBottom: "0.75rem" }}>Try the routing</h2>
                <p className="t-body-lg text-graphite" style={{ maxWidth: "54ch" }}>
                  Select a persona to see the router, specialist transfer, and retained
                  history in action. Every run is logged in the trace panel for audit.
                  Not connected to client systems.
                </p>
              </div>
              <div
                className="signal-badge"
                style={{ alignSelf: "flex-start", flexShrink: 0 }}
              >
                <span className="signal-badge__dot" aria-hidden="true" />
                SIMULATED
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <HaloAgentDemo />
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <DiscoveryCtaStrip />
    </>
  );
}
