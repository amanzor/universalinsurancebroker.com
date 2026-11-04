"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Truck,
  Briefcase,
  ChefHat,
  HardHat,
  Shield,
  Building,
  Wrench,
  Umbrella,
  Phone,
  ArrowRight,
  FileCheck,
} from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { useLang, useT, useLocalizePath } from "@/lib/useLang";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

// Products a client can buy / quote entirely online.
// Add another object here to drop a new tile + button into the "Get Your
// Business Insured Online Now!" grid — no other changes needed.
const onlineProducts = [
  {
    icon: Shield,
    title: { en: "General Liability", es: "Responsabilidad General" },
    description: {
      en: "Powered by Coterie Insurance — get a fast, affordable General Liability quote online in minutes.",
      es: "Con la tecnología de Coterie Insurance — obtenga en minutos una cotización de Responsabilidad General rápida y económica en línea.",
    },
    buttonLabel: { en: "Coterie Insurance", es: "Coterie Insurance" },
    href: "https://app.coterieinsurance.com/quote?p=universalinsurancebroker%40gmail.com",
  },
  {
    icon: FileCheck,
    title: { en: "Surety & Fidelity Bonds", es: "Fianzas de Garantía y Fidelidad" },
    description: {
      en: "Powered by Propeller — apply and get your bond issued in minutes, with the widest selection of instant-issue bonds on the market.",
      es: "Con la tecnología de Propeller — solicite y obtenga su fianza emitida en minutos, con la mayor selección de fianzas de emisión inmediata del mercado.",
    },
    buttonLabel: { en: "Bond Quote/Purchase", es: "Cotizar/Comprar Fianza" },
    href: "https://universalbrokers.propeller.insure/axelerator-public/",
  },
];

const policyTypes = [
  {
    icon: Truck,
    title: { en: "Commercial Auto & Fleet", es: "Auto Comercial y Flotas" },
    description: {
      en: "Any type of commercial auto, fleet and non-fleet with no experience requirement. Only A-rated carriers for fleets.",
      es: "Cualquier tipo de auto comercial, con o sin flota, sin requisito de experiencia. Solo aseguradoras con calificación A para flotas.",
    },
  },
  {
    icon: Briefcase,
    title: { en: "Professional Liability", es: "Responsabilidad Profesional" },
    description: {
      en: "Doctors malpractice, Errors & Omissions, and all professional liabilities with top-rated carriers.",
      es: "Negligencia médica, Errores y Omisiones (E&O) y todo tipo de responsabilidad profesional con aseguradoras de primer nivel.",
    },
  },
  {
    icon: ChefHat,
    title: { en: "Restaurants & Bars", es: "Restaurantes y Bares" },
    description: {
      en: "Liquor liability and full commercial package policies at the lowest rates.",
      es: "Responsabilidad por venta de alcohol y pólizas comerciales completas con las tarifas más bajas.",
    },
  },
  {
    icon: HardHat,
    title: { en: "Workers Compensation", es: "Compensación Laboral" },
    description: {
      en: "Available for every occupation with flexible pay plans. Can merge with ADP payroll.",
      es: "Disponible para todas las ocupaciones con planes de pago flexibles. Se puede integrar con la nómina de ADP.",
    },
  },
  {
    icon: Shield,
    title: { en: "General Liability", es: "Responsabilidad General" },
    description: {
      en: "Instant quotes from Hiscox and Next Insurance.",
      es: "Cotizaciones instantáneas de Hiscox y Next Insurance.",
    },
  },
  {
    icon: Building,
    title: { en: "Commercial Property", es: "Propiedad Comercial" },
    description: {
      en: "Package or standalone policies. Dedicated team for large accounts.",
      es: "Pólizas combinadas o independientes. Equipo dedicado para cuentas grandes.",
    },
  },
  {
    icon: Wrench,
    title: { en: "Contractors Equipment", es: "Equipo de Contratistas" },
    description: {
      en: "Floater policies for all tools and equipment covering job sites and vehicles.",
      es: "Pólizas flotantes para todas sus herramientas y equipos, con cobertura en obras y vehículos.",
    },
  },
  {
    icon: Umbrella,
    title: { en: "Umbrella Policies", es: "Pólizas Paraguas" },
    description: {
      en: "Personal and commercial umbrellas with the nation's largest umbrella carrier.",
      es: "Pólizas paraguas personales y comerciales con la aseguradora de pólizas paraguas más grande del país.",
    },
  },
  {
    icon: Building2,
    title: { en: "Car Dealer Insurance", es: "Seguro para Concesionarios" },
    description: {
      en: "Garage keeper and bond available with 100+ carriers including A+ to B rated options.",
      es: "Cobertura de garage keeper y fianzas disponibles con más de 100 aseguradoras, con opciones de calificación A+ a B.",
    },
  },
];

const copy = {
  en: {
    heroTitle: "Commercial & Business Insurance",
    heroSubtitle:
      "Comprehensive coverage for every type of business — from startups to established enterprises",
    ctaTitle: "Protect Your Business Today",
    ctaText:
      "Our commercial lines team will build a custom insurance package for your business. Get started with a free consultation.",
    ctaButton: "Get a Commercial Quote",
    onlineTitle: "Get Your Business Insured Online Now!",
    onlineText:
      "Buy coverage directly online — fast quotes, instant issue, no waiting. Choose a product below to get started in minutes.",
    linesTitle: "Our Commercial Lines",
    linesText:
      "provides tailored commercial insurance solutions for businesses of all sizes. Explore our coverage options below.",
  },
  es: {
    heroTitle: "Seguros Comerciales y para Negocios",
    heroSubtitle:
      "Cobertura integral para todo tipo de negocio — desde empresas nuevas hasta compañías establecidas",
    ctaTitle: "Proteja su Negocio Hoy",
    ctaText:
      "Nuestro equipo de líneas comerciales diseñará un paquete de seguros a la medida de su negocio. Comience con una consulta gratuita.",
    ctaButton: "Cotizar Seguro Comercial",
    onlineTitle: "¡Asegure su Negocio en Línea Ahora!",
    onlineText:
      "Compre su cobertura directamente en línea — cotizaciones rápidas, emisión inmediata, sin esperas. Elija un producto a continuación y comience en minutos.",
    linesTitle: "Nuestras Líneas Comerciales",
    linesText:
      "ofrece soluciones de seguros comerciales a la medida para negocios de todos los tamaños. Explore nuestras opciones de cobertura a continuación.",
  },
};

export default function CommercialInsurancePage() {
  const lang = useLang();
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
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 ">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={lp("/quotes")}
                className={cn(
                  "inline-flex items-center gap-2 bg-primary-900 text-white px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-primary-800 transition-colors"
                )}
              >
                {t.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.replace(/[^0-9]/g, "")}`}
                className={cn(
                  "inline-flex items-center gap-2 border-2 border-primary-900/30 text-primary-900 px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-primary-900/5 transition-colors"
                )}
              >
                <Phone className="w-5 h-5" />
                {COMPANY.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Buy Online — merged General Liability + Bonds */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950">
        {/* decorative glow accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary-400/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t.onlineTitle}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t.onlineText}
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {onlineProducts.map((product, i) => (
              <motion.div
                key={product.title.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex w-full flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-lg backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10 sm:w-[340px]"
              >
                <div className="silver-icon-3d mb-5 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <product.icon className="h-8 w-8 text-primary-900" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  {product.title[lang]}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                  {product.description[lang]}
                </p>
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-silver-3d mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-primary-900 transition-all duration-300"
                >
                  {product.buttonLabel[lang]}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Types Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t.linesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {COMPANY.name} {t.linesText}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {policyTypes.map((policy, i) => (
              <motion.div
                key={policy.title.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className={cn(
                  "bg-white rounded-2xl shadow-lg p-8 border border-gray-100",
                  "hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                )}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                  <policy.icon className="w-7 h-7 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {policy.title[lang]}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {policy.description[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
