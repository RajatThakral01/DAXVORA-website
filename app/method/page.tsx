import type { JSX } from "react";
import "./method.css";
import DataContextDiagram from "../../src/components/DataContextDiagram";
import MethodDiagram from "../../src/components/MethodDiagram";
import MethodStages from "../../src/components/MethodStages";
import Reveal from "../../src/components/Reveal";
import DataContextDemo from "../../src/demos/data-context/DataContextDemo";
import DiscoveryCtaStrip from "../../src/components/DiscoveryCtaStrip";
import HeroSection from "../../src/components/HeroSection";

export const metadata = {
  title: "Method — DAXVORA",
  description:
    "The DAXVORA method: seven stages from founder discovery to operate-and-improve. Discovery creates the operating model; technology follows it.",
};

const STAGES = [
  {
    number: "01",
    name: "Founder discovery",
    work: "Understand goals, constraints, customers, team roles, economics, current tools, pain points, and the direction of the business.",
    output: "Outcome map and discovery record",
  },
  {
    number: "02",
    name: "Atomic decomposition",
    work: "Break each workflow into triggers, inputs, decisions, actions, owners, exceptions, controls, and evidence.",
    output: "Current-state workflow map",
  },
  {
    number: "03",
    name: "Opportunity design",
    work: "Find where work can become better, faster, less expensive, more consistent, or more available.",
    output: "Prioritized opportunity backlog",
  },
  {
    number: "04",
    name: "Data and context foundation",
    work: "Connect the required systems, normalize important data, define identity, permissions, retention, and shared context.",
    output: "Governed context layer",
  },
  {
    number: "05",
    name: "Agent and automation build",
    work: "Create narrowly responsible agents, deterministic automations, handoffs, human escalation, and observability.",
    output: "Working vertical slice",
  },
  {
    number: "06",
    name: "Phased deployment",
    work: "Release by phase, validate on real operating evidence, improve failure handling, and expand only when ready.",
    output: "Measured deployment",
  },
  {
    number: "07",
    name: "Operate and improve",
    work: "Maintain integrations, tune rules, monitor quality and cost, and identify the next bottleneck.",
    output: "Ongoing service and optimization",
  },
];

export default function MethodPage(): JSX.Element {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection
        eyebrow="Method / system design / 04"
        h1={
          <>
            Discovery creates the<br />
            operating model.<br />
            Technology follows it.
          </>
        }
        subtext="Seven stages. Each produces a defined output. No layer is built until the layer below it is ready."
        ariaLabel="DAXVORA method overview"
      />

      {/* ── METHOD DIAGRAM ───────────────────────────────── */}
      <section
        style={{
          background: "var(--dx-carbon)",
          padding: "2.5rem 0",
          borderTop: "1px solid rgb(255 255 255 / 0.06)",
          borderBottom: "2px solid var(--dx-signal)",
        }}
        aria-label="Method flow diagram"
      >
        <div className="page-wrap">
          <MethodDiagram />
          <p
            className="diagram-caption"
            style={{ color: "rgb(255 255 255 / 0.35)", marginTop: "0.875rem" }}
          >
            Seven-stage sequence — the full stage breakdown follows below.
          </p>
        </div>
      </section>

      {/* ── 7 STAGES: scroll-snap (desktop) + accordion (mobile) ── */}
      <section
        style={{ background: "var(--dx-bone)", padding: "var(--section-gap) 0" }}
        aria-label="Seven method stages"
      >
        <div className="page-wrap">
          <Reveal>
            <h2 style={{ marginBottom: "2.5rem" }}>The seven stages</h2>
          </Reveal>

          {/* Client component handles scroll-snap + accordion */}
          <Reveal delay={100}>
            <MethodStages stages={STAGES} />
          </Reveal>
        </div>
      </section>

      {/* ── DATA & CONTEXT DEMO ──────────────────────────── */}
      <section
        className="demo-section"
        aria-label="Data and Context Foundation demo"
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
                  Stage 04 in practice
                </span>
                <h2 style={{ marginBottom: "0.75rem" }}>
                  See the data foundation being built
                </h2>
                <p className="t-body-lg text-graphite" style={{ maxWidth: "54ch" }}>
                  Stage 04 connects required systems, normalizes important data,
                  and defines shared context — producing the governed context layer
                  every agent depends on.
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

          <Reveal delay={80}>
            <div style={{ margin: "1.5rem 0" }}>
              <DataContextDiagram />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div>
              <h3 style={{ marginBottom: "1rem" }}>Try the pipeline</h3>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--dx-graphite)",
                  marginBottom: "1.5rem",
                  maxWidth: "56ch",
                  lineHeight: 1.65,
                }}
              >
                Choose a scenario to see how sources are normalized, a governed
                context layer built, and a decision/action produced. Not connected
                to client systems.
              </p>
              <DataContextDemo />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <DiscoveryCtaStrip />
    </>
  );
}
