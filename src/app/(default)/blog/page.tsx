import LocalizedBlogPage, {
  generateMetadata as generateLocalizedMetadata,
} from "../../[locale]/blog/(list)/page";

export function generateMetadata() {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "en" }),
  });
}

export default function BlogPage() {
  return <LocalizedBlogPage params={Promise.resolve({ locale: "en" })} />;
}
