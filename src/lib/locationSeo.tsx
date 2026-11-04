import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { COMPANY } from "@/lib/constants";
import { localizePath, type Lang } from "@/lib/i18n";
import { OFFICES, officeBySlug } from "@/lib/locations";
import { SITE_URL, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const phoneE164 = (p: string) =>
  `+1-${p.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`;

export function locationsIndexMetadata(lang: Lang): Metadata {
  return pageMetadata({
    path: "/locations",
    lang,
    title: lang === "es" ? "Nuestras Oficinas en Florida" : "Our Florida Office Locations",
    description:
      lang === "es"
        ? "Visite Universal Insurance Brokers en Boca Raton, Lehigh Acres, Homestead o Hialeah. Agentes bilingües, más de 100 aseguradoras. Lunes a viernes, 9:30 AM a 7 PM."
        : "Visit Universal Insurance Brokers in Boca Raton, Lehigh Acres, Homestead or Hialeah. Bilingual agents, 100+ carriers. Open Monday to Friday, 9:30 AM to 7 PM.",
  });
}

export function locationMetadata(slug: string, lang: Lang): Metadata {
  const o = officeBySlug(slug)!;
  return pageMetadata({
    path: `/locations/${slug}`,
    lang,
    title:
      lang === "es"
        ? `Agencia de Seguros en ${o.city}, FL`
        : `${o.city}, FL Insurance Agency`,
    description:
      lang === "es"
        ? `Seguros de auto, hogar, negocio y salud en ${o.city}, FL. Visítenos en ${o.address} o llame al ${o.phone}. Hablamos español.`
        : `Auto, home, business and health insurance in ${o.city}, FL. Visit us at ${o.address} or call ${o.phone}. Bilingual agents, 100+ carriers.`,
  });
}

export function LocationJsonLd({ slug, lang }: { slug: string; lang: Lang }) {
  const o = officeBySlug(slug)!;
  const i = OFFICES.findIndex((x) => x.slug === slug);
  const url = `${SITE_URL}${localizePath(`/locations/${slug}`, lang)}`;
  const agency = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    // Same @id as the matching department in the organization graph.
    "@id": `${SITE_URL}/#office-${i + 1}`,
    name: `${COMPANY.name} — ${o.name[lang]}`,
    url,
    image: `${SITE_URL}/images/og-image.jpg`,
    telephone: phoneE164(o.phone),
    email: COMPANY.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: o.address,
      addressLocality: o.city,
      addressRegion: o.state,
      postalCode: o.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "19:00",
    },
    areaServed: o.areas.map((a) => ({ "@type": "City", name: `${a}, FL` })),
    knowsLanguage: ["en", "es"],
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${o.address}, ${o.city}, ${o.state} ${o.zip}`,
    )}`,
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "es" ? "Inicio" : "Home",
        item: lang === "es" ? `${SITE_URL}/es` : SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "es" ? "Oficinas" : "Locations",
        item: `${SITE_URL}${localizePath("/locations", lang)}`,
      },
      { "@type": "ListItem", position: 3, name: o.city, item: url },
    ],
  };
  return <JsonLd data={[agency, crumbs]} />;
}

export function LocationsIndexJsonLd({ lang }: { lang: Lang }) {
  return <JsonLd data={breadcrumbJsonLd("/locations", lang === "es" ? "Oficinas" : "Locations", lang)} />;
}

export const officeSlugs = () => OFFICES.map((o) => ({ slug: o.slug }));
