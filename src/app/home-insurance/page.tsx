"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Key,
  Phone,
  ArrowRight,
  Wind,
  Waves,
  Mountain,
  ClipboardCheck,
  Search,
  ShieldCheck,
  PiggyBank,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { useLang, useT, useLocalizePath } from "@/lib/useLang";
import { faq } from "@/lib/content/home-insurance";

// The intro right below the hero is on screen at load: animate it on mount
// from partly visible so it paints before hydration (better LCP).
const introFade = {
  hidden: { opacity: 0.25, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

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

/* Long-form guide content (added below the original sections). */
const guide = {
  en: {
    floridaTitle: "Insuring a Home in Florida",
    floridaIntro:
      "Florida homes face risks that many other states don't, and policies here are built around them. Before you compare quotes, it helps to understand a few things that work differently in Florida.",
    floridaItems: [
      {
        title: "Hurricanes and windstorms",
        body: "Most Florida homeowners policies include a separate hurricane deductible. Instead of a flat dollar amount, it is often a percentage of your dwelling coverage, so the amount you would pay after a hurricane claim can be noticeably higher than your regular deductible. Ask how the deductible is calculated when you compare quotes.",
      },
      {
        title: "Flood is usually a separate policy",
        body: "Standard homeowners policies generally don't cover flood damage, including storm surge. Flood coverage is typically bought separately through the National Flood Insurance Program (NFIP) or a private flood carrier. NFIP policies typically have a 30-day waiting period, so it pays to plan ahead rather than wait for hurricane season.",
      },
      {
        title: "Sinkholes and ground collapse",
        body: "Parts of Florida are prone to sinkholes. Policies may address catastrophic ground cover collapse differently from broader sinkhole damage, and broader coverage may be optional or limited depending on the carrier and location. If this is a concern where you live, ask an agent to explain what a policy does and doesn't include.",
      },
    ],
    inspectTitle: "Inspections That Can Affect Your Premium",
    inspectIntro:
      "In Florida, a home's construction and condition play a big role in which carriers will offer coverage and what it costs. These are the reports and details carriers most often ask about.",
    inspectItems: [
      {
        title: "Wind mitigation inspection",
        body: "Documents features that help your home resist wind, such as roof-to-wall connections, roof shape, and protection for windows and doors. Many carriers can apply premium credits based on the results.",
      },
      {
        title: "4-point inspection",
        body: "Many carriers request this for older homes. It reviews the roof, electrical, plumbing, and heating/air conditioning systems. Requirements vary by carrier and home age.",
      },
      {
        title: "Roof age and condition",
        body: "Roof age and condition strongly affect eligibility and price. An older or worn roof can limit your options, while a newer roof may open up more carriers.",
      },
    ],
    typesTitle: "Which Policy Fits Your Home?",
    typesIntro:
      "The coverage cards above group our most common home policies. Here is how they line up with the policy forms you may see on a quote:",
    types: [
      {
        code: "HO-3",
        title: "Homeowners",
        body: "For owner-occupied single-family homes. Generally covers the structure, your belongings, personal liability, and additional living expenses if a covered loss forces you to move out temporarily.",
      },
      {
        code: "HO-6",
        title: "Condo",
        body: "For condo owners. Usually covers the parts of your unit that the association's master policy doesn't, plus your belongings and liability. Your association documents help determine how much you need.",
      },
      {
        code: "HO-4",
        title: "Renters",
        body: "For tenants. Covers your personal property and liability, and often additional living expenses. Your landlord's policy generally doesn't cover your belongings.",
      },
      {
        code: "DP-3",
        title: "Landlord / dwelling",
        body: "For homes you rent out. Designed for the building and your liability as the owner, rather than a tenant's belongings.",
      },
    ],
    optionsTitle: "When Coverage Is Hard to Find, and Ways to Save",
    optionsIntro:
      "Some Florida homeowners have received non-renewal notices or seen carriers stop writing new policies. You still have options.",
    optionsSubtitle: "Your options",
    optionsItems: [
      "As an independent broker, we shop your home with many carriers at once instead of just one.",
      "If private-market options are limited, Citizens Property Insurance is Florida's state-backed insurer of last resort. Eligibility rules apply, and we can help you understand them.",
      "If you get a non-renewal notice, contact us right away so there is time to compare options before your policy ends.",
    ],
    saveSubtitle: "Ways you may be able to save",
    saveItems: [
      "Bundling your home and auto policies with the same carrier",
      "Submitting a current wind mitigation report",
      "Monitored security, fire, or water-leak devices, where the carrier offers a credit",
      "Choosing a higher deductible, if it fits your budget",
      "Updating or replacing an older roof",
    ],
    saveNote:
      "Available discounts vary by carrier and policy, and our team checks which ones apply to you.",
    readyTitle: "What to Have Ready for Your Quote",
    readyIntro:
      "Having these details on hand helps us compare carriers faster and more accurately. If you don't have everything, that's okay. Share what you can and we'll help with the rest.",
    readyItems: [
      "Property address",
      "Year the home was built",
      "Year the roof was installed or replaced, and roof type",
      "Approximate square footage",
      "Current or prior insurance and renewal date",
      "Wind mitigation and/or 4-point inspection reports, if you have them",
    ],
    readyOffices:
      "We help homeowners throughout Florida, with offices in Boca Raton, Lehigh Acres, Homestead, and Hialeah, and our team speaks English and Spanish.",
    readyButton: "Start Your Home Quote",
    faqTitle: "Common Questions",
    faqIntro: "Quick answers about home insurance in Florida.",
    faqMoreBefore: "Have another question? Visit our ",
    faqMoreLink: "FAQ page",
    faqMoreAfter: " or give us a call.",
  },
  es: {
    floridaTitle: "Cómo Asegurar una Casa en Florida",
    floridaIntro:
      "Las casas en Florida enfrentan riesgos que muchos otros estados no tienen, y las pólizas aquí están diseñadas en función de ellos. Antes de comparar cotizaciones, conviene entender algunos aspectos que funcionan de manera diferente en Florida.",
    floridaItems: [
      {
        title: "Huracanes y tormentas de viento",
        body: "La mayoría de las pólizas de propietario en Florida incluyen un deducible separado por huracán. En lugar de una cantidad fija en dólares, a menudo es un porcentaje de su cobertura de vivienda, por lo que lo que tendría que pagar después de una reclamación por huracán puede ser bastante mayor que su deducible regular. Pregunte cómo se calcula el deducible al comparar cotizaciones.",
      },
      {
        title: "La inundación suele ser una póliza aparte",
        body: "Las pólizas de propietario estándar generalmente no cubren daños por inundación, incluida la marejada ciclónica. La cobertura contra inundaciones normalmente se compra por separado a través del Programa Nacional de Seguro contra Inundaciones (NFIP) o de una aseguradora privada. Las pólizas del NFIP normalmente tienen un período de espera de 30 días, así que vale la pena planificar con tiempo en lugar de esperar a la temporada de huracanes.",
      },
      {
        title: "Sumideros y colapso del terreno",
        body: "Algunas zonas de Florida son propensas a los sumideros (sinkholes). Las pólizas pueden tratar el colapso catastrófico del terreno de forma distinta a los daños más amplios por sumideros, y la cobertura más amplia puede ser opcional o limitada según la aseguradora y la ubicación. Si esto le preocupa en su zona, pida a un agente que le explique lo que una póliza incluye y lo que no.",
      },
    ],
    inspectTitle: "Inspecciones que Pueden Afectar su Prima",
    inspectIntro:
      "En Florida, la construcción y el estado de una casa influyen mucho en qué aseguradoras ofrecen cobertura y en su costo. Estos son los informes y datos que las aseguradoras piden con más frecuencia.",
    inspectItems: [
      {
        title: "Inspección de mitigación de viento",
        body: "Documenta las características que ayudan a su casa a resistir el viento, como las conexiones entre el techo y las paredes, la forma del techo y la protección de ventanas y puertas. Muchas aseguradoras pueden aplicar créditos a la prima según los resultados.",
      },
      {
        title: "Inspección de 4 puntos",
        body: "Muchas aseguradoras la piden para casas más antiguas. Revisa el techo, el sistema eléctrico, la plomería y la calefacción/aire acondicionado. Los requisitos varían según la aseguradora y la antigüedad de la casa.",
      },
      {
        title: "Antigüedad y estado del techo",
        body: "La antigüedad y el estado del techo afectan mucho la elegibilidad y el precio. Un techo viejo o deteriorado puede limitar sus opciones, mientras que un techo más nuevo puede abrirle las puertas a más aseguradoras.",
      },
    ],
    typesTitle: "¿Qué Póliza se Ajusta a su Hogar?",
    typesIntro:
      "Las tarjetas de cobertura de arriba agrupan nuestras pólizas de hogar más comunes. Así se relacionan con los tipos de póliza que puede ver en una cotización:",
    types: [
      {
        code: "HO-3",
        title: "Propietario",
        body: "Para casas unifamiliares ocupadas por su dueño. Generalmente cubre la estructura, sus pertenencias, su responsabilidad civil personal y los gastos de vida adicionales si un siniestro cubierto le obliga a mudarse temporalmente.",
      },
      {
        code: "HO-6",
        title: "Condominio",
        body: "Para dueños de condominios. Normalmente cubre las partes de su unidad que la póliza maestra de la asociación no cubre, además de sus pertenencias y su responsabilidad civil. Los documentos de su asociación ayudan a determinar cuánta cobertura necesita.",
      },
      {
        code: "HO-4",
        title: "Inquilino",
        body: "Para inquilinos. Cubre sus bienes personales y su responsabilidad civil, y a menudo los gastos de vida adicionales. La póliza del dueño generalmente no cubre sus pertenencias.",
      },
      {
        code: "DP-3",
        title: "Arrendador / vivienda",
        body: "Para casas que usted alquila. Diseñada para el edificio y su responsabilidad civil como dueño, no para las pertenencias de un inquilino.",
      },
    ],
    optionsTitle: "Cuando es Difícil Encontrar Cobertura, y Formas de Ahorrar",
    optionsIntro:
      "Algunos propietarios en Florida han recibido avisos de no renovación o han visto aseguradoras dejar de emitir pólizas nuevas. Usted todavía tiene opciones.",
    optionsSubtitle: "Sus opciones",
    optionsItems: [
      "Como corredor independiente, cotizamos su casa con muchas aseguradoras a la vez, no solo con una.",
      "Si las opciones en el mercado privado son limitadas, Citizens Property Insurance es la aseguradora de último recurso respaldada por el estado de Florida. Tiene requisitos de elegibilidad, y podemos ayudarle a entenderlos.",
      "Si recibe un aviso de no renovación, comuníquese con nosotros de inmediato para que haya tiempo de comparar opciones antes de que termine su póliza.",
    ],
    saveSubtitle: "Formas en que podría ahorrar",
    saveItems: [
      "Combinar sus pólizas de hogar y auto con la misma aseguradora",
      "Presentar un informe de mitigación de viento vigente",
      "Dispositivos monitoreados de seguridad, incendio o detección de fugas de agua, cuando la aseguradora ofrece un crédito",
      "Elegir un deducible más alto, si se ajusta a su presupuesto",
      "Actualizar o reemplazar un techo antiguo",
    ],
    saveNote:
      "Los descuentos disponibles varían según la aseguradora y la póliza, y nuestro equipo revisa cuáles aplican en su caso.",
    readyTitle: "Qué Tener a Mano para su Cotización",
    readyIntro:
      "Tener estos datos a mano nos ayuda a comparar aseguradoras de forma más rápida y precisa. Si no tiene todo, no se preocupe. Compártanos lo que pueda y le ayudaremos con el resto.",
    readyItems: [
      "Dirección de la propiedad",
      "Año de construcción de la casa",
      "Año en que se instaló o reemplazó el techo, y tipo de techo",
      "Área aproximada en pies cuadrados",
      "Seguro actual o anterior y fecha de renovación",
      "Informes de mitigación de viento y/o de inspección de 4 puntos, si los tiene",
    ],
    readyOffices:
      "Ayudamos a propietarios en toda Florida, con oficinas en Boca Raton, Lehigh Acres, Homestead y Hialeah, y nuestro equipo habla español e inglés.",
    readyButton: "Comience su Cotización de Hogar",
    faqTitle: "Preguntas Frecuentes",
    faqIntro: "Respuestas rápidas sobre el seguro de hogar en Florida.",
    faqMoreBefore: "¿Tiene otra pregunta? Visite nuestra ",
    faqMoreLink: "página de preguntas frecuentes",
    faqMoreAfter: " o llámenos.",
  },
};

function FaqItem({ id, question, answer }: { id: string; question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-5 text-left transition hover:text-primary-700"
        >
          <span className="text-lg font-medium text-primary-900 pr-4">{question}</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 flex-shrink-0 text-primary-500 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </h3>
      <div id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} hidden={!isOpen}>
        <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function HomeInsurancePage() {
  const t = useT(copy);
  const lang = useLang();
  const lp = useLocalizePath();
  const g = useT(guide);
  const faqItems = faq[lang];
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
            initial={{ opacity: 0.25, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 "
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0.25, y: 10 }}
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
            animate="visible"
            variants={introFade}
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

      {/* Insuring a Home in Florida */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {g.floridaTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{g.floridaIntro}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {g.floridaItems.map((item, i) => {
              const Icon = [Wind, Waves, Mountain][i];
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i + 1}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-primary-800" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inspections */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              {g.inspectTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{g.inspectIntro}</p>
          </motion.div>
          <div className="space-y-6">
            {g.inspectItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className="flex gap-4 sm:gap-6 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardCheck className="w-6 h-6 text-primary-800" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Types */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {g.typesTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{g.typesIntro}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {g.types.map((type, i) => (
              <motion.div
                key={type.code}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-primary-900 px-3 py-1 text-sm font-semibold text-white">
                    {type.code}
                  </span>
                  <h3 className="text-xl font-bold text-primary-900">{type.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{type.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hard-to-find coverage & savings */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              {g.optionsTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{g.optionsIntro}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-primary-800" />
                </div>
                <h3 className="text-xl font-bold text-primary-900">{g.optionsSubtitle}</h3>
              </div>
              <ul className="space-y-4">
                {g.optionsItems.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-600 leading-relaxed">
                    <ShieldCheck className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={2}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PiggyBank className="w-6 h-6 text-primary-800" />
                </div>
                <h3 className="text-xl font-bold text-primary-900">{g.saveSubtitle}</h3>
              </div>
              <ul className="space-y-3">
                {g.saveItems.map((item) => (
                  <li key={item} className="flex gap-3 text-gray-600 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-gray-500 leading-relaxed">{g.saveNote}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What to have ready */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {g.readyTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{g.readyIntro}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200"
          >
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {g.readyItems.map((item) => (
                <li key={item} className="flex gap-3 text-gray-700 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={2}
            className="mt-10 text-center"
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{g.readyOffices}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={lp("/home-insurance/form")}
                className="btn-silver-3d inline-flex items-center gap-2 px-8 py-4 rounded-full text-primary-900 font-semibold text-lg transition-all duration-300"
              >
                {g.readyButton}
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

      {/* Common questions */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-4">
              {g.faqTitle}
            </h2>
            <p className="text-lg text-gray-600">{g.faqIntro}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="bg-white rounded-2xl px-6 sm:px-8 border border-gray-200 shadow-sm"
          >
            {faqItems.map((item, i) => (
              <FaqItem key={i} id={`home-faq-${i}`} question={item.q} answer={item.a} />
            ))}
          </motion.div>
          <p className="mt-8 text-center text-gray-600">
            {g.faqMoreBefore}
            <Link
              href={lp("/faq")}
              className="font-semibold text-primary-800 underline underline-offset-4 hover:text-primary-900"
            >
              {g.faqMoreLink}
            </Link>
            {g.faqMoreAfter}
          </p>
        </div>
      </section>


    </>
  );
}
