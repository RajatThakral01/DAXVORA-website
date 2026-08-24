import type { JSX } from "react";

export default function HaloSchematic(): JSX.Element {
  return (
    <div aria-hidden="true">
      <svg
        className="diagram-schematic"
        viewBox="0 0 720 320"
        width="100%"
        height="320"
        role="presentation"
      >
        <rect x={260} y={120} width={200} height={80} rx={2} fill="var(--dx-bone)" stroke="var(--dx-carbon)" strokeWidth={1.5} />
        <text x={360} y={150} textAnchor="middle">Shared context</text>
        <text x={360} y={170} textAnchor="middle" fontSize="11" fill="var(--dx-graphite)">Halo memory</text>

        <rect x={16} y={40} width={160} height={44} rx={2} fill="var(--dx-bone)" stroke="var(--dx-mist)" />
        <text x={96} y={66} textAnchor="middle">Voice / SMS</text>

        <rect x={16} y={100} width={160} height={44} rx={2} fill="var(--dx-bone)" stroke="var(--dx-mist)" />
        <text x={96} y={126} textAnchor="middle">Email / Chat</text>

        <rect x={16} y={220} width={160} height={44} rx={2} fill="var(--dx-bone)" stroke="var(--dx-mist)" />
        <text x={96} y={246} textAnchor="middle">CRM / Queue</text>

        <line x1={176} y1={62} x2={260} y2={140} stroke="var(--dx-carbon)" strokeWidth={1} />
        <line x1={176} y1={122} x2={260} y2={150} stroke="var(--dx-carbon)" strokeWidth={1} />
        <line x1={176} y1={242} x2={260} y2={180} stroke="var(--dx-carbon)" strokeWidth={1} />

        <rect x={544} y={20} width={160} height={44} rx={2} fill="var(--dx-bone)" stroke="var(--dx-mist)" />
        <text x={624} y={46} textAnchor="middle">Sales</text>

        <rect x={544} y={80} width={160} height={44} rx={2} fill="var(--dx-bone)" stroke="var(--dx-mist)" />
        <text x={624} y={106} textAnchor="middle">Support</text>

        <rect x={544} y={140} width={160} height={44} rx={2} fill="var(--dx-bone)" stroke="var(--dx-mist)" />
        <text x={624} y={166} textAnchor="middle">Billing</text>

        <rect x={544} y={220} width={160} height={52} rx={2} fill="var(--dx-white)" stroke="var(--dx-carbon)" strokeWidth={1} strokeDasharray="6 4" />
        <text x={624} y={244} textAnchor="middle">Human escalation</text>
        <text x={624} y={262} textAnchor="middle" fontSize="10" fill="var(--dx-graphite)">terminal</text>

        <line x1={460} y1={140} x2={544} y2={42} stroke="var(--dx-carbon)" strokeWidth={1} />
        <line x1={460} y1={150} x2={544} y2={102} stroke="var(--dx-carbon)" strokeWidth={1} />
        <line x1={460} y1={160} x2={544} y2={162} stroke="var(--dx-carbon)" strokeWidth={1} />
        <line x1={460} y1={170} x2={544} y2={242} stroke="var(--dx-carbon)" strokeWidth={1} strokeDasharray="6 4" />
      </svg>
    </div>
  );
}
