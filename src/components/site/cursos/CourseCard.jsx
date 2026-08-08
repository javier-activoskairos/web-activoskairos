"use client";
// Tarjeta del curso disponible en el hub `/cursos`.
import React from "react";
import { Eyebrow } from "../ds";
import { ArrowRight, Check } from "../icons";
import { trackEvent, EVENTS } from "@/lib/analytics";

export function CourseCard({ curso }) {
  const href = `/cursos/${curso.slug}`;
  const [hover, setHover] = React.useState(false);

  return (
    <a
      href={href}
      onClick={() =>
        trackEvent(EVENTS.courseCardClick, {
          cta_location: "hub",
          course: curso.slug,
        })
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: "var(--surface-card)",
        border: `1px solid ${hover ? "rgba(249,99,2,0.5)" : "rgba(26,23,20,0.08)"}`,
        borderRadius: "var(--radius-xl)",
        boxShadow: hover
          ? "0 24px 50px -24px rgba(249,99,2,0.35)"
          : "var(--shadow-sm)",
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        transition:
          "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          flexWrap: "wrap",
        }}
      >
        <Eyebrow tick={false}>Disponible</Eyebrow>
      </span>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--text-h3)",
          lineHeight: "var(--leading-snug)",
          letterSpacing: "var(--tracking-tight)",
          color: "var(--text-strong)",
          margin: "0.9rem 0 0",
        }}
      >
        {curso.nombre}
      </h3>

      <p
        style={{
          margin: "0.8rem 0 0",
          fontSize: "var(--text-lead)",
          lineHeight: "var(--leading-normal)",
          color: "var(--text-muted)",
          maxWidth: "52ch",
        }}
      >
        {curso.resumen}
      </p>

      {curso.bullets && (
        <ul
          style={{
            listStyle: "none",
            margin: "var(--space-5) 0 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {curso.bullets.map((b) => (
            <li
              key={b}
              style={{
                display: "flex",
                gap: 11,
                fontSize: "var(--text-sm)",
                lineHeight: 1.5,
                color: "var(--text-body)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  color: "var(--accent)",
                  display: "inline-flex",
                  marginTop: 2,
                }}
              >
                <Check size={16} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          marginTop: "var(--space-6)",
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-semibold)",
          fontSize: "var(--text-body)",
          color: "var(--accent)",
        }}
      >
        {curso.cta}
        <span
          style={{
            display: "inline-flex",
            transform: hover ? "translateX(3px)" : "none",
            transition: "transform var(--dur-base) var(--ease-out)",
          }}
        >
          <ArrowRight size={18} />
        </span>
      </span>
    </a>
  );
}

/** Curso anunciado sin landing ni fecha: informa, pero no enlaza a ninguna
 *  parte (evita páginas vacías y enlaces rotos). */
export function UpcomingCourseCard({ curso, etiqueta }) {
  return (
    <div
      style={{
        background: "var(--cream-050)",
        border: "1px dashed var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          fontWeight: 600,
        }}
      >
        {etiqueta}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-bold)",
          fontSize: "var(--text-h4)",
          color: "var(--text-strong)",
          margin: "0.6rem 0 0",
          lineHeight: 1.2,
        }}
      >
        {curso.nombre}
      </h3>
      <p
        style={{
          margin: "0.5rem 0 0",
          fontSize: "var(--text-sm)",
          lineHeight: "var(--leading-normal)",
          color: "var(--text-muted)",
        }}
      >
        {curso.resumen}
      </p>
    </div>
  );
}
