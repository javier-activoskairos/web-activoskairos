"use client";
// Demostración visual conceptual: la misma petición, sin y con capa de
// contexto. Sustituye al vídeo de ventas (no grabado). Va etiquetada como
// representación conceptual: no es una captura real del producto.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { Sparkles, Check } from "../icons";

const SIN = [
  "Te devuelve un resumen genérico del correo.",
  "No sabe qué clientes son prioritarios.",
  "Tú decides otra vez qué hacer con cada mensaje.",
];

const CON = [
  "Reconoce al remitente y el proyecto al que pertenece.",
  "Aplica tu regla: eliminar, archivar, responder o diferir.",
  "Deja la tarea creada y el seguimiento enlazado.",
];

function Panel({ label, tone, prompt, items }) {
  const dark = tone === "con";
  return (
    <div
      style={{
        background: dark ? "var(--surface-card-dark)" : "var(--surface-card)",
        border: `1px solid ${dark ? "var(--border-on-dark)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-xl)",
        padding: "clamp(1.3rem, 2.4vw, 1.9rem)",
        boxShadow: dark ? "var(--shadow-lg)" : "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 600,
          // `muted` en claro: a 11px el `faint` no llega a AA sobre la tarjeta.
          color: dark ? "var(--kairos-orange-400)" : "var(--text-muted)",
        }}
      >
        {label}
      </span>

      {/* Petición del usuario: idéntica en los dos paneles, para que la
          diferencia se vea solo en la respuesta. */}
      <p
        style={{
          margin: 0,
          padding: "0.7rem 0.95rem",
          borderRadius: "var(--radius-md)",
          background: dark ? "rgba(255,255,255,0.06)" : "var(--surface-sunken)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          lineHeight: 1.5,
          color: dark ? "var(--text-on-dark-body)" : "var(--text-muted)",
        }}
      >
        {prompt}
      </p>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 11,
        }}
      >
        {items.map((it) => (
          <li
            key={it}
            style={{
              display: "flex",
              gap: 11,
              fontSize: "var(--text-sm)",
              lineHeight: 1.5,
              color: dark ? "var(--text-on-dark-body)" : "var(--text-muted)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                marginTop: 2,
                color: dark ? "var(--accent)" : "var(--text-faint)",
                display: "inline-flex",
              }}
            >
              {dark ? <Check size={16} /> : <Sparkles size={16} />}
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContextDemo() {
  const prompt = "«Ordena mi bandeja de esta mañana.»";
  return (
    <Section tone="light" id="demostracion">
      <Container>
        <Reveal>
          <Eyebrow>LA DIFERENCIA</Eyebrow>
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
            margin: "1rem 0 0",
            textWrap: "balance",
            maxWidth: "24ch",
          }}
        >
          La misma petición, dos resultados distintos.
        </Reveal>

        <Reveal
          delay={100}
          className="kairos-demo-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-5)",
            marginTop: "var(--space-7)",
            alignItems: "stretch",
          }}
        >
          <Panel label="Sin contexto" tone="sin" prompt={prompt} items={SIN} />
          <Panel label="Con contexto" tone="con" prompt={prompt} items={CON} />
        </Reveal>

        <Reveal
          delay={140}
          as="p"
          style={{
            margin: "var(--space-4) 0 0",
            fontSize: "var(--text-xs)",
            // `muted`, no `faint`: a 13px sobre crema el faint no llega a AA.
            color: "var(--text-muted)",
          }}
        >
          Representación conceptual del resultado del sistema. No es una captura
          del producto.
        </Reveal>
      </Container>
    </Section>
  );
}
