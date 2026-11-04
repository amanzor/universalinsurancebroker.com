import { pageMetadata } from "@/lib/seo";

// Same form as /home-insurance/form; point search engines at that URL.
export const metadata = pageMetadata({
  path: "/home-insurance-quote",
  canonicalPath: "/home-insurance/form",
  title: "Home Insurance Quote Request",
  description:
    "Request a free Florida homeowners, landlord or rental property insurance quote.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
