// Cursos de Activos Kairos: catálogo + copy de `/cursos` y `/cursos/notion-ai`.
//
// Fuente única de verdad. Precio, URL de comunidad, garantía y estado de los
// módulos viven SOLO aquí; ningún componente los repite (criterio de aceptación
// del activo "Landing page Curso Notion AI").
//
// Contenido solo en español, igual que `activos.ts`, `casos.ts` y `pilares.ts`:
// la web dejó de ofrecer otros idiomas, así que el copy no pasa por
// `messages/*.json`.

/** Comunidad donde se consigue el curso. Nunca enlazar el aula interna como CTA
 *  principal: puede exigir sesión y membresía previa. */
export const COMMUNITY_URL = "https://www.skool.com/kairos-hispania-llc-2847";
export const COMMUNITY_NAME = "Schole Kairos";

/** UTMs para poder atribuir en Skool los clics que salen de la landing. */
const UTM =
  "utm_source=activoskairos&utm_medium=landing&utm_campaign=curso_notion_ai";
export const COMMUNITY_URL_UTM = `${COMMUNITY_URL}?${UTM}`;

export const notionAiCourse = {
  price: 97,
  currency: "EUR",
  priceLabel: "97 €",
  guaranteeDays: 14,
  communityUrl: COMMUNITY_URL,
  communityUrlUtm: COMMUNITY_URL_UTM,
  // Calendar está publicado en el aula: los tres módulos son contenido
  // disponible (decisión de Javier, 08/2026).
  availableModules: ["fundamentos", "mail", "calendar"],
  upcomingModules: [] as string[],
} as const;

export type CursoEstado = "disponible" | "proximamente";

export type Curso = {
  slug: string;
  nombre: string;
  estado: CursoEstado;
  resumen: string;
  bullets?: string[];
  cta?: string;
};

// Catálogo del hub. Los `proximamente` no abren página: no hay landing ni fecha.
export const CURSOS: Curso[] = [
  {
    slug: "notion-ai",
    nombre: "Notion AI",
    estado: "disponible",
    resumen:
      "Crea un asistente que entienda tu contexto y úsalo para gestionar tu correo con un método claro y repetible.",
    bullets: [
      "Fundamentos de contexto, instrucciones, habilidades y agentes.",
      "Aplicación práctica a Notion Mail.",
      `Acceso dentro de la comunidad ${COMMUNITY_NAME}.`,
    ],
    cta: "Descubrir Notion AI",
  },
  {
    slug: "kairos-vitae",
    nombre: "Kairos Vitae",
    estado: "proximamente",
    resumen: "Construye tu sistema operativo personal.",
  },
  {
    slug: "notion-fundamenta",
    nombre: "Notion Fundamenta",
    estado: "proximamente",
    resumen: "Aprende las bases que sostienen un buen workspace.",
  },
  {
    slug: "notion-estructura",
    nombre: "Notion Estructura",
    estado: "proximamente",
    resumen: "Diseña sistemas conectados y mantenibles.",
  },
  {
    slug: "notion-arquitecta",
    nombre: "Notion Arquitecta",
    estado: "proximamente",
    resumen: "Lleva Notion a un nivel avanzado de arquitectura.",
  },
];

export const CURSOS_BY_SLUG: Record<string, Curso> = Object.fromEntries(
  CURSOS.map((c) => [c.slug, c]),
);

// --- Hub `/cursos` ---------------------------------------------------------

export const HUB = {
  metaTitle: "Cursos de Notion e IA | Activos Kairos",
  metaDescription:
    "Formación práctica en español para convertir Notion en un sistema que trabaja contigo. Curso Notion AI disponible; nuevos cursos en preparación.",
  eyebrow: "CURSOS",
  h1: "Cursos para convertir Notion en un sistema que trabaja contigo",
  lead: "Aprende a organizar información, diseñar sistemas y utilizar IA dentro del mismo espacio. Formación práctica, en español y construida sobre procesos que ya usamos con empresas reales.",
  cta: "Ver curso Notion AI",
  disponiblesTitulo: "Curso disponible",
  proximosTitulo: "Nuevos cursos en preparación",
  proximosEtiqueta: "Próximamente",
  cierreTitulo: "¿Buscas algo distinto?",
  cierreTexto:
    "Vuelve a Activos Kairos para conocer cómo diseñamos sistemas personalizados para empresas.",
  cierreCta: "Volver a Activos Kairos",
} as const;

// --- Landing `/cursos/notion-ai` -------------------------------------------

export const NOTION_AI = {
  metaTitle:
    "Curso Notion AI: crea un asistente con tu contexto | Activos Kairos",
  metaDescription:
    "Configura en Notion un asistente de IA con tu contexto y tus reglas, y aplícalo a tu correo con un protocolo repetible. Fundamentos, Mail y Calendar por 97 €.",

  eyebrow: "CURSO · NOTION AI",
  h1: "Tu IA ya puede responder. Ahora haz que entienda cómo trabajas.",
  lead: "Crea un asistente dentro de Notion con tu contexto, tus reglas y tus procesos. Después aplícalo a una de las tareas que más tiempo consume: gestionar el correo.",
  ctaPrincipal: "Conseguir el curso en Schole Kairos",
  ctaNota:
    "Entrarás en la comunidad y podrás completar allí el pago para acceder al contenido disponible.",

  trustBar: [
    "Curso práctico en español",
    "Contenido disponible",
    "Basado en sistemas implantados en empresas reales",
  ],

  problema: {
    eyebrow: "EL PROBLEMA",
    titulo: "Usar IA no significa tener un asistente.",
    parrafos: [
      "Si cada conversación empieza desde cero, la IA no conoce tu negocio, no entiende tus prioridades y termina devolviendo respuestas genéricas. En el correo ocurre lo mismo: sigues leyendo cada mensaje, decidiendo qué hacer y moviendo manualmente la información de un lugar a otro.",
      "La solución no es acumular más prompts. Es darle contexto, reglas y un trabajo concreto.",
    ],
  },

  transformacion: {
    eyebrow: "LA TRANSFORMACIÓN",
    titulo: "De consultas sueltas a un sistema que trabaja contigo.",
    intro: "Al terminar podrás:",
    bullets: [
      "Crear una capa de contexto para que Notion AI entienda tu actividad y tu forma de trabajar.",
      "Diseñar instrucciones que produzcan respuestas útiles y consistentes.",
      "Convertir una tarea repetitiva en una habilidad reutilizable.",
      "Aplicar un protocolo claro para eliminar, archivar, responder o diferir correos.",
      "Transformar correos en decisiones, tareas y seguimientos sin perder el contexto.",
    ],
  },

  // Marco del curso: contexto → repetición → autonomía.
  marco: {
    eyebrow: "EL MARCO",
    titulo: "Contexto → Repetición → Autonomía",
    pasos: [
      {
        n: "01",
        t: "Contexto",
        d: "Qué debe saber tu asistente sobre tu actividad, tus prioridades y tu forma de trabajar.",
      },
      {
        n: "02",
        t: "Repetición",
        d: "Las instrucciones y reglas que convierten un proceso repetitivo en una habilidad reutilizable.",
      },
      {
        n: "03",
        t: "Autonomía",
        d: "Cuándo pasar de colaborar con la IA a dejar que ejecute, y con qué límites.",
      },
    ],
  },

  modulos: {
    eyebrow: "QUÉ INCLUYE",
    titulo: "Tres módulos, un mismo sistema.",
    items: [
      {
        id: "fundamentos",
        n: "1",
        t: "Fundamentos",
        estado: "disponible" as const,
        bullets: [
          "Contexto: qué debe saber tu asistente.",
          "Instrucciones y reglas: cómo debe actuar.",
          "Habilidades: cómo convertir procesos repetitivos en acciones reutilizables.",
          "Agentes: cuándo pasar de colaboración a autonomía.",
          "Marco: contexto → repetición → autonomía.",
        ],
      },
      {
        id: "mail",
        n: "2",
        t: "Mail",
        estado: "disponible" as const,
        bullets: [
          "Protocolo Bandeja a 100.",
          "Las cuatro decisiones: eliminar, archivar, responder y reenviar o diferir.",
          "Configuración del asistente y de la habilidad de correo.",
          "Rutas para correos automáticos y uso eficiente de la IA.",
          "Demostraciones y gestión completa de una bandeja.",
        ],
      },
      {
        id: "calendar",
        n: "3",
        t: "Calendar",
        estado: "disponible" as const,
        bullets: [
          "Módulo publicado dentro del aula, incluido en el mismo acceso.",
          "Lleva el sistema del correo a la agenda: del mensaje a la reunión.",
        ],
      },
    ],
  },

  porQue: {
    eyebrow: "POR QUÉ ESTE CURSO",
    titulo:
      "No aprenderás una interfaz que cambiará en seis meses. Aprenderás un sistema.",
    bullets: [
      "Orientado a resultados operativos, no a funciones aisladas.",
      "Construido desde la experiencia de Activos Kairos usando IA sobre cuentas reales.",
      "Aplicado en Biventia para convertir la gestión manual del correo en un protocolo asistido por IA.",
      "Diseñado para que puedas adaptar las reglas a tu trabajo, no copiar un prompt genérico.",
    ],
  },

  // Caso autorizado por Biventia. Sin porcentaje de ahorro hasta tener medición
  // posterior verificable (decisión recogida en el activo).
  caso: {
    eyebrow: "CASO REAL",
    logo: "/assets/clients/biventia.png",
    empresa: "Biventia",
    titulo:
      "De una bandeja que podía consumir dos horas cada mañana a un protocolo claro de decisión.",
    texto:
      "En Biventia diseñamos un asistente y una habilidad de correo sobre Notion Mail. El sistema enseña a clasificar cada mensaje, aplicar una decisión y mantener la bandeja bajo control.",
  },

  oferta: {
    eyebrow: "LA OFERTA",
    titulo: `Consigue Notion AI dentro de ${COMMUNITY_NAME}`,
    bullets: [
      "Contenido disponible inmediatamente.",
      "Fundamentos + Mail + Calendar.",
      "Acceso desde la comunidad.",
    ],
    precioNota: "Pago único, sin IVA.",
    garantia: `Garantía de ${notionAiCourse.guaranteeDays} días: si accedes al contenido y compruebas que no encaja, te devolvemos el importe.`,
    cta: "Entrar en Schole Kairos y conseguir el curso",
  },

  faq: {
    eyebrow: "PREGUNTAS FRECUENTES",
    titulo: "Antes de entrar",
    items: [
      {
        id: "dominar-notion",
        q: "¿Necesito dominar Notion?",
        a: "No. Conviene conocer páginas y navegación básica, pero el curso explica la estructura necesaria para configurar el asistente.",
      },
      {
        id: "plan-notion-ia",
        q: "¿Necesito un plan de Notion con IA?",
        a: "Sí. Para aplicar el sistema necesitas acceso a las funciones de Notion AI que se utilizan durante el curso. Algunas funciones pueden depender del plan vigente de Notion.",
      },
      {
        id: "disponible-ahora",
        q: "¿El curso está disponible ahora?",
        a: "Sí. Fundamentos, Mail y Calendar están publicados dentro de Schole Kairos.",
      },
      {
        id: "compra-aqui",
        q: "¿Se compra directamente en esta página?",
        a: "No. El botón te lleva a Schole Kairos. Una vez dentro de la comunidad podrás completar el pago y conseguir el curso.",
      },
      {
        id: "personal-profesional",
        q: "¿Sirve para correo personal y profesional?",
        a: "Sí. El protocolo se puede adaptar a ambos contextos siempre que definas reglas y permisos adecuados.",
      },
      {
        id: "control-ia",
        q: "¿La IA enviará o borrará correos sin control?",
        a: "El curso enseña a definir límites, confirmaciones y reglas. Debes revisar especialmente las acciones sensibles antes de permitir cualquier ejecución.",
      },
      {
        id: "no-encaja",
        q: "¿Qué ocurre si no encaja conmigo?",
        a: `La oferta incluye una garantía de ${notionAiCourse.guaranteeDays} días. Las condiciones definitivas se muestran también en el punto de pago dentro de Skool.`,
      },
    ],
  },

  cierre: {
    titulo:
      "Deja de usar la IA como una caja de texto. Conviértela en una forma de trabajar.",
    cta: "Conseguir el curso en Schole Kairos",
  },
} as const;
