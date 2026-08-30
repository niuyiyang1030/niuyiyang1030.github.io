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
    title: t("privacyPolicy.title"),
    description: t("privacyPolicy.body"),
    path: "/privacy-policy",
    locale,
  });
}

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale = routing.defaultLocale } = await params;
  const t = await getTranslations({ locale });

  return (
    <main className="mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-16 md:px-20 md:pt-28">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>{t("privacyPolicy.title")}</h1>
        <p className="text-muted-foreground">
          {t("privacyPolicy.lastUpdated")}: {siteConfig.lastUpdated}
        </p>
        <p>{t("privacyPolicy.body")}</p>
      </article>
    </main>
  );
}
