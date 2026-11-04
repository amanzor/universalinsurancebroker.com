"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/utils";
import LazyVideo from "@/components/LazyVideo";
import { useT } from "@/lib/useLang";

const copy = {
  en: {
    title: "Dealer Ventures",
    intro:
      "Our agency is dedicated to help Auto Dealers spot vehicles and increase product penetration. Some of our offices are located inside dealers where we help streamline sales process and provide one of the best in class customer retention.",
    contact:
      "For more info contact our dedicated business development team in the contact section top right.",
    videoLabel: "An agent verifying new car insurance coverage on a tablet",
  },
  es: {
    title: "Alianzas con Concesionarios",
    intro:
      "Nuestra agencia se dedica a ayudar a los concesionarios de autos a asegurar vehículos al momento y aumentar la penetración de productos. Algunas de nuestras oficinas están ubicadas dentro de concesionarios, donde ayudamos a agilizar el proceso de venta y ofrecemos una retención de clientes de las mejores de su clase.",
    contact:
      "Para más información, comuníquese con nuestro equipo de desarrollo de negocios en la sección de contacto, arriba a la derecha.",
    videoLabel: "Un agente verificando la cobertura del seguro de un auto nuevo en una tableta",
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function DealerVentures() {
  const t = useT(copy);
  return (
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
          {t.title}
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
            {t.intro}
          </p>
          <p className="text-base text-primary-700">
            {t.contact}
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
  );
}
