import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/home-insurance/form",
  title: "Home Insurance Quote Request",
  absoluteTitle: true,
  description:
    "Request a free Florida homeowners, landlord or rental property insurance quote. Tell us about your home and we'll compare top-rated carriers for you.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
