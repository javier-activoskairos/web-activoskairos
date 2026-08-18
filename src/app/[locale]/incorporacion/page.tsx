import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { IncorporacionForm } from "@/components/site/incorporacion/IncorporacionForm";
import { TrackView } from "@/components/site/cursos/TrackView";
import { EVENTS } from "@/lib/analytics";
import { normalizeNotionId } from "@/lib/incorporacion";

// Página de enlace privado: se envía a cada empresa con su `?id=`. No debe
// aparecer en buscadores ni en el sitemap, de ahí el noindex.
export const metadata: Metadata = {
  title: "Incorporación · Activos Kairos",
  description:
    "Completa o actualiza los datos estables de tu empresa para que trabajemos siempre con la información correcta.",
  alternates: { canonical: "/incorporacion" },
  robots: { index: false, follow: false },
};

const PREFILL_URL = process.env.N8N_INCORPORACION_PREFILL_URL;
const WEBHOOK_KEY = process.env.N8N_INCORPORACION_KEY;

type Prefill = Record<string, string | boolean>;

/**
 * Pide a n8n los datos ya guardados. Se hace en el servidor: la clave del
 * webhook no puede viajar al navegador, y los identificadores del enlace son
 * Notion IDs (`?id=` la empresa, `&c=` el contacto), así que tampoco se expone
 * ningún dato a quien no tenga el enlace.
 *
 * Si n8n no responde, la página NO falla: se pinta el formulario en blanco con
 * un aviso. Perder el prellenado es molesto; perder el formulario, caro.
 */
async function cargarPrefill(
  id: string,
  contactoId: string,
): Promise<{ prefill: Prefill | null; fallo: boolean }> {
  if ((!id && !contactoId) || !PREFILL_URL || !WEBHOOK_KEY) {
    return { prefill: null, fallo: false };
  }
  const query = new URLSearchParams();
  if (id) query.set("id", id);
  if (contactoId) query.set("c", contactoId);
  try {
    const res = await fetch(`${PREFILL_URL}?${query.toString()}`, {
      headers: { "x-ak-web-key": WEBHOOK_KEY },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      console.error("[incorporacion] prefill: n8n respondió", res.status);
      return { prefill: null, fallo: true };
    }
    const data = (await res.json()) as { found?: boolean } & Prefill;
    // `found: false` = ninguno de los ids corresponde a una ficha. No es un
    // fallo: simplemente se rellena desde cero.
    if (!data || data.found === false) return { prefill: null, fallo: false };
    return { prefill: data, fallo: false };
  } catch (err) {
    console.error("[incorporacion] prefill: fallo al contactar n8n", err);
    return { prefill: null, fallo: true };
  }
}

export default async function IncorporacionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { id: rawId, c: rawContacto } = await searchParams;
  const empresaId = normalizeNotionId(Array.isArray(rawId) ? rawId[0] : rawId);
  const contactoId = normalizeNotionId(
    Array.isArray(rawContacto) ? rawContacto[0] : rawContacto,
  );
  const { prefill, fallo } = await cargarPrefill(empresaId, contactoId);

  return (
    <div className="kairos-site">
      <TrackView event={EVENTS.incorporacionView} />
      <IncorporacionForm empresaId={empresaId} prefill={prefill} prefillFallo={fallo} />
    </div>
  );
}
