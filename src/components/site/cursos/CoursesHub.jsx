"use client";
// Hub `/cursos`: catálogo de formación. Un curso disponible y el resto
// anunciados sin enlace (no hay landing ni fecha).
import React from "react";
import { Nav } from "../Nav";
import { Footer } from "../Contact";
import { Button, Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { ArrowRight } from "../icons";
import { CourseCard, UpcomingCourseCard } from "./CourseCard";
import { TrackView } from "./TrackView";
import { EVENTS } from "@/lib/analytics";
import { CURSOS, HUB } from "@/content/cursos";

const HERO_INK = "#0D0D0D";

export function CoursesHub() {
  const disponibles = CURSOS.filter((c) => c.estado === "disponible");
  const proximos = CURSOS.filter((c) => c.estado === "proximamente");

  return (
    <React.Fragment>
      <TrackView event={EVENTS.coursesHubView} />
      <Nav />
      <main>
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
              <Eyebrow tone="accent">{HUB.eyebrow}</Eyebrow>
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
                maxWidth: "20ch",
                textWrap: "balance",
              }}
            >
              {HUB.h1}
            </Reveal>
            <Reveal
              delay={140}
              as="p"
              style={{
                margin: "1.4rem 0 0",
                fontSize: "var(--text-lead)",
                lineHeight: "var(--leading-normal)",
                color: "var(--text-on-dark-body)",
                maxWidth: "60ch",
              }}
            >
              {HUB.lead}
            </Reveal>
            <Reveal delay={200} style={{ marginTop: "var(--space-7)" }}>
              <Button
                href="/cursos/notion-ai"
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                {HUB.cta}
              </Button>
            </Reveal>
          </Container>
        </section>

        <Section tone="light" id="disponibles">
          <Container>
            <Reveal
              as="h2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-h2)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-strong)",
                margin: "0 0 var(--space-6)",
              }}
            >
              {HUB.disponiblesTitulo}
            </Reveal>
            <Reveal delay={80} style={{ maxWidth: 820 }}>
              {disponibles.map((c) => (
                <CourseCard key={c.slug} curso={c} />
              ))}
            </Reveal>
          </Container>
        </Section>

        <Section tone="raised" id="proximos">
          <Container>
            <Reveal
              as="h2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-h3)",
                lineHeight: "var(--leading-snug)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-strong)",
                margin: "0 0 var(--space-6)",
              }}
            >
              {HUB.proximosTitulo}
            </Reveal>
            <Reveal
              delay={80}
              className="kairos-cursos-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              {proximos.map((c) => (
                <UpcomingCourseCard
                  key={c.slug}
                  curso={c}
                  etiqueta={HUB.proximosEtiqueta}
                />
              ))}
            </Reveal>
          </Container>
        </Section>

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
                maxWidth: "18ch",
                textWrap: "balance",
              }}
            >
              {HUB.cierreTitulo}
            </Reveal>
            <Reveal
              delay={80}
              as="p"
              style={{
                margin: "1.1rem 0 0",
                fontSize: "var(--text-lead)",
                lineHeight: "var(--leading-normal)",
                color: "var(--text-on-dark-body)",
                maxWidth: "56ch",
              }}
            >
              {HUB.cierreTexto}
            </Reveal>
            <Reveal delay={140} style={{ marginTop: "var(--space-6)" }}>
              <Button
                href="/"
                variant="inverse"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                {HUB.cierreCta}
              </Button>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
    </React.Fragment>
  );
}
