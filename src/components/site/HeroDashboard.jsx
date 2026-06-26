"use client";
// HeroDashboard — mockup "Mi Operación" estilo Notion para la hero.
import React from "react";
import { Check, Sparkles } from "./icons";

export function HeroDashboard({ tilt, reduce }) {
  const [phase, setPhase] = React.useState(reduce ? 3 : 0);
  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % 4), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const target = phase >= 2 ? 128 : 96;
  const kpi = useHeroCount(target, reduce);

  const rows = [
    ["Acme S.L.", "Activo", "Marta", "12.4k"],
    ["Nordia", "En curso", "Luis", "8.1k"],
    ["Vela Group", "Activo", "Ana", "21.0k"],
  ];
  const colW = ["1.5fr", "0.95fr", "1fr", "0.7fr"];
  const cols = ["Cliente", "Estado", "Responsable", "Valor"];
  const bars = phase >= 2 ? [62, 84, 72, 100, 90] : [44, 66, 54, 82, 60];
  const highlightRow = phase === 1 ? 2 : -1;
  const tasksDone = phase >= 3;

  const rx = (-(tilt?.y || 0) * 6).toFixed(2);
  const ry = ((tilt?.x || 0) * 8).toFixed(2);
  const tx = ((tilt?.x || 0) * 10).toFixed(1);

  return (
    <div className="kairos-hero-dash" style={{
      transformStyle: "preserve-3d",
      transform: reduce ? "none" : `rotateX(${rx}deg) rotateY(${ry}deg) translateX(${tx}px)`,
      transition: "transform 320ms cubic-bezier(.22,.61,.36,1)",
      borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)",
      background: "linear-gradient(180deg, #1A1917 0%, #141312 100%)",
      boxShadow: "0 40px 90px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03) inset",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <span style={{ display: "flex", gap: 6 }}>
          {["#E5786A", "#F8B058", "#7FB98B"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "#F5EDE6", marginLeft: 6 }}>Mi Operación</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(245,237,230,0.4)" }}>· Notion</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {[{ i: "J", c: "#F96302" }, { i: "I", c: "#5B8DEF" }].map((m, k) => (
            <span key={m.i} style={{
              width: 24, height: 24, borderRadius: "50%", background: m.c, color: "#fff", marginLeft: k ? -7 : 0,
              border: "2px solid #1A1917", display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10.5, zIndex: 2 - k,
            }}>{m.i}</span>
          ))}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 14, padding: "clamp(14px, 1.6vw, 20px)" }} className="kairos-hero-dashbody">
        <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 13, display: "flex", flexDirection: "column", gap: 9, background: "rgba(255,255,255,0.015)", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "#F96302" }} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, color: "#F5EDE6" }}>Clientes · Base de datos</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: colW.join(" "), gap: 8 }}>
            {cols.map((c) => <span key={c} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(245,237,230,0.4)", fontWeight: 600 }}>{c}</span>)}
          </div>
          {rows.map((r, ri) => (
            <div key={ri} style={{
              display: "grid", gridTemplateColumns: colW.join(" "), gap: 8, alignItems: "center",
              paddingTop: 7, paddingInline: 5, marginInline: -5, borderRadius: 6,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: ri === highlightRow ? "rgba(249,99,2,0.12)" : "transparent",
              transition: reduce ? "none" : "background 420ms ease",
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#F5EDE6" }}>{r[0]}</span>
              <StatusChip state={r[1]} flip={phase >= 2 && ri === 1} reduce={reduce} />
              <span style={{ fontSize: 11, color: "rgba(245,237,230,0.62)" }}>{r[2]}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#F5EDE6" }}>{r[3]}</span>
            </div>
          ))}
          <div style={{
            display: "grid", gridTemplateColumns: colW.join(" "), gap: 8, alignItems: "center",
            paddingTop: 7, borderTop: "1px solid rgba(255,255,255,0.06)",
            opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? "none" : "translateY(-4px)",
            transition: reduce ? "none" : "opacity 420ms ease, transform 420ms ease",
          }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#F5EDE6" }}>Zyper</span>
            <span style={{ justifySelf: "start", fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: "rgba(127,185,139,0.22)", color: "#8FC79B" }}>Activo</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, justifySelf: "start", fontSize: 8.5, fontWeight: 600, padding: "2px 6px", borderRadius: 999, background: "rgba(249,99,2,0.16)", color: "var(--kairos-orange-400)", whiteSpace: "nowrap" }}><Sparkles size={9} /> IA</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#F5EDE6" }}>9.8k</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
          <div style={{ border: "1px solid rgba(249,99,2,0.28)", borderRadius: 12, padding: 13, background: "rgba(249,99,2,0.05)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(245,237,230,0.45)", fontWeight: 600 }}>Horas ahorradas / mes</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "#F96302", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>+{Math.round(kpi)}</span>
              <span style={{ fontSize: 11, color: "rgba(245,237,230,0.6)", fontWeight: 600 }}>h</span>
            </div>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 13, background: "rgba(255,255,255,0.015)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(245,237,230,0.45)", fontWeight: 600 }}>Pipeline</span>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 44, marginTop: 10 }}>
              {bars.map((h, i) => (
                <span key={i} style={{
                  flex: 1, height: `${h}%`, borderRadius: 3, background: i === 3 ? "#F96302" : "rgba(249,99,2,0.3)",
                  transition: reduce ? "none" : "height 600ms cubic-bezier(.22,.61,.36,1)",
                }} />
              ))}
            </div>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 13, background: "rgba(255,255,255,0.015)", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(245,237,230,0.45)", fontWeight: 600 }}>Tareas</span>
            {["Onboarding", "Cierre mensual"].map((tk) => (
              <div key={tk} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, border: "1.5px solid", borderColor: tasksDone ? "#F96302" : "rgba(245,237,230,0.28)", background: tasksDone ? "#F96302" : "transparent", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "all 360ms ease" }}>
                  {tasksDone && <Check size={10} />}
                </span>
                <span style={{ fontSize: 10.5, color: "rgba(245,237,230,0.62)" }}>{tk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusChip({ state, flip, reduce }) {
  const live = flip ? "Activo" : state;
  const isActive = live === "Activo";
  return (
    <span style={{
      justifySelf: "start", fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 999,
      background: isActive ? "rgba(127,185,139,0.2)" : "rgba(249,99,2,0.14)",
      color: isActive ? "#8FC79B" : "#F96302",
      transition: reduce ? "none" : "background 360ms ease, color 360ms ease",
    }}>{live}</span>
  );
}

function useHeroCount(target, reduce, dur = 900) {
  const [v, setV] = React.useState(target);
  const prev = React.useRef(target);
  React.useEffect(() => {
    if (reduce) { setV(target); return; }
    const from = prev.current; prev.current = target;
    let raf; const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setV(from + (target - from) * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick); else setV(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduce]);
  return v;
}
