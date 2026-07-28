import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  // Contenido sólo en español: todos los locales canonizan a la ruta sin prefijo.
  alternates: { canonical: "/legal" },
  title: "Aviso legal · Activos Kairos",
  description:
    "Aviso legal de Activos Kairos (Activarte LLC): datos identificativos del titular, condiciones de uso, propiedad intelectual y legislación aplicable.",
};

const DOC = `
    <p class="eyebrow">Legal</p>
    <h1>Aviso legal</h1>
    <p class="doc-date">Última actualización: 24 de julio de 2026</p>
    <section class="sec">
      <h2><span class="n">1 &ndash;</span> Datos identificativos del titular</h2>
      <p>En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que el titular de este sitio web es:</p>
      <ul>
        <li><strong>Titular:</strong> Activarte LLC (que opera bajo la marca comercial &ldquo;Activos Kairos&rdquo;)</li>
        <li><strong>Identificación fiscal (EIN):</strong> 35-2937514</li>
        <li><strong>Domicilio:</strong> 1209 Mountain Road PL NE, STE R, Albuquerque, NM 87110 (Estados Unidos)</li>
        <li><strong>Correo electrónico de contacto:</strong> <a href="mailto:info@activoskairos.com">info@activoskairos.com</a></li>
        <li><strong>Sitio web:</strong> <a href="https://activoskairos.com">https://activoskairos.com</a></li>
      </ul>
      <p>Activarte LLC es una sociedad constituida en el estado de Nuevo México (Estados Unidos) que dirige sus servicios a usuarios de habla hispana, incluidos residentes en España y la Unión Europea. Por ello, con carácter voluntario y en la medida en que resulte aplicable, este sitio web observa la normativa española y europea (LSSI-CE, RGPD y LOPDGDD).</p>
    </section>
    <section class="sec">
      <h2><span class="n">2 &ndash;</span> Objeto</h2>
      <p>El presente Aviso Legal regula el acceso, la navegación y el uso del sitio web activoskairos.com (en adelante, el &ldquo;Sitio Web&rdquo;), cuya finalidad es ofrecer información sobre los servicios de Activos Kairos y permitir a las personas interesadas ponerse en contacto o solicitar información. El acceso al Sitio Web atribuye a quien lo realiza la condición de usuario e implica la aceptación plena de todas las cláusulas de este Aviso Legal.</p>
    </section>
    <section class="sec">
      <h2><span class="n">3 &ndash;</span> Condiciones de acceso y uso</h2>
      <p>El usuario se compromete a hacer un uso adecuado y lícito del Sitio Web y de sus contenidos, conforme a la legislación aplicable, a la buena fe y al orden público. Queda prohibido cualquier uso con fines ilícitos o lesivos, así como cualquier acción que pueda dañar, inutilizar o sobrecargar el Sitio Web o impedir su normal utilización.</p>
    </section>
    <section class="sec">
      <h2><span class="n">4 &ndash;</span> Propiedad intelectual e industrial</h2>
      <p>Todos los contenidos del Sitio Web (textos, imágenes, marcas, logotipos, diseño, código fuente y demás elementos) son titularidad de Activarte LLC o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa del titular.</p>
    </section>
    <section class="sec">
      <h2><span class="n">5 &ndash;</span> Responsabilidad</h2>
      <p>Activarte LLC no garantiza la disponibilidad y continuidad ininterrumpida del Sitio Web ni la ausencia de errores en sus contenidos, aunque adopta las medidas razonables para evitarlos. El titular no se responsabiliza de los daños derivados del uso indebido del Sitio Web ni de la información publicada por terceros.</p>
    </section>
    <section class="sec">
      <h2><span class="n">6 &ndash;</span> Enlaces (links)</h2>
      <p>El Sitio Web puede contener enlaces a páginas de terceros. Activarte LLC no asume responsabilidad alguna sobre los contenidos, políticas o servicios de dichos sitios, cuya gestión corresponde exclusivamente a sus titulares.</p>
    </section>
    <section class="sec">
      <h2><span class="n">7 &ndash;</span> Protección de datos</h2>
      <p>El tratamiento de los datos personales que el usuario facilite a través del Sitio Web se rige por la <a href="/privacidad">Política de Privacidad</a> y la <a href="/cookies">Política de Cookies</a> del Sitio Web, que forman parte integrante de este Aviso Legal.</p>
    </section>
    <section class="sec">
      <h2><span class="n">8 &ndash;</span> Legislación aplicable y jurisdicción</h2>
      <p>Este Aviso Legal se rige por la legislación del estado de Nuevo México (Estados Unidos). No obstante, cuando el usuario actúe como consumidor y resida en España o en la Unión Europea, esta elección de ley no le privará de la protección que le garanticen las disposiciones imperativas de la normativa de su país de residencia, pudiendo someter cualquier controversia a los tribunales de su propio domicilio.</p>
    </section>
    <section class="sec">
      <h2><span class="n">9 &ndash;</span> Modificaciones</h2>
      <p>Activarte LLC se reserva el derecho a modificar el presente Aviso Legal en cualquier momento para adaptarlo a novedades legislativas o cambios en su actividad. Las modificaciones serán efectivas desde su publicación en el Sitio Web.</p>
    </section>
    <a class="back" href="/">← Volver al inicio</a>
`;

export default async function AvisoLegalPage({
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
