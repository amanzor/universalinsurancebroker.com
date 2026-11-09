"use client";

import { motion } from "framer-motion";
import { ExternalLink, Quote, Star } from "lucide-react";
import { useLang, useT } from "@/lib/useLang";
import {
  GOOGLE_RATING,
  GOOGLE_REVIEWS_URL,
  GOOGLE_WRITE_REVIEW_URL,
  REVIEWS,
  type OfficeProfile,
  type Review,
} from "@/lib/reviews";

const copy = {
  en: {
    eyebrow: "Google Reviews",
    title: "What Our Clients Say",
    autoTitle: "What Our Auto Insurance Clients Say",
    cityTitle: (city: string) => `What Our ${city} Clients Say`,
    subtitle: "Real reviews from real clients on our Google Business Profile.",
    reviews: "Google reviews",
    stars: "out of 5 stars",
    translated: "Translated from Spanish",
    readAll: "Read all reviews on Google",
    write: "Leave a Google Review",
    writeText: "Worked with us? Your feedback helps other Florida families and businesses find the right coverage.",
    newTab: "(opens in a new tab)",
  },
  es: {
    eyebrow: "Reseñas de Google",
    title: "Lo Que Dicen Nuestros Clientes",
    autoTitle: "Lo Que Dicen Nuestros Clientes de Seguro de Auto",
    cityTitle: (city: string) => `Lo Que Dicen Nuestros Clientes de ${city}`,
    subtitle: "Reseñas reales de clientes reales en nuestro perfil de Google.",
    reviews: "reseñas en Google",
    stars: "de 5 estrellas",
    translated: "Traducido del inglés",
    readAll: "Ver todas las reseñas en Google",
    write: "Déjenos una Reseña en Google",
    writeText: "¿Trabajó con nosotros? Su opinión ayuda a otras familias y negocios de Florida a encontrar la cobertura adecuada.",
    newTab: "(se abre en una pestaña nueva)",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-gold-500" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${className} fill-current`} />
      ))}
    </span>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const lang = useLang();
  const t = useT(copy);
  const original = review.lang === lang;
  const body = original ? review.text : review.translation;
  const initial = review.name.charAt(0);

  return (
    <motion.figure
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      custom={index}
      className="relative flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <Quote className="absolute right-5 top-5 h-8 w-8 text-electric-200" aria-hidden />
      <Stars />
      <span className="sr-only">5 {t.stars}</span>
      <blockquote className="mt-4 flex-1 text-gray-700 leading-relaxed" lang={original ? undefined : lang}>
        “{body}”
      </blockquote>
      {!original && (
        <p className="mt-3 text-xs italic text-gray-500">{t.translated}</p>
      )}
      <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-900 font-semibold text-electric-300"
        >
          {initial}
        </span>
        <span>
          <span className="block font-semibold text-primary-900">{review.name}</span>
          <span className="block text-xs text-gray-500">Google</span>
        </span>
      </figcaption>
    </motion.figure>
  );
}

function RatingBadge({ profile }: { profile: Required<Pick<OfficeProfile, "url" | "rating" | "count">> }) {
  const t = useT(copy);
  return (
    <a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition hover:border-electric-400 hover:shadow-md"
    >
      <span className="text-4xl font-bold text-primary-900">{profile.rating.toFixed(1)}</span>
      <span className="text-left">
        <Stars className="h-5 w-5" />
        <span className="mt-1 block text-sm text-gray-600">
          {profile.count} {t.reviews}
        </span>
      </span>
      <span className="sr-only">
        {profile.rating.toFixed(1)} {t.stars} {t.newTab}
      </span>
    </a>
  );
}

/**
 * Google reviews section.
 * - variant "home": six chosen reviews, rating badge, and a "leave a review" call to action.
 * - variant "topic": up to three reviews tagged with `topic`, for a service page.
 * - `profile` + `city`: an office page, linking to that office's own Google profile.
 */
export default function Testimonials({
  ids,
  topic,
  variant = "home",
  profile = { url: GOOGLE_REVIEWS_URL, writeUrl: GOOGLE_WRITE_REVIEW_URL, ...GOOGLE_RATING },
  city,
}: {
  ids?: string[];
  topic?: "auto";
  variant?: "home" | "topic";
  profile?: OfficeProfile;
  city?: string;
}) {
  const t = useT(copy);
  const list = ids
    ? ids.map((id) => REVIEWS.find((r) => r.id === id)).filter((r): r is Review => !!r)
    : REVIEWS.filter((r) => (topic ? r.topics?.includes(topic) : true)).slice(0, 3);

  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric-700">{t.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary-900 sm:text-4xl">
            {city ? t.cityTitle(city) : topic === "auto" ? t.autoTitle : t.title}
          </h2>
          {variant === "home" && <p className="mt-3 text-lg text-gray-600">{t.subtitle}</p>}
          <div className="mt-8">
            {profile.rating != null && profile.count != null && (
              <RatingBadge profile={{ url: profile.url, rating: profile.rating, count: profile.count }} />
            )}
          </div>
        </div>

        {list.length > 0 && (
        <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${list.length >= 3 ? "lg:grid-cols-3" : ""}`}>
          {list.map((r, i) => (
            <ReviewCard key={r.id} review={r} index={i % 3} />
          ))}
        </div>
        )}

        <div className="mt-12 text-center">
          {variant === "home" && <p className="mx-auto mb-6 max-w-2xl text-gray-600">{t.writeText}</p>}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-900 px-7 py-3 font-semibold text-primary-900 transition hover:bg-primary-900 hover:text-white"
            >
              {t.readAll}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            {variant === "home" && profile.writeUrl && (
              <a
                href={profile.writeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary-800 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-primary-900"
              >
                <Star className="h-4 w-4" aria-hidden />
                {t.write}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
