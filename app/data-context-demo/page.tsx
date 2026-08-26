import DataContextDemo from "../../src/demos/data-context/DataContextDemo";

export const metadata = {
  title: "Data & Context Foundation Demo — DAXVORA",
  description:
    "Interactive Data & Context Foundation demo — see how sources are normalized into a governed context layer in simulated mode.",
};

export default function DataContextDemoPage() {
  return (
    <>
      <section className="hero" aria-label="Data and Context Foundation interactive demo">
        <div className="dot-grid hero__dot-grid" aria-hidden="true" />
        <div className="hero__bottom-rule" aria-hidden="true" />
        <div className="hero__inner">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Interactive demo — Stage 04
          </span>
          <h1 className="hero__h1">Data & Context Foundation</h1>
          <p className="hero__subtext">
            Select a scenario to see how sources are normalized, a governed context
            layer built, and a decision/action produced. All data is SIMULATED —
            seeded fixtures, not connected to client systems.
          </p>
        </div>
      </section>

      <section
        style={{ background: "var(--dx-bone)", padding: "var(--section-gap) 0" }}
        aria-label="Data and Context Foundation demo"
      >
        <div className="page-wrap">
          <div
            className="signal-badge"
            style={{ marginBottom: "1.5rem" }}
          >
            <span className="signal-badge__dot" aria-hidden="true" />
            SIMULATED — not connected to client systems
          </div>
          <DataContextDemo />
        </div>
      </section>
    </>
  );
}
