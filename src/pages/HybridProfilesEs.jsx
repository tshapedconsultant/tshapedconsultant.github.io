import { HYBRID_ARTICLE } from "../content.es.js";
import Picture from "../components/Picture.jsx";
import { WHITEPAPER_PATH, HYBRID_PROFILES_PATH } from "../routes";
import { useI18n } from "../i18n/LocaleContext";

export default function HybridProfilesEs() {
  const { localize, t } = useI18n();

  return (
    <article className="paper article-page">
      <p className="paper-nav">
        <a href={localize("/#insights")}>{t.essays.backInsights}</a>
      </p>
      <p className="paper-kicker">{HYBRID_ARTICLE.kicker}</p>
      <h1>{HYBRID_ARTICLE.title}</h1>
      <p className="paper-sub">{HYBRID_ARTICLE.standfirst}</p>
      <p className="article-meta">{HYBRID_ARTICLE.meta}</p>

      <figure className="article-figure">
        <Picture
          src={HYBRID_ARTICLE.figure}
          avif={HYBRID_ARTICLE.figureAvif}
          webp={HYBRID_ARTICLE.figureWebp}
          alt={HYBRID_ARTICLE.figureAlt}
          width="1024"
          height="682"
          lazy={false}
        />
        <figcaption>{HYBRID_ARTICLE.figureCaption}</figcaption>
      </figure>

      <section>
        <p>Durante décadas, la especialización fue uno de los caminos más claros hacia el valor profesional.</p>
        <p>Volverse muy bueno en una sola cosa.</p>
        <p>
          Un ingeniero de software sólido podía diferenciarse por profundidad técnica. Un abogado,
          por pericia jurídica. Un científico de datos, por modelización y estadística.
        </p>
        <p>Eso sigue importando.</p>
        <p>Pero los agentes de IA pueden estar desplazando dónde reside parte de la ventaja.</p>
        <p>
          A medida que la IA mejora en programar, analizar, investigar, probar y ejecutar flujos, la
          capacidad de realizar una tarea estrechamente definida puede dejar de ser, en algunos
          ámbitos, el diferenciador principal.
        </p>
        <p>Eso no vuelve obsoletos a los especialistas.</p>
        <p>
          Puede, simplemente, aumentar el valor relativo de quienes conectan capacidades de
          especialista, entienden los sistemas de base y ejercen juicio entre dominios.
        </p>
        <p>Ahí es donde los perfiles híbridos pueden tener ventaja.</p>
      </section>

      <section>
        <h2>La IA abarata la aplicación. Los fundamentos pueden volverse más valiosos.</h2>
        <p>
          Uno de los efectos interesantes de la IA es que facilita aplicar conocimiento ya existente.
        </p>
        <p>Un ingeniero puede pedir a una IA que genere una red neuronal.</p>
        <p>
          Pero cuando el modelo se comporta de forma inesperada, generar otra respuesta puede no
          bastar.
        </p>
        <p>Entender los fundamentos ayuda:</p>
        <ul>
          <li>funciones de pérdida;</li>
          <li>gradientes;</li>
          <li>optimización;</li>
          <li>backpropagation;</li>
          <li>atención y arquitectura transformer;</li>
          <li>embeddings e inferencia;</li>
          <li>probabilidad y estadística.</li>
        </ul>
        <p>El punto no es que todo el mundo deba convertirse en investigador de ML.</p>
        <p>
          Es que saber por qué funciona un sistema facilita cuestionar lo que ese sistema está
          haciendo — sobre todo cuando la IA interviene en decisiones, flujos automatizados o
          entornos regulados.
        </p>
        <p className="callout">
          No se puede interrogar con fiabilidad un sistema que no se entiende lo bastante como para
          ponerlo a prueba.
        </p>
      </section>

      <p className="paper-also article-related">
        El ensayo completo — paradoja del agente, el incidente de Meta, la forma en T y la fórmula
        emergente — está en inglés:{" "}
        <a href={HYBRID_PROFILES_PATH}>{t.essays.readEn}</a>
        {" · "}
        <a href={localize(WHITEPAPER_PATH)}>Whitepaper en español</a>
        {" · "}
        <a href={localize("/#diagnostic")}>Consultar un diagnóstico</a>.
      </p>
    </article>
  );
}
