"use client";
// Helpers propios de la landing de Vitae. No tocan el design system compartido:
// reutilizan los tokens de kairos.css y replican el look de Badge/estilos que la
// home usa vía el bundle del diseño (que aquí no existe como export).
import React from "react";

/** Badge sólido en acento (mono, mayúsculas). Equivale al Badge del diseño. */
export function VitaeBadge({ children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: "var(--radius-pill)",
        background: "var(--accent)",
        color: "var(--accent-contrast)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}

// Estilos de titular/lead compartidos por las secciones Vitae.
export const vitaeH2Style = {
  fontFamily: "var(--font-display)",
  fontWeight: "var(--weight-bold)",
  fontSize: "var(--text-h2)",
  lineHeight: "var(--leading-heading)",
  letterSpacing: "var(--tracking-tight)",
  color: "var(--text-strong)",
  margin: "1rem 0 0",
  textWrap: "balance",
};

export const vitaeLeadStyle = {
  fontSize: "var(--text-lead)",
  lineHeight: "var(--leading-normal)",
  color: "var(--text-muted)",
  margin: "1.1rem 0 0",
};

/** Utilidad: ¿el usuario pidió menos movimiento? */
export function vitaeReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * CSS específico de Vitae (hover + colapsos responsive). Se inyecta una sola vez
 * desde la landing y queda acotado a .kairos-site para no filtrar a otras páginas.
 * Las clases de glow (kairos-hero-glow, kairos-contact-glow, kairos-hero-ghost) ya
 * viven en kairos.css y se reutilizan tal cual.
 */
export function VitaeStyles() {
  return (
    <style>{`
.kairos-site .vitae-principle:hover,
.kairos-site .vitae-module:hover,
.kairos-site .vitae-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: rgba(249,99,2,0.4) !important;
}
.kairos-site .vitae-agent:hover {
  transform: translateY(-4px);
  border-color: rgba(249,99,2,0.45) !important;
}
@media (max-width: 900px) {
  .kairos-site .vitae-hero-grid { grid-template-columns: 1fr !important; }
}
@media (max-width: 620px) {
  .kairos-site .vitae-chain { flex-direction: column !important; }
  .kairos-site .vitae-chain-arrow { transform: rotate(90deg); padding: 6px 0 !important; }
}
@media (prefers-reduced-motion: reduce) {
  .kairos-site .vitae-principle:hover,
  .kairos-site .vitae-module:hover,
  .kairos-site .vitae-card:hover,
  .kairos-site .vitae-agent:hover { transform: none !important; }
}
`}</style>
  );
}
