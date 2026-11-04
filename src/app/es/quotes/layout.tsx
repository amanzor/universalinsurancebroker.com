import { pageMetadata } from "@/lib/seo";

// Redirect-only page: keep it out of search results.
export const metadata = pageMetadata({
  path: "/quotes",
  lang: "es",
  title: "Cotizar",
  description: "Redirigiendo al formulario de cotización de Universal Insurance Brokers.",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
