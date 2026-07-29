// Contenido de las 5 páginas de activo del ecosistema (/activos/[slug]).
// BORRADOR de copy (rol Homero): describe servicios reales; no incluye cifras
// ni casos inventados. Registro de marca: "nosotros → tú", dolor antes que
// feature, outcome. Cada página tiene H1/title/description únicos (tarea SEO 10).
// Los casos relacionados salen del recorrido REAL de cada cliente (Cases.jsx).

export type ActivoContent = {
  slug: string;
  key: string; // coincide con recorrido de los casos: Initia/Flux/Sophos/Tempo/Stasis
  product: string; // icono en /assets/products
  eyebrow: string;
  keyword: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: { h2: string; body: string[] }[];
  incluye: string[];
  resultado: string;
  relatedCases: string[]; // slugs de /casos
  relatedPillar: { href: string; label: string };
  cta: { title: string; body: string };
};

export const ACTIVOS: ActivoContent[] = [
  {
    slug: "initia",
    key: "Initia",
    product: "initia.png",
    eyebrow: "Activo · Initia",
    keyword: "implantación de Notion",
    h1: "Implantación de Notion: lanzamos tu espacio de trabajo",
    metaTitle: "Initia · Implantación de Notion | Activos Kairos",
    metaDescription:
      "Montamos tu espacio de trabajo en Notion —bases de datos, equipos, vistas y permisos— y formamos a tu equipo para usarlo desde el primer día. Sin partir de cero.",
    lead:
      "Initia es nuestra implantación de Notion llave en mano: montamos el espacio base de tu empresa y formamos a tu equipo para que lo use desde el día uno. No empiezas con una hoja en blanco, empiezas con un sistema.",
    sections: [
      {
        h2: "Qué es Initia",
        body: [
          "La mayoría de empresas que abren Notion se quedan a medias: unas cuantas páginas sueltas, tres bases de datos que nadie mantiene y el trabajo real siguiendo en el correo y en hojas de cálculo. La herramienta está, pero el sistema no.",
          "Initia resuelve justo eso. Diseñamos y montamos la estructura completa de tu espacio —bases de datos conectadas, equipos, vistas por rol y permisos— pensada para cómo trabaja de verdad tu empresa. Cuando lo entregamos, no es una plantilla vacía: es tu operación, ya modelada.",
        ],
      },
      {
        h2: "Para quién es",
        body: [
          "Para empresas que quieren centralizar su información y dejar de perseguir datos entre herramientas. Da igual si nunca has usado Notion o si ya lo tienes hecho un caos: partimos de tu realidad y montamos algo que tu equipo pueda usar sin depender de una sola persona.",
          "Es el punto de entrada natural al ecosistema Kairos. Casi todos nuestros clientes empiezan aquí, porque sin una base ordenada no hay automatización ni activo a medida que aguante.",
        ],
      },
      {
        h2: "Cómo trabajamos",
        body: [
          "Primero entendemos tu operación: qué procesos tienes, qué información manejas y dónde se pierde el tiempo hoy. Con eso diseñamos la arquitectura del espacio y la construimos contigo, no de espaldas a ti.",
          "Y no te dejamos solo con el sistema montado. Formamos a tu equipo en directo para que sepa usarlo, documentamos lo esencial y dejamos todo listo para que el conocimiento viva en el espacio, no en la cabeza de alguien.",
        ],
      },
    ],
    incluye: [
      "Auditoría de tu operación actual y diseño de la arquitectura de datos.",
      "Bases de datos conectadas, vistas por rol y sistema de permisos.",
      "Estructura de equipos y espacios para toda la empresa.",
      "Formación en directo a tu equipo para usarlo desde el primer día.",
      "Documentación base para que el sistema no dependa de una persona.",
    ],
    resultado: "Un espacio operativo y un equipo que sabe usarlo.",
    relatedCases: ["mintech-management", "finanzas-conscientes", "el-martillo"],
    relatedPillar: { href: "/implantacion-notion", label: "Implantación de Notion" },
    cta: {
      title: "¿Montamos tu espacio en Notion?",
      body: "En una llamada gratuita entendemos cómo trabajas hoy y te decimos con honestidad por dónde empezar. Sin compromiso.",
    },
  },
  {
    slug: "flux",
    key: "Flux",
    product: "flux.png",
    eyebrow: "Activo · Flux",
    keyword: "automatización de procesos",
    h1: "Automatización de procesos: que la información viaje sola",
    metaTitle: "Flux · Automatización de procesos | Activos Kairos",
    metaDescription:
      "Conectamos tus herramientas y automatizamos altas, seguimientos, informes y avisos con Make y n8n. La información viaja sola entre sistemas, sin copiar y pegar.",
    lead:
      "Flux es nuestra automatización de procesos: conectamos las herramientas que ya usas y hacemos que la información viaje sola entre ellas. Se acabó el copiar y pegar, el reintroducir datos y el «se me ha olvidado avisar».",
    sections: [
      {
        h2: "Qué es Flux",
        body: [
          "Cada vez que un dato se copia a mano de un sitio a otro, pierdes tiempo y abres la puerta a un error. Multiplícalo por todas las altas, seguimientos, informes y avisos de tu semana y tienes a tu equipo haciendo de puente entre sistemas en lugar de trabajar.",
          "Flux automatiza ese trabajo invisible. Con Make y n8n conectamos tus aplicaciones y montamos los flujos que hoy ejecutas a mano, para que ocurran solos: en segundo plano, a la hora que toca y sin que nadie tenga que acordarse.",
        ],
      },
      {
        h2: "Para quién es",
        body: [
          "Para equipos que ya tienen su información ordenada —normalmente después de Initia— y notan que se les va el día en tareas repetitivas: pasar datos entre CRM, correo, facturación y hojas de cálculo, montar informes a mano o perseguir seguimientos.",
          "Si sientes que tu empresa funciona «a fuerza de recordar», la automatización es lo que convierte esa memoria en un sistema que no se olvida.",
        ],
      },
      {
        h2: "Cómo trabajamos",
        body: [
          "Mapeamos tus flujos actuales y detectamos cuáles se repiten y se pueden automatizar sin riesgo. Priorizamos por impacto: primero lo que más tiempo te devuelve.",
          "Construimos cada automatización con control de errores y avisos, para que si algo falla te enteres tú antes que tu cliente. Y la documentamos, para que sepas qué hace cada pieza y por qué.",
        ],
      },
    ],
    incluye: [
      "Mapa de tus flujos actuales y plan de automatización por prioridad.",
      "Conexión de tus herramientas (CRM, correo, facturación, formularios…).",
      "Automatizaciones en Make o n8n con control de errores y alertas.",
      "Informes y avisos automáticos que antes montabas a mano.",
      "Documentación de cada flujo para que sepas qué hace y por qué.",
    ],
    resultado: "Una operación que ahorra tiempo y se sostiene sola.",
    relatedCases: ["finanzas-conscientes", "biventia", "el-martillo"],
    relatedPillar: { href: "/automatizacion-ia", label: "Automatización con IA" },
    cta: {
      title: "¿Qué tareas podrías dejar de hacer a mano?",
      body: "Cuéntanoslo en una llamada gratuita. Detectamos dónde pierdes tiempo hoy y te decimos qué se puede automatizar. Sin compromiso.",
    },
  },
  {
    slug: "sophos",
    key: "Sophos",
    product: "sophos.png",
    eyebrow: "Activo · Sophos",
    keyword: "sistemas a medida en Notion",
    h1: "Sistemas a medida en Notion, documentados y con formación",
    metaTitle: "Sophos · Activos a medida en Notion | Activos Kairos",
    metaDescription:
      "Diseñamos y construimos los activos que tu operación necesita: sistemas a medida en Notion, documentados y con formación, para que el conocimiento deje de vivir en cabezas.",
    lead:
      "Sophos son los activos a medida de tu empresa: los sistemas y procesos que tu operación necesita, diseñados, construidos, documentados y con formación incluida. Para que el conocimiento deje de vivir en la cabeza de una persona.",
    sections: [
      {
        h2: "Qué es Sophos",
        body: [
          "Hay procesos que ninguna plantilla resuelve porque son tuyos: tu forma de gestionar clientes, tus operaciones, tu manera de controlar el dinero. Cuando ese proceso solo lo sabe hacer una persona, tu empresa depende de ella. Si se va, se va el conocimiento.",
          "Sophos convierte esos procesos en activos: sistemas construidos a tu medida en Notion, documentados paso a paso y con tu equipo formado para usarlos. Deja de ser algo que «sabe fulano» y pasa a ser algo que la empresa posee.",
        ],
      },
      {
        h2: "Para quién es",
        body: [
          "Para empresas con procesos propios que hoy dependen de personas clave o viven repartidos entre herramientas y documentos sueltos. Si perder a alguien del equipo te daría vértigo por todo lo que se llevaría en la cabeza, esto es para ti.",
          "También para quien quiere escalar: no puedes crecer sobre procesos que solo existen en la memoria de dos personas.",
        ],
      },
      {
        h2: "Cómo trabajamos",
        body: [
          "Nos sentamos con quien hoy ejecuta el proceso, lo entendemos a fondo y lo rediseñamos para que sea claro, repetible y a prueba de olvidos. Luego lo construimos en Notion, conectado con el resto de tu espacio.",
          "Cada activo se entrega documentado y con formación, de modo que cualquier persona del equipo —incluida la que entre mañana— pueda ejecutarlo sin depender de nadie.",
        ],
      },
    ],
    incluye: [
      "Análisis del proceso con las personas que hoy lo ejecutan.",
      "Diseño y construcción del activo a medida en Notion.",
      "Documentación paso a paso, lista para onboarding.",
      "Formación a tu equipo para que lo use con autonomía.",
      "Integración con el resto de tu espacio y automatizaciones.",
    ],
    resultado: "Procesos que no dependen de una sola persona.",
    relatedCases: ["mintech-management", "lasaviasabia"],
    relatedPillar: { href: "/implantacion-notion", label: "Implantación de Notion" },
    cta: {
      title: "¿Qué proceso te gustaría dejar de sostener a mano?",
      body: "En una llamada gratuita lo revisamos juntos y te decimos cómo convertirlo en un activo que funciona solo. Sin compromiso.",
    },
  },
  {
    slug: "tempo",
    key: "Tempo",
    product: "tempo.png",
    eyebrow: "Activo · Tempo",
    keyword: "departamento de operaciones externalizado",
    h1: "Tu departamento de Operaciones e IT, como membresía mensual",
    metaTitle: "Tempo · Operaciones e IT como servicio | Activos Kairos",
    metaDescription:
      "Tempo es tu departamento de Operaciones e IT externalizado: cada mes sumamos activos, mejoramos tus sistemas y formamos a tu equipo. Reportes semanales e incidencias incluidas.",
    lead:
      "Tempo es tu departamento de Operaciones e IT en modo membresía. Cada mes sumamos nuevos activos, mejoramos tus sistemas y formamos a tu equipo en lo nuevo. Tu operación no se queda quieta: mejora mes a mes.",
    sections: [
      {
        h2: "Qué es Tempo",
        body: [
          "Montar un buen sistema es el principio, no el final. Tu empresa cambia, aparecen procesos nuevos, surgen ideas de mejora… y sin alguien que le dé ritmo, todo eso se queda en la lista de «algún día».",
          "Tempo pone ese ritmo. Es una membresía mensual en la que actuamos como tu equipo de Operaciones e IT: cada mes construimos nuevos activos, afinamos los que ya tienes y formamos a tu gente en lo que va entrando. Con reportes semanales para que veas siempre en qué se avanza.",
        ],
      },
      {
        h2: "Para quién es",
        body: [
          "Para empresas que ya tienen una base sólida y no quieren que se estanque. En vez de contratar y sostener un departamento de operaciones interno, tienes al equipo de Kairos trabajando en tu operación cada mes, por una cuota fija.",
          "Es el activo de quien entiende que la operativa es algo vivo: se cuida, se mejora y se acompaña.",
        ],
      },
      {
        h2: "Qué incluye cada mes",
        body: [
          "Un flujo continuo de mejoras: nuevos activos, ajustes sobre lo existente, formación a tu equipo y gestión de incidencias. Tú priorizas junto a nosotros qué es lo más importante cada mes.",
          "Y todo con visibilidad: reportes semanales de lo hecho y lo siguiente, para que nunca tengas que preguntarte en qué se está trabajando.",
        ],
      },
    ],
    incluye: [
      "Construcción de nuevos activos cada mes, según tu prioridad.",
      "Mejora continua de los sistemas y automatizaciones que ya tienes.",
      "Formación recurrente a tu equipo en lo nuevo.",
      "Gestión de incidencias incluida.",
      "Reportes semanales de avance.",
    ],
    resultado: "Una operativa que no deja de mejorar, mes a mes.",
    relatedCases: ["finanzas-conscientes", "biventia", "el-martillo"],
    relatedPillar: { href: "/consultoria-notion", label: "Consultoría Notion" },
    cta: {
      title: "¿Quieres un equipo de operaciones sin montar el departamento?",
      body: "Te contamos cómo funciona la membresía en una llamada gratuita y vemos si encaja con tu empresa. Sin compromiso.",
    },
  },
  {
    slug: "stasis",
    key: "Stasis",
    product: "stasis.png",
    eyebrow: "Activo · Stasis",
    keyword: "soporte y mantenimiento de Notion",
    h1: "Soporte y mantenimiento continuo de tus sistemas",
    metaTitle: "Stasis · Soporte y mantenimiento | Activos Kairos",
    metaDescription:
      "Stasis mantiene tus sistemas vivos: resolvemos errores e incidencias de forma ilimitada y actualizamos tus automatizaciones. Respuesta en 24 h laborables, sin permanencia.",
    lead:
      "Stasis es el soporte y mantenimiento continuo de tus sistemas. Resolvemos errores e incidencias de forma ilimitada y mantenemos tus automatizaciones al día, con respuesta en 24 h laborables y sin permanencia.",
    sections: [
      {
        h2: "Qué es Stasis",
        body: [
          "Las automatizaciones y los sistemas no son «montar y olvidar». Una herramienta que actualiza su API, una integración que cambia, un flujo que empieza a fallar en silencio: si nadie está pendiente, el problema lo descubre tu cliente antes que tú.",
          "Stasis es tener a alguien pendiente. Un equipo que mantiene tus sistemas al día, resuelve las incidencias que surjan y se asegura de que todo lo que montamos siga funcionando mañana igual que hoy.",
        ],
      },
      {
        h2: "Para quién es",
        body: [
          "Para cualquier empresa con sistemas o automatizaciones en producción que no puede permitirse que se caigan. Si tu operación ya depende de que los flujos funcionen, necesitas una red debajo.",
          "Funciona por sí solo o como complemento natural de los demás activos: lo que construimos, lo mantenemos.",
        ],
      },
      {
        h2: "Cómo trabajamos",
        body: [
          "Atendemos tus incidencias de forma ilimitada, con respuesta en 24 horas laborables. Cada incidencia se registra, se resuelve y se documenta, para que no vuelva a pasar por la misma causa.",
          "Además mantenemos tus sistemas actualizados y a tu equipo siempre apoyado en la última tecnología. Sin permanencia: seguimos porque funciona, no porque haya un contrato que te ate.",
        ],
      },
    ],
    incluye: [
      "Resolución ilimitada de errores e incidencias.",
      "Respuesta en 24 h laborables.",
      "Mantenimiento y actualización de tus automatizaciones y sistemas.",
      "Registro y documentación de cada incidencia.",
      "Sin permanencia.",
    ],
    resultado: "Estabilidad continua y respuesta en 24 h laborables.",
    relatedCases: ["lasaviasabia", "el-martillo"],
    relatedPillar: { href: "/consultoria-notion", label: "Consultoría Notion" },
    cta: {
      title: "¿Tus sistemas tienen quien los cuide?",
      body: "Si ya tienes automatizaciones en marcha, te contamos cómo funciona el soporte de Stasis en una llamada gratuita. Sin compromiso.",
    },
  },
];

export const ACTIVOS_BY_SLUG: Record<string, ActivoContent> = Object.fromEntries(
  ACTIVOS.map((a) => [a.slug, a]),
);
