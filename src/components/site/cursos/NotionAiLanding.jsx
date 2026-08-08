"use client";
// Landing de venta `/cursos/notion-ai`. Todo el copy y el precio vienen de
// `@/content/cursos`; aquí solo se compone.
import React from "react";
import { Nav } from "../Nav";
import { Footer } from "../Contact";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { Check } from "../icons";
import { SkoolCta } from "./SkoolCta";
import { TrackView } from "./TrackView";
import { CourseModule } from "./CourseModule";
import { ContextDemo } from "./ContextDemo";
import { ProofBlock } from "./ProofBlock";
import { OfferCard } from "./OfferCard";
import { CursosFaq } from "./CursosFaq";
import { EVENTS } from "@/lib/analytics";
import { NOTION_AI, notionAiCourse } from "@/content/cursos";

const HERO_INK = "#0D0D0D";

/** Eyebrow + h2 de sección, con el mismo ritmo en toda la página. */
function SectionHead({ eyebrow, titulo, onDark = false, maxWidth = "26ch" }) {
  return (
    <React.Fragment>
      <Reveal>
        <Eyebrow tone={onDark ? "on-dark" : "accent"}>{eyebrow}</Eyebrow>
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
          color: onDark ? "var(--text-on-dark-strong)" : "var(--text-strong)",
          margin: "1rem 0 0",
          maxWidth,
          textWrap: "balance",
        }}
      >
        {titulo}
      </Reveal>
    </React.Fragment>
  );
}

function Hero() {
  return (
    <section
      id="top"
      style={{
        background: HERO_INK,
        paddingTop: "clamp(128px, 16vh, 184px)",
        paddingBottom: "clamp(3.5rem, 7vw, 6rem)",
      }}
    >
      <Container>
        <Reveal>
          <Eyebrow tone="accent">{NOTION_AI.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal
          delay={80}
          as="h1"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-h1)",
            lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-on-dark-strong)",
            margin: "1.1rem 0 0",
            maxWidth: "22ch",
            textWrap: "balance",
          }}
        >
          {NOTION_AI.h1}
        </Reveal>
        <Reveal
          delay={140}
          as="p"
          style={{
            margin: "1.4rem 0 0",
            fontSize: "var(--text-lead)",
            lineHeight: "var(--leading-normal)",
            color: "var(--text-on-dark-body)",
            maxWidth: "58ch",
          }}
        >
          {NOTION_AI.lead}
        </Reveal>

        <Reveal delay={200} style={{ marginTop: "var(--space-7)" }}>
          <SkoolCta location="hero">{NOTION_AI.ctaPrincipal}</SkoolCta>
          <p
            style={{
              margin: "0.9rem 0 0",
              fontSize: "var(--text-xs)",
              lineHeight: 1.5,
              // `--text-on-dark-muted`, no `faint`: a 12–13px el faint se queda por
// debajo del contraste AA sobre el fondo tinta.
color: "var(--text-on-dark-muted)",
              maxWidth: "46ch",
            }}
          >
            {NOTION_AI.ctaNota}
          </p>
        </Reveal>

        <Reveal
          delay={260}
          className="kairos-trustbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 2vw, 24px)",
            flexWrap: "wrap",
            marginTop: "var(--space-7)",
            paddingTop: "var(--space-5)",
            borderTop: "1px solid var(--border-on-dark)",
            fontFamily: "var(--font-mono)",
            fontSize: 12.5,
            letterSpacing: "0.02em",
            // `--text-on-dark-muted`, no `faint`: a 12–13px el faint se queda por
// debajo del contraste AA sobre el fondo tinta.
color: "var(--text-on-dark-muted)",
          }}
        >
          {NOTION_AI.trustBar.map((it) => (
            <span
              key={it}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span
                aria-hidden="true"
                style={{ color: "var(--accent)", display: "inline-flex" }}
              >
                <Check size={14} />
              </span>
              {it}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export function NotionAiLanding() {
  return (
    <React.Fragment>
      <TrackView event={EVENTS.landingView} />
      <Nav />
      <main>
        <Hero />

        <Section tone="light" id="problema">
          <Container>
            <SectionHead
              eyebrow={NOTION_AI.problema.eyebrow}
              titulo={NOTION_AI.problema.titulo}
            />
            {NOTION_AI.problema.parrafos.map((p, i) => (
              <Reveal
                key={i}
                delay={100 + i * 40}
                as="p"
                style={{
                  margin: "1.3rem 0 0",
                  fontSize: "var(--text-lead)",
                  lineHeight: "var(--leading-normal)",
                  color: "var(--text-muted)",
                  maxWidth: "68ch",
                }}
              >
                {p}
              </Reveal>
            ))}
          </Container>
        </Section>

        <ContextDemo />

        <Section tone="raised" id="transformacion">
          <Container>
            <SectionHead
              eyebrow={NOTION_AI.transformacion.eyebrow}
              titulo={NOTION_AI.transformacion.titulo}
            />
            <Reveal
              delay={100}
              as="p"
              style={{
                margin: "1.3rem 0 0",
                fontSize: "var(--text-lead)",
                color: "var(--text-muted)",
              }}
            >
              {NOTION_AI.transformacion.intro}
            </Reveal>
            <Reveal
              delay={140}
              as="ul"
              style={{
                listStyle: "none",
                margin: "var(--space-5) 0 0",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                maxWidth: "70ch",
              }}
            >
              {NOTION_AI.transformacion.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: "var(--text-lead)",
                    lineHeight: 1.5,
                    color: "var(--text-muted)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      color: "var(--accent)",
                      display: "inline-flex",
                      marginTop: 3,
                    }}
                  >
                    <Check size={18} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>

        <Section tone="light" id="marco">
          <Container>
            <SectionHead
              eyebrow={NOTION_AI.marco.eyebrow}
              titulo={NOTION_AI.marco.titulo}
            />
            <Reveal
              delay={100}
              className="kairos-modulos-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "var(--space-5)",
                marginTop: "var(--space-7)",
              }}
            >
              {NOTION_AI.marco.pasos.map((p) => (
                <div key={p.n}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "var(--accent)",
                    }}
                  >
                    {p.n}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--weight-bold)",
                      fontSize: "var(--text-h4)",
                      color: "var(--text-strong)",
                      margin: "0.5rem 0 0",
                    }}
                  >
                    {p.t}
                  </h3>
                  <p
                    style={{
                      margin: "0.5rem 0 0",
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-normal)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {p.d}
                  </p>
                </div>
              ))}
            </Reveal>
          </Container>
        </Section>

        <Section tone="raised" id="modulos">
          <Container>
            <SectionHead
              eyebrow={NOTION_AI.modulos.eyebrow}
              titulo={NOTION_AI.modulos.titulo}
            />
            <Reveal
              delay={100}
              className="kairos-modulos-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--space-5)",
                marginTop: "var(--space-7)",
                alignItems: "start",
              }}
            >
              {NOTION_AI.modulos.items.map((m) => (
                <CourseModule key={m.id} modulo={m} />
              ))}
            </Reveal>
            <Reveal delay={160} style={{ marginTop: "var(--space-7)" }}>
              <SkoolCta location="modules">{NOTION_AI.oferta.cta}</SkoolCta>
            </Reveal>
          </Container>
        </Section>

        <Section tone="light" id="por-que">
          <Container>
            <SectionHead
              eyebrow={NOTION_AI.porQue.eyebrow}
              titulo={NOTION_AI.porQue.titulo}
              maxWidth="30ch"
            />
            <Reveal
              delay={100}
              as="ul"
              style={{
                listStyle: "none",
                margin: "var(--space-6) 0 0",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                maxWidth: "70ch",
              }}
            >
              {NOTION_AI.porQue.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: "var(--text-body)",
                    lineHeight: 1.55,
                    color: "var(--text-muted)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      color: "var(--accent)",
                      display: "inline-flex",
                      marginTop: 3,
                    }}
                  >
                    <Check size={17} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </Reveal>
          </Container>
        </Section>

        <ProofBlock caso={NOTION_AI.caso} />

        <OfferCard
          oferta={NOTION_AI.oferta}
          precioLabel={notionAiCourse.priceLabel}
          ctaNota={NOTION_AI.ctaNota}
        />

        <CursosFaq
          eyebrow={NOTION_AI.faq.eyebrow}
          titulo={NOTION_AI.faq.titulo}
          items={NOTION_AI.faq.items}
        />

        <Section tone="dark" id="cierre">
          <Container>
            <Reveal
              as="h2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-h2)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-on-dark-strong)",
                margin: 0,
                maxWidth: "22ch",
                textWrap: "balance",
              }}
            >
              {NOTION_AI.cierre.titulo}
            </Reveal>
            <Reveal delay={100} style={{ marginTop: "var(--space-6)" }}>
              <SkoolCta location="footer">{NOTION_AI.cierre.cta}</SkoolCta>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
