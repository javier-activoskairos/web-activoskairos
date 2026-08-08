import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NotionAiLanding } from "@/components/site/cursos/NotionAiLanding";
import { JsonLd } from "@/components/site/JsonLd";
import { NOTION_AI, notionAiCourse, COMMUNITY_URL } from "@/content/cursos";
import { siteUrl } from "@/lib/site";
import { buildContentMeta } from "@/lib/content-meta";

const PATH = "/cursos/notion-ai";

export async function generateMetadata(): Promise<Metadata> {
  return buildContentMeta({
    title: NOTION_AI.metaTitle,
    description: NOTION_AI.metaDescription,
    path: PATH,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const url = `${siteUrl}${PATH}`;

  // `Course` + `offers`: el precio sale de la configuración central, así que no
  // puede desincronizarse con lo que ve el visitante. La compra se cierra en
  // Skool, por eso `offers.url` apunta a la comunidad.
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Curso Notion AI",
    description: NOTION_AI.metaDescription,
    url,
    inLanguage: "es",
    provider: {
      "@type": "Organization",
      name: "Activos Kairos",
      url: siteUrl,
    },
    // Sin `courseWorkload`: no hay una duración medida del curso y no se
    // inventa un dato que Google mostraría como si fuera oficial.
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
    },
    offers: {
      "@type": "Offer",
      price: String(notionAiCourse.price),
      priceCurrency: notionAiCourse.currency,
      availability: "https://schema.org/InStock",
      category: "Paid",
      url: COMMUNITY_URL,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: NOTION_AI.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
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
      { "@type": "ListItem", position: 3, name: "Notion AI", item: url },
    ],
  };

  return (
    <div className="kairos-site">
      <JsonLd data={courseLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={crumbsLd} />
      <NotionAiLanding />
    </div>
  );
}
