"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { List, Clock, Users, Phone, ArrowRight } from "lucide-react";
import { cn, asset } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import LazyVideo from "@/components/LazyVideo";
import { useLang, useT, useLocalizePath } from "@/lib/useLang";

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

export default function AutoInsurancePage() {
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

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
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
