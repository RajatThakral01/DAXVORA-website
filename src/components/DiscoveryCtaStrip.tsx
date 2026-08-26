import type { JSX } from "react";
import Link from "next/link";

export default function DiscoveryCtaStrip(): JSX.Element {
  return (
    <section className="cta-strip" aria-label="Discovery conversation">
      {/* Dot grid texture */}
      <div className="dot-grid cta-strip__dot-grid" aria-hidden="true" />

      <div className="cta-strip__inner">
        <div className="cta-strip__text">
          <p className="cta-strip__headline">
            One conversation. One clear picture of where automation actually fits.
          </p>
          <p className="cta-strip__subtext">
            Discovery is scoped to your data, your team, and your actual risk — not a generic playbook.
          </p>
        </div>

        <div className="cta-strip__actions">
          <Link href="/contact" className="btn btn--primary">
            Book a discovery call
          </Link>
          <Link href="/method" className="btn btn--outline-white">
            See the method
          </Link>
        </div>
      </div>
    </section>
  );
}
