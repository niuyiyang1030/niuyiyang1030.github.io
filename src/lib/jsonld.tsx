import { getTranslations } from "next-intl/server";
import type {
  BlogPosting,
  BreadcrumbList,
  Person,
  WebSite,
  WithContext,
} from "schema-dts";

import { siteConfig } from "@/data/site";
import { DEFAULT_LOCALE, getLocaleUrl, type Locale } from "@/i18n/routing";

type SocialRecord = Record<
  string,
  {
    name: string;
    url: string;
  }
>;

async function getSocialMediaUrls(locale: Locale): Promise<string[]> {
  const t = await getTranslations({ locale });
  const socialData = t.raw("social") as SocialRecord;

  return Object.values(socialData)
    .filter((social) => Boolean(social.url))
    .map((social) => social.url);
}

export async function generateBreadcrumbListJsonLd(
  locale: Locale = DEFAULT_LOCALE,
): Promise<string> {
  const t = await getTranslations({ locale });
  const navbarItems = t.raw("navbar.items") as Array<{
    href: string;
    label: string;
  }>;

  const breadcrumbList: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: navbarItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: getLocaleUrl(locale, item.href),
    })),
  };

  return JSON.stringify(breadcrumbList);
}

export async function generateWebsiteJsonLd(
  locale: Locale = DEFAULT_LOCALE,
): Promise<string> {
  const t = await getTranslations({ locale });
  const baseUrl = getLocaleUrl(locale);
  const author: Person = {
    "@type": "Person",
    name: t("name.full"),
    url: baseUrl,
  };
  const websiteJsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("name.full"),
    description: t("headline").replace(/\n/g, ", "),
    url: baseUrl,
    author,
  };

  return JSON.stringify(websiteJsonLd);
}

export async function generatePersonJsonLd(
  locale: Locale = DEFAULT_LOCALE,
): Promise<string> {
  const t = await getTranslations({ locale });
  const personJsonLd: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t("name.full"),
    givenName: t("name.given"),
    familyName: t("name.family"),
    description: t("headline").replace(/\n/g, ", "),
    url: getLocaleUrl(locale),
    sameAs: await getSocialMediaUrls(locale),
  };

  return JSON.stringify(personJsonLd);
}

export function generateBlogJsonLd(
  posts: {
    metadata: { title: string; date: string; summary: string };
    slug: string;
    locale?: Locale;
  }[],
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getLocaleUrl(
        post.locale || DEFAULT_LOCALE,
        `/blog/${post.slug}`,
      ),
    })),
  });
}

export async function generateBlogPostingJsonLd(post: {
  metadata: {
    title: string;
    date: string;
    summary: string;
    image?: string;
  };
  slug: string;
  locale?: Locale;
}): Promise<string> {
  const locale = post.locale || DEFAULT_LOCALE;
  const t = await getTranslations({ locale });
  const author: Person = {
    "@type": "Person",
    name: t("name.full"),
    url: getLocaleUrl(locale),
    sameAs: await getSocialMediaUrls(locale),
  };
  const postUrl = getLocaleUrl(locale, `/blog/${post.slug}`);
  const blogPosting: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    description: post.metadata.summary,
    url: postUrl,
    author,
    publisher: author,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  if (post.metadata.image) {
    blogPosting.image = new URL(post.metadata.image, siteConfig.url).toString();
  }

  return JSON.stringify(blogPosting);
}
