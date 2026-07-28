import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

// Rutas del sitio (sin prefijo de idioma). Añadir aquí cada página nueva.
const paths = [""];

// Páginas legales: contenido solo en español (jurisdicción). Se indexan una
// sola vez, en el locale por defecto (sin prefijo), para evitar duplicados.
const legalPaths = ["legal", "privacidad", "cookies", "tyc"];

const localeUrl = (locale: string, path: string) => {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteUrl}${prefix}${path ? `/${path}` : ""}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Cada URL declara sus alternativas de idioma; así Google no tiene que
  // deducir la relación entre `/`, `/en`, `/it` y `/pt`.
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

  return [...localized, ...legal];
}
