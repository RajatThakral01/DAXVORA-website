import DemandSignalDemo from "../../src/demos/demand-signal/DemandSignalDemo";

export const metadata = {
  title: "Demand-to-Revenue Demo — DAXVORA",
  description:
    "Interactive Demand-to-Revenue pipeline demo — see validation, classification, scoring, attribution, and routing in simulated mode.",
};

export default function DemandSignalDemoPage() {
  return (
    <>
      <section className="hero" aria-label="Demand-to-Revenue interactive demo">
        <div className="dot-grid hero__dot-grid" aria-hidden="true" />
        <div className="hero__bottom-rule" aria-hidden="true" />
        <div className="hero__inner">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Interactive demo — Service 04
          </span>
          <h1 className="hero__h1">Demand-to-Revenue Pipeline</h1>
          <p className="hero__subtext">
            Select a demand signal to see validation, classification, scoring,
            attribution, and routing to a receipt. All data is SIMULATED —
            seeded fixtures, not connected to client systems.
          </p>
        </div>
      </section>

      <section
        style={{ background: "var(--dx-bone)", padding: "var(--section-gap) 0" }}
        aria-label="Demand-to-Revenue demo"
      >
        <div className="page-wrap">
          <div
            className="signal-badge"
            style={{ marginBottom: "1.5rem" }}
          >
            <span className="signal-badge__dot" aria-hidden="true" />
            SIMULATED — not connected to client systems
          </div>
          <DemandSignalDemo />
        </div>
      </section>
    </>
  );
}
