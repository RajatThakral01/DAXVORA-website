import type { JSX } from "react";
import Link from "next/link";
import HomeOverviewDiagram from "../src/components/HomeOverviewDiagram";
import DiscoveryCtaStrip from "../src/components/DiscoveryCtaStrip";
import Reveal from "../src/components/Reveal";

export const metadata = {
  title: "DAXVORA — Data First. Agents Next.",
  description:
    "DAXVORA designs data and agentic operating systems for founder-led businesses of 2–20 people. Discovery, atomic workflow, and Halo Agent.",
};

const TODAY_ITEMS = [
  "Operating-system discovery and mapping",
  "Data and context foundation setup",
  "Halo Agent customer-facing coordination",
  "Demand generation and revenue operations",
  "Business-process automation",
  "Decision intelligence layer",
];

const VISION_ITEMS = [
  "High-autonomy operating model across all domains",
  "AI prepares, coordinates, and executes appropriate work",
  "Decision-maker reviews exceptions, insights, and outcomes",
  "Full-business auto mode — phased, reviewable, evidence-led",
];

const SCOPE_TILES = [
  {
    number: "2–20",
    label: "Team members",
    body: "Lean teams that have outgrown manual coordination but do not want to lose founder-level judgment.",
  },
  {
    number: "$1M+",
    label: "Annual revenue",
    body: "Six- to seven-figure businesses with proven demand and fragmented data across people and tools.",
  },
  {
    number: "1→all",
    label: "Vertical scope",
    body: "Start with one vertical or architect a coordinated system across the entire business.",
  },
];

const NAV_CARDS = [
  {
    href: "/method",
    tag: "PROCESS",
    title: "The DAXVORA method",
    desc: "Seven stages from founder discovery to operate-and-improve, each producing a defined output.",
  },
  {
    href: "/services",
    tag: "SERVICES",
    title: "What we build",
    desc: "Operating-system discovery, data foundations, Halo Agent, demand operations, and decision intelligence.",
  },
  {
    href: "/halo-agent",
    tag: "SIGNATURE SYSTEM",
    title: "Halo Agent",
    desc: "Shared customer context carried across every channel and specialist handoff — no restarting the relationship.",
  },
];

export default function Home(): JSX.Element {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="hero hero--split" aria-label="DAXVORA introduction">
        {/* Dot-grid texture */}
        <div className="dot-grid hero__dot-grid" aria-hidden="true" />
        {/* Signal gradient at bottom */}
        <div className="hero__bottom-rule" aria-hidden="true" />

        <div className="hero__inner">
          {/* Left: copy */}
          <div>
            <span className="hero__eyebrow" aria-label="Category">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Operating systems for lean businesses
            </span>

            <h1 className="hero__h1">
              Data first.<br />
              Agents next.<br />
              Operations that<br />
              compound.
            </h1>

            <p className="hero__subtext">
              DAXVORA builds the data and agentic layer for founder-led businesses
              with 2–20 people — fragmented systems, coordinated through structured
              discovery and phased deployment.
            </p>

            <div className="hero__ctas">
              <Link href="/contact" className="btn btn--primary">
                Book a discovery call
              </Link>
              <Link href="/method" className="btn btn--outline-white">
                See the method
              </Link>
            </div>
          </div>

          {/* Right: diagram */}
          <div className="hero__visual" aria-hidden="true">
            <HomeOverviewDiagram />
          </div>
        </div>
      </section>

      {/* ── SIMULATED NOTICE ──────────────────────────────── */}
      <div
        style={{
          background: "var(--dx-carbon)",
          borderTop: "1px solid rgb(255 255 255 / 0.06)",
          padding: "0.75rem var(--page-pad)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            color: "rgb(255 255 255 / 0.35)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          All three system demos run in SIMULATED mode — not connected to client systems
        </p>
      </div>

      {/* ── TODAY VS VISION ─────────────────────────────── */}
      <section className="today-vision" aria-label="What DAXVORA does today and where it leads">
        <div className="today-vision__inner">
          <Reveal style={{ height: "100%" }}>
            <div className="tv-card tv-card--today" style={{ height: "100%" }}>
              <p className="tv-card__eyebrow">What DAXVORA does today</p>
              <p className="tv-card__title">Operational systems that work now</p>
              <ul className="tv-card__list" role="list">
                {TODAY_ITEMS.map((item) => (
                  <li key={item} className="tv-card__item">{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} style={{ height: "100%" }}>
            <div className="tv-card tv-card--vision" style={{ height: "100%" }}>
              <p className="tv-card__eyebrow">Where this leads</p>
              <p className="tv-card__title">The high-autonomy operating model</p>
              <ul className="tv-card__list" role="list">
                {VISION_ITEMS.map((item) => (
                  <li key={item} className="tv-card__item">{item}</li>
                ))}
              </ul>
              <p
                style={{
                  marginTop: "1.25rem",
                  fontSize: "0.8125rem",
                  color: "var(--dx-graphite)",
                  fontStyle: "italic",
                  lineHeight: 1.55,
                }}
              >
                Full-business auto mode is the direction of travel, not a universal
                current-state promise. Human authority, data quality, and operational
                risk determine where automation can safely act.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SCOPE TILES ─────────────────────────────────── */}
      <section className="scope-section" aria-label="Who DAXVORA is built for">
        <div className="scope-section__inner">
          <Reveal>
            <h2>Built for lean teams that have outgrown manual coordination</h2>
          </Reveal>
          <div className="scope-section__tiles">
            {SCOPE_TILES.map((tile, i) => (
              <Reveal key={tile.number} delay={i * 80}>
                <div className="scope-tile">
                  <p className="scope-tile__number">{tile.number}</p>
                  <p className="scope-tile__label">{tile.label}</p>
                  <p className="scope-tile__body">{tile.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE TO LOOK NEXT ───────────────────────────── */}
      <section className="nav-cards" aria-label="Where to go next">
        <div className="nav-cards__inner">
          <Reveal>
            <h2>Where to look next</h2>
          </Reveal>
          <div className="nav-cards__grid">
            {NAV_CARDS.map((card, i) => (
              <Reveal key={card.href} delay={i * 80} style={{ height: "100%" }}>
                <Link href={card.href} className="nav-card" style={{ height: "100%" }}>
                  <span className="nav-card__label">{card.tag}</span>
                  <p className="nav-card__title">{card.title}</p>
                  <p className="nav-card__desc">{card.desc}</p>
                  <span className="nav-card__arrow" aria-hidden="true">
                    Explore →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCOVERY CTA ───────────────────────────────── */}
      <DiscoveryCtaStrip />
    </>
  );
}
