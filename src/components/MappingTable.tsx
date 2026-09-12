import { Fragment, useMemo, useState } from "react";
import {
  type ControlKind,
  type MappingRow,
  type MappingStatus,
  type SystemRole,
} from "../data/euAiActMapping";
import { mappingCopy, mappingRowsFor } from "../data/mappingI18n";
import { useI18n } from "../i18n/LocaleContext";

type SortKey = "article" | "systemType" | "control" | "evidence" | "status";
type SortDir = "asc" | "desc";

const CONTROL_OPTIONS: ControlKind[] = [
  "compliance-as-code",
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

function compareRows(a: MappingRow, b: MappingRow, key: SortKey, dir: SortDir, locale: string): number {
  const left = key === "control" ? a.control : a[key];
  const right = key === "control" ? b.control : b[key];
  const result = String(left).localeCompare(String(right), locale === "es" ? "es" : "en-GB");
  return dir === "asc" ? result : -result;
}

function StatusGlyph({ status }: { status: MappingStatus }) {
  const common = {
    className: "status-glyph",
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    focusable: false as const,
  };
  if (status === "Implemented") {
    return (
      <svg {...common}>
        <path d="M3 8.5 6.5 12 13 4" />
      </svg>
    );
  }
  if (status === "Reference") {
    return (
      <svg {...common}>
        <rect x="2.75" y="2.75" width="10.5" height="10.5" rx="1.2" />
        <path d="M2.75 6.5h10.5M6.5 2.75v10.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="5.4" />
      <path d="M8 5v3.4l2.4 1.4" />
    </svg>
  );
}

function StatusPill({ status }: { status: MappingStatus }) {
  return (
    <span className={`status-pill status-${status.toLowerCase()}`}>
      <StatusGlyph status={status} />
      {status}
    </span>
  );
}

export default function MappingTable() {
  const { locale, t } = useI18n();
  const copy = mappingCopy(locale);
  const ui = t.mappingTable;
  const rowsSource = mappingRowsFor(locale);
  const columns: { key: SortKey; label: string }[] = [
    { key: "article", label: ui.colArticle },
    { key: "systemType", label: ui.colRole },
    { key: "control", label: ui.colControl },
    { key: "evidence", label: ui.colEvidence },
    { key: "status", label: ui.colStatus },
  ];
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
    for (const row of rowsSource) {
      if (!unique.has(row.articleKey)) unique.set(row.articleKey, row.article);
    }
    return [...unique.entries()];
  }, [rowsSource]);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = rowsSource.filter((row) => {
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
    return [...filtered].sort((a, b) => compareRows(a, b, sortKey, sortDir, locale));
  }, [article, control, locale, query, role, rowsSource, sortDir, sortKey, status]);

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

  const filtersActive = Boolean(query || article || role || control || status);

  function resetFilters() {
    setQuery("");
    setArticle("");
    setRole("");
    setControl("");
    setStatus("");
  }

  return (
    <section className="mapping-table-section" aria-labelledby="mapping-table-title">
      <h2 id="mapping-table-title">
        <span className="mapping-title-wide">{ui.title}</span>
        <span className="mapping-title-narrow">{ui.titleNarrow}</span>
      </h2>
      <p>{ui.intro}</p>

      <form className="mapping-filters" onSubmit={(event) => event.preventDefault()}>
        <details className="mobile-disclose mapping-filters-more">
          <summary>{ui.filters}</summary>
          <fieldset>
          <legend className="visually-hidden">{ui.filterLegend}</legend>
          <div className="mapping-filter-grid">
            <p>
              <label htmlFor="map-search">{ui.search}</label>
              <input
                id="map-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={ui.searchPh}
                autoComplete="off"
              />
            </p>
            <p>
              <label htmlFor="map-article">{ui.article}</label>
              <select id="map-article" value={article} onChange={(event) => setArticle(event.target.value)}>
                <option value="">{ui.allArticles}</option>
                {articles.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="map-role">{ui.systemType}</label>
              <select id="map-role" value={role} onChange={(event) => setRole(event.target.value)}>
                <option value="">{ui.allRoles}</option>
                {ROLE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {ui.roles[option]}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="map-control">{ui.control}</label>
              <select id="map-control" value={control} onChange={(event) => setControl(event.target.value)}>
                <option value="">{ui.allControls}</option>
                {CONTROL_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="map-status">{ui.status}</label>
              <select id="map-status" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="">{ui.allStatuses}</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </p>
          </div>
          <p className="mapping-filter-actions">
            <button
              className="btn btn-ghost mapping-filter-reset"
              type="button"
              onClick={resetFilters}
              disabled={!filtersActive}
            >
              {ui.reset}
            </button>
          </p>
        </fieldset>
          <p className="mapping-help">{copy.filterHelp}</p>
        </details>
      </form>
      <div className="status-legend">
        <p className="mapping-status-note">{copy.statusLegend}</p>
        <ul className="status-legend-list" aria-label={ui.statusKey}>
          {STATUS_OPTIONS.map((option) => (
            <li key={option}>
              <StatusPill status={option} />
            </li>
          ))}
        </ul>
      </div>

      <p className="mapping-count" role="status" aria-live="polite" aria-atomic="true">
        {ui.count(rows.length)}
      </p>

      <div className="table-wrap mapping-table-wrap">
        <table className="mapping-table">
          <caption>{ui.caption}</caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="visually-hidden">{ui.expand}</span>
              </th>
              {columns.map((column) => {
                const active = sortKey === column.key;
                return (
                  <th key={column.key} scope="col" aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                    <button type="button" onClick={() => toggleSort(column.key)}>
                      {column.label}
                      <span aria-hidden="true">{active ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕"}</span>
                      <span className="visually-hidden">
                        {active ? (sortDir === "asc" ? ui.sortedAsc : ui.sortedDesc) : ui.sort}
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
                      <td className="mapping-expand" data-label={ui.expand}>
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => toggleExpand(row.id)}
                        >
                          {open ? ui.hide : ui.show}
                        </button>
                      </td>
                      <td data-label={ui.colArticle}>{row.article}</td>
                      <td data-label={ui.colRole}>{row.systemType}</td>
                      <td data-label={ui.colControl}>
                        <span className="control-kind">{row.controlKind}</span>
                        {row.control}
                      </td>
                      <td data-label={ui.colEvidence}>{row.evidence}</td>
                      <td data-label={ui.colStatus}>
                        <StatusPill status={row.status} />
                      </td>
                    </tr>
                    {open ? (
                      <tr className="mapping-detail-row">
                        <td colSpan={6}>
                          <div className="mapping-detail" id={panelId}>
                            <p>
                              <strong>{ui.requirement}</strong> {row.requirement}
                            </p>
                            <p>
                              <strong>{ui.sketch}</strong>
                            </p>
                            <pre className="rego">{row.controlExample}</pre>
                            <p>
                              <strong>{ui.evidenceEx}</strong>
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
                <td colSpan={6}>{ui.empty}</td>
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
                <header className="mapping-card-head">
                  <p className="mapping-card-article">{row.article.replace(" – ", " · ")}</p>
                  <StatusPill status={row.status} />
                </header>
                <p className="mapping-card-role">{row.systemType}</p>
                <p className="mapping-card-meta">
                  <span className="mapping-card-label">{ui.control}</span>
                  <span className="control-kind">{row.controlKind}</span>
                  {row.control}
                </p>
                <p className="mapping-card-meta">
                  <span className="mapping-card-label">{ui.colEvidence.split(" ")[0]}</span>
                  {row.evidence}
                </p>
                <details className="mapping-card-sketch">
                  <summary>{ui.viewSketch}</summary>
                  <div className="mapping-detail" id={panelId}>
                    <p>
                      <strong>{ui.requirement}</strong> {row.requirement}
                    </p>
                    <p>
                      <strong>{ui.sketch}</strong>
                    </p>
                    <pre className="rego">{row.controlExample}</pre>
                    <p>
                      <strong>{ui.evidenceEx}</strong>
                    </p>
                    <pre className="rego">{JSON.stringify(row.evidenceExample, null, 2)}</pre>
                  </div>
                </details>
              </li>
            );
          })
        ) : (
          <li className="mapping-card mapping-card-empty">{ui.empty}</li>
        )}
      </ul>
    </section>
  );
}
