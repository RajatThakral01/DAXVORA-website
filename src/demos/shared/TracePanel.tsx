import type { ObservabilityEvent } from "./observability";

export default function TracePanel({ events }: { events: ObservabilityEvent[] }) {
  const isActive = events.length > 0;
  return (
    <div className={`halo-trace-panel ${isActive ? "halo-trace-panel--active" : ""}`}>
      <h2>Run trace</h2>
      <div className="table-scroll" tabIndex={0} aria-label="Run trace, scrollable horizontally">
        <p className="table-hint">Scroll for more →</p>
        <table>
          <thead>
            <tr>
              <th>Run ID</th>
              <th>Action</th>
              <th>Decision</th>
              <th>Result</th>
              <th>Reason</th>
              <th>Error</th>
              <th>Timing (ms)</th>
              <th>Redaction note</th>
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
      </div>
    </div>
  );
}
