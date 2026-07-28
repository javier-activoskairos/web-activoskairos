import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Cabeceras de seguridad aplicadas a todo el sitio (Next + funnel estático).
// La CSP va en modo Report-Only para no romper el inline JS/CSS de las landings;
// una vez validada sin violaciones, se pasa a Content-Security-Policy (enforce).
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
  "font-src 'self' https://api.fontshare.com https://cdn.fontshare.com data:",
  "img-src 'self' data: https:",
  "connect-src 'self' https://n8n.activoskairos.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://region1.google-analytics.com",
  "frame-src https://calendar.notion.so https://app.notion.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://n8n.activoskairos.com",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=15552000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
];

// Slugs legales antiguos -> canónicos cortos (301). Cubre `/` (es) y prefijos de idioma.
const LEGAL_REDIRECTS = [
  ["aviso-legal", "legal"],
  ["politica-privacidad", "privacidad"],
  ["politica-cookies", "cookies"],
  ["terminos-condiciones", "tyc"],
];

const nextConfig: NextConfig = {
  // Imágenes remotas permitidas por proyecto (añadir dominios del cliente).
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return LEGAL_REDIRECTS.flatMap(([oldSlug, newSlug]) => [
      { source: `/${oldSlug}`, destination: `/${newSlug}`, permanent: true },
      {
        source: `/:locale(en|fr|it|pt)/${oldSlug}`,
        destination: `/:locale/${newSlug}`,
        permanent: true,
      },
    ]);
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
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
