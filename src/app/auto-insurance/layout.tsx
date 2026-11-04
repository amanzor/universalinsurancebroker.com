import JsonLd from "@/components/JsonLd";
import { pageMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Get a real Florida auto insurance quote in under 10 minutes. We compare top-rated carriers for your best rate, and you can drive off the dealer lot insured.";

export const metadata = pageMetadata({
  path: "/auto-insurance",
  title: "Auto Insurance Quotes in Florida",
  description,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[serviceJsonLd("/auto-insurance", "Auto Insurance", description), breadcrumbJsonLd("/auto-insurance", "Auto Insurance")]} />
      {children}
    </>
  );
}
