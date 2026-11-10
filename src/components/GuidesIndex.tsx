"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Car, CloudRain, Building, HeartPulse, Wind } from "lucide-react";
import { GUIDES } from "@/lib/content/guides";
import { useLang, useLocalizePath, useT } from "@/lib/useLang";

const copy = {
  en: {
    title: "Florida Insurance Guides",
    subtitle:
      "Plain-language answers to the questions Florida drivers, homeowners, condo owners and families ask us most, in English and Spanish.",
    read: "Read the guide",
  },
  es: {
    title: "Guías de Seguros en Florida",
    subtitle:
      "Respuestas claras a las preguntas que más nos hacen los conductores, propietarios, dueños de condominio y familias de Florida, en español e inglés.",
    read: "Leer la guía",
  },
};

const icons: Record<string, typeof Car> = {
  "florida-car-insurance-requirements": Car,
  "florida-hurricane-deductibles": Wind,
  "florida-flood-insurance": CloudRain,
  "florida-condo-insurance": Building,
  "florida-aca-open-enrollment": HeartPulse,
};

export default function GuidesIndex() {
  const t = useT(copy);
  const lang = useLang();
  const lp = useLocalizePath();

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-32 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-electric-300" aria-hidden />
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-100">{t.subtitle}</p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => {
            const c = g.copy[lang];
            const Icon = icons[g.slug] ?? BookOpen;
            return (
              <Link
                key={g.slug}
                href={lp(`/guides/${g.slug}`)}
                className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="mt-4 text-xl font-bold text-primary-900">{c.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{c.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                  {t.read}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
