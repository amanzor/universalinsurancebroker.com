"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, AlertCircle, CheckCircle2 } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { submitLead } from "@/lib/leads";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLang, useLocalizePath, useT } from "@/lib/useLang";
import { track } from "@/lib/analytics";
import { OfficeStatusBadge } from "@/components/OfficeStatus";

const officeSlug = (city: string) => city.toLowerCase().replace(/\s+/g, "-");

const phoneNumbers = [
  { label: { en: "Current Policy", es: "Póliza Actual" }, number: COMPANY.phone },
  { label: { en: "New Quotes", es: "Nuevas Cotizaciones" }, number: COMPANY.phoneNew },
  { label: { en: "Text Only", es: "Solo Mensajes de Texto" }, number: COMPANY.textOnly },
  { label: { en: "Doral", es: "Doral" }, number: COMPANY.doralPhone },
  { label: { en: "Homestead - Spitzer", es: "Homestead - Spitzer" }, number: COMPANY.spitzerPhone },
];

const copy = {
  en: {
    heroTitle: "Get in Touch",
    heroSubtitle: "We're here to help with all your insurance needs",
    formTitle: "Send Us a Message",
    phones: "Phone Numbers",
    email: "Email",
    hours: "Business Hours",
    weekdays: "Monday – Friday",
    hoursNote: "Walk-ins at our Hialeah office. All other locations are by appointment only.",
    offices: "Our Offices",
  },
  es: {
    heroTitle: "Contáctenos",
    heroSubtitle: "Estamos aquí para ayudarle con todas sus necesidades de seguros",
    formTitle: "Envíenos un Mensaje",
    phones: "Teléfonos",
    email: "Correo Electrónico",
    hours: "Horario de Atención",
    weekdays: "Lunes – Viernes",
    hoursNote: "Atendemos sin cita en nuestra oficina de Hialeah. Las demás oficinas atienden solo con cita previa.",
    offices: "Nuestras Oficinas",
  },
};

export default function ContactPage() {
  const lang = useLang();
  const lp = useLocalizePath();
  const t = useT(copy);
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0.25, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0.25, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-200"
          >
            {t.heroSubtitle}
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
                {t.formTitle}
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
                  {t.phones}
                </h3>
                <ul className="space-y-3">
                  {phoneNumbers.map((p) => (
                    <li
                      key={p.label.en}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium text-gray-700">
                        {p.label[lang]}
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
                  {t.email}
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
                  {t.hours}
                </h3>
                <p className="text-sm text-gray-600">
                  {t.weekdays}: {COMPANY.hours}
                </p>
                <p className="mt-2 text-sm text-gray-600">{t.hoursNote}</p>
              </div>

              {/* Offices */}
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary-900">
                  <MapPin className="h-5 w-5 text-accent-400" />
                  {t.offices}
                </h3>
                <ul className="space-y-4">
                  {COMPANY.locations.map((loc) => (
                    <li key={loc.name}>
                      <Link
                        href={lp(`/locations/${officeSlug(loc.city)}`)}
                        className="font-medium text-gray-800 hover:text-primary-700 hover:underline"
                      >
                        {lang === "es" ? loc.nameEs : loc.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {loc.address}, {loc.city}, {loc.state} {loc.zip}
                      </p>
                      <OfficeStatusBadge appointmentOnly={loc.appointmentOnly} className="mt-1.5" />
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

const formCopy = {
  en: {
    sentTitle: "Message Sent!",
    sentBody: "Thanks for reaching out. We'll get back to you as soon as possible.",
    sendAnother: "Send another message",
    fullName: "Full Name",
    namePlaceholder: "John Doe",
    email: "Email",
    emailPlaceholder: "john@example.com",
    phone: "Phone",
    insuranceType: "Insurance Type",
    selectOption: "Select an option",
    typeAuto: "Auto",
    typeCommercial: "Commercial",
    typeHome: "Home",
    typeHealth: "Health",
    typeOther: "Other",
    message: "Message",
    messagePlaceholder: "Tell us how we can help...",
    errorTitle: "We couldn't send your message.",
    errorBody: "Please try again, or call us at",
    sending: "Sending...",
    send: "Send Message",
  },
  es: {
    sentTitle: "¡Mensaje Enviado!",
    sentBody: "Gracias por comunicarse con nosotros. Le responderemos lo antes posible.",
    sendAnother: "Enviar otro mensaje",
    fullName: "Nombre Completo",
    namePlaceholder: "Juan Pérez",
    email: "Correo Electrónico",
    emailPlaceholder: "juan@ejemplo.com",
    phone: "Teléfono",
    insuranceType: "Tipo de Seguro",
    selectOption: "Seleccione una opción",
    typeAuto: "Auto",
    typeCommercial: "Comercial",
    typeHome: "Hogar",
    typeHealth: "Salud",
    typeOther: "Otro",
    message: "Mensaje",
    messagePlaceholder: "Cuéntenos cómo podemos ayudarle...",
    errorTitle: "No pudimos enviar su mensaje.",
    errorBody: "Por favor, inténtelo de nuevo o llámenos al",
    sending: "Enviando...",
    send: "Enviar Mensaje",
  },
};

function ContactForm() {
  const lp = useLocalizePath();
  const [status, setStatus] = useState<Status>("idle");
  const lang = useLang();
  const t = useT(formCopy);
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
    const isEs = lang === "es";
    const result = await submitLead(
      `${isEs ? "[ES] " : ""}Website Contact Message — ${name}`,
      {
        "Full Name": name,
        email: get("email"),
        Phone: get("phone") || "—",
        "Insurance Type": get("insuranceType") || "—",
        Message: get("message"),
        ...(isEs
          ? { Language: "Spanish (Español) — please reply in Spanish" }
          : {}),
      },
    );
    if (result.ok) {
      track("generate_lead", { form_name: "contact", site_language: isEs ? "es" : "en" });
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
          {t.sentTitle}
        </h3>
        <p className="mb-6 text-gray-600">
          {t.sentBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-primary-700 hover:underline"
        >
          {t.sendAnother}
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
          {t.fullName}
        </label>
        <input
          id="contact-name"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          placeholder={t.namePlaceholder}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          {t.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t.emailPlaceholder}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          {t.phone}
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
          {t.insuranceType}
        </label>
        <select
          id="contact-type"
          name="insuranceType"
          defaultValue=""
          className={cn(inputClass, "text-gray-700")}
        >
          <option value="">{t.selectOption}</option>
          <option value="Auto">{t.typeAuto}</option>
          <option value="Commercial">{t.typeCommercial}</option>
          <option value="Home">{t.typeHome}</option>
          <option value="Health">{t.typeHealth}</option>
          <option value="Other">{t.typeOther}</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder={t.messagePlaceholder}
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
            <p className="font-semibold">{t.errorTitle}</p>
            <p className="mt-1">
              {t.errorBody}{" "}
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
        {status === "submitting" ? t.sending : t.send}
      </button>
      <p className="text-center text-xs text-gray-500">
        {lang === "es" ? "Al enviar este formulario, acepta nuestra " : "By submitting this form, you agree to our "}
        <Link href={lp("/privacy")} className="underline hover:text-primary-700">
          {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
        </Link>
        .
      </p>
    </form>
  );
}
