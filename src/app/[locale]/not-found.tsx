import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  return { title: t("title"), robots: { index: false, follow: true } };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "0.75rem",
        padding: "6rem 1.5rem",
        background: "#0D0D0D",
        color: "var(--text-on-dark-body)",
        minHeight: "70vh",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-eyebrow)",
          letterSpacing: "var(--tracking-eyebrow)",
          textTransform: "uppercase",
          color: "#F96302",
          fontWeight: 700,
        }}
      >
        Error 404
      </span>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(1.8rem, 5vw, 2.75rem)",
          lineHeight: 1.1,
          color: "var(--text-on-dark-strong)",
          margin: 0,
          textWrap: "balance",
        }}
      >
        {t("heading")}
      </h1>
      <p
        style={{
          margin: 0,
          maxWidth: "46ch",
          fontSize: "var(--text-base)",
          lineHeight: "var(--leading-normal)",
        }}
      >
        {t("body")}
      </p>
      <Link
        href="/"
        style={{
          marginTop: "1.25rem",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 46,
          padding: "0 1.4rem",
          borderRadius: "var(--radius-md)",
          background: "var(--accent)",
          color: "var(--accent-contrast)",
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-semibold)",
          textDecoration: "none",
        }}
      >
        {t("cta")}
      </Link>
    </div>
  );
}
