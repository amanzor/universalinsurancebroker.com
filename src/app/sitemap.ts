import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { localizePath } from "@/lib/i18n";
import { OFFICES } from "@/lib/locations";

export const dynamic = "force-static";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/auto-insurance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/home-insurance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/commercial-insurance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/health-insurance", priority: 0.9, changeFrequency: "monthly" },
  { path: "/home-insurance/form", priority: 0.7, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/locations", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  ...OFFICES.map((o) => ({ path: `/locations/${o.slug}`, priority: 0.8, changeFrequency: "yearly" as const })),
];

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

// Every page in English and Spanish, each listing its hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.flatMap((r) => {
    const en = localizePath(r.path, "en");
    const es = localizePath(r.path, "es");
    const alternates = { languages: { "en-US": abs(en), "es-US": abs(es) } };
    return [en, es].map((p) => ({
      url: abs(p),
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates,
    }));
  });
}
