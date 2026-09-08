import { mappingExemplars } from "../data/euAiActMapping";

export default function ArticleEvidenceExemplars() {
  const rows = mappingExemplars();

  return (
    <section className="exemplar-section" aria-labelledby="exemplar-title">
      <h2 id="exemplar-title">Article → control → evidence</h2>
      <p>
        Three high-risk exemplars. Each line is the same mapping as the table below — scannable in
        seconds.
      </p>
      <div className="table-wrap exemplar-wrap">
        <table className="exemplar-table">
          <caption>Art. 9 risk management, Art. 12 record-keeping, and Art. 14 human oversight.</caption>
          <thead>
            <tr>
              <th scope="col">Article</th>
              <th scope="col">Control</th>
              <th scope="col">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.article}</th>
                <td data-label="Control">{row.control}</td>
                <td data-label="Evidence">{row.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
