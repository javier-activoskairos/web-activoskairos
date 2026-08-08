import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CoursesHub } from "@/components/site/cursos/CoursesHub";
import { JsonLd } from "@/components/site/JsonLd";
import { CURSOS, HUB } from "@/content/cursos";
import { siteUrl } from "@/lib/site";
import { buildContentMeta } from "@/lib/content-meta";

export async function generateMetadata(): Promise<Metadata> {
  return buildContentMeta({
    title: HUB.metaTitle,
    description: HUB.metaDescription,
    path: "/cursos",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Solo se listan los cursos con página propia: un ItemList apuntando a rutas
  // que no existen sería un enlace roto para el rastreador.
  const disponibles = CURSOS.filter((c) => c.estado === "disponible");
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cursos de Activos Kairos",
    itemListElement: disponibles.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.nombre,
      url: `${siteUrl}/cursos/${c.slug}`,
    })),
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cursos",
        item: `${siteUrl}/cursos`,
      },
    ],
  };

  return (
    <div className="kairos-site">
      <JsonLd data={listLd} />
      <JsonLd data={crumbsLd} />
      <CoursesHub />
    </div>
  );
}
