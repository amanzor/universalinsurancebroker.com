import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import { localizePath, type Lang } from "@/lib/i18n";

/** Canonical production origin. Every canonical URL and sitemap entry uses it,
 *  so mirrors (Vercel previews, GitHub Pages) never compete with the real site. */
export const SITE_URL = "https://www.universalinsurancebroker.com";

export const OG_IMAGE = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Universal Insurance Brokers — auto, home, commercial and health insurance in Florida",
};

/**
 * Per-page metadata: unique title + description, a self-referencing canonical
 * URL, and matching Open Graph / Twitter tags.
 */
export function pageMetadata({
  path,
  lang = "en",
  title,
  description,
  noindex = false,
  canonicalPath,
  absoluteTitle = false,
}: {
  /** English path of the page ("/auto-insurance"); localized for `lang`. */
  path: string;
  lang?: Lang;
  title: string;
  description: string;
  noindex?: boolean;
  /** Point a duplicate URL's canonical at the preferred one. */
  canonicalPath?: string;
  /** Use for pages nested under a layout that sets its own title, where the
   *  root "%s | brand" template no longer applies. */
  absoluteTitle?: boolean;
}): Metadata {
  const base = canonicalPath ?? path;
  const url = localizePath(base, lang);
  return {
    title: absoluteTitle ? { absolute: `${title} | ${COMPANY.name}` } : title,
    description,
    alternates: {
      canonical: url,
      // hreflang: each page points at itself and its other-language twin.
      ...(noindex ? {} : { languages: hreflangAlternates(base) }),
    },
    openGraph: {
      title: `${title} | ${COMPANY.name}`,
      description,
      url,
      siteName: COMPANY.name,
      locale: lang === "es" ? "es_US" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_US",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY.name}`,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** hreflang map for a page given its English path. */
export function hreflangAlternates(path: string) {
  return {
    "en-US": localizePath(path, "en"),
    "es-US": localizePath(path, "es"),
    "x-default": localizePath(path, "en"),
  };
}

const phoneE164 = (p: string) => `+1-${p.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`;

const openingHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "09:30",
  closes: "17:30",
};

/** Organization-level structured data (InsuranceAgency) with each office. */
export function organizationJsonLd() {
  const sameAs = Object.values(COMPANY.social);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "InsuranceAgency",
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY.name,
        // Other names the business is known and searched by (Spanish brand
        // and the short domain), so search engines tie them to this agency.
        alternateName: ["Seguros Universal Florida", "UIB Insurance"],
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo-square.png`,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        description:
          "Independent insurance broker in Florida comparing 100+ carriers for auto, home, commercial and health insurance.",
        telephone: phoneE164(COMPANY.phone),
        email: COMPANY.email,
        foundingDate: "2016",
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: `Florida insurance agency license ${COMPANY.license}`,
          identifier: COMPANY.license,
          recognizedBy: {
            "@type": "GovernmentOrganization",
            name: "Florida Department of Financial Services",
          },
        },
        knowsLanguage: ["en", "es"],
        areaServed: [
          { "@type": "State", name: "Florida" },
          ...COMPANY.counties.map((name) => ({
            "@type": "AdministrativeArea",
            name: `${name}, Florida`,
          })),
        ],
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.locations[0].address,
          addressLocality: COMPANY.locations[0].city,
          addressRegion: COMPANY.locations[0].state,
          postalCode: COMPANY.locations[0].zip,
          addressCountry: "US",
        },
        openingHoursSpecification: openingHours,
        sameAs,
        department: COMPANY.locations.map((loc, i) => ({
          "@type": "InsuranceAgency",
          "@id": `${SITE_URL}/#office-${i + 1}`,
          name: `${COMPANY.name} — ${loc.name}`,
          url: `${SITE_URL}/locations/${loc.city.toLowerCase().replace(/\s+/g, "-")}`,
          telephone: phoneE164(loc.phone),
          address: {
            "@type": "PostalAddress",
            streetAddress: loc.address,
            addressLocality: loc.city,
            addressRegion: loc.state,
            postalCode: loc.zip,
            addressCountry: "US",
          },
          geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
          // Appointment-only locations publish no walk-in hours.
          ...(loc.appointmentOnly ? {} : { openingHoursSpecification: openingHours }),
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: COMPANY.name,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en-US", "es-US"],
      },
    ],
  };
}

/** Service structured data for an insurance line page. */
export function serviceJsonLd(path: string, name: string, description: string, lang: Lang = "en") {
  const url = `${SITE_URL}${localizePath(path, lang)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: name,
    description,
    url,
    inLanguage: lang === "es" ? "es-US" : "en-US",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "State", name: "Florida" },
  };
}

/** Breadcrumb trail: Home › Page (path is the English path). */
export function breadcrumbJsonLd(path: string, name: string, lang: Lang = "en") {
  const home = localizePath("/", lang);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "es" ? "Inicio" : "Home",
        item: home === "/" ? SITE_URL : `${SITE_URL}${home}`,
      },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${localizePath(path, lang)}` },
    ],
  };
}
