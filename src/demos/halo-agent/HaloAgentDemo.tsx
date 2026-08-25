"use client";

import { useReducer } from "react";
import { personas, resolveExpectedRoute } from "./fixtures";
import { createInitialState, haloAgentReducer } from "./reducer";
import TracePanel from "../shared/TracePanel";

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
  const hasActiveRun = state.status !== "idle";
  const isFailed = state.status === "route_failed";

  return (
    <section
      aria-labelledby="halo-demo-status"
      className={`halo-demo ${isFailed ? "halo-demo--failed" : ""}`}
      data-status={state.status}
    >
      <p id="halo-demo-status" className="halo-demo__sim-label">
        <strong>SIMULATED</strong> — Not connected to client systems
      </p>

      <fieldset className="halo-persona-fieldset">
        <legend>Choose an inbound scenario</legend>
        <div className="halo-persona-list">
          {personas.map((persona) => (
            <button
              key={persona.id}
              type="button"
              className="halo-persona-button"
              aria-pressed={state.personaId === persona.id}
              onClick={() =>
                dispatch({ type: "SELECT_PERSONA", personaId: persona.id })
              }
            >
              {persona.label}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="halo-status">Status: {state.status}</p>

      <div className="halo-actions">
        <button
          type="button"
          className="btn-secondary"
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
          className="btn-secondary"
          disabled={!isRouting || !selectedPersona}
          onClick={() => {
            if (isRouting) {
              dispatch({ type: "SIMULATE_PROVIDER_FAILURE" });
            }
          }}
        >
          Simulate provider failure
        </button>
      </div>

      {state.contextPanel && (
        <dl
          className={`halo-context-panel ${hasActiveRun ? "halo-context-panel--active" : ""} ${isFailed ? "halo-context-panel--failed" : ""}`}
        >
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

      {state.error && (
        <p role="alert" className="halo-error">
          Error: {state.error}
        </p>
      )}

      <p aria-live="polite" className="halo-live-region">
        {state.status === "idle"
          ? "No scenario selected yet."
          : `Handoff reason: ${state.contextPanel?.handoffReason ?? ""}`}
      </p>

      <button type="button" className="btn-secondary" onClick={() => dispatch({ type: "RESTART" })}>
        Restart
      </button>

      <TracePanel events={state.events} />
    </section>
  );
}
