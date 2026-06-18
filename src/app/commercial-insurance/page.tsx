"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Truck,
  Briefcase,
  ChefHat,
  HardHat,
  Shield,
  Building,
  Wrench,
  Umbrella,
  Phone,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const policyTypes = [
  {
    icon: Building2,
    title: "Car Dealer Insurance",
    description:
      "Garage keeper and bond available with 10+ carriers including A+ to B rated options.",
  },
  {
    icon: Truck,
    title: "Commercial Auto & Fleet",
    description:
      "Any type of commercial auto, fleet and non-fleet with no experience requirement. Only A-rated carriers for fleets.",
  },
  {
    icon: Briefcase,
    title: "Professional Liability",
    description:
      "Doctors malpractice, Errors & Omissions, and all professional liabilities with top-rated carriers.",
  },
  {
    icon: ChefHat,
    title: "Restaurants & Bars",
    description:
      "Liquor liability and full commercial package policies at the lowest rates.",
  },
  {
    icon: HardHat,
    title: "Workers Compensation",
    description:
      "Available for every occupation with flexible pay plans. Can merge with ADP payroll.",
  },
  {
    icon: Shield,
    title: "General Liability",
    description: "Instant quotes from Hiscox and Next Insurance.",
  },
  {
    icon: Building,
    title: "Commercial Property",
    description:
      "Package or standalone policies. Dedicated team for large accounts.",
  },
  {
    icon: Wrench,
    title: "Contractors Equipment",
    description:
      "Floater policies for all tools and equipment covering job sites and vehicles.",
  },
  {
    icon: Umbrella,
    title: "Umbrella Policies",
    description:
      "Personal and commercial umbrellas with the nation's largest umbrella carrier.",
  },
];

export default function CommercialInsurancePage() {
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
            Commercial &amp; Business Insurance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
          >
            Comprehensive coverage for every type of business — from startups to
            established enterprises
          </motion.p>
        </div>
      </section>

      {/* Policy Types Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Commercial Lines
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {COMPANY.name} provides tailored commercial insurance solutions
              for businesses of all sizes. Explore our coverage options below.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {policyTypes.map((policy, i) => (
              <motion.div
                key={policy.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={i + 1}
                className={cn(
                  "bg-white rounded-2xl shadow-lg p-8 border border-gray-100",
                  "hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                )}
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                  <policy.icon className="w-7 h-7 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {policy.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {policy.description}
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
              Protect Your Business Today
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our commercial lines team will build a custom insurance package for
              your business. Get started with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/quotes"
                className={cn(
                  "inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-gray-100 transition-colors"
                )}
              >
                Get a Commercial Quote
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
