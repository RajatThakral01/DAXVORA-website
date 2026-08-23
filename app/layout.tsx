import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import DiscoveryCtaStrip from "../src/components/DiscoveryCtaStrip";
import SiteFooter from "../src/components/SiteFooter";
import SiteHeader from "../src/components/SiteHeader";

export const metadata: Metadata = {
  title: "DAXVORA",
  description: "The data and agentic operating layer for business.",
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
        <SiteHeader />
        <main>{children}</main>
        <DiscoveryCtaStrip />
        <SiteFooter />
      </body>
    </html>
  );
}
