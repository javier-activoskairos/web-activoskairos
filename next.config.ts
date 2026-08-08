import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Slugs legales antiguos -> canónicos cortos (301). Cubre `/` (es) y prefijos de idioma.
const LEGAL_REDIRECTS = [
  ["aviso-legal", "legal"],
  ["politica-privacidad", "privacidad"],
  ["politica-cookies", "cookies"],
  ["terminos-condiciones", "tyc"],
];

// Content-Security-Policy (enforce).
// `unsafe-inline` es inevitable hoy: el sitio usa atributos `style=` por todas
// partes y Next inyecta su bootstrap inline sin nonce. Aun así, el resto de
// directivas sí aporta (clickjacking, inyección de <base>, exfiltración por
// formulario, plugins).
// Orígenes de terceros permitidos explícitamente:
//   · Google Tag Manager / Analytics (GA4 vía gtag) — script + beacons.
//   · Fontshare (fuente de marca Satoshi): CSS por <link> en api., woff2 en cdn.
//   · Google Fonts (JetBrains Mono, la mono de la marca): el @import de
//     `globals.css` sobrevive al build, así que el CSS sale de fonts.googleapis
//     y los woff2 de fonts.gstatic. Sin ambos orígenes la mono no se aplica.
//   · n8n (connect-src): el funnel estático hace fetch() del alta de lead al webhook.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://fonts.googleapis.com",
  "font-src 'self' data: https://api.fontshare.com https://cdn.fontshare.com https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://n8n.activoskairos.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://region1.google-analytics.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // No anunciar el framework ni su versión.
  poweredByHeader: false,

  images: {
    // Imágenes remotas permitidas por proyecto (añadir dominios del cliente).
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // Los originales de /assets se sirven tal cual (sin hash en el nombre),
      // así que se cachean un día en el navegador y una semana en el CDN.
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // www -> apex. Sin esto ambos hosts responden 200 y Google ve contenido
      // duplicado.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.activoskairos.com" }],
        destination: "https://activoskairos.com/:path*",
        permanent: true,
      },
      // Slugs legales antiguos. Ya no hay variante con prefijo de idioma: al no
      // quedar más locales, `/en/aviso-legal` cae primero a `/aviso-legal` por
      // la regla de locales retirados y de ahí a `/legal`.
      ...LEGAL_REDIRECTS.map(([oldSlug, newSlug]) => ({
        source: `/${oldSlug}`,
        destination: `/${newSlug}`,
        permanent: true,
      })),
      // Locales retirados: su tráfico indexado cae al equivalente en español.
      // `fr` nunca tuvo contenido traducido; `pt`, `en` e `it` estaban
      // traducidos pero se dejaron de ofrecer (la web pasa a ser solo español).
      // Se cubren `/xx` y `/xx/loquesea`.
      ...["fr", "pt", "en", "it"].flatMap((loc) => [
        { source: `/${loc}`, destination: "/", permanent: true },
        { source: `/${loc}/:path*`, destination: "/:path*", permanent: true },
      ]),
    ];
  },

  async rewrites() {
    // Landings estáticas del funnel (public/) servidas con URL limpia sin .html.
    return [
      { source: "/test-caos-operativo", destination: "/test-caos-operativo/index.html" },
      { source: "/reserva", destination: "/test-caos-operativo/reserva-llamada.html" },
    ];
  },
};

export default withNextIntl(nextConfig);
