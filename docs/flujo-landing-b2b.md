# Flujo — Landing B2B de alta en el boletín

Landing de captación en `/sistema-operativo-ia`. Presenta la oferta del
sistema operativo empresarial con IA y recoge altas en el boletín de
Activos Kairos (KaiSend) con doble opt-in. Usa el mismo circuito que el
formulario del pie, descrito en [`flujo-newsletter.md`](flujo-newsletter.md).

## Dónde está

| Pieza | Qué hace |
| --- | --- |
| `src/app/[locale]/sistema-operativo-ia/page.tsx` | La página. Es un componente de servidor, montado sobre `ContentLayout`. Los textos van dentro. |
| `src/components/site/landing/OptinForm.jsx` | El formulario. Es de cliente. Pide nombre, correo, empresa (opcional) y consentimiento. |
| `src/styles/landing.css` | Estilos de la landing. Reutiliza los tokens de `legal.css` y `content.css`. |
| `src/app/api/newsletter/route.ts` | La misma ruta que usa el pie. Ahora reenvía también `empresa` cuando llega. |
| `messages/es.json` → `Newsletter` | El texto del consentimiento y los errores. Es el mismo del pie. |

## Origen del contenido

Todo el texto sale del Activo Kairos «Consultoría Richi», del bloque «Oferta
principal — Kairos OS». En Notion está en la página
`295fae893e4a475c9d49f43b8df03906`. De ahí vienen:

- la frase principal y la promesa;
- tres de los beneficios;
- el cliente ideal y las definiciones de «para quién»;
- la prueba social: más de 135 sistemas entregados y más de 1.100 horas ahorradas en 2025.

El nombre «Kairos OS» y el precio siguen siendo provisionales. Por eso la
página no los usa y se publica en `noindex`. Tampoco está en el sitemap.

## Recorrido

1. La persona rellena nombre y correo, que son obligatorios. La empresa es opcional.
2. Marca la casilla de consentimiento. Viene **sin marcar** y el botón sigue
   deshabilitado hasta que se marca.
3. El navegador hace `POST /api/newsletter` con:
   - `origen: "Web — Landing sistema operativo IA"`;
   - `pagina: "/sistema-operativo-ia"`;
   - el texto literal del consentimiento;
   - el honeypot y el tiempo transcurrido.
4. La ruta aplica las mismas comprobaciones que para el pie:
   - límite por IP;
   - honeypot;
   - tiempo mínimo de 2,5 s;
   - correo válido;
   - consentimiento marcado.

   Si todo cuadra, reenvía al webhook de alta de n8n con la cabecera `x-ak-web-key`.
5. La página muestra «Ya casi está». El alta no se cierra hasta que la persona
   confirma desde el correo que manda n8n (doble opt-in).

### Qué hace n8n con el envío

Esto describe el workflow «KaiSend — Alta con doble confirmación» tal como
está al escribir este documento. Se leyó, no se tocó.

- Normaliza `origen` a `Web`. La página concreta solo queda en `pagina`.
- **Ignora `empresa`.** La web lo envía, pero el Alta todavía no lo guarda.
- Crea o actualiza el contacto en Notion, con la suscripción en espera de confirmación.
- Envía el correo de confirmación.
- Cuando la persona confirma, marca el alta con la base legal
  «Consentimiento (doble opt-in)» y la versión «Web v1 · 2026-09».
- Después lo da de alta en Listmonk.

La casilla usa **el mismo texto** que la del pie. Así, la versión de
consentimiento fija que guarda n8n corresponde de verdad a lo que se aceptó.

## Configuración

No necesita variables nuevas: usa `N8N_KAISEND_ALTA_URL` y `N8N_KAISEND_ALTA_KEY`
(ver `.env.example`). Mientras no estén en EasyPanel, el envío responde
«No hemos podido darte de alta» sin romper la página.

## Comprobado el 21/09/2026

Con el build de producción (`next start`) y un webhook de mentira en
`127.0.0.1:4100`. No se envió nada al n8n real.

| Caso | Respuesta | Llega al webhook |
| --- | --- | --- |
| Alta válida con empresa | `200 {"ok":true}` | Sí, con `empresa` y la clave |
| Sin consentimiento | `400 invalid` | No |
| Correo inválido | `400 invalid` | No |
| Honeypot relleno | `200 {"ok":true}` | No |
| Enviado en menos de 2,5 s | `200 {"ok":true}` | No |
| Sexto envío de la misma IP en 10 min | `429 rate_limited` | No |

En Chrome headless, a 1280×900 y a 390×844, se comprobó:

- la casilla arranca sin marcar;
- el botón está deshabilitado hasta tener nombre, correo válido y consentimiento;
- el envío muestra la confirmación;
- el payload llega completo al webhook de mentira;
- no hay scroll horizontal ni errores en la consola;
- la cabecera `robots` es `noindex, follow`.

**Sin probar:** el alta de punta a punta contra n8n. Depende de que se mergee
el PR #9 y de que las variables estén en EasyPanel.
