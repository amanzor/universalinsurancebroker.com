"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { faqsByLang } from "@/lib/faqs";
import { useLang, useT } from "@/lib/useLang";
import PolicyAccordion from "@/components/PolicyAccordion";

const copy = {
  en: {
    heroTitle: "Frequently Asked Questions",
    heroText:
      "Find answers to common questions about our insurance services. Can't find what you're looking for? Give us a call!",
    ctaTitle: "Still Have Questions?",
    ctaText: "Our team is ready to help you find the right coverage. Reach out today!",
    emailUs: "Email Us",
  },
  es: {
    heroTitle: "Preguntas Frecuentes",
    heroText:
      "Encuentre respuestas a las preguntas más comunes sobre nuestros servicios de seguros. ¿No encuentra lo que busca? ¡Llámenos!",
    ctaTitle: "¿Todavía Tiene Preguntas?",
    ctaText: "Nuestro equipo está listo para ayudarle a encontrar la cobertura adecuada. ¡Comuníquese con nosotros hoy!",
    emailUs: "Envíenos un Correo",
  },
};


function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
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

export default function FAQPage() {
  const lang = useLang();
  const t = useT(copy);
  const faqs = faqsByLang[lang];
  // Track the active tab by position so it survives a language switch.
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = (faqs[activeIndex] ?? faqs[0]).category;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary-900 to-primary-800 py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary-700/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-accent-500/10 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold text-white sm:text-5xl"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-primary-200 max-w-2xl mx-auto"
          >
            {t.heroText}
          </motion.p>
        </div>
      </section>

      {/* Category tabs + FAQ content */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {faqs.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                  activeCategory === cat.category
                    ? "bg-primary-800 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat.category}
              </button>
            ))}
          </motion.div>

          {/* Questions */}
          <AnimatePresence mode="wait">
            {faqs
              .filter((cat) => cat.category === activeCategory)
              .map((cat) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {cat.questions.map((item, i) => (
                    <FAQItem key={i} question={item.q} answer={item.a} />
                  ))}
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Coverage Types */}
      <PolicyAccordion />

      {/* CTA */}
      <section className="bg-gray-50 py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-primary-900 sm:text-4xl">
            {t.ctaTitle}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t.ctaText}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-primary-900"
            >
              <Phone className="h-5 w-5" />
              {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-800 px-8 py-4 text-lg font-semibold text-primary-800 transition hover:bg-primary-50"
            >
              <Mail className="h-5 w-5" />
              {t.emailUs}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
