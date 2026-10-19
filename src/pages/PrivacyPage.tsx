import { Link } from "react-router-dom";
import { useI18n } from "../i18n/LocaleContext";
import { RISK_CHECK_PATH } from "../routes";

export default function PrivacyPage() {
  const { locale, home, localizedPath } = useI18n();
  const isEs = locale === "es";

  if (isEs) {
    return (
      <article className="paper privacy-page">
        <p className="paper-nav">
          <Link to={`${home}#top`}>← Volver al inicio</Link>
        </p>
        <p className="paper-kicker">Privacidad, seguridad y retención</p>
        <h1>Política de privacidad y tratamiento de datos</h1>
        <p className="paper-sub">
          Tratamiento mínimo, transparente y orientado exclusivamente a responder solicitudes profesionales y entregar el diagnóstico técnico preliminar.
        </p>

        <section>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>Titular:</strong> Andrés Lage Freire (TShaped Consultant — Ingeniería de Gobernanza de IA)
            <br />
            <strong>Ubicación:</strong> Madrid, España (operación remota en EMEA)
            <br />
            <strong>Contacto de privacidad:</strong> a través del formulario de consulta en{" "}
            <Link to={`${home}#diagnostic`}>tshapedconsultant.com/es/#diagnostic</Link>.
          </p>
        </section>

        <section>
          <h2>2. Estrategia de privacidad del AI Runtime Risk Check</h2>
          <p>
            El flujo de seis preguntas del{" "}
            <Link to={localizedPath(RISK_CHECK_PATH)}>AI Runtime Risk Check</Link> se ejecuta y calcula íntegramente en el navegador del usuario (ejecución local en cliente):
          </p>
          <ul>
            <li>
              Mientras respondes las preguntas 1 a 6, tus selecciones permanecen únicamente en la memoria de la sesión actual para permitir retroceder y calcular el resultado.
            </li>
            <li>
              No se envían respuestas del assessment a servicios externos sin tu consentimiento explícito mediante la casilla correspondiente en el paso de entrega de resultado.
            </li>
            <li>
              No almacenamos prompts, documentos internos, código fuente ni secretos de los sistemas evaluados.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Datos recogidos y base legal</h2>
          <p>
            Únicamente cuando completas y envías voluntariamente el formulario del diagnóstico o el formulario comercial recogemos:
          </p>
          <ul>
            <li>Email profesional y organización (obligatorios para responder en contexto B2B).</li>
            <li>Nombre (opcional en el Risk Check; obligatorio en consulta directa).</li>
            <li>Categoría del sistema evaluado, capacidad general y resumen del hallazgo preliminar.</li>
          </ul>
          <p>
            <strong>Base legal (RGPD art. 6.1.a y 6.1.b):</strong> consentimiento explícito otorgado al marcar la casilla de aceptación y aplicación de medidas precontractuales a petición del interesado. No existe suscripción automática a listas de correo ni boletines comerciales.
          </p>
        </section>

        <section>
          <h2>4. Política de retención y minimización de logs</h2>
          <ul>
            <li>
              <strong>Retención máxima:</strong> los datos de contacto y contexto asociados a una consulta sin continuidad comercial se eliminan en un plazo máximo de <strong>12 meses</strong> desde la última comunicación, o de forma inmediata si solicitas su supresión.
            </li>
            <li>
              <strong>Analítica sin datos personales:</strong> los eventos de conversión registrados en el sitio (por ejemplo, inicio o finalización del check) son estrictamente agregados y técnicos. Nunca incluyen direcciones de correo, nombres de clientes, textos libres ni identificadores personales.
            </li>
            <li>
              <strong>Protección contra abuso:</strong> los formularios incorporan validación estricta, sanitización de cabeceras y payloads, campo honeypot anti-bots y limitación de tasa (rate limiting) en sesión.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Destinatarios y derechos</h2>
          <p>
            Para la recepción técnica del mensaje se utilizan procesadores de formularios transaccionales (Formspree / FormSubmit) bajo cifrado TLS. No vendemos ni cedemos datos a terceros. Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación u oposición en cualquier momento indicando tu dirección de correo profesional.
          </p>
        </section>
      </article>
    );
  }

  return (
    <article className="paper privacy-page">
      <p className="paper-nav">
        <Link to={`${home}#top`}>← Back to home</Link>
      </p>
      <p className="paper-kicker">Privacy, security & data retention</p>
      <h1>Privacy and Data Retention Policy</h1>
      <p className="paper-sub">
        Minimal, transparent data handling used strictly to deliver your preliminary technical assessment and respond to professional enquiries.
      </p>

      <section>
        <h2>1. Data Controller</h2>
        <p>
          <strong>Controller:</strong> Andrés Lage Freire (TShaped Consultant — AI Governance Engineering)
          <br />
          <strong>Location:</strong> Madrid, Spain (operating remotely across EMEA)
          <br />
          <strong>Privacy contact:</strong> via the enquiry form at{" "}
          <Link to={`${home}#diagnostic`}>tshapedconsultant.com/#diagnostic</Link>.
        </p>
      </section>

      <section>
        <h2>2. AI Runtime Risk Check Privacy Strategy</h2>
        <p>
          The six-question flow in the{" "}
          <Link to={localizedPath(RISK_CHECK_PATH)}>AI Runtime Risk Check</Link> is evaluated locally in your browser:
        </p>
        <ul>
          <li>
            While answering questions 1 through 6, your selections stay in local browser state so you can navigate back and forth without losing progress.
          </li>
          <li>
            Assessment answers are never transmitted to external services unless you explicitly check the consent box and submit the result request form.
          </li>
          <li>
            We never collect prompts, internal documents, source code or credentials of the system being evaluated.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Data Collected and Legal Basis</h2>
        <p>
          Only when you voluntarily submit the assessment email gate or the commercial enquiry form do we collect:
        </p>
        <ul>
          <li>Work email and organisation (required for B2B response context).</li>
          <li>Name (optional on the Risk Check; required on direct commercial enquiries).</li>
          <li>System category, high-level capability and preliminary risk finding summary.</li>
        </ul>
        <p>
          <strong>Legal basis (GDPR Art. 6(1)(a) and 6(1)(b)):</strong> explicit consent provided via the dedicated checkbox and pre-contractual steps requested by you. We never auto-subscribe visitors to newsletters or marketing lists.
        </p>
      </section>

      <section>
        <h2>4. Data Retention and Log Minimisation</h2>
        <ul>
          <li>
            <strong>Retention period:</strong> enquiry details that do not lead to an active engagement are purged within <strong>12 months</strong> of the last interaction, or immediately upon request.
          </li>
          <li>
            <strong>Privacy-preserving analytics:</strong> conversion events (such as assessment completion) record only non-identifying categorical metadata. They never include emails, client names, prompts or free-text inputs.
          </li>
          <li>
            <strong>Abuse protection:</strong> forms enforce strict input sanitisation, header-injection stripping, honeypot fields and session rate limiting.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Processors and Your Rights</h2>
        <p>
          Transactional form delivery uses TLS-encrypted form processors (Formspree / FormSubmit). Data is never sold or shared with third-party marketers. You may request access, rectification, erasure or restriction at any time.
        </p>
      </section>
    </article>
  );
}
