import { defineRouting } from "next-intl/routing";

// Idiomas que sirve la web. El idioma por defecto se sirve en `/`; si algún día
// vuelve a haber más de uno, el resto iría con prefijo (`/xx`).
//
// Solo se listan idiomas que se ofrecen de verdad. Los retirados redirigen su
// tráfico al español (ver redirects en next.config.ts):
//   · `fr` nunca tuvo contenido traducido: en hreflang habría sido duplicado.
//   · `pt` estaba traducido, pero se dejó de ofrecer ese idioma.
//   · `en` e `it` se retiran: la web pasa a ser solo en español (decisión de
//     Javier, 08/2026). Sus `messages/*.json` se conservan huérfanos por si
//     se recuperan.
export const routing = defineRouting({
  locales: ["es"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Etiquetas del selector de idioma (cada una en su propio idioma).
export const LOCALE_LABELS: Record<string, string> = {
  es: "Español",
};
