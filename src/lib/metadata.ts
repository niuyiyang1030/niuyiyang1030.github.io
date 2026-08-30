import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/data/site";
import {
  DEFAULT_LOCALE,
  getLocaleUrl,
  type Locale,
  LOCALE_TO_HREFLANG,
  LOCALES,
} from "@/i18n/routing";

type MetadataProps = {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
  availableLocales?: string[];
  noIndex?: boolean;
};

export async function constructMetadata({
  title,
  description,
  path,
  locale,
  availableLocales,
  noIndex = false,
}: MetadataProps): Promise<Metadata> {
  const resolvedLocale = (locale || DEFAULT_LOCALE) as Locale;
  const t = await getTranslations({ locale: resolvedLocale });

  const pageTitle = title || t("name.full");
  const finalTitle =
    path === "/" ? pageTitle : `${pageTitle} | ${t("name.full")}`;
  const finalDescription = description || t("headline");
  const canonicalUrl = getLocaleUrl(resolvedLocale, path || "");

  // Use availableLocales if provided, otherwise use all locales
  const locales = availableLocales || LOCALES;
  const alternateLanguages = locales.reduce(
    (acc, lang) => {
      const url = getLocaleUrl(lang, path || "");
      const hreflangCode = LOCALE_TO_HREFLANG[lang] || lang;
      acc[hreflangCode] = url;
      return acc;
    },
    {} as Record<string, string>,
  );
  alternateLanguages["x-default"] = getLocaleUrl(DEFAULT_LOCALE, path || "");

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [],
    authors: [{ name: t("name.full"), url: siteConfig.url }],
    creator: t("name.full"),
    icons: {
      icon: "/icon.svg",
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      type: "website",
      title: pageTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: t("name.full"),
      locale: resolvedLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: finalDescription,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    // Next.js metadata route `src/app/manifest.ts` is served at `/manifest.webmanifest`
    manifest: "/manifest.webmanifest",
  };
}
