import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faqsByLang } from "@/lib/faqs";
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
  | "home-insurance/form";

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
        "Meet the team at Universal Insurance Brokers, an independent Florida broker serving clients since 2016 from four offices across South and Southwest Florida.",
      crumb: "About Us",
    },
    es: {
      title: "Nosotros: Conozca a Nuestro Equipo",
      description:
        "Conozca al equipo de Universal Insurance Brokers, corredor de seguros independiente en Florida desde 2016, con cuatro oficinas en el sur y suroeste de Florida.",
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
        "Call, text or email us, or visit our offices in Boca Raton, Lehigh Acres, Homestead and Hialeah. Open Monday to Friday, 9:30 AM to 7 PM.",
      crumb: "Contact",
    },
    es: {
      title: "Contáctenos",
      description:
        "Llámenos, envíenos un mensaje de texto o correo, o visite nuestras oficinas en Boca Raton, Lehigh Acres, Homestead y Hialeah. Lunes a viernes, 9:30 AM a 7 PM.",
      crumb: "Contacto",
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
    title: "Universal Insurance Brokers | Seguros de Auto, Hogar y Negocio en Florida",
    description:
      "Corredor de seguros independiente en Florida. Comparamos más de 100 aseguradoras de auto, hogar, negocio y salud. Cotización real en menos de 10 minutos. Hablamos español.",
  },
};
