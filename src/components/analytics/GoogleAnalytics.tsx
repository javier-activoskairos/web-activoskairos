import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js) con Google Consent Mode v2.
 *
 * Cumplimiento: el consentimiento arranca DENEGADO por defecto. Mientras el
 * usuario no acepte, GA funciona en modo "cookieless" (pings agregados sin
 * cookies ni identificadores), que es lo permitido sin banner. Cuando exista
 * un banner de cookies, basta con llamar a `window.akGrantCookieConsent()`
 * al aceptar (o `window.akRevokeCookieConsent()` al rechazar/retirar).
 *
 * El ID de medición se lee de la variable de entorno NEXT_PUBLIC_GA_ID; si no
 * está definida, el componente no renderiza nada (p. ej. en local).
 */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;

  return (
    <>
      {/* 1) Consent Mode v2 — por defecto DENEGADO, antes de cargar gtag.js. */}
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          // Reaplica una elección previa guardada (por si en el futuro hay banner).
          try {
            if (localStorage.getItem('ak-cookie-consent') === 'granted') {
              gtag('consent', 'update', {
                ad_storage: 'granted', ad_user_data: 'granted',
                ad_personalization: 'granted', analytics_storage: 'granted'
              });
            }
          } catch (e) {}
          // Hooks para el futuro banner de cookies.
          window.akGrantCookieConsent = function () {
            gtag('consent', 'update', {
              ad_storage: 'granted', ad_user_data: 'granted',
              ad_personalization: 'granted', analytics_storage: 'granted'
            });
            try { localStorage.setItem('ak-cookie-consent', 'granted'); } catch (e) {}
          };
          window.akRevokeCookieConsent = function () {
            gtag('consent', 'update', {
              ad_storage: 'denied', ad_user_data: 'denied',
              ad_personalization: 'denied', analytics_storage: 'denied'
            });
            try { localStorage.setItem('ak-cookie-consent', 'denied'); } catch (e) {}
          };
        `}
      </Script>

      {/* 2) Librería gtag.js (asíncrona). */}
      <Script
        id="ga-gtag-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />

      {/* 3) Configuración de la propiedad GA4. */}
      <Script id="ga-config" strategy="afterInteractive">
        {`gtag('config', '${gaId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
