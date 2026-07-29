// Contenido de las 3 páginas pilar (tarea SEO 12). Son las páginas "cabecera"
// que atacan la keyword head y enlazan hacia abajo a los activos (spokes) y a
// los casos. BORRADOR de copy (rol Homero): dolor antes que feature, registro
// "nosotros → tú", cero cifras ni casos inventados (los números viven en las
// páginas de caso). Cada una: 1000-1500 palabras, proceso, FAQ propia con
// schema FAQPage, CTA y enlaces internos. Sin precios inventados.

export type FaqItem = { q: string; a: string };

export type PillarContent = {
  slug: string; // ruta sin prefijo, p. ej. "/consultoria-notion"
  keyword: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: { h2: string; body: string[] }[];
  proceso: { n: string; t: string; d: string }[];
  activos: string[]; // slugs de /activos
  casos: string[]; // slugs de /casos
  faq: FaqItem[];
  cta: { title: string; body: string };
};

export const PILARES: PillarContent[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "/consultoria-notion",
    keyword: "consultoría de Notion",
    eyebrow: "Consultoría Notion",
    h1: "Consultoría de Notion para poner orden en tu empresa",
    metaTitle: "Consultoría de Notion para empresas | Activos Kairos",
    metaDescription:
      "Consultoría de Notion para ordenar tu operación: auditamos cómo trabajas, diseñamos tu sistema y lo implantamos con tu equipo. De la herramienta a un activo que funciona solo.",
    lead:
      "Notion no ordena tu empresa por ti. Nuestra consultoría de Notion parte de cómo trabajas hoy, diseña el sistema que de verdad necesitas y lo pone en marcha con tu equipo, para que la herramienta se convierta en una operación que se sostiene sola.",
    sections: [
      {
        h2: "Por qué Notion no basta por sí solo",
        body: [
          "Casi todo el mundo llega a Notion igual: alguien lo prueba, monta cuatro páginas, importa una plantilla enorme que ha visto en YouTube y, dos semanas después, el equipo sigue trabajando en el correo y en hojas de cálculo. La herramienta es potente, pero una herramienta no es un sistema. Sin una estructura pensada para tu operación, Notion se convierte en un cajón más donde perder cosas.",
          "El problema casi nunca es Notion: es que nadie ha traducido tu forma de trabajar a un sistema. Qué información manejas, quién necesita ver qué, qué procesos se repiten cada semana, dónde se pierde el tiempo hoy. Sin responder a eso, cualquier plantilla —por bonita que sea— se queda a medias.",
          "Ahí entra una consultoría de Notion. No se trata de darte más páginas, sino de entender tu empresa y montar la estructura mínima que la ordena: bases de datos conectadas, vistas por rol, permisos claros y procesos que cualquiera del equipo pueda seguir sin preguntar.",
        ],
      },
      {
        h2: "Qué hacemos en una consultoría de Notion",
        body: [
          "Lo primero es escuchar y mirar. Nos sentamos con las personas que ejecutan el trabajo cada día y mapeamos la operación real —no la que está en el organigrama, la de verdad—. De ahí sale un diagnóstico honesto: qué funciona, qué se hace tres veces, qué depende de una sola persona y qué se te está cayendo sin que lo veas.",
          "Con ese mapa diseñamos la arquitectura de tu espacio: las bases de datos que necesitas, cómo se relacionan entre sí, qué vistas ve cada rol y cómo fluyen los permisos. Después lo construimos contigo, no de espaldas a ti, y formamos a tu equipo para que lo use desde el primer día. Un sistema que nadie sabe usar no sirve de nada.",
          "Y no terminamos al entregar. La consultoría deja documentado lo esencial para que el conocimiento viva en el espacio y no en la cabeza de alguien, y abre la puerta a lo siguiente: automatizar lo repetitivo y construir los activos a medida que tu operación pida.",
        ],
      },
      {
        h2: "Del diagnóstico al ecosistema de activos",
        body: [
          "Una buena consultoría no acaba en un PDF con recomendaciones que nadie aplica. Acaba en un sistema en marcha. Por eso trabajamos por activos: piezas concretas que resuelven una parte de tu operación y que se van sumando según lo que necesites.",
          "Casi todo empieza por la implantación del espacio base, sigue por automatizar lo que hoy haces a mano y, cuando hace falta, se construyen sistemas a medida para tus procesos propios. Si quieres que la operación no se estanque, existe además un acompañamiento mensual que le da ritmo. Tú decides hasta dónde; nosotros nos aseguramos de que cada paso se apoye en el anterior.",
        ],
      },
    ],
    proceso: [
      { n: "1", t: "Diagnóstico", d: "Entendemos tu operación real y detectamos dónde se pierde el tiempo y de quién dependes." },
      { n: "2", t: "Diseño", d: "Definimos la arquitectura del espacio: bases de datos, relaciones, vistas por rol y permisos." },
      { n: "3", t: "Construcción", d: "Montamos el sistema en Notion contigo y lo conectamos con las herramientas que ya usas." },
      { n: "4", t: "Formación", d: "Formamos a tu equipo en directo para que lo use con autonomía desde el primer día." },
      { n: "5", t: "Acompañamiento", d: "Documentamos, automatizamos lo repetitivo y, si quieres, seguimos mejorándolo mes a mes." },
    ],
    activos: ["initia", "sophos", "tempo"],
    casos: ["mintech-management", "finanzas-conscientes", "el-martillo"],
    faq: [
      {
        q: "¿Qué incluye una consultoría de Notion?",
        a: "Un diagnóstico de tu operación actual, el diseño de la arquitectura de tu espacio (bases de datos, vistas y permisos), la construcción del sistema en Notion y la formación de tu equipo para usarlo. A partir de ahí, se pueden sumar automatizaciones y activos a medida.",
      },
      {
        q: "¿Necesito saber usar Notion antes de empezar?",
        a: "No. Partimos de tu realidad, tanto si nunca has usado Notion como si ya lo tienes montado y hecho un caos. La formación a tu equipo forma parte del trabajo, precisamente para que no dependas de un experto para usarlo.",
      },
      {
        q: "¿Cuánto tarda una implantación?",
        a: "Depende del tamaño de la empresa y del alcance del sistema. Antes de empezar acordamos un plan por fases para que veas avances pronto y no tengas que esperar meses a un gran lanzamiento. Lo concretamos en la primera llamada.",
      },
      {
        q: "¿Trabajáis con mi equipo o lo hacéis por vuestra cuenta?",
        a: "Contigo. Diseñar el sistema de espaldas al equipo que lo va a usar es la forma más segura de que no se use. Construimos con vosotros y os formamos, para que el conocimiento se quede dentro.",
      },
      {
        q: "¿Y si ya uso otras herramientas como un CRM, Monday o Excel?",
        a: "No hace falta tirar nada por sistema. Analizamos qué merece la pena centralizar en Notion y qué conviene conectar mediante automatizaciones. El objetivo es que la información viaje sola entre tus herramientas, no duplicar trabajo.",
      },
      {
        q: "¿Qué pasa después de la implantación?",
        a: "El sistema queda documentado y en manos de tu equipo. Si quieres que siga creciendo y mejorando, existe un acompañamiento mensual; y si prefieres solo tener cubierta la parte de incidencias y mantenimiento, también. Sin permanencia obligatoria.",
      },
    ],
    cta: {
      title: "¿Ponemos orden en tu operación?",
      body: "En una llamada gratuita entendemos cómo trabajas hoy y te decimos con honestidad por dónde empezar. Sin compromiso.",
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "/implantacion-notion",
    keyword: "implantación de Notion",
    eyebrow: "Implantación de Notion",
    h1: "Implantación de Notion llave en mano para tu empresa",
    metaTitle: "Implantación de Notion llave en mano | Activos Kairos",
    metaDescription:
      "Implantación de Notion de principio a fin: diseñamos y montamos tu espacio —bases de datos, vistas y permisos— y formamos a tu equipo para usarlo desde el día uno.",
    lead:
      "Una buena implantación de Notion no te deja con una hoja en blanco, te deja con un sistema. Diseñamos y montamos el espacio de trabajo de tu empresa —bases de datos, equipos, vistas y permisos— y formamos a tu equipo para que lo use desde el primer día.",
    sections: [
      {
        h2: "El problema de montar Notion por tu cuenta",
        body: [
          "Notion parece fácil hasta que intentas montar en serio la operación de una empresa. Empiezas con ilusión, creas páginas, pruebas bases de datos… y a las pocas semanas tienes un espacio a medio hacer: relaciones que no cuadran, vistas duplicadas, permisos que nadie controla y la mitad del equipo que sigue trabajando por fuera porque «no se aclara».",
          "El resultado es lo peor de los dos mundos: has invertido tiempo y sigues sin un sistema. Y cuanto más crece ese Notion improvisado, más cuesta arreglarlo, porque cada parche se apoya en el anterior.",
          "Una implantación de Notion bien hecha se salta todo eso. En lugar de ir probando, se parte de cómo trabaja tu empresa y se construye la estructura correcta a la primera: pensada para escalar, para que la use cualquiera y para que no dependa de la persona que la montó.",
        ],
      },
      {
        h2: "Qué implantamos exactamente",
        body: [
          "Montamos la estructura completa de tu espacio de trabajo. Las bases de datos que tu operación necesita, conectadas entre sí para que un dato se escriba una vez y aparezca donde tenga que aparecer. Las vistas por rol, para que cada persona vea lo suyo sin ruido. Y el sistema de permisos y equipos, para que la información esté donde debe y solo la vea quien debe.",
          "Cuando te lo entregamos no es una plantilla vacía que tendrás que rellenar tú: es tu operación, ya modelada. Y va acompañada de formación en directo y de la documentación esencial, para que el equipo entre a usarlo sin curva de sufrimiento y sin depender de nosotros para cada duda.",
        ],
      },
      {
        h2: "El punto de entrada al ecosistema",
        body: [
          "La implantación es la base sobre la que se construye todo lo demás. Sin un espacio ordenado no hay automatización que aguante ni activo a medida que tenga sentido: estarías automatizando el caos. Por eso casi todos nuestros clientes empiezan aquí.",
          "Una vez el espacio está en marcha, lo natural es automatizar lo repetitivo para que la información viaje sola y, cuando aparecen procesos propios que dependen de personas clave, convertirlos en activos documentados. La implantación abre esa puerta; tú decides cuándo cruzarla.",
        ],
      },
    ],
    proceso: [
      { n: "1", t: "Auditoría", d: "Analizamos tu operación actual: procesos, información y dónde se pierde el tiempo hoy." },
      { n: "2", t: "Arquitectura", d: "Diseñamos las bases de datos, relaciones, vistas por rol y permisos de tu espacio." },
      { n: "3", t: "Construcción", d: "Montamos el espacio completo en Notion y lo dejamos listo para trabajar, no vacío." },
      { n: "4", t: "Formación", d: "Formamos a tu equipo en directo y documentamos lo esencial para que sea autónomo." },
    ],
    activos: ["initia", "sophos", "flux"],
    casos: ["mintech-management", "finanzas-conscientes", "lasaviasabia"],
    faq: [
      {
        q: "¿Qué diferencia hay entre una plantilla y una implantación de Notion?",
        a: "Una plantilla es una estructura genérica que tendrás que adaptar tú a tu empresa. Una implantación parte de cómo trabajas de verdad y monta el sistema a tu medida, con tus bases de datos, tus vistas y tu equipo formado. Recibes una operación modelada, no un punto de partida.",
      },
      {
        q: "¿Puedo aprovechar el Notion que ya tengo montado?",
        a: "Sí. Revisamos lo que ya tienes, rescatamos lo que funciona y reconstruimos lo que no. No hace falta empezar de cero si hay una base útil.",
      },
      {
        q: "¿Cuánto se tarda en implantar Notion?",
        a: "Depende del tamaño de la empresa y del alcance. Trabajamos por fases para que veas avances pronto en lugar de esperar a un único gran lanzamiento. El calendario concreto lo acordamos en la primera llamada.",
      },
      {
        q: "¿Formáis a mi equipo o me entregáis el sistema y ya está?",
        a: "Formamos a tu equipo en directo como parte de la implantación, y dejamos la documentación esencial. Un sistema que nadie sabe usar no sirve de nada, así que la formación no es un extra: es parte del trabajo.",
      },
      {
        q: "¿Qué pasa si después necesito cambios o automatizaciones?",
        a: "La implantación es la base. A partir de ahí puedes automatizar lo repetitivo, construir activos a medida o sumar un acompañamiento mensual para que el sistema siga creciendo. Cada paso se apoya en el anterior.",
      },
      {
        q: "¿Notion sirve para mi tipo de empresa?",
        a: "Trabajamos con empresas de sectores muy distintos —desde fondos de inversión hasta consultoras o negocios de sostenibilidad— porque lo que se implanta se adapta a cada operación. En la llamada te decimos con honestidad si encaja en tu caso.",
      },
    ],
    cta: {
      title: "¿Montamos tu espacio en Notion?",
      body: "En una llamada gratuita entendemos cómo trabajas y te proponemos por dónde empezar. Sin compromiso.",
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "/automatizacion-ia",
    keyword: "automatización con IA",
    eyebrow: "Automatización con IA",
    h1: "Automatización con IA para tu operación diaria",
    metaTitle: "Automatización con IA para empresas | Activos Kairos",
    metaDescription:
      "Automatización con IA y no-code: conectamos tus herramientas con Make y n8n y sumamos agentes de IA para que la información viaje y se procese sola. Sin copiar y pegar.",
    lead:
      "La automatización con IA no va de sustituir a tu equipo, va de quitarle el trabajo invisible. Conectamos las herramientas que ya usas y sumamos inteligencia artificial donde aporta, para que la información viaje y se procese sola. Se acabó el copiar y pegar.",
    sections: [
      {
        h2: "El coste oculto de trabajar a mano",
        body: [
          "Cada vez que alguien copia un dato de un sitio a otro, pierdes dos cosas: tiempo y fiabilidad. Un número mal pegado, un aviso que se olvida, un informe que se monta a mano cada lunes. Por separado parecen pequeñas tareas; sumadas, son un equipo entero haciendo de puente entre aplicaciones en lugar de trabajar en lo que importa.",
          "Lo más caro no es ni siquiera el tiempo: es que tu empresa funcione «a fuerza de recordar». Mientras la operación dependa de que alguien se acuerde de hacer cada paso, cualquier despiste se paga con un cliente molesto o un dato equivocado. Y eso no escala.",
          "La automatización con IA convierte ese trabajo invisible en un sistema que no se olvida. Los flujos ocurren solos, a la hora que toca, y la inteligencia artificial se encarga de las partes que antes exigían que una persona leyera, clasificara o redactara.",
        ],
      },
      {
        h2: "Qué automatizamos y dónde entra la IA",
        body: [
          "Conectamos tus aplicaciones con herramientas no-code como Make y n8n, y montamos los flujos que hoy ejecutas a mano: altas de clientes, seguimientos, informes, avisos, traspaso de datos entre CRM, correo y facturación. Todo lo que sea repetible y siga una regla, puede dejar de hacerse a mano.",
          "La capa de IA entra donde el trabajo no es mecánico sino de criterio: clasificar mensajes que llegan sin estructura, resumir información dispersa, redactar borradores, responder consultas frecuentes o extraer datos de documentos. Son agentes que trabajan dentro de tus flujos, no un juguete aparte.",
          "Y todo se monta con red de seguridad: control de errores y alertas para que, si algo falla, te enteres tú antes que tu cliente. Cada automatización se documenta, para que sepas qué hace cada pieza y por qué, y no dependas de nadie para entender tu propia operación.",
        ],
      },
      {
        h2: "Sobre una base ordenada, no sobre el caos",
        body: [
          "Automatizar un desorden solo te da un desorden más rápido. Por eso la automatización rinde de verdad cuando la información ya vive ordenada —normalmente después de implantar el espacio de trabajo—. Con una base sólida, cada flujo que conectamos suma; sin ella, se rompe al primer cambio.",
          "Por eso trabajamos la automatización como una pieza más del ecosistema: se apoya en un Notion bien montado, se conecta con tus herramientas y, cuando lo necesita, se mantiene al día para que no se caiga con la próxima actualización de una API. Automatizar es fácil; que siga funcionando dentro de un año es lo que marca la diferencia.",
        ],
      },
    ],
    proceso: [
      { n: "1", t: "Mapa de flujos", d: "Detectamos qué tareas se repiten y cuáles se pueden automatizar sin riesgo." },
      { n: "2", t: "Prioridad", d: "Empezamos por lo que más tiempo te devuelve, no por lo más vistoso." },
      { n: "3", t: "Construcción", d: "Montamos los flujos en Make o n8n, con IA donde aporta y control de errores." },
      { n: "4", t: "Documentación", d: "Dejamos cada flujo documentado y con alertas, para que sepas qué hace y por qué." },
    ],
    activos: ["flux", "tempo", "stasis"],
    casos: ["biventia", "finanzas-conscientes", "el-martillo"],
    faq: [
      {
        q: "¿Qué es la automatización con IA en la práctica?",
        a: "Es unir dos cosas: flujos que conectan tus herramientas para que los datos viajen solos, y agentes de inteligencia artificial que se encargan de las tareas de criterio —clasificar, resumir, redactar o responder— dentro de esos flujos. El resultado es una operación que avanza sin intervención manual.",
      },
      {
        q: "¿Qué herramientas usáis para automatizar?",
        a: "Principalmente Make y n8n, dos plataformas no-code que conectan con casi cualquier aplicación. Sobre esa base añadimos modelos de IA donde tiene sentido. Trabajamos con las herramientas que ya usas siempre que se pueda, para no obligarte a cambiarlo todo.",
      },
      {
        q: "¿Necesito tener Notion o un sistema montado antes?",
        a: "Ayuda mucho. Automatizar sobre información desordenada solo acelera el desorden. Lo ideal es partir de una base ordenada; si aún no la tienes, la montamos primero y automatizamos después.",
      },
      {
        q: "¿Qué pasa si una automatización falla?",
        a: "Cada flujo se construye con control de errores y alertas, de modo que si algo se rompe te avisa a ti antes de que lo note tu cliente. Además, el mantenimiento continuo se encarga de que las automatizaciones sigan funcionando cuando una herramienta cambia o actualiza su API.",
      },
      {
        q: "¿La IA va a sustituir a mi equipo?",
        a: "No es el objetivo. La idea es quitarle a tu equipo el trabajo repetitivo y de bajo valor para que dedique su tiempo a lo que de verdad importa. La IA hace de asistente dentro de los procesos, no toma las decisiones por ti.",
      },
      {
        q: "¿Podéis automatizar procesos concretos de mi sector?",
        a: "Sí. Hemos automatizado operaciones muy distintas —desde la gestión de socios de una firma de inversión hasta el control financiero de un grupo de empresas—. Partimos de tu proceso real, no de una receta genérica. En la llamada vemos qué encaja en tu caso.",
      },
    ],
    cta: {
      title: "¿Qué tareas podrías dejar de hacer a mano?",
      body: "Cuéntanoslo en una llamada gratuita. Detectamos dónde pierdes tiempo hoy y te decimos qué se puede automatizar. Sin compromiso.",
    },
  },
];

export const PILARES_BY_SLUG: Record<string, PillarContent> = Object.fromEntries(
  PILARES.map((p) => [p.slug, p]),
);
