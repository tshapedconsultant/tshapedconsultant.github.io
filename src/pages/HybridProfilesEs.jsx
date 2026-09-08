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

      <section>
        <h2>Una explicación de la IA no es necesariamente una explicación</h2>
        <p>Considere un sistema de IA que rechaza una solicitud de préstamo.</p>
        <p>Un agente podría producir: «El solicitante se evaluó como de alto riesgo».</p>
        <p>Eso suena explicativo.</p>
        <p>Pero una pregunta más útil es: ¿por qué el sistema llegó a esa decisión?</p>
        <p>
          Responderla puede exigir entender el modelo, los datos, el objetivo que se optimiza, el
          proceso de decisión y el sistema que lo rodea.
        </p>
        <p>Puede hacer falta preguntar:</p>
        <ul>
          <li>¿Qué estaba optimizando el modelo?</li>
          <li>¿Qué función de pérdida moldeó su comportamiento?</li>
          <li>¿Cómo se entrenó el modelo?</li>
          <li>¿Qué representaciones se aprendieron?</li>
          <li>¿Cómo transforma la arquitectura la entrada?</li>
          <li>¿Dónde entra la incertidumbre en el sistema?</li>
          <li>¿Qué ocurre durante la inferencia?</li>
          <li>¿Qué parte del pipeline produjo realmente la decisión?</li>
        </ul>
        <p>
          De nuevo, el argumento no es que todo profesional de gobernanza deba entrenar un
          transformer desde cero.
        </p>
        <p>
          Es que los fundamentos pueden aportar las herramientas conceptuales para interrogar a la
          IA, en lugar de aceptar sin más su explicación.
        </p>
      </section>

      <section>
        <h2>La paradoja del agente</h2>
        <p>Los agentes de IA también introducen un problema interesante de supervisión.</p>
        <p>Un agente cada vez más capaz puede producir una gran cantidad de trabajo muy rápido.</p>
        <p>Imagine un agente de programación que genera miles de líneas de código de producción.</p>
        <p>Personas distintas pueden evaluar dimensiones distintas:</p>
        <ul>
          <li>Un profesional de negocio puede valorar si resuelve el problema previsto.</li>
          <li>Un ingeniero de software puede examinar la arquitectura y los modos de fallo.</li>
          <li>Un profesional de seguridad puede investigar las superficies de ataque.</li>
          <li>Un profesional de gobernanza puede buscar controles y rendición de cuentas ausentes.</li>
        </ul>
        <p>Cada perspectiva es valiosa.</p>
        <p>Pero alguien también necesita entender cómo interactúan las piezas.</p>
        <p>Ahí es donde los perfiles híbridos pueden resultar útiles.</p>
        <p>El perfil híbrido no necesariamente sabe más que cada especialista.</p>
        <p>Está, en cambio, mejor situado para preguntar si el sistema en conjunto tiene sentido.</p>
      </section>

      <section>
        <h2>Un fallo de supervisión en la práctica</h2>
        <p>
          Un incidente de marzo de 2026 en Meta ilustra el mismo problema de integración y
          supervisión. Un ingeniero pidió a un agente de IA interno que analizara una cuestión
          técnica en un foro de la empresa. El agente publicó su respuesta sin aprobación; la
          orientación era inexacta; un empleado la siguió; y un acceso interno no autorizado a
          datos de la empresa y de usuarios permaneció abierto durante unas dos horas.
        </p>
        <p>
          Meta clasificó el suceso como Sev 1 — su segunda gravedad interna más alta — e indicó que
          no se hizo un uso indebido de datos de usuarios. El agente no alteró los sistemas por sí
          mismo. Lo hizo una persona, actuando sobre la salida del agente.
        </p>
        <p>
          El fallo se situó en la intersección de arquitectura, control de acceso, seguridad,
          gobernanza y rendición de cuentas organizativa: el tipo de recorrido que un perfil híbrido
          está en condiciones de ver.
        </p>
      </section>

      <section>
        <h2>Especialistas, híbridos y el problema de la integración</h2>
        <p>Considere tres perfiles.</p>
        <div className="powers">
          <div>
            <p className="layer-num">Especialista A</p>
            <h3>Técnico</h3>
            <p>Pericia profunda en aprendizaje automático.</p>
          </div>
          <div>
            <p className="layer-num">Especialista B</p>
            <h3>Dominio</h3>
            <p>Pericia profunda de negocio o regulatoria.</p>
          </div>
          <div>
            <p className="layer-num">Híbrido C</p>
            <h3>Sistemas de IA</h3>
            <p>
              Conocimiento de trabajo en aprendizaje automático, arquitectura de software,
              seguridad, negocio y regulación, combinado con profundidad real en una o dos áreas.
            </p>
          </div>
        </div>
        <p>C puede no superar a A en un problema difícil de investigación en ML.</p>
        <p>C puede no superar a B en una cuestión regulatoria muy especializada.</p>
        <p>
          Pero considere: «¿Cómo debería una empresa desplegar un sistema de IA agéntica que sea
          técnicamente robusto, económicamente razonable, seguro y conforme?»
        </p>
        <p>Entonces la capacidad de conectar los distintos dominios se vuelve importante.</p>
        <p>La ventaja no es necesariamente una pericia más profunda en cada componente.</p>
        <p>Es la capacidad de ver las dependencias entre ellos.</p>
      </section>

      <section>
        <h2>La amplitud sin fundamentos crea generalistas frágiles</h2>
        <p>Híbrido no significa superficial.</p>
        <p>
          Quien sabe un poco de diez tecnologías pero no puede evaluar ninguna de forma crítica no
          está necesariamente bien situado en un entorno nativo de IA.
        </p>
        <p>
          Un perfil más sólido podría ser: fundamentos profundos + amplitud significativa +
          apalancamiento de la IA + juicio.
        </p>
        <p>Piénselo como una forma en T:</p>
        <ul>
          <li>la barra vertical es profundidad y primeros principios;</li>
          <li>la barra horizontal son dominios adyacentes;</li>
          <li>la IA aporta apalancamiento sobre ambas.</li>
        </ul>
      </section>

      <section>
        <h2>Los fundamentos como capa de verificación</h2>
        <p>
          La IA puede generar una respuesta. Un agente puede ejecutar un flujo. Alguien sigue
          teniendo que determinar si el resultado es creíble. Los fundamentos ayudan a ofrecer un
          modelo de referencia.
        </p>
        <ul>
          <li>Un estadístico puede cuestionar una inferencia inválida.</li>
          <li>Un ingeniero de software puede reconocer una arquitectura defectuosa.</li>
          <li>Un profesional de seguridad puede identificar una recomendación peligrosa.</li>
          <li>
            Un ingeniero de ML puede cuestionar si el objetivo de optimización del modelo
            corresponde de verdad al objetivo del mundo real.
          </li>
        </ul>
        <p>
          Cuanto más profundo es el entendimiento de base, más fácil puede ser reconocer cuando algo
          suena plausible pero no tiene sentido.
        </p>
      </section>

      <section>
        <h2>Los profesionales híbridos como traductores</h2>
        <p>
          Los sistemas de IA hablan en modelos, probabilidades, código, datos y herramientas. Las
          organizaciones hablan en riesgo, ingresos, clientes, regulación, estrategia, operaciones y
          seguridad. Los perfiles híbridos traducen.
        </p>
        <p>El trabajo se desplaza de:</p>
        <ul>
          <li>¿Qué es técnicamente posible?</li>
          <li>¿Qué significa eso para el negocio?</li>
          <li>¿Cuáles son los riesgos?</li>
          <li>¿Qué restricciones aplican?</li>
          <li>¿Cómo debería diseñarse el sistema?</li>
        </ul>
      </section>

      <section>
        <h2>El problema se desplaza hacia arriba en la pila</h2>
        <p>La habilidad escasa puede pasar de la ejecución a la integración y el juicio.</p>
        <p>La pregunta antigua era: «¿Podemos realizar esta tarea?»</p>
        <p>
          Con agentes: «¿Qué capacidad debería realizarla, cómo deben interactuar las capacidades y
          cómo sabemos que el resultado es fiable?»
        </p>
        <p>Son preguntas de sistemas: fundamentos → contexto → equilibrios → riesgo → juicio.</p>
      </section>

      <section>
        <h2>Los especialistas no desaparecen</h2>
        <p>
          La pericia profunda sigue importando. Los especialistas pueden convertirse en nodos de alto
          valor; los híbridos los conectan; la IA aporta ejecución a escala.
        </p>
      </section>

      <section>
        <h2>Otra pregunta de carrera</h2>
        <p>
          «¿Qué fundamentos debería entender en profundidad, y qué disciplinas adyacentes debería
          aprender lo bastante bien como para conectarlas?»
        </p>
        <ul>
          <li>Un ingeniero de software podría añadir IA, seguridad y negocio.</li>
          <li>Un abogado podría añadir regulación, arquitectura de IA y datos.</li>
          <li>Un científico de datos podría añadir modelización, producto y economía.</li>
          <li>Un ingeniero podría añadir sistemas físicos, software e IA.</li>
        </ul>
      </section>

      <section>
        <h2>La fórmula emergente</h2>
        <div className="formula">
          <p>
            <strong>Fundamentos</strong> → comprensión
          </p>
          <p>
            <strong>Pericia de especialista</strong> → profundidad
          </p>
          <p>
            <strong>Conocimiento entre dominios</strong> → contexto
          </p>
          <p>
            <strong>Agentes de IA</strong> → apalancamiento
          </p>
          <p>
            <strong>Juicio</strong> → dirección
          </p>
        </div>
        <p>
          Los híbridos no superarán siempre a los especialistas. A medida que la IA hace accesibles
          las capacidades especializadas, conectarlas, evaluarlas y dirigirlas puede volverse
          relativamente más valioso.
        </p>
        <p>
          <strong>
            La IA aporta apalancamiento. Los fundamentos ayudan a entender la máquina. Y el
            pensamiento híbrido ayuda a conectar esa comprensión con el mundo real.
          </strong>
        </p>
      </section>

      <p className="note article-sources">
        Incidente de Meta: publicado primero por The Information; confirmado por Meta. Cobertura
        independiente:{" "}
        <a
          href="https://www.theverge.com/ai-artificial-intelligence/897528/meta-rogue-ai-agent-security-incident"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Verge
        </a>
        ,{" "}
        <a
          href="https://techcrunch.com/2026/03/18/meta-is-having-trouble-with-rogue-ai-agents/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TechCrunch
        </a>
        ,{" "}
        <a
          href="https://www.theguardian.com/technology/2026/mar/20/meta-ai-agents-instruction-causes-large-sensitive-data-leak-to-employees"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Guardian
        </a>
        . Meta indicó que no se hizo un uso indebido de datos de usuarios; el agente publicó una
        orientación, no alteró por sí mismo los controles de acceso.
      </p>

      <p className="paper-also article-related">
        Una práctica en T en gobernanza de IA:{" "}
        <a href={localize(WHITEPAPER_PATH)}>Modelos probabilísticos requieren gobernanza determinista</a>
        {" · "}
        <a href={localize("/#diagnostic")}>Consultar un diagnóstico</a>
        {" · "}
        <a href={HYBRID_PROFILES_PATH}>{t.essays.originalEn}</a>.
      </p>
    </article>
  );
}
