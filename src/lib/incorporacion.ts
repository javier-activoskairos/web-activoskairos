// Vocabulario compartido entre el formulario de incorporación (cliente), la
// route handler que lo recibe (servidor) y el workflow de n8n que escribe en
// Notion.
//
// Las listas replican EXACTAMENTE las opciones de los selects de Notion
// ([AKC] - Empresas y [AKC] - Contactos). Si una opción no coincide carácter a
// carácter, Notion la rechaza o crea una opción nueva basura: por eso viven en
// un único sitio y no se escriben a mano en cada componente.

export const SECTORES = [
  "Agencia",
  "Comercio / Retail",
  "Comunicación / Marketing",
  "Educación",
  "Finanzas",
  "Fiscalidad",
  "Gaming",
  "Industria",
  "Inmobiliario",
  "Legal",
  "Logística",
  "Restauración",
  "Salud y bienestar",
  "Sostenibilidad",
  "Tecnología",
  "Otro",
] as const;

export const TAMANOS = ["1-10", "11-25", "26-100", "101-200", "+200"] as const;

export const PAISES = [
  "España",
  "Estados Unidos",
  "Argentina",
  "México",
  "Colombia",
  "Chile",
  "Perú",
  "Uruguay",
  "Portugal",
  "Francia",
  "Italia",
  "Reino Unido",
  "Otro",
] as const;

export const IDIOMAS = [
  "Español",
  "Argentino",
  "Inglés",
  "Portugués",
  "Francés",
  "Italiano",
  "Chino",
] as const;

export const MADUREZ = ["Inicial", "Básica", "Estructurada", "Avanzada"] as const;

// Descripción de cada nivel de madurez, tal cual está definida en Notion. Se
// muestra bajo el select para que la empresa se sitúe sin tener que adivinar.
export const MADUREZ_AYUDA: Record<string, string> = {
  Inicial: "Procesos principalmente manuales y poco documentados.",
  Básica: "Herramientas digitales aisladas y procesos parcialmente definidos.",
  Estructurada: "Procesos documentados y herramientas conectadas de forma consistente.",
  Avanzada: "Procesos integrados, automatizados y medidos habitualmente.",
};

export const CANALES = ["Email", "Teléfono", "WhatsApp", "LinkedIn"] as const;

export const INFLUENCIAS = [
  "Decisor",
  "Campeón",
  "Portero",
  "Influenciador",
  "Usuario",
  "Técnico",
  "Bloqueador",
] as const;

export const INFLUENCIA_AYUDA: Record<string, string> = {
  Decisor: "Tiene la autoridad final para aprobar o rechazar la compra.",
  Campeón: "Defiende la propuesta internamente y facilita el acceso a otros decisores.",
  Portero: "Filtra el acceso a los decisores reales.",
  Influenciador: "Opina y condiciona la decisión sin tener la autoridad final.",
  Usuario: "Utilizará el producto o servicio en el día a día.",
  Técnico: "Evalúa la viabilidad técnica o de integración de la solución.",
  Bloqueador: "Puede frenar o dificultar el avance de la oportunidad.",
};

/** Longitud máxima por campo de texto. El servidor recorta a estos valores. */
export const LIMITS = {
  email: 160,
  nombre: 80,
  apellidos: 120,
  cargo: 120,
  telefono: 40,
  linkedin: 200,
  empresa: 160,
  razonSocial: 200,
  cif: 40,
  web: 200,
  ubicacion: 120,
  direccion: 200,
  cp: 20,
  mision: 1200,
  facturaNombre: 120,
} as const;

/** Logo: solo formatos web razonables y un tamaño que quepa en el payload JSON. */
export const LOGO_MAX_BYTES = 2 * 1024 * 1024;
export const LOGO_TIPOS = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** A donde van las facturas: al correo del propio contacto o a otro distinto
 *  (administracion, gestoria...). El formulario y la route handler comparten
 *  estos dos valores; n8n decide con ellos a quien marca como contacto de
 *  facturacion en [AK] - Contactos. */
export const FACTURA_DESTINOS = ["mio", "otro"] as const;

/**
 * Normaliza los identificadores que viajan en el enlace: `?id=` es el Notion ID
 * de la empresa ([AKC] - Empresas → propiedad `Notion ID`), no el Código
 * Empresa, y `&c=` el del contacto que lo recibe ([AK] - Contactos), con el que
 * se prellenan sus datos personales. Se aceptan con o sin guiones y se
 * devuelven en minúsculas sin guiones; cualquier otra cosa devuelve "" y ese
 * bloque del formulario queda en blanco.
 */
export function normalizeNotionId(raw: unknown): string {
  if (typeof raw !== "string") return "";
  const hex = raw.trim().replace(/-/g, "").toLowerCase();
  return /^[0-9a-f]{32}$/.test(hex) ? hex : "";
}
