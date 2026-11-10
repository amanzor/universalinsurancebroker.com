import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { localizePath, type Lang } from "@/lib/i18n";
import { GUIDES, REVIEWED_ISO, guideBySlug } from "@/lib/content/guides";
import { SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const INDEX = {
  en: {
    title: "Florida Insurance Guides",
    description:
      "Plain-language guides to Florida car, home, flood, condo and health insurance: what the law requires, how deductibles work and when to enroll.",
    crumb: "Guides",
  },
  es: {
    title: "Guías de Seguros en Florida",
    description:
      "Guías claras sobre seguros de auto, hogar, inundación, condominio y salud en Florida: lo que exige la ley, cómo funcionan los deducibles y cuándo inscribirse.",
    crumb: "Guías",
  },
};

export function guidesIndexMetadata(lang: Lang): Metadata {
  return pageMetadata({ path: "/guides", lang, title: INDEX[lang].title, description: INDEX[lang].description });
}

export function guideMetadata(slug: string, lang: Lang): Metadata {
  const c = guideBySlug(slug)!.copy[lang];
  return pageMetadata({ path: `/guides/${slug}`, lang, title: c.title, description: c.description });
}

export function GuidesIndexJsonLd({ lang }: { lang: Lang }) {
  return <JsonLd data={breadcrumbJsonLd("/guides", INDEX[lang].crumb, lang)} />;
}

export function GuideJsonLd({ slug, lang }: { slug: string; lang: Lang }) {
  const g = guideBySlug(slug)!;
  const c = g.copy[lang];
  const url = `${SITE_URL}${localizePath(`/guides/${slug}`, lang)}`;
  const inLanguage = lang === "es" ? "es-US" : "en-US";
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.description,
    inLanguage,
    url,
    mainEntityOfPage: url,
    dateModified: REVIEWED_ISO,
    image: `${SITE_URL}/images/og-image.jpg`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: { "@type": "Place", name: "Florida" },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage,
    mainEntity: c.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: lang === "es" ? `${SITE_URL}/es` : SITE_URL },
      { "@type": "ListItem", position: 2, name: INDEX[lang].crumb, item: `${SITE_URL}${localizePath("/guides", lang)}` },
      { "@type": "ListItem", position: 3, name: c.title, item: url },
    ],
  };
  return <JsonLd data={[article, faq, crumbs]} />;
}

export const guideSlugs = () => GUIDES.map((g) => ({ slug: g.slug }));
