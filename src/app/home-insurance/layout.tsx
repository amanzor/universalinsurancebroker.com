import JsonLd from "@/components/JsonLd";
import { pageMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Compare Florida homeowners, landlord and renters insurance from top-rated carriers. Protect your home, rental property or belongings with a free quote.";

export const metadata = pageMetadata({
  path: "/home-insurance",
  title: "Florida Home Insurance: Homeowners & Renters",
  description,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[serviceJsonLd("/home-insurance", "Home Insurance", description), breadcrumbJsonLd("/home-insurance", "Home Insurance")]} />
      {children}
    </>
  );
}
