"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartPulse, Phone, ArrowRight, ShieldCheck, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function HealthInsurancePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Health Insurance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
          >
            Individual health insurance at zero cost to you
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Affordable Care Act Programs
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Through the Affordable Care Act (ACA), millions of Americans
              qualify for subsidized or even free health insurance coverage.{" "}
              {COMPANY.name} helps you navigate the marketplace to find
              best-in-class health policies that fit your needs and budget.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our licensed agents guide you through the enrollment process at
              absolutely no cost to you. We are compensated directly by the
              insurance carriers, so you get expert help without paying a dime
              out of pocket.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: DollarSign,
                title: "Zero Cost to You",
                description:
                  "Our services are completely free. Insurance carriers compensate us directly so you pay nothing extra.",
              },
              {
                icon: ShieldCheck,
                title: "Best-in-Class Policies",
                description:
                  "We compare plans from all major carriers on the marketplace to find the coverage that fits your life.",
              },
              {
                icon: HeartPulse,
                title: "Full ACA Support",
                description:
                  "From enrollment to claims, our team walks you through every step of the Affordable Care Act process.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
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
                  <card.icon className="w-8 h-8 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Covered Today
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Call us or request a quote online. Our licensed agents will help
              you find the right health plan at no cost to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/quotes"
                className={cn(
                  "inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-gray-100 transition-colors"
                )}
              >
                Get a Health Quote
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
