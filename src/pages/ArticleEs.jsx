import { ARTICLE } from "../content.es.js";
import { WHITEPAPER_PATH, MONTEQUIEU_PATH } from "../routes";
import { useI18n } from "../i18n/LocaleContext";

export default function ArticleEs() {
  const { localize, t } = useI18n();

  return (
    <article className="paper article-page">
      <p className="paper-nav">
        <a href={localize("/#insights")}>{t.essays.backInsights}</a>
      </p>
      <p className="paper-kicker">{ARTICLE.kicker}</p>
      <h1>{ARTICLE.title}</h1>
      <p className="paper-sub">{ARTICLE.standfirst}</p>
      <p className="article-meta">{ARTICLE.meta}</p>

      <blockquote className="epigraph">
        «Para que no se pueda abusar del poder, es preciso que el poder frene al poder.»
        <cite>Montesquieu</cite>
      </blockquote>

      <section>
        <p>La mayoría de los incidentes críticos de IA ya no ocurren en el modelo. Ocurren en runtime.</p>
        <p>
          Casi todos comparten el mismo fallo de diseño: no hay un poder independiente capaz de
          detener el sistema cuando se desvía de su finalidad.
        </p>
        <p>
          Hace casi trescientos años, Montesquieu enunció una verdad estructural. Concentre todo el
          control en una sola entidad y el abuso deja de ser una anomalía. Es una consecuencia del
          diseño. La IA agéntica se está construyendo sobre esa misma concentración de poder.
        </p>
      </section>

      <section>
        <h2>Despotismo algorítmico</h2>
        <p>
          Demasiadas arquitecturas delegan ahora toda la cadena de responsabilidad al propio modelo.
          Razona. Decide. Ejecuta herramientas. Valida resultados. Incluso evalúa su propio
          comportamiento.
        </p>
        <p>Eso no es arquitectura de sistemas. Es despotismo algorítmico.</p>
      </section>

      <section>
        <h2>Separación de poderes, mapeada a la gobernanza de la IA</h2>
        <p>
          La división clásica de poderes se traslada con claridad a una arquitectura moderna de
          gobernanza para sistemas autónomos:
        </p>
        <div className="powers">
          <div>
            <p className="layer-num">Legislativo</p>
            <h3>Alineación</h3>
            <p>Alineación de base del modelo, valores y reglas fundamentales.</p>
          </div>
          <div>
            <p className="layer-num">Ejecutivo</p>
            <h3>Ejecución</h3>
            <p>APIs, herramientas, políticas de ejecución y guardrails.</p>
          </div>
          <div>
            <p className="layer-num">Judicial</p>
            <h3>Supervisión independiente</h3>
            <p>Observabilidad, auditoría y supervisión en runtime — fuera del modelo.</p>
          </div>
        </div>
        <p>
          La diferencia entre una arquitectura gobernable y una ingobernable reside en esta tercera
          capa.
        </p>
        <p>
          Un sistema genuino de supervisión no confía en la buena conducta del modelo. La verifica.
          No asume el cumplimiento. Lo demuestra.
        </p>
      </section>

      <section>
        <h2>Runtime Checks &amp; Balances</h2>
        <p>
          Esa tercera capa es Runtime Checks &amp; Balances: un mecanismo independiente que aplica el
          principio de separación de poderes a sistemas autónomos. Como cualquier poder judicial,
          opera sobre dos responsabilidades críticas.
        </p>
        <h3>1. Supervisar lo que entra en el sistema</h3>
        <p>
          Prompt injection, context poisoning, jailbreaks, instrucciones ocultas y manipulación del
          corpus RAG. Eso exige una capa independiente de Runtime Assurance fuera del modelo: un
          veto arquitectónico sobre el flujo de datos, controles técnicos independientes y
          trazabilidad en tiempo real.
        </p>
        <h3>2. Supervisar el comportamiento en runtime</h3>
        <p>
          Uso inesperado de herramientas, drift, costes descontrolados, bucles y errores en cascada.
          Un LLM no puede auditarse a sí mismo. Un agente no puede gobernarse a sí mismo. La
          seguridad corporativa no puede depender solo del proveedor de inferencia.
        </p>
        <p className="callout">
          La supervisión humana y la trazabilidad del EU AI Act (art. 14) y de DORA son técnicamente
          inviables sin una capa de control desacoplada del modelo.
        </p>
      </section>

      <section>
        <h2>Quién tiene el poder de detenerlo</h2>
        <p>
          La próxima generación de arquitecturas de IA no se distinguirá solo por modelos más
          grandes, sino por mejores mecanismos para limitar, supervisar y justificar decisiones.
        </p>
        <p>
          La verdadera gobernanza no consiste en confiar en el sistema. Consiste en diseñar
          estructuras capaces de controlarlo.
        </p>
        <p>
          La separación de poderes transformó los Estados modernos. Los sistemas autónomos acabarán
          necesitando exactamente el mismo principio.
        </p>
        <p>
          Cuando un sistema de IA puede razonar, decidir y actuar, la pregunta ya no es qué puede
          hacer. La pregunta es quién tiene el poder de detenerlo.
        </p>
      </section>

      <p className="paper-also article-related">
        Desarrollado con más extensión en el whitepaper:{" "}
        <a href={localize(WHITEPAPER_PATH)}>Modelos probabilísticos requieren gobernanza determinista</a>
        {" · "}
        <a href={MONTEQUIEU_PATH}>{t.essays.readEn}</a>.
      </p>
    </article>
  );
}
