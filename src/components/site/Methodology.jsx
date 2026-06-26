"use client";
// Dark problem statement + light 4-step methodology.
import React from "react";
import { Eyebrow } from "./ds";
import { Container, Section, Reveal } from "./primitives";
import {
  ArrowDown, Compass, Layers, Workflow, Gauge, Check, Sparkles, Mail,
  MessageCircle, Calendar, Table, Database, Users,
} from "./icons";

export function Problem() {
  const reduce = methReduced();
  const wrapRef = React.useRef(null);
  const inView = useMethInView(wrapRef, 0.2);
  const isMobile = useMethMobile(760);
  const [active, setActive] = React.useState(null);

  const voices = [
    { q: "Ese dato… ¿dónde estaba?", dx: "Información dispersa", rot: -4, size: "lg", pos: { left: "2%", top: "4%" }, float: 5.5 },
    { q: "Eso solo lo sabe Irene.", dx: "El conocimiento vive en la cabeza de una persona", rot: 3, size: "md", pos: { left: "54%", top: "0%" }, float: 6.5 },
    { q: "Otra vez rehaciendo el mismo informe.", dx: "Trabajo manual repetido", rot: -2, size: "md", pos: { left: "20%", top: "40%" }, float: 5 },
    { q: "Lo tenemos en cinco sitios distintos.", dx: "Sin una única fuente de verdad", rot: 5, size: "lg", pos: { left: "62%", top: "46%" }, float: 7 },
    { q: "Compramos esa herramienta y no la usa nadie.", dx: "Herramientas que no encajan", rot: -3, size: "sm", pos: { left: "6%", top: "74%" }, float: 6 },
  ];

  return (
    <Section tone="dark" id="sobre" style={{ position: "relative", overflow: "hidden", background: "#0D0D0D" }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(245,237,230,0.045) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(110% 80% at 50% 40%, #000 30%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(110% 80% at 50% 40%, #000 30%, transparent 78%)",
      }} />
      <Container style={{ position: "relative" }}>
        <div style={{ maxWidth: 880 }}>
          <Reveal><Eyebrow tone="on-dark" tick={false} style={{ color: "var(--accent)" }}>El problema</Eyebrow></Reveal>
          <Reveal delay={60} as="h2" style={{
            fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-h2)", lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-tight)", color: "var(--text-on-dark-strong)",
            margin: "1rem 0 0", textWrap: "balance",
          }}>
            Trabajas más que nunca, y aun así, <span style={{ color: "#F96302" }}>todo depende de ti</span>.
          </Reveal>
        </div>

        <div ref={wrapRef}>
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-7)" }}>
              {voices.map((v, i) => (
                <VoiceCard key={i} v={v} i={i} mobile active={active === i} dim={active !== null && active !== i}
                  inView={inView} reduce={reduce}
                  onToggle={() => setActive((a) => (a === i ? null : i))} />
              ))}
            </div>
          ) : (
            <div style={{ position: "relative", height: "clamp(440px, 46vw, 540px)", marginTop: "var(--space-7)" }}>
              {voices.map((v, i) => (
                <VoiceCard key={i} v={v} i={i} active={active === i} dim={active !== null && active !== i}
                  inView={inView} reduce={reduce}
                  onEnter={() => setActive(i)} onLeave={() => setActive(null)} />
              ))}
            </div>
          )}
        </div>

        <Reveal delay={120} style={{ marginTop: isMobile ? "var(--space-6)" : "var(--space-4)", textAlign: "center", maxWidth: 720, marginInline: "auto" }}>
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)", lineHeight: "var(--leading-snug)", color: "var(--text-on-dark-strong)", textWrap: "balance" }}>
            Si te suena, no es falta de esfuerzo.<br /><span style={{ color: "#F96302" }}>Es falta de un sistema.</span>
          </p>
          <a href="#metodologia" aria-label="Ver la solución" className="kairos-mirror-arrow" style={{
            display: "inline-flex", marginTop: "var(--space-5)", color: "#F96302",
            animation: reduce ? "none" : "kairosScrollHint 2.2s ease-in-out infinite",
          }}>
            <ArrowDown size={22} />
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

function VoiceCard({ v, i, active, dim, inView, reduce, onEnter, onLeave, onToggle, mobile }) {
  const fs = 18;
  const shown = inView || reduce;
  const delay = reduce ? 0 : i * 110;
  const floatAnim = (reduce || mobile || active) ? "none" : `kairosVoiceFloat ${v.float}s ease-in-out ${i * 0.4}s infinite`;

  const restRot = mobile ? v.rot * 0.5 : v.rot;
  const rot = active ? 0 : restRot;
  const lift = active ? (mobile ? 0 : -4) : 0;

  const base = {
    background: active ? "rgba(249,99,2,0.07)" : "var(--surface-raised-dark)",
    border: `1px solid ${active ? "rgba(249,99,2,0.55)" : "var(--border-on-dark)"}`,
    borderRadius: 14, padding: active ? "18px 20px" : "15px 18px",
    boxShadow: active ? "0 24px 50px -22px rgba(249,99,2,0.45)" : "0 10px 30px -20px rgba(0,0,0,0.6)",
    cursor: "default",
    opacity: shown ? (dim ? 0.32 : 1) : 0,
    filter: dim ? "blur(1px)" : "none",
    transition: reduce ? "none"
      : `opacity 420ms ease ${delay}ms, transform 320ms cubic-bezier(.22,.61,.36,1), border-color 280ms ease, background 280ms ease, box-shadow 280ms ease, filter 280ms ease`,
  };

  const inner = (
    <React.Fragment>
      <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: fs, lineHeight: 1.25, color: active ? "var(--text-on-dark-strong)" : "var(--text-on-dark-body)" }}>
        “{v.q}”
      </p>
      <div style={{
        overflow: "hidden",
        maxHeight: active ? 60 : 0, opacity: active ? 1 : 0,
        marginTop: active ? 10 : 0,
        transition: reduce ? "none" : "max-height 300ms ease, opacity 300ms ease, margin-top 300ms ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 16, height: 2, background: "#F96302", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase", color: "#F96302", fontWeight: 600 }}>{v.dx}</span>
        </div>
      </div>
    </React.Fragment>
  );

  if (mobile) {
    return (
      <button type="button" onClick={onToggle} aria-expanded={active}
        style={{ ...base, textAlign: "left", width: "100%", display: "block", transform: shown ? `rotate(${rot}deg)` : `translateY(16px) rotate(${restRot}deg)` }}>
        {inner}
      </button>
    );
  }

  return (
    <div
      tabIndex={0}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      onFocus={onEnter} onBlur={onLeave}
      className="kairos-voice"
      style={{
        ...base, position: "absolute", left: v.pos.left, top: v.pos.top,
        width: "clamp(220px, 23vw, 300px)", zIndex: active ? 5 : 1, outline: "none",
        animation: floatAnim,
        transform: shown ? `translateY(${lift}px) rotate(${rot}deg)` : `translateY(18px) rotate(${restRot}deg)`,
      }}>
      {inner}
    </div>
  );
}

function methReduced() {
  return typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useMethInView(ref, threshold = 0.28) {
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
function useMethMobile(bp = 760) {
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const on = () => setM(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

export function Methodology() {
  const steps = [
    { icon: <Compass size={20} />, n: "01", t: "Diagnóstico", d: "Mapeamos cómo trabajáis hoy y dónde se escapa el tiempo. Sin reuniones de relleno." },
    { icon: <Layers size={20} />, n: "02", t: "Diseño del activo", d: "Definimos la estructura de tu ERP, CRM o sistema de gestión sobre Notion." },
    { icon: <Workflow size={20} />, n: "03", t: "Automatización e IA", d: "Conectamos herramientas y añadimos IA donde de verdad ahorra trabajo." },
    { icon: <Gauge size={20} />, n: "04", t: "Adopción y mejora", d: "Formamos al equipo y afinamos el sistema hasta que se use solo." },
  ];
  return (
    <Section tone="light" id="metodologia">
      <Container>
        <div style={{ maxWidth: 760, marginBottom: "var(--space-8)" }}>
          <Reveal><Eyebrow tick={false}>Metodología</Eyebrow></Reveal>
          <Reveal delay={60} as="h2" style={{
            fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-h2)", lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-tight)", color: "rgb(0, 0, 0)", margin: "1rem 0 0", textWrap: "balance",
          }}>
            Cuatro pasos. Un activo que es tuyo.
          </Reveal>
          <Reveal delay={120} as="p" style={{ fontSize: "var(--text-lead)", color: "var(--text-muted)", margin: "1rem 0 0", lineHeight: "var(--leading-normal)", maxWidth: "54ch" }}>
            Nada de cajas negras: cada decisión queda documentada dentro de tu propio Notion.
          </Reveal>
        </div>
        <AssetBuilder steps={steps} />
      </Container>
    </Section>
  );
}

function AssetBuilder({ steps }) {
  const isMobile = useMethMobile();
  const reduce = methReduced();
  const wrapRef = React.useRef(null);
  const inView = useMethInView(wrapRef, 0.25);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (reduce) { setActive(3); return; }
    if (!inView || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 3200);
    return () => clearInterval(id);
  }, [inView, paused, reduce]);

  const pick = (i) => { setActive(i); setPaused(true); };

  const list = <StepList steps={steps} active={active} pick={pick} reduce={reduce} />;
  const canvas = <BuildCanvas active={active} reduce={reduce} />;

  return (
    <div ref={wrapRef}
      onMouseEnter={() => setPaused(true)}
      style={{
        display: "flex", flexDirection: isMobile ? "column" : "row",
        gap: "clamp(1.5rem, 3vw, 3rem)", alignItems: "stretch",
        opacity: inView || reduce ? 1 : 0, transition: reduce ? "none" : "opacity 500ms ease",
      }}>
      {isMobile
        ? <React.Fragment>{canvas}{list}</React.Fragment>
        : <React.Fragment>{list}{canvas}</React.Fragment>}
    </div>
  );
}

function StepList({ steps, active, pick, reduce }) {
  const isMobile = useMethMobile();
  return (
    <div style={{ flex: isMobile ? "auto" : "0 0 40%", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      {steps.map((s, i) => {
        const on = i === active;
        return (
          <button key={s.n} type="button" className="kairos-build-step" onClick={() => pick(i)} onMouseEnter={() => pick(i)}
            aria-pressed={on}
            style={{
              textAlign: "left", cursor: "pointer", width: "100%", display: "flex", gap: 16, alignItems: "flex-start",
              padding: "var(--space-5)", borderRadius: "var(--radius-xl, 16px)",
              background: on ? "var(--surface-card, #fff)" : "transparent",
              border: `1px solid ${on ? "var(--border-subtle, rgba(26,23,20,0.08))" : "transparent"}`,
              boxShadow: on ? "var(--shadow-md, 0 14px 30px -18px rgba(26,23,20,0.2))" : "none",
              opacity: on ? 1 : 0.5,
              transition: reduce ? "none" : "opacity 300ms ease, box-shadow 300ms ease, background 300ms ease, transform 300ms ease",
            }}>
            <span style={{
              flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 46, height: 46, borderRadius: "var(--radius-md, 12px)",
              background: on ? "#F96302" : "var(--accent-soft, rgba(249,99,2,0.1))",
              color: on ? "#fff" : "var(--kairos-orange-700, #c24a00)",
              transition: reduce ? "none" : "background 300ms ease, color 300ms ease",
            }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 700, letterSpacing: "var(--tracking-tight)", color: "var(--text-strong)", margin: 0 }}>{s.t}</h3>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-muted)" }}>{s.d}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function useMethCountUp(target, run, reduce, dur = 1100) {
  const [v, setV] = React.useState(reduce ? target : 0);
  React.useEffect(() => {
    if (!run) return;
    if (reduce) { setV(target); return; }
    let raf; const start = performance.now();
    const tick = (now) => {
      const tt = Math.min(1, (now - start) / dur);
      setV(target * (1 - Math.pow(1 - tt, 3)));
      if (tt < 1) raf = requestAnimationFrame(tick); else setV(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);
  return v;
}

function BuildCanvas({ active, reduce }) {
  const t = reduce ? "none" : "opacity 460ms cubic-bezier(.22,.61,.36,1), transform 460ms cubic-bezier(.22,.61,.36,1)";
  const built = active >= 1;
  const auto = active >= 2;
  const live = active >= 3;
  const statusAnim = (live && !reduce) ? "kairosGoalPulse 1.3s cubic-bezier(.22,.61,.36,1) 220ms 1" : "none";
  const fade = (show, y = 10) => ({ opacity: show ? 1 : 0, transform: show ? "none" : `translateY(${y}px) scale(0.99)`, transition: t });
  const hours = useMethCountUp(12, live, reduce);

  const colW = ["1.4fr", "0.9fr", "1fr", "0.7fr"];
  const cols = ["Cliente", "Estado", "Responsable", "Valor"];
  const rows = [
    ["Acme S.L.", "Activo", "Marta", "12.4k"],
    ["Nordia", "En curso", "Luis", "8.1k"],
    ["Vela Group", "Activo", "Ana", "21.0k"],
  ];
  const baseH = [40, 64, 52, 80, 58];
  const growH = [60, 82, 70, 98, 88];
  const tools = [
    { label: "Email", icon: <Mail size={13} />, x: 5, y: 8 },
    { label: "WhatsApp", icon: <MessageCircle size={13} />, x: 95, y: 10 },
    { label: "Make", icon: <Workflow size={13} />, x: 5, y: 92 },
    { label: "Calendario", icon: <Calendar size={13} />, x: 95, y: 90 },
  ];
  const team = [
    { i: "J", c: "#F96302" }, { i: "F", c: "#5B8DEF" }, { i: "A", c: "#4f9d63" },
  ];

  const solidCols = (auto && !live) ? "1.3fr 0.85fr 124px" : "1.55fr 1fr";

  return (
    <div className="kairos-canvas" style={{
      flex: 1, minWidth: 0, position: "relative", display: "flex", flexDirection: "column",
      background: "var(--surface-card, #fff)", borderRadius: 18,
      border: "1px solid var(--border-subtle, rgba(26,23,20,0.08))",
      boxShadow: live ? "0 0 0 1px rgba(249,99,2,0.16), 0 36px 80px -30px rgba(249,99,2,0.38)" : "var(--shadow-lg, 0 30px 60px -30px rgba(26,23,20,0.3))",
      padding: "clamp(18px, 2vw, 26px)", minHeight: "clamp(400px, 42vw, 480px)", overflow: "hidden",
      transition: reduce ? "none" : "box-shadow 500ms ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14, borderBottom: "1px solid var(--border-subtle, rgba(26,23,20,0.07))" }}>
        <span style={{ display: "flex", gap: 5 }}>
          {["#E5786A", "#F8B058", "#7FB98B"].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-strong)", marginLeft: 4 }}>Mi Operación</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-faint)" }}>· Notion</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {live ? (
            <span style={{ display: "flex", alignItems: "center" }}>
              {team.map((m, i) => (
                <span key={m.i} style={{
                  width: 24, height: 24, borderRadius: "50%", background: m.c, color: "#fff", marginLeft: i ? -7 : 0,
                  border: "2px solid var(--surface-card,#fff)", display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10.5, zIndex: team.length - i,
                  opacity: live ? 1 : 0, transform: live ? "none" : "scale(0.6)",
                  transition: reduce ? "none" : `opacity 360ms ease ${140 + i * 110}ms, transform 360ms cubic-bezier(.22,.61,.36,1) ${140 + i * 110}ms`,
                }}>{m.i}</span>
              ))}
            </span>
          ) : (
            <span style={{ display: "flex", gap: 5 }}>
              {[0, 1, 2].map((i) => <span key={i} style={{ width: 14, height: 4, borderRadius: 3, background: "var(--border-strong, rgba(26,23,20,0.14))" }} />)}
            </span>
          )}
        </span>
      </div>

      <div style={{ position: "relative", flex: 1, marginTop: 16 }}>
        <div style={{ position: "absolute", inset: 0, ...fade(!built) }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, height: "100%" }}>
            <div style={{ border: "1.5px dashed var(--border-strong, rgba(26,23,20,0.18))", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 9 }}>
              <span style={{ width: "45%", height: 9, borderRadius: 4, background: "var(--border-strong, rgba(26,23,20,0.13))" }} />
              {[0, 1, 2, 3].map((i) => <span key={i} style={{ width: ["90%", "78%", "84%", "66%"][i], height: 7, borderRadius: 4, background: "var(--border-subtle, rgba(26,23,20,0.08))" }} />)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { Ic: Database, cap: "datos sueltos" },
                { Ic: Users, cap: "sin responsable" },
              ].map((b, i) => (
                <div key={i} style={{ flex: 1, border: "1.5px dashed var(--border-strong, rgba(26,23,20,0.18))", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <b.Ic size={34} stroke={1.4} style={{ color: "var(--border-strong, rgba(26,23,20,0.22))" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-faint)" }}>{b.cap}</span>
                </div>
              ))}
            </div>
          </div>
          {[
            { txt: "reunión", Ic: Calendar, top: "4%", left: "6%", rot: -7 },
            { txt: "excel suelto", Ic: Table, top: "60%", left: "14%", rot: 5 },
            { txt: "emails", Ic: Mail, top: "30%", left: "70%", rot: 8 },
          ].map((nNote) => (
            <span key={nNote.txt} style={{
              position: "absolute", top: nNote.top, left: nNote.left, transform: `rotate(${nNote.rot}deg)`,
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)",
              background: "var(--cream-050, #FBF7F2)", border: "1px solid var(--border-subtle, rgba(26,23,20,0.1))",
              borderRadius: 7, padding: "5px 9px", boxShadow: "var(--shadow-sm, 0 2px 8px rgba(26,23,20,0.08))",
            }}><nNote.Ic size={13} style={{ color: "var(--text-faint)" }} />{nNote.txt}</span>
          ))}
        </div>

        <div style={{ position: "absolute", inset: 0, ...fade(built) }}>
          <div style={{ display: "grid", gridTemplateColumns: solidCols, gap: 14, height: "100%", transition: reduce ? "none" : "grid-template-columns 460ms cubic-bezier(.22,.61,.36,1)" }}>
            <div style={{ border: "1px solid var(--border-subtle, rgba(26,23,20,0.1))", borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 9, background: "var(--cream-050, #FBF7F2)", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#F96302" }} />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "var(--text-strong)" }}>Clientes · Base de datos</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: colW.join(" "), gap: 8 }}>
                {cols.map((c) => <span key={c} style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-faint)", fontWeight: 600 }}>{c}</span>)}
              </div>
              {rows.map((r, ri) => (
                <div key={ri} style={{
                  display: "grid", gridTemplateColumns: colW.join(" "), gap: 8, alignItems: "center",
                  paddingTop: 7, borderTop: "1px solid var(--border-subtle, rgba(26,23,20,0.07))",
                  opacity: built ? 1 : 0, transform: built ? "none" : "translateX(-6px)",
                  transition: reduce ? "none" : `opacity 420ms ease ${120 + ri * 90}ms, transform 420ms ease ${120 + ri * 90}ms`,
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-strong)" }}>{r[0]}</span>
                  <span style={{ justifySelf: "start", fontSize: 9.5, fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: r[1] === "Activo" ? "rgba(127,185,139,0.2)" : "var(--accent-soft, rgba(249,99,2,0.12))", color: r[1] === "Activo" ? "#3f7a4d" : "#c24a00" }}>{r[1]}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{r[2]}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-strong)" }}>{r[3]}</span>
                </div>
              ))}
              {auto && (
                <div className="kairos-ia-row" style={{
                  display: "grid", gridTemplateColumns: colW.join(" "), gap: 8, alignItems: "center",
                  paddingTop: 7, borderTop: "1px solid var(--border-subtle, rgba(26,23,20,0.07))", borderRadius: 6,
                  animation: reduce ? "none" : "kairosFlash 1.6s ease-out 220ms 1",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-strong)" }}>Zyper</span>
                  <span style={{ justifySelf: "start", fontSize: 9.5, fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: "rgba(127,185,139,0.2)", color: "#3f7a4d" }}>Activo</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, justifySelf: "start", fontSize: 8.5, fontWeight: 600, padding: "2px 6px", borderRadius: 999, background: "var(--accent-soft, rgba(249,99,2,0.12))", color: "#c24a00", whiteSpace: "nowrap" }}><Sparkles size={9} /> Añadido por IA</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-strong)" }}>9.8k</span>
                </div>
              )}
              {live && (
                <div style={{ marginTop: "auto", paddingTop: 12 }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", borderRadius: 999,
                    background: "rgba(127,185,139,0.16)", border: "1px solid rgba(127,185,139,0.55)", color: "#3f7a4d",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12.5,
                  }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#4f9d63", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", animation: statusAnim }}><Check size={12} /></span>
                    Funciona solo
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
              <div style={{ flex: 1, border: "1px solid var(--border-subtle, rgba(26,23,20,0.1))", borderRadius: 12, padding: 12, background: "var(--cream-050, #FBF7F2)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-faint)", fontWeight: 600 }}>Pipeline</span>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 46, marginTop: 10 }}>
                  {baseH.map((h, i) => (
                    <span key={i} style={{
                      flex: 1, height: live ? `${growH[i]}%` : (built ? `${h}%` : "8%"), borderRadius: 3, background: i === 3 ? "#F96302" : "rgba(249,99,2,0.28)",
                      transition: reduce ? "none" : `height 540ms cubic-bezier(.22,.61,.36,1) ${live ? i * 60 : 180 + i * 70}ms`,
                    }} />
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, border: "1px solid var(--border-subtle, rgba(26,23,20,0.1))", borderRadius: 12, padding: 12, background: "var(--cream-050, #FBF7F2)", display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-faint)", fontWeight: 600 }}>Tareas</span>
                {["Onboarding", "Cierre mensual"].map((tk) => (
                  <div key={tk} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 14, height: 14, borderRadius: 4, border: "1.5px solid", borderColor: auto ? "#F96302" : "var(--border-strong, rgba(26,23,20,0.2))", background: auto ? "#F96302" : "transparent", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all 300ms ease" }}>
                      {auto && <Check size={10} />}
                    </span>
                    <span style={{ fontSize: 10.5, color: "var(--text-muted)" }}>{tk}</span>
                  </div>
                ))}
              </div>
              {live && (
                <div style={{
                  border: "1px solid rgba(249,99,2,0.3)", borderRadius: 12, padding: 12, background: "var(--surface-card,#fff)",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                  opacity: live ? 1 : 0, transform: live ? "none" : "translateY(8px)",
                  transition: reduce ? "none" : "opacity 420ms ease 120ms, transform 420ms ease 120ms",
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-faint)", fontWeight: 600 }}>Horas ahorradas</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginTop: 3 }}>
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 21, color: "#F96302", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>+{Math.round(hours)}</span>
                      <span style={{ fontSize: 10.5, color: "var(--text-muted)", fontWeight: 600 }}>h/sem</span>
                    </div>
                  </div>
                  <svg width="54" height="24" viewBox="0 0 54 24" aria-hidden="true"><polyline points="0,20 13,16 27,17 40,8 54,3" fill="none" stroke="#F96302" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </div>

            {auto && !live && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", minWidth: 0 }}>
                <span style={{
                  alignSelf: "flex-end", display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 999,
                  background: "#F96302", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 9.5, whiteSpace: "nowrap", marginBottom: 4,
                  boxShadow: "0 6px 16px -8px rgba(249,99,2,0.6)",
                }}><Sparkles size={11} /> IA trabajando</span>
                {tools.map((tl, i) => (
                  <div key={tl.label} style={{
                    display: "flex", alignItems: "center", gap: 3, minWidth: 0,
                    opacity: auto ? 1 : 0, transform: auto ? "none" : "translateX(10px)",
                    transition: reduce ? "none" : `opacity 380ms ease ${i * 200}ms, transform 380ms cubic-bezier(.22,.61,.36,1) ${i * 200}ms`,
                  }}>
                    <svg width="16" height="10" viewBox="0 0 16 10" style={{ flexShrink: 0 }} aria-hidden="true">
                      <line className={reduce ? "" : "kairos-flow"} x1="16" y1="5" x2="1" y2="5" stroke="#F96302" strokeWidth="1.6" strokeDasharray="1.5 4" strokeLinecap="round" style={{ animationDelay: `${i * 0.2}s` }} />
                    </svg>
                    <span style={{
                      flex: 1, minWidth: 0, display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 7px", borderRadius: 9,
                      background: "var(--surface-card,#fff)", border: "1px solid rgba(249,99,2,0.35)", color: "#c24a00",
                      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 9.5, whiteSpace: "nowrap", overflow: "hidden",
                      boxShadow: "0 4px 12px -8px rgba(249,99,2,0.5)",
                    }}><span style={{ flexShrink: 0, display: "inline-flex" }}>{tl.icon}</span>{tl.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
