// Chrome compartido de las páginas legales (topbar + footer).
// Portado desde Claude Design (ui_kits/lead-magnet-test/*.html); enlaces internos
// convertidos de *.html a rutas Next. El cuerpo del documento llega como children.
import "@/styles/legal.css";

export function LegalLayout({ children }) {
  return (
    <div className="legal-page">
      <main className="shell">
        <div className="topbar">
          <a className="brand" href="/">
            <img className="mark" src="/assets/logo-mark.png" alt="" /> Activos Kairos
          </a>
          <a className="back-top" href="/">← Volver al inicio</a>
        </div>
        <div className="doc">{children}</div>
        <div className="site-footer">
          <div className="sf-top">
            <img className="sf-logo" src="/assets/logo-wordmark-light.png" alt="Activos Kairos" height="24" />
          </div>
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
