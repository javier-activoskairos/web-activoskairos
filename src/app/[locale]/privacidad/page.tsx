import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  // Contenido sólo en español: todos los locales canonizan a la ruta sin prefijo.
  alternates: { canonical: "/privacidad" },
  title: "Política de privacidad · Activos Kairos",
  description:
    "Política de privacidad de Activos Kairos: qué datos recopilamos, finalidad, base de legitimación, destinatarios, transferencias internacionales y tus derechos (RGPD y LOPDGDD).",
};

const DOC = `
    <p class="eyebrow">Legal</p>
    <h1>Política de privacidad</h1>
    <p class="doc-date">Última actualización: 25 de julio de 2026</p>
    <p class="sec-intro" style="color:var(--pearl);font-size:15px;line-height:1.7;max-width:64ch;margin:0 0 4px">En Activos Kairos nos comprometemos a proteger la privacidad y la seguridad de los datos personales de los usuarios de nuestro sitio web activoskairos.com. Esta Política explica qué datos recopilamos, con qué finalidad y qué derechos te asisten, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).</p>
    <section class="sec">
      <h2><span class="n">1 &ndash;</span> Responsable del tratamiento</h2>
      <ul>
        <li><strong>Responsable:</strong> Activarte LLC (marca comercial &ldquo;Activos Kairos&rdquo;)</li>
        <li><strong>Identificación fiscal (EIN):</strong> 35-2937514</li>
        <li><strong>Domicilio:</strong> 1209 Mountain Road PL NE, STE R, Albuquerque, NM 87110 (Estados Unidos)</li>
        <li><strong>Correo electrónico:</strong> <a href="mailto:privacidad@activoskairos.com">privacidad@activoskairos.com</a></li>
      </ul>
    </section>
    <section class="sec">
      <h2><span class="n">2 &ndash;</span> ¿Qué datos recopilamos?</h2>
      <p>Dependiendo de tu interacción con el Sitio Web, podemos tratar:</p>
      <ul>
        <li><strong>Formulario de contacto:</strong> nombre, correo electrónico y cualquier dato que incluyas en el mensaje.</li>
        <li><strong>Newsletter / comunicaciones comerciales:</strong> nombre y correo electrónico.</li>
        <li><strong>Registro de usuarios:</strong> nombre, correo electrónico, credenciales de acceso y datos asociados a tu cuenta.</li>
        <li><strong>Datos de navegación:</strong> dirección IP y datos recogidos mediante cookies (ver la <a href="/cookies">Política de Cookies</a> del Sitio Web).</li>
      </ul>
    </section>
    <section class="sec">
      <h2><span class="n">3 &ndash;</span> Finalidad del tratamiento</h2>
      <ul>
        <li>Atender tus consultas y solicitudes de información enviadas a través del formulario de contacto.</li>
        <li>Enviarte comunicaciones comerciales y newsletters sobre nuestros servicios, cuando lo hayas consentido.</li>
        <li>Gestionar tu registro y el acceso a tu cuenta de usuario.</li>
        <li>Analizar el uso del Sitio Web y mejorar nuestros servicios.</li>
      </ul>
    </section>
    <section class="sec">
      <h2><span class="n">4 &ndash;</span> Base de legitimación</h2>
      <ul>
        <li><strong>Consentimiento</strong> del interesado (formulario de contacto, newsletter y cookies no necesarias).</li>
        <li><strong>Ejecución de una relación</strong> o de medidas precontractuales (gestión del registro y de la cuenta).</li>
        <li><strong>Interés legítimo</strong> en garantizar la seguridad del Sitio Web y mejorar nuestros servicios.</li>
      </ul>
    </section>
    <section class="sec">
      <h2><span class="n">5 &ndash;</span> Plazo de conservación</h2>
      <p>Conservamos los datos mientras exista una relación con el usuario, no se solicite su supresión y, en su caso, durante los plazos legalmente exigibles. Los datos para el envío de comunicaciones comerciales se conservan hasta que retires tu consentimiento.</p>
    </section>
    <section class="sec">
      <h2><span class="n">6 &ndash;</span> Destinatarios y encargados del tratamiento</h2>
      <p>No cedemos tus datos a terceros salvo obligación legal. Para prestar nuestros servicios nos apoyamos en proveedores que actúan como encargados del tratamiento:</p>
      <ul>
        <li><strong>Alojamiento web:</strong> Hostinger International Ltd. (Chipre, Unión Europea).</li>
        <li><strong>Envío de comunicaciones y automatización:</strong> Google (Gmail) para el envío de correos y Make (Celonis SE) para la automatización de dichos envíos.</li>
        <li><strong>Gestión de contactos (CRM):</strong> Notion Labs, Inc.</li>
      </ul>
      <p>Estos proveedores tratan los datos únicamente conforme a nuestras instrucciones y en virtud de los correspondientes contratos de encargo de tratamiento.</p>
    </section>
    <section class="sec">
      <h2><span class="n">7 &ndash;</span> Transferencias internacionales</h2>
      <p>El alojamiento web se presta desde la Unión Europea. No obstante, algunos de nuestros proveedores (como Google o Notion) están ubicados en Estados Unidos, por lo que el tratamiento de tus datos puede implicar una transferencia internacional fuera del Espacio Económico Europeo. En estos casos, dichas transferencias se amparan en las garantías previstas en el RGPD, principalmente las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea y, cuando el proveedor esté adherido, el marco EU-US Data Privacy Framework.</p>
    </section>
    <section class="sec">
      <h2><span class="n">8 &ndash;</span> Tus derechos</h2>
      <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos, así como retirar el consentimiento en cualquier momento, escribiendo a <a href="mailto:privacidad@activoskairos.com">privacidad@activoskairos.com</a>. Si resides en la UE, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>) o ante la autoridad de control competente.</p>
    </section>
    <section class="sec">
      <h2><span class="n">9 &ndash;</span> Medidas de seguridad</h2>
      <p>Aplicamos las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos y evitar su alteración, pérdida, tratamiento o acceso no autorizado, atendiendo al estado de la técnica y a los riesgos del tratamiento.</p>
    </section>
    <section class="sec">
      <h2><span class="n">10 &ndash;</span> Menores de edad</h2>
      <p>El Sitio Web no está dirigido a menores de 14 años. Los menores no deben facilitar datos personales sin el consentimiento de sus padres o tutores.</p>
    </section>
    <section class="sec">
      <h2><span class="n">11 &ndash;</span> Cambios en esta Política</h2>
      <p>Podemos actualizar esta Política de Privacidad para adaptarla a novedades legislativas o cambios en nuestra actividad. Te informaremos de los cambios significativos a través del Sitio Web.</p>
    </section>
    <a class="back" href="/">← Volver al inicio</a>
`;

export default async function PoliticaPrivacidadPage({
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
