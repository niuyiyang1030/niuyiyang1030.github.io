"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { DATA } from "@/data";

export default function Footer() {
  const pathname = usePathname();
  const isChinese = pathname.startsWith("/zh");
  const currentYear = new Date().getFullYear();
  const homeHref = isChinese ? "/zh/" : "/";
  const blogHref = isChinese ? "/zh/blog/" : "/blog/";
  const privacyHref = isChinese ? "/zh/privacy-policy/" : "/privacy-policy/";
  const termsHref = isChinese
    ? "/zh/terms-of-service/"
    : "/terms-of-service/";

  const labels = isChinese
    ? {
        navigation: "导航",
        connect: "链接",
        about: "关于",
        blog: "博客",
        privacy: "隐私政策",
        terms: "条款与免责声明",
        updated: "最后更新",
        template: "基于 MIT 模板",
      }
    : {
        navigation: "Navigation",
        connect: "Connect",
        about: "About",
        blog: "Blog",
        privacy: "Privacy Policy",
        terms: "Terms & Disclaimer",
        updated: "Last updated",
        template: "Based on the MIT template",
      };

  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-10 pb-20 sm:px-16 md:px-20 lg:px-24 xl:px-32">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-foreground text-sm font-semibold tracking-wider">
              {labels.navigation}
            </h3>
            <nav className="space-y-2 text-sm">
              <Link
                href={homeHref + "#about"}
                className="text-muted-foreground hover:text-foreground block transition-colors"
              >
                {labels.about}
              </Link>
              <Link
                href={blogHref}
                className="text-muted-foreground hover:text-foreground block transition-colors"
              >
                {labels.blog}
              </Link>
            </nav>
          </div>

          <div className="space-y-4 sm:text-right">
            <h3 className="text-foreground text-sm font-semibold tracking-wider">
              {labels.connect}
            </h3>
            <a
              href="https://github.com/niuyiyang1030"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <Icons.github className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-muted-foreground space-y-3 text-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>© {currentYear} {DATA.name}</span>
            <span className="flex gap-2">
              <Link href={privacyHref} className="hover:text-foreground">
                {labels.privacy}
              </Link>
              <span>•</span>
              <Link href={termsHref} className="hover:text-foreground">
                {labels.terms}
              </Link>
            </span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              {labels.updated}: {DATA.lastUpdated}
            </span>
            <span className="inline-flex flex-wrap items-center gap-1">
              {labels.template}{" "}
              <a
                href="https://github.com/zhengzangw/nextjs-portfolio-blog-research"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline hover:no-underline"
              >
                zhengzangw/nextjs-portfolio-blog-research
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
