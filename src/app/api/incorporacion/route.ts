import { NextResponse, type NextRequest } from "next/server";
import {
  CANALES,
  EMAIL_RE,
  FACTURA_DESTINOS,
  IDIOMAS,
  INFLUENCIAS,
  LIMITS,
  LOGO_MAX_BYTES,
  LOGO_TIPOS,
  MADUREZ,
  PAISES,
  SECTORES,
  TAMANOS,
  normalizeNotionId,
} from "@/lib/incorporacion";

// Recepción del formulario de incorporación. Reenvía a n8n, que es quien
// escribe en Notion ([AKC] - Empresas, [AKC] - Contactos y [AKC] - Seguimientos).
//
// Mismo patrón que `/api/lead`: la clave del webhook vive solo en el servidor,
// así que nadie puede inyectar datos en el CRM desde fuera de esta web.
const WEBHOOK = process.env.N8N_INCORPORACION_WEBHOOK_URL;
const WEBHOOK_KEY = process.env.N8N_INCORPORACION_KEY;

// Limitador en memoria, igual que en /api/lead: no sobrevive a un redeploy,
// pero corta el abuso trivial. Un formulario de incorporación se envía una vez,
// no cinco: el margen es holgado de sobra.
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

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** Los selects solo pueden valer lo que existe en Notion; cualquier otra cosa
 *  se descarta en silencio en vez de crear opciones basura en la BBDD. */
const opcion = (v: unknown, permitidas: readonly string[]) => {
  const s = clean(v, 80);
  return permitidas.includes(s) ? s : "";
};

const bool = (v: unknown) => v === true;

/** Base64 sin cabecera `data:`; se valida tipo y peso real (3 bytes por cada
 *  4 caracteres) antes de reenviarlo. */
function logoValido(v: unknown) {
  if (!v || typeof v !== "object") return null;
  const l = v as Record<string, unknown>;
  const type = clean(l.type, 40);
  const data = typeof l.data === "string" ? l.data : "";
  const name = clean(l.name, 80);
  if (!LOGO_TIPOS.includes(type) || !name) return null;
  if (!/^[A-Za-z0-9+/=]+$/.test(data)) return null;
  if ((data.length * 3) / 4 > LOGO_MAX_BYTES) return null;
  return { name, type, data };
}

export async function POST(request: NextRequest) {
  if (!WEBHOOK || !WEBHOOK_KEY) {
    console.error(
      "[incorporacion] Falta N8N_INCORPORACION_WEBHOOK_URL o N8N_INCORPORACION_KEY",
    );
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

  const email = clean(body.email, LIMITS.email);
  const nombre = clean(body.nombre, LIMITS.nombre);
  const empresa = clean(body.empresa, LIMITS.empresa);

  if (!EMAIL_RE.test(email) || nombre.length < 2 || empresa.length < 2) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Un correo de facturacion invalido no invalida el envio: se ignora y las
  // facturas se quedan en el contacto, que es el comportamiento de siempre.
  const facturaEmailBruto = clean(body.facturaCorreo, LIMITS.email);
  const facturaEmailOk = EMAIL_RE.test(facturaEmailBruto) ? facturaEmailBruto : "";
  const facturaDestino =
    opcion(body.facturaDestino, FACTURA_DESTINOS) === "otro" && facturaEmailOk ? "otro" : "mio";
  const facturaEmail = facturaDestino === "otro" ? facturaEmailOk : email;

  const payload = {
    // Identificación de la empresa. Si viene vacío, n8n busca por email de
    // contacto y, si tampoco existe, crea la empresa con Origen = Web.
    notionId: normalizeNotionId(body.id),
    origen: "Web",
    enviadoEn: new Date().toISOString(),
    contacto: {
      email,
      nombre,
      apellidos: clean(body.apellidos, LIMITS.apellidos),
      cargo: clean(body.cargo, LIMITS.cargo),
      telefono: clean(body.telefono, LIMITS.telefono),
      linkedin: clean(body.linkedin, LIMITS.linkedin),
      canal: opcion(body.canal, CANALES),
      influencia: opcion(body.influencia, INFLUENCIAS),
      // `facturacion` se mantiene por compatibilidad con el workflow: es
      // cierto cuando las facturas van al correo del propio contacto.
      facturacion: facturaDestino === "mio",
      copia: bool(body.copia),
    },
    // A quien se le facturan. Si `destino` es "otro", n8n busca ese correo en
    // [AK] - Contactos y, si no existe, crea el contacto en la misma empresa.
    facturacion: {
      destino: facturaDestino,
      nombre: facturaDestino === "otro" ? clean(body.facturaNombre, LIMITS.facturaNombre) : "",
      email: facturaEmail,
    },
    empresa: {
      nombre: empresa,
      razonSocial: clean(body.razonSocial, LIMITS.razonSocial),
      cif: clean(body.cif, LIMITS.cif),
      web: clean(body.web, LIMITS.web),
      pais: opcion(body.pais, PAISES),
      ubicacion: clean(body.ubicacion, LIMITS.ubicacion),
      direccion: clean(body.direccion, LIMITS.direccion),
      cp: clean(body.cp, LIMITS.cp),
      sector: opcion(body.sector, SECTORES),
      tamano: opcion(body.tamano, TAMANOS),
      idioma: opcion(body.idioma, IDIOMAS),
      madurez: opcion(body.madurez, MADUREZ),
      mision: clean(body.mision, LIMITS.mision),
    },
    // Quien recomendó a la empresa, tal cual lo escribe el cliente. n8n intenta
    // casarlo con una empresa de [AK] - Empresas para rellenar la relación
    // `Referente`; si no encuentra ninguna, queda en la nota del seguimiento
    // para tenerlo en cuenta al crear la membresía a mano.
    referido: clean(body.referido, LIMITS.referido),
    logo: logoValido(body.logo),
  };

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-ak-web-key": WEBHOOK_KEY,
      },
      body: JSON.stringify(payload),
      // Más margen que en /api/lead: el workflow puede subir el logo a Notion.
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) {
      console.error("[incorporacion] n8n respondió", res.status);
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
  } catch (err) {
    console.error("[incorporacion] fallo al contactar n8n", err);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
