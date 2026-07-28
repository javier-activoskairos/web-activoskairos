"use client";
// Componentes base del design system Kairos: Button, Logo, Eyebrow.
import React from "react";
import Image from "next/image";

/** Acción primaria Kairos. El naranja se usa con moderación. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "0.5rem 0.9rem", fontSize: "0.875rem", height: "38px", radius: "var(--radius-sm)", gap: "0.4rem" },
    md: { padding: "0.7rem 1.25rem", fontSize: "0.9375rem", height: "46px", radius: "var(--radius-md)", gap: "0.5rem" },
    lg: { padding: "0.95rem 1.7rem", fontSize: "1.0625rem", height: "56px", radius: "var(--radius-md)", gap: "0.6rem" },
  }[size];

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: sizes.gap,
    width: fullWidth ? "100%" : "auto",
    height: sizes.height,
    padding: sizes.padding,
    fontFamily: "var(--font-sans)",
    fontSize: sizes.fontSize,
    fontWeight: "var(--weight-semibold)",
    letterSpacing: "-0.005em",
    lineHeight: 1,
    borderRadius: sizes.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition:
      "transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
    whiteSpace: "nowrap",
    textDecoration: "none",
    WebkitTapHighlightColor: "transparent",
  };

  const variants = {
    primary: { background: "var(--accent)", color: "var(--accent-contrast)", boxShadow: "var(--shadow-accent)" },
    secondary: { background: "var(--surface-raised)", color: "var(--text-strong)", borderColor: "var(--border-strong)", boxShadow: "var(--shadow-xs)" },
    ghost: { background: "transparent", color: "var(--text-strong)" },
    inverse: { background: "var(--text-on-dark-strong)", color: "var(--ink-900)" },
  }[variant];

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const hoverStyle = !disabled && hover ? {
    primary: { background: "var(--accent-hover)" },
    secondary: { borderColor: "var(--text-muted)", background: "var(--surface-page)" },
    ghost: { background: "var(--accent-soft)" },
    inverse: { background: "#fff" },
  }[variant] : {};

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...variants, ...hoverStyle, transform: active && !disabled ? "translateY(1px) scale(0.99)" : "none" }}
      {...rest}
    >
      {iconLeft && <span style={{ display: "inline-flex", marginLeft: "-0.1em" }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: "inline-flex", marginRight: "-0.1em" }}>{iconRight}</span>}
    </button>
  );
}

/** Logo Kairos. Los originales son enormes (5000x1000 el wordmark), así que
 *  van por next/image para que se sirvan redimensionados y en AVIF/WebP. */
export function Logo({ variant = "wordmark", theme = "auto", height, style = {}, priority = false, ...rest }) {
  const onDark = theme === "dark";
  const isMark = variant === "mark";
  const src = isMark
    ? "/assets/logo-mark.png"
    : onDark ? "/assets/logo-wordmark-light.png" : "/assets/logo-wordmark-dark.png";
  const h = height || (isMark ? 40 : 32);
  // Relación de aspecto de los originales: marca 1:1, wordmark 5:1.
  const w = Math.round(h * (isMark ? 1 : 5));
  return (
    <Image
      src={src}
      alt="Activos Kairos"
      width={w}
      height={h}
      priority={priority}
      style={{ height: `${h}px`, width: "auto", display: "block", userSelect: "none", ...style }}
      {...rest}
    />
  );
}

/** Etiqueta eyebrow en mayúsculas, sobre los titulares. */
export function Eyebrow({ children, tone = "accent", tick = true, style = {}, ...rest }) {
  const color = { accent: "var(--accent)", muted: "var(--text-muted)", "on-dark": "var(--text-on-dark-muted)" }[tone];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.55em",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-eyebrow)", fontWeight: "var(--weight-bold)",
        letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color, ...style,
      }}
      {...rest}
    >
      {tick && (
        <span style={{ width: "1.5em", height: 2, borderRadius: 2, background: tone === "accent" ? "var(--accent)" : "currentColor", opacity: tone === "accent" ? 1 : 0.5 }} />
      )}
      {children}
    </span>
  );
}
