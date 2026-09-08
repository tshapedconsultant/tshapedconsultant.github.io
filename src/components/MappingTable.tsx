import { Fragment, useMemo, useState } from "react";
import {
  EU_AI_ACT_MAPPING_ROWS,
  MAPPING_FILTER_HELP,
  MAPPING_STATUS_NOTE,
  type ControlKind,
  type MappingRow,
  type MappingStatus,
  type SystemRole,
} from "../data/euAiActMapping";

type SortKey = "article" | "systemType" | "control" | "evidence" | "status";
type SortDir = "asc" | "desc";

const CONTROL_OPTIONS: ControlKind[] = [
  "policy-as-code",
  "SDLC gate",
  "runtime kill switch",
  "human approval",
  "drift gate",
  "explainability",
  "data governance",
  "audit ledger",
];

const STATUS_OPTIONS: MappingStatus[] = ["Implemented", "Reference", "Planned"];
const ROLE_OPTIONS: SystemRole[] = ["provider", "deployer", "high-risk"];

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "article", label: "Article / obligation" },
  { key: "systemType", label: "System type / role" },
  { key: "control", label: "Executable control" },
  { key: "evidence", label: "Evidence generated" },
  { key: "status", label: "Status" },
];

function compareRows(a: MappingRow, b: MappingRow, key: SortKey, dir: SortDir): number {
  const left = key === "control" ? a.control : a[key];
  const right = key === "control" ? b.control : b[key];
  const result = String(left).localeCompare(String(right), "en-GB");
  return dir === "asc" ? result : -result;
}

export default function MappingTable() {
  const [query, setQuery] = useState("");
  const [article, setArticle] = useState("");
  const [role, setRole] = useState("");
  const [control, setControl] = useState("");
  const [status, setStatus] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("article");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expanded, setExpanded] = useState<string | null>(null);

  const articles = useMemo(() => {
    const unique = new Map<string, string>();
    for (const row of EU_AI_ACT_MAPPING_ROWS) {
      if (!unique.has(row.articleKey)) unique.set(row.articleKey, row.article);
    }
    return [...unique.entries()];
  }, []);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = EU_AI_ACT_MAPPING_ROWS.filter((row) => {
      if (article && row.articleKey !== article) return false;
      if (role && !row.roles.includes(role as SystemRole)) return false;
      if (control && row.controlKind !== control) return false;
      if (status && row.status !== status) return false;
      if (!needle) return true;
      const haystack = [
        row.article,
        row.systemType,
        row.control,
        row.controlKind,
        row.evidence,
        row.status,
        row.requirement,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
    return [...filtered].sort((a, b) => compareRows(a, b, sortKey, sortDir));
  }, [article, control, query, role, sortDir, sortKey, status]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir("asc");
  }

  function toggleExpand(id: string) {
    setExpanded((current) => (current === id ? null : id));
  }

  return (
    <section className="mapping-table-section" aria-labelledby="mapping-table-title">
      <h2 id="mapping-table-title">Full mapping table</h2>
      <p>
        Eleven obligations that show up in due diligence for high-risk and high-accountability
        systems. Filter for a conversation; expand a row for the control sketch and a minimal pack.
      </p>

      <form className="mapping-filters" onSubmit={(event) => event.preventDefault()}>
        <fieldset>
          <legend className="visually-hidden">Filter the EU AI Act mapping</legend>
          <div className="mapping-filter-grid">
            <p>
              <label htmlFor="map-search">Search</label>
              <input
                id="map-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Article, control, evidence…"
                autoComplete="off"
              />
            </p>
            <p>
              <label htmlFor="map-article">Article</label>
              <select id="map-article" value={article} onChange={(event) => setArticle(event.target.value)}>
                <option value="">All articles</option>
                {articles.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="map-role">System type</label>
              <select id="map-role" value={role} onChange={(event) => setRole(event.target.value)}>
                <option value="">All roles</option>
                {ROLE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="map-control">Control</label>
              <select id="map-control" value={control} onChange={(event) => setControl(event.target.value)}>
                <option value="">All controls</option>
                {CONTROL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="map-status">Status</label>
              <select id="map-status" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="">All statuses</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </fieldset>
      </form>
      <p className="mapping-help">{MAPPING_FILTER_HELP}</p>

      <p className="mapping-count" role="status">
        Showing {rows.length} of {EU_AI_ACT_MAPPING_ROWS.length} obligations
      </p>

      <div className="table-wrap mapping-table-wrap">
        <table className="mapping-table">
          <caption>
            Mapping of selected EU AI Act articles to executable controls and the evidence they
            generate.
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">Expand</span>
              </th>
              {COLUMNS.map((column) => {
                const active = sortKey === column.key;
                return (
                  <th key={column.key} scope="col" aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                    <button type="button" onClick={() => toggleSort(column.key)}>
                      {column.label}
                      <span aria-hidden="true">{active ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕"}</span>
                      <span className="visually-hidden">
                        {active ? `, sorted ${sortDir === "asc" ? "ascending" : "descending"}` : ", sort"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => {
                const open = expanded === row.id;
                const panelId = `${row.id}-detail`;
                return (
                  <Fragment key={row.id}>
                    <tr className={open ? "is-expanded" : undefined}>
                      <td className="mapping-expand" data-label="Details">
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => toggleExpand(row.id)}
                        >
                          {open ? "Hide details" : "Show details"}
                        </button>
                      </td>
                      <td data-label="Article / obligation">{row.article}</td>
                      <td data-label="System type / role">{row.systemType}</td>
                      <td data-label="Executable control">
                        <span className="control-kind">{row.controlKind}</span>
                        {row.control}
                      </td>
                      <td data-label="Evidence generated">{row.evidence}</td>
                      <td data-label="Status">
                        <span className={`status-pill status-${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                    </tr>
                    {open ? (
                      <tr className="mapping-detail-row">
                        <td colSpan={6}>
                          <div className="mapping-detail" id={panelId}>
                            <p>
                              <strong>Requirement.</strong> {row.requirement}
                            </p>
                            <p>
                              <strong>Control sketch.</strong>
                            </p>
                            <pre className="rego">{row.controlExample}</pre>
                            <p>
                              <strong>Evidence example.</strong>
                            </p>
                            <pre className="rego">{JSON.stringify(row.evidenceExample, null, 2)}</pre>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>No obligations match these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ul className="mapping-cards">
        {rows.length ? (
          rows.map((row) => {
            const panelId = `${row.id}-card-detail`;
            return (
              <li key={row.id} className="mapping-card">
                <p className="mapping-card-article">{row.article}</p>
                <p className="mapping-card-meta">
                  <span className="mapping-card-label">Role</span>
                  {row.systemType}
                </p>
                <p className="mapping-card-meta">
                  <span className="mapping-card-label">Status</span>
                  <span className={`status-pill status-${row.status.toLowerCase()}`}>{row.status}</span>
                </p>
                <p className="mapping-card-meta">
                  <span className="mapping-card-label">Control</span>
                  <span className="control-kind">{row.controlKind}</span>
                  {row.control}
                </p>
                <p className="mapping-card-meta">
                  <span className="mapping-card-label">Evidence</span>
                  {row.evidence}
                </p>
                <details className="mapping-card-sketch">
                  <summary>Control sketch</summary>
                  <div className="mapping-detail" id={panelId}>
                    <p>
                      <strong>Requirement.</strong> {row.requirement}
                    </p>
                    <p>
                      <strong>Control sketch.</strong>
                    </p>
                    <pre className="rego">{row.controlExample}</pre>
                    <p>
                      <strong>Evidence example.</strong>
                    </p>
                    <pre className="rego">{JSON.stringify(row.evidenceExample, null, 2)}</pre>
                  </div>
                </details>
              </li>
            );
          })
        ) : (
          <li className="mapping-card mapping-card-empty">No obligations match these filters.</li>
        )}
      </ul>
      <p className="mapping-status-note">{MAPPING_STATUS_NOTE}</p>
    </section>
  );
}
