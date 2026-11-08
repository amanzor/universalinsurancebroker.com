"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Languages, MapPin, Navigation, Phone } from "lucide-react";
import { OFFICES, mapsSearchUrl } from "@/lib/locations";
import { OfficeStatusBadge } from "@/components/OfficeStatus";
import { useLang, useLocalizePath, useT } from "@/lib/useLang";

const copy = {
  en: {
    title: "Our Florida Offices",
    subtitle:
      "Five locations across South and Southwest Florida. Walk in to our Hialeah office, book an appointment at any other location, or get a quote online. Our bilingual team speaks English and Spanish.",
    details: "Office details",
    directions: "Directions",
    spanish: "Se habla español",
  },
  es: {
    title: "Nuestras Oficinas en Florida",
    subtitle:
      "Cinco oficinas en el sur y suroeste de Florida. Visite sin cita nuestra oficina de Hialeah, haga una cita en cualquiera de las demás o cotice en línea. Nuestro equipo bilingüe habla español e inglés.",
    details: "Ver oficina",
    directions: "Cómo llegar",
    spanish: "Hablamos español",
  },
};

export default function LocationsIndex() {
  const t = useT(copy);
  const lang = useLang();
  const lp = useLocalizePath();

  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-32 pb-20 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0.25, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0.25, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-primary-100"
          >
            {t.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0.25 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold"
          >
            <Languages className="h-4 w-4" /> {t.spanish}
          </motion.p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          {OFFICES.map((o, i) => (
            <motion.article
              key={o.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100"
            >
              <h2 className="text-xl font-bold text-primary-900">{o.name[lang]}</h2>
              <OfficeStatusBadge appointmentOnly={o.appointmentOnly} className="mt-2 self-start" />
              <p className="mt-3 flex items-start gap-2 text-gray-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <span>
                  {o.address}
                  <br />
                  {o.city}, {o.state} {o.zip}
                </span>
              </p>
              <p className="mt-2 flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-primary-600" />
                <a href={`tel:${o.phone.replace(/\D/g, "")}`} className="font-semibold text-primary-800 hover:underline">
                  {o.phone}
                </a>
              </p>
              <p className="mt-4 flex-1 text-sm text-gray-600">{o.intro[lang]}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={lp(`/locations/${o.slug}`)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800"
                >
                  {t.details} <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={mapsSearchUrl(o)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-5 py-2.5 text-sm font-semibold text-primary-800 transition hover:bg-primary-50"
                >
                  <Navigation className="h-4 w-4" /> {t.directions}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
