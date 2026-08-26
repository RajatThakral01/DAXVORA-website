import type { JSX } from "react";

export default function HaloSchematic(): JSX.Element {
  // Brand tokens for SVG
  const C = {
    signal: "#C8FF3D",
    white: "#FFFFFF",
    carbon: "#0B0D10",
    graphite: "#343941",
    mistLight: "rgba(255, 255, 255, 0.12)",
    graphiteLight: "rgba(255, 255, 255, 0.4)",
  };

  const W = 800;
  const H = 400;

  // Left column (3 cards)
  const leftY1 = 96;
  const leftY2 = 176;
  const leftY3 = 256;
  
  // Right column (4 cards)
  const rightY1 = 52;
  const rightY2 = 132;
  const rightY3 = 212;
  const rightY4 = 292;

  // Center node
  const centerY = 160;

  // Connector endpoints
  const centerLeftX = 290;
  const centerRightX = 510;

  return (
    <div aria-hidden="true" style={{ width: "100%", overflowX: "auto", paddingBottom: "1rem" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ minWidth: "700px", display: "block", margin: "0 auto" }}
        role="presentation"
      >
        <defs>
          <marker id="arrow-halo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={C.mistLight} />
          </marker>
          <marker id="arrow-halo-signal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={C.signal} />
          </marker>
        </defs>

        {/* CONNECTORS (LEFT TO CENTER) */}
        <line x1={200} y1={leftY1 + 24} x2={centerLeftX} y2={centerY + 20} stroke={C.mistLight} strokeWidth={1.5} markerEnd="url(#arrow-halo)" />
        <line x1={200} y1={leftY2 + 24} x2={centerLeftX} y2={centerY + 40} stroke={C.mistLight} strokeWidth={1.5} markerEnd="url(#arrow-halo)" />
        <line x1={200} y1={leftY3 + 24} x2={centerLeftX} y2={centerY + 60} stroke={C.mistLight} strokeWidth={1.5} markerEnd="url(#arrow-halo)" />

        {/* CONNECTORS (CENTER TO RIGHT) */}
        <line x1={centerRightX} y1={centerY + 10} x2={590} y2={rightY1 + 24} stroke={C.mistLight} strokeWidth={1.5} markerEnd="url(#arrow-halo)" />
        <line x1={centerRightX} y1={centerY + 30} x2={590} y2={rightY2 + 24} stroke={C.mistLight} strokeWidth={1.5} markerEnd="url(#arrow-halo)" />
        <line x1={centerRightX} y1={centerY + 50} x2={590} y2={rightY3 + 24} stroke={C.mistLight} strokeWidth={1.5} markerEnd="url(#arrow-halo)" />
        <line x1={centerRightX} y1={centerY + 70} x2={590} y2={rightY4 + 28} stroke={C.signal} strokeWidth={1.5} strokeDasharray="6 4" markerEnd="url(#arrow-halo-signal)" />

        {/* --- CARDS --- */}

        {/* LEFT COLUMN: Inputs */}
        <g>
          {/* Voice/SMS */}
          <rect x={40} y={leftY1} width={160} height={48} rx={2} fill={C.graphite} />
          <rect x={40} y={leftY1} width={160} height={2} rx={1} fill={C.white} />
          <text x={120} y={leftY1 + 28} textAnchor="middle" fill={C.white} fontSize={12} fontWeight={700} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.2}>
            Voice / SMS
          </text>

          {/* Email/Chat */}
          <rect x={40} y={leftY2} width={160} height={48} rx={2} fill={C.graphite} />
          <rect x={40} y={leftY2} width={160} height={2} rx={1} fill={C.white} />
          <text x={120} y={leftY2 + 28} textAnchor="middle" fill={C.white} fontSize={12} fontWeight={700} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.2}>
            Email / Chat
          </text>

          {/* CRM/Queue */}
          <rect x={40} y={leftY3} width={160} height={48} rx={2} fill={C.graphite} />
          <rect x={40} y={leftY3} width={160} height={2} rx={1} fill={C.white} />
          <text x={120} y={leftY3 + 28} textAnchor="middle" fill={C.white} fontSize={12} fontWeight={700} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.2}>
            CRM / Queue
          </text>
        </g>

        {/* CENTER: Halo Agent */}
        <g>
          <rect x={300} y={centerY} width={200} height={80} rx={4} fill={C.graphite} stroke={C.signal} strokeWidth={2} />
          <text x={400} y={centerY + 36} textAnchor="middle" fill={C.white} fontSize={14} fontWeight={900} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.2}>
            Shared context
          </text>
          <text x={400} y={centerY + 58} textAnchor="middle" fill={C.signal} fontSize={11} fontWeight={700} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.5} style={{ textTransform: "uppercase" }}>
            Halo Memory
          </text>
        </g>

        {/* RIGHT COLUMN: Outputs */}
        <g>
          {/* Sales */}
          <rect x={600} y={rightY1} width={160} height={48} rx={2} fill={C.graphite} />
          <rect x={600} y={rightY1} width={160} height={2} rx={1} fill={C.white} />
          <text x={680} y={rightY1 + 28} textAnchor="middle" fill={C.white} fontSize={12} fontWeight={700} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.2}>
            Sales
          </text>

          {/* Support */}
          <rect x={600} y={rightY2} width={160} height={48} rx={2} fill={C.graphite} />
          <rect x={600} y={rightY2} width={160} height={2} rx={1} fill={C.white} />
          <text x={680} y={rightY2 + 28} textAnchor="middle" fill={C.white} fontSize={12} fontWeight={700} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.2}>
            Support
          </text>

          {/* Billing */}
          <rect x={600} y={rightY3} width={160} height={48} rx={2} fill={C.graphite} />
          <rect x={600} y={rightY3} width={160} height={2} rx={1} fill={C.white} />
          <text x={680} y={rightY3 + 28} textAnchor="middle" fill={C.white} fontSize={12} fontWeight={700} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.2}>
            Billing
          </text>

          {/* Human escalation */}
          <rect x={600} y={rightY4} width={160} height={56} rx={2} fill="transparent" stroke={C.signal} strokeWidth={1.5} strokeDasharray="4 2" />
          <text x={680} y={rightY4 + 26} textAnchor="middle" fill={C.signal} fontSize={12} fontWeight={900} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.2}>
            Human escalation
          </text>
          <text x={680} y={rightY4 + 44} textAnchor="middle" fill={C.graphiteLight} fontSize={10} fontWeight={700} fontFamily="Arial, Helvetica, sans-serif" letterSpacing={0.5} style={{ textTransform: "uppercase" }}>
            Terminal
          </text>
        </g>
      </svg>
    </div>
  );
}
