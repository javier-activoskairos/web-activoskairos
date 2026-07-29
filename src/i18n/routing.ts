import { defineRouting } from "next-intl/routing";

// Idiomas que sirve la web. El idioma por defecto se sirve en `/`,
// el resto con prefijo (`/en`, `/it`).
//
// Solo se listan idiomas que se ofrecen de verdad. Los retirados redirigen su
// tráfico al español (ver redirects en next.config.ts):
//   · `fr` nunca tuvo contenido traducido: en hreflang habría sido duplicado.
//   · `pt` estaba traducido, pero se deja de ofrecer ese idioma.
export const routing = defineRouting({
  locales: ["es", "en", "it"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Etiquetas del selector de idioma (cada una en su propio idioma).
export const LOCALE_LABELS: Record<string, string> = {
  es: "Español",
  en: "English",
  it: "Italiano",
};
