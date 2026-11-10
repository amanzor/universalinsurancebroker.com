"use client";

import { useState } from "react";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import { motion } from "framer-motion";
import {
  List,
  Clock,
  Users,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  TrendingDown,
  FileWarning,
  KeyRound,
  ChevronDown,
} from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import LazyVideo from "@/components/LazyVideo";
import { useLang, useT, useLocalizePath } from "@/lib/useLang";
import { faq } from "@/lib/content/auto-insurance";

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

const features = [
  {
    icon: List,
    title: { en: "100+ Carriers", es: "100+ Aseguradoras" },
    description: {
      en: "We shop your policy across more than 100 top-rated insurance carriers to find the absolute best rate for your vehicle.",
      es: "Cotizamos su póliza con más de 100 aseguradoras de primer nivel para encontrar la mejor tarifa posible para su vehículo.",
    },
  },
  {
    icon: Clock,
    title: { en: "10-Minute Quotes", es: "Cotizaciones en 10 Minutos" },
    description: {
      en: "Our streamlined quoting process gets you an accurate, competitive quote in under 10 minutes — on the spot.",
      es: "Nuestro proceso ágil le brinda una cotización precisa y competitiva en menos de 10 minutos, al instante.",
    },
  },
  {
    icon: Users,
    title: { en: "Dealer Partnerships", es: "Alianzas con Concesionarios" },
    description: {
      en: "We work directly with dealerships across Florida so you can drive off the lot fully insured, hassle-free.",
      es: "Trabajamos directamente con concesionarios en toda la Florida para que usted salga manejando con su vehículo totalmente asegurado, sin complicaciones.",
    },
  },
];

const copy = {
  en: {
    heroTitle: "Auto Insurance",
    heroSubtitle: "On-the-spot quotes in under 10 minutes",
    introTitle: "The Best Auto Rates in Florida",
    introBefore: "At ",
    introAfter:
      ", we work with 100+ insurance carriers to find you the best possible rate on your auto policy. Whether you drive a sedan, truck, SUV, motorcycle, or exotic vehicle — we can insure it. Our deep relationships with dealerships across the state mean you can get covered the moment you drive off the lot.",
    introSecond:
      "We insure any vehicle — new or used, financed or paid off, personal or commercial. Our team compares quotes side by side so you never overpay. Plus, with our dealer partnerships, we make the buying and insuring process seamless.",
    featuresTitle: "Why Choose Us for Auto Insurance",
    dealerTitle: "Dealer Ventures",
    dealerBody:
      "Our agency is dedicated to help Auto Dealers spot vehicles and increase product penetration. Some of our offices are located inside dealers where we help streamline sales process and provide one of the best in class customer retention.",
    dealerContact:
      "For more info contact our dedicated business development team in the contact section top right.",
    videoLabel: "An agent verifying new car insurance coverage on a tablet",
    ctaTitle: "Ready to Save on Auto Insurance?",
    ctaBody:
      "Get your personalized quote in minutes. Our agents are standing by to help you find the best rate.",
    ctaButton: "Get Your Auto Quote",
  },
  es: {
    heroTitle: "Seguro de Auto",
    heroSubtitle: "Cotizaciones al instante en menos de 10 minutos",
    introTitle: "Las Mejores Tarifas de Auto en la Florida",
    introBefore: "En ",
    introAfter:
      ", trabajamos con más de 100 aseguradoras para encontrarle la mejor tarifa posible en su póliza de auto. Ya sea que maneje un sedán, una camioneta, una SUV, una motocicleta o un vehículo exótico, podemos asegurarlo. Nuestras sólidas relaciones con concesionarios en todo el estado le permiten estar cubierto desde el momento en que sale con su vehículo.",
    introSecond:
      "Aseguramos cualquier vehículo: nuevo o usado, financiado o pagado, personal o comercial. Nuestro equipo compara cotizaciones lado a lado para que nunca pague de más. Además, gracias a nuestras alianzas con concesionarios, hacemos que el proceso de compra y aseguramiento sea sencillo.",
    featuresTitle: "Por Qué Elegirnos para su Seguro de Auto",
    dealerTitle: "Alianzas con Concesionarios",
    dealerBody:
      "Nuestra agencia se dedica a ayudar a los concesionarios de autos a ubicar vehículos y aumentar la penetración de productos. Algunas de nuestras oficinas se encuentran dentro de concesionarios, donde ayudamos a agilizar el proceso de ventas y ofrecemos una retención de clientes de primer nivel.",
    dealerContact:
      "Para más información, comuníquese con nuestro equipo de desarrollo de negocios en la sección de contacto, arriba a la derecha.",
    videoLabel: "Un agente verificando la cobertura del seguro de un auto nuevo en una tableta",
    ctaTitle: "¿Listo para Ahorrar en su Seguro de Auto?",
    ctaBody:
      "Obtenga su cotización personalizada en minutos. Nuestros agentes están listos para ayudarle a encontrar la mejor tarifa.",
    ctaButton: "Cotice su Seguro de Auto",
  },
};

const guide = {
  en: {
    reqTitle: "Florida Auto Insurance Requirements",
    reqIntro:
      "Florida is a no-fault state. That generally means your own policy pays for a portion of your injury-related costs after an accident, no matter who caused it. To register and drive a vehicle in Florida, most drivers must carry two coverages:",
    reqItems: [
      {
        title: "Personal Injury Protection (PIP) — at least $10,000",
        body: "PIP generally helps pay a portion of medical expenses and lost wages for you and certain passengers and household members after a covered accident, regardless of fault.",
      },
      {
        title: "Property Damage Liability (PDL) — at least $10,000",
        body: "PDL helps pay for damage you cause to someone else's property, such as their car, a fence or a building.",
      },
    ],
    reqWorthTitle: "Coverage worth considering beyond the minimum",
    reqWorth: [
      "Bodily injury liability (BI): not generally required for most Florida drivers, but strongly recommended. It can help protect your savings and assets if you injure someone in an accident you cause.",
      "Uninsured/underinsured motorist (UM): helps cover your injuries if the at-fault driver has no insurance or not enough of it.",
      "Collision and comprehensive: lenders and leasing companies usually require them on financed or leased vehicles.",
    ],
    reqNote:
      "The state minimum keeps you legal, but it may not be enough after a serious accident. Our agents can explain the trade-offs so you can choose limits that fit your situation.",

    covTitle: "Auto Insurance Coverage Options Explained",
    covIntro:
      "A policy is built from several coverages. Here is a quick, plain-language look at the most common ones. Exact terms, limits and exclusions depend on the carrier and policy.",
    covItems: [
      { title: "Liability", body: "Bodily injury and property damage liability help pay for injuries and damage you cause to others, up to your limits." },
      { title: "Personal Injury Protection (PIP)", body: "Required in Florida. Helps pay a portion of your own medical costs and lost wages after an accident, regardless of fault." },
      { title: "Collision", body: "Helps pay to repair or replace your vehicle after a crash with another car or an object, minus your deductible." },
      { title: "Comprehensive", body: "Helps cover damage from things other than a collision, such as theft, vandalism, falling objects, fire, flooding or storms." },
      { title: "Uninsured / Underinsured Motorist", body: "Helps protect you when the at-fault driver has no insurance or too little to cover your injuries." },
      { title: "Medical Payments", body: "Optional coverage that can help with medical expenses PIP doesn't pay, such as deductibles or costs above your PIP limit." },
      { title: "Rental Reimbursement & Roadside Assistance", body: "Optional add-ons that can help pay for a rental car while yours is being repaired and for towing, jump-starts or lockouts." },
    ],

    rateTitle: "What Affects Your Rate — and Ways to Save",
    rateIntro:
      "Every carrier prices risk a little differently, which is why the same driver can get very different quotes. These are some of the factors carriers commonly consider:",
    rateFactors: [
      "Your driving record, including accidents, tickets and claims",
      "The vehicle you drive: its value, repair costs and safety features",
      "Where the car is kept, down to your ZIP code",
      "Your age and driving experience",
      "The coverages, limits and deductibles you choose",
      "A credit-based insurance score, where permitted",
      "Whether you've kept continuous insurance without gaps",
    ],
    saveTitle: "Common ways to save",
    saveTips: [
      "Bundle auto with home, renters or other policies",
      "Insure more than one vehicle on the same policy",
      "Keep a clean driving record to qualify for safe-driver discounts",
      "Pay your premium in full, when the carrier offers a discount for it",
      "Consider a higher deductible, if you could comfortably pay it after a claim",
      "Shop across multiple carriers — which is exactly what a broker does for you",
    ],
    saveNote:
      "Available discounts vary by carrier. Because we compare 100+ carriers, we can check which ones reward your particular profile.",

    srTitle: "SR-22, FR-44 and High-Risk Drivers",
    srBody1:
      "An SR-22 or FR-44 isn't a type of insurance — it's a certificate your insurance company files with the state to prove you carry the required coverage. Florida may require one after certain violations, such as driving without insurance, a license suspension or serious traffic offenses. The FR-44 is Florida's form for DUI-related cases and generally comes with higher required liability limits.",
    srBody2:
      "Not every carrier writes SR-22 or FR-44 policies, and those that do can price them very differently. As a broker, we can check multiple carriers that work with high-risk drivers, help get the filing in place and explain what you need to keep your license in good standing.",
    srPoints: [
      "Tell us exactly what your notice from the state says",
      "We compare carriers that file SR-22 or FR-44 certificates",
      "We help you keep coverage active so the filing stays valid",
    ],

    dealerGuideTitle: "Buying a Car? Get Insured at the Dealership",
    dealerGuideBody1:
      "You generally need proof of insurance before you can drive a new or used car off the lot, and lenders usually require collision and comprehensive coverage on a financed vehicle. Some of our offices are located inside dealerships, and we work with dealers across Florida, so we can often quote and bind your policy while you're finishing the paperwork.",
    dealerGuideBody2:
      "To make it quick, have the vehicle's VIN, your driver's license and, if you're financing, the lender's information ready. If you're replacing a car, we can also review your current policy so you aren't paying for coverage on a vehicle you no longer own.",
    localBefore:
      "Whether you're in Hialeah, Doral, Homestead, Boca Raton, Lehigh Acres or anywhere else in Florida, our bilingual team can help in English or Spanish. Have a general question? Browse our ",
    localFaqLink: "insurance FAQ",
    localMiddle: " or ",
    localContactLink: "contact an agent",
    localAfter: ".",

    faqTitle: "Common Questions",
  },
  es: {
    reqTitle: "Requisitos del Seguro de Auto en la Florida",
    reqIntro:
      "La Florida es un estado sin culpa (no-fault). Esto generalmente significa que su propia póliza paga una parte de los costos relacionados con sus lesiones después de un accidente, sin importar quién lo causó. Para registrar y manejar un vehículo en la Florida, la mayoría de los conductores deben tener dos coberturas:",
    reqItems: [
      {
        title: "Protección contra Lesiones Personales (PIP): al menos $10,000",
        body: "El PIP generalmente ayuda a pagar una parte de los gastos médicos y de los salarios perdidos para usted y ciertos pasajeros y miembros de su hogar después de un accidente cubierto, sin importar quién tuvo la culpa.",
      },
      {
        title: "Responsabilidad Civil por Daños a la Propiedad (PDL): al menos $10,000",
        body: "El PDL ayuda a pagar los daños que usted cause a la propiedad de otra persona, como su auto, una cerca o un edificio.",
      },
    ],
    reqWorthTitle: "Coberturas que vale la pena considerar además del mínimo",
    reqWorth: [
      "Responsabilidad civil por lesiones corporales (BI): generalmente no es obligatoria para la mayoría de los conductores en la Florida, pero se recomienda mucho. Puede ayudar a proteger sus ahorros y bienes si usted lesiona a alguien en un accidente que usted causa.",
      "Conductor sin seguro o con seguro insuficiente (UM): ayuda a cubrir sus lesiones si el conductor culpable no tiene seguro o no tiene suficiente.",
      "Choque y cobertura amplia: los prestamistas y las compañías de arrendamiento por lo general las exigen en vehículos financiados o arrendados.",
    ],
    reqNote:
      "El mínimo estatal le permite cumplir con la ley, pero puede no ser suficiente después de un accidente grave. Nuestros agentes pueden explicarle las ventajas y desventajas para que elija límites que se ajusten a su situación.",

    covTitle: "Opciones de Cobertura de Seguro de Auto Explicadas",
    covIntro:
      "Una póliza se compone de varias coberturas. Aquí tiene un resumen sencillo de las más comunes. Los términos, límites y exclusiones exactos dependen de la aseguradora y de la póliza.",
    covItems: [
      { title: "Responsabilidad Civil", body: "La responsabilidad civil por lesiones corporales y por daños a la propiedad ayuda a pagar las lesiones y los daños que usted cause a otros, hasta sus límites." },
      { title: "Protección contra Lesiones Personales (PIP)", body: "Obligatoria en la Florida. Ayuda a pagar una parte de sus propios gastos médicos y salarios perdidos después de un accidente, sin importar quién tuvo la culpa." },
      { title: "Choque", body: "Ayuda a pagar la reparación o el reemplazo de su vehículo después de un choque con otro auto o con un objeto, menos su deducible." },
      { title: "Cobertura Amplia", body: "Ayuda a cubrir daños que no provienen de un choque, como robo, vandalismo, caída de objetos, incendio, inundación o tormentas." },
      { title: "Conductor Sin Seguro o con Seguro Insuficiente", body: "Ayuda a protegerlo cuando el conductor culpable no tiene seguro o tiene muy poco para cubrir sus lesiones." },
      { title: "Gastos Médicos", body: "Cobertura opcional que puede ayudar con gastos médicos que el PIP no paga, como deducibles o costos por encima de su límite de PIP." },
      { title: "Reembolso de Auto de Alquiler y Asistencia en la Carretera", body: "Coberturas opcionales que pueden ayudar a pagar un auto de alquiler mientras reparan el suyo, y servicios de grúa, arranque de batería o apertura de puertas." },
    ],

    rateTitle: "Qué Afecta su Tarifa y Cómo Ahorrar",
    rateIntro:
      "Cada aseguradora evalúa el riesgo de manera un poco diferente; por eso un mismo conductor puede recibir cotizaciones muy distintas. Estos son algunos de los factores que las aseguradoras suelen considerar:",
    rateFactors: [
      "Su historial de manejo, incluidos accidentes, multas y reclamaciones",
      "El vehículo que maneja: su valor, el costo de reparación y sus elementos de seguridad",
      "Dónde se guarda el auto, incluso su código postal",
      "Su edad y su experiencia manejando",
      "Las coberturas, los límites y los deducibles que elija",
      "Una puntuación de seguro basada en el crédito, donde esté permitido",
      "Si ha mantenido un seguro continuo sin interrupciones",
    ],
    saveTitle: "Formas comunes de ahorrar",
    saveTips: [
      "Combine su seguro de auto con el de hogar, inquilino u otras pólizas",
      "Asegure más de un vehículo en la misma póliza",
      "Mantenga un historial de manejo limpio para calificar para descuentos de conductor seguro",
      "Pague su prima completa, cuando la aseguradora ofrezca un descuento por hacerlo",
      "Considere un deducible más alto, si podría pagarlo cómodamente después de una reclamación",
      "Compare entre varias aseguradoras, que es exactamente lo que un corredor hace por usted",
    ],
    saveNote:
      "Los descuentos disponibles varían según la aseguradora. Como comparamos más de 100 aseguradoras, podemos revisar cuáles premian su perfil en particular.",

    srTitle: "SR-22, FR-44 y Conductores de Alto Riesgo",
    srBody1:
      "El SR-22 o el FR-44 no es un tipo de seguro: es un certificado que su aseguradora presenta ante el estado para demostrar que usted tiene la cobertura requerida. La Florida puede exigirlo después de ciertas infracciones, como manejar sin seguro, una suspensión de licencia o infracciones de tránsito graves. El FR-44 es el formulario de la Florida para casos relacionados con DUI (manejar bajo la influencia) y generalmente exige límites de responsabilidad civil más altos.",
    srBody2:
      "No todas las aseguradoras emiten pólizas con SR-22 o FR-44, y las que lo hacen pueden tener precios muy diferentes. Como corredores, podemos revisar varias aseguradoras que trabajan con conductores de alto riesgo, ayudarle a presentar el certificado y explicarle lo que necesita para mantener su licencia en regla.",
    srPoints: [
      "Díganos exactamente lo que indica la notificación del estado",
      "Comparamos aseguradoras que presentan certificados SR-22 o FR-44",
      "Le ayudamos a mantener su cobertura activa para que el certificado siga vigente",
    ],

    dealerGuideTitle: "¿Va a Comprar un Auto? Asegúrese en el Concesionario",
    dealerGuideBody1:
      "Por lo general, necesita prueba de seguro antes de poder salir del concesionario con un auto nuevo o usado, y los prestamistas suelen exigir cobertura de choque y cobertura amplia en un vehículo financiado. Algunas de nuestras oficinas se encuentran dentro de concesionarios y trabajamos con concesionarios en toda la Florida, así que a menudo podemos cotizar y emitir su póliza mientras usted termina el papeleo.",
    dealerGuideBody2:
      "Para agilizar el proceso, tenga a mano el número VIN del vehículo, su licencia de conducir y, si va a financiar, la información del prestamista. Si va a reemplazar un auto, también podemos revisar su póliza actual para que no siga pagando cobertura por un vehículo que ya no tiene.",
    localBefore:
      "Ya sea que viva en Hialeah, Doral, Homestead, Boca Raton, Lehigh Acres o en cualquier otro lugar de la Florida, nuestro equipo bilingüe puede ayudarle en español o en inglés. ¿Tiene una pregunta general? Consulte nuestras ",
    localFaqLink: "preguntas frecuentes sobre seguros",
    localMiddle: " o ",
    localContactLink: "comuníquese con un agente",
    localAfter: ".",

    faqTitle: "Preguntas Frecuentes",
  },
};

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
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:text-primary-700"
        >
          <span className="text-lg font-medium text-primary-900">{question}</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-5 w-5 flex-shrink-0 text-primary-500 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
        <p className="pb-5 text-primary-800 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function AutoInsurancePage() {
  const t = useT(copy);
  const g = useT(guide);
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t.introTitle}
            </h2>
            <p className="text-lg text-primary-800 font-medium leading-relaxed">
              {t.introBefore}
              {COMPANY.name}
              {t.introAfter}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            custom={1}
            className="text-center mb-6"
          >
            <p className="text-lg text-primary-800 font-medium leading-relaxed">
              {t.introSecond}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-12"
          >
            {t.featuresTitle}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title.en}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className={cn(
                  "bg-white rounded-2xl shadow-lg p-8 text-center",
                  "hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                )}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">
                  {feature.title[lang]}
                </h3>
                <p className="text-primary-800 font-medium">{feature.description[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dealer Ventures */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-3xl md:text-4xl font-bold text-primary-900 mb-8"
          >
            {t.dealerTitle}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="max-w-3xl mx-auto mb-12"
          >
            <p className="text-lg text-primary-800 font-medium leading-relaxed mb-4">
              {t.dealerBody}
            </p>
            <p className="text-base text-primary-700">
              {t.dealerContact}
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={2}
            className="max-w-3xl mx-auto"
          >
            <LazyVideo
              src={asset("/images/insurance-verification.mp4")}
              poster={asset("/images/insurance-verification-poster.jpg")}
              label={t.videoLabel}
              className="w-full rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Florida Requirements */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {g.reqTitle}
            </h2>
            <p className="text-lg text-primary-800 font-medium leading-relaxed">
              {g.reqIntro}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {g.reqItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">{item.title}</h3>
                <p className="text-primary-800 font-medium leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-bold text-primary-900 mb-4">{g.reqWorthTitle}</h3>
            <ul className="space-y-3 mb-6">
              {g.reqWorth.map((item) => (
                <li key={item} className="flex gap-3 text-primary-800 font-medium leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-base text-primary-700">{g.reqNote}</p>
          </motion.div>
        </div>
      </section>

      {/* Coverage Options */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {g.covTitle}
            </h2>
            <p className="text-lg text-primary-800 font-medium leading-relaxed">
              {g.covIntro}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {g.covItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={(i % 3) + 1}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-primary-900 mb-2">{item.title}</h3>
                <p className="text-primary-800 font-medium leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rates & Savings */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {g.rateTitle}
            </h2>
            <p className="text-lg text-primary-800 font-medium leading-relaxed">
              {g.rateIntro}
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <Gauge className="w-6 h-6 text-primary-700" />
              </div>
              <ul className="space-y-3">
                {g.rateFactors.map((item) => (
                  <li key={item} className="flex gap-3 text-primary-800 font-medium leading-relaxed">
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
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4">{g.saveTitle}</h3>
              <ul className="space-y-3 mb-6">
                {g.saveTips.map((item) => (
                  <li key={item} className="flex gap-3 text-primary-800 font-medium leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base text-primary-700">{g.saveNote}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SR-22 / FR-44 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 text-center">
              {g.srTitle}
            </h2>
            <p className="text-lg text-primary-800 font-medium leading-relaxed mb-4">
              {g.srBody1}
            </p>
            <p className="text-lg text-primary-800 font-medium leading-relaxed mb-8">
              {g.srBody2}
            </p>
          </motion.div>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="grid md:grid-cols-3 gap-6"
          >
            {g.srPoints.map((item) => (
              <li
                key={item}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-3 text-primary-800 font-medium leading-relaxed"
              >
                <FileWarning className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Buying a Car */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            custom={0}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <KeyRound className="w-8 h-8 text-primary-700" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 text-center">
              {g.dealerGuideTitle}
            </h2>
            <p className="text-lg text-primary-800 font-medium leading-relaxed mb-4">
              {g.dealerGuideBody1}
            </p>
            <p className="text-lg text-primary-800 font-medium leading-relaxed mb-6">
              {g.dealerGuideBody2}
            </p>
            <p className="text-base text-primary-700 leading-relaxed">
              {g.localBefore}
              <Link
                href={lp("/faq")}
                className="font-semibold text-primary-800 underline underline-offset-2 hover:text-primary-900"
              >
                {g.localFaqLink}
              </Link>
              {g.localMiddle}
              <Link
                href={lp("/contact")}
                className="font-semibold text-primary-800 underline underline-offset-2 hover:text-primary-900"
              >
                {g.localContactLink}
              </Link>
              {g.localAfter}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-8"
          >
            {g.faqTitle}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
          >
            {faq[lang].map((item, i) => (
              <FaqItem key={`${lang}-${i}`} id={`auto-faq-${i}`} question={item.q} answer={item.a} />
            ))}
          </motion.div>
        </div>
      </section>

      <Testimonials topic="auto" variant="topic" />

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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 ">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-medium">
              {t.ctaBody}
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
