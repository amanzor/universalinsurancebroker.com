import JsonLd from "@/components/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Call, text or email us, or visit our offices in Boca Raton, Lehigh Acres, Homestead and Hialeah. Open Monday to Friday, 9:30 AM to 7 PM.";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us",
  description,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("/contact", "Contact")]} />
      {children}
    </>
  );
}
