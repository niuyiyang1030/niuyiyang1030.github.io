import LocalizedTerms, {
  generateMetadata as generateLocalizedMetadata,
} from "../../[locale]/terms-of-service/page";

export function generateMetadata() {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "en" }),
  });
}

export default function TermsPage() {
  return <LocalizedTerms params={Promise.resolve({ locale: "en" })} />;
}
