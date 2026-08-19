"use client";
// Formulario de incorporación: la empresa completa o actualiza sus datos
// estables y todo aterriza en el CRM de Notion.
//
// El envío va contra `/api/incorporacion` (route handler), nunca directo a
// n8n: así la clave del webhook no viaja al navegador. Ver `src/app/api/
// incorporacion/route.ts`.
import React from "react";
import Link from "next/link";
import { Container, Section, Reveal } from "../primitives";
import { Eyebrow, Logo } from "../ds";
import { ArrowRight, Check, Clipboard, Imagen, Mail, Upload, X } from "../icons";
import { trackEvent, EVENTS } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site";
import {
  CANALES,
  EMAIL_RE,
  IDIOMAS,
  INFLUENCIAS,
  INFLUENCIA_AYUDA,
  LIMITS,
  LOGO_MAX_BYTES,
  LOGO_TIPOS,
  MADUREZ,
  MADUREZ_AYUDA,
  PAISES,
  SECTORES,
  TAMANOS,
} from "@/lib/incorporacion";

const VACIO = {
  email: "",
  nombre: "",
  apellidos: "",
  cargo: "",
  telefono: "",
  linkedin: "",
  canal: "",
  influencia: "",
  facturacion: false,
  copia: false,
  empresa: "",
  razonSocial: "",
  cif: "",
  web: "",
  pais: "",
  ubicacion: "",
  direccion: "",
  cp: "",
  sector: "",
  tamano: "",
  idioma: "",
  madurez: "",
  mision: "",
};

/** Solo se aceptan claves conocidas del prefill: lo que llega de n8n no dicta
 *  la forma del estado. */
function conPrefill(prefill) {
  const base = { ...VACIO };
  if (!prefill || typeof prefill !== "object") return base;
  for (const k of Object.keys(VACIO)) {
    const v = prefill[k];
    if (typeof v === "string") base[k] = v;
    else if (typeof v === "boolean") base[k] = v;
  }
  return base;
}

export function IncorporacionForm(props) {
  const { empresaId = "", prefill = null, prefillFallo = false } = props;
  const [values, setValues] = React.useState(() => conPrefill(prefill));
  // "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = React.useState("idle");
  const [errorCode, setErrorCode] = React.useState("");
  const [logo, setLogo] = React.useState(null); // { name, type, data } en base64
  const [logoError, setLogoError] = React.useState("");
  const [hp, setHp] = React.useState("");
  const startSent = React.useRef(false);

  const set = (k) => (e) => {
    const el = e.target;
    const v = el.type === "checkbox" ? el.checked : el.value;
    setValues((f) => ({ ...f, [k]: v }));
    if (!startSent.current) {
      startSent.current = true;
      trackEvent(EVENTS.incorporacionFormStart, { empresa_conocida: empresaId ? "si" : "no" });
    }
  };

  const validEmail = EMAIL_RE.test(values.email.trim());
  const validNombre = values.nombre.trim().length >= 2;
  const validEmpresa = values.empresa.trim().length >= 2;
  const ready = validEmail && validNombre && validEmpresa && status !== "sending";

  // Un único camino de entrada para el logo: da igual si viene del explorador,
  // del portapapeles o de un arrastre, siempre acaba aquí.
  async function aceptarLogo(file) {
    setLogoError("");
    if (!file) {
      setLogo(null);
      return false;
    }
    if (!LOGO_TIPOS.includes(file.type)) {
      setLogo(null);
      setLogoError("Formato no admitido. Usa PNG, JPG, SVG o WebP.");
      return false;
    }
    if (file.size > LOGO_MAX_BYTES) {
      setLogo(null);
      setLogoError("El archivo pesa más de 2 MB.");
      return false;
    }
    const dataUrl = await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = () => reject(fr.error);
      fr.readAsDataURL(file);
    }).catch(() => "");
    if (!dataUrl) {
      setLogoError("No se ha podido leer la imagen.");
      return false;
    }
    const nombre = (file.name || "logo").slice(0, 80);
    setLogo({ name: nombre, type: file.type, data: dataUrl.split(",")[1] ?? "" });
    return true;
  }

  function quitarLogo() {
    setLogo(null);
    setLogoError("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!ready) return;
    setStatus("sending");
    setErrorCode("");
    try {
      const res = await fetch("/api/incorporacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, id: empresaId, logo, hp }),
      });
      if (res.ok) {
        setStatus("sent");
        trackEvent(EVENTS.incorporacionSubmitSuccess, {
          empresa_conocida: empresaId ? "si" : "no",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorCode(typeof data.error === "string" ? data.error : "");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Section tone="light">
        <Container style={{ maxWidth: 720 }}>
          <div style={cardStyle} role="status">
            <span style={{
              width: 56, height: 56, borderRadius: "50%", background: "var(--accent-gradient)",
              color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 18,
            }}><Check size={28} /></span>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--text-strong)",
              margin: "0 0 10px", letterSpacing: "var(--tracking-tight)",
            }}>Datos recibidos</h2>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)" }}>
              Ya están en nuestro sistema. Si vemos algo incompleto te escribimos; si no, no tienes que hacer nada más.
            </p>
            <p style={{ margin: "1.25rem 0 0", color: "var(--text-faint)", fontSize: "var(--text-sm)" }}>
              ¿Algo que corregir? Escríbenos a{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--accent)" }}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <Section tone="dark" style={{ paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <Container style={{ maxWidth: 860 }}>
          <Logo variant="wordmark" theme="dark" height={26} priority />
          <Reveal as="div" style={{ marginTop: "var(--space-6)" }}>
            <Eyebrow tone="on-dark" tick={false}>Incorporación</Eyebrow>
          </Reveal>
          <Reveal delay={60} as="h1" style={{
            fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-h2)", lineHeight: "var(--leading-heading)",
            letterSpacing: "var(--tracking-tight)", color: "var(--text-on-dark-strong)",
            margin: "0.9rem 0 0", textWrap: "balance",
          }}>
            {prefill?.empresa
              ? <>Completa los datos de <span style={{ color: "#F96302" }}>{prefill.empresa}</span></>
              : <>Cuéntanos los datos de <span style={{ color: "#F96302" }}>tu empresa</span></>}
          </Reveal>
          <Reveal delay={120} as="p" style={{
            fontSize: "var(--text-lead)", color: "var(--text-on-dark-muted)",
            margin: "1.1rem 0 0", lineHeight: "var(--leading-normal)", maxWidth: "56ch",
          }}>
            Son los datos estables con los que trabajamos: quién es el contacto de referencia y
            cómo es la empresa. Se rellena una vez y se actualiza cuando cambie algo.
          </Reveal>
          {prefill && !prefillFallo && (
            <Reveal delay={160} as="p" style={{
              margin: "1.25rem 0 0", fontSize: "var(--text-sm)", color: "var(--text-on-dark-body)",
              background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-on-dark)",
              borderRadius: "var(--radius-md)", padding: "12px 14px", maxWidth: "56ch",
              lineHeight: "var(--leading-normal)",
            }}>
              Hemos rellenado lo que ya sabemos de ti. Revísalo y corrige lo que haya cambiado.
            </Reveal>
          )}
          {prefillFallo && (
            <Reveal delay={160} as="p" role="status" style={{
              margin: "1.25rem 0 0", fontSize: "var(--text-sm)", color: "var(--text-on-dark-body)",
              background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-on-dark)",
              borderRadius: "var(--radius-md)", padding: "12px 14px", maxWidth: "56ch",
            }}>
              No hemos podido recuperar tus datos guardados. Puedes rellenar el formulario igualmente:
              nada se pierde.
            </Reveal>
          )}
        </Container>
      </Section>

      <Section tone="light">
        <Container style={{ maxWidth: 860 }}>
          <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: "var(--space-6)" }}>
            <Grupo
              paso="01"
              titulo="Tu contacto"
              nota="La persona con la que hablamos en el día a día."
            >
              <Campo label="Email" required type="email" icon={<Mail size={16} />} autoComplete="email"
                value={values.email} onChange={set("email")} valid={validEmail} maxLength={LIMITS.email}
                placeholder="nombre@empresa.com" />
              <Fila>
                <Campo label="Nombre" required autoComplete="given-name" value={values.nombre}
                  onChange={set("nombre")} valid={validNombre} maxLength={LIMITS.nombre} />
                <Campo label="Apellidos" autoComplete="family-name" value={values.apellidos}
                  onChange={set("apellidos")} maxLength={LIMITS.apellidos} />
              </Fila>
              <Fila>
                <Campo label="Cargo" autoComplete="organization-title" value={values.cargo}
                  onChange={set("cargo")} maxLength={LIMITS.cargo} placeholder="Dirección de operaciones" />
                <Campo label="Teléfono" type="tel" autoComplete="tel" value={values.telefono}
                  onChange={set("telefono")} maxLength={LIMITS.telefono} placeholder="+34 600 000 000"
                  ayuda="En formato internacional, con prefijo." />
              </Fila>
              <Campo label="LinkedIn" type="url" value={values.linkedin} onChange={set("linkedin")}
                maxLength={LIMITS.linkedin} placeholder="https://linkedin.com/in/…" />
              <Fila>
                <Selector label="Canal preferido" value={values.canal} onChange={set("canal")}
                  options={CANALES} ayuda="Por dónde prefieres que te escribamos." />
                <Selector label="Tu papel en las decisiones" value={values.influencia}
                  onChange={set("influencia")} options={INFLUENCIAS}
                  ayuda={INFLUENCIA_AYUDA[values.influencia] || "Nos ayuda a no marear a quien no toca."} />
              </Fila>
              <Fila>
                <Casilla label="Recibo las facturas" checked={values.facturacion} onChange={set("facturacion")} />
                <Casilla label="Quiero copia de la facturación" checked={values.copia} onChange={set("copia")} />
              </Fila>
            </Grupo>

            <Grupo paso="02" titulo="Tu empresa" nota="Lo que usamos en documentos, facturas y comunicaciones.">
              <Campo label="Nombre comercial" required autoComplete="organization" value={values.empresa}
                onChange={set("empresa")} valid={validEmpresa} maxLength={LIMITS.empresa} />
              <Fila>
                <Campo label="Razón social" value={values.razonSocial} onChange={set("razonSocial")}
                  maxLength={LIMITS.razonSocial} ayuda="Denominación legal, para facturación." />
                <Campo label="CIF / EIN" value={values.cif} onChange={set("cif")} maxLength={LIMITS.cif} />
              </Fila>
              <Fila>
                <Campo label="Web" type="url" autoComplete="url" value={values.web} onChange={set("web")}
                  maxLength={LIMITS.web} placeholder="https://…" />
                <Selector label="País" value={values.pais} onChange={set("pais")} options={PAISES} />
              </Fila>
              <Fila>
                <Campo label="Ciudad" value={values.ubicacion} onChange={set("ubicacion")}
                  maxLength={LIMITS.ubicacion} />
                <Campo label="Código postal" autoComplete="postal-code" value={values.cp}
                  onChange={set("cp")} maxLength={LIMITS.cp} />
              </Fila>
              <Campo label="Dirección" autoComplete="street-address" value={values.direccion}
                onChange={set("direccion")} maxLength={LIMITS.direccion}
                ayuda="La que debe aparecer en las facturas." />
            </Grupo>

            <Grupo paso="03" titulo="Cómo sois" nota="Contexto para adaptar lo que construimos.">
              <Fila>
                <Selector label="Sector" value={values.sector} onChange={set("sector")} options={SECTORES} />
                <Selector label="Tamaño" value={values.tamano} onChange={set("tamano")} options={TAMANOS}
                  ayuda="Número de personas en la empresa." />
              </Fila>
              <Fila>
                <Selector label="Idioma de trabajo" value={values.idioma} onChange={set("idioma")}
                  options={IDIOMAS} />
                <Selector label="Madurez digital" value={values.madurez} onChange={set("madurez")}
                  options={MADUREZ}
                  ayuda={MADUREZ_AYUDA[values.madurez] || "Cómo de estructurado está hoy vuestro trabajo."} />
              </Fila>
              <AreaTexto label="Misión" value={values.mision} onChange={set("mision")}
                maxLength={LIMITS.mision} rows={4}
                placeholder="Qué hacéis, para quién y por qué importa."
                ayuda="En dos o tres frases. Nos sirve para escribir en vuestro tono." />
              <ArchivoLogo logo={logo} error={logoError} onArchivo={aceptarLogo} onQuitar={quitarLogo} />
            </Grupo>

            {/* Honeypot: invisible para personas, tentador para bots. */}
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={hp} onChange={(e) => setHp(e.target.value)}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />

            {status === "error" && (
              <p role="alert" style={{
                margin: 0, padding: "14px 16px", borderRadius: "var(--radius-md)",
                background: "var(--danger-bg)", color: "var(--danger)",
                fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)",
              }}>
                <strong style={{ display: "block" }}>No se ha podido guardar</strong>
                {errorCode === "rate_limited"
                  ? "Se han hecho demasiados envíos seguidos. Espera unos minutos y vuelve a intentarlo."
                  : errorCode === "invalid"
                    ? "Revisa el email, el nombre y el nombre de la empresa."
                    : <>Inténtalo de nuevo en un momento. Si vuelve a fallar, escríbenos a <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "inherit" }}>{CONTACT_EMAIL}</a>.</>}
              </p>
            )}

            {/* El envío también en tarjeta: cierra la columna en lugar de quedar
                suelto sobre el fondo. */}
            <div style={{
              ...cardStyle, display: "flex", flexWrap: "wrap", alignItems: "center",
              gap: "var(--space-4)", padding: "clamp(1.25rem, 2.4vw, var(--space-6))",
            }}>
              <button type="submit" disabled={!ready} style={{
                height: 56, padding: "0 var(--space-6)", borderRadius: "var(--radius-md)", border: "none",
                cursor: ready ? "pointer" : "not-allowed",
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.55rem",
                fontFamily: "var(--font-sans)", fontSize: "1.0625rem", fontWeight: "var(--weight-semibold)",
                color: "#fff", background: "var(--accent-gradient)",
                opacity: ready ? 1 : 0.55,
                boxShadow: ready ? "var(--shadow-accent)" : "none",
                transition: "opacity var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
              }}>
                {status === "sending" ? "Enviando…" : <>Enviar datos <ArrowRight size={18} /></>}
              </button>
              <span style={{ fontSize: "var(--text-sm)", color: "var(--text-faint)" }}>
                Los campos marcados con * son obligatorios.
              </span>
            </div>

            <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-faint)", lineHeight: "var(--leading-normal)" }}>
              Tratamos estos datos para gestionar la relación contigo. Puedes consultar la{" "}
              <Link href="/privacidad" style={{ color: "var(--text-muted)" }}>Política de Privacidad</Link>.
            </p>
          </form>
        </Container>
      </Section>
    </>
  );
}

/* ── Piezas del formulario ─────────────────────────────────────────────── */

const cardStyle = {
  background: "var(--surface-card)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-xl)",
  padding: "clamp(1.5rem, 3vw, var(--space-7))",
  boxShadow: "var(--shadow-sm)",
};

/**
 * Bloque del formulario. Se usa `section` + `aria-labelledby` y no
 * `fieldset`/`legend`: el navegador coloca el legend *encima* del borde del
 * fieldset, así que el título se salía de la tarjeta y la nota quedaba pisando
 * el borde superior. Aquí el encabezado vive dentro, con su propio hilo de
 * separación, y la numeración da sensación de recorrido.
 */
function Grupo({ paso, titulo, nota, children }) {
  const id = React.useId();
  return (
    <section aria-labelledby={id} style={{ ...cardStyle, display: "grid", gap: "var(--space-5)" }}>
      <header style={{
        display: "flex", alignItems: "flex-start", gap: "var(--space-4)",
        paddingBottom: "var(--space-4)", borderBottom: "1px solid var(--border-subtle)",
      }}>
        <span aria-hidden="true" style={{
          flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, borderRadius: 12,
          background: "rgba(249,99,2,0.10)", color: "#F96302",
          fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)", fontSize: "0.9375rem",
        }}>{paso}</span>
        <span style={{ display: "block", minWidth: 0 }}>
          <h2 id={id} style={{
            margin: 0, fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)",
            fontSize: "var(--text-h4)", lineHeight: "var(--leading-heading)",
            color: "var(--text-strong)", letterSpacing: "var(--tracking-tight)",
          }}>{titulo}</h2>
          {nota && (
            <p style={{
              margin: "5px 0 0", fontSize: "var(--text-sm)", color: "var(--text-muted)",
              lineHeight: "var(--leading-normal)",
            }}>{nota}</p>
          )}
        </span>
      </header>
      <div style={{ display: "grid", gap: "var(--space-5)" }}>{children}</div>
    </section>
  );
}

/** Dos columnas en escritorio, una en móvil (sin media queries: `auto-fit`). */
function Fila({ children }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
      {children}
    </div>
  );
}

function Etiqueta({ label, required, ayuda, children, as: Tag = "label" }) {
  return (
    <Tag style={{ display: "block" }}>
      <span style={{
        display: "block", fontSize: "var(--text-sm)", fontWeight: 600,
        color: "var(--text-body)", marginBottom: 7,
      }}>
        {label}{required && <span style={{ color: "var(--accent)" }} aria-hidden="true"> *</span>}
      </span>
      {children}
      {ayuda && (
        <span style={{ display: "block", marginTop: 6, fontSize: "var(--text-xs)", color: "var(--text-faint)", lineHeight: "var(--leading-normal)" }}>
          {ayuda}
        </span>
      )}
    </Tag>
  );
}

const controlBase = {
  flex: 1,
  minWidth: 0,
  width: "100%",
  background: "transparent",
  border: "none",
  outline: "none",
  color: "var(--text-strong)",
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  padding: "13px 14px",
};

function Marco({ focus, children }) {
  return (
    <span style={{
      position: "relative", display: "flex", alignItems: "center",
      background: "var(--cream-050)", borderRadius: "var(--radius-md)",
      border: `1px solid ${focus ? "rgba(249,99,2,0.7)" : "var(--border-default)"}`,
      boxShadow: focus ? "0 0 0 3px rgba(249,99,2,0.16)" : "none",
      transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
    }}>
      {children}
    </span>
  );
}

function Tick({ show }) {
  return (
    <span aria-hidden="true" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 18, height: 18, borderRadius: "50%", background: "var(--success)", color: "#fff",
      marginRight: 12, flexShrink: 0,
      opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.5)",
      transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
    }}><Check size={11} /></span>
  );
}

function Campo({ label, required, type = "text", value, onChange, valid, icon, ayuda, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <Etiqueta label={label} required={required} ayuda={ayuda}>
      <Marco focus={focus}>
        {icon && (
          <span style={{ display: "inline-flex", color: focus ? "#F96302" : "var(--text-faint)", paddingLeft: 14 }}>
            {icon}
          </span>
        )}
        <input
          type={type} value={value} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ ...controlBase, padding: icon ? "13px 12px 13px 10px" : controlBase.padding }}
          {...rest}
        />
        {valid !== undefined && <Tick show={Boolean(valid) && value.trim().length > 0} />}
      </Marco>
    </Etiqueta>
  );
}

function AreaTexto({ label, value, onChange, ayuda, rows = 4, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <Etiqueta label={label} ayuda={ayuda}>
      <Marco focus={focus}>
        <textarea
          rows={rows} value={value} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ ...controlBase, resize: "vertical", lineHeight: "var(--leading-normal)" }}
          {...rest}
        />
      </Marco>
    </Etiqueta>
  );
}

function Selector({ label, value, onChange, options, ayuda }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <Etiqueta label={label} ayuda={ayuda}>
      <Marco focus={focus}>
        <select
          value={value} onChange={onChange}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ ...controlBase, appearance: "none", cursor: "pointer", color: value ? "var(--text-strong)" : "var(--text-faint)" }}
        >
          <option value="">Sin especificar</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span aria-hidden="true" style={{ paddingRight: 14, color: "var(--text-faint)", fontSize: 12 }}>▾</span>
      </Marco>
    </Etiqueta>
  );
}

/** Casilla con cuerpo de tarjeta: se ve marcada de un vistazo, sin tener que
 *  fijarse en un cuadradito de 18 px. */
function Casilla({ label, checked, onChange }) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
      padding: "13px 14px", borderRadius: "var(--radius-md)",
      border: `1px solid ${checked ? "rgba(249,99,2,0.55)" : "var(--border-default)"}`,
      background: checked ? "rgba(249,99,2,0.06)" : "var(--cream-050)",
      fontSize: "var(--text-sm)", fontWeight: 600,
      color: checked ? "var(--text-strong)" : "var(--text-body)",
      transition: "border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)",
    }}>
      <input type="checkbox" checked={checked} onChange={onChange}
        style={{ width: 18, height: 18, accentColor: "#F96302", cursor: "pointer", flexShrink: 0 }} />
      {label}
    </label>
  );
}

const EXT_POR_TIPO = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

/** Selector de logo al estilo Notion: el clic no abre el explorador de golpe,
 *  abre un menú donde se elige entre pegar la imagen que ya tienes copiada o
 *  buscarla en el ordenador. */
function ArchivoLogo({ logo, error, onArchivo, onQuitar }) {
  const [abierto, setAbierto] = React.useState(false);
  const [pestana, setPestana] = React.useState("pegar");
  const [arrastrando, setArrastrando] = React.useState(false);
  const [avisoPegar, setAvisoPegar] = React.useState("");
  const inputRef = React.useRef(null);
  const cajaRef = React.useRef(null);
  const zonaPegarRef = React.useRef(null);

  const cerrar = React.useCallback(() => {
    setAbierto(false);
    setArrastrando(false);
    setAvisoPegar("");
  }, []);

  // Cerrar al pulsar fuera o con Escape, como cualquier menú.
  React.useEffect(() => {
    if (!abierto) return undefined;
    const fuera = (ev) => {
      if (cajaRef.current && !cajaRef.current.contains(ev.target)) cerrar();
    };
    const tecla = (ev) => { if (ev.key === "Escape") cerrar(); };
    document.addEventListener("mousedown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto, cerrar]);

  // Al abrir la pestaña de pegar, el foco va a la zona: así el Ctrl+V del
  // usuario aterriza donde toca sin tener que hacer clic antes.
  React.useEffect(() => {
    if (abierto && pestana === "pegar") zonaPegarRef.current?.focus();
  }, [abierto, pestana]);

  async function entregar(file) {
    const ok = await onArchivo(file);
    if (ok) cerrar();
    return ok;
  }

  function conNombre(file, base) {
    const ext = EXT_POR_TIPO[file.type] || "png";
    return new File([file], base + "." + ext, { type: file.type });
  }

  async function onPegar(ev) {
    const file = Array.from(ev.clipboardData?.files || [])[0];
    if (!file) {
      setAvisoPegar("En el portapapeles no hay ninguna imagen.");
      return;
    }
    ev.preventDefault();
    setAvisoPegar("");
    await entregar(file.name ? file : conNombre(file, "logo-pegado"));
  }

  async function leerPortapapeles() {
    setAvisoPegar("");
    try {
      if (!navigator.clipboard?.read) throw new Error("sin permiso");
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const tipo = item.types.find((t) => LOGO_TIPOS.includes(t));
        if (!tipo) continue;
        const blob = await item.getType(tipo);
        await entregar(new File([blob], "logo-pegado." + (EXT_POR_TIPO[tipo] || "png"), { type: tipo }));
        return;
      }
      setAvisoPegar("En el portapapeles no hay ninguna imagen.");
    } catch {
      setAvisoPegar("El navegador no nos deja leer el portapapeles. Pulsa en el recuadro y haz Ctrl+V.");
    }
  }

  async function onSoltar(ev) {
    ev.preventDefault();
    setArrastrando(false);
    const file = Array.from(ev.dataTransfer?.files || [])[0];
    if (file) await entregar(file);
  }

  const previa = logo ? "data:" + logo.type + ";base64," + logo.data : "";

  return (
    <Etiqueta as="div" label="Logo" ayuda={error ? undefined : "PNG, JPG, SVG o WebP. Máximo 2 MB. Opcional."}>
      <div ref={cajaRef} style={{ position: "relative" }}>
        {logo ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px", background: "var(--cream-050)",
            border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)",
          }}>
            <span aria-hidden="true" style={{
              width: 40, height: 40, borderRadius: 8, flexShrink: 0,
              background: "#fff", border: "1px solid var(--border-subtle)",
              backgroundImage: 'url("' + previa + '")', backgroundSize: "contain",
              backgroundPosition: "center", backgroundRepeat: "no-repeat",
            }} />
            <span style={{ minWidth: 0, flex: 1, display: "grid", gap: 2 }}>
              <span style={{
                fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-strong)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{logo.name}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--text-xs)", color: "var(--success)" }}>
                <Check size={12} /> Listo para enviar
              </span>
            </span>
            <button type="button" onClick={onQuitar} aria-label="Quitar el logo"
              style={{ ...botonSecundario, padding: "8px 10px", flexShrink: 0 }}>
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-haspopup="true"
            style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "12px 14px", cursor: "pointer", textAlign: "left",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600,
              color: "var(--text-body)", background: "var(--cream-050)",
              border: "1px solid " + (abierto ? "rgba(249,99,2,0.7)" : "var(--border-default)"),
              boxShadow: abierto ? "0 0 0 3px rgba(249,99,2,0.16)" : "none",
              borderRadius: "var(--radius-md)",
              transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
            }}
          >
            <Imagen size={16} />
            Añadir logo
            <span aria-hidden="true" style={{ marginLeft: "auto", color: "var(--text-faint)", fontSize: 12 }}>&#9662;</span>
          </button>
        )}

        {abierto && !logo && (
          <div role="menu" style={{
            position: "absolute", zIndex: 20, top: "calc(100% + 6px)", left: 0, right: 0,
            padding: 12, display: "grid", gap: 12,
            background: "var(--cream-000, #fff)", border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)", boxShadow: "0 18px 40px rgba(15, 15, 15, 0.16)",
          }}>
            <div role="tablist" style={{ display: "flex", gap: 4 }}>
              <Pestana activa={pestana === "pegar"} onClick={() => setPestana("pegar")} icono={<Clipboard size={14} />}>
                Pegar imagen
              </Pestana>
              <Pestana activa={pestana === "subir"} onClick={() => setPestana("subir")} icono={<Upload size={14} />}>
                Subir archivo
              </Pestana>
            </div>

            {pestana === "pegar" ? (
              <div style={{ display: "grid", gap: 8 }}>
                <div ref={zonaPegarRef} tabIndex={0} onPaste={onPegar}
                  style={{ ...zonaBase, borderStyle: "dashed" }}>
                  <Clipboard size={18} />
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-body)" }}>
                    Haz Ctrl+V aquí
                  </span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>
                    Si ya tienes el logo copiado, pégalo sin buscar el archivo.
                  </span>
                </div>
                <button type="button" onClick={leerPortapapeles} style={botonSecundario}>
                  Pegar del portapapeles
                </button>
                {avisoPegar && (
                  <span role="status" style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)" }}>
                    {avisoPegar}
                  </span>
                )}
              </div>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                <div
                  onDragOver={(ev) => { ev.preventDefault(); setArrastrando(true); }}
                  onDragLeave={() => setArrastrando(false)}
                  onDrop={onSoltar}
                  style={{
                    ...zonaBase,
                    borderStyle: "dashed",
                    borderColor: arrastrando ? "rgba(249,99,2,0.7)" : "var(--border-default)",
                    background: arrastrando ? "rgba(249,99,2,0.06)" : "var(--cream-050)",
                  }}
                >
                  <Upload size={18} />
                  <span style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--text-body)" }}>
                    Arrastra el archivo aquí
                  </span>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--text-faint)" }}>
                    O elígelo en el ordenador.
                  </span>
                </div>
                <button type="button" onClick={() => inputRef.current?.click()} style={botonSecundario}>
                  Elegir archivo
                </button>
              </div>
            )}
          </div>
        )}

        <input
          ref={inputRef} type="file" accept={LOGO_TIPOS.join(",")}
          onChange={async (ev) => {
            const file = ev.target.files?.[0];
            if (file) await entregar(file);
            ev.target.value = "";
          }}
          style={{ display: "none" }}
        />
      </div>

      {error && (
        <span role="alert" style={{ display: "block", marginTop: 8, fontSize: "var(--text-xs)", color: "var(--danger)" }}>
          {error}
        </span>
      )}
    </Etiqueta>
  );
}

const zonaBase = {
  display: "grid", justifyItems: "center", gap: 4, textAlign: "center",
  padding: "18px 14px", borderRadius: "var(--radius-md)",
  border: "1px solid var(--border-default)", background: "var(--cream-050)",
  color: "var(--text-muted)", outlineOffset: 2, cursor: "default",
};

const botonSecundario = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
  padding: "10px 14px", cursor: "pointer",
  fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600,
  color: "var(--text-strong)", background: "var(--cream-050)",
  border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)",
  transition: "border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
};

function Pestana({ activa, onClick, icono, children }) {
  return (
    <button
      type="button" role="tab" aria-selected={activa} onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7, flex: 1,
        justifyContent: "center", padding: "9px 10px", cursor: "pointer",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 600,
        color: activa ? "var(--text-strong)" : "var(--text-muted)",
        background: activa ? "rgba(249,99,2,0.08)" : "transparent",
        border: "1px solid " + (activa ? "rgba(249,99,2,0.45)" : "transparent"),
        borderRadius: "var(--radius-sm, 8px)",
        transition: "background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)",
      }}
    >
      {icono}
      {children}
    </button>
  );
}
