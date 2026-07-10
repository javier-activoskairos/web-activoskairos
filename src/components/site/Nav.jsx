"use client";
// Navegación superior fija del sitio Kairos.
import React from "react";
import { useLocale } from "next-intl";
import { Button, Logo } from "./ds";
import { Container } from "./primitives";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // La home es un one-page con anclas de scroll; las subpáginas (p. ej. /vitae) no
  // tienen esas secciones. Fuera de la home, las anclas apuntan a la home + hash para
  // volver de verdad. `usePathname` viene sin prefijo de idioma; lo reañadimos.
  const pathname = usePathname();
  const locale = useLocale();
  const base = locale === routing.defaultLocale ? "" : `/${locale}`;
  const onHome = pathname === "/";
  const homeHref = base || "/";
  const hrefFor = (target) =>
    target.startsWith("#")
      ? onHome
        ? target
        : `${base}/${target}`
      : `${base}${target}`;

  const links = [
    ["Metodología", "#metodologia"],
    ["Activos", "#activos"],
    ["Casos de Éxito", "#casos"],
    ["Vitae", "/vitae"],
  ];

  const onDark = !scrolled;
  const linkColor = onDark ? "var(--text-on-dark-body)" : "var(--text-body)";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled
          ? "color-mix(in srgb, var(--cream-100) 82%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border-subtle)"
          : "1px solid transparent",
        transition:
          "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      }}
    >
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
          gap: "var(--space-6)",
        }}
      >
        <a
          href={onHome ? "#top" : homeHref}
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <Logo
            variant="wordmark"
            theme={onDark ? "dark" : "light"}
            height={26}
            basePath="/"
          />
        </a>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-6)",
          }}
          className="kairos-navlinks"
        >
          {links.map(([label, href]) => (
            <a
              key={href}
              href={hrefFor(href)}
              style={{
                fontSize: "var(--text-sm)",
                fontWeight: "var(--weight-semibold)",
                color: linkColor,
                textDecoration: "none",
                transition: "color var(--dur-fast) var(--ease-out)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
          }}
        >
          <a href={hrefFor("#contacto")} style={{ textDecoration: "none" }}>
            <Button variant="primary" size="sm">
              Vive el proceso
            </Button>
          </a>
        </div>
      </Container>
    </header>
  );
}
