import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContentLayout } from "@/components/site/ContentLayout";
import { OptinForm } from "@/components/site/landing/OptinForm";
import { buildContentMeta } from "@/lib/content-meta";
import "@/styles/landing.css";

// Landing B2B de captación: alta en el boletín (KaiSend) con doble opt-in.
//
// Los textos salen literalmente del Activo Kairos «Consultoría Richi»
// (Notion 295fae893e4a475c9d49f43b8df03906, toggle «Oferta principal — Kairos
// OS»). No se inventan: si cambia la oferta, se cambia allí y luego aquí.
// El nombre «Kairos OS» y el precio siguen siendo provisionales, por eso la
// landing no los usa y va en noindex hasta que la oferta quede validada.
// Flujo completo: docs/flujo-landing-b2b.md.

const PATH = "/sistema-operativo-ia";

// Valor de `origen` que viaja a n8n. El workflow de alta lo normaliza a «Web»;
// la página concreta queda en `pagina`.
const ORIGEN = "Web — Landing sistema operativo IA";

const BENEFICIOS = [
  {
    t: "Reduce las horas por cliente",
    d: "Menos tiempo coordinando, buscando información, actualizando estados y repitiendo tareas.",
  },
  {
    t: "Aumenta la capacidad del equipo",
    d: "Libera horas para atender a más clientes sin contratar en la misma proporción.",
  },
  {
    t: "Disminuye la dependencia del fundador",
    d: "El equipo encuentra la información y sabe qué hacer sin necesitar supervisión constante, con una IA que consulta la fuente de verdad compartida.",
  },
];

const PARA_QUIEN = [
  "Para empresas donde atender a más clientes todavía significa trabajar más horas.",
  "Para equipos que pierden el día coordinando, buscando, actualizando y persiguiendo información.",
  "Para empresas que dependen de hojas de cálculo, mensajes y memoria para que el trabajo avance.",
  "Para fundadores que siguen actuando como el sistema operativo de su empresa.",
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...buildContentMeta({
      title: "Más clientes. Mismo equipo. Menos horas. · Activos Kairos",
      description:
        "Sistema operativo empresarial con IA, instalado en 30 días, para empresas de servicios de más de cinco personas. Apúntate al boletín mensual de Activos Kairos.",
      path: PATH,
    }),
    // Oferta con nombre y precio aún provisionales: fuera del índice hasta
    // validarla. Quitar esta línea (y añadirla al sitemap) al publicarla.
    robots: { index: false, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ContentLayout>
      <header className="hero">
        <p className="eyebrow">Sistema operativo empresarial con IA</p>
        <h1>Más clientes. Mismo equipo. Menos horas.</h1>
        <p className="lead">
          En 30 días instalamos un sistema operativo con IA que reduce las horas
          necesarias para coordinar, gestionar y entregar cada cliente,
          permitiéndote aumentar la capacidad sin ampliar el equipo.
        </p>
        <div className="cta-row">
          <a className="cta-btn" href="#alta">
            Recibir el boletín
          </a>
          {/* /reserva es HTML estático de public/ servido por rewrite: no es
              una ruta de Next, así que <Link> no aplica. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a className="cta-btn secondary" href="/reserva">
            Reservar una llamada
          </a>
        </div>
        <div className="metrics lp-proof">
          <div className="metric">
            <span className="num">+135</span>
            <span className="lbl">sistemas, automatizaciones y flujos entregados</span>
          </div>
          <div className="metric">
            <span className="num">+1.100 h</span>
            <span className="lbl">ahorradas a clientes, documentadas en 2025</span>
          </div>
          <div className="metric">
            <span className="num">30 días</span>
            <span className="lbl">para tener el sistema central instalado y operativo</span>
          </div>
        </div>
      </header>

      <section className="sec">
        <h2>Qué cambia en tu empresa</h2>
        <div className="steps lp-benefits">
          {BENEFICIOS.map((b, i) => (
            <div className="step" key={b.t}>
              <span className="sn">{i + 1}</span>
              <span className="st">{b.t}</span>
              <span className="sd">{b.d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <h2>Para quién es</h2>
        <p>
          Empresas de servicios profesionales o digitales con más de cinco
          empleados, en las que cada nuevo cliente añade demasiadas horas de
          coordinación, gestión y entrega.
        </p>
        <ul className="checks">
          {PARA_QUIEN.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="sec lp-optin" id="alta" aria-labelledby="alta-titulo">
        <p className="eyebrow">Boletín mensual</p>
        <h2 id="alta-titulo">Recibe cómo lo hacemos, una vez al mes</h2>
        <p>
          Una vez al mes: un sistema real que hemos montado, cómo lo
          automatizamos y qué nos ha enseñado. Sin relleno y sin spam.
        </p>
        <OptinForm origen={ORIGEN} />
      </section>
    </ContentLayout>
  );
}
