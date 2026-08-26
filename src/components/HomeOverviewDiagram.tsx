import type { JSX } from "react";

/**
 * Hero architecture schematic — designed for the Carbon dark hero right column.
 * Shows the 4-layer DAXVORA operating stack:
 *   1. Business data sources (top)
 *   2. DAXVORA context foundation (core)
 *   3. Halo Agent | Automation stack (split)
 *   4. Founder review / audit (bottom)
 * Single SVG, no horizontal/vertical duplication.
 */
export default function HomeOverviewDiagram(): JSX.Element {
  // Brand constants (inline for SVG — CSS vars don't work in SVG attributes)
  const C = {
    signal: "#C8FF3D",
    white: "#FFFFFF",
    carbon: "#0B0D10",
    graphite: "#343941",
    bone: "#F4F2EC",
    w10: "rgba(255,255,255,0.10)",
    w06: "rgba(255,255,255,0.06)",
    w04: "rgba(255,255,255,0.04)",
    w50: "rgba(255,255,255,0.50)",
    w35: "rgba(255,255,255,0.35)",
    w20: "rgba(255,255,255,0.20)",
    signalDim: "rgba(200,255,61,0.25)",
    signalHalf: "rgba(200,255,61,0.5)",
  };

  const W = 520; // total width
  const r = 3;   // corner radius

  return (
    <div aria-hidden="true" style={{ width: "100%", maxWidth: 520 }}>
      <svg
        viewBox={`0 0 ${W} 452`}
        width="100%"
        height="auto"
        role="presentation"
        style={{ display: "block" }}
      >
        {/* ── DEFS ─────────────────────────────────────────── */}
        <defs>
          {/* Signal Lime glow filter on the core card */}
          <filter id="signal-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arrow marker for connectors */}
          <marker
            id="arrow-signal"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill={C.signal} />
          </marker>

          <marker
            id="arrow-dim"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill={C.w20} />
          </marker>
        </defs>

        {/* ══════════════════════════════════════════════════
            LAYER 1 — Business data sources
            ══════════════════════════════════════════════════ */}
        {/* Background band */}
        <rect x={0} y={0} width={W} height={60} rx={r} fill={C.w04} />
        {/* Left accent rule */}
        <rect x={0} y={0} width={2} height={60} rx={1} fill={C.signalHalf} />

        {/* Label */}
        <text
          x={16}
          y={20}
          fill={C.signal}
          fontSize={8}
          fontWeight={700}
          letterSpacing={1.2}
          fontFamily="Arial, Helvetica, sans-serif"
          textAnchor="start"
        >
          BUSINESS DATA LAYER
        </text>

        {/* Source pills */}
        {["CRM", "Email", "Finance", "Ops", "Chat"].map((src, i) => (
          <g key={src}>
            <rect
              x={16 + i * 98}
              y={30}
              width={86}
              height={22}
              rx={2}
              fill={C.w10}
              stroke={C.w20}
              strokeWidth={1}
            />
            <text
              x={16 + i * 98 + 43}
              y={41}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={C.w50}
              fontSize={9.5}
              fontWeight={700}
              fontFamily="Arial, Helvetica, sans-serif"
              letterSpacing={0.5}
            >
              {src}
            </text>
          </g>
        ))}

        {/* ── Connector 1 → 2 ─────────────────────────────── */}
        <line
          x1={W / 2}
          y1={60}
          x2={W / 2}
          y2={84}
          stroke={C.signal}
          strokeWidth={1.5}
          markerEnd="url(#arrow-signal)"
        />

        {/* ══════════════════════════════════════════════════
            LAYER 2 — DAXVORA Context Foundation (core)
            ══════════════════════════════════════════════════ */}
        {/* Outer glow rect */}
        <rect
          x={1}
          y={90}
          width={W - 2}
          height={108}
          rx={r}
          fill="none"
          stroke={C.signalDim}
          strokeWidth={1}
          filter="url(#signal-glow)"
        />
        {/* Main card */}
        <rect
          x={0}
          y={90}
          width={W}
          height={108}
          rx={r}
          fill={C.w06}
        />
        {/* Signal top border */}
        <rect x={0} y={90} width={W} height={2} rx={1} fill={C.signal} />

        {/* DAXVORA wordmark */}
        <text
          x={20}
          y={124}
          fill={C.white}
          fontSize={16}
          fontWeight={900}
          letterSpacing={1.5}
          fontFamily="Arial Black, Arial, Helvetica, sans-serif"
        >
          DAXVORA
        </text>

        {/* Sub-label */}
        <text
          x={20}
          y={144}
          fill={C.signal}
          fontSize={8}
          fontWeight={700}
          letterSpacing={1}
          fontFamily="Arial, Helvetica, sans-serif"
        >
          CONTEXT FOUNDATION
        </text>

        {/* Divider */}
        <line
          x1={20}
          y1={154}
          x2={W - 20}
          y2={154}
          stroke={C.w10}
          strokeWidth={1}
        />

        {/* Capability tags */}
        {["Normalize", "Govern", "Connect", "Route", "Audit"].map((tag, i) => (
          <g key={tag}>
            <rect
              x={20 + i * 96}
              y={162}
              width={84}
              height={22}
              rx={2}
              fill={C.w06}
              stroke={C.w10}
              strokeWidth={1}
            />
            <text
              x={20 + i * 96 + 42}
              y={173}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={C.w50}
              fontSize={8.5}
              fontWeight={700}
              letterSpacing={0.4}
              fontFamily="Arial, Helvetica, sans-serif"
            >
              {tag}
            </text>
          </g>
        ))}

        {/* ── Connectors 2 → 3 (fork) ─────────────────────── */}
        {/* Left fork */}
        <path
          d={`M ${W / 2} 198 L ${W / 2} 212 L 124 212 L 124 232`}
          stroke={C.signal}
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#arrow-signal)"
        />
        {/* Right fork */}
        <path
          d={`M ${W / 2} 212 L 396 212 L 396 232`}
          stroke={C.signal}
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#arrow-signal)"
        />

        {/* ══════════════════════════════════════════════════
            LAYER 3 — Halo Agent | Automation stack
            ══════════════════════════════════════════════════ */}

        {/* LEFT: Halo Agent */}
        <rect x={0} y={232} width={244} height={96} rx={r} fill={C.w06} stroke={C.w10} strokeWidth={1} />
        <rect x={0} y={232} width={244} height={2} rx={1} fill={C.signal} />

        <text
          x={20}
          y={260}
          fill={C.white}
          fontSize={11}
          fontWeight={900}
          letterSpacing={0.8}
          fontFamily="Arial Black, Arial, Helvetica, sans-serif"
        >
          HALO AGENT
        </text>
        <text
          x={20}
          y={278}
          fill={C.signal}
          fontSize={7.5}
          fontWeight={700}
          letterSpacing={0.8}
          fontFamily="Arial, Helvetica, sans-serif"
        >
          SIGNATURE SYSTEM
        </text>

        {/* Halo sub-tags */}
        {["Route", "Context", "Handoff"].map((t, i) => (
          <g key={t}>
            <rect x={20 + i * 70} y={290} width={62} height={18} rx={2} fill={C.w10} />
            <text
              x={20 + i * 70 + 31}
              y={299}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={C.w35}
              fontSize={8}
              fontWeight={700}
              fontFamily="Arial, Helvetica, sans-serif"
            >
              {t}
            </text>
          </g>
        ))}

        {/* RIGHT: Automation stack */}
        <rect x={252} y={232} width={268} height={96} rx={r} fill={C.w06} stroke={C.w10} strokeWidth={1} />
        <rect x={252} y={232} width={268} height={2} rx={1} fill={C.signal} />

        <text
          x={272}
          y={260}
          fill={C.white}
          fontSize={11}
          fontWeight={900}
          letterSpacing={0.8}
          fontFamily="Arial Black, Arial, Helvetica, sans-serif"
        >
          AUTOMATION STACK
        </text>
        <text
          x={272}
          y={278}
          fill={C.w35}
          fontSize={7.5}
          fontWeight={700}
          letterSpacing={0.8}
          fontFamily="Arial, Helvetica, sans-serif"
        >
          DEMAND · OPS · CX
        </text>

        {/* Auto sub-tags */}
        {["Demand", "Process", "Decision"].map((t, i) => (
          <g key={t}>
            <rect x={272 + i * 80} y={290} width={70} height={18} rx={2} fill={C.w10} />
            <text
              x={272 + i * 80 + 35}
              y={299}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={C.w35}
              fontSize={8}
              fontWeight={700}
              fontFamily="Arial, Helvetica, sans-serif"
            >
              {t}
            </text>
          </g>
        ))}

        {/* ── Connectors 3 → 4: both sides merge at y=356, arrow to layer 4 ── */}
        {/* Left (Halo Agent center at x≈122) down to y=356 */}
        <line
          x1={122} y1={328} x2={122} y2={356}
          stroke={C.w35} strokeWidth={1.5}
        />
        {/* Right (Automation Stack center at x≈396) down to y=356 */}
        <line
          x1={396} y1={328} x2={396} y2={356}
          stroke={C.w35} strokeWidth={1.5}
        />
        {/* Horizontal merge bar at y=356 */}
        <line
          x1={122} y1={356} x2={396} y2={356}
          stroke={C.w35} strokeWidth={1.5}
        />
        {/* Center drop from merge bar to Founder Review with arrow */}
        <line
          x1={W / 2} y1={356} x2={W / 2} y2={372}
          stroke={C.w35} strokeWidth={1.5}
          markerEnd="url(#arrow-dim)"
        />

        {/* ══════════════════════════════════════════════════
            LAYER 4 — Founder review / audit
            ══════════════════════════════════════════════════ */}
        <rect x={0} y={372} width={W} height={60} rx={r} fill={C.w04} />
        {/* Top accent line — consistent with other layers */}
        <rect x={0} y={372} width={W} height={2} rx={1} fill={C.signal} />
        {/* Right accent rule */}
        <rect x={W - 2} y={372} width={2} height={60} rx={1} fill={C.w20} />

        <text
          x={20}
          y={394}
          fill={C.w50}
          fontSize={8}
          fontWeight={700}
          letterSpacing={1.2}
          fontFamily="Arial, Helvetica, sans-serif"
        >
          FOUNDER REVIEW LAYER
        </text>

        {/* Review tags */}
        {["Audit log", "Exceptions", "Decisions", "Cost visibility"].map((t, i) => (
          <g key={t}>
            <rect x={16 + i * 122} y={404} width={112} height={20} rx={2} fill={C.w06} stroke={C.w10} strokeWidth={1} />
            <text
              x={16 + i * 122 + 56}
              y={414}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={C.w35}
              fontSize={8.5}
              fontWeight={700}
              fontFamily="Arial, Helvetica, sans-serif"
            >
              {t}
            </text>
          </g>
        ))}

        {/* ── Phased / evidence label ──────────────────────── */}
        <text
          x={W - 16}
          y={444}
          textAnchor="end"
          fill={C.w20}
          fontSize={7.5}
          fontWeight={700}
          letterSpacing={0.8}
          fontFamily="Arial, Helvetica, sans-serif"
        >
          PHASED · EVIDENCE-LED · OBSERVABLE
        </text>
      </svg>
    </div>
  );
}
