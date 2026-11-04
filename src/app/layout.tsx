import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import MobileCtaBar from "@/components/MobileCtaBar";
import Analytics from "@/components/Analytics";
import { OG_IMAGE, SITE_URL, hreflangAlternates, organizationJsonLd } from "@/lib/seo";
import { HOME_SEO } from "@/lib/routeSeo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const homeTitle = HOME_SEO.en.title;
const homeDescription = HOME_SEO.en.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Inner pages set their own title; it is suffixed with the brand.
  title: { default: homeTitle, template: "%s | Universal Insurance Brokers" },
  description: homeDescription,
  applicationName: "Universal Insurance Brokers",
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
    siteName: "Universal Insurance Brokers",
    locale: "en_US",
    alternateLocale: "es_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/", languages: hreflangAlternates("/") },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <JsonLd data={organizationJsonLd()} />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileCtaBar />
        <Analytics />
      </body>
    </html>
  );
}
