import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Política de cookies · Activos Kairos",
  description:
    "Política de cookies de Activos Kairos: qué son, tipos utilizados, cookies previstas a futuro y cómo gestionar o revocar tu consentimiento.",
};

const DOC = `
    <p class="eyebrow">Legal</p>
    <h1>Política de cookies</h1>
    <p class="doc-date">Última actualización: 24 de julio de 2026</p>
    <section class="sec">
      <h2><span class="n">1 &ndash;</span> ¿Qué son las cookies?</h2>
      <p>Una cookie es un pequeño fichero de texto que un sitio web almacena en tu dispositivo con información sobre tu navegación. Sirven, por ejemplo, para facilitar el uso de la web, recordar tus preferencias o analizar cómo se utiliza el sitio.</p>
    </section>
    <section class="sec">
      <h2><span class="n">2 &ndash;</span> Tipos de cookies que utilizamos</h2>
      <p>En función de su titular, las cookies pueden ser <strong>propias</strong> o <strong>de terceros</strong>; y según su finalidad, <strong>técnicas</strong> (necesarias), <strong>analíticas</strong> o <strong>publicitarias / de comportamiento</strong>.</p>
      <p>Actualmente este Sitio Web únicamente utiliza <strong>cookies técnicas necesarias</strong> para su correcto funcionamiento, que no requieren consentimiento:</p>
      <table>
        <thead><tr><th>Cookie</th><th>Titular</th><th>Finalidad</th><th>Duración</th></tr></thead>
        <tbody>
          <tr><td>Cookies de sesión</td><td>Propia</td><td>Mantener la sesión y el funcionamiento básico del sitio</td><td>Sesión</td></tr>
          <tr><td>Preferencia de cookies</td><td>Propia</td><td>Recordar tu elección sobre el uso de cookies</td><td>Hasta 12 meses</td></tr>
        </tbody>
      </table>
    </section>
    <section class="sec">
      <h2><span class="n">3 &ndash;</span> Cookies previstas a futuro</h2>
      <p>Está previsto incorporar más adelante cookies <strong>analíticas y publicitarias</strong> de terceros (por ejemplo, Google Analytics, Píxel de Meta y Google Ads). Cuando se implementen, actualizaremos esta Política, detallaremos cada cookie con su finalidad y duración, y recabaremos tu consentimiento previo a través del banner de cookies. Estas cookies no se instalarán hasta que las aceptes expresamente.</p>
    </section>
    <section class="sec">
      <h2><span class="n">4 &ndash;</span> ¿Cómo gestionar o revocar tu consentimiento?</h2>
      <p>Cuando existan cookies no necesarias, podrás aceptarlas, rechazarlas o configurarlas desde el panel de cookies del Sitio Web. Además, puedes bloquear o eliminar las cookies en cualquier momento desde la configuración de tu navegador:</p>
      <ul>
        <li>Google Chrome: Configuración &rarr; Privacidad y seguridad &rarr; Cookies.</li>
        <li>Mozilla Firefox: Ajustes &rarr; Privacidad y seguridad.</li>
        <li>Safari: Preferencias &rarr; Privacidad.</li>
        <li>Microsoft Edge: Configuración &rarr; Cookies y permisos del sitio.</li>
      </ul>
      <p>Si eliminas las cookies técnicas, es posible que algunas funciones del Sitio Web no estén disponibles.</p>
    </section>
    <section class="sec">
      <h2><span class="n">5 &ndash;</span> Más información</h2>
      <p>Para más información sobre el tratamiento de tus datos, consulta la <a href="/politica-privacidad">Política de Privacidad</a> del Sitio Web. Si tienes dudas sobre esta Política de Cookies, escríbenos a <a href="mailto:privacidad@activoskairos.com">privacidad@activoskairos.com</a>.</p>
    </section>
    <section class="sec">
      <h2><span class="n">6 &ndash;</span> Cambios en esta Política</h2>
      <p>Podemos actualizar esta Política de Cookies cuando cambien las cookies utilizadas o la normativa aplicable. Te recomendamos revisarla periódicamente.</p>
    </section>
    <a class="back" href="/">← Volver al inicio</a>
`;

export default async function PoliticaCookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LegalLayout>
      <div dangerouslySetInnerHTML={{ __html: DOC }} />
    </LegalLayout>
  );
}
