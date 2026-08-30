import { getMessages, setRequestLocale } from "next-intl/server";

import { SiteShell } from "@/components/blocks/site-shell";
import JsonLdScripts from "@/components/jsonld-scripts";

export default async function DefaultLocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setRequestLocale("en");
  const messages = await getMessages({ locale: "en" });

  return (
    <SiteShell locale="en" messages={messages}>
      <JsonLdScripts locale="en" />
      <div lang="en">{children}</div>
    </SiteShell>
  );
}
