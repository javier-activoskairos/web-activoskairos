"use client";
// Kairos Vitae — Hero. Banda oscura tech (mismo lenguaje que el hero de la home):
// dot-grid, glow naranja contenido y un panel "LifeOS" estilo Notion con los 5
// tipos de riqueza como pieza protagonista.
import React from "react";
import { Button } from "../ds";
import { Reveal } from "../primitives";
import * as Icons from "../icons";
import { vitaeReduced } from "./ui";

const VITAE_WEALTH = [
  { key: "tiempo", name: "Tiempo", icon: "Clock", pct: 72, tint: "#F96302" },
  { key: "social", name: "Social", icon: "Users", pct: 64, tint: "#F8A848" },
  { key: "mental", name: "Mental", icon: "Sparkles", pct: 80, tint: "#F96302" },
  { key: "fisica", name: "Física", icon: "Gauge", pct: 58, tint: "#F8A848" },
  {
    key: "financiera",
    name: "Financiera",
    icon: "TrendingUp",
    pct: 67,
    tint: "#F96302",
  },
];

export function VitaeHero() {
  const { ArrowRight } = Icons;
  const reduce = vitaeReduced();

  return (
    <section
      id="top"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0D0D0D",
        paddingTop: "clamp(120px, 16vh, 176px)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
      }}
    >
      <VitaeHeroBackdrop reduce={reduce} />

      <div
        className="vitae-hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1120,
          marginInline: "auto",
          padding: "0 var(--gutter)",
          display: "grid",
          gridTemplateColumns: "minmax(0,1.05fr) minmax(0,0.95fr)",
          gap: "clamp(2rem, 5vw, 4.5rem)",
          alignItems: "center",
        }}
      >
        <div>
          <Reveal
            delay={40}
            as="div"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 14px",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--border-on-dark)",
              background: "rgba(249,99,2,0.10)",
              marginBottom: "var(--space-5)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#F96302",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-on-dark-body)",
                fontWeight: 600,
              }}
            >
              LifeOS en Notion
            </span>
          </Reveal>

          <Reveal
            delay={90}
            as="h1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-bold)",
              fontSize: "var(--text-display)",
              lineHeight: "var(--leading-tight)",
              letterSpacing: "var(--tracking-tighter)",
              color: "var(--text-on-dark-strong)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Kairos Vitae
          </Reveal>
          <Reveal
            delay={150}
            as="p"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-medium)",
              fontSize: "clamp(1.35rem, 2.6vw, 2rem)",
              lineHeight: "var(--leading-snug)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--text-on-dark-body)",
              margin: "0.6rem 0 0",
              textWrap: "balance",
            }}
          >
            El sistema operativo de tu vida.
          </Reveal>

          <Reveal
            delay={210}
            as="p"
            style={{
              fontSize: "var(--text-lead)",
              lineHeight: "var(--leading-normal)",
              color: "var(--text-on-dark-muted)",
              margin: "1.4rem 0 0",
              maxWidth: "48ch",
            }}
          >
            Organiza tu vida entera en Notion alrededor de los{" "}
            <span style={{ color: "#F96302", fontWeight: 600 }}>
              5 tipos de riqueza
            </span>{" "}
            de Sahil Bloom. Un solo espacio, modular, que crece contigo.
          </Reveal>

          <Reveal
            delay={270}
            style={{
              display: "flex",
              gap: "var(--space-3)",
              marginTop: "var(--space-6)",
              flexWrap: "wrap",
            }}
          >
            <a href="#comprar" style={{ textDecoration: "none" }}>
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={18} />}
              >
                Consíguelo
              </Button>
            </a>
            <a
              href="#modulos"
              className="kairos-hero-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.55rem",
                height: 56,
                padding: "0 1.5rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-on-dark)",
                color: "var(--text-on-dark-strong)",
                fontFamily: "var(--font-sans)",
                fontSize: "1.0625rem",
                fontWeight: "var(--weight-semibold)",
                letterSpacing: "-0.005em",
                textDecoration: "none",
                transition:
                  "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
              }}
            >
              Ver el sistema
            </a>
          </Reveal>

          <Reveal
            delay={330}
            as="div"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(10px, 2vw, 18px)",
              flexWrap: "wrap",
              marginTop: "var(--space-6)",
            }}
          >
            {["Modular", "Simple", "Móvil-first"].map((b) => (
              <span
                key={b}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12.5,
                  letterSpacing: "0.02em",
                  color: "var(--text-on-dark-faint)",
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "#F96302" }} aria-hidden="true">
                  ✓
                </span>
                {b}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal delay={360} style={{ perspective: 1400 }}>
          <VitaeHeroPanel reduce={reduce} />
        </Reveal>
      </div>
    </section>
  );
}

function VitaeHeroPanel({ reduce }) {
  return (
    <div
      style={{
        position: "relative",
        background: "var(--cream-050)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 40px 90px -30px rgba(0,0,0,0.65), 0 2px 0 rgba(255,255,255,0.06) inset",
        padding: "clamp(1.1rem, 2vw, 1.6rem)",
        transform: reduce ? "none" : "rotateY(-9deg) rotateX(3deg)",
        transformOrigin: "center right",
      }}
    >
      {/* barra de ventana */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingBottom: 14,
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#E7DCCE",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#E7DCCE",
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#F96302",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text-faint)",
            letterSpacing: "0.02em",
          }}
        >
          Mi vida · Vitae
        </span>
      </div>

      <div style={{ paddingTop: 14 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "var(--text-h4)",
            color: "var(--text-strong)",
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          5 tipos de riqueza
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            color: "var(--text-faint)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Panel de vida · esta semana
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginTop: 16,
          }}
        >
          {VITAE_WEALTH.map((w) => {
            const IconCmp = Icons[w.icon];
            return (
              <div
                key={w.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "var(--surface-card)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  padding: "11px 13px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    borderRadius: "var(--radius-sm)",
                    flexShrink: 0,
                    background: "var(--accent-soft)",
                    color: "#C44E00",
                  }}
                >
                  {IconCmp ? <IconCmp size={17} /> : null}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "var(--text-sm)",
                      color: "var(--text-strong)",
                    }}
                  >
                    Riqueza {w.name}
                  </div>
                  <div
                    style={{
                      height: 5,
                      borderRadius: 3,
                      background: "var(--cream-200)",
                      marginTop: 6,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${w.pct}%`,
                        borderRadius: 3,
                        background: w.tint,
                      }}
                    />
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    flexShrink: 0,
                  }}
                >
                  {w.pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VitaeHeroBackdrop({ reduce }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(245,237,230,0.05) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(120% 90% at 60% 30%, #000 35%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 60% 30%, #000 35%, transparent 82%)",
        }}
      />
      <div
        className={reduce ? "" : "kairos-hero-glow"}
        style={{
          position: "absolute",
          left: "62%",
          top: "50%",
          width: "min(820px, 80vw)",
          height: 560,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,99,2,0.26) 0%, rgba(249,99,2,0.09) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(130% 100% at 50% 15%, transparent 45%, rgba(10,9,8,0.5) 100%)",
        }}
      />
    </div>
  );
}
