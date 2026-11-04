import { pageMetadata } from "@/lib/seo";

// Redirect-only page: keep it out of search results.
export const metadata = pageMetadata({
  path: "/quotes",
  title: "Get a Quote",
  description: "Redirecting to the Universal Insurance Brokers quote form.",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
