"use client";
// Alta en la newsletter (KaiSend). Vive en la franja superior del pie, así que
// aparece en todas las páginas que montan <Footer />.
//
// El envío va a /api/newsletter (route handler), no directo al webhook de n8n:
// así la URL y la clave del webhook se quedan en el servidor, igual que en el
// formulario de contacto. Ver src/app/api/newsletter/route.ts.
import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container } from "./primitives";
import { ArrowRight, Check, Mail } from "./icons";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Tiempo mínimo de vida del formulario antes de dejar enviar. Un humano tarda
// más que esto en escribir su correo y marcar la casilla; un bot que rellena y
// dispara de golpe, no. El servidor vuelve a comprobarlo (MIN_ELAPSED_MS).
const MIN_MS = 3000;

export function Newsletter() {
  const t = useTranslations("Newsletter");
  const locale = useLocale();
  const pathname = usePathname();
  const titleId = React.useId();
  const emailId = React.useId();
  const nameId = React.useId();
  const consentId = React.useId();
  const errorId = React.useId();

  // "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = React.useState("idle");
  const [errorKey, setErrorKey] = React.useState("generic");
  const [email, setEmail] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [hp, setHp] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  // El reloj arranca al montar, no al renderizar: `Date.now()` dentro del
  // render es impuro y el linter de React lo rechaza.
  const mountedAt = React.useRef(0);
  const okRef = React.useRef(null);

  React.useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const validEmail = EMAIL_RE.test(email.trim());
  const showEmailError = touched && email.trim().length > 0 && !validEmail;
  const ready = validEmail && consent && status !== "sending";

  // Al confirmarse el alta el formulario desaparece y el foco se quedaría en la
  // nada: lo llevamos al mensaje para que un lector de pantalla lo lea.
  React.useEffect(() => {
    if (status === "sent" && okRef.current) okRef.current.focus();
  }, [status]);

  async function onSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!ready) return;

    // El honeypot se comprueba también aquí: si viene relleno fingimos el alta
    // y no se manda nada, para no darle pistas al bot.
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
          idioma: locale,
          consentimiento: true,
          consentimientoTexto: t("consentPlain"),
          origen: "Web — Newsletter",
          pagina: pathname,
          hp,
          elapsed,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      // Sin webhook configurado la ruta responde 500 not_configured. No es
      // culpa de quien se apunta: se avisa por consola y se enseña un error
      // controlado, nunca una pantalla rota.
      let code = "";
      try {
        code = (await res.json())?.error ?? "";
      } catch {
        code = "";
      }
      if (code === "not_configured") {
        console.warn(
          "[newsletter] El alta no está configurada: falta N8N_KAISEND_ALTA_URL en el entorno.",
        );
      }
      setErrorKey(code === "rate_limited" ? "rateLimited" : "generic");
      setStatus("error");
    } catch (err) {
      console.warn("[newsletter] no se ha podido enviar el alta", err);
      setErrorKey("generic");
      setStatus("error");
    }
  }

  return (
    <div
      className="kairos-newsletter"
      style={{
        borderBottom: "1px solid var(--border-on-dark)",
        paddingBlock: "var(--space-9)",
      }}
    >
      <Container>
        <div
          className="kairos-newsletter-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "var(--space-7)",
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "var(--text-eyebrow)",
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-eyebrow)",
                fontWeight: 700,
                color: "#F96302",
                marginBottom: 12,
              }}
            >
              {t("eyebrow")}
            </div>
            <h2
              id={titleId}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--weight-bold)",
                fontSize: "var(--text-h4)",
                lineHeight: "var(--leading-heading)",
                letterSpacing: "var(--tracking-tight)",
                color: "var(--text-on-dark-strong)",
                margin: 0,
                textWrap: "balance",
              }}
            >
              {t("title")}
            </h2>
            <p
              style={{
                margin: "0.8rem 0 0",
                maxWidth: "46ch",
                fontSize: "var(--text-sm)",
                lineHeight: "var(--leading-normal)",
                color: "var(--text-on-dark-muted)",
              }}
            >
              {t("lead")}
            </p>
          </div>

          {status === "sent" ? (
            <div
              ref={okRef}
              tabIndex={-1}
              role="status"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border-on-dark)",
                borderRadius: "var(--radius-xl)",
                padding: "var(--space-6)",
                outline: "none",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: "50%",
                  background:
                    "var(--accent-gradient, linear-gradient(135deg,#F96302,#F9962E))",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={20} />
              </span>
              <span>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    color: "var(--text-on-dark-strong)",
                    fontSize: "1rem",
                  }}
                >
                  {t("sentTitle")}
                </strong>
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-on-dark-muted)",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  {t("sentBody")}
                </span>
              </span>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              aria-labelledby={titleId}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              <div
                className="kairos-newsletter-fields"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
                  gap: "var(--space-4)",
                }}
              >
                <Field
                  id={emailId}
                  label={t("labelEmail")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder={t("phEmail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  icon={<Mail size={16} />}
                  required
                  invalid={showEmailError}
                  describedBy={showEmailError ? errorId : undefined}
                />
                <Field
                  id={nameId}
                  label={t("labelName")}
                  optionalLabel={t("optional")}
                  autoComplete="given-name"
                  placeholder={t("phName")}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              {showEmailError && (
                <p
                  id={errorId}
                  style={{
                    margin: 0,
                    fontSize: "var(--text-sm)",
                    color: "#ffb4a2",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  {t("invalidEmail")}
                </p>
              )}

              <label
                htmlFor={consentId}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  cursor: "pointer",
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--leading-normal)",
                  color: "var(--text-on-dark-body)",
                  maxWidth: "52ch",
                }}
              >
                <input
                  id={consentId}
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{
                    width: 18,
                    height: 18,
                    marginTop: 2,
                    accentColor: "#F96302",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <span>
                  {t.rich("consent", {
                    privacidad: (chunks) => (
                      <Link
                        href="/privacidad"
                        style={{
                          color: "#F96302",
                          textDecoration: "underline",
                        }}
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </span>
              </label>

              {/* Honeypot: invisible para personas, tentador para bots. */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />

              {status === "error" && (
                <p
                  role="alert"
                  style={{
                    margin: 0,
                    fontSize: "var(--text-sm)",
                    lineHeight: "var(--leading-normal)",
                    color: "#ffb4a2",
                  }}
                >
                  <strong style={{ display: "block", color: "#fff" }}>
                    {t("errorTitle")}
                  </strong>
                  {t(
                    errorKey === "rateLimited"
                      ? "errorRateLimited"
                      : errorKey === "tooFast"
                        ? "errorTooFast"
                        : "errorBody",
                  )}
                </p>
              )}

              <button
                type="submit"
                disabled={!ready}
                className="kairos-contact-submit"
                data-ready={ready ? "true" : "false"}
                style={{
                  height: 52,
                  alignSelf: "start",
                  padding: "0 1.6rem",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  cursor: ready ? "pointer" : "not-allowed",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.55rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  fontWeight: "var(--weight-semibold)",
                  color: "#fff",
                  background:
                    "var(--accent-gradient, linear-gradient(135deg,#F96302,#F9962E))",
                  opacity: ready ? 1 : 0.72,
                  boxShadow: ready
                    ? "0 0 0 1px rgba(249,99,2,0.5), 0 16px 36px -14px rgba(249,99,2,0.7)"
                    : "none",
                  transition:
                    "opacity 240ms ease, box-shadow 280ms ease, transform 200ms ease",
                }}
              >
                {status === "sending" ? (
                  t("sending")
                ) : (
                  <React.Fragment>
                    {t("submit")} <ArrowRight size={18} />
                  </React.Fragment>
                )}
              </button>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}

function Field({
  id,
  label,
  optionalLabel,
  icon,
  invalid = false,
  describedBy,
  required = false,
  ...input
}) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ minWidth: 0 }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--text-on-dark-body)",
          marginBottom: 7,
        }}
      >
        {label}
        {optionalLabel && (
          <span style={{ color: "var(--text-on-dark-faint)", fontWeight: 400 }}>
            {" "}
            · {optionalLabel}
          </span>
        )}
      </label>
      <span
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${
            invalid
              ? "#ffb4a2"
              : focus
                ? "rgba(249,99,2,0.7)"
                : "var(--border-on-dark)"
          }`,
          boxShadow: focus ? "0 0 0 3px rgba(249,99,2,0.16)" : "none",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        }}
      >
        {icon && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              color: focus ? "#F96302" : "var(--text-on-dark-faint)",
              paddingLeft: 14,
              transition: "color 200ms ease",
            }}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          required={required}
          aria-required={required || undefined}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          {...input}
          onFocus={(e) => {
            setFocus(true);
            input.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            input.onBlur?.(e);
          }}
          style={{
            flex: 1,
            minWidth: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-on-dark-strong)",
            fontFamily: "var(--font-sans)",
            fontSize: "1rem",
            padding: icon ? "13px 14px 13px 10px" : "13px 14px",
          }}
        />
      </span>
    </div>
  );
}
