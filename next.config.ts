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
  async rewrites() {
    // Landings estáticas del funnel (public/) servidas con URL limpia sin .html.
    return [
      { source: "/test-caos-operativo", destination: "/test-caos-operativo/index.html" },
      { source: "/reserva", destination: "/test-caos-operativo/reserva-llamada.html" },
    ];
  },
};

export default withNextIntl(nextConfig);
