import type { JSX } from "react";
import Reveal from "../../src/components/Reveal";
import DiscoveryCtaStrip from "../../src/components/DiscoveryCtaStrip";

export const metadata = {
  title: "About — DAXVORA",
  description:
    "DAXVORA started after a year of building AI workflows and seeing the same missed opportunity. Operating principles, founder intent, and what success should feel like.",
};

const PRINCIPLES = [
  {
    name: "Legal and ethical work only",
    body: "DAXVORA will not build systems whose purpose or operation breaks applicable law.",
  },
  {
    name: "Truth before theater",
    body: "Simulations, intended integrations, and live capability are labeled accurately — LIVE, TEST, MOCKED, or SIMULATED. Simulated demos state that they are not connected to client systems.",
  },
  {
    name: "The goal determines the system",
    body: "If a client wants one outcome, DAXVORA builds the sequence of goals and capabilities that lead to it — not a pre-selected tool or agent.",
  },
  {
    name: "Automation remains observable",
    body: "Important actions, failures, costs, and exceptions must be reviewable by the decision-maker. Observation is not optional.",
  },
];

const SUCCESS_ITEMS = [
  {
    label: "Better customer treatment",
    text: "Relevant, consistent help informed by history and current need.",
  },
  {
    label: "Greater availability",
    text: "Stable workflows beyond individual schedules.",
  },
  {
    label: "Lower operating cost",
    text: "Repeatable work uses less manual effort while quality stays visible.",
  },
  {
    label: "Improved quality",
    text: "Rules, context, evidence, and measurement reduce preventable inconsistency.",
  },
  {
    label: "Processed information",
    text: "Decisions, exceptions, risks, and opportunities — not raw data.",
  },
  {
    label: "More human focus",
    text: "Judgment, relationships, creativity, and the work that actually matters.",
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" aria-label="About DAXVORA">
        <div className="dot-grid hero__dot-grid" aria-hidden="true" />
        <div className="hero__bottom-rule" aria-hidden="true" />
        <div className="hero__inner">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Vision / principles / 08
          </span>
          <h1 className="hero__h1">
            DAXVORA began where<br />
            scattered data meets<br />
            real operating pain.
          </h1>
          <p className="hero__subtext">
            Businesses already hold a large amount of customer and operating data.
            It is scattered and often goes unnoticed. DAXVORA exists to make it usable.
          </p>
        </div>
      </section>

      {/* ── FOUNDER QUOTE ────────────────────────────────── */}
      <section className="pull-quote" aria-label="Founder intent">
        <div className="pull-quote__inner">
          <div className="pull-quote__rule" aria-hidden="true" />
          <blockquote className="pull-quote__text">
            After more than a year of building AI workflows and seeing the same
            missed opportunity — founders already hold the data. They just need
            the structure to use it.
          </blockquote>
        </div>
      </section>

      {/* ── OPERATING PRINCIPLES ─────────────────────────── */}
      <section className="principles-list" aria-label="Operating principles">
        <div className="principles-list__inner">
          <Reveal>
            <h2 style={{ marginBottom: "2rem" }}>Operating principles</h2>
          </Reveal>

          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="principle-item">
                <p className="principle-item__number">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="principle-item__name">{p.name}</h3>
                  <p className="principle-item__body">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WHAT SUCCESS LOOKS LIKE ──────────────────────── */}
      <section
        style={{ background: "var(--dx-mist)", padding: "var(--section-gap) 0" }}
        aria-label="What success should feel like"
      >
        <div className="page-wrap">
          <Reveal>
            <h2 style={{ marginBottom: "0.5rem" }}>What success should feel like</h2>
            <p className="t-body-lg text-graphite" style={{ marginBottom: "2.5rem", maxWidth: "52ch" }}>
              More availability and better information without turning the business
              into an opaque machine.
            </p>
          </Reveal>

          <div className="success-grid" role="list">
            {SUCCESS_ITEMS.map((item, i) => (
              <Reveal key={item.label} delay={i * 60} style={{ height: "100%" }}>
                <div
                  role="listitem"
                  style={{
                    height: "100%",
                    background: "var(--dx-white)",
                    padding: "1.5rem 1.5rem",
                    transition: "background var(--t-base)",
                  }}
                  className="halo-element-card"
                >
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      color: "var(--dx-carbon)",
                      marginBottom: "0.375rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      color: "var(--dx-graphite)",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <DiscoveryCtaStrip />
    </>
  );
}
