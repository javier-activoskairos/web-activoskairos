import { setRequestLocale } from "next-intl/server";
import { VitaeLanding } from "@/components/site/vitae/VitaeLanding";

export default async function VitaePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="kairos-site">
      <VitaeLanding />
    </div>
  );
}
