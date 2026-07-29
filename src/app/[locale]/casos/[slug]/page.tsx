import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContentLayout } from "@/components/site/ContentLayout";
import { JsonLd } from "@/components/site/JsonLd";
import { CASOS, CASOS_BY_SLUG, ACTIVO_LABEL } from "@/content/casos";
import { buildContentMeta } from "@/lib/content-meta";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return CASOS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = CASOS_BY_SLUG[slug];
  if (!c) return {};
  const t = await getTranslations({ locale, namespace: "Cases" });
  const summary = t(`${c.key}Summary`);
  const title = `${c.name}: caso de éxito en Notion | Activos Kairos`;
  const description = summary.length > 156 ? `${summary.slice(0, 153)}…` : summary;
  return buildContentMeta({
    title,
    description,
    path: `/casos/${c.slug}`,
    type: "article",
  });
}

export default async function CasoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const c = CASOS_BY_SLUG[slug];
  if (!c) notFound();

  const t = await getTranslations({ locale, namespace: "Cases" });
  const sector = t(`${c.key}Sector`);
  const location = t(`${c.key}Location`);
  const summary = t(`${c.key}Summary`);
  const reto = t(`${c.key}Reto`);
  const solucion = t(`${c.key}Solucion`);
  const results = [1, 2, 3, 4].map((n) => t(`${c.key}R${n}`));
  const metrics = [
    { num: c.metricValues[0], lbl: t(`${c.key}M1L`) },
    { num: c.metricValues[1], lbl: t(`${c.key}M2L`) },
  ];
  const journey = c.recorrido
    .map((k) => ACTIVO_LABEL[k])
    .filter(Boolean);

  const url = `${siteUrl}/casos/${c.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.name}: caso de éxito en Notion`,
    description: summary,
    about: `${sector} · ${location}`,
    inLanguage: "es",
    url,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Activos Kairos", url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "Activos Kairos",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/opengraph-image` },
    },
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Casos de éxito", item: `${siteUrl}/#casos` },
      { "@type": "ListItem", position: 3, name: c.name, item: url },
    ],
  };

  return (
    <ContentLayout>
      <JsonLd data={articleLd} />
      <JsonLd data={crumbsLd} />
      <nav className="crumbs" aria-label="Ruta">
        <a href="/">Inicio</a>
        <span className="sep">/</span>
        <a href="/#casos">Casos</a>
        <span className="sep">/</span>
        <span className="cur">{c.name}</span>
      </nav>

      <header className="hero">
        <p className="eyebrow">Caso de éxito · {sector} · {location}</p>
        <h1>{c.name}</h1>
        <p className="lead">{summary}</p>
        <div className="pillrow">
          {journey.map((a) => (
            <a className="pill" key={a.slug} href={`/activos/${a.slug}`}>
              {a.label}
            </a>
          ))}
        </div>
      </header>

      <section className="metrics">
        {metrics.map((m, i) => (
          <div className="metric" key={i}>
            <span className="num">{m.num}</span>
            <span className="lbl">{m.lbl}</span>
          </div>
        ))}
      </section>

      <section className="sec">
        <h2>El reto</h2>
        <p>{reto}</p>
      </section>

      <section className="sec">
        <h2>La solución</h2>
        <p>{solucion}</p>
      </section>

      <section className="sec">
        <h2>Resultados</h2>
        <ul className="checks">
          {results.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      {c.hasQuote && (
        <blockquote className="quote">
          <p>“{t(`${c.key}Quote`)}”</p>
          <cite>{t(`${c.key}Author`)}</cite>
        </blockquote>
      )}

      <aside className="endcta">
        <h2>¿Tu operación se parece a esto?</h2>
        <p>
          Cuéntanos cómo trabajáis hoy y te decimos qué activo encaja. Sin
          compromiso, en una llamada.
        </p>
        <div className="cta-row">
          <a className="cta-btn" href="/reserva">Reserva tu llamada gratis</a>
          <a className="cta-btn secondary" href="/">Volver al inicio</a>
        </div>
      </aside>
    </ContentLayout>
  );
}
