"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { List, Clock, Users, Phone, ArrowRight } from "lucide-react";
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

const features = [
  {
    icon: List,
    title: "20+ Carriers",
    description:
      "We shop your policy across more than 20 top-rated insurance carriers to find the absolute best rate for your vehicle.",
  },
  {
    icon: Clock,
    title: "10-Minute Quotes",
    description:
      "Our streamlined quoting process gets you an accurate, competitive quote in under 10 minutes — on the spot.",
  },
  {
    icon: Users,
    title: "Dealer Partnerships",
    description:
      "We work directly with dealerships across Florida so you can drive off the lot fully insured, hassle-free.",
  },
];

export default function AutoInsurancePage() {
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
            Auto Insurance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
          >
            On-the-spot quotes in under 10 minutes
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
              The Best Auto Rates in Florida
            </h2>
            <p className="text-lg text-primary-800 font-medium leading-relaxed">
              At {COMPANY.name}, we work with over 100 insurance carriers to find
              you the best possible rate on your auto policy. Whether you drive a
              sedan, truck, SUV, motorcycle, or exotic vehicle — we can insure
              it. Our deep relationships with dealerships across the state mean
              you can get covered the moment you drive off the lot.
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
              We insure any vehicle — new or used, financed or paid off, personal
              or commercial. Our team compares quotes side by side so you never
              overpay. Plus, with our dealer partnerships, we make the buying and
              insuring process seamless.
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
            Why Choose Us for Auto Insurance
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
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
                  {feature.title}
                </h3>
                <p className="text-primary-800 font-medium">{feature.description}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 ">
              Ready to Save on Auto Insurance?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto font-medium">
              Get your personalized quote in minutes. Our agents are standing by
              to help you find the best rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/quotes"
                className={cn(
                  "inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full",
                  "font-semibold text-lg hover:bg-gray-100 transition-colors"
                )}
              >
                Get Your Auto Quote
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
