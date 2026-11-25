import { Link } from "react-router-dom";
import { WORKING_WITH_AI, WORKFLOW_ARTICLE_SLUG } from "../data/workingWithAi";
import { useI18n } from "../i18n/LocaleContext";
import { trackEvent } from "../lib/analytics";
import { DUAL_KEY_PATH } from "../routes";

const STUDY = WORKING_WITH_AI.url;
const POLICY =
  "https://github.com/tshapedconsultant/tshapedconsultant.github.io/blob/main/policies/dualkey_illustrative.rego";
const POLICY_TESTS =
  "https://github.com/tshapedconsultant/tshapedconsultant.github.io/blob/main/policies/dualkey_illustrative_test.rego";
const RISK = "https://github.com/tshapedconsultant/enterprise-ai-risk";
const PORTO = "https://github.com/tshapedconsultant/porto-seguro-compliance-hub";

export default function DedaloHub() {
  const { locale, localizedPath, content } = useI18n();
  const es = locale === "es";
  const snapshot = content.SERVICE_LADDER.items.find((item) => item.id === "snapshot");
  const article = localizedPath(`/insights/${WORKFLOW_ARTICLE_SLUG}`);
  const homeCase = `${localizedPath("/")}#hr-copilot-case`;

  function go(target: "study" | "snapshot" | "dual-key" | "article") {
    trackEvent("workflow_bridge_click", { bridge_placement: "dedalo", bridge_target: target });
  }

  return (
    <article className="paper dedalo-hub">
      <p className="paper-nav">
        <a href={localizedPath("/")}>{es ? "← Inicio" : "← Home"}</a>
      </p>
      <p className="paper-kicker">{es ? "Marco" : "Framework"}</p>
      <h1>{es ? "Dédalo™" : "Dédalo™"}</h1>
      <p className="paper-sub">
        {es
          ? "Rediseña el flujo de trabajo. Haz explícita la autoridad de decisión. Haz cumplir el límite en ejecución."
          : "Redesign the workflow. Make decision authority explicit. Enforce the boundary at runtime."}
      </p>

      <p className="workflow-kicker">{es ? "Hallazgo del estudio" : "Research finding"}</p>
      <p>
        {es
          ? "El estudio Working with AI, de Anthropic, describe entrevistas con empresas clientes. Los usos de mayor valor declarado solían ir con un cambio de roles o de proceso. No es una muestra aleatoria ni una medida causal del retorno."
          : "Anthropic’s Working with AI study reports interviews with its enterprise customers. Higher reported value tended to come with a change in roles or process. The sample is not random, and the finding is not a causal measure of return."}
      </p>
      <p>
        <a href={STUDY} onClick={() => go("study")}>
          {es ? "Leer el estudio original" : "Read the original research"}
        </a>
        {" · "}
        <Link to={article} onClick={() => go("article")}>
          {es ? "Leer el ensayo" : "Read the essay"}
        </Link>
      </p>

      <h2>{es ? "Tres nombres, un sistema" : "Three names, one system"}</h2>
      <p>
        {es
          ? "No son marcos que compitan entre sí."
          : "These are not competing frameworks."}
      </p>
      <ul>
        <li>
          <strong>Dédalo™</strong>
          {es
            ? " — arquitectura de gobernanza: principios, límites y controles."
            : " — governance architecture: principles, boundaries and controls."}
        </li>
        <li>
          <strong>DGOM™</strong>
          {es
            ? " — modelo operativo: PLAN → BUILD → DEPLOY → MONITOR."
            : " — operating model: PLAN → BUILD → DEPLOY → MONITOR."}
        </li>
        <li>
          <Link to={localizedPath(DUAL_KEY_PATH)} onClick={() => go("dual-key")}>
            Dual-Key
          </Link>
          {es
            ? " — patrón de autoridad de ejecución para acciones de alto impacto."
            : " — execution-authority pattern for consequential actions."}
        </li>
      </ul>

      <h2>{es ? "Del trabajo a la revisión" : "From work to review"}</h2>
      <p>
        {es
          ? "Este diagrama es de gobernanza. No es una figura del estudio."
          : "This diagram is a governance reading. It is not a figure from the study."}
      </p>
      <ol className="dedalo-flow">
        {(es
          ? ["Flujo de trabajo", "Autoridad de decisión", "Controles en ejecución", "Evidencia", "Revisión"]
          : ["Workflow", "Decision rights", "Runtime controls", "Evidence", "Review"]
        ).map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2>{es ? "Traducción práctica" : "Practical translation"}</h2>
      <p>
        {es
          ? "Los controles de la tercera columna son una interpretación profesional. No son recomendaciones de Anthropic."
          : "The controls in the third column are a professional interpretation. They are not Anthropic recommendations."}
      </p>
      <div className="dedalo-table-wrap">
        <table className="dedalo-table">
          <thead>
            <tr>
              <th>{es ? "Cambio organizativo" : "Organizational change"}</th>
              <th>{es ? "Pregunta de gobernanza" : "Governance question"}</th>
              <th>{es ? "Control propuesto" : "Proposed control"}</th>
            </tr>
          </thead>
          <tbody>
            {(es
              ? [
                  ["Roles más amplios", "¿Quién puede decidir y qué se puede delegar?", "Mapa de autoridad y permisos acotados."],
                  ["Más producción", "¿La capacidad de revisión absorbe el volumen?", "Revisión proporcional al riesgo y escalado."],
                  ["Nuevas aplicaciones internas", "¿Quién mantiene el sistema y sus políticas?", "Propiedad, inventario y revisión del ciclo de vida."],
                  ["Decisiones entre funciones", "¿Quién autoriza esta acción concreta?", "Autorización independiente; Dual-Key cuando esté justificado."],
                ]
              : [
                  ["Broader roles", "Who may decide, and what may be delegated?", "Authority map and scoped permissions."],
                  ["Increased output", "Can review capacity absorb the volume?", "Risk-proportionate review and escalation."],
                  ["New internal applications", "Who maintains the system and its policies?", "Ownership, inventory and lifecycle review."],
                  ["Cross-functional decisions", "Who authorizes this specific action?", "Independent authorization; Dual-Key where justified."],
                ]
            ).map(([change, question, control]) => (
              <tr key={change}>
                <td data-label={es ? "Cambio" : "Change"}>{change}</td>
                <td data-label={es ? "Pregunta" : "Question"}>{question}</td>
                <td data-label={es ? "Control" : "Control"}>{control}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{es ? "Principio" : "Principle"}</h2>
      <p>
        {es
          ? "Reduce los traspasos innecesarios. Conserva una autorización independiente cuando las consecuencias lo justifiquen."
          : "Minimize unnecessary handoffs. Preserve independent authorization where consequences justify it."}
      </p>
      <ul>
        <li>
          {es
            ? "No toda acción pide dos aprobaciones humanas."
            : "Not every action requires two human approvals."}
        </li>
        <li>
          {es
            ? "Una política fiable decide cuándo aplica Dual-Key."
            : "A reliable policy decides when Dual-Key applies."}
        </li>
        <li>
          {es
            ? "Las acciones de menor impacto pueden ejecutarse dentro de límites ya autorizados."
            : "Lower-consequence actions can run inside limits that are already authorized."}
        </li>
        <li>
          {es
            ? "El agente no se asigna autoridad a sí mismo."
            : "The agent does not grant authority to itself."}
        </li>
        <li>
          {es
            ? "Autorizar una acción no garantiza que se pueda revertir."
            : "Authorizing an action does not make it reversible."}
        </li>
        <li>
          {es
            ? "La revisión humana necesita capacidad y contexto, no solo una casilla."
            : "Human review needs capacity and context, not only a checkbox."}
        </li>
      </ul>

      <h2>{es ? "Evidencia" : "Evidence"}</h2>
      <ul>
        <li>
          <a href={homeCase}>{es ? "HR Copilot" : "HR Copilot"}</a>
          {es
            ? " — demostración documentada con datos sintéticos. No demuestra Dual-Key de extremo a extremo."
            : " — documented demonstration on synthetic data. It does not show Dual-Key end to end."}
        </li>
        <li>
          <a href={POLICY}>{es ? "Política ilustrativa" : "Illustrative policy"}</a>
          {" · "}
          <a href={POLICY_TESTS}>{es ? "matriz de pruebas" : "test matrix"}</a>
          {es
            ? " — la comprobación PDP con OPA 1.22.4. No ejecuta el verificador, el coordinador ni el PEP."
            : " — the PDP check exercised with OPA 1.22.4. It does not run the verifier, the coordinator or the PEP."}
        </li>
        <li>
          <a href={RISK}>Enterprise AI Risk</a>
          {es
            ? " — demo. Cadena hash que evidencia manipulación, no almacenamiento inmutable. El HMAC cubre el webhook de Jira. No acredita conformidad con DORA."
            : " — demo. A tamper-evident hash chain, not immutable storage. HMAC covers the Jira webhook. It does not establish DORA conformity."}
        </li>
        <li>
          <a href={PORTO}>Porto Seguro Compliance Hub</a>
          {es
            ? " — arquitectura de referencia para modelos predictivos explicables, vigilancia de deriva, evaluación de equidad y evidencia de gobernanza. No aísla un RAG ni neutraliza prompt injection."
            : " — reference architecture for explainable predictive models, drift monitoring, fairness assessment and governance evidence. It does not isolate a RAG corpus or neutralise prompt injection."}
        </li>
      </ul>

      <h2>{es ? "Siguiente paso" : "Next step"}</h2>
      {snapshot ? (
        <>
          <p>
            <strong>{snapshot.name}</strong>
            {" · "}
            {snapshot.price}
            {es ? ". Una semana, una organización y un sistema. Es un diagnóstico, no un rediseño organizativo." : ". One week, one organisation and one system. It is a diagnosis, not an organisational redesign."}
          </p>
          <p>
            <Link
              className="btn btn-solid"
              to={{ pathname: localizedPath("/"), hash: "diagnostic" }}
              onClick={() => go("snapshot")}
            >
              {snapshot.cta}
            </Link>
          </p>
        </>
      ) : null}
      <p className="workflow-source">
        {es ? "Fuente: Anthropic, Working with AI, 23 de noviembre de 2026." : "Source: Anthropic, Working with AI, 23 November 2026."}
      </p>
    </article>
  );
}
