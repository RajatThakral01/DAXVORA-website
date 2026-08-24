import type { JSX } from "react";

const STAGE_LABELS = [
  "01 Discovery",
  "02 Atomic",
  "03 Opportunity",
  "04 Data/Context",
  "05 Agent build",
  "06 Phased deploy",
  "07 Operate",
];

export default function MethodDiagram(): JSX.Element {
  return (
    <div aria-hidden="true">
      <svg
        className="diagram-flow diagram-horizontal"
        viewBox="0 0 1400 80"
        width="100%"
        height="80"
        role="presentation"
      >
        {STAGE_LABELS.map((label, i) => {
          const x = 16 + i * 196;
          return (
            <g key={label}>
              <rect
                x={x}
                y={12}
                width={176}
                height={56}
                rx={2}
                fill="var(--dx-bone)"
                stroke="var(--dx-mist)"
                strokeWidth={1}
              />
              <text x={x + 88} y={36} textAnchor="middle" dominantBaseline="middle">
                {label}
              </text>
              {i < STAGE_LABELS.length - 1 && (
                <line
                  x1={x + 176}
                  y1={40}
                  x2={x + 196}
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
        viewBox="0 0 360 520"
        width="100%"
        height="520"
        role="presentation"
      >
        {STAGE_LABELS.map((label, i) => (
          <g key={label}>
            <rect
              x={16}
              y={12 + i * 72}
              width={328}
              height={52}
              rx={2}
              fill="var(--dx-bone)"
              stroke="var(--dx-mist)"
              strokeWidth={1}
            />
            <text x={180} y={38 + i * 72} textAnchor="middle" dominantBaseline="middle">
              {label}
            </text>
            {i < STAGE_LABELS.length - 1 && (
              <line
                x1={180}
                y1={64 + i * 72}
                x2={180}
                y2={84 + i * 72}
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
