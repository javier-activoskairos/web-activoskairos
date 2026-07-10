"use client";
// Kairos Vitae — CTA final. Cierre potente, CTA principal repetido.
import React from "react";
import { Button } from "../ds";
import { Container, Section, Reveal } from "../primitives";
import { ArrowRight } from "../icons";
import { vitaeReduced } from "./ui";

export function VitaeCTA() {
  const reduce = vitaeReduced();

  return (
    <Section
      tone="dark"
      id="comprar"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        aria-hidden="true"
        className={reduce ? "" : "kairos-contact-glow"}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "min(920px, 92vw)",
          height: 560,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,99,2,0.22) 0%, rgba(249,99,2,0.07) 42%, transparent 70%)",
          filter: "blur(22px)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "radial-gradient(rgba(245,237,230,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(100% 90% at 50% 50%, #000 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(100% 90% at 50% 50%, #000 30%, transparent 78%)",
        }}
      />
      <Container style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{ maxWidth: 760, marginInline: "auto", textAlign: "center" }}
        >
          <Reveal
            as="h2"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--weight-bold)",
              fontSize: "var(--text-h1)",
              lineHeight: "var(--leading-heading)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--text-on-dark-strong)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Deja de organizar tu vida. Empieza a{" "}
            <span style={{ color: "#F96302" }}>vivirla</span>.
          </Reveal>
          <Reveal
            delay={80}
            as="p"
            style={{
              fontSize: "var(--text-lead)",
              lineHeight: "var(--leading-normal)",
              color: "var(--text-on-dark-muted)",
              margin: "1.2rem auto 0",
              maxWidth: "52ch",
            }}
          >
            Un solo espacio en Notion para las cinco riquezas de tu vida.
            Modular, simple y contigo en el móvil.
          </Reveal>
          <Reveal
            delay={140}
            style={{
              display: "flex",
              gap: "var(--space-3)",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "var(--space-7)",
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
            delay={200}
            as="p"
            style={{
              margin: "var(--space-6) 0 0",
              fontFamily: "var(--font-mono)",
              fontSize: 12.5,
              letterSpacing: "0.02em",
              color: "var(--text-on-dark-faint)",
            }}
          >
            Acceso inmediato · Actualizaciones incluidas · Para Notion
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
