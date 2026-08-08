# Kairos Boilerplate — Fábrica de Webs IA

Plantilla base para los sitios web de cliente de **Activos Kairos**. Cada proyecto
nuevo parte de este repositorio (template) y se personaliza desde ahí.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (Radix / base-nova)
- **next-intl** — infraestructura multi-idioma en el mismo repo (hoy solo `es`)
- SEO base: `metadata`, `sitemap.xml`, `robots.txt`
- Deploy en el **VPS Kairos** (EasyPanel + Docker Swarm) vía webhook de push
- Sync de estado a **Notion** vía GitHub Action

## Empezar

```bash
npm install
cp .env.example .env.local   # definir NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

## Scripts

| Script                 | Acción                 |
| ---------------------- | ---------------------- |
| `npm run dev`          | Servidor de desarrollo |
| `npm run build`        | Build de producción    |
| `npm run start`        | Servir el build        |
| `npm run lint`         | ESLint                 |
| `npm run format`       | Formatear con Prettier |
| `npm run format:check` | Verificar formato      |

## Idiomas

- Configuración: [`src/i18n/routing.ts`](src/i18n/routing.ts) — locales y `defaultLocale`.
- Textos: [`messages/*.json`](messages) — un fichero por idioma.
- `localePrefix: "as-needed"` → el idioma por defecto (`es`) va sin prefijo; el
  resto bajo `/{locale}`.

## Personalizar para un cliente

1. **Marca**: editar el bloque `MARCA` en [`src/app/globals.css`](src/app/globals.css)
   (`--brand`, `--brand-foreground`, `--brand-accent`).
2. **Idiomas**: ajustar la lista en `src/i18n/routing.ts` y los `messages/*.json`.
3. **Contenido**: páginas en `src/app/[locale]/`.
4. **Entorno**: definir `NEXT_PUBLIC_SITE_URL` en EasyPanel y en `.env.local`.

## Deploy (VPS Kairos)

El sitio se despliega en el **VPS** con **EasyPanel** (proyecto `webs`, build con
nixpacks). Un webhook de push del repo llama a
`https://vps.activoskairos.com/api/deploy/<token>`: EasyPanel hace `git pull`,
reconstruye la imagen y actualiza el servicio de Docker Swarm. Las variables de
entorno (`NEXT_PUBLIC_SITE_URL`, etc.) se definen en EasyPanel.

Comprobar un despliegue:

```bash
ssh kairos-vps
cd /etc/easypanel/projects/webs/<servicio>/code && git log --oneline -1
docker service ps webs_<servicio>
```

Render quedó **obsoleto** en 08/2026: servicios suspendidos y dominios
desasociados. No se despliega nada ahí.

## Sync a Notion

[`.github/workflows/notion-sync.yml`](.github/workflows/notion-sync.yml) ejecuta
[`scripts/notion-sync.mjs`](scripts/notion-sync.mjs) en cada push a `main` y
hace upsert del repo en el panel de control de Notion. Requiere los secrets
`NOTION_TOKEN` y `NOTION_WEBS_DB` (placeholders hasta configurarlos).

---

Mantenido por **Activos Kairos**.
