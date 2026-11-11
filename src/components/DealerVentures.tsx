"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { DEALER_VENTURES_URL } from "@/lib/constants";
import { asset } from "@/lib/utils";
import LazyVideo from "@/components/LazyVideo";
import { useT } from "@/lib/useLang";

const copy = {
  en: {
    title: "Dealer Ventures",
    intro:
      "For auto dealerships: our licensed, bilingual agents work inside your store, shop every customer's insurance across any carrier at delivery, and verify coverage before the keys move. The savings free up monthly budget your F&I office can put toward back-end products, and it costs your dealership nothing. We pay rent for the desk.",
    contact: "Dealer principals, GMs and F&I directors: see how the program and the 60-day pilot work.",
    cta: "See the dealer program",
    videoLabel: "An agent verifying new car insurance coverage on a tablet",
    linkLabel: "Visit the Dealer Ventures site (opens in a new tab)",
    href: `${DEALER_VENTURES_URL}/`,
    hrefLang: "en",
  },
  es: {
    title: "Alianzas con Concesionarios",
    intro:
      "Para concesionarios de autos: nuestros agentes bilingües con licencia trabajan dentro de su concesionario, cotizan el seguro de cada cliente con cualquier aseguradora al momento de la entrega y verifican la cobertura antes de entregar las llaves. El ahorro libera presupuesto mensual que su oficina de F&I puede destinar a productos adicionales, y no le cuesta nada a su concesionario. Nosotros le pagamos renta por el espacio.",
    contact: "Dueños, gerentes generales y directores de F&I: vea cómo funcionan el programa y el piloto de 60 días.",
    cta: "Ver el programa para concesionarios",
    videoLabel: "Un agente verificando la cobertura del seguro de un auto nuevo en una tableta",
    linkLabel: "Visitar el sitio de Dealer Ventures (se abre en una pestaña nueva)",
    // Spanish visitors go straight to the Spanish dealer page.
    href: `${DEALER_VENTURES_URL}/es/`,
    hrefLang: "es",
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
          {DEALER_VENTURES_URL ? (
            <a
              href={t.href}
              hrefLang={t.hrefLang}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.linkLabel}
              className="group inline-flex items-center gap-3 rounded-lg underline decoration-electric-400 decoration-4 underline-offset-8 transition hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-400"
            >
              {t.title}
              <ExternalLink className="h-6 w-6 text-electric-500 transition group-hover:translate-x-0.5 md:h-7 md:w-7" aria-hidden />
            </a>
          ) : (
            t.title
          )}
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
          {DEALER_VENTURES_URL && (
            <a
              href={t.href}
              hrefLang={t.hrefLang}
              target="_blank"
              rel="noopener"
              className="btn-electric mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold"
            >
              {t.cta} <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          )}
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
