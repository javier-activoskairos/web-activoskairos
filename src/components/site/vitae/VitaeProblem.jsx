"use client";
// Kairos Vitae — El problema (agitación). Rejilla de dolores + cierre potente.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { vitaeH2Style, vitaeLeadStyle } from "./ui";

const VITAE_PAINS = [
  {
    t: "Tu vida vive en mil apps",
    d: "Notas aquí, tareas allá, hábitos en otra. Nada se habla entre sí y tú haces de pegamento.",
  },
  {
    t: "Organizas más de lo que ejecutas",
    d: "Pasas el domingo montando el sistema perfecto… y el lunes ya no lo abres.",
  },
  {
    t: "Sobrecarga mental y open loops",
    d: "Decenas de bucles abiertos en la cabeza. La mente ocupada recordando en vez de crear.",
  },
  {
    t: "Abandonas y te sientes culpable",
    d: "Cada sistema que dejas suma una capa más de culpa. Y empiezas de cero otra vez.",
  },
];

export function VitaeProblem() {
  return (
    <Section tone="raised">
      <Container>
        <div style={{ maxWidth: 680, marginBottom: "var(--space-8)" }}>
          <Reveal>
            <Eyebrow tick={false}>El problema</Eyebrow>
          </Reveal>
          <Reveal delay={60} as="h2" style={vitaeH2Style}>
            No te faltan ganas. Te falta un sistema.
          </Reveal>
          <Reveal delay={120} as="p" style={vitaeLeadStyle}>
            Lo intentas cada enero. Y cada enero el mismo patrón: mucha energía
            al montar, cero constancia al mantener.
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {VITAE_PAINS.map((p, i) => (
            <Reveal key={p.t} delay={80 + i * 70}>
              <div
                className="vitae-card"
                style={{
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
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-md)",
                    background: "var(--danger-bg)",
                    color: "var(--danger)",
                    marginBottom: 14,
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 20,
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  ×
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

        <Reveal delay={180}>
          <div
            style={{
              marginTop: "var(--space-8)",
              background: "#161616",
              borderRadius: "var(--radius-2xl)",
              padding: "clamp(2rem, 4vw, 3rem)",
              textAlign: "center",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <p
              style={{
                margin: "0 auto",
                maxWidth: "30ch",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "var(--text-h3)",
                lineHeight: "var(--leading-snug)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-on-dark-strong)",
                textWrap: "balance",
              }}
            >
              El problema no es tu disciplina, es que no tienes un{" "}
              <span style={{ color: "#F96302" }}>sistema</span>.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
