"use client";
// FAQ de la landing de cursos. Mismo acordeón nativo <details> que la home
// (texto siempre en el HTML, crawlable) pero con items por props y evento GA4
// al abrir cada pregunta. Solo se registra la apertura, no el cierre.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { FAQ_CSS } from "../Faq";
import { trackEvent, EVENTS } from "@/lib/analytics";

export function CursosFaq({ eyebrow, titulo, items }) {
  const onToggle = (event, id) => {
    if (event.currentTarget.open)
      trackEvent(EVENTS.faqOpen, { question_id: id });
  };

  return (
    <Section tone="raised" id="faq">
      <style dangerouslySetInnerHTML={{ __html: FAQ_CSS }} />
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
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
          }}
        >
          {titulo}
        </Reveal>
        <Reveal delay={120} className="kfaq" style={{ maxWidth: 820 }}>
          {items.map((it) => (
            <details key={it.id} onToggle={(e) => onToggle(e, it.id)}>
              <summary>
                {it.q}
                <span className="ic" aria-hidden="true">
                  +
                </span>
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
