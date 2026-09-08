import type { MappingRow } from "./euAiActMapping";

export const MAPPING_SOURCE_NOTE_ES =
  "El status se puntúa contra los repos públicos, no contra afirmaciones del README. Porto Seguro publica un JSON de conformidad versionado más capturas — los ficheros de pipeline citados en ese README no están en el árbol. Enterprise AI Risk implanta un ledger encadenado por hash, decision ID únicos y compuertas humanas en Jira. Rekor y S3 Object Lock existen como sinks opcionales y están desactivados por defecto. El texto es original.";

export const MAPPING_SUBTITLE_ES =
  "Deberes seleccionados del EU AI Act mapeados a controles ejecutables que emiten un paquete de evidencia con hash — para CTOs, responsables de IA y líderes de Riesgo.";

export const MAPPING_INTRO_ES =
  "Esta página muestra qué obligaciones aplican a un rol y un sistema dados, los controles ejecutables que las implantan y el paquete mínimo de evidencia que inspeccionaría un auditor.";

export const MAPPING_SUBSET_NOTE_ES =
  "Es un subconjunto de ingeniería y evidencia de auditoría del Reglamento. No es exhaustivo ni una interpretación jurídica completa.";

export const MAPPING_DATES_NOTE_ES =
  "Las fechas de aplicación varían según categoría y rol; este mapeo es el diseño de control y evidencia esperado cuando esas obligaciones apliquen.";

export const MAPPING_ROLE_BULLETS_ES = [
  "El rol se clasifica por sistema y caso de uso — proveedor o responsable del despliegue — y ese rol fija el conjunto de obligaciones. No es una etiqueta permanente de la empresa.",
  "Los sistemas de alto riesgo (ejemplos del anexo III: solvencia crediticia de personas físicas, evaluación y tarificación del riesgo en seguros de vida y salud, componentes de seguridad de infraestructuras críticas) requieren los controles más profundos del capítulo III.",
  "Los sistemas que no son de alto riesgo siguen necesitando controles proporcionales, alineados con ISO/IEC 42001 y el apetito de riesgo — no un stack completo de alto riesgo por defecto.",
];

export const MAPPING_ROLE_FOOTNOTE_ES =
  "Proveedor y responsable del despliegue siguen las definiciones del AI Act. Una misma organización puede ser ambas, según cómo se comercialice o se ponga en servicio el sistema.";

export const MAPPING_FILTER_HELP_ES =
  "Filtre por tipo de sistema para ver las obligaciones que suelen aplicar a ese rol.";

export const MAPPING_STATUS_NOTE_ES =
  "Status = implantación en proyectos de referencia, no aplicabilidad regulatoria.";

export const MAPPING_STATUS_LEGEND_ES =
  "El status se refiere a la implementación de referencia — no a la aplicabilidad jurídica de la obligación.";

export const MAPPING_LEAD_SHORT_ES =
  "La clasificación de rol y riesgo determina qué obligaciones aplican. Este es un mapeo con foco de ingeniería, no asesoramiento jurídico.";

export const MAPPING_PHASED_DATES_NOTE_ES =
  "La aplicación es escalonada por categoría y rol. Las obligaciones de transparencia del art. 50 se describen a menudo como aplicables desde agosto de 2026; los deberes de alto riesgo del anexo III, con frecuencia desde diciembre de 2027. Esta página es el diseño de control y evidencia esperado cuando esas obligaciones apliquen — no una determinación de sus fechas.";

export const MAPPING_ART12_RETENTION_ES =
  "El art. 12 exige registros automáticos y trazables de eventos para poder reconstruir el comportamiento del sistema. Los registros se conservan según la categoría aplicable — por ejemplo, al menos seis meses en muchos sistemas de alto riesgo en virtud del art. 19 (proveedores) y del art. 26, apartado 6 (responsables del despliegue), salvo que otra normativa de la Unión o nacional exija más. Los controles de referencia usan decision ID únicos y atribuyen los eventos al usuario, a la versión del modelo y a las fuentes de datos.";

export const MAPPING_ISO_NOTE_ES =
  "ISO/IEC 42001 es un sistema de gestión de IA (AIMS). Estructura la gobernanza; no confiere por sí misma presunción de conformidad en virtud del AI Act. Donde se exija un sistema de gestión de la calidad para alto riesgo, alinee con las normas europeas aplicables a medida que lo sean (por ejemplo, prEN 18286). Los repositorios de referencia no implantan prEN 18286.";

export const MAPPING_ISO_NOTE_SHORT_ES =
  "ISO/IEC 42001 es un AIMS: estructura la gobernanza; no confiere por sí misma presunción de conformidad en virtud del AI Act.";

export const MAPPING_OUT_OF_SCOPE_ES =
  "No constituye asesoramiento jurídico. No es un organismo notificado. Este trabajo no certifica sistemas de IA. Prepara diseño de controles, ingeniería y evidencia para evaluaciones y auditorías.";

export const MAPPING_OUT_OF_SCOPE_SHORT_ES =
  "No es asesoramiento jurídico ni una certificación — diseño de controles y evidencia para evaluaciones.";

export const MAPPING_ROWS_ES: Record<
  string,
  Pick<MappingRow, "article" | "systemType" | "control" | "evidence" | "requirement">
> = {
  "art-9-risk": {
    article: "Art. 9 – Sistema de gestión de riesgos",
    systemType: "Proveedor · alto riesgo",
    control: "Compuertas KS de drift diseñadas con umbrales ALLOW/BLOCK",
    evidence:
      "Instantánea de drift en el JSON de conformidad versionado — no hay código KS/compuerta en el repo público",
    requirement:
      "Un proceso de riesgo continuo, a lo largo del ciclo de vida, para sistemas de alto riesgo: identificar el riesgo residual, fijar límites y mantener esos límites bajo revisión mientras el modelo está en producción.",
  },
  "art-10-data": {
    article: "Art. 10 – Datos y gobernanza de datos",
    systemType: "Proveedor · alto riesgo",
    control: "Linaje de conjuntos de datos, comprobaciones de representatividad y métricas de sesgo",
    evidence:
      "Ficha de datos de entrenamiento e instantánea de equidad en el JSON de conformidad — sin código de linaje ni de validación del split",
    requirement:
      "Los datos de entrenamiento, validación y prueba deben ser pertinentes, suficientemente representativos y trazables — incluido cómo se hizo el split, qué queda fuera de alcance y las comprobaciones de sesgo registradas en el pack de conformidad.",
  },
  "art-11-docs": {
    article: "Art. 11 – Documentación técnica",
    systemType: "Proveedor · alto riesgo",
    control: "Campos de model card versionados en un JSON de conformidad",
    evidence: "eu_ai_act_conformity_v1.json — no lo genera un pipeline en el repo público",
    requirement:
      "Documentación que permita a una autoridad competente entender el sistema: finalidad, arquitectura, datos, rendimiento y riesgo residual — generada, no reconstruida.",
  },
  "art-12-logs": {
    article: "Art. 12 – Conservación de registros",
    systemType: "Proveedor · alto riesgo",
    control: "Ledger encadenado por hash, a prueba de manipulación, para reconstruir el comportamiento",
    evidence: "Cadena previous_hash + DecisionRecord SHA-256 canónico. Rekor/S3 opcionales, desactivados por defecto",
    requirement:
      "Los sistemas de alto riesgo deben permitir técnicamente registros automáticos de eventos para que las autoridades puedan reconstruir el comportamiento del sistema (art. 12). Proveedores y responsables del despliegue conservan los registros bajo su control durante un periodo adecuado a la finalidad — al menos seis meses, salvo que otra normativa de la Unión o nacional exija otra cosa (art. 19 / art. 26, apartado 6).",
  },
  "art-13-transparency": {
    article: "Art. 13 – Transparencia",
    systemType: "Proveedor · alto riesgo",
    control: "Explicaciones técnicas que sustentan la transparencia al usuario y la supervisión interna",
    evidence: "Flags JSON y capturas del README — sin artefactos exportables de explicación global/local",
    requirement:
      "Transparencia para que los responsables del despliegue puedan interpretar la salida y usar el sistema de forma adecuada — incluido qué está, y qué no está, autorizado a hacer la puntuación. Las explicaciones técnicas (puntuaciones globales y locales) apoyan ese deber para usuarios y supervisores internos; el Reglamento no siempre exige XAI técnico.",
  },
  "art-14-oversight": {
    article: "Art. 14 – Supervisión humana",
    systemType: "Proveedor / responsable del despliegue · alto riesgo",
    control: "Compuertas humanas para que los operadores puedan monitorizar, interpretar, anular y detener",
    evidence: "Cierres de compuerta Jira verificados con HMAC, con actor de allow-list y marca temporal",
    requirement:
      "Las personas físicas deben poder monitorizar e interpretar el sistema, anular su salida y detenerlo. Cerrar un ticket de departamento no es una aprobación de negocio salvo que una persona nominada lo diga.",
  },
  "art-15-robustness": {
    article: "Art. 15 – Exactitud y robustez",
    systemType: "Proveedor · alto riesgo",
    control: "Métricas de hold-out y perturbación registradas en el pack",
    evidence: "Instantánea adversarial en el JSON de conformidad — sin pruebas de perturbación que bloqueen el CI",
    requirement:
      "Exactitud, robustez y coherencia adecuadas frente a errores, fallos e incoherencias que puedan producirse en el entorno real o por interacción con otros sistemas.",
  },
  "art-15-cyber": {
    article: "Art. 15 – Ciberseguridad",
    systemType: "Proveedor · alto riesgo",
    control: "Camino de parada independiente / kill switch (no está en los repos de referencia)",
    evidence: "No hay kill switch ejecutable; Porto Seguro declara fuera de alcance los controles de runtime agéntico",
    requirement:
      "Resiliencia frente a intentos de alterar el uso o el rendimiento — incluido un camino de parada que no dependa de que el modelo acepte ser detenido, con monitorización de seguridad de ese camino.",
  },
  "art-16-provider": {
    article: "Art. 16 – Obligaciones de los proveedores",
    systemType: "Proveedor",
    control: "Perfiles YAML / compliance-as-code (cumplimiento como código) versionados en CI",
    evidence: "rules/*.yaml + JSON de paquete de evidencia en CI con compuerta SHA-256 de despliegue",
    requirement:
      "Los proveedores incorporan los deberes de alto riesgo al diseño, a la gestión de la calidad y a la vigilancia poscomercialización — como artefactos versionados, no como diapositivas.",
  },
  "art-26-deployer": {
    article: "Art. 26 – Obligaciones de los responsables del despliegue",
    systemType: "Responsable del despliegue",
    control: "Instrucciones de uso, derechos humanos de parada y titularidad de la monitorización",
    evidence: "No hay runbook de responsable del despliegue en los repos de referencia — el registro nominado de supervisión es el siguiente trabajo",
    requirement:
      "Los responsables del despliegue siguen las instrucciones del proveedor, mantienen a las personas en condiciones de detener el sistema y asumen la monitorización. Conservan bajo su control los registros generados automáticamente durante un periodo adecuado a la finalidad — al menos seis meses, salvo que otra norma exija otra cosa (art. 26, apartado 6).",
  },
  "annex-iv": {
    article: "Anexo IV – Documentación técnica",
    systemType: "Proveedor · alto riesgo",
    control: "Campos al estilo del anexo IV en un pack de documentación versionado",
    evidence: "Solo JSON de conformidad — no hay exportación CI SHA-256 de un conjunto anexo IV en ese repo",
    requirement:
      "Un conjunto documental al estilo del anexo IV que pueda entregarse a un auditor: descripción del sistema, diseño, datos, monitorización y los hashes SHA-256 que vinculan esos artefactos a una release.",
  },
};
