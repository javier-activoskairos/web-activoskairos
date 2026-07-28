import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  // Contenido sólo en español: todos los locales canonizan a la ruta sin prefijo.
  alternates: { canonical: "/tyc" },
  title: "Términos y condiciones · Activos Kairos",
  description:
    "Términos y Condiciones de Uso del sitio web de Activos Kairos (Activarte LLC): objeto, aceptación, uso, propiedad intelectual, responsabilidad y legislación aplicable.",
};

const DOC = `
    <p class="eyebrow">Legal</p>
    <h1>Términos y Condiciones de Uso</h1>
    <p class="doc-date">Última actualización: 24 de julio de 2026</p>
    <section class="sec">
      <h2><span class="n">1 &ndash;</span> Objeto</h2>
      <p>Las presentes Condiciones Generales de Uso (en adelante, las &ldquo;Condiciones&rdquo;) regulan el acceso y la utilización del sitio web activoskairos.com (el &ldquo;Sitio Web&rdquo;), titularidad de Activarte LLC (que opera bajo la marca comercial &ldquo;Activos Kairos&rdquo;), con domicilio en 1209 Mountain Road PL NE, STE R, Albuquerque, NM 87110 (EE.UU.) e identificación fiscal (EIN) 35-2937514. El Sitio Web tiene una finalidad informativa y de captación de solicitudes de contacto; no comercializa productos ni servicios directamente a través del Sitio Web.</p>
    </section>
    <section class="sec">
      <h2><span class="n">2 &ndash;</span> Aceptación</h2>
      <p>El acceso y la navegación por el Sitio Web atribuyen la condición de usuario e implican la aceptación plena de estas Condiciones, del <a href="/legal">Aviso Legal</a> y de la <a href="/privacidad">Política de Privacidad</a> del Sitio Web. Si no estás de acuerdo con ellas, te rogamos que no utilices el Sitio Web.</p>
    </section>
    <section class="sec">
      <h2><span class="n">3 &ndash;</span> Condiciones de acceso y uso</h2>
      <p>El usuario se compromete a utilizar el Sitio Web de conformidad con la ley, la buena fe y estas Condiciones, y a no emplearlo para fines ilícitos o que puedan dañar, inutilizar o deteriorar el Sitio Web o impedir su normal uso por otros usuarios.</p>
    </section>
    <section class="sec">
      <h2><span class="n">4 &ndash;</span> Formularios y captación de datos</h2>
      <p>Los formularios del Sitio Web permiten a las personas interesadas solicitar información o suscribirse a nuestras comunicaciones. El usuario garantiza la veracidad de los datos facilitados y es responsable de su exactitud. El tratamiento de dichos datos se rige por la <a href="/privacidad">Política de Privacidad</a> del Sitio Web.</p>
    </section>
    <section class="sec">
      <h2><span class="n">5 &ndash;</span> Propiedad intelectual e industrial</h2>
      <p>Todos los contenidos del Sitio Web (textos, imágenes, marcas, logotipos, diseño y código) pertenecen a Activarte LLC o a terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su reproducción o uso sin autorización expresa.</p>
    </section>
    <section class="sec">
      <h2><span class="n">6 &ndash;</span> Responsabilidad</h2>
      <p>Activarte LLC procura mantener el Sitio Web operativo y actualizado, pero no garantiza su disponibilidad ininterrumpida ni la ausencia de errores. No se responsabiliza de los daños derivados del uso indebido del Sitio Web ni de los contenidos de terceros.</p>
    </section>
    <section class="sec">
      <h2><span class="n">7 &ndash;</span> Enlaces a terceros</h2>
      <p>El Sitio Web puede incluir enlaces a sitios de terceros sobre cuyos contenidos y políticas Activarte LLC no ejerce control ni asume responsabilidad.</p>
    </section>
    <section class="sec">
      <h2><span class="n">8 &ndash;</span> Comunicaciones comerciales</h2>
      <p>Conforme a la LSSI-CE, solo enviaremos comunicaciones comerciales por medios electrónicos a quienes lo hayan consentido expresamente. Podrás revocar dicho consentimiento en cualquier momento a través del enlace de baja incluido en cada comunicación o escribiendo a <a href="mailto:info@activoskairos.com">info@activoskairos.com</a>.</p>
    </section>
    <section class="sec">
      <h2><span class="n">9 &ndash;</span> Modificaciones</h2>
      <p>Activarte LLC podrá modificar estas Condiciones en cualquier momento. Las modificaciones serán efectivas desde su publicación en el Sitio Web.</p>
    </section>
    <section class="sec">
      <h2><span class="n">10 &ndash;</span> Legislación aplicable y jurisdicción</h2>
      <p>Estas Condiciones se rigen por la legislación del estado de Nuevo México (Estados Unidos). No obstante, cuando el usuario actúe como consumidor y resida en España o en la Unión Europea, esta elección de ley no le privará de la protección que le garanticen las disposiciones imperativas de la normativa de su país de residencia, pudiendo someter cualquier controversia a los tribunales de su propio domicilio.</p>
      <p class="callout"><strong>Nota:</strong> Estas Condiciones están pensadas para una web informativa/de captación. Si en el futuro se venden productos o servicios online, deberán ampliarse con las condiciones de contratación, precios, forma de pago y el derecho de desistimiento de 14 días naturales (y, desde el 19 de junio de 2026, el botón de desistimiento) exigidos por el TRLGDCU.</p>
    </section>
    <a class="back" href="/">← Volver al inicio</a>
`;

export default async function TerminosCondicionesPage({
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
