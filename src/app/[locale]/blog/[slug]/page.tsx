import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getBlogPosts, getPost } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const enPosts = await getBlogPosts("en");
  const zhPosts = await getBlogPosts("zh");

  const params: Array<{ locale: string; slug: string }> = [];

  // Ensure we have arrays before iterating
  const enArray = Array.isArray(enPosts) ? enPosts : [];
  const zhArray = Array.isArray(zhPosts) ? zhPosts : [];

  enArray.forEach((post) => {
    if (post?.slug) {
      params.push({ locale: "en", slug: post.slug });
    }
  });

  zhArray.forEach((post) => {
    if (post?.slug) {
      params.push({ locale: "zh", slug: post.slug });
    }
  });

  // Next.js static export requires at least one generated value for a dynamic
  // route. The sentinel is rendered as not-found by the layout and is never
  // linked or included in the sitemap. Real MDX posts replace it automatically.
  return params.length > 0
    ? params
    : [
        { locale: "en", slug: "__empty__" },
        { locale: "zh", slug: "__empty__" },
      ];
}

export const dynamicParams = false;
export const dynamic = "force-static";

export default async function Blog(props: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const params = await props.params;
  const locale = params.locale || routing.defaultLocale;
  const post = await getPost(params.slug, locale);
  const t = await getTranslations({ locale });

  if (!post) {
    return null; // Layout will handle notFound()
  }

  const readingTime =
    typeof post.metadata.readingTime === "number" &&
    post.metadata.readingTime > 0
      ? post.metadata.readingTime
      : 1;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 md:px-10">
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter md:text-4xl">
        {post.metadata.title}
      </h1>
      <div className="mb-8 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <p>{formatDate(post.metadata.date, locale)}</p>
          <span className="mx-1">·</span>
          <p>{t("blog.readingTime", { minutes: readingTime })}</p>
        </div>
      </div>
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.source }}
      ></article>
    </div>
  );
}
