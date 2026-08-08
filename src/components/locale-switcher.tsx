"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const SHORT: Record<string, string> = {
  es: "ES",
};

/**
 * Selector de idioma. Estilado con `style` en vez de clases de Tailwind para
 * encajar con el resto del sitio (que va todo con estilos en línea) y para
 * poder invertir el color sobre el hero oscuro.
 *
 * Con un solo idioma no se pinta nada: un desplegable con una única opción es
 * ruido. El componente se mantiene para cuando vuelva a haber más de un locale.
 */
export function LocaleSwitcher({ onDark = false }: { onDark?: boolean }) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  // Después de los hooks: React exige que se llamen siempre en el mismo orden.
  if (routing.locales.length < 2) return null;

  return (
    <select
      aria-label={t("language")}
      value={locale}
      onChange={onChange}
      disabled={isPending}
      style={{
        appearance: "none",
        cursor: "pointer",
        background: "transparent",
        color: onDark ? "var(--text-on-dark-body)" : "var(--text-body)",
        border: `1px solid ${onDark ? "var(--border-on-dark)" : "var(--border-strong)"}`,
        borderRadius: "var(--radius-sm)",
        padding: "0.35rem 0.55rem",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)",
        lineHeight: 1,
        opacity: isPending ? 0.6 : 1,
        transition: "color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      }}
    >
      {routing.locales.map((loc) => (
        // El `color` explícito evita texto blanco sobre blanco en el desplegable
        // nativo cuando el <select> hereda el color claro del hero.
        <option key={loc} value={loc} style={{ color: "#1A1714" }}>
          {SHORT[loc] ?? loc.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
