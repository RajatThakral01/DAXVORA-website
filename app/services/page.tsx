import type { JSX } from "react";
import DemandPipelineDiagram from "../../src/components/DemandPipelineDiagram";
import Reveal from "../../src/components/Reveal";
import DemandSignalDemo from "../../src/demos/demand-signal/DemandSignalDemo";

interface ServiceRow {
  name: string;
  bestFor: string;
  deliverable: string;
}

const SERVICES: ServiceRow[] = [
  {
    name: "Operating-system discovery",
    bestFor:
      "Founders who need a clear view of bottlenecks and automation opportunities before choosing a build.",
    deliverable:
      "Atomic workflow map, data/context map, opportunity priorities, architecture, risks, and phased roadmap.",
  },
  {
    name: "Data & context foundations",
    bestFor:
      "Teams whose customer history, notes, conversations, and decisions live scattered across inboxes, spreadsheets, CRM, chat, and people.",
    deliverable:
      "Required systems connected, important data normalized, identity, permissions, retention, and shared context defined into a governed context layer.",
  },
  {
    name: "Halo Agent",
    bestFor:
      "A business that needs consistent, context-aware sales and service across several channels.",
    deliverable:
      "Channel integrations, retained customer context, specialist agents with controlled handoffs, an action layer, controls, and quality measurement.",
  },
  {
    name: "Demand generation & revenue operations",
    bestFor:
      "Businesses that need market signals turned into qualified, attributable pipeline instead of untracked activity.",
    deliverable:
      "Audience building, lead capture, enrichment, scoring, routing, attribution, and campaign feedback wired into revenue workflows.",
  },
  {
    name: "Business-process automation",
    bestFor:
      "Teams copying data, sending routine follow-ups, preparing reports, qualifying requests, or rebuilding the same answer.",
    deliverable:
      "Stable repeatable steps automated with intake, routing, task execution, quality checks, exception handling, and evidence of every action retained.",
  },
  {
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
      <h1>
        A complete operating-system build, or one focused vertical first.
      </h1>
      <p>
        Every engagement is phased around evidence and deployment readiness.
        Compare what each service is best for and what a client actually
        receives.
      </p>

      <div
        className="table-scroll"
        tabIndex={0}
        aria-label="Services comparison table, scrollable horizontally"
      >
        <p className="table-hint">Scroll for more →</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col">Best for</th>
              <th scope="col">Typical deliverable</th>
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((service, i) => (
              <Reveal key={service.name} as="tr" delay={Math.min(i * 60, 300)}>
                <th scope="row">{service.name}</th>
                <td>{service.bestFor}</td>
                <td>{service.deliverable}</td>
              </Reveal>
            ))}
          </tbody>
        </table>
      </div>

      <section aria-label="Demand-to-Revenue pipeline">
        <h2>From signal to routed outcome</h2>
        <p>
          Validate → classify → score → attribute → route — the same five
          steps the interactive demo below walks through with governed data.
        </p>
        <DemandPipelineDiagram />
        <p className="diagram-caption">
          Five pipeline stages joined by Carbon connector lines; the demo
          below follows the same sequence and shows the receipt.
        </p>
      </section>

      <section aria-label="Interactive Demand-to-Revenue demo">
        <h2>Try the pipeline</h2>
        <p>
          Select a signal to see validation, classification, scoring,
          attribution, and routing to a receipt. The demo is SIMULATED —
          seeded fixtures are shown as text, and every run is logged in the
          trace panel for audit.
        </p>
        <DemandSignalDemo />
      </section>
    </>
  );
}
