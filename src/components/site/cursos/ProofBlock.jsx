"use client";
// Caso real (Biventia). Sin cifras de ahorro: no hay medición posterior
// verificable, así que el bloque cuenta el cambio de proceso, no un porcentaje.
import React from "react";
import Image from "next/image";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";

export function ProofBlock({ caso }) {
  return (
    <Section tone="raised" id="caso">
      <Container>
        <Reveal
          className="kairos-caso-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 200px) minmax(0, 1fr)",
            gap: "clamp(1.5rem, 4vw, 3.5rem)",
            alignItems: "center",
            background: "var(--surface-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-2xl)",
            boxShadow: "var(--shadow-md)",
            padding: "clamp(1.6rem, 4vw, 3rem)",
          }}
        >
          <div>
            <Image
              src={caso.logo}
              alt={caso.empresa}
              width={200}
              height={84}
              style={{
                width: "auto",
                height: 64,
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          <div>
            <Eyebrow>{caso.eyebrow}</Eyebrow>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-h3)",
                lineHeight: "var(--leading-snug)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-strong)",
                margin: "0.9rem 0 0",
                textWrap: "balance",
              }}
            >
              {caso.titulo}
            </h2>
            <p
              style={{
                margin: "0.9rem 0 0",
                fontSize: "var(--text-lead)",
                lineHeight: "var(--leading-normal)",
                color: "var(--text-muted)",
                maxWidth: "62ch",
              }}
            >
              {caso.texto}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
