import type { JSX } from "react";

interface ServiceCardProps {
  num: string;
  name: string;
  bestFor: string;
  deliverable: string;
}

/**
 * Reusable service card used on the Services page 2-column grid.
 * Carbon number badge, bold name, Best For + Deliverable rows.
 */
export default function ServiceCard({
  num,
  name,
  bestFor,
  deliverable,
}: ServiceCardProps): JSX.Element {
  return (
    <article className="service-card">
      <span className="service-card__number">{num}</span>
      <h3 className="service-card__name">{name}</h3>
      <div className="service-card__row">
        <p className="service-card__row-label">Best for</p>
        <p className="service-card__row-value">{bestFor}</p>
      </div>
      <div className="service-card__row">
        <p className="service-card__row-label">Typical deliverable</p>
        <p className="service-card__row-value">{deliverable}</p>
      </div>
    </article>
  );
}
