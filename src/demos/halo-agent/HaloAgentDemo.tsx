"use client";

import { useReducer } from "react";
import { personas, resolveExpectedRoute } from "./fixtures";
import { createInitialState, haloAgentReducer } from "./reducer";

export default function HaloAgentDemo() {
  const [state, dispatch] = useReducer(
    haloAgentReducer,
    undefined,
    createInitialState
  );

  const selectedPersona = state.personaId
    ? personas.find((persona) => persona.id === state.personaId)
    : undefined;

  const isRouting = state.status === "routing";

  return (
    <section aria-labelledby="halo-demo-status">
      <p id="halo-demo-status">
        <strong>SIMULATED</strong> — Not connected to client systems
      </p>

      <fieldset>
        <legend>Choose an inbound scenario</legend>
        {personas.map((persona) => (
          <button
            key={persona.id}
            type="button"
            aria-pressed={state.personaId === persona.id}
            onClick={() =>
              dispatch({ type: "SELECT_PERSONA", personaId: persona.id })
            }
          >
            {persona.label}
          </button>
        ))}
      </fieldset>

      <p>Status: {state.status}</p>

      <button
        type="button"
        disabled={!isRouting || !selectedPersona}
        onClick={() => {
          if (selectedPersona && isRouting) {
            dispatch({
              type: "ROUTE_DECISION",
              result: resolveExpectedRoute(selectedPersona),
            });
          }
        }}
      >
        Continue routing
      </button>

      <button
        type="button"
        disabled={!isRouting || !selectedPersona}
        onClick={() => {
          if (isRouting) {
            dispatch({ type: "SIMULATE_PROVIDER_FAILURE" });
          }
        }}
      >
        Simulate provider failure
      </button>

      {state.contextPanel && (
        <dl>
          <dt>Customer tag</dt>
          <dd>{state.contextPanel.customerTag}</dd>
          <dt>Profile field</dt>
          <dd>{state.contextPanel.profileField}</dd>
          <dt>History excerpt</dt>
          <dd>{state.contextPanel.historyExcerpt}</dd>
          <dt>Handoff reason</dt>
          <dd>{state.contextPanel.handoffReason}</dd>
        </dl>
      )}

      {state.error && <p role="alert">Error: {state.error}</p>}

      <p aria-live="polite">
        {state.status === "idle"
          ? "No scenario selected yet."
          : `Handoff reason: ${state.contextPanel?.handoffReason ?? ""}`}
      </p>

      <button type="button" onClick={() => dispatch({ type: "RESTART" })}>
        Restart
      </button>

      <h2>Run trace</h2>
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
          {[...state.events].reverse().map((event, index) => (
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
    </section>
  );
}
