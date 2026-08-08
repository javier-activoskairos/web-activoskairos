# Operación — Web Activos Kairos

Runbook de operación del sitio `activoskairos.com` y el portal `rumbo.activoskairos.com`.
Fuente de verdad viva: Bloque PI en Notion (Activos Kairos). Este fichero es la copia versionada con el código.

## 1. Arquitectura

```
Usuario
  │  HTTPS
  ▼
Cloudflare (DNS + CDN + WAF)   ← timeout de proxy 100 s (ojo con ops síncronas → 524)
  │
  ▼
VPS Hostinger KVM1 (72.60.89.215, Ubuntu 24.04, 1 vCPU / 3.8 GB RAM)
  │   EasyPanel (Docker Swarm + Traefik como reverse proxy)
  ├─ servicio  activoskairos   → Next.js 16 SSR (next-intl, solo es)   [proyecto: webs]
  ├─ servicio  rumbo (portal)
  └─ otros servicios (n8n, etc.)
  │
  ▼
Supabase (CLOUD, plan free)   ← base de datos gestionada; NO está en el VPS
```

- **Frontend + portal:** en el VPS (EasyPanel).
- **Base de datos:** Supabase Cloud (gestionada, backups automáticos del proveedor).
- **Panel EasyPanel:** https://vps.activoskairos.com

## 2. Despliegue (CI/CD)

Automático en cada `push` a `main`:

1. GitHub Actions (`.github/workflows/notion-sync.yml`) dispara el **deploy webhook** de EasyPanel.
2. EasyPanel construye la nueva imagen. **Mantiene el contenedor antiguo hasta que el build nuevo tiene éxito** (sin downtime si el build falla).
3. Health check: el workflow espera HTTP 200 en `https://activoskairos.com`.
4. Sincroniza estado a Notion: `[AKS] - Webs` (Entorno=VPS, En producción) + alta en `[AKS] - Despliegues` con el resultado.

Deploy manual: pestaña **Actions → Deploy & Notion Sync → Run workflow**, o en EasyPanel botón *Deploy*.

## 3. Rollback

El VPS corre bajo **Docker Swarm**. Para reiniciar un servicio se usa SIEMPRE:

```bash
docker service update --force <nombre_servicio>
```

**NO** usar `docker restart` (no aplica a servicios de Swarm; puede dejar el estado inconsistente).

Opciones de rollback, de menos a más intrusiva:

1. **Revertir el commit (recomendado):** en local
   ```bash
   git revert <sha_malo>
   git push origin main
   ```
   El push relanza el pipeline y vuelve a desplegar el estado bueno. Deja rastro en el historial.

2. **Redesplegar un commit anterior desde EasyPanel:** en el servicio `activoskairos`, fijar el commit/branch bueno y pulsar *Deploy*.

3. **Forzar recarga del servicio (si el contenedor quedó colgado pero la imagen es buena):**
   ```bash
   ssh -i C:/Users/javis/.ssh/kairos_vps root@72.60.89.215
   docker service ls
   docker service update --force webs_activoskairos
   ```

Tras el rollback, verificar HTTP 200 en el sitio y que la fila de `[AKS] - Despliegues` refleja el resultado.

## 4. Monitorización

- **Uptime:** `.github/workflows/uptime.yml` comprueba cada ~10 min `activoskairos.com` y `rumbo.activoskairos.com`. Si un sitio no responde 200/3xx tras 5 reintentos:
  - Abre incidencia en `[AKS] - Incidencias` (idempotente: no duplica si ya hay una abierta para ese sitio).
  - Falla el job → GitHub envía email al responsable del repo.
- **Deploy health check:** cada despliegue valida HTTP 200 antes de dar el deploy por bueno.
- **Límite conocido:** el monitor corre en GitHub (externo al VPS), así que detecta también caídas totales del VPS. Un monitor externo dedicado (p. ej. UptimeRobot free) sería un extra opcional; hoy no se usa para no añadir cuentas/servicios no decididos.

## 5. Backups

- **Ficheros/estado del VPS:** `restic` → Cloudflare R2 (ver Activo Kairos «Actualización Web», tarea A2).
- **Base de datos:** Supabase Cloud → backups gestionados por el proveedor. No hay Postgres autohospedado que volcar.

## 6. Recursos rápidos

| Qué | Dónde |
|---|---|
| Panel EasyPanel | https://vps.activoskairos.com |
| SSH VPS | `ssh -i C:/Users/javis/.ssh/kairos_vps root@72.60.89.215` |
| Repo | https://github.com/javier-activoskairos/web-activoskairos |
| Notion — Webs | `[AKS] - Webs` |
| Notion — Despliegues | `[AKS] - Despliegues` |
| Notion — Incidencias | `[AKS] - Incidencias` |
