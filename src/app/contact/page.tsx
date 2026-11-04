"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";

const phoneNumbers = [
  { label: "Current Policy", number: COMPANY.phone },
  { label: "New Quotes", number: COMPANY.phoneNew },
  { label: "Text Only", number: COMPANY.textOnly },
  { label: "Homestead - Spitzer", number: COMPANY.spitzerPhone },
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
              <h2 className="mb-6 text-2xl font-bold heading-silver">
                Send Us a Message
              </h2>
              <ContactForm />
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
                  <Phone className="h-5 w-5 text-accent-400" />
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
                        className="text-primary-600 hover:text-accent-400 transition-colors"
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
                  <Mail className="h-5 w-5 text-accent-400" />
                  Email
                </h3>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm text-primary-600 hover:text-accent-400 transition-colors"
                >
                  {COMPANY.email}
                </a>
              </div>

              {/* Hours */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary-900">
                  <Clock className="h-5 w-5 text-accent-400" />
                  Business Hours
                </h3>
                <p className="text-sm text-gray-600">
                  Monday &ndash; Friday: {COMPANY.hours}
                </p>
              </div>

              {/* Offices */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary-900">
                  <MapPin className="h-5 w-5 text-accent-400" />
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

/* ------------------------------------------------------------------ */
/*  Contact form                                                       */
/* ------------------------------------------------------------------ */

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors focus:border-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-200";
const labelClass = "mb-1 block text-sm font-medium text-gray-700";

type Status = "idle" | "submitting" | "sent" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const tel = `tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    // Honeypot: real visitors never see or fill this field.
    if (get("_honey")) {
      setStatus("sent");
      return;
    }

    const name = get("fullName");
    setStatus("submitting");
    const result = await submitLead(`Website Contact Message — ${name}`, {
      "Full Name": name,
      email: get("email"),
      Phone: get("phone") || "—",
      "Insurance Type": get("insuranceType") || "—",
      Message: get("message"),
    });
    if (result.ok) {
      setStatus("sent");
      form.reset();
    } else {
      console.error("Contact message failed:", result.error);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-10 text-center" role="status">
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" />
        <h3 className="mb-2 text-2xl font-bold text-primary-900">
          Message Sent!
        </h3>
        <p className="mb-6 text-gray-600">
          Thanks for reaching out. We&apos;ll get back to you as soon as
          possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-primary-700 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Full Name
        </label>
        <input
          id="contact-name"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          placeholder="John Doe"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="john@example.com"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Phone
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(555) 123-4567"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-type" className={labelClass}>
          Insurance Type
        </label>
        <select
          id="contact-type"
          name="insuranceType"
          defaultValue=""
          className={cn(inputClass, "text-gray-700")}
        >
          <option value="">Select an option</option>
          <option value="Auto">Auto</option>
          <option value="Commercial">Commercial</option>
          <option value="Home">Home</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us how we can help..."
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">We couldn&apos;t send your message.</p>
            <p className="mt-1">
              Please try again, or call us at{" "}
              <a href={tel} className="font-semibold underline">
                {COMPANY.phone}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "w-full rounded-lg px-6 py-3 font-semibold transition-colors",
          status === "submitting"
            ? "cursor-not-allowed bg-gray-400 text-white"
            : "bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 text-primary-900 hover:from-accent-400 hover:via-accent-300 hover:to-accent-400"
        )}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
