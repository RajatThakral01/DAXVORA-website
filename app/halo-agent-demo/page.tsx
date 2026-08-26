import HaloAgentDemo from "../../src/demos/halo-agent/HaloAgentDemo";

export const metadata = {
  title: "Halo Agent Demo — DAXVORA",
  description:
    "Interactive Halo Agent demo — see routing, specialist transfer, and retained context in simulated mode.",
};

export default function HaloAgentDemoPage() {
  return (
    <>
      <section className="hero" aria-label="Halo Agent interactive demo">
        <div className="dot-grid hero__dot-grid" aria-hidden="true" />
        <div className="hero__bottom-rule" aria-hidden="true" />
        <div className="hero__inner">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Interactive demo
          </span>
          <h1 className="hero__h1">Halo Agent — Try the routing</h1>
          <p className="hero__subtext">
            Select a customer persona to see the router, specialist transfer, and
            retained context in action. All data is SIMULATED — seeded fixtures,
            not connected to client systems.
          </p>
        </div>
      </section>

      <section
        style={{ background: "var(--dx-bone)", padding: "var(--section-gap) 0" }}
        aria-label="Halo Agent demo"
      >
        <div className="page-wrap">
          <div
            className="signal-badge"
            style={{ marginBottom: "1.5rem" }}
          >
            <span className="signal-badge__dot" aria-hidden="true" />
            SIMULATED — not connected to client systems
          </div>
          <HaloAgentDemo />
        </div>
      </section>
    </>
  );
}
