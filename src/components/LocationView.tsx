"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Car,
  CheckCircle2,
  Clock,
  HeartPulse,
  Home,
  Languages,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { COMPANY, QUOTE_URL } from "@/lib/constants";
import { OFFICES, fullAddress, mapsEmbedUrl, mapsSearchUrl, officeBySlug } from "@/lib/locations";
import { useLang, useLocalizePath, useT } from "@/lib/useLang";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

// Above-the-fold hero text starts partly visible so it paints before
// hydration (better LCP); scroll reveals below use fadeUp.
const heroFade = {
  hidden: { opacity: 0.25, y: 24 },
  visible: fadeUp.visible,
};

const copy = {
  en: {
    eyebrow: "Insurance agency in",
    titleSuffix: "Insurance Agency",
    call: "Call",
    directions: "Get Directions",
    quote: "Get a Free Quote",
    visit: "Visit our office",
    hoursTitle: "Office hours",
    hours: "Monday – Friday",
    spanish: "Se habla español",
    spanishNote: "Our bilingual team can help you in English or Spanish.",
    focusTitle: (city: string) => `How we help in ${city}`,
    servicesTitle: "Insurance we offer",
    services: [
      { href: "/auto-insurance", title: "Auto Insurance", text: "Real quotes in under 10 minutes from 100+ carriers." },
      { href: "/home-insurance", title: "Home Insurance", text: "Homeowners, condo, renters and landlord coverage." },
      { href: "/commercial-insurance", title: "Business Insurance", text: "Liability, workers' comp, commercial auto and more." },
      { href: "/health-insurance", title: "Health Insurance", text: "Free help choosing and enrolling in an ACA plan." },
    ],
    areasTitle: (city: string) => `Areas we serve near ${city}`,
    areasNote: (county: string) =>
      `We work with clients throughout ${county} and the rest of Florida — in person, by phone or online.`,
    otherTitle: "Our other offices",
    mapTitle: (city: string) => `Map of our ${city} office`,
    ctaTitle: "Ready to compare your options?",
    ctaText: "Call us, stop by the office, or start your quote online — it only takes a few minutes.",
    contact: "Contact Us",
    allOffices: "All locations",
  },
  es: {
    eyebrow: "Agencia de seguros en",
    titleSuffix: "Agencia de Seguros",
    call: "Llamar",
    directions: "Cómo Llegar",
    quote: "Cotización Gratis",
    visit: "Visite nuestra oficina",
    hoursTitle: "Horario de atención",
    hours: "Lunes – Viernes",
    spanish: "Hablamos español",
    spanishNote: "Nuestro equipo bilingüe le atiende en español o en inglés.",
    focusTitle: (city: string) => `Cómo le ayudamos en ${city}`,
    servicesTitle: "Seguros que ofrecemos",
    services: [
      { href: "/auto-insurance", title: "Seguro de Auto", text: "Cotizaciones reales en menos de 10 minutos con más de 100 aseguradoras." },
      { href: "/home-insurance", title: "Seguro de Hogar", text: "Coberturas de propietario, condominio, inquilino y arrendador." },
      { href: "/commercial-insurance", title: "Seguro Comercial", text: "Responsabilidad civil, compensación laboral, auto comercial y más." },
      { href: "/health-insurance", title: "Seguro de Salud", text: "Ayuda gratuita para elegir e inscribirse en un plan ACA." },
    ],
    areasTitle: (city: string) => `Zonas que atendemos cerca de ${city}`,
    areasNote: (county: string) =>
      `Atendemos a clientes en todo el condado de ${county.replace(" County", "")} y en el resto de Florida, en persona, por teléfono o en línea.`,
    otherTitle: "Nuestras otras oficinas",
    mapTitle: (city: string) => `Mapa de nuestra oficina de ${city}`,
    ctaTitle: "¿Listo para comparar sus opciones?",
    ctaText: "Llámenos, visite la oficina o comience su cotización en línea; solo toma unos minutos.",
    contact: "Contáctenos",
    allOffices: "Todas las oficinas",
  },
};

const serviceIcons = [Car, Home, Building2, HeartPulse];

export default function LocationView({ slug }: { slug: string }) {
  const t = useT(copy);
  const lang = useLang();
  const lp = useLocalizePath();
  const office = officeBySlug(slug)!;
  const tel = `tel:${office.phone.replace(/\D/g, "")}`;
  const others = OFFICES.filter((o) => o.slug !== slug);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-32 pb-20 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-nebula-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroFade}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-200"
          >
            {t.eyebrow} {office.city}, FL
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={heroFade}
            custom={1}
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            {lang === "es" ? `${t.titleSuffix} en ${office.city}` : `${office.city} ${t.titleSuffix}`}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroFade}
            custom={2}
            className="mt-5 max-w-2xl text-lg text-primary-100"
          >
            {office.intro[lang]}
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroFade}
            custom={3}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={tel}
              className="btn-silver-3d inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-900"
            >
              <Phone className="h-5 w-5" />
              {t.call} {office.phone}
            </a>
            <a
              href={mapsSearchUrl(office)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              <Navigation className="h-5 w-5" />
              {t.directions}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Office details + map */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-5 lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-primary-900">{t.visit}</h2>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
              <p className="flex items-start gap-3 text-gray-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <span>
                  <span className="block font-semibold text-primary-900">{office.name[lang]}</span>
                  {office.address}
                  <br />
                  {office.city}, {office.state} {office.zip}
                </span>
              </p>
              <p className="mt-4 flex items-center gap-3 text-gray-700">
                <Phone className="h-5 w-5 shrink-0 text-primary-600" />
                <a href={tel} className="font-semibold text-primary-800 hover:underline">
                  {office.phone}
                </a>
              </p>
              <div className="mt-4 flex items-start gap-3 text-gray-700">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <span>
                  <span className="block font-semibold text-primary-900">{t.hoursTitle}</span>
                  {t.hours}: {COMPANY.hours}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-ember-200 bg-ember-200/20 p-5">
              <Languages className="mt-0.5 h-5 w-5 shrink-0 text-ember-600" />
              <p className="text-sm text-gray-700">
                <span className="block font-semibold text-primary-900">{t.spanish}</span>
                {t.spanishNote}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg lg:col-span-3"
          >
            <iframe
              title={t.mapTitle(office.city)}
              src={mapsEmbedUrl(office)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full lg:h-full lg:min-h-[420px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Local focus */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-primary-900 sm:text-3xl">{t.focusTitle(office.city)}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {office.focus[lang].map((item, i) => (
              <motion.li
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                <span className="text-gray-700">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-primary-900 sm:text-3xl">{t.servicesTitle}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.div
                  key={s.href}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <Link
                    href={lp(s.href)}
                    className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-primary-900">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-gray-600">{s.text}</p>
                    <ArrowRight className="mt-4 h-4 w-4 text-primary-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Areas served + other offices */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary-900">{t.areasTitle(office.city)}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {office.areas.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-primary-100 bg-white px-4 py-1.5 text-sm text-primary-800"
                >
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-gray-600">{t.areasNote(office.county)}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary-900">{t.otherTitle}</h2>
            <ul className="mt-5 space-y-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={lp(`/locations/${o.slug}`)}
                    className="group flex items-center justify-between rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    <span>
                      <span className="block font-semibold text-primary-900">{o.name[lang]}</span>
                      <span className="text-sm text-gray-600">{fullAddress(o)}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={lp("/locations")}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline"
            >
              {t.allOffices} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-primary-900">{t.ctaTitle}</h2>
          <p className="mt-3 text-gray-600">{t.ctaText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-6 py-3 font-semibold text-white transition hover:bg-primary-800"
            >
              {t.quote} <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={lp("/contact")}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-900 px-6 py-3 font-semibold text-primary-900 transition hover:bg-primary-50"
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
