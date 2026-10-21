import WhitepaperDownloadGate from "../components/WhitepaperDownloadGate.jsx";
import { HYBRID_PROFILES_PATH, MONTEQUIEU_PATH, WHITEPAPER_PATH } from "../routes";
import { useI18n } from "../i18n/LocaleContext";

export default function WhitepaperEs() {
  const { localize, t } = useI18n();

  return (
    <article className="paper">
      <p className="paper-nav">
        <a href={localize("/#about")}>{t.essays.backHome}</a>
      </p>
      <p className="paper-kicker">Gobernanza de IA</p>
      <h1>Los modelos probabilísticos requieren gobernanza determinista</h1>
      <p className="paper-sub">
        Por qué la IA empresarial y agéntica necesita una arquitectura constitucional
      </p>
      <blockquote className="epigraph">
        «El poder debe frenar al poder».
        <cite>Montesquieu</cite>
      </blockquote>
      <p className="wings">Dédalo nos dio alas. Ícaro nos enseñó los límites.</p>
      <p className="paper-brand">
        Dédalo™ · Gobernanza determinista para IA probabilística · tshapedconsultant ·{" "}
        <a href={localize("/#diagnostic")}>Consultar un diagnóstico</a>
      </p>
      <WhitepaperDownloadGate source="whitepaper_es" />
      <p className="paper-brief-lead">{t.paper.briefLead}</p>

      <nav className="paper-toc" aria-label="Índice del whitepaper">
        <h2>Índice</h2>
        <ol>
          <li><a href="#s00">00 Resumen ejecutivo</a></li>
          <li><a href="#s01">01 El nuevo panorama de riesgos de la IA</a></li>
          <li><a href="#s02">02 La ecuación del riesgo de la IA agéntica</a></li>
          <li><a href="#s03">03 La envolvente determinista</a></li>
          <li><a href="#s04">04 La autonomía amplía el radio de impacto</a></li>
          <li><a href="#s05">05 La superficie de riesgo agéntico</a></li>
          <li><a href="#s06">06 Por qué la probabilidad cambia el significado de la corrección</a></li>
          <li><a href="#s07">07 El problema del riesgo asimétrico</a></li>
          <li><a href="#s08">08 El principio constitucional</a></li>
          <li><a href="#s09">09 Controles y contrapesos en tiempo de ejecución</a></li>
          <li><a href="#s10">10 La jaula determinista</a></li>
          <li><a href="#s11">11 Plano arquitectónico</a></li>
          <li><a href="#s12">12 Fronteras de confianza y autorización en tiempo de ejecución</a></li>
          <li><a href="#s13">13 La gobernanza como arquitectura en tiempo de ejecución</a></li>
          <li><a href="#s14">14 Riesgo residual, no riesgo cero</a></li>
          <li><a href="#s15">15 Gobernar los límites a lo largo del tiempo</a></li>
          <li><a href="#s16">16 Rendición de cuentas en la delegación</a></li>
          <li><a href="#s17">17 Gobernanza + red teaming: el bucle de aprendizaje</a></li>
          <li><a href="#s18">18 El círculo virtuoso de la gobernanza</a></li>
          <li><a href="#s19">19 Capa de traducción regulatoria</a></li>
          <li><a href="#s20">20 La gobernanza no es un centro de costes</a></li>
          <li><a href="#s21">21 El coste de no gobernar</a></li>
          <li><a href="#s22">22 Casos prácticos</a></li>
          <li><a href="#s23">23 Matriz de decisión ejecutiva</a></li>
          <li><a href="#s24">24 Conclusión</a></li>
          <li><a href="#s25">25 Anexo técnico: políticas como código</a></li>
          <li><a href="#s26">26 Bibliografía y referencias técnicas</a></li>
        </ol>
      </nav>

      <section id="s00">
        <h2><span>00</span> Resumen ejecutivo</h2>
        <p>
          La inteligencia artificial ha introducido un cambio fundamental en el riesgo empresarial.
          El software determinista puede producir la misma salida para una misma entrada, con el
          mismo estado de ejecución y la misma configuración. El software empresarial tradicional
          aspira a esta propiedad, aunque la concurrencia, el estado distribuido y las dependencias
          externas introducen variabilidad en la práctica.
        </p>
        <p>Los modelos fundacionales no funcionan así.</p>
        <p>
          Los grandes modelos de lenguaje (LLM), los sistemas de generación aumentada por
          recuperación (RAG) y los agentes autónomos generan salidas mediante inferencia
          probabilística. Sus salidas son estadísticamente probables, no matemáticamente ciertas.
        </p>
        <p>Esta distinción lo cambia todo.</p>
        <p>
          A medida que las organizaciones delegan análisis, recomendaciones, decisiones y acciones
          en sistemas de IA, el riesgo deja de residir únicamente en la calidad del código. El
          riesgo surge de la propia incertidumbre.
        </p>
        <p>
          El reto no consiste en eliminar la incertidumbre. Consiste en controlar dónde se permite
          que actúe.
        </p>
        <p className="lede-principle">
          Este documento propone una arquitectura práctica de gobernanza basada en un principio
          sencillo:
        </p>
        <p className="callout">Los sistemas probabilísticos requieren gobernanza determinista.</p>
      </section>

      <section id="s01">
        <h2><span>01</span> El nuevo panorama de riesgos de la IA</h2>
        <p>
          La mayoría de las organizaciones sigue considerando el riesgo de la IA como un problema
          del modelo. No lo es.
        </p>
        <p>
          Los fallos empresariales más significativos se producen cada vez más fuera del propio
          modelo. Surgen en la interacción entre modelos, datos, herramientas, infraestructura y
          procesos de negocio. Comprender esta distinción es fundamental.
        </p>
        <h3>LLM empresariales: el primer reto de gobernanza</h3>
        <p>
          El problema de gobernanza comienza mucho antes de que aparezcan los agentes autónomos.
          Incluso cuando un modelo solo genera texto, las organizaciones ya están depositando
          confianza cognitiva en un sistema probabilístico. Ejemplos: copilotos empresariales,
          asistentes de dirección, asistentes de atención al cliente, sistemas internos de
          conocimiento e implementaciones RAG.
        </p>
        <p>
          En estos entornos, puede que la IA no ejecute ni una sola llamada a una API. Sin embargo,
          las salidas incorrectas pueden influir en informes regulatorios, análisis financieros,
          decisiones estratégicas, comunicaciones con clientes y procedimientos operativos.
        </p>
        <p>
          La ausencia de capacidad de actuación autónoma no elimina el riesgo. Simplemente cambia su
          ubicación.
        </p>
        <p>
          Los LLM empresariales requieren una validación determinista de sus salidas. La IA agéntica
          requiere un control determinista de sus acciones. Ambos necesitan gobernanza.
        </p>
        <h3>Sistemas agénticos: cuando los modelos adquieren poder</h3>
        <p>
          El perfil de riesgo cambia radicalmente en el momento en que la IA adquiere la capacidad
          de actuar. Los agentes actuales pueden llamar a API, modificar bases de datos, ejecutar
          flujos de trabajo, activar cambios en la infraestructura e interactuar con sistemas
          externos.
        </p>
        <p>
          En ese momento, la incertidumbre se vuelve operativa. Una decisión probabilística puede
          desencadenar una acción operativa concreta que afecte a los ingresos, el cumplimiento
          normativo, la infraestructura crítica, la confianza de los clientes y la resiliencia
          operativa.
        </p>
        <p>
          El problema no es que el modelo sea malicioso. El problema es que el modelo no dispone,
          por sí solo, de una representación fiable y autorizada del impacto empresarial, de las
          competencias organizativas y del nivel de riesgo aceptable.
        </p>
      </section>

      <section id="s02">
        <h2><span>02</span> La ecuación del riesgo de la IA agéntica</h2>
        <p>
          A menudo hablamos del riesgo de la IA como si fuera una propiedad inevitable del modelo.
          Ese planteamiento es incompleto. Los grandes modelos de lenguaje son probabilísticos por
          diseño. Pueden alucinar, interpretar mal las instrucciones, seleccionar la herramienta
          equivocada o producir salidas diferentes ante una misma entrada.
        </p>
        <p>
          No podemos eliminar de forma realista esa naturaleza probabilística. Pero el sistema que
          rodea al modelo no tiene por qué comportarse de la misma manera. La gobernanza define los
          límites. El sistema los hace cumplir.
        </p>
        <h3>El riesgo tiene dos palancas</h3>
        <p className="callout">Riesgo ≈ Probabilidad × Impacto</p>
        <p className="note">
          Es una heurística de ingeniería simplificada. La evaluación real del riesgo también puede
          incorporar la exposición, la incertidumbre, la detectabilidad, la duración y las
          poblaciones afectadas.
        </p>
        <p>
          Reducir la probabilidad mediante validación, enrutamiento determinista, permisos acotados,
          pruebas y monitorización. Reducir el impacto mediante límites a las transacciones,
          aislamiento, controles de aprobación, mecanismos de reversión, tiempos máximos de
          ejecución y mecanismos de parada.
        </p>
        <p>
          Son problemas diferentes. La validación puede reducir la probabilidad de una acción
          insegura. Un límite de transacción garantiza que, aunque la acción llegue a producirse,
          sus consecuencias permanezcan contenidas. El objetivo no es hacer que el modelo sea
          infalible. Es impedir que un error del modelo se convierta en una acción descontrolada,
          irreversible o desproporcionada.
        </p>
        <p>Puede que no evitemos todos los errores. Podemos limitar su radio de impacto.</p>
      </section>

      <section id="s03">
        <h2><span>03</span> La envolvente determinista</h2>
        <p>Esto conduce a un principio arquitectónico central:</p>
        <p className="callout">El modelo es probabilístico. El sistema no tiene por qué serlo.</p>
        <p>
          Un LLM puede razonar, generar contenido y proponer acciones dentro de un entorno
          controlado. La capa de control que lo rodea no necesita prescribir cada paso. Puede
          permitir una planificación flexible y, al mismo tiempo, imponer límites no negociables
          sobre la autoridad, el acceso a los datos, el importe de las transacciones, el tiempo de
          ejecución y la reversibilidad. Son salvaguardas dinámicas: controles en tiempo de
          ejecución que se adaptan al contexto sin permitir que el agente redefina sus propios
          límites.
        </p>
        <h3>Ejemplo: un agente empresarial que genera SQL</h3>
        <ol className="flow">
          <li>El LLM propone una consulta</li>
          <li>Capa de políticas y validación</li>
          <li>Analizar el árbol de sintaxis abstracta (AST) del SQL</li>
          <li>Comprobar tablas, permisos y parámetros</li>
          <li>Bloquear operaciones destructivas</li>
          <li>Aplicar límites de filas y resultados</li>
          <li>Riesgo bajo → ejecutar. Riesgo alto → aprobación humana → ejecutar o bloquear</li>
          <li>La base de datos ejecuta únicamente una consulta autorizada</li>
        </ol>
        <p>
          El modelo conserva la flexibilidad para formular propuestas dentro del contexto de la
          tarea. No tiene libertad para ejecutar instrucciones arbitrarias. El mismo patrón se
          aplica a las transacciones financieras, el acceso a datos sensibles, el despliegue de
          código, las compras y los cambios en las cuentas de los clientes.
        </p>
      </section>

      <section id="s04">
        <h2><span>04</span> La autonomía amplía el radio de impacto</h2>
        <p>Una progresión arquitectónica útil es:</p>
        <p className="callout">Código → Flujo de trabajo → Agente → Sistema multiagente</p>
        <p>
          En el nivel del código, las interfaces deterministas definen qué se puede ejecutar. Un
          flujo de trabajo controla la secuencia de acciones e introduce validación, aprobaciones y
          puntos de control. Un agente añade planificación dinámica y selección de herramientas,
          dentro de límites impuestos en tiempo de ejecución. Un sistema multiagente incorpora
          delegación y coordinación y, con ellas, la posibilidad de fallos en cascada.
        </p>
        <p className="principle">
          <strong>Principio n.º 1. No escalada de autoridad:</strong> la delegación puede transferir
          capacidad, pero nunca aumentar la autoridad.
        </p>
        <p>
          Si el agente A delega en el agente B, el agente B debe recibir únicamente los permisos
          mínimos necesarios para esa tarea, no toda la autoridad del agente A. Por ejemplo, si un
          agente de atención al cliente delega una solicitud de reembolso, el agente que lo tramita
          debe recibir únicamente los detalles de la transacción pertinente y un límite
          preaprobado. No debe heredar la instrucción de «mantener al usuario satisfecho a toda
          costa».
        </p>
        <p>A medida que aumenta la autonomía, la contención debe aumentar con ella.</p>
      </section>

      <section id="s05">
        <h2><span>05</span> La superficie de riesgo agéntico</h2>
        <p>
          Un modelo tradicional de aprendizaje automático puede generar una predicción. Un agente
          puede razonar, seleccionar una herramienta, recuperar información, interpretar el
          resultado, actuar, observar y continuar.
        </p>
        <p>
          Por tanto, la superficie de riesgo no es solo el modelo. Es el modelo más todo aquello que
          le confiere autoridad: herramientas, datos, permisos, memoria, orquestación, entorno e
          interacción humana.
        </p>
        <p>
          Esto genera riesgos adicionales a nivel de sistema: inyección indirecta de instrucciones,
          desviación de objetivos, bucles de ejecución descontrolados, escalada de privilegios,
          fallos parciales de los flujos de trabajo y errores en cascada entre agentes.
        </p>
        <p>
          No son meras cuestiones de cumplimiento normativo. Son cuestiones de diseño de sistemas:
          ¿Dónde están los límites de decisión? ¿Qué acciones requieren aprobación? ¿Qué limita la
          autoridad? ¿Qué detiene la ejecución? ¿Qué ocurre cuando una herramienta falla a mitad de
          un flujo de trabajo?
        </p>
      </section>

      <section id="s06">
        <h2><span>06</span> Por qué la probabilidad cambia el significado de la corrección</h2>
        <p>
          La probabilidad no es un defecto. Es una propiedad inherente a la inferencia
          probabilística. La cuestión es cómo desplegar de forma segura sistemas cuyas salidas son
          estadísticamente probables, en lugar de matemáticamente ciertas.
        </p>
        <p>
          Un modelo fundacional calcula una distribución de probabilidad sobre las posibles salidas.
          Según la estrategia de decodificación, el sistema puede muestrear esa distribución o
          seleccionar la salida de mayor probabilidad. El propio entrenamiento es estocástico. Este
          mecanismo impulsa la generación de texto, las recomendaciones, las decisiones de los
          agentes, la selección de herramientas y la planificación de acciones.
        </p>
        <p>
          La pregunta, por tanto, es: ¿cómo desplegamos de forma segura sistemas que son
          inherentemente inciertos? La respuesta no consiste en mejores instrucciones. La respuesta
          es la gobernanza.
        </p>
      </section>

      <section id="s07">
        <h2><span>07</span> El problema del riesgo asimétrico</h2>
        <p>
          Uno de los mayores errores al evaluar sistemas de IA es confundir exactitud con seguridad.
        </p>
        <p>
          Un agente puede tomar decisiones correctas el 99 % de las veces y seguir representando un
          riesgo empresarial inaceptable. Imaginemos un agente financiero que procesa correctamente
          99 de cada 100 transacciones. Desde una perspectiva estadística, el sistema parece
          extraordinario. Desde la perspectiva del cliente afectado por la única transacción
          errónea, el sistema ha fallado por completo.
        </p>
        <p>
          Si esa transacción es la suya, ¿cuánto confiaría en su banco? La respuesta suele ser
          inmediata: nada. La confianza en una empresa se construye despacio, pero puede destruirse
          en segundos.
        </p>
        <p>
          Por eso, los sistemas críticos no se diseñan únicamente para maximizar la probabilidad de
          éxito. Se diseñan para limitar las consecuencias de los errores inevitables. La gobernanza
          determinista existe precisamente para gestionar ese 1 % residual.
        </p>
        <p>
          Porque el problema no es el 99 % de las decisiones correctas. El problema es el 1 % que
          puede provocar pérdidas financieras, interrupciones operativas, daño reputacional,
          incumplimientos normativos, litigios y sanciones: según la infracción, el artículo 99 del
          Reglamento de IA de la UE prevé multas administrativas de hasta 35 millones de euros o el
          7 % del volumen de negocios anual mundial para las prácticas prohibidas, con máximos
          inferiores para otras categorías de infracción.
        </p>
        <p>La pregunta estratégica no es: «¿Qué exactitud tiene mi modelo?».</p>
        <p className="callout">
          La pregunta estratégica es: «¿Qué ocurre cuando, inevitablemente, se equivoca?».
        </p>
        <p>
          En ese 1 % reside el verdadero riesgo empresarial. Y es precisamente ahí donde la
          gobernanza determinista crea valor.
        </p>
        <p className="note">Reglamento (UE) 2024/1689, artículo 99.</p>
      </section>

      <section id="s08">
        <h2><span>08</span> El principio constitucional</h2>
        <p>
          Hace más de 250 años, Montesquieu propuso una idea sencilla: «El poder debe frenar al
          poder».
        </p>
        <p>
          Las democracias modernas se construyen sobre este principio. Ninguna institución dispone
          de autoridad ilimitada. El poder se separa, se supervisa y se limita. El mismo principio
          se aplica a la IA.
        </p>
        <p>
          Sin embargo, muchas arquitecturas actuales concentran la autoridad en un único sistema: el
          modelo razona, decide, ejecuta, valida y explica.
        </p>
        <p>Esto no es gobernanza. Es absolutismo algorítmico.</p>
        <p>Una arquitectura de IA gobernable requiere separación de poderes.</p>
      </section>

      <section id="s09">
        <h2><span>09</span> Controles y contrapesos en tiempo de ejecución</h2>
        <p>La separación de poderes se traslada con sorprendente naturalidad a la IA empresarial.</p>
        <div className="powers">
          <div>
            <h3>Capa legislativa</h3>
            <p>
              Define políticas, valores, apetito de riesgo, uso aceptable y requisitos normativos.
            </p>
            <p>
              Fuentes: Reglamento de IA de la UE, DORA, NIST AI RMF e ISO/IEC 42001. Esta capa
              formula la hipótesis.
            </p>
          </div>
          <div>
            <h3>Capa ejecutiva</h3>
            <p>
              Ejecuta instrucciones, flujos de trabajo, agentes, API y procesos de negocio. Esta
              capa actúa.
            </p>
          </div>
          <div>
            <h3>Capa judicial</h3>
            <p>
              Verifica, audita y detiene. Esta capa no confía en el modelo: lo valida. Aquí reside
              Runtime Assurance (aseguramiento en tiempo de ejecución). Y es aquí donde la mayoría
              de las arquitecturas empresariales sigue mostrando una inmadurez peligrosa.
            </p>
          </div>
        </div>
        <p className="note">
          «Capa judicial» es una analogía constitucional para referirse al plano de control
          independiente en tiempo de ejecución. No es una categoría reconocida en las taxonomías
          estándar de arquitectura de IA, sino un principio deliberado de diseño basado en la
          separación de poderes.
        </p>
        <figure className="powers-figure">
          <figcaption>
            IA agéntica y Montesquieu: separación de poderes para sistemas autónomos
          </figcaption>
          <div className="powers-grid">
            <div>
              <p className="layer-num">Capa 1 · Poder legislativo</p>
              <h4>Políticas deterministas y mandato</h4>
              <p>
                Políticas corporativas, apetito de riesgo y mandato regulatorio (Reglamento de IA,
                DORA, ISO/IEC 42001).
              </p>
            </div>
            <div>
              <p className="layer-num">Capa 2 · Poder ejecutivo</p>
              <h4>Ejecución controlada</h4>
              <p>API, salvaguardas, políticas, límites de uso y validaciones operativas.</p>
            </div>
            <div>
              <p className="layer-num">Capa 3 · Poder judicial</p>
              <h4>Control independiente en ejecución</h4>
              <p>Verifica, audita y detiene. Observa sin depender del modelo.</p>
            </div>
          </div>
          <p>
            La observabilidad independiente en tiempo de ejecución es un sistema paralelo e
            independiente que atraviesa todas las capas: desviación, anomalías, costes, alineación y
            auditoría. Sin separación de poderes en IA agéntica, el abuso no es una excepción. Es
            una consecuencia estructural.
          </p>
        </figure>
      </section>

      <section id="s10">
        <h2><span>10</span> La jaula determinista</h2>
        <p>La tesis central de este documento es sencilla:</p>
        <p className="callout">
          No podemos convertir los sistemas probabilísticos en deterministas. Podemos restringir su
          autoridad y acotar sus consecuencias.
        </p>
        <p>
          Esto requiere lo que denomino la jaula determinista: un perímetro de control determinista
          que rodea un núcleo probabilístico. Su propósito no es mejorar la inteligencia del modelo.
          Su propósito es limitar su autoridad.
        </p>
        <p>La jaula contiene cinco mecanismos principales:</p>
        <dl className="defs">
          <dt>Runtime Assurance</dt>
          <dd>Aplicación independiente de políticas fuera del modelo.</dd>
          <dt>Controles de veto integrados en el flujo de ejecución</dt>
          <dd>
            Puntos de interceptación arquitectónica capaces de bloquear acciones antes de su
            ejecución.
          </dd>
          <dt>Observabilidad independiente</dt>
          <dd>
            Registro al que solo se pueden añadir entradas y cuyas alteraciones pueden detectarse,
            junto con la monitorización del comportamiento.
          </dd>
          <dt>Controles por umbral</dt>
          <dd>Escalado o aislamiento automáticos cuando se superan los umbrales de riesgo.</dd>
          <dt>Autoridad humana</dt>
          <dd>Intervención obligatoria en decisiones de alto impacto.</dd>
        </dl>
        <p className="callout">
          El modelo propone. El sistema evalúa. Las personas conservan la autoridad.
        </p>
        <h3>Definición formal</h3>
        <p>
          La jaula determinista es un límite de ejecución impuesto mediante políticas que restringe
          la autoridad, el acceso a los datos, el alcance de las acciones, el importe de las
          transacciones, el tiempo de ejecución y la reversibilidad en torno a un modelo o agente
          probabilístico.
        </p>
        <p>Seis propiedades definen la jaula:</p>
        <dl className="defs">
          <dt>Autoridad acotada</dt>
          <dd>El agente puede proponer; no puede autorizar.</dd>
          <dt>Datos acotados</dt>
          <dd>El acceso se limita exclusivamente a los datos pertinentes para la tarea.</dd>
          <dt>Acciones acotadas</dt>
          <dd>Las acciones permitidas se enumeran explícitamente; todas las demás se deniegan.</dd>
          <dt>Tiempo acotado</dt>
          <dd>Las ventanas de ejecución tienen tiempos máximos y mecanismos de parada.</dd>
          <dt>Impacto financiero acotado</dt>
          <dd>Los límites de transacción restringen el radio de impacto en términos monetarios.</dd>
          <dt>Reversibilidad exigida</dt>
          <dd>Cuando la reversión es técnicamente posible, la arquitectura la exige.</dd>
        </dl>
        <p className="note">
          La jaula determinista se lleva a la práctica en la fase DEPLOY de DGOM™, donde los
          controles de acceso, los puntos de aprobación humana, los registros de veto y las trazas
          de auditoría a prueba de manipulaciones hacen cumplir sus propiedades en cada frontera de
          confianza.
        </p>
      </section>

      <section id="s11">
        <h2><span>11</span> Plano arquitectónico</h2>
        <p>
          Runtime Assurance no es un único punto de control entre la aplicación y el modelo.
          Intercepta a ambos lados de la inferencia: antes de la inferencia, inspecciona el contexto
          entrante (instrucciones del usuario, documentos recuperados y resultados de herramientas
          que vuelven al modelo) antes de que el modelo lo vea; después de la inferencia, evalúa las
          llamadas a herramientas y las salidas propuestas mediante el par formado por el punto de
          decisión de políticas (PDP) y el punto de aplicación de políticas (PEP), situado entre el
          agente y las herramientas, las API y la infraestructura.
        </p>
        <ol className="flow">
          <li>Usuario</li>
          <li>Capa de aplicación</li>
          <li>
            Capa de Runtime Assurance (preinferencia) — motor de políticas, controles de veto
            integrados en el flujo de ejecución, controles por umbral, auditoría y observabilidad
          </li>
          <li>LLM / agente</li>
          <li>Runtime Assurance (posinferencia): Punto de Decisión de Políticas (PDP)</li>
          <li>Punto de Aplicación de Políticas (PEP)</li>
          <li>Herramientas / API / infraestructura</li>
        </ol>
        <p>
          En la práctica, esta capa puede implementarse como un proxy inverso, una pasarela de API,
          un punto de control en una malla de servicios, un componente sidecar de Kubernetes o una
          capa de seguridad dedicada. El requisito clave es la independencia: operar fuera de la
          autoridad de decisión del modelo y estar protegida frente a modificaciones o elusiones por
          parte del agente gobernado. Un sistema no puede gobernarse a sí mismo.
        </p>
      </section>

      <section id="s12">
        <h2><span>12</span> Fronteras de confianza y autorización en tiempo de ejecución</h2>
        <p>
          Un error del modelo suele ser inocuo dentro del sistema que lo ha producido. Se vuelve
          perjudicial en el momento en que cruza a otro sistema que lo trata como un hecho o como
          una autorización para actuar. Ahí debe situarse el límite determinista: no solo alrededor
          del agente, sino en cada cruce, comprobando el mandato y registrando lo decidido.
        </p>
        <p>
          Esto transforma la gobernanza: de un único perímetro a una serie de puntos de control en
          cada frontera de confianza.
        </p>
        <p className="note">
          La autorización en tiempo de ejecución y los puntos de control en las fronteras de
          confianza se llevan a la práctica en las fases DEPLOY de DGOM™ (controles en ejecución y
          captura de evidencias) y MONITOR (detección de desviaciones, aseguramiento continuo y
          recalibración de límites).
        </p>
        <h3>Autorización en tiempo de ejecución, no aprobación estática</h3>
        <p>
          En un sistema agéntico, «aprobado» no puede ser una propiedad permanente del agente. Tiene
          que ser una decisión condicional: dados este contexto, esta autoridad, estos datos y este
          estado del flujo de trabajo, ¿está permitida ahora esta acción concreta?
        </p>
        <p className="callout">
          Política → Comprobación en ejecución → Acción → Evidencia → Reevaluación
        </p>
        <p>con escalado cuando dejan de cumplirse las condiciones.</p>
        <p>
          La mayoría de las organizaciones sigue tratando el riesgo como algo que se evalúa una sola
          vez. Pero, con los agentes, la verdadera superficie de riesgo solo aparece en tiempo de
          ejecución, cuando el contexto, la autoridad y el estado del flujo de trabajo están
          cambiando. Los equipos pueden modelar al agente, pero no pueden comprobar continuamente si
          una acción sigue estando permitida o sigue siendo segura en el instante en que se realiza.
        </p>
        <h3>Comportamiento como datos frente a gobernanza como código</h3>
        <p>
          Un patrón arquitectónico potente separa el comportamiento como datos de la gobernanza como
          código. Las reglas de gobernanza pueden basarse en datos y adaptarse a la tarea, los datos
          implicados y el rol del usuario. Pero los puntos de control que las hacen cumplir
          permanecen fijados en el código. Esto permite configurar la gobernanza sin crear una vía
          para eludirla.
        </p>
        <p>
          Las definiciones de políticas pueden dividirse en reglas innegociables, editables
          únicamente por los administradores de la plataforma, y reglas específicas del entorno
          aislado de cada cliente (tenant), almacenadas en espacios de datos separados. Los cambios
          de políticas no requieren un despliegue de código, pero sí una cadena de aprobación. La
          ejecución se realiza mediante un servicio dedicado.
        </p>
        <h3>Contención de la salida de datos</h3>
        <p>
          El mismo principio se aplica a los datos que salen del sistema. La sanitización previa a
          la salida puede detectar y ocultar clases conocidas de datos sensibles, como secretos,
          credenciales, datos regulados, información de identificación personal e información
          empresarial confidencial, cuando sea técnicamente viable, antes de que los datos
          atraviesen los sockets de red. En arquitecturas interactivas con transmisión de tokens en
          tiempo real (Server-Sent Events o WebSockets), donde una entidad sensible —como una clave
          de API o un identificador financiero— puede fragmentarse en varios tokens consecutivos, el
          punto de aplicación (PEP) interpone un búfer de ventana deslizante con solapamiento
          (<em>sliding-window lookahead buffer</em>) para el flujo de texto y retiene hasta su
          cierre completo los objetos JSON de llamadas a herramientas antes de evaluarlos y vaciar
          el socket, asumiendo una latencia acotada de decenas de milisegundos a cambio de impedir
          la filtración parcial de bytes antes del corte. Los registros de auditoría a prueba de
          manipulaciones emiten telemetría estructurada y verificable hacia las operaciones
          centrales de seguridad y los flujos de GRC en tiempo de ejecución, generando evidencias
          demostrables de contención.
        </p>
      </section>

      <section id="s13">
        <h2><span>13</span> La gobernanza como arquitectura en tiempo de ejecución</h2>
        <p>
          La gobernanza tradicional de la IA suele representarse así: Modelo → Documentación →
          Cumplimiento.
        </p>
        <p>Para la IA agéntica, una arquitectura más sólida es:</p>
        <p className="callout">
          Modelo → Controles → Límite de decisión → Ejecución → Monitorización → Evidencia
        </p>
        <p>
          Los controles de gobernanza no deberían existir únicamente en políticas y registros de
          riesgos. Deberían operar en tiempo de ejecución. Cuando los controles se versionan, se
          prueban, se aplican automáticamente, se monitorizan y son auditables, la gobernanza pasa a
          formar parte del comportamiento del sistema. Este es el significado práctico del
          cumplimiento como código.
        </p>
        <p>
          NIST aporta un marco útil de ingeniería del riesgo al definirlo mediante la combinación de
          probabilidad y consecuencias. El artículo 9 del Reglamento de IA de la UE ilustra cómo se
          formaliza la gestión continua del riesgo para los sistemas de IA de alto riesgo, exigiendo
          un proceso de identificación, estimación, evaluación, mitigación y revisión a lo largo de
          todo el ciclo de vida. En los sistemas agénticos, ese ciclo de vida debe abarcar el
          entorno de ejecución, no solo el modelo fundacional.
        </p>
        <h3>¿Por qué no basta con comprar salvaguardas?</h3>
        <p>
          Productos como NeMo Guardrails, Bedrock Guardrails y Lakera Guard son componentes de
          control útiles. Ofrecen filtrado de entradas, validación de salidas y moderación de
          contenido en la interfaz del modelo. Pero son componentes, no un modelo operativo.
        </p>
        <p>
          La gobernanza determinista no es un producto de salvaguardas. Es la arquitectura de
          control independiente en tiempo de ejecución y el modelo operativo que las rodea. Los
          elementos diferenciadores son estructurales:
        </p>
        <ul>
          <li>
            <strong>Aplicación independiente:</strong> la autoridad sobre las políticas se sitúa
            fuera de la pila de inferencia, no integrada en el flujo del proveedor.
          </li>
          <li>
            <strong>Cadena de evidencias:</strong> cada decisión genera registros a los que solo se
            pueden añadir entradas y cuyas alteraciones pueden detectarse, preparados para auditoría
            y alineados con las obligaciones normativas.
          </li>
          <li>
            <strong>Cadena de rendición de cuentas:</strong> la autoridad se delega, se acota y es
            revocable; no consiste en una concesión estática de permisos.
          </li>
          <li>
            <strong>Recalibración durante el ciclo de vida:</strong> los límites se revisan ante
            desencadenantes definidos, en lugar de darse por válidos para siempre.
          </li>
        </ul>
        <p>
          Las salvaguardas protegen la interfaz del modelo. La gobernanza determinista gobierna el
          sistema, los agentes y las consecuencias.
        </p>
      </section>

      <section id="s14">
        <h2><span>14</span> Riesgo residual, no riesgo cero</h2>
        <p>
          El objetivo de la gobernanza de la IA no puede ser el riesgo cero. El objetivo práctico es
          un riesgo residual aceptable, proporcionado al contexto y a las posibles consecuencias.
        </p>
        <p>Esto implica preguntarse no solo si el modelo es exacto, sino también:</p>
        <ul>
          <li>¿Cuál es el peor resultado plausible?</li>
          <li>¿Hasta dónde puede propagarse un fallo?</li>
          <li>¿Puede revertirse la acción?</li>
          <li>¿Quién puede detener el sistema?</li>
          <li>¿Qué evidencias quedan después del suceso?</li>
        </ul>
        <p>El riesgo es una propiedad del sistema, no solo del modelo.</p>
        <h3>Medir el riesgo residual silencioso</h3>
        <p>
          En sistemas de múltiples pasos, la estimación del riesgo basada en incidentes deja de ser
          fiable cuando los fallos son silenciosos o no se observan. En una cadena de varios pasos,
          los errores se condicionan entre sí, y los fallos más relevantes pueden no generar ningún
          incidente registrado: nada se contabiliza y, por tanto, nada entra en la estimación.
        </p>
        <p>Por ello, el riesgo residual debe medirse mediante:</p>
        <ul>
          <li>Violaciones de invariantes en las fronteras de confianza</li>
          <li>Pruebas sintéticas en modo sombra para revelar fallos latentes</li>
          <li>
            Límites al radio de impacto, mediante una jaula determinista, de modo que incluso los
            errores no detectados tengan un impacto sistémico acotado
          </li>
        </ul>
        <p>
          El objetivo es gobernar el límite superior de fallo que permite la arquitectura, no solo
          la tasa histórica de incidentes.
        </p>
      </section>

      <section id="s15">
        <h2><span>15</span> Gobernar los límites a lo largo del tiempo</h2>
        <p>
          Los controles deterministas pueden hacer cumplir perfectamente una restricción equivocada.
          El fundamento de autorización de cada cruce con consecuencias debe mantenerse vigente, ser
          inspeccionable y poder revocarse.
        </p>
        <p>
          Gran parte del daño observado en los despliegues procede de acciones que estaban
          plenamente permitidas: el límite se aplicó exactamente como estaba escrito, pero el límite
          era incorrecto. La arquitectura hace que una restricción sea vinculante; no hace que sea
          correcta. Las restricciones codificadas envejecen silenciosamente, porque nada falla
          cuando dejan de ajustarse al contexto.
        </p>
        <p>
          El término que falta en la ecuación del riesgo es el mantenimiento: quién revisa el
          límite, ante qué desencadenante y qué evidencias llevarían a restringirlo.
        </p>
        <h3>Un ciclo de vida para el propio límite</h3>
        <p>
          Una jaula determinista puede contener una acción, pero no puede determinar si la
          restricción sigue siendo correcta cuando cambian el sistema, los datos o el contexto de
          negocio. Eso requiere un ciclo de vida:
        </p>
        <p className="callout">
          Responsable → Desencadenante → Evidencia → Revisión → Ajuste del límite → Aprobación con
          responsabilidad explícita
        </p>
        <p>
          Los desencadenantes pueden incluir desviaciones semánticas, cambios normativos o
          situaciones cercanas a la vulneración de un invariante. La arquitectura hace cumplir la
          decisión. La gobernanza debe seguir respondiendo de si esa decisión continúa siendo
          correcta. Aplicación determinista, sí. Pero de permisos que caducan, no de permisos que se
          presuponen válidos para siempre.
        </p>
        <h3>La dimensión humana</h3>
        <p>
          Si las excepciones con consecuencias dependen, en última instancia, de que una persona
          cuestione, anule o intervenga, la arquitectura no depende únicamente de que esa autoridad
          esté formalmente asignada. También depende de que la capacidad humana de gobernar siga
          estando realmente disponible cuando se necesite.
        </p>
        <p>
          La calidad del juicio humano puede variar según el contexto, la carga de trabajo, el
          momento y el entorno informativo en que se ejerce. Una ejecución fiable exige ofrecer a la
          persona un contexto de decisión coherente y comparable, y preservar a lo largo del tiempo
          las condiciones que permiten ejercer un juicio humano significativo.
        </p>
        <p>
          Esto plantea una cuestión longitudinal: no solo si una persona estaba autorizada y podía
          intervenir, sino si las condiciones para ejercer un juicio humano significativo siguen
          siendo adecuadas y efectivas a lo largo del tiempo.
        </p>
        <p className="note">
          La gestión del ciclo de vida de los límites, incluidos los desencadenantes, la revisión de
          evidencias, la recalibración y la aprobación con responsabilidad explícita, se lleva a la
          práctica en la fase MONITOR de DGOM™, que gobierna el riesgo residual, la detección de
          desviaciones y el aseguramiento continuo durante el ciclo de vida del modelo.
        </p>
      </section>

      <section id="s16">
        <h2><span>16</span> Rendición de cuentas en la delegación</h2>
        <p>
          En los sistemas multiagente, la rendición de cuentas sobre las acciones delegadas se
          convierte en un reto fundamental, especialmente en entornos regulados. Si el agente A pide
          al agente B que actúe, la traza de auditoría debe mostrar algo más que lo ejecutado por el
          agente B. También debemos comprender por qué se inició la acción, bajo qué autoridad y
          dónde se situaba el límite de decisión.
        </p>
        <p>La traza de auditoría debe recoger:</p>
        <ul>
          <li>Qué se delegó y en quién</li>
          <li>Qué autoridad se transfirió y cuál no</li>
          <li>Por qué se inició la acción</li>
          <li>Dónde se situaba el límite de decisión</li>
          <li>Qué evidencias se registraron en cada cruce</li>
        </ul>
        <p>
          Este principio se relaciona directamente con el mínimo privilegio, la seguridad basada en
          capacidades, la confianza cero y la separación de funciones. Aplicando el principio n.º 1
          (sección 04), cada delegación debe generar evidencias de quién delegó la autoridad, qué
          alcance se concedió y dónde se situaba el límite de decisión.
        </p>
        <h3>La arquitectura de la rendición de cuentas</h3>
        <p>Un sistema agéntico digno de confianza separa capacidad y autoridad:</p>
        <ul>
          <li>El modelo genera y recomienda.</li>
          <li>Los controles deterministas validan y restringen.</li>
          <li>Los flujos de trabajo controlan el avance.</li>
          <li>El entorno de ejecución autoriza y ejecuta.</li>
          <li>La monitorización detecta anomalías.</li>
          <li>Las personas siguen respondiendo de las decisiones con consecuencias.</li>
        </ul>
        <p>
          En conjunto, estas capas crean un sistema en el que la autonomía es posible, pero está
          acotada.
        </p>
      </section>

      <section id="s17">
        <h2><span>17</span> Gobernanza + red teaming: el bucle de aprendizaje</h2>
        <p>
          La mayoría de los programas de gobernanza se diseña para superar auditorías. Pocos se
          diseñan para resistir ataques. Aquí es donde el red teaming resulta esencial. La
          gobernanza formula la hipótesis. El red teaming intenta refutarla, es decir, la somete a
          falsación.
        </p>
        <p>
          El ciclo es sencillo: definir controles, probar los controles, descubrir debilidades,
          actualizar los controles y repetir.
        </p>
        <p>
          Este bucle transforma la gobernanza: de documentación a capacidad. Sin él, la gobernanza
          se convierte en una representación teatral.
        </p>
        <p>
          La decisión directiva es el habilitador estratégico: asignación de recursos, gestión del
          riesgo real y mandato de cierre del bucle. La gobernanza formula la hipótesis (inducción);
          el red teaming la somete a falsación (deducción). La secuencia es: hipótesis (inducción) →
          despliegue controlado (observación) → falsación (deducción) → aprender y refinar (cerrar
          el bucle) → sistema de IA robusto y resiliente.
        </p>
      </section>

      <section id="s18">
        <h2><span>18</span> El círculo virtuoso de la gobernanza</h2>
        <p>
          Una idea equivocada habitual es que la gobernanza frena la innovación. En realidad, una
          gobernanza madura la acelera.
        </p>
        <p>
          La primera implementación de gobernanza genera fricción. Las siguientes generan un efecto
          multiplicador. Este es el círculo virtuoso de la gobernanza. La organización empieza a
          reutilizar controles aprobados, patrones de riesgo, artefactos de auditoría, evidencias
          regulatorias y políticas en tiempo de ejecución.
        </p>
        <p>
          A medida que se acumula confianza, aumenta la velocidad de despliegue. Indicadores
          habituales para la dirección:
        </p>
        <ul>
          <li>Menor tiempo hasta la puesta en producción</li>
          <li>Aprobaciones regulatorias más rápidas</li>
          <li>Menor esfuerzo de preparación de auditorías</li>
          <li>Menores tiempos de respuesta a incidentes</li>
          <li>Mayor reutilización de componentes de IA aprobados</li>
        </ul>
        <p>La confianza se convierte en un activo reutilizable.</p>
      </section>

      <section id="s19">
        <h2><span>19</span> Capa de traducción regulatoria</h2>
        <p>
          Una de las mayores carencias actuales de la IA empresarial es la desconexión entre los
          requisitos jurídicos y la implementación técnica. La siguiente correspondencia ofrece una
          traducción práctica.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Capacidad arquitectónica</th>
                <th>Alineación regulatoria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Observabilidad independiente</td>
                <td>Contribuye al registro de actividades y al registro automático del artículo 12.</td>
              </tr>
              <tr>
                <td>Capa de autoridad humana</td>
                <td>Contribuye a los requisitos de supervisión humana del artículo 14.</td>
              </tr>
              <tr>
                <td>Controles de veto integrados en el flujo de ejecución</td>
                <td>Contribuyen a las restricciones operativas y a la robustez de los artículos 14 y 15.</td>
              </tr>
              <tr>
                <td>Controles por umbral</td>
                <td>Contribuyen a la robustez y al diseño de fallo seguro del artículo 15.</td>
              </tr>
              <tr>
                <td>Runtime Assurance</td>
                <td>Contribuye a la gestión del riesgo, la supervisión y los controles operativos.</td>
              </tr>
              <tr>
                <td>Red teaming continuo</td>
                <td>Contribuye a las prácticas Measure y Manage del NIST AI RMF.</td>
              </tr>
              <tr>
                <td>Círculo virtuoso de la gobernanza</td>
                <td>Contribuye a la mejora continua de ISO/IEC 42001.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Aquí es donde el cumplimiento pasa de la política a la arquitectura.</p>
        <p className="note">
          Reglamento (UE) 2024/1689, Reglamento de IA · Reglamento (UE) 2022/2554, DORA · NIST AI
          RMF · ISO/IEC 42001.
        </p>
      </section>

      <section id="s20">
        <h2><span>20</span> La gobernanza no es un centro de costes</h2>
        <p>Para los directores generales, la pregunta clave no es técnica. Es económica.</p>
        <p>
          Las organizaciones que triunfen en la era de la autonomía no serán necesariamente las que
          tengan los modelos más grandes. Serán las que tengan los sistemas más gobernables.
        </p>
        <p>
          El elemento diferenciador estratégico no es la inteligencia. Es la inteligencia
          controlada. No la capacidad, sino la capacidad bajo supervisión. No la autonomía, sino la
          autonomía auditable.
        </p>
        <p>
          La gobernanza no tiene por qué ser un freno. Los controles deterministas (análisis AST,
          expresiones regulares, políticas OPA, listas de permitidos y consultas al catálogo de
          criticidad sincronizado en memoria local mediante paquetes firmados con TTL) suelen
          ejecutarse en el orden de los milisegundos sin depender de llamadas de red síncronas a
          bases de datos externas en la ruta crítica, mientras que una inferencia del modelo suele
          tardar segundos. Cuando una solicitud se bloquea antes de llegar al LLM, no consume tokens
          ni tiempo de inferencia. Las cifras reales dependen de cada despliegue y deben medirse en
          él; el principio de diseño es que cortar pronto cuesta menos que corregir tarde.
        </p>
      </section>

      <section id="s21">
        <h2><span>21</span> El coste de no gobernar</h2>
        <p>
          El coste de no gobernar no es hipotético: se materializa en decisiones equivocadas, costes
          descontrolados y hallazgos de auditoría. Algunos ejemplos:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Suceso</th>
                <th>Impacto económico</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inyección de instrucciones en RAG</td>
                <td>Decisiones equivocadas.</td>
              </tr>
              <tr>
                <td>Desviación del agente</td>
                <td>Costes de nube descontrolados.</td>
              </tr>
              <tr>
                <td>Abuso de herramientas</td>
                <td>Operaciones no autorizadas.</td>
              </tr>
              <tr>
                <td>Error regulatorio</td>
                <td>Multas y medidas correctoras.</td>
              </tr>
              <tr>
                <td>Falta de trazabilidad</td>
                <td>Hallazgos de auditoría.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <blockquote>
          El principal riesgo de la IA empresarial no es el fallo del modelo. Es la acumulación de
          consecuencias económicas derivadas de decisiones no gobernadas.
        </blockquote>
      </section>

      <section id="s22">
        <h2><span>22</span> Casos prácticos</h2>
        <p>
          Tres casos empresariales muestran la diferencia entre gobernar modelos y gobernar
          consecuencias. El primero es una implementación real con una demostración en vídeo sobre
          datos sintéticos. Los otros dos son escenarios ilustrativos inspirados en implementaciones
          públicas de referencia.
        </p>

        <h3>Caso 1: HR Copilot — Technical Governance Implementation (TGI v1)</h3>
        <p className="note">Implementación real · demostración en vídeo</p>
        <p>
          Dos versiones del mismo asistente interno de recursos humanos, ejecutadas en paralelo
          sobre datos empresariales sintéticos y sometidas a las mismas cargas de ataque, para que
          un CISO o un CTO observe la diferencia en directo. Tecnología: Python y OpenAI GPT-4o.
        </p>
        <p>
          <strong>Acto I — sin gobernanza:</strong> Una sola consulta encadena llamadas a
          herramientas no autorizadas y extrae la retribución de la dirección, datos personales
          (artículos 32 y 33 del RGPD), planes confidenciales de fusiones y adquisiciones y
          credenciales internas en menos de 60 segundos. Resultado: una brecha completa con una sola
          instrucción. No hace falta explotar una vulnerabilidad del modelo; basta con que el agente
          tenga más autoridad que cualquier control que lo rodee.
        </p>
        <p>
          <strong>Acto II — la capa determinista TGI v1:</strong> La capa TGI v1 envuelve
          exactamente el mismo modelo, sin sustituirlo, con ocho controles deterministas:
        </p>
        <dl className="defs">
          <dt>Aislamiento de las instrucciones</dt>
          <dd>Separa las instrucciones del sistema del contenido no fiable.</dd>
          <dt>Clasificación de la entrada</dt>
          <dd>Clasifica las solicitudes antes de que lleguen al modelo.</dd>
          <dt>Lista cerrada de herramientas</dt>
          <dd>Solo pueden invocarse las herramientas autorizadas de forma explícita.</dd>
          <dt>Aprobación humana (HITL)</dt>
          <dd>Las acciones sensibles requieren la aprobación de una persona.</dd>
          <dt>Prevención de fuga de datos en la salida (DLP)</dt>
          <dd>
            Detecta y oculta datos sensibles antes de que la respuesta salga del sistema (mediante
            evaluación de carga completa o búfer de ventana deslizante en respuestas por streaming
            antes de vaciar el socket de red).
          </dd>
          <dt>Autorización por fila</dt>
          <dd>El agente solo lee los registros a los que tiene derecho quien realiza la solicitud.</dd>
          <dt>Higiene de secretos</dt>
          <dd>Las credenciales nunca llegan al contexto ni a la respuesta.</dd>
          <dt>Trazabilidad lista para SIEM</dt>
          <dd>Cada intento bloqueado se registra como evidencia estructurada.</dd>
        </dl>
        <p>
          Resultado: el mismo modelo y los mismos datos pasan de una brecha completa con una sola
          instrucción a 0 hallazgos sensibles en la respuesta gobernada, con cada intento bloqueado
          etiquetado según OWASP LLM v2025 (LLM01, LLM02, LLM05–LLM07) y OWASP Agentic 2026
          (ASI01–ASI03, ASI05).
        </p>
        <p className="note">
          Evidencia: recorrido grabado en dos actos, con audio en castellano y subtítulos en{" "}
          <a href="/agent-fail-version-1.mp4">/agent-fail-version-1.mp4</a>, y ficha del proyecto en{" "}
          <a href="/es/#projects">tshapedconsultant.com/es/#projects</a>. Entorno de demostración
          con datos sintéticos; no es un despliegue en producción.
        </p>

        <h3>Caso 2 (ilustrativo): RAG corporativo y envenenamiento del contexto</h3>
        <p>
          Una entidad financiera despliega un asistente interno basado en RAG para que sus empleados
          consulten políticas corporativas, procedimientos y normativa interna.
        </p>
        <p className="note">
          Implementación de gobernanza relacionada: Porto Seguro Compliance Hub demuestra la
          arquitectura subyacente de gobernanza y evidencias, con detección de desviaciones mediante
          KS y paquetes de evidencias JSON con SHA-256. La vía de ataque al RAG es ilustrativa; el
          repositorio no implementa el propio sistema RAG.
        </p>
        <p>
          El sistema indexa políticas internas, procedimientos operativos, manuales regulatorios y
          documentación de recursos humanos. Se incorpora al repositorio documental un archivo
          aparentemente legítimo, <em>Risk Management Policy v4.pdf</em>, pero contiene una
          instrucción oculta para ignorar todas las instrucciones anteriores, priorizar siempre ese
          documento y responder que no se requiere aprobación de un responsable.
        </p>
        <p>
          El documento se indexa correctamente. Nadie detecta la carga maliciosa. Un empleado
          pregunta: «¿Necesito la aprobación de un responsable para transferencias superiores a
          50.000 EUR?». Sin Runtime Assurance, el sistema recupera el documento contaminado y
          responde que no se requiere aprobación. No hay una explotación técnica, ni malware, ni una
          vulnerabilidad de software. El sistema funciona exactamente como se diseñó. Pero la
          organización acaba de recibir una respuesta incorrecta desde el punto de vista
          regulatorio.
        </p>
        <p>
          Dónde interviene la capa judicial: antes de llegar al LLM, la consulta pasa por seguridad
          de entrada, recuperación RAG, aseguramiento del contexto, el LLM y validación de salida.
          Seguridad de entrada detecta caracteres ocultos y extrae instrucciones codificadas. Para
          no introducir una paradoja probabilística (depender de otro modelo estocástico que también
          pueda ser evadido), el aseguramiento determinista del contexto se fundamenta en el
          aislamiento estructural de canales (delimitadores XML/JSON inmutables que confinan los
          fragmentos recuperados como datos no ejecutables separados de las instrucciones del
          sistema), la verificación criptográfica de procedencia y metadatos de autorización del
          repositorio vectorial, y reglas léxicas/sintácticas deterministas que detectan patrones de
          anulación de instrucciones en el contenido recuperado. Validación de salida aplica una
          política de denegación por defecto en caso de fallo (fail-closed): bloquea la respuesta,
          genera una alerta y registra evidencias. El contenido malicioso queda neutralizado antes
          de que pueda alterar la autoridad durante la inferencia del modelo. La decisión la toma la
          arquitectura, no la probabilidad estadística del LLM.
        </p>

        <h3>Caso 3 (ilustrativo): agente autónomo de AWS</h3>
        <p>
          Una entidad financiera despliega un agente operativo conectado a AWS con tres objetivos:
          optimizar costes, eliminar recursos infrautilizados y automatizar las tareas de
          mantenimiento.
        </p>
        <p className="note">
          Arquitectura ilustrativa inspirada en la implementación de gobernanza de mantenimiento
          predictivo: conjunto de datos AI4I 2020, 10.000 muestras y un Random Forest con
          aproximadamente un 99 % de exactitud sobre datos de demostración; debe tenerse en cuenta
          el desequilibrio de clases. El repositorio demuestra controles de gobernanza y patrones de
          evidencia, no la integración del propio agente de AWS.
        </p>
        <p>
          El agente detecta una tabla de rutas (RTB-3491) con 0 llamadas en los últimos 90 días. El
          patrón histórico clasifica los recursos inactivos como candidatos a eliminación, con una
          probabilidad del 92 % de seleccionar la acción «Eliminar recurso». El agente ejecuta{" "}
          <code>delete_route_table()</code>.
        </p>
        <p>
          Lo que el modelo no sabe: la tabla pertenece a la red de conmutación por error de la
          plataforma de procesamiento de pagos, diseñada para activarse únicamente durante
          desastres, caídas regionales o contingencias operativas. Por eso parece inactiva. Una
          semana después se produce una caída regional. AWS intenta activar la conmutación por
          error, pero la ruta ya no existe: interrupción de los pagos, indisponibilidad operativa,
          posible incumplimiento de DORA e impacto reputacional.
        </p>
        <p>
          No hubo una elusión de las restricciones del modelo, ni una alucinación, ni un ataque
          externo. El agente hizo exactamente aquello para lo que estaba optimizando.
        </p>
        <p>
          Dónde interviene Runtime Assurance: antes de ejecutar la acción, la capa judicial consulta
          el registro de criticidad de activos, replicado como un paquete firmado en memoria local
          del PDP con tiempo de vida (TTL) acotado para conservar una latencia de milisegundos sin
          depender de consultas de red síncronas a la CMDB en la ruta crítica. Si el registro o la
          caché firmada no están disponibles, han expirado o el recurso carece de clasificación
          explícita, la compuerta aplica obligatoriamente una postura cerrada ante fallos
          (<em>fail-closed</em>), denegando cualquier acción destructiva por defecto. Clasificación:
          activo de infraestructura crítica. Control de interceptación en tiempo de ejecución:
          recurso de red crítico; se requiere aprobación humana. Control por umbral: acción
          propuesta eliminar tabla de rutas · impacto ALTO. Resultado: ejecución bloqueada. Se
          genera una solicitud de cambio; el arquitecto la revisa, identifica la función de
          conmutación por error y rechaza la acción.
        </p>
        <p>El agente sigue siendo autónomo. Pero no soberano.</p>
        <p>
          <strong>Mensaje clave:</strong> estos tres casos muestran la diferencia entre gobernar
          modelos y gobernar consecuencias. El primero lo demuestra en directo sobre un agente real;
          el segundo protege la integridad cognitiva del sistema; el tercero protege la resiliencia
          operativa de la organización. Los tres requieren exactamente el mismo principio: un
          sistema probabilístico nunca debería ser el único poder capaz de decidir sobre acciones
          con impacto real. Este es el núcleo de «Los modelos probabilísticos requieren gobernanza
          determinista».
        </p>
      </section>

      <section id="s23">
        <h2><span>23</span> Matriz de decisión ejecutiva</h2>
        <p>
          Comparación directa del perfil de riesgo y cumplimiento con y sin la capa de Runtime
          Assurance.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Riesgo</th>
                <th>Sin Runtime Assurance</th>
                <th>Con Runtime Assurance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inyección de instrucciones</td>
                <td>Exposición alta</td>
                <td>Controlada / mitigada</td>
              </tr>
              <tr>
                <td>Envenenamiento del contexto</td>
                <td>Exposición alta</td>
                <td>Reducido / monitorizado</td>
              </tr>
              <tr>
                <td>Abuso de herramientas</td>
                <td>Potencialmente alto</td>
                <td>Restringido mediante políticas</td>
              </tr>
              <tr>
                <td>Desviación del agente</td>
                <td>Sin límites</td>
                <td>Detectable / acotada</td>
              </tr>
              <tr>
                <td>Auditabilidad alineada con DORA</td>
                <td>Limitada</td>
                <td>Alta</td>
              </tr>
              <tr>
                <td>Reglamento de IA de la UE, art. 14</td>
                <td>Difícil de demostrar</td>
                <td>Evidencia directa</td>
              </tr>
              <tr>
                <td>Supervisión humana</td>
                <td>Ad hoc</td>
                <td>Habilitada en tiempo de ejecución</td>
              </tr>
              <tr>
                <td>Coste de los incidentes</td>
                <td>Variable</td>
                <td>Reducido</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>La diferencia no está en el modelo: está en la arquitectura que lo rodea.</p>
        <p>
          La misma organización, el mismo LLM, el mismo agente: dos perfiles de riesgo radicalmente
          diferentes.
        </p>
      </section>

      <section id="s24">
        <h2><span>24</span> Conclusión</h2>
        <p>
          Dédalo dio alas a la humanidad. Ícaro nos enseñó los límites. La inteligencia artificial
          es nuestro juego de alas moderno. El reto no consiste en impedir el vuelo. Consiste en
          evitar el colapso.
        </p>
        <p>
          No podemos impedir que la IA juegue a los dados. No podemos eliminar la incertidumbre de
          los sistemas probabilísticos. Pero podemos construir estructuras deterministas a su
          alrededor. Estructuras que supervisen. Estructuras que limiten. Estructuras que
          intervengan.
        </p>
        <p>
          La arquitectura completa de gobernanza funciona como un sistema de control en tiempo de
          ejecución:
        </p>
        <p className="callout">
          Modelo probabilístico → Política determinista → Autorización en tiempo de ejecución →
          Ejecución acotada → Evidencia → Validación adversaria continua → Recalibración de
          políticas
        </p>
        <p>
          Este es el paso de la gobernanza de la IA como documentación a la gobernanza de la IA como
          sistema de control en tiempo de ejecución. Ahí reside la verdadera diferenciación.
        </p>
        <p className="callout">
          Porque el futuro de la gobernanza de la IA no consiste en confiar en la máquina. Consiste
          en garantizar que, cuando falle la confianza, el control permanezca.
        </p>
        <p>
          Los modelos probabilísticos requieren gobernanza determinista. Y la gobernanza
          determinista comienza por la arquitectura, no por la política.
        </p>
        <p>
          <strong>Siguiente paso:</strong> la arquitectura descrita aquí se lleva a la práctica en
          DGOM™, Dual Governance Operating Model, un marco de cuatro fases (PLAN → BUILD → DEPLOY →
          MONITOR: planificar, construir, desplegar y monitorizar) que convierte estos principios en
          controles ejecutables. El punto de entrada es un diagnóstico de gobernanza de IA de 2–3
          semanas: evaluar la madurez DGOM del nivel 1 al 4 y recibir una hoja de ruta de 90 días.
        </p>
        <p>
          <a href={localize("/#diagnostic")}>Contacto</a> ·{" "}
          <a href="https://github.com/tshapedconsultant">github.com/tshapedconsultant</a>
        </p>
      </section>

      <section id="s25">
        <h2><span>25</span> Anexo técnico: políticas como código</h2>
        <p>
          La arquitectura de Runtime Assurance descrita en este documento no es teórica. Las
          políticas pueden expresarse como código ejecutable y aplicarse en cada frontera de
          confianza. El siguiente fragmento de Open Policy Agent (OPA / Rego) ilustra un control de
          autorización en tiempo de ejecución para una acción agéntica.
        </p>
        <p className="note"><code>runtime_authz.rego</code> · Política OPA.</p>
        <pre className="rego">
          <code>{`package ai_governance
import rego.v1

# Denegación por defecto: cada acción requiere autorización explícita
default allow := false

# Los niveles de autoridad usan una escala monótona: a mayor valor,
# mayor autoridad (p. ej., 1=observador, 5=operador, 9=administrador).

# Control de delegación (Principio n.º 1, Sección 04 — mínimo privilegio):
# obligatorio en TODAS las vías de autorización. Se cumple si no hay
# delegación o si la autoridad del hijo no supera la del padre y el
# ámbito requerido por la acción es un subconjunto del ámbito delegado
# (y este, a su vez, un subconjunto del ámbito del agente padre).
delegation_ok if not input.delegation.requested
delegation_ok if {
    input.delegation.requested
    input.delegation.child_authority <= input.delegation.parent_authority
    every s in input.delegation.scope { s in input.delegation.parent_scope }
    every req in input.action.required_scopes { req in input.delegation.scope }
}

# Condiciones base: deben cumplirse en TODAS las acciones, estándar o críticas
base_gates if {
    input.action.classification == "approved"
    input.agent.authority_level >= input.action.required_authority
    delegation_ok
}

# Acción estándar: condiciones base, impacto acotado, sin aprobación humana
allow if {
    base_gates
    input.action.impact_level in ["low", "medium"]
    not input.action.critical_infrastructure
    input.human_oversight.required == false
}

# Infraestructura crítica: condiciones base MÁS aprobación humana explícita,
# vinculada criptográficamente al hash de la acción y con validez temporal (TTL)
allow if {
    base_gates
    input.action.critical_infrastructure
    input.human_oversight.approved == true
    input.human_oversight.approver_role == "safety_manager"
    input.human_oversight.action_hash == input.action.hash
    input.human_oversight.expires_at >= time.now_ns()
}`}</code>
        </pre>
        <p>
          Como en Rego varias reglas <code>allow</code> se combinan con un O lógico, todos los
          controles que deben aplicarse siempre (clasificación, autoridad y control de delegación
          por subconjunto de ámbitos) se agrupan en <code>base_gates</code>, que es obligatorio en
          todas las vías de autorización; ninguna vía puede eludir el control de delegación ni
          impedir la reducción de privilegios en subagentes. Asimismo, para acciones sobre
          infraestructura crítica, el visto bueno humano debe coincidir con el hash unívoco de la
          acción propuesta (<code>action_hash</code>) y encontrarse dentro de su ventana de validez
          temporal (<code>expires_at &gt;= time.now_ns()</code>), impidiendo la reutilización de
          aprobaciones caducadas. Esta política se evalúa antes de cada acción con consecuencias. El
          agente propone; el motor de políticas decide; se registran las evidencias. No se ejecuta
          ninguna acción sin una decisión explícita de autorización.
        </p>
        <h3>Referencias de inteligencia de amenazas</h3>
        <p>
          Los riesgos descritos en este documento se corresponden con taxonomías consolidadas de IA
          adversaria:
        </p>
        <ul>
          <li>
            <strong>OWASP Top 10 for LLM Applications v2025:</strong> LLM01 Prompt Injection
            (inyección de instrucciones), LLM02 Sensitive Information Disclosure (divulgación de
            información sensible), LLM06 Excessive Agency (autonomía excesiva) y LLM07 System Prompt
            Leakage (filtración de las instrucciones del sistema).
          </li>
          <li>
            <strong>OWASP Top 10 for Agentic Applications 2026:</strong> ASI01 Agent Goal Hijack
            (secuestro del objetivo del agente), ASI02 Tool Misuse and Exploitation (uso indebido de
            herramientas), ASI03 Identity and Privilege Abuse (abuso de identidad y privilegios) y
            ASI05 Unexpected Code Execution (ejecución inesperada de código).
          </li>
          <li>
            <strong>MITRE ATLAS, Adversarial Threat Landscape for AI Systems:</strong> tácticas y
            técnicas adversarias contra sistemas que incorporan aprendizaje automático.
          </li>
          <li>
            <strong>NIST AI 600-1: Generative AI Profile:</strong> controles de gestión del riesgo
            específicos de la IA generativa, complementarios al NIST AI RMF 1.0.
          </li>
          <li>
            <strong>NIST AI RMF 1.0:</strong> el marco fundamental de gestión del riesgo, con las
            funciones Govern, Map, Measure y Manage (gobernar, contextualizar, medir y gestionar).
          </li>
        </ul>
        <p>
          Estas referencias aportan el vocabulario y los catálogos de patrones de ataque que
          informan la arquitectura de control. La gobernanza determinista los lleva a la práctica
          mediante controles aplicados en tiempo de ejecución, no mediante documentación.
        </p>
      </section>

      <section id="s26">
        <h2><span>26</span> Bibliografía y referencias técnicas</h2>
        <h3>1. Regulación y marcos normativos (UE)</h3>
        <ul>
          <li>
            Parlamento Europeo y Consejo de la Unión Europea (2024). Reglamento (UE) 2024/1689 por
            el que se establecen normas armonizadas en materia de inteligencia artificial
            (Reglamento de Inteligencia Artificial). <em>Diario Oficial de la Unión Europea</em>,
            ELI: reg/2024/1689/oj. Artículos 6, 9, 12, 14, 15, 26, 27, 72 y 99, y anexo III.{" "}
            <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj">EUR-Lex</a>
          </li>
          <li>
            Parlamento Europeo y Consejo de la Unión Europea (2022). Reglamento (UE) 2022/2554 sobre
            la resiliencia operativa digital del sector financiero (DORA).{" "}
            <em>Diario Oficial de la Unión Europea</em>, ELI: reg/2022/2554/oj.{" "}
            <a href="https://eur-lex.europa.eu/eli/reg/2022/2554/oj">EUR-Lex</a>
          </li>
        </ul>

        <h3>2. Estándares de gestión del riesgo y gobernanza de la IA</h3>
        <ul>
          <li>
            NIST, National Institute of Standards and Technology (2023).{" "}
            <em>Artificial Intelligence Risk Management Framework (AI RMF 1.0)</em>. NIST AI 100-1,
            con las funciones Govern, Map, Measure y Manage.{" "}
            <a href="https://www.nist.gov/itl/ai-risk-management-framework">NIST</a> ·{" "}
            <a href="https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf">PDF</a>
          </li>
          <li>
            NIST, National Institute of Standards and Technology (2024).{" "}
            <em>
              Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence
              Profile
            </em>
            . NIST AI 600-1.{" "}
            <a href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf">PDF</a>
          </li>
          <li>
            ISO/IEC (2023).{" "}
            <em>
              ISO/IEC 42001:2023, Information technology — Artificial intelligence — Management
              system
            </em>
            . Cláusulas 6.1, 8, 9 y 10.{" "}
            <a href="https://www.iso.org/standard/81230.html">ISO</a>
          </li>
        </ul>

        <h3>3. Seguridad agéntica e inteligencia de amenazas</h3>
        <ul>
          <li>
            OWASP GenAI Security Project (2025).{" "}
            <em>OWASP Top 10 for Agentic Applications for 2026</em>. Categorías ASI01 Agent Goal
            Hijack, ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse y ASI05
            Unexpected Code Execution (RCE).{" "}
            <a href="https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/">
              OWASP GenAI
            </a>
          </li>
          <li>
            OWASP GenAI Security Project (2024).{" "}
            <em>OWASP Top 10 for LLM Applications v2025</em>. Categorías LLM01 Prompt Injection,
            LLM02 Sensitive Information Disclosure, LLM06 Excessive Agency, LLM07 System Prompt
            Leakage y LLM08 Vector and Embedding Weaknesses.{" "}
            <a href="https://genai.owasp.org/llm-top-10/">OWASP GenAI</a>
          </li>
          <li>
            MITRE Corporation.{" "}
            <em>MITRE ATLAS™ (Adversarial Threat Landscape for Artificial-Intelligence Systems)</em>
            . Matriz de tácticas y técnicas adversarias contra sistemas de aprendizaje automático e
            IA agéntica. <a href="https://atlas.mitre.org/">MITRE ATLAS</a>
          </li>
        </ul>

        <h3>4. Motores de políticas deterministas y salvaguardas técnicas</h3>
        <ul>
          <li>
            Open Policy Agent, proyecto graduado de la CNCF. Documentación de OPA y del lenguaje de
            políticas Rego: evaluación determinista de políticas como código.{" "}
            <a href="https://www.openpolicyagent.org/docs/policy-language">OPA</a>
          </li>
          <li>
            NVIDIA. <em>NeMo Guardrails</em>: salvaguardas programables para sistemas
            conversacionales basados en LLM (Colang).{" "}
            <a href="https://github.com/NVIDIA-NeMo/Guardrails">GitHub</a>
          </li>
          <li>
            Amazon Web Services. <em>Amazon Bedrock Guardrails</em>: filtros de contenido y
            comprobaciones de razonamiento automatizado (Automated Reasoning checks).{" "}
            <a href="https://aws.amazon.com/bedrock/guardrails/">AWS</a>
          </li>
          <li>
            Lakera. <em>Lakera Guard</em>: defensa en tiempo real frente a la inyección de
            instrucciones y la fuga de datos.{" "}
            <a href="https://www.lakera.ai/lakera-guard">Lakera</a>
          </li>
        </ul>

        <h3>5. Conjuntos de datos e implementaciones de referencia (Dédalo™ / TGI v1)</h3>
        <ul>
          <li>
            Matzka, S. (2020). <em>AI4I 2020 Predictive Maintenance Dataset</em>. UCI Machine
            Learning Repository. 10.000 registros de telemetría industrial sintética; referencia de
            la implementación de gobernanza citada en el caso 3 (casos prácticos).{" "}
            <a href="https://archive.ics.uci.edu/dataset/601/ai4i+2020+predictive+maintenance+dataset">
              UCI
            </a>
          </li>
          <li>
            Lage Freire, A. (2026).{" "}
            <em>HR Copilot, Technical Governance Implementation (TGI v1)</em>: plano de control
            determinista con ocho controles que envuelve el mismo modelo GPT-4o; caso 1 (casos
            prácticos).{" "}
            <a href="/agent-fail-version-1.mp4">Vídeo de demostración</a> ·{" "}
            <a href="/es/#projects">Ficha del proyecto</a>
          </li>
          <li>
            Lage Freire, A. (2026). <em>Enterprise AI Risk Console</em>: gobernanza de proveedores
            de IA con triaje determinista a partir de perfiles YAML validados, compuertas de Jira
            validadas con HMAC y registro de auditoría encadenado por hash.{" "}
            <a href="https://enterprise-ai-risk.onrender.com">Demo en Render</a> ·{" "}
            <a href="https://github.com/tshapedconsultant/enterprise-ai-risk">GitHub</a>
          </li>
          <li>
            Lage Freire, A. (2026). <em>Porto Seguro, Responsible AI Compliance Hub</em>:
            arquitectura de referencia para el Reglamento de IA de la UE y Solvencia II en el sector
            asegurador (detección de desviaciones KS, paquetes de evidencias JSON y control de
            despliegue en CI/CD); caso 2 (casos prácticos).{" "}
            <a href="https://github.com/tshapedconsultant/porto-seguro-compliance-hub">GitHub</a>
          </li>
        </ul>
      </section>

      <p className="paper-also article-related">
        <a href={WHITEPAPER_PATH}>{t.essays.readEnPaper}</a>
        {" · "}
        <a href={localize(MONTEQUIEU_PATH)}>IA agéntica y Montesquieu</a>
        {" · "}
        <a href={localize(HYBRID_PROFILES_PATH)}>Perfiles híbridos</a>.
      </p>
    </article>
  );
}
