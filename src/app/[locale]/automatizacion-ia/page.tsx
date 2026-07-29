import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PillarView } from "@/components/site/PillarView";
import { PILARES_BY_SLUG } from "@/content/pilares";
import { buildContentMeta } from "@/lib/content-meta";

const PILLAR = PILARES_BY_SLUG["/automatizacion-ia"];

export async function generateMetadata(): Promise<Metadata> {
  return buildContentMeta({
    title: PILLAR.metaTitle,
    description: PILLAR.metaDescription,
    path: PILLAR.slug,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PillarView pillar={PILLAR} locale={locale} />;
}
