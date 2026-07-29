// Chrome compartido de las páginas de contenido (activos, casos, pilares).
// Server component, sin JS de cliente: pesa poco y ayuda a Core Web Vitals.
// Reutiliza los tokens y el estilo dark de legal.css y añade content.css.
import "@/styles/legal.css";
import "@/styles/content.css";

export function ContentLayout({ children }) {
  return (
    <div className="legal-page content-page">
      <main className="shell">
        <div className="topbar">
          <a className="brand" href="/">
            <img className="mark" src="/assets/logo-mark.png" alt="" width="30" height="30" decoding="async" /> Activos Kairos
          </a>
          <a className="cta-btn" href="/reserva">Reserva tu llamada</a>
        </div>
        <div className="doc">{children}</div>
        <div className="site-footer">
          <div className="sf-top">
            <img className="sf-logo" src="/assets/logo-wordmark-light.png" alt="Activos Kairos" width="120" height="24" loading="lazy" decoding="async" />
          </div>
          <nav className="sf-nav" aria-label="Servicios y casos">
            <a href="/consultoria-notion">Consultoría Notion</a>
            <a href="/implantacion-notion">Implantación Notion</a>
            <a href="/automatizacion-ia">Automatización con IA</a>
            <a href="/activos/initia">El ecosistema</a>
            <a href="/casos/mintech-management">Casos de éxito</a>
          </nav>
          <div className="sf-bottom">
            <span className="sf-copy">© 2026 Activos Kairos · Todos los derechos reservados</span>
            <nav className="sf-legal">
              <a href="/legal">Aviso legal</a>
              <a href="/privacidad">Política de privacidad</a>
              <a href="/cookies">Política de cookies</a>
              <a href="/tyc">Términos y condiciones</a>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
