import { defineRouting } from "next-intl/routing";

// Idiomas que sirve la web. El idioma por defecto se sirve en `/`,
// el resto con prefijo (`/en`, `/it`, ...).
//
// Sólo se listan idiomas con el contenido REALMENTE traducido: un locale
// declarado en hreflang cuyo cuerpo sigue en español es contenido duplicado
// a ojos de Google. `fr` se retiró por eso (ver redirects en next.config.ts).
export const routing = defineRouting({
  locales: ["es", "en", "it", "pt"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Etiquetas del selector de idioma (cada una en su propio idioma).
export const LOCALE_LABELS: Record<string, string> = {
  es: "Español",
  en: "English",
  it: "Italiano",
  pt: "Português",
};
