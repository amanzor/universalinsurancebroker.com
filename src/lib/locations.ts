import { COMPANY } from "@/lib/constants";
import type { Bilingual } from "@/lib/i18n";

/*
 * Office pages (/locations/<slug>, /es/locations/<slug>). Addresses come from
 * COMPANY.locations; this adds what each page needs to be genuinely local.
 */

export type Office = {
  slug: string;
  city: string;
  name: Bilingual<string>;
  address: string;
  state: string;
  zip: string;
  phone: string;
  county: string;
  /** Nearby communities the office serves. */
  areas: string[];
  /** A short, office-specific introduction. */
  intro: Bilingual<string>;
  /** Local insurance considerations worth calling out. */
  focus: Bilingual<string[]>;
};

const loc = (city: string) => {
  const l = COMPANY.locations.find((x) => x.city === city);
  if (!l) throw new Error(`Unknown office ${city}`);
  return l;
};

const office = (
  slug: string,
  city: string,
  extra: Omit<Office, "slug" | "city" | "name" | "address" | "state" | "zip">,
): Office => {
  const l = loc(city);
  return {
    slug,
    city,
    name: { en: l.name, es: l.nameEs },
    address: l.address,
    state: l.state,
    zip: l.zip,
    ...extra,
  };
};

export const OFFICES: Office[] = [
  office("boca-raton", "Boca Raton", {
    phone: COMPANY.phone,
    county: "Palm Beach County",
    areas: ["Boca Raton", "Delray Beach", "Deerfield Beach", "Highland Beach", "Coconut Creek", "Parkland"],
    intro: {
      en: "Our Boca Raton office on North Federal Highway helps Palm Beach County drivers, homeowners, condo owners and businesses compare coverage from 100+ carriers — in English or Spanish.",
      es: "Nuestra oficina de Boca Raton, en North Federal Highway, ayuda a conductores, propietarios de casas y condominios, y negocios del condado de Palm Beach a comparar coberturas de más de 100 aseguradoras, en inglés o en español.",
    },
    focus: {
      en: [
        "Condo (HO-6) and homeowners coverage, including hurricane deductibles and flood options",
        "Auto insurance for families and commuters along I-95 and the Turnpike",
        "Business insurance for offices, retailers, restaurants and contractors",
      ],
      es: [
        "Seguros de condominio (HO-6) y de propietario, incluidos deducibles por huracán y opciones contra inundaciones",
        "Seguro de auto para familias y para quienes viajan a diario por la I-95 y el Turnpike",
        "Seguros comerciales para oficinas, tiendas, restaurantes y contratistas",
      ],
    },
  }),
  office("lehigh-acres", "Lehigh Acres", {
    phone: COMPANY.phone,
    county: "Lee County",
    areas: ["Lehigh Acres", "Fort Myers", "Cape Coral", "Estero", "Bonita Springs", "Alva"],
    intro: {
      en: "Our Lehigh Acres office on Lee Boulevard serves Southwest Florida — helping new homeowners, families and local businesses in Lee County find the right coverage at a competitive price.",
      es: "Nuestra oficina de Lehigh Acres, en Lee Boulevard, atiende al suroeste de Florida: ayudamos a nuevos propietarios, familias y negocios locales del condado de Lee a encontrar la cobertura adecuada a un precio competitivo.",
    },
    focus: {
      en: [
        "Homeowners insurance for new construction and older homes, including wind-mitigation credits",
        "Flood coverage options for Southwest Florida properties",
        "Auto and commercial auto insurance for commuters, contractors and trades",
      ],
      es: [
        "Seguro de propietario para casas nuevas y antiguas, incluidos créditos por mitigación de viento",
        "Opciones de cobertura contra inundaciones para propiedades del suroeste de Florida",
        "Seguro de auto y de auto comercial para conductores, contratistas y oficios",
      ],
    },
  }),
  office("homestead", "Homestead", {
    phone: COMPANY.spitzerPhone,
    county: "Miami-Dade County",
    areas: ["Homestead", "Florida City", "Cutler Bay", "Redland", "Leisure City", "Naranja"],
    intro: {
      en: "Our Homestead office on South Dixie Highway serves South Miami-Dade, from Cutler Bay to Florida City — with bilingual agents who help families, farms and small businesses get properly insured.",
      es: "Nuestra oficina de Homestead, en South Dixie Highway, atiende al sur de Miami-Dade, desde Cutler Bay hasta Florida City, con agentes bilingües que ayudan a familias, fincas y pequeños negocios a asegurarse correctamente.",
    },
    focus: {
      en: [
        "Auto insurance, including SR-22 and FR-44 filings when required",
        "Homeowners, renters and landlord policies with hurricane and flood options",
        "Commercial auto and business coverage for agriculture, trades and local shops",
      ],
      es: [
        "Seguro de auto, incluidos los formularios SR-22 y FR-44 cuando se requieren",
        "Pólizas de propietario, inquilino y arrendador con opciones contra huracanes e inundaciones",
        "Auto comercial y coberturas para negocios agrícolas, oficios y comercios locales",
      ],
    },
  }),
  office("hialeah", "Hialeah", {
    phone: COMPANY.phone,
    county: "Miami-Dade County",
    areas: ["Hialeah", "Hialeah Gardens", "Miami Lakes", "Miami Springs", "Medley", "Doral"],
    intro: {
      en: "Our Hialeah office on West 68th Street is a bilingual neighborhood agency — se habla español — helping Hialeah families and business owners compare auto, home, business and health insurance.",
      es: "Nuestra oficina de Hialeah, en la West 68th Street, es una agencia bilingüe de barrio que ayuda a las familias y dueños de negocios de Hialeah a comparar seguros de auto, hogar, negocio y salud, todo en español.",
    },
    focus: {
      en: [
        "Auto insurance quotes in under 10 minutes, including high-risk drivers",
        "ACA Marketplace health plans with free help enrolling, in Spanish",
        "Coverage for small businesses: general liability, workers' comp and commercial auto",
      ],
      es: [
        "Cotizaciones de seguro de auto en menos de 10 minutos, incluso para conductores de alto riesgo",
        "Planes de salud del Mercado de Seguros Médicos (ACA) con ayuda gratuita para inscribirse, en español",
        "Coberturas para pequeños negocios: responsabilidad general, compensación laboral y auto comercial",
      ],
    },
  }),
];

export const officeBySlug = (slug: string) => OFFICES.find((o) => o.slug === slug);

export const fullAddress = (o: Office) => `${o.address}, ${o.city}, ${o.state} ${o.zip}`;

export const mapsSearchUrl = (o: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(o))}`;

export const mapsEmbedUrl = (o: Office) =>
  `https://www.google.com/maps?q=${encodeURIComponent(fullAddress(o))}&output=embed`;
