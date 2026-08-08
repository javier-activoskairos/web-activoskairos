"use client";
// Módulo del curso (Fundamentos, Mail, Calendar).
import React from "react";
import { Check } from "../icons";

export function CourseModule({ modulo }) {
  return (
    <article
      style={{
        background: "var(--surface-card)",
        border: "1px solid rgba(26,23,20,0.08)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sm)",
        padding: "clamp(1.4rem, 2.4vw, 2rem)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          flexWrap: "wrap",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 38,
            height: 38,
            borderRadius: "var(--radius-sm)",
            background: "var(--accent-soft)",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {modulo.n}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-h4)",
            color: "var(--text-strong)",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {modulo.t}
        </h3>
        <span
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 11px",
            borderRadius: "var(--radius-pill)",
            background: "var(--success-bg)",
            color: "var(--success)",
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          <Check size={13} /> Disponible
        </span>
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {modulo.bullets.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              gap: 11,
              fontSize: "var(--text-sm)",
              lineHeight: 1.55,
              color: "var(--text-body)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                marginTop: 8,
              }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
