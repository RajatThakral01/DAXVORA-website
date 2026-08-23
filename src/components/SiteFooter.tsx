import type { JSX } from "react";
import Link from "next/link";

const FOOTER_LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/method", label: "Method" },
  { href: "/services", label: "Services" },
  { href: "/halo-agent", label: "Halo Agent" },
  { href: "/operating-domains", label: "Operating-domain view" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter(): JSX.Element {
  return (
    <footer className="site-footer">
      <p className="site-footer__wordmark">
        <img src="/brand/DAXVORA_Wordmark_Carbon.svg" alt="DAXVORA" />
      </p>
      <nav aria-label="Footer">
        <ul>
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>DAXVORA — the data and agentic operating layer for business.</p>
    </footer>
  );
}
