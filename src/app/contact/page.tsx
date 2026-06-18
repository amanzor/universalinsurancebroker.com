"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const phoneNumbers = [
  { label: "Current Policy", number: COMPANY.phone },
  { label: "New Quotes", number: COMPANY.phoneNew },
  { label: "Text Only", number: COMPANY.textOnly },
  { label: "Doral Office", number: COMPANY.doralPhone },
];

export default function ContactPage() {
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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-200"
          >
            We&apos;re here to help with all your insurance needs
          </motion.p>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl bg-white p-8 shadow-lg"
            >
              <h2 className="mb-6 text-2xl font-bold text-primary-900">
                Send Us a Message
              </h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Insurance Type
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200">
                    <option value="">Select an option</option>
                    <option value="auto">Auto</option>
                    <option value="commercial">Commercial</option>
                    <option value="home">Home</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Phone Numbers */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary-900">
                  <Phone className="h-5 w-5 text-accent-500" />
                  Phone Numbers
                </h3>
                <ul className="space-y-3">
                  {phoneNumbers.map((p) => (
                    <li
                      key={p.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium text-gray-700">
                        {p.label}
                      </span>
                      <a
                        href={`tel:${p.number.replace(/\D/g, "")}`}
                        className="text-primary-600 hover:text-accent-500 transition-colors"
                      >
                        {p.number}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary-900">
                  <Mail className="h-5 w-5 text-accent-500" />
                  Email
                </h3>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-primary-600 hover:text-accent-500 transition-colors"
                >
                  {COMPANY.email}
                </a>
              </div>

              {/* Hours */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary-900">
                  <Clock className="h-5 w-5 text-accent-500" />
                  Business Hours
                </h3>
                <p className="text-sm text-gray-600">
                  Monday &ndash; Friday: {COMPANY.hours}
                </p>
              </div>

              {/* Offices */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary-900">
                  <MapPin className="h-5 w-5 text-accent-500" />
                  Our Offices
                </h3>
                <ul className="space-y-4">
                  {COMPANY.locations.map((loc) => (
                    <li key={loc.name}>
                      <p className="font-medium text-gray-800">{loc.name}</p>
                      <p className="text-sm text-gray-500">
                        {loc.address}, {loc.city}, {loc.state} {loc.zip}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
