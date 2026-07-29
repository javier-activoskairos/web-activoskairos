import { getTranslations } from "next-intl/server";
import { ContentLayout } from "@/components/site/ContentLayout";
import { JsonLd } from "@/components/site/JsonLd";
import { ACTIVOS_BY_SLUG } from "@/content/activos";
import { CASOS_BY_SLUG } from "@/content/casos";
import { siteUrl } from "@/lib/site";

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Render compartido de una página pilar. Server component asíncrono: lee el
// sector/summary de cada caso relacionado desde messages (namespace "Cases").
export async function PillarView({ pillar, locale }) {
  const tCases = await getTranslations({ locale, namespace: "Cases" });

  const activos = pillar.activos
    .map((slug) => ACTIVOS_BY_SLUG[slug])
    .filter(Boolean);
  const casos = pillar.casos
    .map((slug) => CASOS_BY_SLUG[slug])
    .filter(Boolean)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      sector: tCases(`${c.key}Sector`),
      summary: tCases(`${c.key}Summary`),
    }));

  const url = `${siteUrl}${pillar.slug}`;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pillar.faq.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: pillar.eyebrow, item: url },
    ],
  };

  return (
    <ContentLayout>
      <JsonLd data={faqLd} />
      <JsonLd data={crumbsLd} />
      <nav className="crumbs" aria-label="Ruta">
        <a href="/">Inicio</a>
        <span className="sep">/</span>
        <span className="cur">{pillar.eyebrow}</span>
      </nav>

      <header className="hero">
        <p className="eyebrow">{pillar.eyebrow}</p>
        <h1>{pillar.h1}</h1>
        <p className="lead">{pillar.lead}</p>
        <div className="cta-row">
          <a className="cta-btn" href="/reserva">Reserva tu llamada gratis</a>
          <a className="cta-btn secondary" href="/#contacto">Hablar con el equipo</a>
        </div>
      </header>

      {pillar.sections.map((s, i) => (
        <section className="sec" key={i}>
          <h2>{s.h2}</h2>
          {s.body.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </section>
      ))}

      <section className="sec">
        <h2>Cómo trabajamos</h2>
        <div className="steps">
          {pillar.proceso.map((st) => (
            <div className="step" key={st.n}>
              <span className="sn">{st.n}</span>
              <span className="st">{st.t}</span>
              <span className="sd">{st.d}</span>
            </div>
          ))}
        </div>
      </section>

      {activos.length > 0 && (
        <section className="sec related">
          <h2>Activos relacionados</h2>
          <div className="rgrid">
            {activos.map((a) => (
              <a className="rcard" key={a.slug} href={`/activos/${a.slug}`}>
                <span className="rk">{a.eyebrow}</span>
                <span className="rt">{cap(a.keyword)}</span>
                <span className="rd">{a.resultado}</span>
                <span className="go">Ver el activo →</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {casos.length > 0 && (
        <section className="sec related">
          <h2>Casos donde lo aplicamos</h2>
          <div className="rgrid">
            {casos.map((c) => (
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

      <section className="sec">
        <h2>Preguntas frecuentes</h2>
        <div className="faq">
          {pillar.faq.map((f, i) => (
            <details key={i}>
              <summary>{f.q}</summary>
              <div className="qa-body">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <aside className="endcta">
        <h2>{pillar.cta.title}</h2>
        <p>{pillar.cta.body}</p>
        <div className="cta-row">
          <a className="cta-btn" href="/reserva">Reserva tu llamada gratis</a>
          <a className="cta-btn secondary" href="/">Volver al inicio</a>
        </div>
      </aside>
    </ContentLayout>
  );
}
