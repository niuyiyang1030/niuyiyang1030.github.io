import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, Locale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { SiteShell } from "@/components/blocks/site-shell";
import JsonLdScripts from "@/components/jsonld-scripts";
import { routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return constructMetadata({
    description: t("headline"),
    locale: locale as Locale,
    path: "/",
  });
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
  const messages = await getMessages();

  return (
    <SiteShell locale={locale} messages={messages}>
      <JsonLdScripts locale={locale} />
      <div lang={locale}>{children}</div>
    </SiteShell>
  );
}
