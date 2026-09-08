import { WHITEPAPER_PDF_ES } from "../content.js";
import { HYBRID_PROFILES_PATH, MONTEQUIEU_PATH, WHITEPAPER_PATH } from "../routes";
import { useI18n } from "../i18n/LocaleContext";

export default function WhitepaperEs() {
  const { localize, t } = useI18n();

  return (
    <article className="paper">
      <p className="paper-nav">
        <a href={localize("/#about")}>{t.essays.backHome}</a>
      </p>
      <p className="paper-kicker">Gobernanza de la IA</p>
      <h1>Modelos probabilísticos requieren gobernanza determinista</h1>
      <p className="paper-sub">Por qué la IA empresarial necesita una arquitectura constitucional</p>
      <blockquote className="epigraph">
        «El poder debe ser un freno al poder.»
        <cite>Montesquieu</cite>
      </blockquote>
      <p className="wings">Dédalo nos dio alas. Ícaro nos enseñó los límites.</p>
      <p className="paper-brand">
        Dédalo™ · Gobernanza determinista para IA probabilística · tshapedconsultant ·{" "}
        <a href={localize("/#diagnostic")}>Concertar un diagnóstico</a>
      </p>
      <p className="paper-download">
        <a className="btn btn-solid" href={WHITEPAPER_PDF_ES} download>
          Descargar el PDF en español
        </a>
      </p>

      <section id="s00">
        <h2>
          <span>00</span> Resumen ejecutivo
        </h2>
        <p>
          La Inteligencia Artificial ha introducido un cambio fundamental en el riesgo empresarial.
          El software tradicional ejecuta instrucciones deterministas. Dada la misma entrada, produce
          la misma salida.
        </p>
        <p>Los modelos fundacionales no funcionan así.</p>
        <p>
          Los grandes modelos de lenguaje (LLM), los sistemas de generación aumentada por
          recuperación (RAG) y los agentes autónomos generan resultados mediante inferencia
          probabilística. Sus salidas son estadísticamente probables, no matemáticamente ciertas.
        </p>
        <p>Esta distinción lo cambia todo.</p>
        <p>
          A medida que las organizaciones delegan análisis, recomendaciones, decisiones y acciones a
          los sistemas de IA, el riesgo ya no reside únicamente en la calidad del código. El riesgo
          surge de la propia incertidumbre.
        </p>
        <p>
          El reto no es eliminar la incertidumbre. El reto es controlar dónde se permite que la
          incertidumbre actúe.
        </p>
        <p className="lede-principle">
          Este documento propone una arquitectura de gobernanza práctica basada en un principio
          simple:
        </p>
        <p className="callout">Los sistemas probabilísticos requieren gobernanza determinista.</p>
      </section>

      <section>
        <h2>
          <span>04</span> El principio constitucional
        </h2>
        <p>Hace más de 250 años, Montesquieu propuso una idea simple:</p>
        <p className="callout">«El poder debe ser un freno al poder.»</p>
        <p>
          Las democracias modernas se construyen en torno a este principio. Ninguna institución es
          depositaria de autoridad ilimitada. El poder se separa. El poder se supervisa. El poder se
          limita. El mismo principio se aplica a la IA.
        </p>
        <p>
          Una arquitectura de IA gobernable requiere separación de poderes: política, ejecución y
          un poder judicial de runtime que verifica, audita y detiene — fuera del modelo.
        </p>
      </section>

      <section>
        <h2>
          <span>06</span> La Jaula Determinista™
        </h2>
        <p>La tesis central es simple:</p>
        <p className="callout">
          No podemos hacer deterministas los sistemas probabilísticos. Podemos hacer deterministas
          sus consecuencias.
        </p>
        <p>
          La Jaula Determinista es un perímetro de control determinista que rodea un núcleo
          probabilístico. Su propósito no es mejorar la inteligencia del modelo. Su propósito es
          limitar la autoridad del modelo: Runtime Assurance, controles de veto en línea,
          observabilidad independiente, compuertas de umbral y autoridad humana.
        </p>
        <p>El modelo propone. El sistema evalúa. Los humanos conservan la autoridad.</p>
      </section>

      <section>
        <h2>
          <span>15</span> Conclusión
        </h2>
        <p>
          Dédalo dio alas a la humanidad. Ícaro le enseñó los límites. La Inteligencia Artificial es
          nuestro conjunto moderno de alas. El reto no es impedir el vuelo. El reto es impedir el
          colapso.
        </p>
        <p>
          Porque el futuro de la gobernanza de la IA no trata de confiar en la máquina. Trata de
          garantizar que, cuando la confianza falla, el control permanezca.
        </p>
        <p className="callout">
          Los modelos probabilísticos requieren gobernanza determinista. Y la gobernanza
          determinista comienza con la arquitectura, no con la política.
        </p>
      </section>

      <p className="paper-also article-related">
        El PDF en español es el texto de referencia. El ensayo HTML extendido — incluido el apéndice
        técnico de compliance-as-code — está en inglés:{" "}
        <a href={WHITEPAPER_PATH}>{t.essays.readEnPaper}</a>
        {" · "}
        <a href={localize(MONTEQUIEU_PATH)}>IA agéntica y Montesquieu</a>
        {" · "}
        <a href={localize(HYBRID_PROFILES_PATH)}>Perfiles híbridos</a>.
      </p>
    </article>
  );
}
