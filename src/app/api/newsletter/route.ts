import { NextResponse, type NextRequest } from "next/server";

// Alta en la newsletter (KaiSend). Reenvía a n8n, que es quien manda el correo
// de confirmación y da de alta al suscriptor: desde aquí no se escribe nada.
//
// Mismo patrón que `/api/lead` y `/api/incorporacion`: el `fetch` al webhook se
// hace en el servidor, no en el navegador, para que ni la URL ni la clave del
// webhook viajen al cliente. Por eso las variables NO llevan `NEXT_PUBLIC_`.
const WEBHOOK = process.env.N8N_KAISEND_ALTA_URL;
// La clave es opcional a propósito: el webhook de alta todavía no existe y
// puede desplegarse sin protección antes de tenerla. Si está definida, se manda.
const WEBHOOK_KEY = process.env.N8N_KAISEND_ALTA_KEY;

// Limitador simple en memoria, igual que en /api/lead: no sobrevive a un
// redeploy ni se comparte entre réplicas, pero frena el abuso trivial.
const HITS = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  if (HITS.size > 5000) HITS.clear();
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// Tiempo mínimo entre que se pinta el formulario y llega el envío. Una persona
// tarda segundos en escribir su correo y marcar el consentimiento; un bot que
// rellena y manda de golpe, no. El cliente ya bloquea el botón antes de eso:
// esto es la comprobación que no se puede saltar desde el navegador.
const MIN_ELAPSED_MS = 2500;

export async function POST(request: NextRequest) {
  if (!WEBHOOK) {
    console.error("[newsletter] Falta N8N_KAISEND_ALTA_URL");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: si viene relleno, respondemos OK y no reenviamos nada. El bot
  // cree que ha entrado y no reintenta.
  if (clean(body.hp)) return NextResponse.json({ ok: true });

  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 0;
  if (elapsed < MIN_ELAPSED_MS) return NextResponse.json({ ok: true });

  const email = clean(body.email, 160);
  const nombre = clean(body.nombre, 120);
  // Opcional: solo lo manda la landing B2B (/kairos-os). El pie no.
  const empresa = clean(body.empresa, 160);

  // El consentimiento es obligatorio: sin él no hay base legal para escribirle.
  if (!EMAIL_RE.test(email) || body.consentimiento !== true) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const payload = {
    origen: clean(body.origen, 80) || "Web — Newsletter",
    email,
    nombre,
    ...(empresa ? { empresa } : {}),
    idioma: clean(body.idioma, 8),
    // Prueba del consentimiento: qué se aceptó, cuándo y desde dónde.
    consentimiento: true,
    consentimientoTexto: clean(body.consentimientoTexto, 500),
    aceptadoEn: new Date().toISOString(),
    pagina: clean(body.pagina, 300),
  };

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(WEBHOOK_KEY ? { "x-kaisend-key": WEBHOOK_KEY } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[newsletter] n8n respondió", res.status);
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } catch (err) {
    console.error("[newsletter] fallo al contactar n8n", err);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
