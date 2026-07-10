"use client";
// Kairos Vitae — La filosofía Kairos. Chronos / Aión / Kairós → Vitae existe
// para devolverte tus Momentos Kairos.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { vitaeH2Style, vitaeLeadStyle } from "./ui";

const VITAE_TIMES = [
  {
    g: "Χρόνος",
    name: "Chronos",
    d: "El tiempo que se mide. Horas, calendarios, deadlines. El que se te escapa sin darte cuenta.",
  },
  {
    g: "Αἰών",
    name: "Aión",
    d: "El tiempo de la vida entera. El horizonte largo, la identidad, en quién te conviertes.",
  },
  {
    g: "Καιρός",
    name: "Kairós",
    d: "El momento oportuno. El instante que sí importa y que solo ves si no estás enterrado en el caos.",
  },
];

export function VitaePhilosophy() {
  return (
    <Section tone="light" id="filosofia">
      <Container>
        <div style={{ maxWidth: 720, marginBottom: "var(--space-8)" }}>
          <Reveal>
            <Eyebrow tick={false}>La filosofía Kairos</Eyebrow>
          </Reveal>
          <Reveal delay={60} as="h2" style={vitaeH2Style}>
            Los griegos tenían tres palabras para el tiempo. Vitae te devuelve
            la que importa.
          </Reveal>
          <Reveal delay={120} as="p" style={vitaeLeadStyle}>
            Vivimos esclavos de <em>Chronos</em>, perdemos de vista{" "}
            <em>Aión</em> y nos perdemos los <em>Kairós</em>. Vitae ordena los
            dos primeros para liberar el tercero.
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {VITAE_TIMES.map((t, i) => {
            const isKairos = t.name === "Kairós";
            return (
              <Reveal key={t.name} delay={80 + i * 80}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "var(--radius-xl)",
                    padding: "var(--space-6)",
                    background: isKairos ? "#161616" : "var(--surface-card)",
                    border: isKairos
                      ? "1px solid rgba(249,99,2,0.4)"
                      : "1px solid var(--border-subtle)",
                    boxShadow: isKairos
                      ? "var(--shadow-lg)"
                      : "var(--shadow-sm)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "2.4rem",
                      lineHeight: 1,
                      color: isKairos ? "#F96302" : "var(--border-strong)",
                      marginBottom: 14,
                    }}
                  >
                    {t.g}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "var(--text-h3)",
                      letterSpacing: "var(--tracking-tight)",
                      margin: "0 0 8px",
                      color: isKairos
                        ? "var(--text-on-dark-strong)"
                        : "var(--text-strong)",
                    }}
                  >
                    {t.name}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-normal)",
                      color: isKairos
                        ? "var(--text-on-dark-muted)"
                        : "var(--text-muted)",
                    }}
                  >
                    {t.d}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p
            style={{
              margin: "var(--space-8) auto 0",
              maxWidth: "34ch",
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "var(--text-h3)",
              lineHeight: "var(--leading-snug)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--text-strong)",
              textWrap: "balance",
            }}
          >
            Vitae existe para devolverte tus{" "}
            <span style={{ color: "#F96302" }}>Momentos Kairos</span>.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
