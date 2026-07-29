"use client";
// Contact CTA + form + footer.
import React from "react";
import { useTranslations } from "next-intl";
import { Eyebrow, Logo } from "./ds";
import { Container, Section, Reveal } from "./primitives";
import { ArrowRight, Mail, Check, Shield, Clock } from "./icons";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";

function contactReduced() {
  return typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useContactInView(ref, threshold = 0.25) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el || seen) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return seen;
}
function useContactMobile(bp = 820) {
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const on = () => setM(mq.matches); on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

export function Contact() {
  const t = useTranslations("Contact");
  // "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = React.useState("idle");
  const [fields, setFields] = React.useState({ name: "", email: "", goal: "", hp: "" });
  const reduce = contactReduced();
  const isMobile = useContactMobile();
  const cardRef = React.useRef(null);
  const inView = useContactInView(cardRef, 0.2);

  const validName = fields.name.trim().length >= 2;
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email.trim());
  const ready = validName && validEmail && status !== "sending";
  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  // Antes esto sólo hacía `setSent(true)`: el usuario veía "¡Recibido!" y el
  // lead no salía a ninguna parte. Ahora va al CRM vía /api/lead.
  async function onSubmit(e) {
    e.preventDefault();
    if (!ready) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: fields.name.trim(),
          email: fields.email.trim(),
          detalle: fields.goal.trim(),
          hp: fields.hp,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section tone="light" id="contacto" style={{ paddingBottom: "var(--space-9)" }}>
      <Container>
        <div ref={cardRef} style={{
          position: "relative", overflow: "hidden",
          background: "#161616", borderRadius: "var(--radius-2xl)",
          padding: "clamp(2rem,5vw,4rem)", boxShadow: "var(--shadow-lg)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <ContactBackdrop reduce={reduce} />
          {!isMobile && <ContactShards inView={inView} reduce={reduce} />}

          <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-8)", alignItems: "center" }} className="kairos-contact-grid">
            <div>
              <Reveal><Eyebrow tone="on-dark" tick={false}>{t("eyebrow")}</Eyebrow></Reveal>
              <Reveal delay={60} as="h2" style={{
                fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-h2)", lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-tight)", color: "var(--text-on-dark-strong)", margin: "1rem 0 0", textWrap: "balance",
              }}>
                {t("titleA")} <span style={{ color: "#F96302" }}>{t("titleHighlight")}</span>.
              </Reveal>
              <Reveal delay={120} as="p" style={{ fontSize: "var(--text-lead)", color: "var(--text-on-dark-muted)", margin: "1.1rem 0 0", lineHeight: "var(--leading-normal)", maxWidth: "46ch" }}>
                {t("lead")}
              </Reveal>
              <Reveal delay={170} as="p" style={{ fontSize: "var(--text-sm)", color: "var(--text-on-dark-body)", margin: "1rem 0 0", lineHeight: "var(--leading-normal)", maxWidth: "44ch" }}>
                {t("lead2")}
              </Reveal>
              <Reveal delay={220} style={{ display: "flex", gap: "clamp(14px, 2vw, 22px)", marginTop: "var(--space-6)", flexWrap: "wrap" }}>
                {[[<Shield key="s" size={16} />, t("badge1")], [<Clock key="c" size={16} />, t("badge2")], [<Check key="k" size={16} />, t("badge3")]].map(([ic, label], i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-on-dark-body)", fontSize: "var(--text-sm)", fontWeight: 500 }}>
                    <span style={{ color: "#F96302", display: "inline-flex" }}>{ic}</span>{label}
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal delay={140}>
              {status === "sent" ? (
                <div role="status" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-on-dark)", borderRadius: "var(--radius-xl)", padding: "var(--space-7)", textAlign: "center" }}>
                  <span style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--accent-gradient)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Check size={28} /></span>
                  <h3 style={{ fontFamily: "var(--font-display)", color: "var(--text-on-dark-strong)", fontSize: "var(--text-h4)", margin: "0 0 8px" }}>{t("sentTitle")}</h3>
                  <p style={{ color: "var(--text-on-dark-muted)", margin: 0, fontSize: "var(--text-sm)" }}>{t("sentBody")}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-on-dark)", borderRadius: "var(--radius-xl)", padding: "var(--space-6)" }}>
                  <ContactField label={t("labelName")} placeholder={t("phName")} value={fields.name} onChange={set("name")} valid={validName} reduce={reduce} autoComplete="name" />
                  <ContactField label={t("labelEmail")} type="email" placeholder={t("phEmail")} value={fields.email} onChange={set("email")} valid={validEmail} icon={<Mail size={16} />} reduce={reduce} autoComplete="email" />
                  <ContactField label={t("labelGoal")} placeholder={t("phGoal")} value={fields.goal} onChange={set("goal")} valid={fields.goal.trim().length > 1} optionalLabel={t("optional")} reduce={reduce} />

                  {/* Honeypot: invisible para personas, tentador para bots. */}
                  <input
                    type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    value={fields.hp} onChange={set("hp")}
                    style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                  />

                  {status === "error" && (
                    <p role="alert" style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "#ffb4a2" }}>
                      <strong style={{ display: "block", color: "#fff" }}>{t("errorTitle")}</strong>
                      {t("errorBody", { email: CONTACT_EMAIL })}
                    </p>
                  )}

                  <button type="submit" disabled={!ready} className="kairos-contact-submit" data-ready={ready ? "true" : "false"} style={{
                    marginTop: 4, height: 56, borderRadius: "var(--radius-md)", border: "none",
                    cursor: ready ? "pointer" : "not-allowed",
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.55rem",
                    fontFamily: "var(--font-sans)", fontSize: "1.0625rem", fontWeight: "var(--weight-semibold)", color: "#fff",
                    background: "var(--accent-gradient, linear-gradient(135deg,#F96302,#F9962E))",
                    opacity: ready ? 1 : 0.72,
                    boxShadow: ready ? "0 0 0 1px rgba(249,99,2,0.5), 0 16px 36px -14px rgba(249,99,2,0.7)" : "none",
                    transition: reduce ? "none" : "opacity 240ms ease, box-shadow 280ms ease, transform 200ms ease",
                  }}>
                    {status === "sending" ? t("sending") : <React.Fragment>{t("submit")} <ArrowRight size={18} /></React.Fragment>}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ContactField({ label, type = "text", placeholder, value, onChange, valid, icon, optionalLabel, reduce, autoComplete }) {
  const [focus, setFocus] = React.useState(false);
  const show = valid && value.trim().length > 0;
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-on-dark-body)", marginBottom: 7 }}>
        {label}{optionalLabel && <span style={{ color: "var(--text-on-dark-faint)", fontWeight: 400 }}> · {optionalLabel}</span>}
      </span>
      <span style={{
        position: "relative", display: "flex", alignItems: "center",
        background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)",
        border: `1px solid ${focus ? "rgba(249,99,2,0.7)" : "var(--border-on-dark)"}`,
        boxShadow: focus ? "0 0 0 3px rgba(249,99,2,0.16)" : "none",
        transition: reduce ? "none" : "border-color 200ms ease, box-shadow 200ms ease",
      }}>
        {icon && <span style={{ display: "inline-flex", color: focus ? "#F96302" : "var(--text-on-dark-faint)", paddingLeft: 14, transition: "color 200ms ease" }}>{icon}</span>}
        <input
          type={type} placeholder={placeholder} value={value} onChange={onChange} autoComplete={autoComplete}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none",
            color: "var(--text-on-dark-strong)", fontFamily: "var(--font-sans)", fontSize: "1rem",
            padding: icon ? "13px 12px 13px 10px" : "13px 14px",
          }} />
        <span aria-hidden="true" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 18, height: 18, borderRadius: "50%", background: "#4f9d63", color: "#fff", marginRight: 12, flexShrink: 0,
          opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.5)",
          transition: reduce ? "none" : "opacity 220ms ease, transform 220ms cubic-bezier(.22,.61,.36,1)",
        }}><Check size={11} /></span>
      </span>
    </label>
  );
}

function ContactBackdrop({ reduce }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden", borderRadius: "inherit" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(245,237,230,0.04) 1px, transparent 1px)", backgroundSize: "30px 30px",
        maskImage: "radial-gradient(90% 120% at 18% 40%, #000 20%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(90% 120% at 18% 40%, #000 20%, transparent 72%)",
      }} />
      <div className={reduce ? "" : "kairos-contact-glow"} style={{
        position: "absolute", left: "-6%", top: "34%", width: 480, height: 480, transform: "translateY(-50%)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,99,2,0.22) 0%, rgba(249,99,2,0.08) 40%, transparent 68%)", filter: "blur(16px)",
      }} />
    </div>
  );
}

function ContactShards({ inView, reduce }) {
  const on = inView || reduce;
  const shards = [
    { rest: { left: "3%", top: "8%", rot: -12 }, set: { left: "5%", top: "12%", rot: -3 }, w: 90 },
    { rest: { left: "30%", top: "2%", rot: 9 }, set: { left: "26%", top: "9%", rot: 2 }, w: 70 },
    { rest: { left: "8%", top: "74%", rot: 7 }, set: { left: "7%", top: "78%", rot: -1 }, w: 80 },
    { rest: { left: "34%", top: "82%", rot: -10 }, set: { left: "30%", top: "84%", rot: 3 }, w: 64 },
  ];
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      {shards.map((s, i) => {
        const p = on ? s.set : s.rest;
        return (
          <span key={i} style={{
            position: "absolute", left: p.left, top: p.top, width: s.w, height: 22, borderRadius: 6,
            background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)",
            transform: `rotate(${p.rot}deg)`, opacity: on ? 0.55 : 0,
            transition: reduce ? "none" : `opacity 700ms ease ${i * 90}ms, transform 800ms cubic-bezier(.22,.61,.36,1) ${i * 90}ms, left 800ms cubic-bezier(.22,.61,.36,1) ${i * 90}ms, top 800ms cubic-bezier(.22,.61,.36,1) ${i * 90}ms`,
          }} />
        );
      })}
    </div>
  );
}

export function Footer() {
  const t = useTranslations("Footer");
  // String, no number: como número ICU lo formatearía con separador de miles
  // ("2.026" en es).
  const year = String(new Date().getFullYear());

  // Todos los enlaces apuntan a algo real. Antes las tres columnas eran
  // `href="#"` y la de contacto mostraba un correo inexistente.
  const cols = [
    [t("colCompany"), [
      { label: t("linkMethodology"), href: "#metodologia" },
      { label: t("linkAssets"), href: "#activos" },
      { label: t("linkCases"), href: "#casos" },
    ]],
    // Enlace site-wide a las páginas pilar (SEO 14). Contenido en español, como
    // las páginas legales; los nombres de servicio hacen de etiqueta neutra.
    ["Servicios", [
      { label: "Consultoría Notion", href: "/consultoria-notion" },
      { label: "Implantación de Notion", href: "/implantacion-notion" },
      { label: "Automatización con IA", href: "/automatizacion-ia" },
    ]],
    [t("colResources"), [
      { label: t("linkTest"), href: "/test-caos-operativo" },
      { label: t("linkBookCall"), href: "/reserva" },
    ]],
    [t("colContact"), [
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { label: t("linkLinkedin"), href: LINKEDIN_URL, external: true },
      { label: t("linkBookCall"), href: "#contacto" },
    ]],
  ];

  const legal = [
    { label: t("legal"), href: "/legal" },
    { label: t("privacy"), href: "/privacidad" },
    { label: t("cookies"), href: "/cookies" },
    { label: t("terms"), href: "/tyc" },
  ];

  return (
    <footer style={{ background: "#0D0D0D", color: "var(--text-on-dark-muted)", paddingBlock: "var(--space-9)" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: "var(--space-7)", paddingBottom: "var(--space-8)" }} className="kairos-footer-grid">
          <div>
            <Logo variant="wordmark" theme="dark" height={26} />
            <p style={{ margin: "1rem 0 0", maxWidth: "34ch", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)" }}>
              {t("tagline")}
            </p>
            <p style={{ margin: "1.2rem 0 0", fontFamily: "var(--font-display)", fontWeight: 700, color: "#F96302", letterSpacing: "-0.01em" }}>{t("claim")}</p>
          </div>
          {cols.map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize: "var(--text-eyebrow)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", fontWeight: 700, color: "var(--text-on-dark-faint)", marginBottom: 14 }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((l) => (
                  <a key={`${title}-${l.label}`} href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{ color: "var(--text-on-dark-body)", textDecoration: "none", fontSize: "var(--text-sm)", transition: "color var(--dur-fast) var(--ease-out)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#F96302"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-on-dark-body)"}>{l.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: "var(--space-5)", borderTop: "1px solid var(--border-on-dark)", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: "var(--text-xs)", color: "var(--text-on-dark-faint)" }}>
          <span>{t("rights", { year })}</span>
          <span style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {legal.map((l) => (
              <a key={l.href} href={l.href} style={{ color: "inherit", textDecoration: "none" }}>{l.label}</a>
            ))}
          </span>
        </div>
      </Container>
    </footer>
  );
}
