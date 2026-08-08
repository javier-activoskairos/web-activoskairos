"use client";
// FAQ de la home (tarea SEO 13). Acordeón nativo <details>: el texto vive
// siempre en el HTML (crawlable, sin depender de JS). El schema FAQPage se
// inyecta desde el server (page.tsx) leyendo el mismo namespace "Faq".
import React from "react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "./ds";
import { Container, Section, Reveal } from "./primitives";

// Exportado para que la FAQ de los cursos herede exactamente el mismo acordeón
// sin duplicar CSS.
export const FAQ_CSS = `
.kfaq details{border:1px solid rgba(0,0,0,.09);border-radius:16px;background:#fff;margin-bottom:12px;overflow:hidden;transition:border-color .18s}
.kfaq details[open]{border-color:rgba(249,99,2,.4)}
.kfaq summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 22px;font-family:var(--font-display);font-weight:var(--weight-semibold);font-size:var(--text-h4);line-height:var(--leading-snug);color:var(--text-strong)}
.kfaq summary::-webkit-details-marker{display:none}
.kfaq summary .ic{flex:0 0 auto;font-size:26px;line-height:1;color:#F96302;transition:transform .2s;font-weight:400}
.kfaq details[open] summary .ic{transform:rotate(45deg)}
.kfaq .ab{padding:0 22px 20px;color:var(--text-body);line-height:var(--leading-normal);max-width:72ch}
.kfaq .ab p{margin:0}
`;

export function Faq() {
  const t = useTranslations("Faq");
  const items = [1, 2, 3, 4, 5, 6].map((n) => ({ q: t(`q${n}`), a: t(`a${n}`) }));

  return (
    <Section tone="raised" id="faq">
      <style dangerouslySetInnerHTML={{ __html: FAQ_CSS }} />
      <Container>
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
        </Reveal>
        <Reveal
          delay={60}
          as="h2"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-h2)",
            lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-strong)",
            margin: "1rem 0 var(--space-7)",
            textWrap: "balance",
            maxWidth: "20ch",
          }}
        >
          {t("title")}
        </Reveal>
        <Reveal delay={120} className="kfaq" style={{ maxWidth: 820 }}>
          {items.map((it, i) => (
            <details key={i}>
              <summary>
                {it.q}
                <span className="ic" aria-hidden="true">+</span>
              </summary>
              <div className="ab">
                <p>{it.a}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
