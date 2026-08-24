import type { JSX } from "react";

export default function AboutPage(): JSX.Element {
  return (
    <>
      <h1>DAXVORA began where scattered data meets real operating pain.</h1>

      <p>
        After more than a year of building AI workflows, the same opportunity
        kept appearing: businesses already hold a large amount of customer and
        operating data, but it is scattered and often goes unnoticed. DAXVORA
        exists to make that information usable, help founders make
        better-informed decisions, and automate the repeatable flows that
        prevent teams from focusing on higher-value work.
      </p>

      <section aria-label="Operating principles">
        <h2>Operating principles</h2>
        <dl>
          <div>
            <dt>Legal and ethical work only</dt>
            <dd>
              DAXVORA will not build systems whose purpose or operation breaks
              applicable law.
            </dd>
          </div>
          <div>
            <dt>Truth before theater</dt>
            <dd>
              Simulations, intended integrations, and live capability are
              labeled accurately — LIVE, TEST, MOCKED, or SIMULATED. Simulated
              demos state that they are not connected to client systems.
            </dd>
          </div>
          <div>
            <dt>The goal determines the system</dt>
            <dd>
              If a client wants one outcome, DAXVORA builds the sequence of
              goals and capabilities that lead to it — not a pre-selected tool
              or agent.
            </dd>
          </div>
          <div>
            <dt>Automation remains observable</dt>
            <dd>
              Important actions, failures, costs, and exceptions must be
              reviewable by the decision-maker.
            </dd>
          </div>
        </dl>
      </section>

      <section aria-label="What success should feel like">
        <h2>What success should feel like</h2>
        <ul>
          <li>Better customer treatment — relevant, consistent help informed by history and current need.</li>
          <li>Greater availability — stable workflows beyond individual schedules.</li>
          <li>Lower operating cost — repeatable work uses less manual effort while quality stays visible.</li>
          <li>Improved quality — rules, context, evidence, and measurement reduce preventable inconsistency.</li>
          <li>Processed information — decisions, exceptions, risks, and opportunities, not raw data.</li>
          <li>More human focus — judgment, relationships, creativity, and the work that matters.</li>
        </ul>
      </section>
    </>
  );
}
