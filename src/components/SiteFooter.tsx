import type { JSX } from "react";
import Link from "next/link";

const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/method", label: "Method" },
  { href: "/services", label: "Services" },
  { href: "/halo-agent", label: "Halo Agent" },
  { href: "/operating-domains", label: "Domains" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter(): JSX.Element {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          {/* Col 1 — Brand */}
          <div>
            <span className="site-footer__wordmark">DAXVORA</span>
            <p className="site-footer__descriptor">
              The data and agentic operating layer for founder-led businesses.
              Data first. Agents next.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="site-footer__col-title">Navigation</p>
            <nav aria-label="Footer navigation">
              <ul className="site-footer__links" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Manifesto */}
          <div>
            <p className="site-footer__col-title">Position</p>
            <p className="site-footer__tagline">
              DATA FIRST.<br />AGENTS NEXT.
            </p>
            <p className="site-footer__descriptor" style={{ marginTop: "1rem" }}>
              Systems built around the client&apos;s desired business result,
              not around a fashionable tool.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            &copy; {new Date().getFullYear()} DAXVORA. All rights reserved.
          </p>
          <p className="site-footer__copy">
            Truth before theater. Automation remains observable.
          </p>
        </div>
      </div>
    </footer>
  );
}
