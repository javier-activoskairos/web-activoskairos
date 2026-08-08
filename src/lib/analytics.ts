// Envío de eventos a GA4 (gtag.js). La propiedad y el Consent Mode los monta
// `components/analytics/GoogleAnalytics.tsx`; aquí solo se empujan eventos.
//
// Con el consentimiento denegado (estado por defecto, sin banner) GA sigue
// recibiendo los eventos en modo cookieless: se cuentan de forma agregada, sin
// cookies ni identificador de usuario.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Ancho de viewport → categoría. Los breakpoints coinciden con los del QA
 *  (390 / 768 / 1280 / 1440 px). */
function deviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/** Parámetros comunes a todos los eventos de cursos. */
function commonParams(): GtagParams {
  if (typeof window === "undefined") return {};
  return {
    page_path: window.location.pathname,
    device_type: deviceType(),
    language: document.documentElement.lang || "es",
  };
}

/**
 * Empuja un evento a GA4. Silencioso si gtag no está cargado (desarrollo local
 * sin GA, bloqueadores de anuncios): medir nunca debe romper la página.
 */
export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return;
  window.gtag("event", name, { ...commonParams(), ...params });
}

export const EVENTS = {
  coursesHubView: "courses_hub_view",
  landingView: "notion_ai_landing_view",
  courseCardClick: "notion_ai_course_card_click",
  skoolClick: "notion_ai_skool_click",
  faqOpen: "notion_ai_faq_open",
} as const;
