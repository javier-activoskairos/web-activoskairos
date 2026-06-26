import { setRequestLocale } from "next-intl/server";
import { KairosSite } from "@/components/site/KairosSite";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="kairos-site">
      <KairosSite />
    </div>
  );
}
