import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import "../globals.css";

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

  // Cada idioma declara su canonical y sus alternativas. Antes no se emitía
  // ningún canonical, así que www/apex y los 4 locales competían entre sí.
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, pathFor(loc)]),
  );

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pathFor(locale),
      languages: { ...languages, "x-default": pathFor(routing.defaultLocale) },
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
      <meta name="theme-color" content="#0D0D0D" />
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
