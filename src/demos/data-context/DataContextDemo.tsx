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

  return (
    <section aria-labelledby="data-context-demo-status">
      <p id="data-context-demo-status">
        <strong>SIMULATED</strong> — Not connected to client systems
      </p>

      <fieldset>
        <legend>Choose a scenario</legend>
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            aria-pressed={state.scenarioId === scenario.id}
            onClick={() =>
              dispatch({ type: "SELECT_SCENARIO", scenarioId: scenario.id })
            }
          >
            {scenario.label}
          </button>
        ))}
      </fieldset>

      <p>Status: {state.status}</p>

      <button
        type="button"
        disabled={!isNormalizing}
        onClick={() => dispatch({ type: "CONFIRM_GOVERNANCE" })}
      >
        Confirm governance
      </button>

      <button
        type="button"
        disabled={!isGoverned}
        onClick={() => dispatch({ type: "DECIDE_ACTION" })}
      >
        Decide action
      </button>

      <button
        type="button"
        disabled={!isNormalizing}
        onClick={() => dispatch({ type: "SIMULATE_SOURCE_FAILURE" })}
      >
        Simulate source failure
      </button>

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
          <dl>
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
          <dl>
            <dt>Action</dt>
            <dd>{state.decision.action}</dd>
            <dt>Reason</dt>
            <dd>{state.decision.reason}</dd>
          </dl>
        </>
      )}

      {state.error && <p role="alert">Error: {state.error}</p>}

      <p aria-live="polite">
        {state.status === "idle"
          ? "No scenario selected yet."
          : state.decision
            ? `Decision recorded: ${state.decision.action} — ${state.decision.reason}`
            : state.status === "source_failed"
              ? `Run failed: ${state.error ?? "simulated source failure"}`
              : `Current status: ${state.status}`}
      </p>

      <button type="button" onClick={() => dispatch({ type: "RESTART" })}>
        Restart
      </button>

      <TracePanel events={state.events} />
    </section>
  );
}
