"use client";

import { MapPin, Star } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { OFFICES, fullAddress } from "@/lib/locations";
import { REVIEW_OFFICES, hialeahReviewFallback } from "@/lib/reviews";
import { track } from "@/lib/analytics";
import { useLang, useT } from "@/lib/useLang";

const copy = {
  en: {
    eyebrow: "Thank you",
    title: "Leave us a Google review",
    intro: `Thank you for choosing ${COMPANY.name}. A short review helps other Florida families find a broker they can trust, and it helps our team know what we did well.`,
    how: "Pick the office that helped you. Google opens in a new tab; it takes about a minute and you’ll need a Google account.",
    button: (city: string) => `Review our ${city} office`,
    appointment: "By appointment",
    walkIn: "Walk-ins welcome",
    help: "Not sure which office helped you? Call us and we’ll point you to the right one.",
  },
  es: {
    eyebrow: "Gracias",
    title: "Déjenos una reseña en Google",
    intro: `Gracias por elegir ${COMPANY.name}. Una reseña corta ayuda a otras familias de Florida a encontrar un corredor de confianza, y le dice a nuestro equipo qué hicimos bien.`,
    how: "Elija la oficina que lo atendió. Google se abre en otra pestaña; toma un minuto y necesita una cuenta de Google.",
    button: (city: string) => `Escribir reseña: oficina de ${city}`,
    appointment: "Con cita previa",
    walkIn: "Sin cita",
    help: "¿No sabe qué oficina lo atendió? Llámenos y le indicamos cuál es.",
  },
};

export default function ReviewView() {
  const t = useT(copy);
  const lang = useLang();
  const offices = REVIEW_OFFICES.map((r) => ({ ...r, office: OFFICES.find((o) => o.slug === r.slug)! })).filter((r) => r.office);

  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric-700">{t.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold text-primary-900 sm:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-700">{t.intro}</p>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">{t.how}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {offices.map(({ slug, writeUrl, office }) => (
            <div key={slug} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-xl font-bold text-primary-900">{office.name[lang]}</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric-600" aria-hidden />
                {fullAddress(office)}
              </p>
              <p className="mt-1 text-sm text-gray-500">{office.appointmentOnly ? t.appointment : t.walkIn}</p>
              <a
                href={writeUrl ?? hialeahReviewFallback}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("review_click", { office: slug, site_language: lang })}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary-800 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-primary-900"
              >
                <Star className="h-4 w-4" aria-hidden />
                {t.button(office.city)}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-gray-600">
          {t.help}{" "}
          <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} className="font-semibold text-primary-800 underline underline-offset-4">
            {COMPANY.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
