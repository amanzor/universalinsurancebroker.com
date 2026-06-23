"use client";

import { motion } from "framer-motion";
import { User, Mail, Heart, Eye, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, TEAM } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const values = [
  {
    icon: Heart,
    title: "Client First",
    description:
      "Every decision we make starts with what is best for our clients. Your coverage, your peace of mind, and your budget always come first.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No hidden fees, no confusing jargon. We walk you through every policy detail so you understand exactly what you are paying for.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in the industry, continuously training and improving to deliver exceptional service.",
  },
];

export default function AboutPage() {
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
            Meet Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-200"
          >
            Dedicated professionals with 10+ years of insurance industry
            experience
          </motion.p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold heading-silver"
          >
            The {COMPANY.shortName} Team
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className={cn(
                  "flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg",
                  "transition-shadow hover:shadow-xl"
                )}
              >
                <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-400">
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="mt-3 flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {member.email}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-3xl font-bold heading-silver"
          >
            Our Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg leading-relaxed text-gray-600"
          >
            {COMPANY.name} is a Florida-based insurance brokerage with over 10
            years of experience helping individuals, families, and businesses
            find the right coverage at the best price. With 3 office locations
            across the state and partnerships with 10+ top-rated carriers, we
            serve clients from the Keys to the Panhandle. Our independent broker
            model means we work for you — not the insurance companies — comparing
            policies and negotiating rates so you never overpay for protection.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold heading-silver"
          >
            Our Values
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="rounded-2xl bg-white p-8 text-center shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-100">
                    <Icon className="h-8 w-8 text-accent-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-primary-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
