"use client";

import { useState } from "react";
import type { ObservabilityEvent } from "./observability";

export default function TracePanel({ events }: { events: ObservabilityEvent[] }) {
  const [open, setOpen] = useState(false);
  const isActive = events.length > 0;

  return (
    <div
      className="trace-panel"
      data-open={open}
      aria-label="Audit log"
    >
      {/* Toggle button */}
      <button
        type="button"
        className="trace-panel__toggle"
        aria-expanded={open}
        aria-controls="trace-panel-body"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`trace-panel__toggle-dot${isActive ? " trace-panel__toggle-dot--active" : ""}`}
          aria-hidden="true"
        />
        <span>
          {isActive
            ? `Show trace — ${events.length} event${events.length !== 1 ? "s" : ""}`
            : "Show trace — no events yet"}
        </span>
        <svg
          className="trace-panel__toggle-chevron"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 5l4.5 4 4.5-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Collapsible body */}
      <div
        id="trace-panel-body"
        className="trace-panel__body"
        aria-hidden={!open}
        role="region"
        aria-label="Audit trace events"
      >
        {events.length === 0 ? (
          <p
            style={{
              padding: "1rem 0.75rem",
              fontSize: "0.75rem",
              color: "rgb(255 255 255 / 0.35)",
              fontFamily: "'Courier New', Courier, monospace",
            }}
          >
            No events recorded yet. Run the demo to populate the trace.
          </p>
        ) : (
          <table className="trace-table" aria-label="Trace events table">
            <thead>
              <tr>
                <th scope="col">Run ID</th>
                <th scope="col">Action</th>
                <th scope="col">Decision</th>
                <th scope="col">Result</th>
                <th scope="col">Reason</th>
                <th scope="col">Error</th>
                <th scope="col">ms</th>
                <th scope="col">Redaction</th>
              </tr>
            </thead>
            <tbody>
              {[...events].reverse().map((event, index) => (
                <tr key={index}>
                  <td>{event.runId || "—"}</td>
                  <td>{event.action}</td>
                  <td>{event.decision}</td>
                  <td>{event.result}</td>
                  <td>{event.reason}</td>
                  <td>{event.error ?? "none"}</td>
                  <td>{event.timingMs}</td>
                  <td>{event.redactionNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
