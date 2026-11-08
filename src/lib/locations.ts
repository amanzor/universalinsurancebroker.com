import { COMPANY } from "@/lib/constants";
import type { Bilingual } from "@/lib/i18n";

/*
 * Office pages (/locations/<slug>, /es/locations/<slug>). Address, phone and
 * walk-in/appointment status come from COMPANY.locations; this adds what each
 * page needs to be genuinely local. Order here is display order.
 */

export type Office = {
  slug: string;
  city: string;
  name: Bilingual<string>;
  address: string;
  state: string;
  zip: string;
  phone: string;
  /** True when the location is staffed by appointment only (no walk-ins). */
  appointmentOnly: boolean;
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
  extra: Omit<Office, "slug" | "city" | "name" | "address" | "state" | "zip" | "phone" | "appointmentOnly">,
): Office => {
  const l = loc(city);
  return {
    slug,
    city,
    name: { en: l.name, es: l.nameEs },
    address: l.address,
    state: l.state,
    zip: l.zip,
    phone: l.phone,
    appointmentOnly: l.appointmentOnly,
    ...extra,
  };
};

export const OFFICES: Office[] = [
  office("hialeah", "Hialeah", {
    county: "Miami-Dade County",
    areas: ["Hialeah", "Hialeah Gardens", "Miami Lakes", "Miami Springs", "Medley", "Opa-locka"],
    intro: {
      en: "Our Hialeah office on West 68th Street is our walk-in location, a bilingual neighborhood agency (se habla español) helping Hialeah families and business owners compare auto, home, business and health insurance.",
      es: "Nuestra oficina de Hialeah, en la West 68th Street, es nuestra oficina abierta al público sin cita: una agencia bilingüe de barrio que ayuda a las familias y dueños de negocios de Hialeah a comparar seguros de auto, hogar, negocio y salud, todo en español.",
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
  office("doral", "Doral", {
    county: "Miami-Dade County",
    areas: ["Doral", "Fontainebleau", "Sweetwater", "Virginia Gardens", "Miami Springs", "Medley"],
    intro: {
      en: "Our Doral location on NW 79th Avenue meets clients by appointment, helping Doral families, commuters and the area's many small businesses compare coverage from 100+ carriers, in English or Spanish.",
      es: "Nuestra oficina de Doral, en la NW 79th Avenue, atiende con cita previa y ayuda a familias, conductores y a los muchos pequeños negocios de Doral a comparar coberturas de más de 100 aseguradoras, en español o en inglés.",
    },
    focus: {
      en: [
        "Auto insurance for daily commuters on the Dolphin Expressway (SR 836) and the Palmetto (SR 826)",
        "Commercial auto, general liability and workers' comp for logistics, warehouse and service businesses",
        "Condo (HO-6), renters and homeowners coverage, including hurricane deductibles",
      ],
      es: [
        "Seguro de auto para quienes viajan a diario por la Dolphin Expressway (SR 836) y la Palmetto (SR 826)",
        "Auto comercial, responsabilidad general y compensación laboral para negocios de logística, almacenes y servicios",
        "Seguros de condominio (HO-6), inquilino y propietario, incluidos deducibles por huracán",
      ],
    },
  }),
  office("homestead", "Homestead", {
    county: "Miami-Dade County",
    areas: ["Homestead", "Florida City", "Cutler Bay", "Redland", "Leisure City", "Naranja"],
    intro: {
      en: "Our Homestead location on South Dixie Highway serves South Miami-Dade by appointment, from Cutler Bay to Florida City, with bilingual agents who help families, farms and small businesses get properly insured.",
      es: "Nuestra oficina de Homestead, en South Dixie Highway, atiende al sur de Miami-Dade con cita previa, desde Cutler Bay hasta Florida City, con agentes bilingües que ayudan a familias, fincas y pequeños negocios a asegurarse correctamente.",
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
  office("boca-raton", "Boca Raton", {
    county: "Palm Beach County",
    areas: ["Boca Raton", "Delray Beach", "Deerfield Beach", "Highland Beach", "Coconut Creek", "Parkland"],
    intro: {
      en: "Our Boca Raton location on North Federal Highway meets clients by appointment, helping Palm Beach County drivers, homeowners, condo owners and businesses compare coverage from 100+ carriers, in English or Spanish.",
      es: "Nuestra oficina de Boca Raton, en North Federal Highway, atiende con cita previa y ayuda a conductores, propietarios de casas y condominios, y negocios del condado de Palm Beach a comparar coberturas de más de 100 aseguradoras, en inglés o en español.",
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
    county: "Lee County",
    areas: ["Lehigh Acres", "Fort Myers", "Cape Coral", "Estero", "Bonita Springs", "Alva"],
    intro: {
      en: "Our Lehigh Acres location on Lee Boulevard serves Southwest Florida by appointment, helping new homeowners, families and local businesses in Lee County find the right coverage at a competitive price.",
      es: "Nuestra oficina de Lehigh Acres, en Lee Boulevard, atiende al suroeste de Florida con cita previa: ayudamos a nuevos propietarios, familias y negocios locales del condado de Lee a encontrar la cobertura adecuada a un precio competitivo.",
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
];

export const officeBySlug = (slug: string) => OFFICES.find((o) => o.slug === slug);

export const fullAddress = (o: Office) => `${o.address}, ${o.city}, ${o.state} ${o.zip}`;

export const mapsSearchUrl = (o: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(o))}`;

export const mapsEmbedUrl = (o: Office) =>
  `https://www.google.com/maps?q=${encodeURIComponent(fullAddress(o))}&output=embed`;
