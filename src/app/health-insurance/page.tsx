"use client";

import { useState } from "react";
import Link from "next/link";
import RelatedGuides from "@/components/RelatedGuides";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Phone,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  CalendarDays,
  CalendarClock,
  Info,
  CheckCircle2,
  Search,
  FileCheck,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { useT, useLang, useLocalizePath } from "@/lib/useLang";
import { faq } from "@/lib/content/health-insurance";

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
    enrollTitle: "When You Can Enroll",
    enrollIntro:
      "For most people, individual health insurance through the Marketplace can only be bought at certain times of year. Knowing these windows helps you avoid a gap in coverage.",
    enrollCards: [
      {
        title: "Open Enrollment",
        text: "In Florida, Open Enrollment for Marketplace plans through HealthCare.gov starts on November 1. Enroll by December 15 to have coverage starting January 1, and check HealthCare.gov for this year's final deadline, since the dates have changed in recent years. This is when anyone can sign up for a new plan, switch plans, or update their current coverage for the coming year, so we recommend not waiting until the last week.",
      },
      {
        title: "Special Enrollment Periods",
        text: "Outside of Open Enrollment, you may still be able to enroll if you have a qualifying life event. These windows are limited in time, and you may be asked for documents that show the event happened.",
        listLabel: "Common qualifying life events include:",
        list: [
          "Moving to a new area, such as relocating to Florida",
          "Losing other health coverage, such as a job-based plan",
          "Getting married",
          "Having or adopting a baby",
        ],
      },
    ],
    helpTitle: "Who May Qualify for Financial Help",
    helpP1:
      "The Marketplace offers premium tax credits (often called subsidies) that can lower what you pay each month for a plan. Whether you qualify, and how much help you receive, depends mainly on your household size and your estimated income for the year you will be covered.",
    helpP2:
      "The tax credit can generally be applied to your premium each month. Because it is based on an estimate, it is important to report income or household changes during the year; the amount is reconciled when you file your federal tax return. Depending on income, some people may pay little or nothing for certain plans.",
    helpNoteTitle: "“Zero cost to you” means our service",
    helpNoteText:
      "Our help comparing plans and enrolling is free because carriers pay us. That is separate from the price of the plan itself. Your monthly premium, after any tax credit, plus costs like deductibles and copays, depend on the plan you choose and your eligibility.",
    plansTitle: "Understanding Your Plan Options",
    plansIntro:
      "Marketplace plans all cover essential health benefits, but they differ in how you share costs with the insurer and which doctors you can see.",
    tiersTitle: "Metal tiers",
    tiers: [
      { name: "Bronze", text: "Usually the lowest monthly premium, with higher costs when you get care." },
      { name: "Silver", text: "A middle option. Depending on income, Silver plans may come with extra savings on out-of-pocket costs." },
      { name: "Gold", text: "Higher monthly premium, with lower costs when you get care." },
      { name: "Platinum", text: "Usually the highest premium and the lowest costs when you get care, where available." },
    ],
    termsTitle: "Key terms",
    terms: [
      { term: "Premium", text: "What you pay each month to keep your plan active." },
      { term: "Deductible", text: "What you generally pay for covered services before the plan starts paying its share." },
      { term: "Copay and coinsurance", text: "Your share of the cost for a visit or service, as a flat amount or a percentage." },
      { term: "Out-of-pocket maximum", text: "The most you would pay for covered in-network care in a plan year; after that, the plan generally pays 100%." },
    ],
    networksTitle: "Networks: HMO, EPO, and PPO",
    networks: [
      { term: "HMO", text: "Generally covers care only from in-network providers (except emergencies) and may require a referral to see a specialist." },
      { term: "EPO", text: "Generally covers in-network care only (except emergencies), often without referrals." },
      { term: "PPO", text: "Generally lets you see out-of-network providers too, usually at a higher cost." },
    ],
    networksNote:
      "Before you choose, check that your doctors, hospitals, and prescriptions are covered by the plan. We can help you look them up.",
    readyTitle: "What to Have Ready",
    readyIntro:
      "Having this information on hand makes the process faster, whether you call us or visit one of our offices.",
    readyList: [
      "Your household size and who in the household needs coverage",
      "An estimate of your household income for the year you want coverage",
      "Your ZIP code and home address",
      "Dates of birth, and Social Security numbers for household members who have them",
      "A list of your current doctors and the prescriptions you take",
      "If you are not a U.S. citizen, immigration documents for each person applying",
      "Information about any job-based coverage offered to anyone in the household",
    ],
    howTitle: "How We Help Florida Families",
    howIntro:
      "Choosing a health plan can feel overwhelming. Our licensed agents work with individuals and families across Florida, from Boca Raton and Hialeah to Homestead and Lehigh Acres, and we serve clients in English and Spanish.",
    howList: [
      { title: "Compare plans", text: "We review the plans available in your area side by side, looking at premiums, deductibles, networks, and drug coverage." },
      { title: "Enroll", text: "We help you complete your application and choose a plan that fits your needs and budget." },
      { title: "Support after enrollment", text: "Plans and prices can change each year. We help with renewals, report life changes, and answer questions along the way." },
    ],
    howFree: "All of this is at no cost to you.",
    howLinkLead: "Ready to talk?",
    howLink: "Contact our team",
    faqTitle: "Common Questions",
    faqMoreLead: "Have more questions about insurance?",
    faqMoreLink: "See our full FAQ",
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
    enrollTitle: "Cuándo Puede Inscribirse",
    enrollIntro:
      "Para la mayoría de las personas, el seguro médico individual del Mercado solo se puede comprar en ciertas épocas del año. Conocer estos períodos le ayuda a evitar quedarse sin cobertura.",
    enrollCards: [
      {
        title: "Inscripción Abierta",
        text: "En Florida, la Inscripción Abierta para los planes del Mercado a través de HealthCare.gov empieza el 1 de noviembre. Inscríbase a más tardar el 15 de diciembre para tener cobertura desde el 1 de enero, y revise HealthCare.gov para conocer la fecha límite final de este año, ya que las fechas han cambiado en los últimos años. En este período cualquier persona puede inscribirse en un plan nuevo, cambiar de plan o actualizar su cobertura para el próximo año, así que le recomendamos no esperar a la última semana.",
      },
      {
        title: "Períodos de Inscripción Especial",
        text: "Fuera de la Inscripción Abierta, es posible que pueda inscribirse si tiene un evento de vida que califica. Estos períodos tienen un tiempo limitado, y es posible que le pidan documentos que demuestren que el evento ocurrió.",
        listLabel: "Algunos eventos de vida que califican son:",
        list: [
          "Mudarse a una nueva zona, por ejemplo, trasladarse a Florida",
          "Perder otra cobertura médica, como un plan del empleador",
          "Casarse",
          "Tener o adoptar un bebé",
        ],
      },
    ],
    helpTitle: "Quién Puede Calificar para Ayuda Financiera",
    helpP1:
      "El Mercado ofrece créditos fiscales para las primas (conocidos como subsidios) que pueden reducir lo que usted paga cada mes por un plan. Si califica, y cuánta ayuda recibe, depende principalmente del tamaño de su hogar y de sus ingresos estimados para el año en que tendrá cobertura.",
    helpP2:
      "Por lo general, el crédito fiscal se puede aplicar a su prima cada mes. Como se basa en un estimado, es importante reportar cambios de ingresos o en su hogar durante el año; el monto se concilia al presentar su declaración de impuestos federales. Según sus ingresos, algunas personas pueden pagar poco o nada por ciertos planes.",
    helpNoteTitle: "“Sin costo para usted” se refiere a nuestro servicio",
    helpNoteText:
      "Nuestra ayuda para comparar planes e inscribirse es gratuita porque las aseguradoras nos pagan. Eso es distinto del precio del plan en sí. Su prima mensual, después de cualquier crédito fiscal, y gastos como deducibles y copagos, dependen del plan que elija y de su elegibilidad.",
    plansTitle: "Cómo Entender sus Opciones de Planes",
    plansIntro:
      "Todos los planes del Mercado cubren los beneficios de salud esenciales, pero se diferencian en cómo usted comparte los costos con la aseguradora y en qué médicos puede ver.",
    tiersTitle: "Categorías metálicas",
    tiers: [
      { name: "Bronce", text: "Por lo general, la prima mensual más baja, con costos más altos cuando recibe atención." },
      { name: "Plata", text: "Una opción intermedia. Según sus ingresos, los planes Plata pueden incluir ahorros adicionales en gastos de bolsillo." },
      { name: "Oro", text: "Prima mensual más alta, con costos más bajos cuando recibe atención." },
      { name: "Platino", text: "Por lo general, la prima más alta y los costos más bajos cuando recibe atención, donde esté disponible." },
    ],
    termsTitle: "Términos clave",
    terms: [
      { term: "Prima", text: "Lo que paga cada mes para mantener su plan activo." },
      { term: "Deducible", text: "Lo que generalmente paga por servicios cubiertos antes de que el plan empiece a pagar su parte." },
      { term: "Copago y coseguro", text: "Su parte del costo de una consulta o servicio, como una cantidad fija o un porcentaje." },
      { term: "Gasto máximo de bolsillo", text: "Lo máximo que pagaría por atención cubierta dentro de la red en un año del plan; después de eso, el plan generalmente paga el 100%." },
    ],
    networksTitle: "Redes: HMO, EPO y PPO",
    networks: [
      { term: "HMO", text: "Generalmente cubre atención solo con proveedores dentro de la red (excepto emergencias) y puede requerir un referido para ver a un especialista." },
      { term: "EPO", text: "Generalmente cubre solo atención dentro de la red (excepto emergencias), a menudo sin referidos." },
      { term: "PPO", text: "Generalmente le permite ver también a proveedores fuera de la red, por lo regular a un costo más alto." },
    ],
    networksNote:
      "Antes de elegir, verifique que sus médicos, hospitales y medicamentos recetados estén cubiertos por el plan. Podemos ayudarle a buscarlos.",
    readyTitle: "Qué Debe Tener a Mano",
    readyIntro:
      "Tener esta información a mano agiliza el proceso, ya sea que nos llame o visite una de nuestras oficinas.",
    readyList: [
      "El tamaño de su hogar y quiénes en el hogar necesitan cobertura",
      "Un estimado de los ingresos de su hogar para el año en que desea cobertura",
      "Su código postal y dirección",
      "Fechas de nacimiento, y números de Seguro Social de los miembros del hogar que los tengan",
      "Una lista de sus médicos actuales y los medicamentos recetados que toma",
      "Si no es ciudadano de EE. UU., documentos de inmigración de cada persona que solicita",
      "Información sobre cualquier cobertura del empleador ofrecida a alguien en el hogar",
    ],
    howTitle: "Cómo Ayudamos a las Familias de Florida",
    howIntro:
      "Elegir un plan de salud puede parecer abrumador. Nuestros agentes con licencia trabajan con personas y familias en toda Florida, desde Boca Raton y Hialeah hasta Homestead y Lehigh Acres, y atendemos a clientes en inglés y en español.",
    howList: [
      { title: "Comparamos planes", text: "Revisamos lado a lado los planes disponibles en su zona, considerando primas, deducibles, redes y cobertura de medicamentos." },
      { title: "Lo inscribimos", text: "Le ayudamos a completar su solicitud y a elegir un plan que se ajuste a sus necesidades y presupuesto." },
      { title: "Apoyo después de la inscripción", text: "Los planes y los precios pueden cambiar cada año. Le ayudamos con las renovaciones, a reportar cambios de vida y a resolver sus dudas en el camino." },
    ],
    howFree: "Todo esto, sin costo para usted.",
    howLinkLead: "¿Listo para hablar?",
    howLink: "Comuníquese con nuestro equipo",
    faqTitle: "Preguntas Frecuentes",
    faqMoreLead: "¿Tiene más preguntas sobre seguros?",
    faqMoreLink: "Vea todas nuestras preguntas frecuentes",
  },
};

// Icons for the three cards, in the same order as copy.*.cards.
const cardIcons = [DollarSign, ShieldCheck, HeartPulse];

// Icons for the enrollment cards and "How we help" steps, in copy order.
const enrollIcons = [CalendarDays, CalendarClock];
const howIcons = [Search, FileCheck, RefreshCw];

function FaqItem({ id, question, answer }: { id: string; question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  return (
    <div className="border-b border-gray-200">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between py-5 text-left transition hover:text-primary-700"
        >
          <span className="text-lg font-medium text-primary-900 pr-4">{question}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-5 w-5 flex-shrink-0 text-primary-500 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HealthInsurancePage() {
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

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={introFade}
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

      {/* When you can enroll */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              {t.enrollTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t.enrollIntro}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {t.enrollCards.map((card, i) => {
              const Icon = enrollIcons[i];
              return (
                <motion.div
                  key={card.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i + 1}
                  className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-primary-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.text}</p>
                  {card.list && (
                    <>
                      <p className="text-gray-700 font-medium mt-4 mb-2">{card.listLabel}</p>
                      <ul className="space-y-2">
                        {card.list.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-gray-600">
                            <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Financial help */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6 text-center">
              {t.helpTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{t.helpP1}</p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{t.helpP2}</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="flex flex-col sm:flex-row gap-4 bg-primary-50 border border-primary-100 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.helpNoteTitle}</h3>
              <p className="text-gray-600 leading-relaxed">{t.helpNoteText}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Understanding plans */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              {t.plansTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t.plansIntro}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.tiersTitle}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <p className="text-lg font-bold text-primary-800 mb-2">{tier.name}</p>
                  <p className="text-gray-600 leading-relaxed">{tier.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.termsTitle}</h3>
              <dl className="space-y-4">
                {t.terms.map((item) => (
                  <div key={item.term}>
                    <dt className="font-semibold text-primary-800">{item.term}</dt>
                    <dd className="text-gray-600 leading-relaxed">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={2}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t.networksTitle}</h3>
              <dl className="space-y-4">
                {t.networks.map((item) => (
                  <div key={item.term}>
                    <dt className="font-semibold text-primary-800">{item.term}</dt>
                    <dd className="text-gray-600 leading-relaxed">{item.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-gray-700 leading-relaxed mt-6 pt-6 border-t border-gray-100">
                {t.networksNote}
              </p>
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
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6 text-center">
              {t.readyTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">
              {t.readyIntro}
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {t.readyList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How we help */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              {t.howTitle}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{t.howIntro}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.howList.map((step, i) => {
              const Icon = howIcons[i];
              return (
                <motion.div
                  key={step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={i + 1}
                  className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100 text-center"
                >
                  <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-primary-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.text}</p>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-lg text-gray-700 mt-10">
            <span className="font-semibold">{t.howFree}</span> {t.howLinkLead}{" "}
            <Link
              href={lp("/contact")}
              className="font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-900"
            >
              {t.howLink}
            </Link>
          </p>
        </div>
      </section>

      {/* Common questions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-8 text-center">
              {t.faqTitle}
            </h2>
            <div className="border-t border-gray-200">
              {faq[lang].map((item, i) => (
                <FaqItem
                  key={item.q}
                  id={`health-faq-${i}`}
                  question={item.q}
                  answer={item.a}
                />
              ))}
            </div>
            <p className="text-center text-gray-600 mt-8">
              {t.faqMoreLead}{" "}
              <Link
                href={lp("/faq")}
                className="font-semibold text-primary-700 underline underline-offset-4 hover:text-primary-900"
              >
                {t.faqMoreLink}
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <RelatedGuides slugs={["florida-aca-open-enrollment"]} className="bg-gray-50" />

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
