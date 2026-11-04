"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Building2, Key, Phone, ArrowRight } from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { useLang, useT, useLocalizePath } from "@/lib/useLang";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const policyCards = [
  {
    icon: Home,
    title: { en: "Homeowners Hazard", es: "Seguro de Propietario" },
    description: {
      en: "Covers your house against acts of God and all other perils. Protect your most valuable asset with comprehensive coverage from top-rated carriers.",
      es: "Protege su casa contra desastres naturales y todos los demás riesgos. Proteja su bien más valioso con una cobertura amplia de aseguradoras de primer nivel.",
    },
  },
  {
    icon: Building2,
    title: { en: "Landlord Insurance", es: "Seguro de Arrendador" },
    description: {
      en: "Same coverage as homeowners except personal property — designed specifically for investment properties and rental units.",
      es: "La misma cobertura que el seguro de propietario, excepto bienes personales; diseñado especialmente para propiedades de inversión y unidades de alquiler.",
    },
  },
  {
    icon: Key,
    title: { en: "Renters Insurance", es: "Seguro de Inquilino" },
    description: {
      en: "Covers your personal property while you rent. Affordable protection for your belongings, liability, and additional living expenses.",
      es: "Cubre sus bienes personales mientras alquila. Protección económica para sus pertenencias, responsabilidad civil y gastos adicionales de vivienda.",
    },
  },
];

const copy = {
  en: {
    heroTitle: "Home Insurance",
    heroSubtitle: "Best-in-class home quote comparisons",
    ctaTitle: "Get Your Home Insurance Quote",
    ctaBody:
      "Let us compare rates for you and find the best coverage for your home. It only takes a few minutes.",
    ctaButton: "Get Your Home Quote",
    coverageTitle: "Coverage for Every Home Situation",
    coverageBefore: "Whether you own, rent, or invest in property, ",
    coverageAfter:
      " has the right policy for you. We compare rates across multiple carriers to make sure you get the best coverage at the best price.",
    techTitle: "Smarter Quoting Technology",
    techBody1:
      "We use advanced quoting technology and automated systems to compare rates across dozens of carriers in real time. Our platform identifies discounts, bundling opportunities, and coverage gaps so you never miss a chance to save.",
    techBody2:
      "From wind mitigation credits to multi-policy discounts, our team ensures every available savings is applied to your quote.",
  },
  es: {
    heroTitle: "Seguro de Hogar",
    heroSubtitle: "Comparación de cotizaciones de hogar de primer nivel",
    ctaTitle: "Obtenga su Cotización de Seguro de Hogar",
    ctaBody:
      "Permítanos comparar tarifas por usted y encontrar la mejor cobertura para su hogar. Solo toma unos minutos.",
    ctaButton: "Cotice su Seguro de Hogar",
    coverageTitle: "Cobertura para Cada Situación de Vivienda",
    coverageBefore: "Ya sea propietario, inquilino o inversionista, ",
    coverageAfter:
      " tiene la póliza adecuada para usted. Comparamos tarifas entre varias aseguradoras para asegurarnos de que obtenga la mejor cobertura al mejor precio.",
    techTitle: "Tecnología de Cotización Más Inteligente",
    techBody1:
      "Utilizamos tecnología de cotización avanzada y sistemas automatizados para comparar tarifas entre decenas de aseguradoras en tiempo real. Nuestra plataforma identifica descuentos, oportunidades de combinar pólizas y brechas de cobertura para que nunca pierda la oportunidad de ahorrar.",
    techBody2:
      "Desde créditos por mitigación de viento hasta descuentos por múltiples pólizas, nuestro equipo se asegura de aplicar todos los ahorros disponibles a su cotización.",
  },
};

export default function HomeInsurancePage() {
  const t = useT(copy);
  const lang = useLang();
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

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.ctaBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={lp("/home-insurance/form")}
                className="btn-silver-3d inline-flex items-center gap-2 px-8 py-4 rounded-full text-primary-900 font-semibold text-lg transition-all duration-300"
              >
                {t.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.replace(/[^0-9]/g, "")}`}
                className={cn(
                  "inline-flex items-center gap-2 border-2 border-primary-900 text-primary-900 px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-primary-50 transition-colors"
                )}
              >
                <Phone className="w-5 h-5" />
                {COMPANY.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Cards */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-900 to-primary-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t.coverageTitle}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              {t.coverageBefore}
              {COMPANY.name}
              {t.coverageAfter}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {policyCards.map((card, i) => (
              <motion.div
                key={card.title.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className={cn(
                  "bg-white/10 rounded-2xl p-8 border border-white/20 text-center",
                  "hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
                )}
              >
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {card.title[lang]}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {card.description[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              {t.techTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              {t.techBody1}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.techBody2}
            </p>
          </motion.div>
        </div>
      </section>


    </>
  );
}
