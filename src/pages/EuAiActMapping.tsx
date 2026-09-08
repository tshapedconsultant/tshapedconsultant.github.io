import EvidencePackSample from "../components/EvidencePackSample";
import GovernancePipeline from "../components/GovernancePipeline";
import MappingTable from "../components/MappingTable";
import { MAPPING_SOURCE_NOTE } from "../data/euAiActMapping";
import { EU_AI_ACT_MAPPING_PATH } from "../routes";

const PORTO = "https://github.com/tshapedconsultant/porto-seguro-compliance-hub";
const RISK = "https://github.com/tshapedconsultant/enterprise-ai-risk";

export default function EuAiActMapping() {
  return (
    <article className="paper mapping-page">
      <p className="paper-nav">
        <a href="/#approach">← Back to Approach</a>
      </p>
      <p className="paper-kicker">AI Governance Engineering</p>
      <h1>EU AI Act mapping</h1>
      <p className="paper-sub">
        Which articles the offer covers, which executable controls implement them, and how evidence
        is generated — for CTOs, Heads of AI and Risk leaders.
      </p>
      <p className="callout">Probabilistic models require deterministic governance.</p>
      <p>
        High-risk and high-accountability systems do not become governable by restating the
        regulation. They become governable when each duty has a control that can fail a pipeline,
        stop a runtime action, or force a human decision — and when that event leaves a hashed
        pack.
      </p>
      <p className="note">
        {MAPPING_SOURCE_NOTE} Path:{" "}
        <a href={EU_AI_ACT_MAPPING_PATH}>{EU_AI_ACT_MAPPING_PATH}</a>.
      </p>
      <p className="mapping-refs">
        Reference implementations:{" "}
        <a href={PORTO} target="_blank" rel="noopener noreferrer">
          Porto Seguro Compliance Hub
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        {" · "}
        <a href={RISK} target="_blank" rel="noopener noreferrer">
          Enterprise AI Risk
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        {" · "}
        <a href="/#whitepaper">Whitepaper</a>
      </p>

      <GovernancePipeline />
      <MappingTable />
      <EvidencePackSample />
    </article>
  );
}
