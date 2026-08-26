import type { ReactNode, JSX } from "react";

interface HeroSectionProps {
  eyebrow?: string;
  h1: ReactNode;
  subtext?: string;
  ctas?: ReactNode;
  rightSlot?: ReactNode;
  /** "split" adds a two-column layout with rightSlot in the second column */
  variant?: "default" | "split";
  ariaLabel?: string;
}

/**
 * Reusable Carbon-background hero section.
 * Dark hero / Signal accent bar / dot-grid texture.
 */
export default function HeroSection({
  eyebrow,
  h1,
  subtext,
  ctas,
  rightSlot,
  variant = "default",
  ariaLabel,
}: HeroSectionProps): JSX.Element {
  return (
    <section
      className={`hero${variant === "split" ? " hero--split" : ""}`}
      aria-label={ariaLabel}
    >
      {/* Texture */}
      <div className="dot-grid hero__dot-grid" aria-hidden="true" />
      {/* Signal gradient rule at bottom */}
      <div className="hero__bottom-rule" aria-hidden="true" />

      <div className="hero__inner">
        {/* Left / main content */}
        <div>
          {eyebrow && (
            <span className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              {eyebrow}
            </span>
          )}

          <h1 className="hero__h1">{h1}</h1>

          {subtext && <p className="hero__subtext">{subtext}</p>}

          {ctas && <div className="hero__ctas">{ctas}</div>}
        </div>

        {/* Right column (split variant only) */}
        {variant === "split" && rightSlot && (
          <div className="hero__visual" aria-hidden="true">
            {rightSlot}
          </div>
        )}
      </div>
    </section>
  );
}
