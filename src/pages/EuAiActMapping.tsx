import ArticleEvidenceExemplars from "../components/ArticleEvidenceExemplars";
import EvidencePackSample from "../components/EvidencePackSample";
import GovernancePipeline from "../components/GovernancePipeline";
import MappingTable from "../components/MappingTable";
import {
  MAPPING_ART12_RETENTION,
  MAPPING_DATES_NOTE,
  MAPPING_INTRO,
  MAPPING_ISO_NOTE,
  MAPPING_LEAD_SHORT,
  MAPPING_OUT_OF_SCOPE,
  MAPPING_PHASED_DATES_NOTE,
  MAPPING_ROLE_BULLETS,
  MAPPING_ROLE_FOOTNOTE,
  MAPPING_SOURCE_NOTE,
  MAPPING_SUBSET_NOTE,
  MAPPING_SUBTITLE,
} from "../data/euAiActMapping";
import { EU_AI_ACT_MAPPING_PATH, WHITEPAPER_PATH } from "../routes";

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
      <p className="paper-sub">{MAPPING_SUBTITLE}</p>
      <p className="callout">Probabilistic models require deterministic governance.</p>
      <p className="mapping-lead-short">{MAPPING_LEAD_SHORT}</p>
      <details className="mobile-disclose mapping-legal-more">
        <summary>Role, risk and schedule</summary>
        <p>{MAPPING_INTRO}</p>
        <p className="mapping-iso">{MAPPING_SUBSET_NOTE}</p>
        <ul className="act-role-list">
          {MAPPING_ROLE_BULLETS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mapping-footnote">{MAPPING_ROLE_FOOTNOTE}</p>
        <p className="mapping-iso">{MAPPING_DATES_NOTE}</p>
        <p className="mapping-iso">{MAPPING_PHASED_DATES_NOTE}</p>
        <p className="mapping-art12">{MAPPING_ART12_RETENTION}</p>
        <p className="mapping-iso">{MAPPING_ISO_NOTE}</p>
      </details>
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
        <a href={WHITEPAPER_PATH}>Whitepaper</a>
      </p>

      <GovernancePipeline />
      <ArticleEvidenceExemplars />
      <MappingTable />
      <EvidencePackSample />

      <p className="mapping-scope">{MAPPING_OUT_OF_SCOPE}</p>
      <p className="mapping-cta">
        If you want this mapping applied to your AI inventory, start with an{" "}
        <a href="/#diagnostic">AI Governance Diagnostic</a>.
      </p>
    </article>
  );
}
