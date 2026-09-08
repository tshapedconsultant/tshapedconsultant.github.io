import { mappingRowsFor } from "../data/mappingI18n";
import { useI18n } from "../i18n/LocaleContext";

export default function ArticleEvidenceExemplars() {
  const { locale, t } = useI18n();
  const rows = mappingRowsFor(locale).filter((row) =>
    ["art-9-risk", "art-12-logs", "art-14-oversight"].includes(row.id)
  );
  const ui = t.exemplars;

  return (
    <section className="exemplar-section" aria-labelledby="exemplar-title">
      <h2 id="exemplar-title">{ui.title}</h2>
      <p>{ui.intro}</p>
      <div className="table-wrap exemplar-wrap">
        <table className="exemplar-table">
          <caption>{ui.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{ui.article}</th>
              <th scope="col">{ui.control}</th>
              <th scope="col">{ui.evidence}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.article}</th>
                <td data-label={ui.control}>{row.control}</td>
                <td data-label={ui.evidence}>{row.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
