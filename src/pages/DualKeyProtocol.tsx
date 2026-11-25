import { useState } from "react";
import { Link } from "react-router-dom";
import { DUAL_KEY_REGO, dualKeyCopy, highlightRego } from "../data/dualKeyCopy";
import { useI18n } from "../i18n/LocaleContext";
import { trackEvent } from "../lib/analytics";

function snapshotTo(locale: string) {
  return {
    pathname: locale === "es" ? "/es" : "/",
    search: "?source=dual-key",
    hash: "#diagnostic",
  };
}

async function copyPolicyText(source: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(source);
      return true;
    }
  } catch {
    // Fall through to the selection fallback.
  }
  try {
    const area = document.createElement("textarea");
    area.value = source;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export default function DualKeyProtocol() {
  const { locale } = useI18n();
  const copy = dualKeyCopy(locale);
  const intake = snapshotTo(locale);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  function trackCta(placement: "hero" | "middle" | "footer") {
    trackEvent("dual_key_cta_click", { source: "dual-key", placement, intent: "snapshot" });
  }

  async function onCopyPolicy() {
    const ok = await copyPolicyText(DUAL_KEY_REGO);
    setCopyState(ok ? "copied" : "failed");
  }

  return (
    <article className="paper mapping-page dual-key-page">
      <header className="dual-key-hero">
        <p className="paper-kicker">{copy.kicker}</p>
        <h1>{copy.title}</h1>
        <p className="mapping-lead-short">{copy.subhead}</p>
        <div className="dual-key-actions">
          <Link className="btn btn-solid" to={intake} onClick={() => trackCta("hero")}>
            {copy.primaryCta}
          </Link>
          <a className="btn btn-ghost" href="#dual-key-architecture">
            {copy.secondaryCta}
          </a>
        </div>
        <p className="dual-key-micro">{copy.microcopy}</p>
        <p className="dual-key-price">{copy.priceLine}</p>
      </header>

      <section aria-labelledby="dual-key-fit-title">
        <h2 id="dual-key-fit-title">{copy.fitTitle}</h2>
        <p>{copy.fitLead}</p>
        <ul className="dual-key-fit">
          {copy.fit.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="dual-key-offer-title">
        <h2 id="dual-key-offer-title">{copy.offerTitle}</h2>
        <h3>{copy.offerName}</h3>
        <p>{copy.offerBoundary}</p>
        <ul>
          {copy.offerItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{copy.offerNext}</p>
        <p className="dual-key-actions">
          <Link className="btn btn-solid" to={intake} onClick={() => trackCta("middle")}>
            {copy.middleCta}
          </Link>
        </p>
      </section>

      <section aria-labelledby="dual-key-evidence-title">
        <h2 id="dual-key-evidence-title">{copy.evidenceTitle}</h2>
        <p>{copy.evidenceLead}</p>
        <div className="dual-key-refs">
          {copy.evidenceItems.map((item) => (
            <article key={item.title} className="dual-key-ref">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="dual-key-architecture" aria-labelledby="dual-key-arch-title">
        <h2 id="dual-key-arch-title">{copy.archTitle}</h2>
        <ol className="dual-key-simple" aria-label={copy.archLabel}>
          {copy.archSteps.map((step, index) => (
            <li key={step.title}>
              <p className="dual-key-step-num" aria-hidden="true">
                {index + 1}
              </p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <h3>{copy.archDetailTitle}</h3>
        <dl className="dual-key-detail">
          {copy.archDetail.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
        <p>{copy.archNote}</p>
      </section>

      <section aria-labelledby="dual-key-refs-title">
        <h2 id="dual-key-refs-title">{copy.refTitle}</h2>
        <div className="dual-key-refs">
          {copy.refs.map((card) => (
            <article key={card.domain} className="dual-key-ref">
              <p className="dual-key-ref-badge">{copy.refBadge}</p>
              <h3>{card.domain}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
        <p>{copy.refNote}</p>
      </section>

      <section aria-labelledby="dual-key-tech-title">
        <h2 id="dual-key-tech-title">{copy.techTitle}</h2>
        <p>{copy.techLead}</p>

        <details className="dual-key-details">
          <summary>
            <h3>{copy.tableSummary}</h3>
          </summary>
          <div className="dual-key-details-body">
            <div className="dual-key-table-wrap">
              <table className="dual-key-table">
                <caption>{copy.tableCaption}</caption>
                <thead>
                  <tr>
                    <th scope="col">{copy.colRuntime}</th>
                    <th scope="col">{copy.colDualKey}</th>
                    <th scope="col">{copy.colWhy}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.rows.map((row) => (
                    <tr key={row.runtime}>
                      <th scope="row" data-label={copy.colRuntime}>
                        {row.runtime}
                      </th>
                      <td data-label={copy.colDualKey}>{row.specialization}</td>
                      <td data-label={copy.colWhy}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>

        <details className="dual-key-details">
          <summary>
            <h3>{copy.trustSummary}</h3>
          </summary>
          <div className="dual-key-details-body">
            <ol className="dual-key-trust">
              {copy.trust.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </details>

        <details className="dual-key-details">
          <summary>
            <h3>{copy.policySummary}</h3>
          </summary>
          <div className="dual-key-details-body">
            <figure className="dual-key-policy">
              <figcaption>{copy.policyLabel}</figcaption>
              <p>
                <button type="button" className="btn btn-ghost" onClick={onCopyPolicy}>
                  {copy.copyPolicy}
                </button>
              </p>
              <p role="status">
                {copyState === "copied" ? copy.copiedPolicy : copyState === "failed" ? copy.copyFailed : ""}
              </p>
              <pre>
                <code dangerouslySetInnerHTML={{ __html: highlightRego(DUAL_KEY_REGO) }} />
              </pre>
            </figure>
            <p>{copy.policyExternal}</p>
          </div>
        </details>
      </section>

      <section aria-labelledby="dual-key-faq-title">
        <h2 id="dual-key-faq-title">{copy.faqTitle}</h2>
        <div className="dual-key-faq">
          {copy.faq.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
        <p>{copy.finalLead}</p>
        <p className="dual-key-actions">
          <Link className="btn btn-solid" to={intake} onClick={() => trackCta("footer")}>
            {copy.finalCta}
          </Link>
        </p>
      </section>
    </article>
  );
}
