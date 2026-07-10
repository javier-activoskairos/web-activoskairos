"use client";
// Kairos Vitae — Módulos (features por resultados). Rejilla de cards + banda
// del principio transversal: versión móvil en cada módulo.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import * as Icons from "../icons";
import { VitaeBadge, vitaeH2Style, vitaeLeadStyle } from "./ui";

const VITAE_MODULES = [
  {
    icon: "Compass",
    t: "Metas & Identidad",
    d: "OKRs + Lista Imposible, Identidad, Afirmaciones y Vision Board. Sabes quién eres y hacia dónde vas.",
  },
  {
    icon: "TrendingUp",
    t: "Hábitos & Recurrentes",
    d: "Hábitos (cuantas más veces, mejor) y tareas recurrentes (obligatorias) separados: estados, streaks e históricos.",
  },
  {
    icon: "Sparkles",
    t: "Vitae Mental · Diario",
    d: "Journaling con plantillas diaria, semanal, mensual, trimestral y anual. La mente ordenada por escrito.",
  },
  {
    icon: "Database",
    t: "Vitae Finanzas",
    d: "Un finance OS íntegro dentro de Notion. Ingresos, gastos y patrimonio en el mismo espacio que tu vida.",
  },
  {
    icon: "Calendar",
    t: "Vitae Fechas",
    d: "Fechas clave siempre a la vista: cumpleaños, aniversarios y eventos. Nunca más un “se me pasó”.",
  },
  {
    icon: "Gauge",
    t: "Vitae Físico",
    d: "Entrenamientos y seguimiento físico. Tu cuerpo también es un tipo de riqueza que se gestiona.",
  },
  {
    icon: "Layers",
    t: "Alejandría · Conocimiento",
    d: "Libros, cursos y archivos en una base de conocimiento con capa de IA que te devuelve lo que aprendiste.",
  },
];

export function VitaeModules() {
  return (
    <Section tone="light" id="modulos">
      <Container>
        <div style={{ maxWidth: 700, marginBottom: "var(--space-8)" }}>
          <Reveal>
            <Eyebrow tick={false}>Los módulos</Eyebrow>
          </Reveal>
          <Reveal delay={60} as="h2" style={vitaeH2Style}>
            Un módulo para cada frente de tu vida.
          </Reveal>
          <Reveal delay={120} as="p" style={vitaeLeadStyle}>
            Actívalos cuando los necesites. Vitae es modular: empiezas por el
            núcleo y sumas piezas sin romper nada.
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {VITAE_MODULES.map((m, i) => {
            const IconCmp = Icons[m.icon];
            return (
              <Reveal key={m.t} delay={60 + i * 55}>
                <div
                  className="vitae-module"
                  style={{
                    position: "relative",
                    height: "100%",
                    background: "var(--surface-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-xl)",
                    padding: "var(--space-6)",
                    boxShadow: "var(--shadow-sm)",
                    transition:
                      "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md)",
                      background: "var(--accent-soft)",
                      color: "#C44E00",
                      marginBottom: 16,
                    }}
                  >
                    {IconCmp ? <IconCmp size={22} /> : null}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "var(--text-h4)",
                      letterSpacing: "var(--tracking-tight)",
                      color: "var(--text-strong)",
                      margin: "0 0 8px",
                    }}
                  >
                    {m.t}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-normal)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {m.d}
                  </p>
                </div>
              </Reveal>
            );
          })}

          {/* Card destacada: principio transversal móvil */}
          <Reveal delay={60 + VITAE_MODULES.length * 55}>
            <div
              style={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
                background: "#161616",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-6)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: -40,
                  top: -40,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(249,99,2,0.28) 0%, transparent 70%)",
                  filter: "blur(10px)",
                }}
              />
              <span style={{ position: "relative", display: "inline-flex" }}>
                <VitaeBadge>Transversal</VitaeBadge>
              </span>
              <h3
                style={{
                  position: "relative",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "var(--text-h4)",
                  letterSpacing: "var(--tracking-tight)",
                  color: "var(--text-on-dark-strong)",
                  margin: "14px 0 8px",
                }}
              >
                Versión móvil en cada módulo
              </h3>
              <p
                style={{
                  position: "relative",
                  margin: 0,
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--leading-normal)",
                  color: "var(--text-on-dark-muted)",
                }}
              >
                Captura rápida desde el bolsillo. Anota la tarea, el gasto o la
                idea en segundos y deja que el sistema la coloque en su sitio.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
