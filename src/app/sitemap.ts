import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { ACTIVOS } from "@/content/activos";
import { CASOS } from "@/content/casos";
import { PILARES } from "@/content/pilares";

// Rutas del sitio (sin prefijo de idioma). Añadir aquí cada página nueva.
const paths = [""];

// Páginas legales: contenido solo en español (jurisdicción). Se indexan una
// sola vez, en el locale por defecto (sin prefijo), para evitar duplicados.
const legalPaths = ["legal", "privacidad", "cookies", "tyc"];

// Landings estáticas del funnel (public/), servidas con URL limpia vía rewrite.
// Solo en español y sin variantes de idioma, así que van como URL única.
const funnelPaths = ["test-caos-operativo"];

// Páginas de contenido SEO (activos, casos, pilares). Solo español, canonical
// a la URL sin prefijo — se indexan una vez. Los slugs salen de los datos, así
// el sitemap se mantiene solo al añadir o quitar páginas.
const contentPaths = [
  ...PILARES.map((p) => p.slug.replace(/^\//, "")),
  ...ACTIVOS.map((a) => `activos/${a.slug}`),
  ...CASOS.map((c) => `casos/${c.slug}`),
];

const localeUrl = (locale: string, path: string) => {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${path ? `/${path}` : ""}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Cada URL declara sus alternativas de idioma; así Google no tiene que
  // deducir la relación entre `/`, `/en` y `/it`.
  const localized = paths.map((path) => ({
    url: localeUrl(routing.defaultLocale, path),
    lastModified,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localeUrl(locale, path)]),
      ),
    },
  }));

  const legal = legalPaths.map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified,
  }));

  const funnel = funnelPaths.map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified,
  }));

  const content = contentPaths.map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified,
  }));

  return [...localized, ...content, ...funnel, ...legal];
}
