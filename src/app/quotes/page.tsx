"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Building2, Home, HeartPulse, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const quoteTypes = [
  {
    title: "Auto Insurance",
    icon: Car,
    description: "Get your auto quote in under 10 minutes",
    href: "/auto-insurance",
  },
  {
    title: "Commercial Insurance",
    icon: Building2,
    description: "Coverage for 10,000+ business types",
    href: "/commercial-insurance",
  },
  {
    title: "Home Insurance",
    icon: Home,
    description: "Best-in-class home quote comparisons",
    href: "/home-insurance",
  },
  {
    title: "Health Insurance",
    icon: HeartPulse,
    description: "Zero-cost health insurance options",
    href: "/health-insurance",
  },
];

export default function QuotesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Get Your Free Insurance Quote
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-200"
          >
            Choose your insurance type below and get a personalized quote in
            minutes
          </motion.p>
        </div>
      </section>

      {/* Quote Cards */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 sm:grid-cols-2">
            {quoteTypes.map((qt, i) => {
              const Icon = qt.icon;
              return (
                <motion.div
                  key={qt.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Link
                    href={qt.href}
                    className={cn(
                      "group flex flex-col items-center rounded-2xl bg-white p-10 shadow-lg",
                      "border-2 border-transparent transition-all hover:border-accent-300 hover:shadow-xl"
                    )}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-100"
                    >
                      <Icon className="h-10 w-10 text-accent-400" />
                    </motion.div>
                    <h3 className="mb-2 text-xl font-bold text-primary-900">
                      {qt.title}
                    </h3>
                    <p className="text-center text-gray-600">
                      {qt.description}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-accent-400 group-hover:underline">
                      Get a Quote &rarr;
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-50 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl px-4 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-100">
            <Phone className="h-7 w-7 text-accent-400" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-primary-900">
            Prefer to talk?
          </h3>
          <p className="text-gray-600">
            Call us at{" "}
            <a
              href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
              className="font-semibold text-accent-400 hover:underline"
            >
              {COMPANY.phone}
            </a>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
