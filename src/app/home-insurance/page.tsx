"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Building2, Key, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const policyCards = [
  {
    icon: Home,
    title: "Homeowners Hazard",
    description:
      "Covers your house against acts of God and all other perils. Protect your most valuable asset with comprehensive coverage from top-rated carriers.",
  },
  {
    icon: Building2,
    title: "Landlord Insurance",
    description:
      "Same coverage as homeowners except personal property — designed specifically for investment properties and rental units.",
  },
  {
    icon: Key,
    title: "Renters Insurance",
    description:
      "Covers your personal property while you rent. Affordable protection for your belongings, liability, and additional living expenses.",
  },
];

export default function HomeInsurancePage() {
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 "
          >
            Home Insurance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
          >
            Best-in-class home quote comparisons
          </motion.p>
        </div>
      </section>

      {/* Policy Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              Coverage for Every Home Situation
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you own, rent, or invest in property, {COMPANY.name} has
              the right policy for you. We compare rates across multiple carriers
              to make sure you get the best coverage at the best price.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {policyCards.map((card, i) => (
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

      {/* Technology Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-silver mb-6">
              Smarter Quoting Technology
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              We use advanced quoting technology and automated systems to compare
              rates across dozens of carriers in real time. Our platform
              identifies discounts, bundling opportunities, and coverage gaps so
              you never miss a chance to save.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From wind mitigation credits to multi-policy discounts, our team
              ensures every available savings is applied to your quote.
            </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
              Get Your Home Insurance Quote
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let us compare rates for you and find the best coverage for your
              home. It only takes a few minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/home-insurance/form"
                className={cn(
                  "inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-gray-100 transition-colors"
                )}
              >
                Get Your Home Quote
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
