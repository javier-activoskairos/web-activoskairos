// URL canónica del sitio en producción.
//
// Deliberadamente NO se lee de `NEXT_PUBLIC_SITE_URL` en producción: esa
// variable vivía en el panel del VPS y se quedó apuntando al dominio temporal
// de pruebas (`activoskairos.72-60-89-215.sslip.io`), lo que se coló en el
// sitemap, en robots.txt y en los canonical/Open Graph. El dominio de este
// repo es fijo, así que va en el código y no puede desincronizarse.
export const SITE_URL = "https://activoskairos.com";

// En desarrollo/preview sí conviene poder apuntar a otro host.
export const siteUrl =
  process.env.NODE_ENV === "production"
    ? SITE_URL
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");

// Correo de contacto público (el que aparece en avisos legales y footer).
export const CONTACT_EMAIL = "info@activoskairos.com";
export const PRIVACY_EMAIL = "privacidad@activoskairos.com";
export const LINKEDIN_URL =
  "https://www.linkedin.com/company/activos-kairos/";
