import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/data/site";
import { routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    title: t("termsOfService.title"),
    description: t("termsOfService.body"),
    path: "/terms-of-service",
    locale,
  });
}

export default async function TermsAndDisclaimer({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale = routing.defaultLocale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main className="mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-16 md:px-20 md:pt-28">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>{t("termsOfService.title")}</h1>
        <p className="text-muted-foreground">
          {t("termsOfService.lastUpdated")}: {siteConfig.lastUpdated}
        </p>
        <p>{t("termsOfService.body")}</p>
      </article>
    </main>
  );
}
