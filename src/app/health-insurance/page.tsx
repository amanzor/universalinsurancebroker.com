"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartPulse, Phone, ArrowRight, ShieldCheck, DollarSign } from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { useT, useLocalizePath } from "@/lib/useLang";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const copy = {
  en: {
    heroTitle: "Health Insurance",
    heroSubtitle: "Individual health insurance at zero cost to you",
    acaTitle: "Affordable Care Act Programs",
    acaP1a:
      "Through the Affordable Care Act (ACA), millions of Americans qualify for subsidized or even free health insurance coverage.",
    acaP1b:
      "helps you navigate the marketplace to find best-in-class health policies that fit your needs and budget.",
    acaP2:
      "Our licensed agents guide you through the enrollment process at absolutely no cost to you. We are compensated directly by the insurance carriers, so you get expert help without paying a dime out of pocket.",
    cards: [
      {
        title: "Zero Cost to You",
        description:
          "Our services are completely free. Insurance carriers compensate us directly so you pay nothing extra.",
      },
      {
        title: "Best-in-Class Policies",
        description:
          "We compare plans from all major carriers on the marketplace to find the coverage that fits your life.",
      },
      {
        title: "Full ACA Support",
        description:
          "From enrollment to claims, our team walks you through every step of the Affordable Care Act process.",
      },
    ],
    ctaTitle: "Get Covered Today",
    ctaText:
      "Call us or request a quote online. Our licensed agents will help you find the right health plan at no cost to you.",
    ctaButton: "Get a Health Quote",
  },
  es: {
    heroTitle: "Seguro Médico",
    heroSubtitle: "Seguro médico individual sin costo para usted",
    acaTitle: "Programas de la Ley de Cuidado de Salud Asequible",
    acaP1a:
      "Gracias a la Ley de Cuidado de Salud Asequible (ACA), millones de personas en EE. UU. califican para un seguro médico subsidiado o incluso gratuito.",
    acaP1b:
      "le ayuda a navegar el Mercado de Seguros Médicos para encontrar las mejores pólizas de salud que se ajusten a sus necesidades y presupuesto.",
    acaP2:
      "Nuestros agentes con licencia lo guían durante todo el proceso de inscripción sin ningún costo para usted. Las aseguradoras nos pagan directamente, así que usted recibe asesoría experta sin pagar un centavo de su bolsillo.",
    cards: [
      {
        title: "Sin Costo para Usted",
        description:
          "Nuestros servicios son completamente gratuitos. Las aseguradoras nos pagan directamente, así que usted no paga nada adicional.",
      },
      {
        title: "Las Mejores Pólizas",
        description:
          "Comparamos planes de todas las aseguradoras principales del Mercado para encontrar la cobertura que se ajuste a su vida.",
      },
      {
        title: "Apoyo Completo con ACA",
        description:
          "Desde la inscripción hasta las reclamaciones, nuestro equipo lo acompaña en cada paso del proceso de la Ley de Cuidado de Salud Asequible.",
      },
    ],
    ctaTitle: "Obtenga Cobertura Hoy",
    ctaText:
      "Llámenos o solicite una cotización en línea. Nuestros agentes con licencia le ayudarán a encontrar el plan de salud adecuado sin costo para usted.",
    ctaButton: "Cotizar Seguro Médico",
  },
};

// Icons for the three cards, in the same order as copy.*.cards.
const cardIcons = [DollarSign, ShieldCheck, HeartPulse];

export default function HealthInsurancePage() {
  const t = useT(copy);
  const lp = useLocalizePath();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-24 md:py-32">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${asset("/images/pattern.svg")})` }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 "
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
          >
            {t.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              {t.acaTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {t.acaP1a} {COMPANY.name} {t.acaP1b}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.acaP2}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cardIcons.map((Icon, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className={cn(
                  "bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center",
                  "hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                )}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t.cards[i].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.cards[i].description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={lp("/quotes")}
                className={cn(
                  "inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-gray-100 transition-colors"
                )}
              >
                {t.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.replace(/[^0-9]/g, "")}`}
                className={cn(
                  "inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-white/10 transition-colors"
                )}
              >
                <Phone className="w-5 h-5" />
                {COMPANY.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
