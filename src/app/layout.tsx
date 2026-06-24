import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Universal Insurance Brokers | Auto, Home, Commercial & Health Insurance in Florida",
  description: "Get affordable auto, home, commercial, and health insurance quotes in Florida. 10+ years of experience, 100+ carriers, 100% satisfaction guaranteed. Offices in Boca Raton, Lehigh Acres & Homestead.",
  keywords: "insurance broker Florida, auto insurance, home insurance, commercial insurance, health insurance, Boca Raton, Lehigh Acres, Homestead, affordable insurance quotes",
  openGraph: {
    title: "Universal Insurance Brokers | Florida Insurance Experts",
    description: "All your insurance policies under one roof. Get a real price on your insurance in less than 10 minutes.",
    url: "https://www.universalinsurancebroker.com",
    siteName: "Universal Insurance Brokers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Insurance Brokers",
    description: "All your insurance policies under one roof.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.universalinsurancebroker.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
