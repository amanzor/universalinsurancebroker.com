/*
 * Google reviews from the Universal Insurance Brokers Business Profile.
 * `text` is the review exactly as the client wrote it, in `lang`.
 * `translation` is our translation into the other site language; the UI
 * labels it as translated so visitors know it is not the original wording.
 *
 * Only reviews with written text are listed. Names are shown as first name
 * and last initial. Update GOOGLE_RATING when the profile's totals change.
 */
import type { Lang } from "@/lib/i18n";

export type Review = {
  id: string;
  name: string;
  lang: Lang;
  text: string;
  translation: string;
  /** Insurance lines the review is relevant to (for service pages). */
  topics?: ("auto")[];
};

export const GOOGLE_RATING = { rating: 5.0, count: 13 };

/** Opens the Business Profile so visitors can read every review. */
export const GOOGLE_REVIEWS_URL = "https://g.page/r/Ca_MqKD5ujKsEAE";
/** Opens Google's "write a review" dialog. */
export const GOOGLE_WRITE_REVIEW_URL = "https://g.page/r/Ca_MqKD5ujKsEAE/review";

export const REVIEWS: Review[] = [
  {
    id: "alex-z",
    name: "Alex Z.",
    lang: "en",
    text: "They did the shopping for me and provided the best quote among different companies without much delay. The insurance agent was very polite and friendly. Will definitely recommend",
    translation:
      "Ellos hicieron la búsqueda por mí y me dieron la mejor cotización entre varias compañías sin mucha demora. El agente de seguros fue muy cortés y amable. Definitivamente lo recomendaré.",
  },
  {
    id: "eddie-w",
    name: "Eddie W.",
    lang: "en",
    text: "Jorge was very helpful and friendly. He checked out all my options to get me the best possible rate. Very satisfied.",
    translation:
      "Jorge fue muy servicial y amable. Revisó todas mis opciones para conseguirme la mejor tarifa posible. Muy satisfecho.",
    topics: ["auto"],
  },
  {
    id: "josh-a",
    name: "Josh A.",
    lang: "en",
    text: "Great service, quoted in several agencies, and these guys have the lowest rates in South Florida",
    translation:
      "Excelente servicio. Coticé en varias agencias y ellos tienen las tarifas más bajas del sur de Florida.",
    topics: ["auto"],
  },
  {
    id: "efrain-h",
    name: "Efrain H.",
    lang: "es",
    text: "Excelente servicio. 100% recomendados",
    translation: "Excellent service. 100% recommended.",
  },
  {
    id: "david-d",
    name: "David D.",
    lang: "en",
    text: "Excellent service and impeccable customer service with the best prices in town 👌👍👏",
    translation:
      "Excelente servicio y una atención al cliente impecable, con los mejores precios de la ciudad 👌👍👏",
  },
  {
    id: "deanna-e",
    name: "Deanna E.",
    lang: "en",
    text: "Very professional and fast and friendly. Thank you",
    translation: "Muy profesionales, rápidos y amables. Gracias.",
  },
  {
    id: "eigi",
    name: "Eigi",
    lang: "en",
    text: "The guy I spoke to, Ed, was very straightforward, kind and helped me out finding a better deal even though I had some traffic tickets.",
    translation:
      "La persona con la que hablé, Ed, fue muy directo y amable, y me ayudó a encontrar un mejor precio aunque tenía algunas multas de tránsito.",
    topics: ["auto"],
  },
  {
    id: "ramon-r",
    name: "Ramon R.",
    lang: "en",
    text: "Great customer service Great prices this place is the best",
    translation: "Excelente atención al cliente, excelentes precios. Este lugar es el mejor.",
  },

  // ── Lehigh Acres Google Business Profile ──
  {
    id: "lehigh-vivian-g",
    name: "Vivian G.",
    lang: "en",
    text: "Thank you Alberto and Randy for your professional services and requoting our home insurance that was up for renewal. Highly recommend.",
    translation:
      "Gracias a Alberto y Randy por sus servicios profesionales y por volver a cotizar nuestro seguro de hogar, que estaba por renovarse. Muy recomendados.",
  },
  {
    id: "lehigh-fernando-p",
    name: "Fernando P.",
    lang: "es",
    text: "Uri y Albert definitivamente me dieron una excelente atención! Buen precio en mi seguro de auto! Recomendados al 100",
    translation: "Uri and Albert definitely gave me excellent service! Good price on my auto insurance! 100% recommended.",
  },
  {
    id: "lehigh-alex-p",
    name: "Alex P.",
    lang: "en",
    text: "I received a great quote from these guys and saved $100 per month over my insurance.",
    translation: "Recibí una excelente cotización de ellos y ahorré $100 al mes en mi seguro.",
  },
  {
    id: "lehigh-wally-s",
    name: "Wally S.",
    lang: "en",
    text: "Uri and Amanda are professional, courteous and busy yet they were still attentive to my needs and inquiries so much so that I knew I was going to become a client right away",
    translation:
      "Uri y Amanda son profesionales, corteses y, aunque estaban ocupados, estuvieron atentos a mis necesidades y preguntas, tanto que supe enseguida que me iba a hacer cliente.",
  },
  {
    id: "lehigh-michael-m",
    name: "Michael M.",
    lang: "en",
    text: "Uri is first class when it comes to client service and attention to detail. He really leaves no stone unturned and will go above and beyond",
    translation:
      "Uri es de primera en servicio al cliente y atención a los detalles. No deja nada sin revisar y siempre hace más de lo esperado.",
  },
  {
    id: "lehigh-brandon",
    name: "Brandon",
    lang: "en",
    text: "Call Uri and his team for everything. They go above and beyond for real!!!",
    translation: "Llamen a Uri y a su equipo para todo. ¡De verdad hacen más de lo que se espera!",
  },

  // ── Boca Raton Google Business Profile ──
  {
    id: "boca-chaya-b",
    name: "Chaya B.",
    lang: "en",
    text: "I recommend Uriel to everyone who needs sufficient and quick response and support my experience is amazing !",
    translation:
      "Recomiendo a Uriel a todos los que necesiten una respuesta y un apoyo rápidos y eficaces. ¡Mi experiencia ha sido increíble!",
  },
  {
    id: "boca-tamara-m",
    name: "Tamara M.",
    lang: "en",
    text: "Great quotes on insurance and service from the staff",
    translation: "Excelentes cotizaciones de seguros y muy buen servicio del personal.",
  },
  {
    id: "boca-elie",
    name: "Elie",
    lang: "en",
    text: "Great company. Great people. Fair, honest. What else do you need these days? Highly recommend",
    translation: "Gran compañía. Gran gente. Justos y honestos. ¿Qué más se necesita hoy en día? Muy recomendados.",
  },
];

/**
 * Each office's own Google Business Profile. REVIEWS holds reviews from the
 * Doral profile (ids without a prefix), Lehigh Acres ("lehigh-") and Boca Raton ("boca-"). Add an entry (profile link + its rating and review count)
 * for another office to show a reviews section on that office's page and to
 * point its "Get Directions" button at the profile.
 */
export type OfficeProfile = {
  url: string;
  writeUrl?: string;
  /** Rating and review count as shown on the profile; leave out until known. */
  rating?: number;
  count?: number;
  /** Reviews from this profile (ids in REVIEWS) to show on the office page. */
  reviewIds?: string[];
};

export const OFFICE_PROFILES: Record<string, OfficeProfile> = {
  doral: {
    url: GOOGLE_REVIEWS_URL,
    writeUrl: GOOGLE_WRITE_REVIEW_URL,
    rating: GOOGLE_RATING.rating,
    count: GOOGLE_RATING.count,
    reviewIds: ["alex-z", "eddie-w", "efrain-h", "josh-a", "david-d", "deanna-e"],
  },
  "lehigh-acres": {
    url: "https://g.page/r/CepMmoQJVNsYEAI",
    writeUrl: "https://g.page/r/CepMmoQJVNsYEAI/review",
    rating: 4.9,
    count: 134,
    reviewIds: ["lehigh-vivian-g", "lehigh-fernando-p", "lehigh-alex-p", "lehigh-wally-s", "lehigh-michael-m", "lehigh-brandon"],
  },
  "boca-raton": {
    url: "https://g.page/r/CVUEYP0LPBnBEAI",
    writeUrl: "https://g.page/r/CVUEYP0LPBnBEAI/review",
    rating: 5.0,
    count: 105,
    reviewIds: ["boca-chaya-b", "boca-tamara-m", "boca-elie"],
  },
};

/** The six shown on the home page, in display order. */
export const HOME_REVIEW_IDS = ["alex-z", "eddie-w", "efrain-h", "josh-a", "david-d", "deanna-e"];
