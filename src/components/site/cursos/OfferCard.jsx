"use client";
// Oferta: precio único, qué incluye, garantía y CTA a la comunidad.
// El precio y la garantía se leen de `notionAiCourse`; aquí no se repiten.
import React from "react";
import { Eyebrow } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { Check, Shield } from "../icons";
import { SkoolCta } from "./SkoolCta";

export function OfferCard({ oferta, precioLabel, ctaNota }) {
  return (
    <Section tone="dark" id="oferta">
      <Container>
        <Reveal
          className="kairos-oferta-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.85fr)",
            gap: "clamp(1.6rem, 4vw, 3.5rem)",
            alignItems: "center",
            background: "var(--surface-card-dark)",
            border: "1px solid var(--border-on-dark)",
            borderRadius: "var(--radius-2xl)",
            padding: "clamp(1.7rem, 4vw, 3.2rem)",
          }}
        >
          <div>
            <Eyebrow tone="on-dark">{oferta.eyebrow}</Eyebrow>
            <h2
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
              {oferta.titulo}
            </h2>

            <ul
              style={{
                listStyle: "none",
                margin: "var(--space-6) 0 0",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {oferta.bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: "var(--text-lead)",
                    lineHeight: 1.45,
                    color: "var(--text-on-dark-body)",
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
            </ul>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-on-dark)",
              borderRadius: "var(--radius-xl)",
              padding: "clamp(1.4rem, 3vw, 2rem)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-extra)",
                fontSize: "clamp(3rem, 7vw, 4.25rem)",
                lineHeight: 1,
                letterSpacing: "var(--tracking-tighter)",
                color: "var(--text-on-dark-strong)",
              }}
            >
              {precioLabel}
            </div>
            <p
              style={{
                margin: "0.6rem 0 0",
                fontSize: "var(--text-sm)",
                color: "var(--text-on-dark-muted)",
              }}
            >
              {oferta.precioNota}
            </p>

            <div style={{ marginTop: "var(--space-6)" }}>
              <SkoolCta location="offer" fullWidth>
                {oferta.cta}
              </SkoolCta>
            </div>

            <p
              style={{
                margin: "0.9rem 0 0",
                fontSize: "var(--text-xs)",
                lineHeight: 1.5,
                // `muted` en vez de `faint`: a 13px el faint no llega a AA.
                color: "var(--text-on-dark-muted)",
              }}
            >
              {ctaNota}
            </p>

            <p
              style={{
                display: "flex",
                gap: 9,
                alignItems: "flex-start",
                justifyContent: "center",
                textAlign: "left",
                margin: "var(--space-5) 0 0",
                paddingTop: "var(--space-5)",
                borderTop: "1px solid var(--border-on-dark)",
                fontSize: "var(--text-xs)",
                lineHeight: 1.5,
                color: "var(--text-on-dark-muted)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  color: "var(--accent)",
                  display: "inline-flex",
                  marginTop: 1,
                }}
              >
                <Shield size={16} />
              </span>
              <span>{oferta.garantia}</span>
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
