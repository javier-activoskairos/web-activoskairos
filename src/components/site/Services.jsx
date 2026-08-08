"use client";
// El ecosistema Kairos — "El hilo Kairos": recorrido interactivo de los 5
// activos conectados por un hilo naranja continuo (guiño al logo).
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Eyebrow, Button } from "./ds";
import { Container, Section, Reveal } from "./primitives";
import { ArrowRight } from "./icons";

function svcPrefersReduced() {
  return typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useSvcInView(ref, threshold = 0.3) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return seen;
}
function useSvcMobile(bp = 760) {
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const on = () => setM(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

// Orden narrativo: montar → automatizar → construir → dar ritmo → mantener vivo.
// El copy vive en `messages/*.json`; aquí sólo la clave y el logo.
const ECOSYSTEM_KEYS = [
  { key: "initia", logo: "initia.png", name: "Initia" },
  { key: "flux", logo: "flux.png", name: "Flux" },
  { key: "sophos", logo: "sophos.png", name: "Sophos" },
  { key: "tempo", logo: "tempo.png", name: "Tempo" },
  { key: "stasis", logo: "stasis.png", name: "Stasis" },
];

function useEcosystem() {
  const t = useTranslations("Services");
  return ECOSYSTEM_KEYS.map((it) => ({
    ...it,
    title: t(`${it.key}Title`),
    d: t(`${it.key}Body`),
    result: t(`${it.key}Result`),
    step: t(`${it.key}Step`),
  }));
}

const NODES = [
  { x: 90, y: 100 }, { x: 300, y: 58 }, { x: 500, y: 108 }, { x: 700, y: 54 }, { x: 910, y: 96 },
];
const THREAD_SEGMENTS = [
  { d: "M20,98 C55,101 70,100 90,100 C175,100 215,58 300,58 C385,58 415,108 500,108 C585,108 615,54 700,54 C785,54 835,96 910,96 C945,96 965,95 980,95", delay: 0 },
];
const VB_W = 1000, VB_H = 170;

export function Services() {
  const t = useTranslations("Services");
  const ecosystem = useEcosystem();
  return (
    <Section tone="light" id="activos">
      <Container>
        <div style={{ maxWidth: 680, marginBottom: "var(--space-8)" }}>
          <Reveal><Eyebrow tick={false}>{t("eyebrow")}</Eyebrow></Reveal>
          <Reveal delay={60} as="h2" style={{
            fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-h2)", lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-tight)", color: "var(--text-strong)", margin: "1rem 0 0", textWrap: "balance",
          }}>
            {t("title")}
          </Reveal>
          <Reveal delay={120} as="p" style={{
            fontSize: "var(--text-lead)", lineHeight: "var(--leading-normal)",
            color: "var(--text-muted)", margin: "1.1rem 0 0",
          }}>
            {t("lead")}
          </Reveal>
        </div>

        <KairosThread items={ecosystem} />

        <Reveal delay={120}>
          <DiscoveryBanner />
        </Reveal>
      </Container>
    </Section>
  );
}

function KairosThread({ items }) {
  const isMobile = useSvcMobile();
  const [active, setActive] = React.useState(0);
  const wrapRef = React.useRef(null);
  const inView = useSvcInView(wrapRef, 0.25);
  const reduce = svcPrefersReduced();

  return (
    <div ref={wrapRef}>
      {isMobile
        ? <ThreadVertical items={items} active={active} setActive={setActive} inView={inView} reduce={reduce} />
        : (
          <React.Fragment>
            <ThreadHorizontal items={items} active={active} setActive={setActive} inView={inView} reduce={reduce} />
            {/* SEO: los 5 paneles se renderizan siempre (el inactivo va con
                display:none, no se desmonta), para que el contenido de Flux,
                Sophos, Tempo y Stasis esté en el HTML servido y sea indexable.
                Antes sólo se pintaba items[active] → sólo Initia salía en el SSR. */}
            {items.map((it, i) => (
              <DetailPanel key={it.key} item={it} reduce={reduce} activeKey={active} hidden={i !== active} />
            ))}
          </React.Fragment>
        )}
    </div>
  );
}

function ThreadPath({ d, drawn, reduce, delay }) {
  const ref = React.useRef(null);
  const [len, setLen] = React.useState(0);
  React.useEffect(() => { if (ref.current) setLen(ref.current.getTotalLength()); }, []);
  return (
    <path ref={ref} d={d} fill="none" stroke="#F96302" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
      style={{
        strokeDasharray: len, strokeDashoffset: drawn ? 0 : len,
        transition: reduce ? "none" : `stroke-dashoffset 760ms cubic-bezier(.33,.9,.4,1) ${delay}ms`,
      }} />
  );
}

function ThreadHorizontal({ items, active, setActive, inView, reduce }) {
  const drawn = reduce || inView;

  return (
    <div style={{ position: "relative", width: "100%", height: "clamp(240px, 24vw, 284px)" }}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }} aria-hidden="true">
        {THREAD_SEGMENTS.map((s, i) => (
          <path key={`b${i}`} d={s.d} fill="none" stroke="var(--border-strong, rgba(26,23,20,0.12))" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
        {THREAD_SEGMENTS.map((s, i) => (
          <ThreadPath key={`f${i}`} d={s.d} drawn={drawn} reduce={reduce} delay={s.delay} />
        ))}
      </svg>

      {items.map((it, i) => {
        const p = NODES[i];
        const appearDelay = reduce ? 0 : 260 + i * 165;
        return (
          <button key={it.name} type="button"
            className="kairos-node" aria-pressed={i === active}
            onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
            style={{
              position: "absolute", left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%`,
              transform: "translate(-50%, -50%)", background: "none", border: "none", padding: 0, cursor: "pointer",
              opacity: inView || reduce ? 1 : 0, zIndex: i === active ? 3 : 2,
              transition: reduce ? "none" : `opacity 420ms ease ${appearDelay}ms, transform 420ms cubic-bezier(.22,.61,.36,1) ${appearDelay}ms`,
            }}>
            <span className="kairos-node-badge" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 68, height: 68, borderRadius: "50%", background: "var(--surface-card, #fff)",
              border: `2px solid ${i === active ? "#F96302" : "var(--border-subtle, rgba(26,23,20,0.1))"}`,
              boxShadow: i === active ? "0 0 0 6px rgba(249,99,2,0.10), 0 10px 24px -12px rgba(249,99,2,0.5)" : "var(--shadow-sm, 0 2px 8px rgba(26,23,20,0.06))",
              transition: "border-color 280ms ease, box-shadow 280ms ease",
            }}>
              <Image src={`/assets/products/${it.logo}`} alt="" aria-hidden="true" width={32} height={32}
                style={{ width: 32, height: 32, objectFit: "contain", display: "block", opacity: i === active ? 1 : 0.78 }} />
            </span>
            <span style={{
              position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)",
              whiteSpace: "nowrap", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
              color: i === active ? "#F96302" : "var(--text-strong)", transition: "color 240ms ease",
            }}>{it.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function DetailPanel({ item, reduce, activeKey, hidden }) {
  return (
    <div style={{
      display: hidden ? "none" : "block",
      marginTop: "clamp(2.5rem, 4vw, 3.5rem)", background: "var(--surface-card, #fff)",
      borderRadius: "var(--radius-2xl, 20px)", border: "1px solid var(--border-subtle, rgba(26,23,20,0.08))",
      boxShadow: "var(--shadow-md, 0 12px 32px -16px rgba(26,23,20,0.18))",
      padding: "clamp(1.75rem, 3vw, 2.75rem)", overflow: "hidden",
    }}>
      <div key={activeKey} style={reduce ? {} : { animation: "kairosDetailIn 320ms cubic-bezier(.22,.61,.36,1)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-eyebrow)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-faint)", fontWeight: 600 }}>{item.step}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-h3)", letterSpacing: "var(--tracking-tight)", color: "var(--text-strong)", margin: "8px 0 2px" }}>{item.name}</h3>
        <div style={{ fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)", color: "#F96302", marginBottom: 16 }}>{item.title}</div>
        <p style={{ margin: 0, maxWidth: "62ch", fontSize: "var(--text-lead)", lineHeight: "var(--leading-normal)", color: "var(--text-muted)" }}>{item.d}</p>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: "var(--space-5)", paddingTop: "var(--space-5)", borderTop: "1px solid var(--border-subtle, rgba(26,23,20,0.08))" }}>
          <span aria-hidden="true" style={{ color: "#F96302", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, lineHeight: 1.3 }}>→</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-lead)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>{item.result}</span>
        </div>
      </div>
    </div>
  );
}

function ThreadVertical({ items, active, setActive, inView, reduce }) {
  return (
    <div style={{ position: "relative", paddingLeft: 4 }}>
      <div aria-hidden="true" style={{
        position: "absolute", left: 33, top: 12, bottom: 12, width: 2.5, borderRadius: 2,
        background: "#F96302", transformOrigin: "top",
        transform: inView || reduce ? "scaleY(1)" : "scaleY(0)",
        transition: reduce ? "none" : "transform 900ms cubic-bezier(.33,.9,.4,1)",
      }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        {items.map((it, i) => {
          const open = i === active;
          const delay = reduce ? 0 : 200 + i * 150;
          return (
            <React.Fragment key={it.name}>
            <div style={{
              position: "relative", display: "flex", gap: 18, alignItems: "flex-start",
              opacity: inView || reduce ? 1 : 0, transform: inView || reduce ? "none" : "translateY(12px)",
              transition: reduce ? "none" : `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
            }}>
              <span style={{
                flexShrink: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                width: 60, height: 60, borderRadius: "50%", background: "var(--surface-card, #fff)",
                border: `2px solid ${open ? "#F96302" : "var(--border-subtle, rgba(26,23,20,0.12))"}`,
                boxShadow: open ? "0 0 0 5px rgba(249,99,2,0.10)" : "var(--shadow-sm, 0 2px 8px rgba(26,23,20,0.06))",
                transition: "border-color 240ms ease, box-shadow 240ms ease",
              }}>
                <Image src={`/assets/products/${it.logo}`} alt="" aria-hidden="true" width={28} height={28} style={{ width: 28, height: 28, objectFit: "contain", opacity: open ? 1 : 0.8 }} />
              </span>
              <button type="button" onClick={() => setActive(open ? -1 : i)} aria-expanded={open}
                style={{
                  flex: 1, textAlign: "left", cursor: "pointer", background: "var(--surface-card, #fff)",
                  border: "1px solid var(--border-subtle, rgba(26,23,20,0.08))", borderRadius: "var(--radius-xl, 16px)",
                  boxShadow: open ? "var(--shadow-md, 0 12px 28px -16px rgba(26,23,20,0.18))" : "var(--shadow-sm, 0 2px 8px rgba(26,23,20,0.05))",
                  padding: "var(--space-5)", transition: "box-shadow 240ms ease",
                }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-faint)", fontWeight: 600 }}>{it.step}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-h4)", color: "var(--text-strong)", marginTop: 2 }}>{it.name}</div>
                  </div>
                  <span aria-hidden="true" style={{ color: "#F96302", fontSize: 22, fontWeight: 400, transform: open ? "rotate(45deg)" : "none", transition: "transform 260ms ease", lineHeight: 1 }}>+</span>
                </div>
                <div style={{ overflow: "hidden", maxHeight: open ? 320 : 0, opacity: open ? 1 : 0, transition: reduce ? "none" : "max-height 360ms ease, opacity 300ms ease", marginTop: open ? 12 : 0 }}>
                  <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "#F96302", marginBottom: 8 }}>{it.title}</div>
                  <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-muted)" }}>{it.d}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border-subtle, rgba(26,23,20,0.08))" }}>
                    <span aria-hidden="true" style={{ color: "#F96302", fontWeight: 700 }}>→</span>
                    <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: "var(--text-body)", lineHeight: "var(--leading-snug)" }}>{it.result}</span>
                  </div>
                </div>
              </button>
            </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function DiscoveryBanner() {
  const t = useTranslations("Services");
  return (
    <div style={{
      marginTop: "var(--space-7)", background: "#161616", borderRadius: "var(--radius-2xl)",
      padding: "clamp(1.6rem, 3vw, 2.4rem)", display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "var(--space-6)", flexWrap: "wrap", boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{ maxWidth: 620 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-eyebrow)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "#F96302", fontWeight: 600, marginBottom: 10 }}>
          {t("bannerEyebrow")}
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 700, letterSpacing: "var(--tracking-tight)", color: "var(--text-on-dark-strong)", margin: "0 0 8px", textWrap: "balance" }}>
          {t("bannerTitle")}
        </h3>
        <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-on-dark-muted)" }}>
          {t("bannerBody")}
        </p>
      </div>
      <a href="#contacto" style={{ textDecoration: "none", flexShrink: 0 }}>
        <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>{t("bannerCta")}</Button>
      </a>
    </div>
  );
}
