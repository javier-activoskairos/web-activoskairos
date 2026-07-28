import { NextResponse, type NextRequest } from "next/server";

// Alta de lead en el CRM ([AK] - Contactos) vía el webhook de n8n.
//
// Va por una route handler en vez de hacer el `fetch` desde el navegador para
// que la clave del webhook no viaje al cliente: en la landing estática vivía
// dentro del HTML público (y del repo), así que cualquiera podía inyectar
// contactos falsos.
const WEBHOOK = process.env.N8N_LEAD_WEBHOOK_URL;
const WEBHOOK_KEY = process.env.N8N_LEAD_KEY;

// Limitador simple en memoria. No sobrevive a un redeploy ni se comparte entre
// réplicas, pero el servicio corre con una sola y frena el abuso trivial.
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

export async function POST(request: NextRequest) {
  if (!WEBHOOK || !WEBHOOK_KEY) {
    console.error("[lead] Falta N8N_LEAD_WEBHOOK_URL o N8N_LEAD_KEY");
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

  // Honeypot: si viene relleno, respondemos OK y no reenviamos nada.
  if (clean(body.hp)) return NextResponse.json({ ok: true });

  const nombre = clean(body.nombre, 120);
  const email = clean(body.email, 160);

  if (nombre.length < 2 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // El payload es el mismo que ya esperaba el workflow de n8n, para no tener
  // que tocarlo: la landing del Test manda además teléfono, cargo, empresa y web.
  const payload = {
    origen: clean(body.origen, 80) || "Formulario Web — Home",
    nombre,
    email,
    telefono: clean(body.telefono, 40),
    cargo: clean(body.cargo, 120),
    empresa: clean(body.empresa, 160),
    web: clean(body.web, 200),
    detalle: clean(body.detalle, 1000),
  };

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ak-web-key": WEBHOOK_KEY,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[lead] n8n respondió", res.status);
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] fallo al contactar n8n", err);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
