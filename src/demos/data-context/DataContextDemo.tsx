"use client";

import { useReducer } from "react";
import { scenarios } from "./fixtures";
import { createInitialState, dataContextReducer } from "./reducer";
import TracePanel from "../shared/TracePanel";

export default function DataContextDemo() {
  const [state, dispatch] = useReducer(
    dataContextReducer,
    undefined,
    createInitialState
  );

  const isNormalizing = state.status === "normalizing";
  const isGoverned = state.status === "governed";
  const hasActiveRun = state.status !== "idle";
  const isFailed = state.status === "source_failed";

  return (
    <section
      aria-labelledby="data-context-demo-status"
      className={`data-context-demo ${isFailed ? "data-context-demo--failed" : ""}`}
      data-status={state.status}
    >
      <p id="data-context-demo-status" className="data-context-demo__sim-label">
        <strong>SIMULATED</strong> — Not connected to client systems
      </p>

      <fieldset className="data-context-fieldset">
        <legend>Choose a scenario</legend>
        <div className="data-context-scenario-list">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              className="data-context-scenario-button"
              aria-pressed={state.scenarioId === scenario.id}
              onClick={() =>
                dispatch({ type: "SELECT_SCENARIO", scenarioId: scenario.id })
              }
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="data-context-status">Status: {state.status}</p>

      <div className="data-context-actions">
        <button
          type="button"
          className="btn-secondary"
          disabled={!isNormalizing}
          onClick={() => dispatch({ type: "CONFIRM_GOVERNANCE" })}
        >
          Confirm governance
        </button>

        <button
          type="button"
          className="btn-secondary"
          disabled={!isGoverned}
          onClick={() => dispatch({ type: "DECIDE_ACTION" })}
        >
          Decide action
        </button>

        <button
          type="button"
          className="btn-secondary"
          disabled={!isNormalizing}
          onClick={() => dispatch({ type: "SIMULATE_SOURCE_FAILURE" })}
        >
          Simulate source failure
        </button>
      </div>

      {state.sources.length > 0 && (
        <>
          <h2>Sources</h2>
          <ul>
            {state.sources.map((source) => (
              <li key={source.name}>
                <strong>{source.name}</strong>: {source.raw}
                {" — "}
                {!source.normalized && source.includedInContext === false && source.exclusionReason === null ? (
                  <span>Awaiting normalization</span>
                ) : source.includedInContext ? (
                  <span>Included</span>
                ) : (
                  <span>Excluded: {source.exclusionReason}</span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {state.contextLayer && (
        <>
          <h2>Governed context</h2>
          <p>Completeness: {state.contextLayer.completeness === "complete" ? "Complete" : "Partial"}</p>
          <dl
            className={`data-context-panel ${hasActiveRun ? "data-context-panel--active" : ""} ${isFailed ? "data-context-panel--failed" : ""}`}
          >
            {Object.entries(state.contextLayer.fields).map(([field, value]) => (
              <div key={field}>
                <dt>{field}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}

      {state.decision && (
        <>
          <h2>Decision</h2>
          <dl
            className={`data-context-panel ${hasActiveRun ? "data-context-panel--active" : ""}`}
          >
            <dt>Action</dt>
            <dd>{state.decision.action}</dd>
            <dt>Reason</dt>
            <dd>{state.decision.reason}</dd>
          </dl>
        </>
      )}

      {state.error && (
        <p role="alert" className="data-context-error">
          Error: {state.error}
        </p>
      )}

      <p aria-live="polite" className="data-context-live-region">
        {state.status === "idle"
          ? "No scenario selected yet."
          : state.decision
            ? `Decision recorded: ${state.decision.action} — ${state.decision.reason}`
            : state.status === "source_failed"
              ? `Run failed: ${state.error ?? "simulated source failure"}`
              : `Current status: ${state.status}`}
      </p>

      <button type="button" className="btn-secondary" onClick={() => dispatch({ type: "RESTART" })}>
        Restart
      </button>

      <TracePanel events={state.events} />
    </section>
  );
}
