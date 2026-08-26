import type { JSX } from "react";

interface DomainTileProps {
  index: number;
  name: string;
  opportunities: string;
  /** Marks this tile with Carbon background as the entry-point domain */
  isStart?: boolean;
}

/**
 * Reusable domain tile for the Operating Domains 4×3 grid.
 * Signal Lime number, bold name, one-line opportunity description.
 * isStart variant uses Carbon background to flag the typical starting domain.
 */
export default function DomainTile({
  index,
  name,
  opportunities,
  isStart = false,
}: DomainTileProps): JSX.Element {
  return (
    <article
      className={`domain-tile${isStart ? " domain-tile--start" : ""}`}
      aria-label={name}
      style={{ height: "100%" }}
    >
      <p className="domain-tile__number">
        {String(index).padStart(2, "0")}
      </p>
      <h3 className="domain-tile__name">{name}</h3>
      <p className="domain-tile__desc">{opportunities}</p>
      {isStart && (
        <span
          aria-label="Common starting point"
          style={{
            display: "inline-block",
            marginTop: "auto",
            fontWeight: 700,
            fontSize: "0.625rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--dx-signal)",
            paddingTop: "0.75rem",
          }}
        >
          ↑ Common starting point
        </span>
      )}
    </article>
  );
}
