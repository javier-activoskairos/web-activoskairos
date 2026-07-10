"use client";
// Kairos Vitae — Principios de diseño (base científica). Rejilla numerada.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { vitaeH2Style, vitaeLeadStyle } from "./ui";

const VITAE_PRINCIPLES = [
  {
    n: "01",
    t: "Reducir la carga cognitiva",
    d: "Menos decisiones, menos fricción. Tu cabeza para pensar, no para recordar dónde estaba todo.",
  },
  {
    n: "02",
    t: "Cerrar los open loops",
    d: "Todo bucle abierto se captura y se cierra. El efecto Zeigarnik deja de trabajar en tu contra.",
  },
  {
    n: "03",
    t: "Diseño basado en identidad",
    d: "No persigues metas sueltas: construyes hábitos desde quién quieres ser. La identidad tira del hábito.",
  },
  {
    n: "04",
    t: "Bucles de feedback anidados",
    d: "Diario → Semanal → Mensual → Trimestral → Anual. Cada revisión alimenta a la siguiente.",
  },
  {
    n: "05",
    t: "Los 5 tipos de riqueza",
    d: "La vida organizada por áreas —Tiempo, Social, Mental, Física y Financiera— según Sahil Bloom.",
  },
  {
    n: "06",
    t: "SYSTEM",
    d: "Save Yourself Time, Energy & Money. Cada pieza existe para devolverte tiempo, energía y dinero.",
  },
];

export function VitaePrinciples() {
  return (
    <Section tone="light" id="principios">
      <Container>
        <div style={{ maxWidth: 700, marginBottom: "var(--space-8)" }}>
          <Reveal>
            <Eyebrow tick={false}>Principios de diseño</Eyebrow>
          </Reveal>
          <Reveal delay={60} as="h2" style={vitaeH2Style}>
            No es una plantilla bonita. Es ciencia del comportamiento hecha
            sistema.
          </Reveal>
          <Reveal delay={120} as="p" style={vitaeLeadStyle}>
            Cada decisión de diseño de Vitae se apoya en un principio probado.
            Por eso se sostiene cuando otros sistemas se caen.
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {VITAE_PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={70 + i * 60}>
              <div
                className="vitae-principle"
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
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    color: "#F96302",
                    marginBottom: 16,
                  }}
                >
                  {p.n}
                </div>
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
                  {p.t}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--leading-normal)",
                    color: "var(--text-muted)",
                  }}
                >
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
