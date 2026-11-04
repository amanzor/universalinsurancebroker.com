import JsonLd from "@/components/JsonLd";
import { pageMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const description =
  "General liability, workers' comp, commercial auto, professional liability, surety bonds and more for 10,000+ business types across Florida. Fast online quotes.";

export const metadata = pageMetadata({
  path: "/commercial-insurance",
  title: "Florida Business Insurance",
  description,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[serviceJsonLd("/commercial-insurance", "Commercial Insurance", description), breadcrumbJsonLd("/commercial-insurance", "Commercial Insurance")]} />
      {children}
    </>
  );
}
