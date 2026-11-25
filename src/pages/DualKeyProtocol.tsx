import { DUAL_KEY_REGO, dualKeyCopy, highlightRego } from "../data/dualKeyCopy";
import { useI18n } from "../i18n/LocaleContext";

export default function DualKeyProtocol() {
  const { locale, t, localize } = useI18n();
  const copy = dualKeyCopy(locale);

  return (
    <article className="paper mapping-page dual-key-page">
      <p className="paper-nav">
        <a href={localize("/#approach")}>{t.mapping.back}</a>
      </p>
      <p className="paper-kicker">{copy.kicker}</p>
      <h1>{copy.title}</h1>
      <p className="mapping-lead-short">{copy.intro}</p>
      <p className="callout">{copy.anchor}</p>

      <section aria-labelledby="dual-key-flow-title">
        <h2 id="dual-key-flow-title">{copy.flowTitle}</h2>
        <ol className="dual-key-flow" aria-label={copy.flowLabel}>
          {copy.steps.map((step) => (
            <li key={step.title} className="dual-key-step">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
          <li className="dual-key-step dual-key-keys">
            <h3>{copy.keysLabel}</h3>
            <div className="dual-key-pair">
              <div>
                <p className="dual-key-key-title">{copy.keyTechnical.title}</p>
                <p>{copy.keyTechnical.text}</p>
              </div>
              <div>
                <p className="dual-key-key-title">{copy.keyBusiness.title}</p>
                <p>{copy.keyBusiness.text}</p>
              </div>
            </div>
          </li>
          <li className="dual-key-step">
            <h3>{locale === "es" ? "Servicio de autorización independiente (PDP)" : "Independent Authorization Service (PDP)"}</h3>
            <p>
              {locale === "es"
                ? "Comprueba que ambas llaves están ligadas al hash de la carga de la acción, a la versión del modelo y a la versión de la política; que la firma es válida, que no han caducado y que están protegidas contra la repetición."
                : "Verifies both keys are bound to the action-payload hash, the model version and the policy version; signature-valid, unexpired and replay-protected."}
            </p>
          </li>
          <li className="dual-key-step">
            <h3>PEP</h3>
            <p>
              {locale === "es"
                ? "Calcula el hash de la carga canónica real y vuelve a comprobar el plazo inmediatamente antes del envío."
                : "Hashes the actual canonical payload and re-checks the execution deadline immediately before dispatch."}
            </p>
          </li>
          <li className="dual-key-step dual-key-exec">
            <h3>{locale === "es" ? "Ejecución" : "Execution"}</h3>
            <p>
              {locale === "es"
                ? "Fallo cerrado: sin dos llaves válidas, no se ejecuta nada."
                : "Fail-closed: without two valid keys, nothing executes."}
            </p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="dual-key-table-title">
        <h2 id="dual-key-table-title">{copy.notParallelTitle}</h2>
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
      </section>

      <section aria-labelledby="dual-key-trust-title">
        <h2 id="dual-key-trust-title">{copy.trustTitle}</h2>
        <ol className="dual-key-trust">
          {copy.trust.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="dual-key-refs-title">
        <h2 id="dual-key-refs-title">{copy.refTitle}</h2>
        <div className="dual-key-refs">
          {copy.refs.map((card) => (
            <article key={card.domain} className="dual-key-ref">
              <p className="dual-key-ref-label">{copy.refLabel}</p>
              <h3>{card.domain}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="dual-key-policy-title">
        <h2 id="dual-key-policy-title">{copy.policyTitle}</h2>
        <figure className="dual-key-policy">
          <figcaption>{copy.policyLabel}</figcaption>
          <pre>
            <code dangerouslySetInnerHTML={{ __html: highlightRego(DUAL_KEY_REGO) }} />
          </pre>
        </figure>
      </section>

      <p className="mapping-cta">
        {copy.ctaBefore} <a href={localize("/#diagnostic")}>{copy.ctaLink}</a>
        {copy.ctaAfter}
      </p>
    </article>
  );
}
