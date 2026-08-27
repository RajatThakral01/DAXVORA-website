"use client";

import { useState, useRef, useCallback } from "react";
import type { JSX } from "react";

interface Stage {
  number: string;
  name: string;
  work: string;
  output: string;
  key?: boolean;
}

interface MethodStagesProps {
  stages: Stage[];
}

/** Desktop: horizontal scroll-snap card row */
function ScrollSnapStages({ stages }: MethodStagesProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, setThumbX] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    // thumb travels (100 - 100/7)% of the track
    setThumbX(pct * (100 - 100 / 7));
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="method-stages-scroll"
        onScroll={handleScroll}
        role="list"
        aria-label="Seven method stages"
        tabIndex={0}
      >
        {stages.map((stage) => (
          <article
            key={stage.number}
            className={`method-stage-card${stage.key ? " method-stage-card--key" : ""}`}
            role="listitem"
          >
            <div
              className="method-stage-card__number"
              aria-label={`Stage ${stage.number}`}
            >
              {stage.number}
            </div>
            <h3 className="method-stage-card__name">{stage.name}</h3>
            <div className="method-stage-card__divider" aria-hidden="true" />
            <div>
              <p className="method-stage-card__label">What DAXVORA does</p>
              <p className="method-stage-card__text">{stage.work}</p>
            </div>
            <div>
              <p className="method-stage-card__label">Output</p>
              <p className="method-stage-card__text">{stage.output}</p>
            </div>
          </article>
        ))}
      </div>

    </>
  );
}

/** Mobile: vertical accordion */
function AccordionStages({ stages }: MethodStagesProps): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="method-accordion" role="list">
      {stages.map((stage, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={stage.number}
            className="method-accordion-item"
            data-open={isOpen}
            role="listitem"
          >
            <button
              type="button"
              className="method-accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={`accordion-body-${stage.number}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span className="method-accordion-trigger__num">
                {stage.number}
              </span>
              <span className="method-accordion-trigger__name">
                {stage.name}
              </span>
              <svg
                className="method-accordion-trigger__chevron"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 6l4.5 4 4.5-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              id={`accordion-body-${stage.number}`}
              className="method-accordion-body"
              aria-hidden={!isOpen}
              role="region"
              aria-label={stage.name}
            >
              <div className="method-accordion-body__section">
                <p className="method-accordion-body__label">
                  What DAXVORA does
                </p>
                <p className="method-accordion-body__text">{stage.work}</p>
              </div>
              <div className="method-accordion-body__section">
                <p className="method-accordion-body__label">Output</p>
                <p className="method-accordion-body__text">{stage.output}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MethodStages({ stages }: MethodStagesProps): JSX.Element {
  return (
    <>
      <ScrollSnapStages stages={stages} />
      <AccordionStages stages={stages} />
    </>
  );
}
