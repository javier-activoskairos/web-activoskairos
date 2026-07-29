import type { Metadata } from "next";

// Metadatos de una página de contenido (activo, caso, pilar). Fija canonical a
// la ruta SIN prefijo de idioma: el contenido es solo en español, igual que las
// páginas legales, así que todos los locales canonizan a la misma URL y no
// compiten como contenido duplicado. Sobrescribe por completo el OG/Twitter que
// el layout raíz define para la home.
export function buildContentMeta({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string; // p. ej. "/activos/initia"
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: "Activos Kairos",
      url: path,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Activos Kairos" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/opengraph-image" }],
    },
  };
}
