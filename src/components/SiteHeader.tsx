"use client";

import { useState } from "react";
import type { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: "/method", label: "Method" },
  { href: "/services", label: "Services" },
  { href: "/halo-agent", label: "Halo Agent" },
  { href: "/operating-domains", label: "Domains" },
  { href: "/about", label: "About" },
];

export default function SiteHeader(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="primary-nav" data-open={menuOpen}>
      <div className="primary-nav__inner">
        {/* Wordmark */}
        <Link href="/" className="primary-nav__wordmark" aria-label="DAXVORA home">
          DAXVORA
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation">
          <ul className="primary-nav__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="primary-nav__link"
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <Link href="/contact" className="primary-nav__cta" aria-label="Book a discovery call">
          Talk to us
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="primary-nav__hamburger"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        className="primary-nav__mobile"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="primary-nav__mobile-link"
            aria-current={pathname === link.href ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="primary-nav__mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Talk to us
        </Link>
      </nav>
    </header>
  );
}
