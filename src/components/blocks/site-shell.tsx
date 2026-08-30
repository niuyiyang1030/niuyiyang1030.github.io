"use client";

import {
  type AbstractIntlMessages,
  NextIntlClientProvider,
} from "next-intl";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

import Footer from "@/components/blocks/footer";
import Navbar from "@/components/blocks/navbar/navbar";
import { ScrollRestore } from "@/components/blocks/scroll-restore";
import { TooltipProvider } from "@/components/ui/tooltip";

export function SiteShell({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider delayDuration={0}>
          <ScrollRestore />
          <Navbar />
          {children}
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
