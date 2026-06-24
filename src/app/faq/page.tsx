"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import PolicyAccordion from "@/components/PolicyAccordion";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What types of insurance do you offer?",
        a: "We offer a comprehensive range of insurance products including Auto Insurance, Home Insurance, Commercial Insurance, and Health Insurance. As independent brokers, we work with 100+ carriers to find you the best coverage at the lowest rates.",
      },
      {
        q: "How long has Universal Insurance Brokers been in business?",
        a: "Universal Insurance Brokers has been proudly serving Florida since 2016. With over 10 years of experience in the insurance industry, we've built strong relationships with carriers and a deep understanding of our clients' needs.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve all of Florida with office locations in Boca Raton, Lehigh Acres, and Homestead. We can also assist clients remotely via phone and email.",
      },
      {
        q: "What makes you different from other insurance agencies?",
        a: "As independent brokers, we're not tied to any single insurance company. We shop 100+ carriers to find you the best coverage at the most competitive price. We also offer 100% satisfaction guaranteed with free rate revisions anytime.",
      },
    ],
  },
  {
    category: "Auto Insurance",
    questions: [
      {
        q: "How fast can I get an auto insurance quote?",
        a: "You can get a real price on your auto insurance in under 10 minutes! We provide on-the-spot quotes by comparing rates from 100+ carriers simultaneously.",
      },
      {
        q: "What factors affect my auto insurance rate?",
        a: "Several factors determine your rate including your driving record, age, vehicle type, location, credit score, coverage limits, and deductible choices. We help you understand each factor and find the best rate.",
      },
      {
        q: "Can you help if I have a poor driving record?",
        a: "Absolutely! Because we work with multiple carriers, we can often find competitive rates even for drivers with accidents, tickets, or DUI/DWI on their records. We specialize in finding coverage for all driver profiles.",
      },
      {
        q: "Do I need an SR-22?",
        a: "If you've had your license suspended or been convicted of certain offenses, you may need an SR-22 filing. We can help you obtain SR-22 insurance quickly and affordably.",
      },
    ],
  },
  {
    category: "Home Insurance",
    questions: [
      {
        q: "What does homeowners insurance cover?",
        a: "Standard homeowners insurance typically covers your dwelling, personal property, liability, and additional living expenses if your home becomes uninhabitable. We can also add endorsements for flood, hurricane, and other specific coverages.",
      },
      {
        q: "Do I need flood insurance in Florida?",
        a: "While not always required, flood insurance is highly recommended in Florida. Standard homeowners policies do not cover flood damage. We can help you determine your flood risk and find affordable flood coverage.",
      },
      {
        q: "Do you offer renters insurance?",
        a: "Yes! We offer renters insurance that protects your personal belongings and provides liability coverage. It's affordable and highly recommended for all tenants.",
      },
    ],
  },
  {
    category: "Commercial Insurance",
    questions: [
      {
        q: "What types of businesses do you insure?",
        a: "We provide coverage for over 10,000 business types including restaurants, contractors, retail stores, offices, trucking companies, and many more. No matter your industry, we can find the right coverage.",
      },
      {
        q: "What commercial policies do you offer?",
        a: "We offer General Liability, Workers' Compensation, Commercial Auto, Business Property, Professional Liability (E&O), Commercial Umbrella, and Business Owners Policy (BOP) among others.",
      },
      {
        q: "How quickly can I get a commercial insurance quote?",
        a: "Many commercial quotes can be provided same-day. More complex risks may take 24-48 hours as we shop multiple carriers to ensure you get the best coverage and pricing.",
      },
    ],
  },
  {
    category: "Health Insurance",
    questions: [
      {
        q: "Is there really no cost for your health insurance services?",
        a: "That's correct! Through the Affordable Care Act (ACA), our health insurance advisory services are provided at zero cost to you. We help you navigate the marketplace and find the plan that fits your needs and budget.",
      },
      {
        q: "When can I enroll in health insurance?",
        a: "Open enrollment typically runs from November 1 to January 15 each year. However, you may qualify for a Special Enrollment Period due to life events such as marriage, birth of a child, loss of coverage, or moving.",
      },
      {
        q: "Can you help me with Medicare?",
        a: "Yes, we can help you understand your Medicare options including Medicare Advantage, Medicare Supplement (Medigap), and Part D prescription drug plans.",
      },
    ],
  },
  {
    category: "Billing & Claims",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "Payment methods vary by carrier but typically include credit/debit cards, electronic bank transfers (EFT), checks, and online payment portals. We'll help you set up the most convenient payment option.",
      },
      {
        q: "How do I file a claim?",
        a: "You can contact your insurance carrier directly or call our office and we'll guide you through the claims process. We're here to advocate for you every step of the way.",
      },
      {
        q: "Can I change my coverage mid-policy?",
        a: "Yes! You can make changes to your coverage at any time. Contact us and we'll help you adjust your policy to meet your current needs. We also offer free rate revisions anytime.",
      },
    ],
  },
];

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
  const [activeCategory, setActiveCategory] = useState("General");

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
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-primary-200 max-w-2xl mx-auto"
          >
            Find answers to common questions about our insurance services.
            Can&apos;t find what you&apos;re looking for? Give us a call!
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
            {faqs.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
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
            Still Have Questions?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our team is ready to help you find the right coverage. Reach out today!
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
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
