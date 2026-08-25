"use client";

import { useReducer } from "react";
import { signals } from "./fixtures";
import { createInitialState, demandSignalReducer } from "./reducer";
import TracePanel from "../shared/TracePanel";

const FAILURE_ELIGIBLE = ["validating", "classified", "scored", "attributed"];

export default function DemandSignalDemo() {
  const [state, dispatch] = useReducer(
    demandSignalReducer,
    undefined,
    createInitialState
  );

  const failureEligible = FAILURE_ELIGIBLE.includes(state.status);
  const isRouted = state.status === "routed";
  const hasActiveRun = state.status !== "idle";
  const isFailed =
    state.status === "pipeline_failed" || state.status === "signal_rejected";

  return (
    <section
      aria-labelledby="demand-signal-demo-status"
      className={`demand-signal-demo ${isFailed ? "demand-signal-demo--failed" : ""}`}
      data-status={state.status}
    >
      <p id="demand-signal-demo-status" className="demand-signal-demo__sim-label">
        <strong>SIMULATED</strong> — Not connected to client systems
      </p>

      <fieldset className="demand-signal-fieldset">
        <legend>Choose an inbound signal</legend>
        <div className="demand-signal-list">
          {signals.map((signal) => (
            <button
              key={signal.id}
              type="button"
              className="demand-signal-button"
              aria-pressed={state.signalId === signal.id}
              onClick={() =>
                dispatch({ type: "SELECT_SIGNAL", signalId: signal.id })
              }
            >
              {signal.label}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="demand-signal-status">Status: {state.status}</p>

      <div className="demand-signal-actions">
        <button
          type="button"
          className="btn-secondary"
          disabled={state.status !== "validating"}
          onClick={() => dispatch({ type: "VALIDATE" })}
        >
          Validate
        </button>

        <button
          type="button"
          className="btn-secondary"
          disabled={state.status !== "classified"}
          onClick={() => dispatch({ type: "CLASSIFY" })}
        >
          Classify
        </button>

        <button
          type="button"
          className="btn-secondary"
          disabled={state.status !== "scored"}
          onClick={() => dispatch({ type: "SCORE" })}
        >
          Score
        </button>

        <button
          type="button"
          className="btn-secondary"
          disabled={state.status !== "attributed"}
          onClick={() => dispatch({ type: "ATTRIBUTE" })}
        >
          Attribute
        </button>

        <button
          type="button"
          className="btn-secondary"
          disabled={!failureEligible}
          onClick={() => dispatch({ type: "SIMULATE_PIPELINE_FAILURE" })}
        >
          Simulate pipeline failure
        </button>
      </div>

      <h2>Signal</h2>
      {state.rawSignal ? (
        <dl
          className={`demand-signal-panel ${isFailed ? "demand-signal-panel--failed" : ""}`}
        >
          <dt>Source</dt>
          <dd>{state.rawSignal.source}</dd>
          <dt>Payload</dt>
          <dd>{state.rawSignal.payload}</dd>
        </dl>
      ) : (
        <p>No signal selected yet.</p>
      )}

      {state.validation && (
        <>
          <h2>Validation</h2>
          <dl
            className={`demand-signal-panel ${isFailed ? "demand-signal-panel--failed" : ""}`}
          >
            <dt>Outcome</dt>
            <dd>{state.validation.valid ? "Valid" : "Rejected"}</dd>
            <dt>Reason</dt>
            <dd>{state.validation.reason}</dd>
          </dl>
        </>
      )}

      {state.classification && (
        <>
          <h2>Classification</h2>
          <dl
            className={`demand-signal-panel ${isFailed ? "demand-signal-panel--failed" : ""}`}
          >
            <dt>Category</dt>
            <dd>{state.classification.category}</dd>
            <dt>Confidence</dt>
            <dd>{state.classification.confidence}</dd>
          </dl>
        </>
      )}

      {state.score && (
        <>
          <h2>Score</h2>
          <dl
            className={`demand-signal-panel ${isFailed ? "demand-signal-panel--failed" : ""}`}
          >
            <dt>Value</dt>
            <dd>{state.score.value}</dd>
            <dt>Band</dt>
            <dd>{state.score.band}</dd>
          </dl>
        </>
      )}

      {state.attribution && (
        <>
          <h2>Attribution</h2>
          <dl
            className={`demand-signal-panel ${isFailed ? "demand-signal-panel--failed" : ""}`}
          >
            <dt>Channel</dt>
            <dd>{state.attribution.channel}</dd>
            <dt>Touchpoints</dt>
            <dd>
              <ul>
                {state.attribution.touchpoints.map((touchpoint) => (
                  <li key={touchpoint}>{touchpoint}</li>
                ))}
              </ul>
            </dd>
          </dl>
        </>
      )}

      {isRouted && state.routing && (
        <section
          aria-labelledby="demand-routing-receipt-heading"
          className={`demand-signal-receipt ${hasActiveRun ? "demand-signal-receipt--active" : ""}`}
        >
          <h2 id="demand-routing-receipt-heading">Routing receipt</h2>
          <dl>
            <dt>Signal source</dt>
            <dd>{state.rawSignal?.source}</dd>
            <dt>Validation</dt>
            <dd>
              {state.validation?.valid
                ? `Valid — ${state.validation.reason}`
                : "Invalid"}
            </dd>
            <dt>Classification</dt>
            <dd>
              {state.classification?.category} ({state.classification?.confidence}{" "}
              confidence)
            </dd>
            <dt>Score</dt>
            <dd>
              {state.score?.value} ({state.score?.band} band)
            </dd>
            <dt>Attribution channel</dt>
            <dd>{state.attribution?.channel}</dd>
            <dt>Touchpoints</dt>
            <dd>{state.attribution?.touchpoints.join(", ")}</dd>
            <dt>Routed to</dt>
            <dd>{state.routing.destination}</dd>
            <dt>Routing reason</dt>
            <dd>{state.routing.reason}</dd>
          </dl>
        </section>
      )}

      {state.error && (
        <p role="alert" className="demand-signal-error">
          Error: {state.error}
        </p>
      )}

      <p aria-live="polite" className="demand-signal-live-region">
        {state.status === "idle"
          ? "No signal selected yet."
          : isRouted
            ? `Routed to ${state.routing?.destination ?? ""}`
            : state.status === "signal_rejected"
              ? `Signal rejected: ${state.validation?.reason ?? ""}`
              : state.status === "pipeline_failed"
                ? `Run failed: ${state.error ?? "simulated pipeline failure"}`
                : `Current stage: ${state.status}`}
      </p>

      <button type="button" className="btn-secondary" onClick={() => dispatch({ type: "RESTART" })}>
        Restart
      </button>

      <TracePanel events={state.events} />
    </section>
  );
}
