import type { JSX } from "react";
import Link from "next/link";

export default function DiscoveryCtaStrip(): JSX.Element {
  return (
    <section className="discovery-cta-strip" aria-label="Discovery conversation">
      <p>See what this looks like for your business.</p>
      <Link href="/contact" className="btn-secondary">
        Start a discovery conversation
      </Link>
    </section>
  );
}
