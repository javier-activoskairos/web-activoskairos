"use client";
// Primitivas de layout + scroll-reveal del kit Kairos.
import React from "react";

/** Reveal-on-scroll. Respeta prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 22, as = "div", style = {}, ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translateY(${y}px)`,
      transition: `opacity var(--dur-reveal) var(--ease-out) ${delay}ms, transform var(--dur-reveal) var(--ease-out) ${delay}ms`,
      ...style,
    }} {...rest}>
      {children}
    </Tag>
  );
}

export function Container({ children, wide = false, style = {}, ...rest }) {
  return (
    <div style={{
      width: "100%",
      maxWidth: wide ? "var(--container-wide)" : "var(--container)",
      marginInline: "auto",
      paddingInline: "var(--gutter)",
      ...style,
    }} {...rest}>
      {children}
    </div>
  );
}

/** Banda a ancho completo. tone alterna el ritmo cream/dark. */
export function Section({ children, tone = "light", style = {}, id, ...rest }) {
  const tones = {
    light: { background: "var(--surface-page)", color: "var(--text-body)" },
    raised: { background: "var(--cream-050)", color: "var(--text-body)" },
    dark: { background: "var(--surface-page-dark)", color: "var(--text-on-dark-body)" },
  }[tone];
  return (
    <section id={id} style={{ paddingBlock: "var(--section-y)", ...tones, ...style }} {...rest}>
      {children}
    </section>
  );
}
