import type { Metadata } from "next";
import { HOME_SEO } from "@/lib/routeSeo";
import { OG_IMAGE, hreflangAlternates } from "@/lib/seo";

// Spanish home page metadata (inner /es routes override it).
export const metadata: Metadata = {
  // Keep the brand suffix template for the inner /es pages.
  title: { absolute: HOME_SEO.es.title, template: "%s | Universal Insurance Brokers" },
  description: HOME_SEO.es.description,
  alternates: { canonical: "/es", languages: hreflangAlternates("/") },
  openGraph: {
    title: HOME_SEO.es.title,
    description: HOME_SEO.es.description,
    url: "/es",
    siteName: "Universal Insurance Brokers",
    locale: "es_US",
    alternateLocale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO.es.title,
    description: HOME_SEO.es.description,
    images: [OG_IMAGE.url],
  },
};

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="es">{children}</div>;
}
