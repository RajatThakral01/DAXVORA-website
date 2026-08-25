import type { JSX } from "react";
import DataContextDiagram from "../../src/components/DataContextDiagram";
import MethodDiagram from "../../src/components/MethodDiagram";
import Reveal from "../../src/components/Reveal";
import DataContextDemo from "../../src/demos/data-context/DataContextDemo";

interface MethodStage {
  number: string;
  name: string;
  work: string;
  output: string;
}

const STAGES: MethodStage[] = [
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
      <h1>Discovery creates the operating model; technology follows it.</h1>

      <MethodDiagram />

      <div className="full-bleed-mist section-band">
        <ol className="method-stages">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.number} as="li" delay={Math.min(i * 60, 480)}>
              <p className="stage-number">{stage.number}</p>
              <h2>{stage.name}</h2>
              <p className="stage-work">
                <span className="meta-label">What DAXVORA does</span>
                {stage.work}
              </p>
              <p className="stage-output">
                <span className="meta-label">Output</span>
                {stage.output}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>

      <section aria-label="Data & Context Foundation demo">
        <h2>Stage 04 in action — see the governed context being built</h2>
        <p>
          Stage 04 connects required systems, normalizes important data, and
          defines identity, permissions, retention, and shared context —
          producing the governed context layer. The demo below walks through
          the same pipeline with seeded sources.
        </p>
        <DataContextDiagram />
        <p className="diagram-caption">
          Sources → normalize → governed context → decision/action → audit — the
          same five steps the demo follows; the seven-stage list above remains
          the accessible text for the Method diagram.
        </p>
        <DataContextDemo />
      </section>
    </>
  );
}
