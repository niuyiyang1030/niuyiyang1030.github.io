import LocalizedPrivacyPolicy, {
  generateMetadata as generateLocalizedMetadata,
} from "../../[locale]/privacy-policy/page";

export function generateMetadata() {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: "en" }),
  });
}

export default function PrivacyPolicyPage() {
  return <LocalizedPrivacyPolicy params={Promise.resolve({ locale: "en" })} />;
}
