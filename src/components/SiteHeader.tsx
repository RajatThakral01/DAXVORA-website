"use client";

import { useState } from "react";
import type { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/method", label: "Method" },
  { href: "/services", label: "Services" },
  { href: "/halo-agent", label: "Halo Agent" },
  { href: "/operating-domains", label: "Operating-domain view" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="site-header__wordmark" aria-label="DAXVORA home">
        <img src="/brand/DAXVORA_Wordmark_Carbon.svg" alt="DAXVORA" />
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        Menu
      </button>

      <nav
        id="primary-nav"
        aria-label="Primary"
        className="primary-nav"
        data-open={menuOpen}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
