import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteFooter from "../src/components/SiteFooter";
import SiteHeader from "../src/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "DAXVORA — Data First. Agents Next.",
    template: "%s — DAXVORA",
  },
  description:
    "DAXVORA designs data and agentic operating systems for founder-led businesses. Discovery, data foundations, Halo Agent, and business-process automation.",
  icons: {
    icon: [
      { url: "/icons/DAXVORA_Favicon.ico" },
      { url: "/icons/DAXVORA_Icon_16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/DAXVORA_Icon_32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/DAXVORA_Icon_48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/DAXVORA_Icon_180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-nav">Skip to main content</a>
        <noscript>
          <div style={{
            background: "var(--dx-mist)",
            borderBottom: "1px solid var(--dx-graphite)",
            padding: "0.75rem var(--page-pad)",
            textAlign: "center",
            fontSize: "0.875rem",
            color: "var(--dx-graphite)",
          }}>
            JavaScript is required for interactive demos. All content pages are fully readable without JavaScript.
          </div>
        </noscript>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
