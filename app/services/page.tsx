import type { JSX } from "react";
import DemandPipelineDiagram from "../../src/components/DemandPipelineDiagram";
import Reveal from "../../src/components/Reveal";
import DemandSignalDemo from "../../src/demos/demand-signal/DemandSignalDemo";
import DiscoveryCtaStrip from "../../src/components/DiscoveryCtaStrip";
import ServiceCard from "../../src/components/ServiceCard";
import HeroSection from "../../src/components/HeroSection";

export const metadata = {
  title: "Services — DAXVORA",
  description:
    "Operating-system discovery, data foundations, Halo Agent, demand operations, and decision intelligence — phased around evidence and deployment readiness.",
};

interface ServiceRow {
  name: string;
  bestFor: string;
  deliverable: string;
}

const SERVICES: Array<ServiceRow & { num: string }> = [
  {
    num: "SERVICE 01",
    name: "Operating-system discovery",
    bestFor:
      "Founders who need a clear view of bottlenecks and automation opportunities before choosing a build.",
    deliverable:
      "Atomic workflow map, data/context map, opportunity priorities, architecture, risks, and phased roadmap.",
  },
  {
    num: "SERVICE 02",
    name: "Data & context foundations",
    bestFor:
      "Teams whose customer history, notes, conversations, and decisions live scattered across inboxes, spreadsheets, CRM, chat, and people.",
    deliverable:
      "Required systems connected, important data normalized, identity, permissions, retention, and shared context defined into a governed context layer.",
  },
  {
    num: "SERVICE 03",
    name: "Halo Agent",
    bestFor:
      "A business that needs consistent, context-aware sales and service across several channels.",
    deliverable:
      "Channel integrations, retained customer context, specialist agents with controlled handoffs, an action layer, controls, and quality measurement.",
  },
  {
    num: "SERVICE 04",
    name: "Demand generation & revenue operations",
    bestFor:
      "Businesses that need market signals turned into qualified, attributable pipeline instead of untracked activity.",
    deliverable:
      "Audience building, lead capture, enrichment, scoring, routing, attribution, and campaign feedback wired into revenue workflows.",
  },
  {
    num: "SERVICE 05",
    name: "Business-process automation",
    bestFor:
      "Teams copying data, sending routine follow-ups, preparing reports, qualifying requests, or rebuilding the same answer.",
    deliverable:
      "Stable repeatable steps automated with intake, routing, task execution, quality checks, exception handling, and evidence of every action retained.",
  },
  {
    num: "SERVICE 06",
    name: "Decision intelligence",
    bestFor:
      "Founders who want decisions, exceptions, risks, and opportunities surfaced — not another pile of raw data.",
    deliverable:
      "Decision-ready summaries, reconciliation support, cash visibility, margin inputs, anomaly detection, and scenario inputs from governed data.",
  },
];

export default function ServicesPage(): JSX.Element {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        eyebrow="Six services, one operating system"
        h1={<>One vertical first.<br />Or architect the whole OS.</>}
        subtext="Every engagement is phased around evidence and deployment readiness. Scope follows your actual pain, readiness, data, risk, and direction."
        ariaLabel="Services overview"
      />

      {/* ── SERVICES CARDS ───────────────────────────────── */}
      <section
        style={{ background: "var(--dx-bone)", padding: "var(--section-gap) 0" }}
        aria-label="Available services"
      >
        <div className="page-wrap">
          <Reveal>
            <h2 style={{ marginBottom: "0.5rem" }}>What we build</h2>
            <p className="t-body-lg text-graphite" style={{ marginBottom: "2.5rem", maxWidth: "52ch" }}>
              Compare what each service is best for and what a client actually receives.
            </p>
          </Reveal>

          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.name} delay={Math.min(i * 60, 240)}>
                <ServiceCard
                  num={svc.num}
                  name={svc.name}
                  bestFor={svc.bestFor}
                  deliverable={svc.deliverable}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMAND-TO-REVENUE BENTO ───────────────────────── */}
      <section
        style={{
          background: "var(--dx-bone)",
          padding: "var(--section-gap) 0",
          borderTop: "2px solid var(--dx-signal)",
        }}
        aria-label="Demand-to-Revenue pipeline demo"
      >
        <div className="page-wrap">
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--dx-graphite)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Service 04 in practice
                </p>
                <h2 style={{ marginBottom: "0.5rem" }}>From signal to routed outcome</h2>
                <p className="t-body-lg text-graphite" style={{ maxWidth: "52ch" }}>
                  Follow a raw signal through the complete resolution pipeline, 
                  all visible in the interactive demo.
                </p>
              </div>
              <div className="signal-badge" style={{ flexShrink: 0, alignSelf: "flex-start" }}>
                <span className="signal-badge__dot" aria-hidden="true" />
                SIMULATED
              </div>
            </div>
          </Reveal>

          {/* Bento: diagram left | demo right */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "1.25rem",
              alignItems: "stretch",
            }}
            className="services-bento"
          >
            {/* Left: pipeline diagram */}
            <Reveal style={{ height: "100%" }}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--dx-white)",
                  borderRadius: "var(--radius)",
                  borderTop: "2px solid var(--dx-carbon)",
                  padding: "1.75rem 1.5rem 2rem",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--dx-graphite)",
                    marginBottom: "1.25rem",
                  }}
                >
                  Five pipeline stages
                </p>
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <DemandPipelineDiagram />
                </div>
              </div>
            </Reveal>

            {/* Right: interactive demo */}
            <Reveal delay={80} style={{ height: "100%" }}>
              <div
                style={{
                  height: "100%",
                  background: "var(--dx-white)",
                  borderRadius: "var(--radius)",
                  borderTop: "2px solid var(--dx-signal)",
                  padding: "1.75rem 1.5rem 2rem",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--dx-graphite)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Try the pipeline
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--dx-graphite)",
                    lineHeight: 1.6,
                    marginBottom: "1.25rem",
                  }}
                >
                  Select a signal — every run is logged in the trace panel. Not
                  connected to client systems.
                </p>
                <DemandSignalDemo />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <DiscoveryCtaStrip />
    </>
  );
}
