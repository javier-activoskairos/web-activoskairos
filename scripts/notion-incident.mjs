// Crea una incidencia en [AKS] - Incidencias cuando el monitor de uptime
// detecta que un sitio no responde. Idempotente: si ya hay una incidencia
// abierta (Pendiente/Solucionando) para el mismo sitio, no crea otra.
//
// Sin dependencias externas: fetch nativo (Node >= 18) + REST API de Notion.
//
// Variables de entorno:
//   NOTION_TOKEN            → integración "GitHub Actions Webs y Despliegues"
//   NOTION_INCIDENCIAS_DB   → ID de [AKS] - Incidencias
//   SITE_NAME               → nombre legible del sitio (ej. "Web Activos Kairos")
//   SITE_URL                → URL comprobada
//   HTTP_CODE               → código HTTP observado (o "000" si no respondió)
//
// Si faltan los secrets, avisa y termina sin error (no bloquea el workflow).

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

const {
  NOTION_TOKEN,
  NOTION_INCIDENCIAS_DB,
  SITE_NAME,
  SITE_URL,
  HTTP_CODE,
} = process.env;

if (!NOTION_TOKEN || !NOTION_INCIDENCIAS_DB) {
  console.log(
    "[notion-incident] Faltan NOTION_TOKEN / NOTION_INCIDENCIAS_DB. Aviso omitido.",
  );
  process.exit(0);
}

const site = SITE_NAME || SITE_URL || "Sitio";
const titulo = `🔴 Caída detectada: ${site}`;

const headers = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": NOTION_VERSION,
  "Content-Type": "application/json",
};

async function notion(path, init) {
  const res = await fetch(`${NOTION_API}${path}`, { ...init, headers });
  if (!res.ok) {
    throw new Error(`Notion ${path} → ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

// ¿Ya hay una incidencia abierta para este sitio? Evita duplicados en cada tick.
async function abiertaExiste() {
  const data = await notion(`/databases/${NOTION_INCIDENCIAS_DB}/query`, {
    method: "POST",
    body: JSON.stringify({
      filter: {
        and: [
          { property: "Título", title: { equals: titulo } },
          {
            or: [
              { property: "Estado", status: { equals: "Pendiente" } },
              { property: "Estado", status: { equals: "Solucionando" } },
            ],
          },
        ],
      },
      page_size: 1,
    }),
  });
  return data.results.length > 0;
}

async function crear() {
  const info =
    `Origen: Monitor de uptime (GitHub Actions).\n` +
    `Sitio: ${site}\nURL: ${SITE_URL}\n` +
    `Código HTTP observado: ${HTTP_CODE || "sin respuesta"}.\n` +
    `El monitor comprobará en el siguiente ciclo; si el sitio vuelve, cerrar la incidencia.`;

  const properties = {
    Título: { title: [{ text: { content: titulo } }] },
    Estado: { status: { name: "Pendiente" } },
    Etiqueta: { select: { name: "Error" } },
    "Info Adicional": { rich_text: [{ text: { content: info } }] },
  };
  if (SITE_URL) properties["URL Error"] = { url: SITE_URL };

  const created = await notion(`/pages`, {
    method: "POST",
    body: JSON.stringify({
      parent: { database_id: NOTION_INCIDENCIAS_DB },
      properties,
    }),
  });
  console.log(`[notion-incident] Incidencia creada: ${created.id}`);
}

async function main() {
  if (await abiertaExiste()) {
    console.log("[notion-incident] Ya existe incidencia abierta para este sitio. No se duplica.");
    return;
  }
  await crear();
}

main().catch((err) => {
  console.error(`[notion-incident] Error: ${err.message}`);
  process.exit(1);
});
