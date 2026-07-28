"use client";
// Hero — "Vive el proceso". Fondo dark tech + dashboard Notion en perspectiva.
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "./ds";
import { Reveal } from "./primitives";
import { ArrowRight } from "./icons";
import { HeroDashboard } from "./HeroDashboard";

const KAIROS_INK_HERO = "#0D0D0D";

export function Hero() {
  const t = useTranslations("Hero");
  const reduce = typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const stageRef = React.useRef(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const onMove = (e) => {
    if (reduce) return;
    const r = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: px, y: py });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="top" ref={stageRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{
      position: "relative", overflow: "hidden", background: KAIROS_INK_HERO,
      paddingTop: "clamp(112px, 15vh, 168px)", paddingBottom: "clamp(0px, 4vw, 40px)",
    }}>
      <HeroBackdrop reduce={reduce} />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 980, marginInline: "auto", padding: "0 var(--space-6)", textAlign: "center" }}>
        <Reveal delay={80} as="h1" style={{
          fontFamily: "Satoshi", fontWeight: 500, textTransform: "lowercase",
          // Fluido: a 80px fijos el titular desbordaba en móviles estrechos.
          fontSize: "clamp(2.75rem, 9vw, 80px)", lineHeight: 0.98, letterSpacing: "0.005em",
          color: "rgb(255, 255, 255)", margin: 0, textWrap: "balance",
        }}>
          {t("title")}
        </Reveal>

        <Reveal delay={160} as="p" style={{
          fontSize: "clamp(1.05rem, 2vw, 1.4rem)", lineHeight: "var(--leading-snug)",
          color: "var(--text-on-dark-body)", fontWeight: 400, margin: "1.6rem auto 0", maxWidth: "52ch", textWrap: "balance",
        }}>
          {t("subtitleA")}<br /> {t("subtitleB")}{" "}
          <span style={{ color: "#F96302", fontWeight: 600 }}>Notion</span>
        </Reveal>

        <Reveal delay={240} style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-6)", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contacto" style={{ textDecoration: "none" }}>
            <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>{t("ctaPrimary")}</Button>
          </a>
          <a href="#casos" className="kairos-hero-ghost" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.55rem",
            height: 56, padding: "0 1.5rem", borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-on-dark)", color: "var(--text-on-dark-strong)",
            fontFamily: "var(--font-sans)", fontSize: "1.0625rem", fontWeight: "var(--weight-semibold)",
            letterSpacing: "-0.005em", textDecoration: "none",
            transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
          }}>
            {t("ctaSecondary")}
          </a>
        </Reveal>

        <Reveal delay={320} as="div" className="kairos-trustbar" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(12px, 2vw, 22px)",
          flexWrap: "wrap", marginTop: "var(--space-6)",
          fontFamily: "var(--font-mono)", fontSize: 12.5, letterSpacing: "0.02em", color: "var(--text-on-dark-faint)",
        }}>
          <Image src="/assets/notion-certified-consultant.png" alt={t("notionBadgeAlt")}
            width={162} height={50}
            style={{ height: 50, width: "auto", display: "block", opacity: 0.92 }} />
        </Reveal>
      </div>

      <Reveal delay={380} className="kairos-hero-stage" style={{
        position: "relative", zIndex: 2, width: "100%", maxWidth: 1080,
        marginInline: "auto", marginTop: "clamp(2.5rem, 5vw, 4.5rem)",
        padding: "0 var(--space-6)", perspective: 1600,
      }}>
        <HeroDashboard tilt={tilt} reduce={reduce} />
      </Reveal>
    </section>
  );
}

function HeroBackdrop({ reduce }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(245,237,230,0.05) 1px, transparent 1px)",
        backgroundSize: "34px 34px", maskImage: "radial-gradient(120% 90% at 50% 30%, #000 35%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(120% 90% at 50% 30%, #000 35%, transparent 80%)",
      }} />
      <div className={reduce ? "" : "kairos-hero-glow"} style={{
        position: "absolute", left: "50%", top: "62%", width: "min(1000px, 90vw)", height: 620,
        transform: "translate(-50%, -50%)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,99,2,0.28) 0%, rgba(249,99,2,0.10) 38%, transparent 68%)",
        filter: "blur(20px)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(130% 100% at 50% 18%, transparent 40%, rgba(10,9,8,0.55) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, mixBlendMode: "overlay", pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />
    </div>
  );
}
