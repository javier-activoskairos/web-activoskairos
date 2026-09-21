"use client";
// Formulario de alta de la landing B2B (/kairos-os).
//
// Mismo circuito que el formulario del pie (Newsletter.jsx): el navegador llama
// a /api/newsletter y es el servidor quien reenvía al webhook de alta de KaiSend
// en n8n, que manda el correo de doble confirmación. Aquí no se da de alta a
// nadie: el alta solo se cierra cuando la persona confirma desde su correo.
//
// El texto del consentimiento es el MISMO que el del pie (messages →
// Newsletter.consent / consentPlain) a propósito: n8n guarda una única
// «Versión consentimiento» fija para el alta web, y dos textos distintos
// dejarían esa prueba sin respaldo.
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
// Tiempo mínimo antes de dejar enviar; el servidor lo revalida (MIN_ELAPSED_MS).
const MIN_MS = 3000;

export function OptinForm({ origen }) {
  const t = useTranslations("Newsletter");
  const locale = useLocale();
  const pathname = usePathname();
  const ids = {
    nombre: React.useId(),
    email: React.useId(),
    empresa: React.useId(),
    consent: React.useId(),
    emailErr: React.useId(),
  };

  // "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = React.useState("idle");
  const [errorKey, setErrorKey] = React.useState("generic");
  const [nombre, setNombre] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [empresa, setEmpresa] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [hp, setHp] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const mountedAt = React.useRef(0);
  const okRef = React.useRef(null);

  React.useEffect(() => {
    mountedAt.current = Date.now();
  }, []);
  React.useEffect(() => {
    if (status === "sent" && okRef.current) okRef.current.focus();
  }, [status]);

  const validEmail = EMAIL_RE.test(email.trim());
  const showEmailError = touched && email.trim().length > 0 && !validEmail;
  const ready =
    nombre.trim().length > 0 && validEmail && consent && status !== "sending";

  async function onSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!ready) return;

    if (hp.trim()) {
      setStatus("sent");
      return;
    }
    const elapsed = Date.now() - mountedAt.current;
    if (elapsed < MIN_MS) {
      setErrorKey("tooFast");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          nombre: nombre.trim(),
          empresa: empresa.trim(),
          idioma: locale,
          consentimiento: true,
          consentimientoTexto: t("consentPlain"),
          origen,
          pagina: pathname,
          hp,
          elapsed,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      let code = "";
      try {
        code = (await res.json())?.error ?? "";
      } catch {
        code = "";
      }
      if (code === "not_configured") {
        console.warn(
          "[optin] El alta no está configurada: falta N8N_KAISEND_ALTA_URL en el entorno.",
        );
      }
      setErrorKey(code === "rate_limited" ? "rateLimited" : "generic");
      setStatus("error");
    } catch (err) {
      console.warn("[optin] no se ha podido enviar el alta", err);
      setErrorKey("generic");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="optin-ok" ref={okRef} tabIndex={-1} role="status">
        <span className="optin-ok-icon" aria-hidden="true">✓</span>
        <div>
          <strong>{t("sentTitle")}</strong>
          <p>
            Te hemos enviado un correo para confirmar la suscripción. Hasta que
            no pulses el enlace no te daremos de alta. Si no lo ves en unos
            minutos, revisa la carpeta de spam o promociones.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="optin-form" onSubmit={onSubmit} noValidate aria-label="Alta en el boletín">
      <div className="optin-fields">
        <div className="optin-field">
          <label htmlFor={ids.nombre}>Nombre</label>
          <input
            id={ids.nombre}
            autoComplete="given-name"
            placeholder="Tu nombre"
            required
            aria-required="true"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="optin-field">
          <label htmlFor={ids.email}>Correo de trabajo</label>
          <input
            id={ids.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t("phEmail")}
            required
            aria-required="true"
            aria-invalid={showEmailError || undefined}
            aria-describedby={showEmailError ? ids.emailErr : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
          />
        </div>
        <div className="optin-field optin-field-wide">
          <label htmlFor={ids.empresa}>
            Empresa <span className="optin-opt">· {t("optional")}</span>
          </label>
          <input
            id={ids.empresa}
            autoComplete="organization"
            placeholder="Nombre de tu empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          />
        </div>
      </div>

      {showEmailError && (
        <p id={ids.emailErr} className="optin-err">
          {t("invalidEmail")}
        </p>
      )}

      <label className="optin-consent" htmlFor={ids.consent}>
        <input
          id={ids.consent}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          {t.rich("consent", {
            privacidad: (chunks) => <Link href="/privacidad">{chunks}</Link>,
          })}
        </span>
      </label>

      {/* Honeypot: invisible para personas, tentador para bots. */}
      <input
        className="optin-hp"
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
      />

      {status === "error" && (
        <p className="optin-err" role="alert">
          <strong>{t("errorTitle")}</strong>{" "}
          {t(
            errorKey === "rateLimited"
              ? "errorRateLimited"
              : errorKey === "tooFast"
                ? "errorTooFast"
                : "errorBody",
          )}
        </p>
      )}

      <button className="cta-btn optin-submit" type="submit" disabled={!ready}>
        {status === "sending" ? t("sending") : "Quiero recibirlo →"}
      </button>

      <p className="optin-legal">
        Responsable: Activarte LLC (Activos Kairos). Finalidad: enviarte el
        boletín mensual. Base: tu consentimiento, que puedes retirar en
        cualquier envío. Más información y tus derechos en la{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </form>
  );
}
