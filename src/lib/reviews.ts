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
];

/**
 * Each office's own Google Business Profile. The reviews in REVIEWS come from
 * the Doral profile. Add an entry (profile link + its rating and review count)
 * for another office to show a reviews section on that office's page and to
 * point its "Get Directions" button at the profile.
 */
export type OfficeProfile = { url: string; writeUrl?: string; rating: number; count: number; reviewIds?: string[] };

export const OFFICE_PROFILES: Record<string, OfficeProfile> = {
  doral: {
    url: GOOGLE_REVIEWS_URL,
    writeUrl: GOOGLE_WRITE_REVIEW_URL,
    rating: GOOGLE_RATING.rating,
    count: GOOGLE_RATING.count,
    reviewIds: ["alex-z", "eddie-w", "efrain-h", "josh-a", "david-d", "deanna-e"],
  },
};

/** The six shown on the home page, in display order. */
export const HOME_REVIEW_IDS = ["alex-z", "eddie-w", "efrain-h", "josh-a", "david-d", "deanna-e"];
