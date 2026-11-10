import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faqsByLang } from "@/lib/faqs";
import { faq as autoFaq } from "@/lib/content/auto-insurance";
import { faq as homeFaq } from "@/lib/content/home-insurance";
import { faq as commercialFaq } from "@/lib/content/commercial-insurance";
import { faq as healthFaq } from "@/lib/content/health-insurance";
import type { PageFaq } from "@/lib/content/types";

/** Page-specific Q&A shown on each service page. */
const PAGE_FAQS: Partial<Record<RouteKey, PageFaq>> = {
  "auto-insurance": autoFaq,
  "home-insurance": homeFaq,
  "commercial-insurance": commercialFaq,
  "health-insurance": healthFaq,
};
import type { Lang } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

/*
 * Titles, descriptions and structured data for every route, in both
 * languages. Route layouts (app/<route>/layout.tsx and app/es/<route>/layout.tsx)
 * call routeMetadata() and render <RouteJsonLd />.
 */

type RouteCopy = {
  title: string;
  description: string;
  /** Insurance line pages get Service structured data. */
  service?: string;
  /** Breadcrumb label (defaults to `service`). */
  crumb?: string;
};

export type RouteKey =
  | "auto-insurance"
  | "home-insurance"
  | "commercial-insurance"
  | "health-insurance"
  | "about"
  | "faq"
  | "contact"
  | "home-insurance/form"
  | "privacy";

const ROUTES: Record<RouteKey, Record<Lang, RouteCopy>> = {
  "auto-insurance": {
    en: {
      title: "Auto Insurance Quotes in Florida",
      description:
        "Get a real Florida auto insurance quote in under 10 minutes. We compare 100+ carriers for your best rate, and you can drive off the dealer lot insured.",
      service: "Auto Insurance",
    },
    es: {
      title: "Seguro de Auto en Florida",
      description:
        "Obtenga una cotización real de seguro de auto en Florida en menos de 10 minutos. Comparamos más de 100 aseguradoras para encontrarle la mejor tarifa.",
      service: "Seguro de Auto",
    },
  },
  "home-insurance": {
    en: {
      title: "Florida Home Insurance: Homeowners & Renters",
      description:
        "Compare Florida homeowners, landlord and renters insurance from top-rated carriers. Protect your home, rental property or belongings with a free quote.",
      service: "Home Insurance",
    },
    es: {
      title: "Seguro de Hogar en Florida",
      description:
        "Compare seguros de propietario, de arrendador y de inquilino en Florida con aseguradoras de primer nivel. Proteja su casa o sus pertenencias. Cotización gratis.",
      service: "Seguro de Hogar",
    },
  },
  "commercial-insurance": {
    en: {
      title: "Florida Business Insurance",
      description:
        "General liability, workers' comp, commercial auto, professional liability, surety bonds and more for 10,000+ business types across Florida. Fast online quotes.",
      service: "Commercial Insurance",
    },
    es: {
      title: "Seguro Comercial en Florida",
      description:
        "Responsabilidad general, compensación laboral, auto comercial, responsabilidad profesional, fianzas y más para más de 10,000 tipos de negocio en Florida.",
      service: "Seguro Comercial",
    },
  },
  "health-insurance": {
    en: {
      title: "Florida Health Insurance & ACA Plans",
      description:
        "Free help choosing an Affordable Care Act health plan in Florida. We compare marketplace plans from major carriers and guide you from enrollment to claims.",
      service: "Health Insurance",
    },
    es: {
      title: "Seguro de Salud y Planes ACA en Florida",
      description:
        "Ayuda gratuita para elegir un plan de salud de la Ley de Cuidado de Salud Asequible (ACA) en Florida. Comparamos planes del mercado y le guiamos en todo.",
      service: "Seguro de Salud",
    },
  },
  about: {
    en: {
      title: "About Us: Meet Our Team",
      description:
        "Meet the team at Universal Insurance Brokers, an independent Florida broker serving clients since 2016 from five locations across South and Southwest Florida.",
      crumb: "About Us",
    },
    es: {
      title: "Nosotros: Conozca a Nuestro Equipo",
      description:
        "Conozca al equipo de Universal Insurance Brokers, corredor de seguros independiente en Florida desde 2016, con cinco oficinas en el sur y suroeste de Florida.",
      crumb: "Nosotros",
    },
  },
  faq: {
    en: {
      title: "Insurance FAQ",
      description:
        "Answers to common questions about auto, home, commercial and health insurance in Florida: quotes, rates, SR-22s, coverage and how working with a broker helps.",
      crumb: "FAQ",
    },
    es: {
      title: "Preguntas Frecuentes sobre Seguros",
      description:
        "Respuestas a preguntas comunes sobre seguros de auto, hogar, comerciales y de salud en Florida: cotizaciones, tarifas, SR-22, coberturas y más.",
      crumb: "Preguntas Frecuentes",
    },
  },
  contact: {
    en: {
      title: "Contact Us",
      description:
        "Call, text or email us. Walk in to our Hialeah office Monday to Friday, 9:30 AM to 5:30 PM, or book an appointment in Doral, Homestead, Boca Raton or Lehigh Acres.",
      crumb: "Contact",
    },
    es: {
      title: "Contáctenos",
      description:
        "Llámenos o escríbanos. Visite sin cita nuestra oficina de Hialeah de lunes a viernes, 9:30 AM a 5:30 PM, o haga una cita en Doral, Homestead, Boca Raton o Lehigh Acres.",
      crumb: "Contacto",
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy",
      description:
        "How Universal Insurance Brokers collects, uses and shares information when you visit our website or request an insurance quote.",
      crumb: "Privacy Policy",
    },
    es: {
      title: "Política de Privacidad",
      description:
        "Cómo Universal Insurance Brokers recopila, usa y comparte información cuando visita nuestro sitio web o solicita una cotización de seguro.",
      crumb: "Política de Privacidad",
    },
  },
  "home-insurance/form": {
    en: {
      title: "Home Insurance Quote Request",
      description:
        "Request a free Florida homeowners, landlord or rental property insurance quote. Tell us about your home and we'll compare top-rated carriers for you.",
    },
    es: {
      title: "Solicitud de Cotización de Seguro de Hogar",
      description:
        "Solicite una cotización gratis de seguro de propietario, arrendador o propiedad de alquiler en Florida. Compararemos aseguradoras de primer nivel por usted.",
    },
  },
};

export function routeMetadata(route: RouteKey, lang: Lang): Metadata {
  const c = ROUTES[route][lang];
  return pageMetadata({
    path: `/${route}`,
    lang,
    title: c.title,
    description: c.description,
    // The quote form sits under the home-insurance layout, which sets its own
    // title, so the root "%s | brand" template must be applied explicitly.
    absoluteTitle: route === "home-insurance/form",
  });
}

export function RouteJsonLd({ route, lang }: { route: RouteKey; lang: Lang }) {
  if (route === "home-insurance/form") return null;
  const c = ROUTES[route][lang];
  const path = `/${route}`;
  const data: object[] = [];
  if (c.service) data.push(serviceJsonLd(path, c.service, c.description, lang));
  data.push(breadcrumbJsonLd(path, c.crumb ?? c.service ?? c.title, lang));
  const pageFaq = PAGE_FAQS[route];
  if (pageFaq) {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang === "es" ? "es-US" : "en-US",
      mainEntity: pageFaq[lang].map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }
  if (route === "faq") {
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang === "es" ? "es-US" : "en-US",
      mainEntity: faqsByLang[lang].flatMap((cat) =>
        cat.questions.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      ),
    });
  }
  return <JsonLd data={data} />;
}

/** Home page metadata per language (root layout = English, app/es/layout = Spanish). */
export const HOME_SEO: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Universal Insurance Brokers | Florida Auto, Home & Business Insurance",
    description:
      "Independent Florida insurance broker comparing 100+ carriers for auto, home, business and health insurance. Get a real quote in under 10 minutes.",
  },
  es: {
    title: "Seguros Universal Florida | Universal Insurance Brokers",
    description:
      "Seguros Universal Florida: corredor de seguros independiente que compara más de 100 aseguradoras de auto, hogar, negocio y salud. Cotización real en menos de 10 minutos.",
  },
};
