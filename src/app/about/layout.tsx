import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Meet the team at Universal Insurance Brokers, an independent Florida broker serving clients since 2016 from four offices across South and Southwest Florida.";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Us: Meet Our Team",
  description,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("/about", "About Us")]} />
      {children}
    </>
  );
}
