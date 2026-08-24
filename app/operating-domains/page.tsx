import type { JSX } from "react";
import Reveal from "../../src/components/Reveal";

const DOMAINS: Array<{ name: string; opportunities: string }> = [
  {
    name: "Foundation, governance & control",
    opportunities:
      "Identity, data quality, permissions, event history, audit trails, exception queues, approvals, orchestration, and founder control views.",
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
      <h1>The operating lens is whole-business, even when the build starts with one vertical.</h1>
      <p>
        Twelve domains assessed as a single reference. A client may begin with
        one domain rather than needing the whole system — scope follows actual
        pain, readiness, data, risk, and direction, not a package.
      </p>

      <div className="table-scroll" tabIndex={0} aria-label="Twelve operating domains, scrollable horizontally">
        <p className="table-hint">Scroll for more →</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Domain</th>
              <th scope="col">Representative system opportunities</th>
            </tr>
          </thead>
          <tbody>
            {DOMAINS.map((domain, i) => (
              <Reveal key={domain.name} as="tr" delay={Math.min(i * 60, 540)}>
                <th scope="row">{domain.name}</th>
                <td>{domain.opportunities}</td>
              </Reveal>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Coverage is generalized from an internal client architecture reference.
        It is not a claim that every domain is already deployed for every
        client. Starting with one vertical is a first-class option.
      </p>
    </>
  );
}
