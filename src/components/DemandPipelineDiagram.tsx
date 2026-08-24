import type { JSX } from "react";

const STAGES = ["Validate", "Classify", "Score", "Attribute", "Route"];

export default function DemandPipelineDiagram(): JSX.Element {
  return (
    <div aria-hidden="true">
      <svg
        className="diagram-flow diagram-horizontal"
        viewBox="0 0 1200 80"
        width="100%"
        height="80"
        role="presentation"
      >
        {STAGES.map((label, i) => {
          const x = 16 + i * 236;
          return (
            <g key={label}>
              <rect
                x={x}
                y={16}
                width={200}
                height={48}
                rx={2}
                fill="var(--dx-bone)"
                stroke="var(--dx-mist)"
                strokeWidth={1}
              />
              <text x={x + 100} y={44} textAnchor="middle" dominantBaseline="middle">
                {label}
              </text>
              {i < STAGES.length - 1 && (
                <line
                  x1={x + 200}
                  y1={40}
                  x2={x + 236}
                  y2={40}
                  stroke="var(--dx-carbon)"
                  strokeWidth={1}
                />
              )}
            </g>
          );
        })}
      </svg>

      <svg
        className="diagram-flow diagram-vertical"
        viewBox="0 0 360 400"
        width="100%"
        height="400"
        role="presentation"
      >
        {STAGES.map((label, i) => (
          <g key={label}>
            <rect
              x={16}
              y={12 + i * 76}
              width={328}
              height={52}
              rx={2}
              fill="var(--dx-bone)"
              stroke="var(--dx-mist)"
              strokeWidth={1}
            />
            <text x={180} y={38 + i * 76} textAnchor="middle" dominantBaseline="middle">
              {label}
            </text>
            {i < STAGES.length - 1 && (
              <line
                x1={180}
                y1={64 + i * 76}
                x2={180}
                y2={88 + i * 76}
                stroke="var(--dx-carbon)"
                strokeWidth={1}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
