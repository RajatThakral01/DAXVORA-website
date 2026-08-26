import type { ReactNode, JSX, CSSProperties } from "react";

interface SectionBandProps {
  children: ReactNode;
  background?: "bone" | "mist" | "white" | "carbon";
  /** Adds a top rule line */
  topRule?: "signal" | "mist" | "none";
  /** Use --section-gap padding or custom value */
  padding?: "section" | "compact" | "none";
  ariaLabel?: string;
  className?: string;
}

const BG_MAP: Record<string, string> = {
  bone: "var(--dx-bone)",
  mist: "var(--dx-mist)",
  white: "var(--dx-white)",
  carbon: "var(--dx-carbon)",
};

const RULE_MAP: Record<string, string> = {
  signal: "2px solid var(--dx-signal)",
  mist: "1px solid rgb(52 57 65 / 0.1)",
  none: "none",
};

const PAD_MAP: Record<string, string> = {
  section: "var(--section-gap) 0",
  compact: "clamp(2rem, 4vw, 3rem) 0",
  none: "0",
};

/**
 * Reusable section band — replaces full-bleed-mist / section-band ad-hoc divs.
 * Keeps background, top-rule, and padding consistent site-wide.
 */
export default function SectionBand({
  children,
  background = "bone",
  topRule = "none",
  padding = "section",
  ariaLabel,
  className,
}: SectionBandProps): JSX.Element {
  const style: CSSProperties = {
    background: BG_MAP[background],
    borderTop: RULE_MAP[topRule],
    padding: PAD_MAP[padding],
  };

  return (
    <section style={style} aria-label={ariaLabel} className={className}>
      <div className="page-wrap">{children}</div>
    </section>
  );
}
