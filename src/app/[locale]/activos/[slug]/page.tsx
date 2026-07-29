import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContentLayout } from "@/components/site/ContentLayout";
import { JsonLd } from "@/components/site/JsonLd";
import { ACTIVOS, ACTIVOS_BY_SLUG } from "@/content/activos";
import { CASOS_BY_SLUG } from "@/content/casos";
import { buildContentMeta } from "@/lib/content-meta";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return ACTIVOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ACTIVOS_BY_SLUG[slug];
  if (!a) return {};
  return buildContentMeta({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/activos/${a.slug}`,
  });
}

export default async function ActivoPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const a = ACTIVOS_BY_SLUG[slug];
  if (!a) notFound();

  const tCases = await getTranslations({ locale, namespace: "Cases" });
  const related = a.relatedCases
    .map((cs) => CASOS_BY_SLUG[cs])
    .filter(Boolean)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      sector: tCases(`${c.key}Sector`),
      summary: tCases(`${c.key}Summary`),
    }));

  const url = `${siteUrl}/activos/${a.slug}`;
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: a.keyword.charAt(0).toUpperCase() + a.keyword.slice(1),
    serviceType: a.keyword,
    description: a.metaDescription,
    url,
    provider: { "@type": "Organization", name: "Activos Kairos", url: siteUrl },
    areaServed: "ES",
    availableLanguage: "es",
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
      { "@type": "ListItem", position: 2, name: a.h1, item: url },
    ],
  };

  return (
    <ContentLayout>
      <JsonLd data={serviceLd} />
      <JsonLd data={crumbsLd} />
      <nav className="crumbs" aria-label="Ruta">
        <a href="/">Inicio</a>
        <span className="sep">/</span>
        <span className="cur">{a.eyebrow}</span>
      </nav>

      <header className="hero">
        <p className="eyebrow">{a.eyebrow}</p>
        <h1>{a.h1}</h1>
        <p className="lead">{a.lead}</p>
        <div className="cta-row">
          <a className="cta-btn" href="/reserva">Reserva tu llamada gratis</a>
          <a className="cta-btn secondary" href={a.relatedPillar.href}>
            {a.relatedPillar.label}
          </a>
        </div>
      </header>

      {a.sections.map((s, i) => (
        <section className="sec" key={i}>
          <h2>{s.h2}</h2>
          {s.body.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </section>
      ))}

      <section className="sec">
        <h2>Qué incluye</h2>
        <ul className="checks">
          {a.incluye.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
        <p>
          <strong style={{ color: "#fff" }}>Resultado:</strong> {a.resultado}
        </p>
      </section>

      {related.length > 0 && (
        <section className="sec related">
          <h2>Casos donde lo aplicamos</h2>
          <div className="rgrid">
            {related.map((c) => (
              <a className="rcard" key={c.slug} href={`/casos/${c.slug}`}>
                <span className="rk">{c.sector}</span>
                <span className="rt">{c.name}</span>
                <span className="rd">{c.summary}</span>
                <span className="go">Ver el caso →</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <aside className="endcta">
        <h2>{a.cta.title}</h2>
        <p>{a.cta.body}</p>
        <div className="cta-row">
          <a className="cta-btn" href="/reserva">Reserva tu llamada gratis</a>
          <a className="cta-btn secondary" href="/">Volver al inicio</a>
        </div>
      </aside>
    </ContentLayout>
  );
}
