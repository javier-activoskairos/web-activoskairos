# Flujo — Alta en la newsletter (KaiSend)

Recorrido completo de un alta en el boletín, desde el formulario del pie hasta
el webhook de n8n. Parte del Activo Kairos **KaiSend**.

## Dónde está

| Pieza                                | Qué hace                                                       |
| ------------------------------------ | -------------------------------------------------------------- |
| `src/components/site/Newsletter.jsx` | Formulario (franja superior del pie). Cliente.                  |
| `src/components/site/Contact.jsx`    | `<Footer>` monta `<Newsletter />`, así que sale en todo el sitio. |
| `src/app/api/newsletter/route.ts`    | Route handler: valida y reenvía a n8n. Servidor.                 |
| `messages/*.json` → `Newsletter`     | Textos en es / en / it / pt.                                     |
| `src/styles/kairos.css`              | `.kairos-newsletter-*`: una columna por debajo de 980 / 720 px.  |

## Recorrido

1. La persona escribe su **correo** (obligatorio), opcionalmente su **nombre**,
   y marca la **casilla de consentimiento**. Sin correo válido y sin casilla el
   botón «Suscribirme» está deshabilitado.
2. Al enviar, el navegador hace `POST /api/newsletter` con `email`, `nombre`,
   `idioma`, `consentimiento`, el texto literal que se aceptó, la página de
   origen, el honeypot y los milisegundos transcurridos desde que se pintó el
   formulario.
3. La route handler comprueba, **en este orden**: límite por IP (5 cada 10 min),
   honeypot relleno, tiempo mínimo (2,5 s), correo válido y consentimiento.
   Un bot recibe `200 {"ok":true}` y no se reenvía nada; un dato inválido, `400`.
4. Si todo cuadra, el servidor hace `POST` al webhook de n8n con la cabecera
   `x-ak-web-key` (si hay clave) y un `aceptadoEn` en ISO como prueba del
   consentimiento. n8n es quien manda el correo de confirmación y da de alta.
5. La web enseña **«Revisa tu correo y confirma la suscripción»** (doble opt-in:
   el alta no está cerrada hasta que la persona confirma desde su correo).

## Configuración

```bash
# .env.local / EasyPanel — sólo servidor, sin NEXT_PUBLIC_
N8N_KAISEND_ALTA_URL=https://n8n.activoskairos.com/webhook/kaisend-alta
N8N_KAISEND_ALTA_KEY=            # opcional; si está, viaja en x-ak-web-key
```

La URL y la clave **no** llevan `NEXT_PUBLIC_` a propósito: el `fetch` al
webhook lo hace el servidor, igual que en `/api/lead` y `/api/incorporacion`.
Si fuese una variable pública, cualquiera podría inyectar altas desde fuera.

**Si falta `N8N_KAISEND_ALTA_URL`:** la ruta responde `500 not_configured` y lo
escribe en el log del servidor; el formulario avisa por consola («falta
N8N_KAISEND_ALTA_URL en el entorno») y enseña «No hemos podido darte de alta».
La web no se rompe ni pierde el resto del pie.

## Antirrobots

Sin terceros ni captcha:

- **Honeypot**: campo `company_website` fuera de pantalla. Si viene relleno, se
  responde `ok` y no se reenvía nada.
- **Tiempo mínimo**: 3 s en el cliente, 2,5 s revalidados en el servidor
  (`MIN_ELAPSED_MS`), que es lo que no se puede saltar desde el navegador.
- **Límite por IP**: 5 envíos cada 10 minutos, en memoria del proceso.

## Payload que recibe n8n

```json
{
  "origen": "Web — Newsletter",
  "email": "javier@activoskairos.com",
  "nombre": "Javier",
  "idioma": "es",
  "consentimiento": true,
  "consentimientoTexto": "Acepto recibir el boletín mensual de Activos Kairos…",
  "aceptadoEn": "2026-09-16T08:40:24.500Z",
  "pagina": "/"
}
```

## Comprobado el 16/09/2026

Con un webhook de mentira en `127.0.0.1:4100` y el build de producción
(`next start`):

| Caso                        | Respuesta              | Llega a n8n |
| --------------------------- | ---------------------- | ----------- |
| Alta válida                 | `200 {"ok":true}`      | Sí          |
| Sin consentimiento          | `400 {"error":"invalid"}` | No       |
| Correo inválido             | `400 {"error":"invalid"}` | No       |
| Honeypot relleno            | `200 {"ok":true}`      | No          |
| Enviado en menos de 2,5 s   | `200 {"ok":true}`      | No          |
| Sin `N8N_KAISEND_ALTA_URL`  | `500 not_configured`   | No          |

En el navegador (1440×900 y 390×844): el formulario se ve, el envío correcto
enseña el mensaje de confirmación y el foco salta al `role="status"` para que un
lector de pantalla lo lea.
