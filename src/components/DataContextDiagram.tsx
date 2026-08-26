import type { JSX } from "react";

const STAGES = [
  { id: "sources", label: "Sources" },
  { id: "normalize", label: "Normalize" },
  { id: "context", label: "Governed context" },
  { id: "action", label: "Decision / Action" },
  { id: "audit", label: "Audit" },
];

export default function DataContextDiagram(): JSX.Element {
  // SVG doesn't parse CSS vars reliably across all browsers for all attributes,
  // so we use inline hex codes that match the DAXVORA brand tokens.
  const C = {
    signal: "#C8FF3D",
    white: "#FFFFFF",
    carbon: "#0B0D10",
    graphite: "#343941",
    bone: "#F4F2EC",
    mist: "rgba(52,57,65,0.12)", // Carbon at 12%
    carbonDim: "rgba(11,13,16,0.35)",
  };

  const W = 800;
  const cardW = 130;
  const gap = (W - (cardW * STAGES.length)) / (STAGES.length - 1);
  const H = 80;

  return (
    <div aria-hidden="true" style={{ width: "100%", overflowX: "auto", paddingBottom: "1rem" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ minWidth: "700px", display: "block", margin: "0 auto" }}
        role="presentation"
      >
        <defs>
          <marker
            id="arrow-context"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill={C.carbonDim} />
          </marker>
        </defs>

        {/* Connectors */}
        {STAGES.map((_, i) => {
          if (i === STAGES.length - 1) return null;
          const startX = i * (cardW + gap) + cardW;
          const endX = startX + gap;
          
          return (
            <line
              key={`conn-${i}`}
              x1={startX}
              y1={40}
              x2={endX - 2}
              y2={40}
              stroke={C.carbonDim}
              strokeWidth={1.5}
              markerEnd="url(#arrow-context)"
            />
          );
        })}

        {/* Cards */}
        {STAGES.map((stage, i) => {
          const x = i * (cardW + gap);
          
          return (
            <g key={stage.id}>
              {/* Card Base */}
              <rect
                x={x}
                y={16}
                width={cardW}
                height={48}
                rx={2}
                fill={C.graphite}
                stroke="none"
              />
              
              {/* Top Accent */}
              <rect 
                x={x} 
                y={16} 
                width={cardW} 
                height={2} 
                rx={1} 
                fill={C.signal} 
              />
              
              {/* Text */}
              <text
                x={x + (cardW / 2)}
                y={42}
                textAnchor="middle"
                fill={C.white}
                fontSize={12}
                fontWeight={900}
                fontFamily="Arial, Helvetica, sans-serif"
                letterSpacing={0.2}
              >
                {stage.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
