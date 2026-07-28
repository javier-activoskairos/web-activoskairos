import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Convención `proxy` de Next.js 16 (sustituye a `middleware`).
export default createMiddleware(routing);

export const config = {
  // Aplica el routing de idioma a todo salvo API, internos y archivos estáticos.
  // Se excluyen las landings estáticas del funnel (test-caos-operativo, reserva)
  // para que no las capture el routing i18n; se sirven vía rewrites en next.config.
  // `opengraph-image` también: es una ruta de metadatos sin extensión, así que
  // el patrón `.*\..*` no la cubre y acababa reescrita a /es/opengraph-image (404).
  matcher: [
    "/((?!api|trpc|_next|_vercel|opengraph-image|test-caos-operativo|reserva|.*\\..*).*)",
  ],
};
