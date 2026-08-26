import type { JSX } from "react";

const STAGES = [
  { num: "01", name: "Discovery" },
  { num: "02", name: "Atomic" },
  { num: "03", name: "Opportunity" },
  { num: "04", name: "Data/Context" },
  { num: "05", name: "Agent build" },
  { num: "06", name: "Phased deploy" },
  { num: "07", name: "Operate" },
];

export default function MethodDiagram(): JSX.Element {
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
  };

  const W = 900;
  const cardW = 110;
  const gap = (W - (cardW * 7)) / 6; 
  
  return (
    <div aria-hidden="true" style={{ width: "100%", overflowX: "auto", paddingBottom: "1rem" }}>
      <svg
        viewBox={`0 0 ${W} 120`}
        style={{ minWidth: "800px", display: "block", margin: "0 auto" }}
        role="presentation"
      >
        <defs>
          <marker
            id="arrow-method-signal"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill={C.signal} />
          </marker>
        </defs>

        {/* Draw connectors first so they go behind cards */}
        {STAGES.map((_, i) => {
          if (i === STAGES.length - 1) return null;
          const startX = i * (cardW + gap) + cardW;
          const endX = startX + gap;
          
          return (
            <line
              key={`conn-${i}`}
              x1={startX}
              y1={60}
              x2={endX - 2}
              y2={60}
              stroke={C.signal}
              strokeWidth={1.5}
              markerEnd="url(#arrow-method-signal)"
            />
          );
        })}

        {/* Draw cards */}
        {STAGES.map((stage, i) => {
          const x = i * (cardW + gap);
          
          return (
            <g key={stage.num}>
              {/* Card background */}
              <rect
                x={x}
                y={30}
                width={cardW}
                height={60}
                rx={2}
                fill={C.graphite}
                stroke={C.w10}
                strokeWidth={1}
              />
              
              {/* Top Accent */}
              <rect 
                x={x} 
                y={30} 
                width={cardW} 
                height={2} 
                rx={1} 
                fill={C.white} 
              />
              
              {/* Number */}
              <text
                x={x + 12}
                y={52}
                fill={C.signal}
                fontSize={10}
                fontWeight={700}
                fontFamily="Arial, Helvetica, sans-serif"
                letterSpacing={1}
              >
                {stage.num}
              </text>
              
              {/* Name */}
              <text
                x={x + 12}
                y={72}
                fill={C.white}
                fontSize={11}
                fontWeight={900}
                fontFamily="Arial, Helvetica, sans-serif"
              >
                {stage.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
