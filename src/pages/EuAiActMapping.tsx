import ArticleEvidenceExemplars from "../components/ArticleEvidenceExemplars";
import EvidencePackSample from "../components/EvidencePackSample";
import GovernancePipeline from "../components/GovernancePipeline";
import MappingTable from "../components/MappingTable";
import { mappingCopy } from "../data/mappingI18n";
import { useI18n } from "../i18n/LocaleContext";
import { EU_AI_ACT_MAPPING_PATH, WHITEPAPER_PATH } from "../routes";

const PORTO = "https://github.com/tshapedconsultant/porto-seguro-compliance-hub";
const RISK = "https://github.com/tshapedconsultant/enterprise-ai-risk";

export default function EuAiActMapping() {
  const { locale, t, localize, localizedPath } = useI18n();
  const copy = mappingCopy(locale);

  return (
    <article className="paper mapping-page">
      <p className="paper-nav">
        <a href={localize("/#approach")}>{t.mapping.back}</a>
      </p>
      <p className="paper-kicker">{t.mapping.kicker}</p>
      <h1>{t.mapping.title}</h1>
      <p className="paper-sub">{copy.subtitle}</p>
      <p className="callout">{t.mapping.callout}</p>
      <p className="mapping-lead-short">{copy.leadShort}</p>
      <details className="mobile-disclose mapping-legal-more">
        <summary>{t.mapping.roleSummary}</summary>
        <p>{copy.intro}</p>
        <p className="mapping-iso">{copy.subset}</p>
        <ul className="act-role-list">
          {copy.roleBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mapping-footnote">{copy.roleFootnote}</p>
        <p className="mapping-iso">{copy.dates}</p>
        <p className="mapping-iso">{copy.phasedDates}</p>
        <p className="mapping-art12">{copy.art12}</p>
        <p className="mapping-iso">{copy.iso}</p>
      </details>
      <p className="note">
        {copy.source} {t.mapping.path}{" "}
        <a href={localizedPath(EU_AI_ACT_MAPPING_PATH)}>{localizedPath(EU_AI_ACT_MAPPING_PATH)}</a>.
      </p>
      <p className="mapping-refs">
        {t.mapping.refs}{" "}
        <a href={PORTO} target="_blank" rel="noopener noreferrer">
          Porto Seguro Compliance Hub
          <span className="visually-hidden">{t.opensNewTab}</span>
        </a>
        {" · "}
        <a href={RISK} target="_blank" rel="noopener noreferrer">
          Enterprise AI Risk
          <span className="visually-hidden">{t.opensNewTab}</span>
        </a>
        {" · "}
        <a href={localizedPath(WHITEPAPER_PATH)}>{t.mapping.whitepaper}</a>
      </p>

      <GovernancePipeline />
      <ArticleEvidenceExemplars />
      <MappingTable />
      <EvidencePackSample />

      <p className="mapping-scope">{copy.outOfScope}</p>
      <p className="mapping-implemented">{t.mapping.implementedNote}</p>
      <p className="mapping-cta">
        {t.mapping.ctaBefore}{" "}
        <a href={localize("/#diagnostic")}>{t.mapping.ctaLink}</a>
        {t.mapping.ctaAfter}
      </p>
    </article>
  );
}
