// Metadatos no traducibles de las 5 páginas de caso (/casos/[slug]).
// El TEXTO (sector, resumen, reto, solución, resultados, labels de métrica,
// testimonio) vive en messages/*.json bajo el namespace "Cases" y se lee con
// getTranslations — misma fuente que el carrusel de la home, sin duplicar copy.
// Aquí solo lo eststructural: slug público, logo, cifras reales y recorrido.
// Las cifras y el recorrido son los MISMOS que CASE_META en Cases.jsx (datos
// reales de cada cliente); no se inventa ninguna.

export type CasoMeta = {
  slug: string; // ruta pública (tarea SEO 11)
  key: string; // prefijo en messages "Cases"
  name: string;
  logo: string; // /assets/clients
  logoH: number;
  metricValues: [string, string];
  recorrido: string[]; // activos usados: Initia/Flux/Sophos/Tempo/Stasis
  hasQuote: boolean;
};

export const CASOS: CasoMeta[] = [
  {
    slug: "mintech-management",
    key: "mintech",
    name: "Mintech Management",
    logo: "mintech.png",
    logoH: 64,
    metricValues: ["+10h", "+30"],
    recorrido: ["Initia", "Sophos", "Tempo"],
    hasQuote: false,
  },
  {
    slug: "lasaviasabia",
    key: "lasavia",
    name: "Lasaviasabia",
    logo: "lasaviasabia.png",
    logoH: 88,
    metricValues: ["4h → min", "3h"],
    recorrido: ["Initia", "Sophos", "Stasis"],
    hasQuote: false,
  },
  {
    slug: "finanzas-conscientes",
    key: "finanzas",
    name: "Finanzas Conscientes",
    logo: "finanzas-conscientes.png",
    logoH: 72,
    metricValues: ["−30min", "−15%"],
    recorrido: ["Initia", "Flux", "Tempo"],
    hasQuote: false,
  },
  {
    slug: "biventia",
    key: "biventia",
    name: "Biventia",
    logo: "biventia.png",
    logoH: 84,
    metricValues: ["3h → 30min", "−80%"],
    recorrido: ["Initia", "Flux", "Tempo"],
    hasQuote: false,
  },
  {
    slug: "el-martillo",
    key: "martillo",
    name: "El Martillo",
    logo: "elmartillo.png",
    logoH: 80,
    metricValues: ["20h", "+500"],
    recorrido: ["Initia", "Flux", "Tempo", "Stasis"],
    hasQuote: true,
  },
];

export const CASOS_BY_SLUG: Record<string, CasoMeta> = Object.fromEntries(
  CASOS.map((c) => [c.slug, c]),
);

// Etiqueta legible de cada activo para el enlazado caso → servicio.
export const ACTIVO_LABEL: Record<string, { slug: string; label: string }> = {
  Initia: { slug: "initia", label: "Initia · Implantación de Notion" },
  Flux: { slug: "flux", label: "Flux · Automatización de procesos" },
  Sophos: { slug: "sophos", label: "Sophos · Activos a medida" },
  Tempo: { slug: "tempo", label: "Tempo · Operaciones e IT" },
  Stasis: { slug: "stasis", label: "Stasis · Soporte y mantenimiento" },
};
