import { Link } from "react-router-dom";
import AiRuntimeRiskCheck from "../components/AiRuntimeRiskCheck";
import { useI18n } from "../i18n/LocaleContext";
import { EU_AI_ACT_MAPPING_PATH, PRIVACY_PATH } from "../routes";

export default function AiRuntimeRiskCheckPage() {
  const { locale, home, localizedPath } = useI18n();
  const isEs = locale === "es";

  return (
    <article className="paper risk-check-page">
      <p className="paper-nav">
        <Link to={`${home}#top`}>
          {isEs ? "← Volver al inicio" : "← Back to home"}
        </Link>
      </p>

      <AiRuntimeRiskCheck embedded={false} />

      <section className="risk-page-method" aria-labelledby="risk-method-heading">
        <h2 id="risk-method-heading">
          {isEs
            ? "Cómo evalúa este diagnóstico preliminar"
            : "How this preliminary diagnostic evaluates risk"}
        </h2>
        <p>
          {isEs
            ? "El motor de scoring analiza tres dimensiones independientes que determinan el riesgo real en ejecución de un sistema RAG, copiloto o agente:"
            : "The scoring engine evaluates three independent dimensions that govern the real runtime posture of a RAG system, copilot or agent:"}
        </p>
        <ul>
          <li>
            <strong>{isEs ? "A. Exposición:" : "A. Exposure:"}</strong>{" "}
            {isEs
              ? "sensibilidad de los datos consultados, alcance documental y conexión a sistemas internos."
              : "sensitivity of accessed data, document scope and internal system connectivity."}
          </li>
          <li>
            <strong>{isEs ? "B. Autonomía:" : "B. Autonomy:"}</strong>{" "}
            {isEs
              ? "capacidad de invocar herramientas, modificar registros o lanzar acciones sin una compuerta humana o determinista."
              : "ability to invoke tools, modify records or execute actions without a human or deterministic gate."}
          </li>
          <li>
            <strong>{isEs ? "C. Control y evidencia:" : "C. Control & evidence:"}</strong>{" "}
            {isEs
              ? "existencia de allowlists, validación de parámetros, definición explícita de fallo seguro (fail-safe) y trazabilidad verificable."
              : "presence of allowlists, parameter validation, explicit fail-safe behaviour and verifiable decision logs."}
          </li>
        </ul>
        <p className="note">
          {isEs
            ? "Nota: Este resultado es una orientación técnica preliminar. No constituye asesoramiento jurídico, auditoría formal ni certificación de cumplimiento."
            : "Note: This result is a preliminary technical orientation. It does not constitute legal advice, a formal audit or compliance certification."}
        </p>
        <p className="paper-also">
          <Link to={localizedPath(PRIVACY_PATH)}>
            {isEs ? "Política de privacidad y retención" : "Privacy & data retention policy"}
          </Link>
          {" · "}
          <Link to={localizedPath(EU_AI_ACT_MAPPING_PATH)}>
            {isEs ? "Mapeo del EU AI Act" : "EU AI Act mapping"}
          </Link>
        </p>
      </section>
    </article>
  );
}
