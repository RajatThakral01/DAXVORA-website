import type { JSX } from "react";

const STAGES = ["Validate", "Classify", "Score", "Attribute", "Route"];

export default function DemandPipelineDiagram(): JSX.Element {
  const C = {
    signal: "#C8FF3D",
    white: "#FFFFFF",
    carbon: "#0B0D10",
    graphite: "#343941",
    bone: "#F4F2EC",
    mist: "rgba(52,57,65,0.12)",
    carbonDim: "rgba(11,13,16,0.35)",
  };

  const W = 440;
  const cardH = 72;
  const cardW = 340;
  const gap = 72;
  const H = (cardH * STAGES.length) + (gap * (STAGES.length - 1)) + 40; // padding top/bottom

  return (
    <div aria-hidden="true" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", maxWidth: "440px", height: "auto" }}
        role="presentation"
      >
        <defs>
          <marker
            id="arrow-demand-vert"
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
          const startY = 20 + (i * (cardH + gap)) + cardH;
          const endY = startY + gap;
          
          return (
            <line
              key={`conn-${i}`}
              x1={W / 2}
              y1={startY}
              x2={W / 2}
              y2={endY - 2}
              stroke={C.carbonDim}
              strokeWidth={1.5}
              markerEnd="url(#arrow-demand-vert)"
            />
          );
        })}

        {/* Cards */}
        {STAGES.map((label, i) => {
          const y = 20 + i * (cardH + gap);
          const x = (W - cardW) / 2;
          
          return (
            <g key={label}>
              {/* Card Base */}
              <rect
                x={x}
                y={y}
                width={cardW}
                height={cardH}
                rx={2}
                fill={C.graphite}
                stroke="none"
              />
              
              {/* Left Accent (Vertical) */}
              <rect 
                x={x} 
                y={y} 
                width={3} 
                height={cardH} 
                rx={1} 
                fill={C.signal} 
              />
              
              {/* Text */}
              <text
                x={W / 2}
                y={y + (cardH / 2) + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={C.white}
                fontSize={12}
                fontWeight={900}
                fontFamily="Arial, Helvetica, sans-serif"
                letterSpacing={0.2}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
