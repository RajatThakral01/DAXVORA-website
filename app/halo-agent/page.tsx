import type { JSX } from "react";
import HaloSchematic from "../../src/components/HaloSchematic";
import HaloAgentDemo from "../../src/demos/halo-agent/HaloAgentDemo";

const ELEMENTS: Array<{ term: string; statement: string }> = [
  {
    term: "Shared context",
    statement:
      "A permission-aware view of profile fields, tags, preferences, orders, issues, and consent — created from customer data the business already holds and the context uncovered during discovery.",
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
      <h1>Halo Agent keeps context across every handoff.</h1>
      <p>
        A coordinated customer-facing system that carries useful context across
        every supported channel and specialist handoff, so consistent treatment
        does not depend on who answers or which channel the customer used.
      </p>

      <HaloSchematic />
      <p className="diagram-caption">
        Shared context at the center, channels on the left, specialists and
        human escalation on the right — joined by Carbon connector lines. The
        same structure is listed below as text.
      </p>

      <dl className="halo-elements">
        {ELEMENTS.map((el) => (
          <div key={el.term}>
            <dt>{el.term}</dt>
            <dd>{el.statement}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Interactive Halo Agent demo">
        <h2>Try the routing</h2>
        <p>
          Select a persona below to see the router, specialist transfer, and
          retained history in action. The demo is SIMULATED — seeded fixtures
          are shown as text, and every run is logged in the trace panel for
          audit.
        </p>
        <HaloAgentDemo />
      </section>
    </>
  );
}
