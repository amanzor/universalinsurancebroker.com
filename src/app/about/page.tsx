"use client";

import { motion } from "framer-motion";
import { User, Mail, Heart, Eye, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY, TEAM } from "@/lib/constants";
import { useLang, useT } from "@/lib/useLang";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const values = [
  {
    icon: Heart,
    title: { en: "Client First", es: "El Cliente Primero" },
    description: {
      en: "Every decision we make starts with what is best for our clients. Your coverage, your peace of mind, and your budget always come first.",
      es: "Cada decisión que tomamos parte de lo que es mejor para nuestros clientes. Su cobertura, su tranquilidad y su presupuesto siempre están primero.",
    },
  },
  {
    icon: Eye,
    title: { en: "Transparency", es: "Transparencia" },
    description: {
      en: "No hidden fees, no confusing jargon. We walk you through every policy detail so you understand exactly what you are paying for.",
      es: "Sin cargos ocultos ni términos confusos. Le explicamos cada detalle de su póliza para que sepa exactamente por qué está pagando.",
    },
  },
  {
    icon: Award,
    title: { en: "Excellence", es: "Excelencia" },
    description: {
      en: "We hold ourselves to the highest standards in the industry, continuously training and improving to deliver exceptional service.",
      es: "Nos exigimos los más altos estándares de la industria, con capacitación y mejora continuas para ofrecerle un servicio excepcional.",
    },
  },
];

const copy = {
  en: {
    heroTitle: "Meet Our Team",
    heroSubtitle:
      "Dedicated professionals with 10+ years of insurance industry experience",
    teamTitle: `The ${COMPANY.shortName} Team`,
    storyTitle: "Our Story",
    story: `${COMPANY.name} is a Florida-based insurance brokerage with over 10 years of experience helping individuals, families, and businesses find the right coverage at the best price. With 3 office locations across the state and partnerships with 100+ top-rated carriers, we serve clients from the Keys to the Panhandle. Our independent broker model means we work for you — not the insurance companies — comparing policies and negotiating rates so you never overpay for protection.`,
    valuesTitle: "Our Values",
  },
  es: {
    heroTitle: "Conozca a Nuestro Equipo",
    heroSubtitle:
      "Profesionales dedicados con más de 10 años de experiencia en la industria de seguros",
    teamTitle: `El Equipo de ${COMPANY.shortName}`,
    storyTitle: "Nuestra Historia",
    story: `${COMPANY.name} es una agencia de corretaje de seguros con sede en Florida y más de 10 años de experiencia ayudando a personas, familias y negocios a encontrar la cobertura adecuada al mejor precio. Con 3 oficinas en el estado y alianzas con más de 100 aseguradoras de primer nivel, atendemos a clientes desde los Cayos hasta el Panhandle. Como corredores independientes, trabajamos para usted — no para las aseguradoras — comparando pólizas y negociando tarifas para que nunca pague de más por su protección.`,
    valuesTitle: "Nuestros Valores",
  },
};

export default function AboutPage() {
  const lang = useLang();
  const t = useT(copy);
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
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-200"
          >
            {t.heroSubtitle}
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
            {t.teamTitle}
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
                  {lang === "es" ? member.roleEs : member.role}
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
            {t.storyTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg leading-relaxed text-gray-600"
          >
            {t.story}
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
            {t.valuesTitle}
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title.en}
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
                    {value.title[lang]}
                  </h3>
                  <p className="text-gray-600">{value.description[lang]}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
