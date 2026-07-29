import { getTranslations, setRequestLocale } from "next-intl/server";
import { KairosSite } from "@/components/site/KairosSite";
import { JsonLd } from "@/components/site/JsonLd";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Schema FAQPage de la home (tarea SEO 13). Lee el mismo namespace "Faq" que
  // renderiza el acordeón, así el texto del schema y el visible no se desincronizan.
  const t = await getTranslations({ locale, namespace: "Faq" });
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
      "@type": "Question",
      name: t(`q${n}`),
      acceptedAnswer: { "@type": "Answer", text: t(`a${n}`) },
    })),
  };

  return (
    <div className="kairos-site">
      <JsonLd data={faqLd} />
      <KairosSite />
    </div>
  );
}
