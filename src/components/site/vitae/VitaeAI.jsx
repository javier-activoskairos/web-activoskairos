"use client";
// Kairos Vitae — Capa de IA (el diferenciador). VitAI orquesta y delega en
// bloques IA por módulo/área, cada uno con su propio contexto.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { Sparkles } from "../icons";
import { VitaeBadge } from "./ui";

const VITAE_AGENTS = [
  {
    name: "Marco Aurelio",
    area: "Diario · Vitae Mental",
    d: "Lee tus entradas y te devuelve patrones, no juicios. Reflexión estoica sobre tu semana.",
  },
  {
    name: "Cronos",
    area: "Tiempo · Vitae Core",
    d: "Vigila tu backlog y foco. Sugiere qué priorizar y avisa cuando abres demasiados frentes.",
  },
  {
    name: "Adam",
    area: "Vitae Finanzas",
    d: "Interpreta tus números y detecta fugas. Te explica tu mes en una frase clara.",
  },
  {
    name: "Alejandría",
    area: "Base de Conocimiento",
    d: "Recupera lo que aprendiste cuando lo necesitas. Tu segundo cerebro, con memoria.",
  },
];

export function VitaeAI() {
  return (
    <Section
      tone="dark"
      id="ia"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: "min(900px, 90vw)",
          height: 520,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,99,2,0.16) 0%, transparent 68%)",
          filter: "blur(24px)",
          zIndex: 0,
        }}
      />
      <Container style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 720, marginBottom: "var(--space-8)" }}>
          <Reveal>
            <Eyebrow tone="on-dark" tick={false}>
              La capa de IA
            </Eyebrow>
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
              color: "var(--text-on-dark-strong)",
              margin: "1rem 0 0",
              textWrap: "balance",
            }}
          >
            Un cerebro que gobierna el sistema. Y muchos que conocen cada
            rincón.
          </Reveal>
          <Reveal
            delay={120}
            as="p"
            style={{
              fontSize: "var(--text-lead)",
              lineHeight: "var(--leading-normal)",
              color: "var(--text-on-dark-muted)",
              margin: "1.1rem 0 0",
            }}
          >
            No es un chatbot pegado encima. Es una arquitectura de IA que
            entiende tu vida por áreas y delega en el especialista adecuado.
          </Reveal>
        </div>

        {/* Orquestador */}
        <Reveal delay={80}>
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(249,99,2,0.16), rgba(249,150,46,0.06))",
              border: "1px solid rgba(249,99,2,0.35)",
              borderRadius: "var(--radius-2xl)",
              padding: "clamp(1.5rem, 3vw, 2.25rem)",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-5)",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: "var(--radius-lg)",
                flexShrink: 0,
                background: "var(--accent-gradient)",
                color: "#fff",
                boxShadow: "var(--shadow-accent)",
              }}
            >
              <Sparkles size={30} />
            </span>
            <div style={{ flex: "1 1 320px", minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "var(--text-h3)",
                    letterSpacing: "var(--tracking-tight)",
                    color: "var(--text-on-dark-strong)",
                  }}
                >
                  VitAI
                </span>
                <VitaeBadge>Orquestador</VitaeBadge>
              </div>
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "var(--text-body)",
                  lineHeight: "var(--leading-normal)",
                  color: "var(--text-on-dark-body)",
                  maxWidth: "58ch",
                }}
              >
                Gobierna todo el sistema: entiende la petición, decide a qué
                bloque pertenece y delega. Tú hablas con uno; responde el que
                sabe.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Conector delega */}
        <Reveal
          delay={140}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBlock: "var(--space-5)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 2,
              height: 28,
              background: "linear-gradient(var(--accent), transparent)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#F96302",
              fontWeight: 600,
            }}
          >
            delega en
          </span>
        </Reveal>

        {/* Bloques IA por área */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {VITAE_AGENTS.map((a, i) => (
            <Reveal key={a.name} delay={80 + i * 70}>
              <div
                className="vitae-agent"
                style={{
                  height: "100%",
                  background: "var(--surface-card-dark)",
                  border: "1px solid var(--border-on-dark)",
                  borderRadius: "var(--radius-xl)",
                  padding: "var(--space-5)",
                  transition:
                    "transform var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#F96302",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "var(--text-h4)",
                      color: "var(--text-on-dark-strong)",
                      letterSpacing: "var(--tracking-tight)",
                    }}
                  >
                    {a.name}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11.5,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "var(--text-on-dark-faint)",
                    marginBottom: 10,
                  }}
                >
                  {a.area}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--leading-normal)",
                    color: "var(--text-on-dark-muted)",
                  }}
                >
                  {a.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
