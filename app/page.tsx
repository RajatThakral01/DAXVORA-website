import type { JSX } from "react";
import Link from "next/link";
import VisionMarker from "../src/components/VisionMarker";

const NEXT_STEPS: Array<{ href: string; label: string; description: string }> =
  [
    {
      href: "/method",
      label: "Method",
      description:
        "Seven stages from founder discovery to operate-and-improve, each producing a defined output.",
    },
    {
      href: "/services",
      label: "Services",
      description:
        "Operating-system discovery, single-vertical systems, multi-domain layers, and Halo Agent.",
    },
    {
      href: "/halo-agent",
      label: "Halo Agent",
      description:
        "Shared customer context carried across every channel and specialist handoff.",
    },
  ];

export default function Home(): JSX.Element {
  return (
    <>
      <section className="home-hero">
        <h1>
          DAXVORA designs data and agentic operating systems for lean,
          growing businesses.
        </h1>
        <p>
          Founder-led teams of roughly 2–20 people and six-to-seven-figure
          revenue: demand is proven, but data, decisions, customer
          conversations, and repetitive processes are fragmented across
          people and tools.
        </p>
        <p className="hero-status">
          <span className="status-dot" aria-hidden="true" />
          All three system demos on this site run in SIMULATED mode against
          seeded fixtures — not connected to client systems.
        </p>
      </section>

      <VisionMarker>
        <p>
          North star: move toward a high-autonomy operating model where AI
          prepares, coordinates, and executes appropriate work while the
          decision-maker reviews the actions, exceptions, and insights that
          matter. Full-business auto mode is the direction of travel, not a
          current-state promise.
        </p>
      </VisionMarker>

      <section className="home-scope" aria-label="Current engagements">
        <h2>Engagements start where the pain actually is.</h2>
        <p>
          Improve one vertical — marketing, demand generation, sales,
          customer experience, or operations — or architect a coordinated
          system across the business. Scope follows your actual pain,
          readiness, data, risk, and direction.
        </p>
      </section>

      <section className="home-next-steps" aria-label="Where to go next">
        <h2>Where to look next</h2>
        <ul>
          {NEXT_STEPS.map((step) => (
            <li key={step.href}>
              <Link href={step.href}>{step.label}</Link>
              {" — "}
              {step.description}
            </li>
          ))}
        </ul>
        <p>
          Explain how your operations work, and let us show you how they
          would look with DAXVORA.
        </p>
      </section>
    </>
  );
}
