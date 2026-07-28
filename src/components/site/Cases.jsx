"use client";
// Casos de éxito — fichas de caso a pantalla completa sobre negro.
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container, Reveal } from "./primitives";
import { ChevronRight, ArrowUpRight } from "./icons";

const KAIROS_CARD = "var(--surface-card)";
const KAIROS_BODY = "var(--text-muted)";
const KAIROS_ACCENT = "#F96302";
const KAIROS_ACCENT_GRAD = "linear-gradient(135deg, #F96302 0%, #F9962E 100%)";

const PRODUCTS = {
  Initia: "initia.png",
  Flux: "flux.png",
  Sophos: "sophos.png",
  Tempo: "tempo.png",
  Stasis: "stasis.png",
};

// Datos no traducibles de cada caso (logo, cifras, recorrido). Todo el texto
// vive en `messages/*.json` bajo el prefijo `key`.
const CASE_META = [
  {
    key: "mintech", logo: "mintech.png", name: "Mintech Management", logoH: 64,
    recorrido: ["Initia", "Sophos", "Tempo"],
    metricValues: ["+10h", "+30"],
  },
  {
    key: "lasavia", logo: "lasaviasabia.png", name: "Lasaviasabia", logoH: 88,
    recorrido: ["Initia", "Sophos", "Stasis"],
    metricValues: ["4h → min", "3h"],
  },
  {
    key: "finanzas", logo: "finanzas-conscientes.png", name: "Finanzas Conscientes", logoH: 72,
    recorrido: ["Initia", "Flux", "Tempo"],
    metricValues: ["−30min", "−15%"],
  },
  {
    key: "biventia", logo: "biventia.png", name: "Biventia", logoH: 84,
    recorrido: ["Initia", "Flux", "Tempo"],
    metricValues: ["3h → 30min", "−80%"],
  },
  {
    key: "martillo", logo: "elmartillo.png", name: "El Martillo", logoH: 80,
    recorrido: ["Initia", "Flux", "Tempo", "Stasis"],
    metricValues: ["20h", "+500"],
    hasQuote: true,
  },
];

function useCases() {
  const t = useTranslations("Cases");
  return CASE_META.map((c) => ({
    ...c,
    sector: t(`${c.key}Sector`),
    ubicacion: t(`${c.key}Location`),
    summary: t(`${c.key}Summary`),
    metrics: [
      { v: c.metricValues[0], l: t(`${c.key}M1L`) },
      { v: c.metricValues[1], l: t(`${c.key}M2L`) },
    ],
    reto: t(`${c.key}Reto`),
    solucion: t(`${c.key}Solucion`),
    resultados: [1, 2, 3, 4].map((n) => t(`${c.key}R${n}`)),
    // Sólo El Martillo tiene testimonio validado. Los demás no muestran bloque:
    // antes renderizaban el marcador «[Insertar aquí frase/reseña del cliente]»
    // en producción.
    quote: c.hasQuote ? t(`${c.key}Quote`) : null,
    author: c.hasQuote ? t(`${c.key}Author`) : null,
  }));
}

function prefersReduced() {
  return typeof window !== "undefined"
    && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Cases() {
  const t = useTranslations("Cases");
  const reduce = prefersReduced();
  const cases = useCases();

  return (
    <section id="casos" style={{ background: "var(--surface-page)", paddingBlock: "var(--section-y)", color: "var(--text-body)", overflow: "hidden" }}>
      <Container>
        <div style={{ maxWidth: 880, marginBottom: "var(--space-7)" }}>
          <Reveal>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: "var(--text-eyebrow)",
              letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase",
              color: KAIROS_ACCENT, fontWeight: 600,
            }}>{t("eyebrow")}</span>
          </Reveal>
          <Reveal delay={90} as="h2" style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "var(--text-h2)", lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-tight)", color: "var(--text-strong)", margin: "1rem 0 0", textWrap: "balance",
          }}>
            {t("title")}
          </Reveal>
          <Reveal delay={150} as="p" style={{
            margin: "1.1rem 0 0", fontSize: "var(--text-lead)", lineHeight: "var(--leading-normal)", color: "var(--text-muted)", maxWidth: "60ch", textWrap: "balance",
          }}>
            <span style={{ color: "var(--text-strong)", fontWeight: 600 }}>{t("leadStrong")}</span> {t("leadRest")}<br /><span style={{ color: KAIROS_ACCENT, fontWeight: 600 }}>{t("leadAccent")}</span>.
          </Reveal>
        </div>

        <Gallery items={cases} reduce={reduce} />
      </Container>
    </section>
  );
}

function Gallery({ items, reduce }) {
  const [sel, setSel] = React.useState(null);
  const posRef = React.useRef({ offset: 0, paused: false });
  return (
    <div>
      {sel === null
        ? <Marquee items={items} reduce={reduce} onOpen={setSel} posRef={posRef} />
        : <CaseDetail c={items[sel]} reduce={reduce} onBack={() => setSel(null)} />}
    </div>
  );
}

function Marquee({ items, reduce, onOpen, posRef }) {
  const trackRef = React.useRef(null);
  const offset = React.useRef(posRef.current.offset);
  const half = React.useRef(0);
  const paused = React.useRef(posRef.current.paused);
  const drag = React.useRef({ on: false, x0: 0, base: 0, moved: false, id: null });
  const [tx, setTx] = React.useState(posRef.current.offset);
  const [grab, setGrab] = React.useState(false);
  const loopList = reduce ? items : items.concat(items);

  React.useEffect(() => {
    if (reduce) return;
    const measure = () => { if (trackRef.current) half.current = trackRef.current.scrollWidth / 2; };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    let raf, last = performance.now();
    const SPEED = 26;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (!paused.current && !drag.current.on) {
        offset.current -= SPEED * dt;
        if (half.current && offset.current <= -half.current) offset.current += half.current;
        setTx(offset.current);
      }
      posRef.current.offset = offset.current;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); posRef.current.offset = offset.current; };
  }, [reduce]);

  const normalize = (v) => {
    if (!half.current) return v;
    let x = v;
    while (x > 0) x -= half.current;
    while (x <= -half.current) x += half.current;
    return x;
  };

  const onDown = (e) => {
    if (reduce) return;
    drag.current = { on: true, x0: e.clientX, base: offset.current, moved: false, id: e.pointerId, vp: e.currentTarget };
    setGrab(true);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = e.clientX - d.x0;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      try { d.vp.setPointerCapture(d.id); } catch (_) {}
    }
    if (!d.moved) return;
    offset.current = normalize(d.base + dx);
    setTx(offset.current);
  };
  const onUp = () => {
    drag.current.on = false;
    setGrab(false);
  };
  const tileClick = (i) => { if (!drag.current.moved) onOpen(i % items.length); };

  return (
    <div
      className="kairos-marquee-vp"
      onMouseEnter={() => { paused.current = true; posRef.current.paused = true; }}
      onMouseLeave={() => { paused.current = false; posRef.current.paused = false; }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={{
        overflow: reduce ? "auto" : "hidden",
        cursor: reduce ? "default" : (grab ? "grabbing" : "grab"),
        margin: "0 calc(-1 * var(--gutter))", padding: "6px var(--gutter)", touchAction: "pan-y",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
      }}>
      <div ref={trackRef} style={{
        display: "flex", gap: "clamp(14px, 1.4vw, 20px)", width: "max-content",
        transform: reduce ? "none" : `translateX(${tx}px)`,
      }}>
        {loopList.map((c, i) => (
          <IdentityTile key={i} c={c} reduce={reduce} onClick={() => tileClick(i)} />
        ))}
      </div>
    </div>
  );
}

function IdentityTile({ c, reduce, onClick }) {
  const t = useTranslations("Cases");
  return (
    <button type="button" onClick={onClick} className="kairos-tile"
      aria-label={t("openCase", { name: c.name })}
      style={{
        flex: "0 0 auto", width: 300, height: 226, boxSizing: "border-box",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
        textAlign: "center", cursor: "inherit", position: "relative", overflow: "hidden",
        background: KAIROS_CARD, border: "1px solid rgba(26,23,20,0.08)", borderRadius: 18, boxShadow: "var(--shadow-sm)",
        padding: "clamp(1.3rem, 1.8vw, 1.7rem)", color: "var(--text-strong)",
        transition: reduce ? "none" : "transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease",
      }}>
      <span aria-hidden="true" className="kairos-tile-glow" style={{
        position: "absolute", top: -60, right: -60, width: 160, height: 160, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,99,2,0.22), transparent 70%)", opacity: 0,
        transition: reduce ? "none" : "opacity 280ms ease", pointerEvents: "none",
      }} />
      <span className="kairos-tile-cta" style={{ position: "absolute", top: 14, right: 14, display: "inline-flex", color: KAIROS_ACCENT, opacity: 0.55, transition: reduce ? "none" : "transform 240ms ease, opacity 240ms ease" }}>
        <ArrowUpRight size={17} />
      </span>
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image src={`/assets/clients/${c.logo}`} alt={c.name} width={150} height={44}
          style={{ maxHeight: 44, maxWidth: "70%", width: "auto", height: "auto", objectFit: "contain", display: "block" }} />
      </div>
      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-h4)", color: "var(--text-strong)", margin: 0, lineHeight: 1.15 }}>{c.name}</h3>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: KAIROS_ACCENT, fontWeight: 600, marginTop: 7 }}>{c.sector}</div>
      </div>
      <span style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
        {c.recorrido.map((p) => (
          <Image key={p} src={`/assets/products/${PRODUCTS[p]}`} alt="" aria-hidden="true" title={p} width={19} height={19}
            style={{ width: 19, height: 19, objectFit: "contain", display: "block", opacity: 0.92 }} />
        ))}
      </span>
    </button>
  );
}

function CaseDetail({ c, reduce, onBack }) {
  const t = useTranslations("Cases");
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (reduce || !ref.current) return;
    ref.current.animate(
      [{ opacity: 0, transform: "scale(0.985)" }, { opacity: 1, transform: "none" }],
      { duration: 360, easing: "cubic-bezier(.22,.61,.36,1)" },
    );
  }, []);
  return (
    <div ref={ref}>
      <button type="button" onClick={onBack} className="kairos-back" style={{
        display: "inline-flex", alignItems: "center", gap: 9, background: "none",
        border: "1px solid var(--border-strong, rgba(26,23,20,0.18))", borderRadius: 999, padding: "9px 16px 9px 12px",
        color: "var(--text-body)", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "var(--text-sm)",
        marginBottom: "var(--space-5)", transition: reduce ? "none" : "border-color 220ms ease, color 220ms ease",
      }}>
        <span style={{ display: "inline-flex", color: KAIROS_ACCENT, transform: "scaleX(-1)" }}><ChevronRight size={16} /></span>
        {t("back")}
      </button>
      <CaseRecord {...c} reduce={reduce} />
    </div>
  );
}

function CaseRecord(c) {
  const t = useTranslations("Cases");
  const { reduce } = c;
  const [open, setOpen] = React.useState(null);
  const toggle = (i) => setOpen((cur) => (cur === i ? null : i));

  const disclosures = [
    {
      key: "retosol", label: t("discRetoSol"),
      node: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={subHeadStyle}>{t("reto")}</div>
            <p style={pStyle}>{c.reto}</p>
          </div>
          <div>
            <div style={subHeadStyle}>{t("solucion")}</div>
            <p style={pStyle}>{c.solucion}</p>
          </div>
        </div>
      ),
    },
    {
      key: "res", label: t("discResults"),
      node: (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
          {c.resultados.map((r, i) => (
            <li key={i} style={{ display: "flex", gap: 11, fontSize: "var(--text-sm)", lineHeight: 1.5, color: "var(--text-body)" }}>
              <span aria-hidden="true" style={{ flexShrink: 0, width: 6, height: 6, borderRadius: "50%", background: KAIROS_ACCENT, marginTop: 7 }} />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <article className="kairos-case" style={{
      background: KAIROS_CARD, borderRadius: 20, border: "1px solid rgba(26,23,20,0.08)", boxShadow: "var(--shadow-md)",
      padding: "clamp(1.5rem, 2.6vw, 2.5rem)", display: "grid",
      gridTemplateColumns: "minmax(0, 30%) 1px minmax(0, 1fr)", gap: "clamp(1.5rem, 2.6vw, 2.6rem)", alignItems: "stretch",
      boxSizing: "border-box",
    }}>
      <CaseSidebar {...c} />
      <div aria-hidden="true" className="kairos-case-rule" style={{ background: KAIROS_ACCENT_GRAD, borderRadius: 2, alignSelf: "stretch" }} />
      <div className="kairos-case-main" style={{ display: "flex", flexDirection: "column", minHeight: 0, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "clamp(1.25rem, 2.4vw, 2.25rem)", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 4vw, 3.6rem)", lineHeight: 1, color: KAIROS_ACCENT, letterSpacing: "-0.02em" }}>{c.metrics[0].v}</div>
            <div style={{ fontSize: "var(--text-sm)", color: KAIROS_BODY, marginTop: 8, lineHeight: 1.3 }}>{c.metrics[0].l}</div>
          </div>
          {c.metrics[1] && (
            <div style={{ paddingLeft: "clamp(1.25rem, 2.4vw, 2.25rem)", borderLeft: "1px solid rgba(26,23,20,0.12)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", lineHeight: 1, color: "var(--text-strong)" }}>{c.metrics[1].v}</div>
              <div style={{ fontSize: "var(--text-xs, 0.78rem)", color: KAIROS_BODY, marginTop: 6, lineHeight: 1.3 }}>{c.metrics[1].l}</div>
            </div>
          )}
        </div>

        <p style={{
          margin: "clamp(1.1rem, 2vw, 1.6rem) 0 0", flexShrink: 0,
          fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
          lineHeight: 1.4, color: "var(--text-strong)", textWrap: "balance",
        }}>{c.summary}</p>

        <div className="kairos-case-acc" style={{
          marginTop: "clamp(1.1rem, 2vw, 1.5rem)",
          borderTop: "1px solid rgba(26,23,20,0.08)",
        }}>
          {disclosures.map((d, i) => (
            <Disclosure key={d.key} label={d.label} isOpen={open === i} onToggle={() => toggle(i)} reduce={reduce}>
              {d.node}
            </Disclosure>
          ))}
        </div>

        <CaseFooter quote={c.quote} author={c.author} />
      </div>
    </article>
  );
}

function Disclosure({ label, isOpen, onToggle, reduce, children }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(26,23,20,0.08)" }}>
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="kairos-disc-btn" style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        background: "none", border: "none", cursor: "pointer", padding: "14px 2px",
        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--text-strong)", textAlign: "left",
      }}>
        <span>{label}</span>
        <span style={{
          display: "inline-flex", color: KAIROS_ACCENT, flexShrink: 0,
          transform: isOpen ? "rotate(90deg)" : "none", transition: reduce ? "none" : "transform 280ms cubic-bezier(.22,.61,.36,1)",
        }}><ChevronRight size={18} /></span>
      </button>
      <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: reduce ? "none" : "grid-template-rows 300ms cubic-bezier(.22,.61,.36,1)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ paddingBottom: 16 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function CaseSidebar({ logo, name, logoH, sector, ubicacion, recorrido }) {
  const t = useTranslations("Cases");
  const metas = [
    [t("sector"), sector],
    [t("location"), ubicacion],
  ].filter(([, v]) => v);
  const h = Math.min(logoH, 64);
  return (
    <div className="kairos-case-side" style={{ display: "flex", flexDirection: "column", gap: "clamp(1.25rem, 2.4vw, 2rem)", minWidth: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
        <Image src={`/assets/clients/${logo}`} alt={name} width={h} height={h}
          style={{ height: h, width: "auto", maxWidth: "100%", objectFit: "contain", objectPosition: "left", display: "block" }} />
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--text-h4)", color: "var(--text-strong)", margin: 0, lineHeight: 1.15 }}>{name}</h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
        {metas.map(([k, v]) => (
          <div key={k}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: KAIROS_ACCENT, fontWeight: 600 }}>{k}</div>
            <div style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", marginTop: 4, lineHeight: 1.4 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", marginTop: "auto", paddingTop: "var(--space-4)", borderTop: "1px solid rgba(26,23,20,0.08)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: KAIROS_BODY, fontWeight: 600, marginBottom: 12 }}>{t("journey")}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {recorrido.map((p) => (
            <span key={p} title={p} style={{
              display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 10px 5px 6px", borderRadius: 999,
              background: "var(--accent-soft)", border: "1px solid rgba(26,23,20,0.1)",
            }}>
              <Image src={`/assets/products/${PRODUCTS[p]}`} alt="" aria-hidden="true" width={18} height={18} style={{ width: 18, height: 18, objectFit: "contain", display: "block" }} />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12.5, color: "var(--text-strong)" }}>{p}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const pStyle = { margin: 0, fontSize: "var(--text-sm)", lineHeight: 1.6, color: KAIROS_BODY };
const subHeadStyle = { fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: KAIROS_ACCENT, fontWeight: 600, marginBottom: 7 };

function CaseFooter({ quote, author }) {
  // Sin testimonio validado no se pinta nada. Antes se colaba el marcador
  // «[Insertar aquí frase/reseña del cliente]» en 4 de los 5 casos.
  if (!quote) return null;
  return (
    <div style={{ flexShrink: 0, marginTop: "clamp(0.9rem, 1.6vw, 1.3rem)", paddingTop: "var(--space-4)", borderTop: "1px solid rgba(26,23,20,0.08)" }}>
      <p style={{ margin: 0, fontStyle: "italic", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", color: "var(--text-strong)", lineHeight: 1.4, textWrap: "balance" }}>{`«${quote}»`}</p>
      {author && <p style={{ margin: "8px 0 0", fontStyle: "italic", fontSize: "var(--text-sm)", color: KAIROS_BODY, fontWeight: 500 }}>— {author}</p>}
    </div>
  );
}
