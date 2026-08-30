import { generateMetadata as generateLocalizedMetadata } from "../[locale]/layout";
import LocalizedHomePage from "../[locale]/page";

export function generateMetadata() {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "en" }),
  });
}

export default function HomePage() {
  return <LocalizedHomePage params={Promise.resolve({ locale: "en" })} />;
}
