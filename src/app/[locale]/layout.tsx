import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { siteUrl, CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";
import "../globals.css";

// ID de medición de GA4. Override por NEXT_PUBLIC_GA_ID; fallback al ID de
// producción (un measurement ID no es secreto: viaja en el HTML del cliente).
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-5FJ720D0R7";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const pathFor = (locale: string) =>
  locale === routing.defaultLocale ? "/" : `/${locale}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  // Canonical explícito. Antes no se emitía ninguno, así que www/apex y los
  // locales competían entre sí. Con un solo idioma no se declara `languages`:
  // un hreflang de una sola entrada no aporta nada a Google.
  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pathFor(locale),
    },
    openGraph: {
      type: "website",
      siteName: "Activos Kairos",
      url: pathFor(locale),
      title: t("title"),
      description: t("description"),
      locale,
      // La imagen la genera `app/opengraph-image.tsx`, pero hay que referenciarla
      // a mano: al declarar `openGraph` en generateMetadata, Next no inyecta la
      // del fichero de convención.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [{ url: "/opengraph-image", alt: t("ogAlt") }],
    },
    // Los iconos los inyecta Next desde los ficheros de convención
    // (`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`).
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const tMeta = await getTranslations({ locale, namespace: "Metadata" });
  // JSON-LD: identidad canónica de la organización + el sitio. El nombre
  // oficial es "Activos Kairos", con "Kairos" como alternateName, para
  // consolidar la entidad ante Google (antes no había ningún dato estructurado
  // y "Kairos" competía con "Activos Kairos").
  const orgId = `${siteUrl}/#organization`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Activos Kairos",
        alternateName: "Kairos",
        url: siteUrl,
        logo: `${siteUrl}/assets/logo-mark.png`,
        email: CONTACT_EMAIL,
        description: tMeta("description"),
        sameAs: [LINKEDIN_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Activos Kairos",
        inLanguage: locale,
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Satoshi (fuente de marca). Vía <link> porque el bundler CSS de Next
          descarta el @import de Fontshare por el '@' de la URL. React 19 lo eleva al <head>. */}
      <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        precedence="high"
      />
      {/* JetBrains Mono llega por @import desde `globals.css`; el preconnect
          adelanta el handshake con los dos orígenes que intervienen. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <meta name="theme-color" content="#0D0D0D" />
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics gaId={gaId} />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
