"use client";
// Kairos Vitae — Cómo funciona: Vitae Core (Tiempo). Cadena de conexión
// Tarea → Proyecto → Objetivo → Área de riqueza + reglas del núcleo.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import * as Icons from "../icons";
import { vitaeH2Style, vitaeLeadStyle } from "./ui";

const VITAE_CHAIN = [
  { k: "Tarea", d: "La unidad mínima. Se hace hoy.", icon: "Check" },
  { k: "Proyecto", d: "Un conjunto de tareas con un fin.", icon: "Layers" },
  { k: "Objetivo", d: "La meta que ese proyecto persigue.", icon: "Compass" },
  {
    k: "Área de riqueza",
    d: "El tipo de riqueza al que sirve.",
    icon: "Sparkles",
  },
];

const VITAE_CORE_RULES = [
  {
    t: "Gestionado por áreas y metas",
    d: "Proyectos y tareas cuelgan siempre de un Área de vida y una Meta. Nada huérfano.",
  },
  {
    t: "Inbox que se autovacía",
    d: "Capturas todo en el Backlog y lo vacías decidiendo conscientemente: hacer, agendar o descartar.",
  },
  {
    t: "Priorización simple",
    d: "Prioridad + Matriz Eisenhower. Lo justo para decidir, sin sobre-gamificación.",
  },
  {
    t: "Máximo 4-5 proyectos activos",
    d: "El foco es una regla del sistema, no una buena intención. Menos frentes, más avance.",
  },
];

export function VitaeCore() {
  return (
    <Section tone="raised">
      <Container>
        <div style={{ maxWidth: 700, marginBottom: "var(--space-8)" }}>
          <Reveal>
            <Eyebrow tick={false}>Cómo funciona · Vitae Core</Eyebrow>
          </Reveal>
          <Reveal delay={60} as="h2" style={vitaeH2Style}>
            El núcleo de Tiempo lo conecta todo.
          </Reveal>
          <Reveal delay={120} as="p" style={vitaeLeadStyle}>
            Cada cosa que haces sabe a qué sirve. Una cadena limpia conecta lo
            pequeño de hoy con la vida que quieres construir.
          </Reveal>
        </div>

        {/* Cadena de conexión */}
        <Reveal delay={80}>
          <div
            className="vitae-chain"
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: 0,
              flexWrap: "wrap",
              background: "var(--surface-card)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-2xl)",
              padding: "clamp(1.25rem, 3vw, 2.25rem)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {VITAE_CHAIN.map((c, i) => {
              const IconCmp = Icons[c.icon];
              return (
                <React.Fragment key={c.k}>
                  <div
                    style={{
                      flex: "1 1 160px",
                      minWidth: 0,
                      textAlign: "center",
                      padding: "4px 10px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 52,
                        height: 52,
                        borderRadius: "var(--radius-lg)",
                        background: "var(--accent-soft)",
                        color: "#C44E00",
                        marginBottom: 12,
                      }}
                    >
                      {IconCmp ? <IconCmp size={24} /> : null}
                    </span>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "var(--text-h4)",
                        color: "var(--text-strong)",
                        letterSpacing: "var(--tracking-tight)",
                      }}
                    >
                      {c.k}
                    </div>
                    <p
                      style={{
                        margin: "6px 0 0",
                        fontSize: "var(--text-sm)",
                        lineHeight: "var(--leading-snug)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {c.d}
                    </p>
                  </div>
                  {i < VITAE_CHAIN.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="vitae-chain-arrow"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#F96302",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 22,
                        padding: "0 4px",
                      }}
                    >
                      →
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Reveal>

        {/* Reglas del núcleo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "var(--space-5)",
            marginTop: "var(--space-7)",
          }}
        >
          {VITAE_CORE_RULES.map((r, i) => (
            <Reveal key={r.t} delay={80 + i * 60}>
              <div style={{ display: "flex", gap: 14, height: "100%" }}>
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: 8,
                    borderRadius: 4,
                    background: "var(--accent-gradient)",
                  }}
                />
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "var(--text-h4)",
                      letterSpacing: "var(--tracking-tight)",
                      color: "var(--text-strong)",
                      margin: "0 0 6px",
                    }}
                  >
                    {r.t}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-normal)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {r.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
