import JsonLd from "@/components/JsonLd";
import { pageMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Free help choosing an Affordable Care Act health plan in Florida. We compare marketplace plans from major carriers and guide you from enrollment to claims.";

export const metadata = pageMetadata({
  path: "/health-insurance",
  title: "Florida Health Insurance & ACA Plans",
  description,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[serviceJsonLd("/health-insurance", "Health Insurance", description), breadcrumbJsonLd("/health-insurance", "Health Insurance")]} />
      {children}
    </>
  );
}
