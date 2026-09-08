const STEPS = [
  {
    title: "Regulation",
    text: "Turn EU AI Act duties into risk-based requirements for a named system and role — not a generic checklist.",
  },
  {
    title: "Control design",
    text: "Specify deterministic limits: who may act, on what, under which threshold, and who can stop the system.",
  },
  {
    title: "SDLC gates",
    text: "Encode those limits as tests, policy-as-code and release blockers. A model that misses the gate does not ship.",
  },
  {
    title: "Runtime assurance",
    text: "Independent controls constrain a probabilistic model while it runs — including kill switches and human review.",
  },
  {
    title: "Evidence",
    text: "Each decision emits a hashed pack. The chain is the audit trail; screenshots are not.",
  },
] as const;

export default function GovernancePipeline() {
  return (
    <figure className="gov-pipeline">
      <figcaption>
        <span className="arch-kicker">Deterministic path</span>
        Probabilistic models require deterministic governance
      </figcaption>
      <svg
        className="gov-pipeline-svg"
        viewBox="0 0 920 92"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <title>Regulation to evidence</title>
        <defs>
          <marker id="gov-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#55c8ff" />
          </marker>
        </defs>
        {[0, 1, 2, 3].map((index) => (
          <line
            key={index}
            x1={168 + index * 184}
            y1="46"
            x2={184 + index * 184}
            y2="46"
            stroke="#55c8ff"
            strokeWidth="2"
            markerEnd="url(#gov-arrow)"
          />
        ))}
        {STEPS.map((step, index) => (
          <g key={step.title}>
            <rect
              x={12 + index * 184}
              y="14"
              width="148"
              height="64"
              rx="2"
              fill="#06142d"
              stroke="#55c8ff"
            />
            <text
              x={86 + index * 184}
              y="52"
              textAnchor="middle"
              fill="#f5f8fc"
              fontSize="13"
              fontFamily="IBM Plex Sans, Segoe UI, sans-serif"
            >
              {step.title}
            </text>
          </g>
        ))}
      </svg>
      <ol className="gov-pipeline-steps">
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <span className="arch-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
