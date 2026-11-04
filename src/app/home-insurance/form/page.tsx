"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import { submitLead } from "@/lib/leads";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all";
const labelClass = "block text-sm font-semibold text-primary-900 mb-2";

// Field order and labels as they appear in the email the office receives.
const FIELD_LABELS: Record<string, string> = {
  fullName: "Full Name",
  dateOfBirth: "Date of Birth",
  phoneNumber: "Phone Number",
  email: "Email",
  fullAddress: "Full Address",
  apartmentNumber: "Apartment/Unit #",
  yearBuilt: "Year Built",
  currentCarrier: "Current Carrier",
  typeOfOwnership: "Type of Ownership",
  remarks: "Remarks",
};

type Status = "idle" | "submitting" | "sent" | "error";

export default function HomeInsuranceFormPage() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never see or fill this field.
    if (data.get("_honey")) {
      setStatus("sent");
      return;
    }

    const fields: Record<string, string> = {};
    for (const [key, label] of Object.entries(FIELD_LABELS)) {
      const value = String(data.get(key) ?? "").trim();
      // Keep the key `email` so the relay sets Reply-To to the customer.
      fields[key === "email" ? "email" : label] = value || "—";
    }

    setStatus("submitting");
    const result = await submitLead(
      `Home Owner Quote Request — ${fields["Full Name"]}`,
      fields,
    );
    if (result.ok) {
      setStatus("sent");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.error("Quote request failed:", result.error);
      setStatus("error");
    }
  };

  const tel = `tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="text-left">
            <Link
              href="/home-insurance"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home Insurance
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mt-8">
            Home Owner Quote Request
          </h1>
          <p className="mt-4 text-xl text-white/80">We will be contacting you as soon as possible</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            {status === "sent" ? (
              <div className="text-center py-12" role="status">
                <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" />
                <h2 className="text-2xl font-bold text-primary-900 mb-2">
                  Thank You!
                </h2>
                <p className="text-gray-600 mb-8">
                  We received your request and will be contacting you as soon
                  as possible.
                </p>
                <Link
                  href="/home-insurance"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home Insurance
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot (hidden from people, catches bots) */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    required
                    className={inputClass}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className={labelClass}>
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    autoComplete="bday"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    autoComplete="tel"
                    required
                    className={inputClass}
                    placeholder="(239) 555-0000"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    className={inputClass}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="fullAddress" className={labelClass}>
                    Full Address
                  </label>
                  <textarea
                    id="fullAddress"
                    name="fullAddress"
                    autoComplete="street-address"
                    required
                    rows={3}
                    className={inputClass}
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="apartmentNumber" className={labelClass}>
                      Apartment#
                    </label>
                    <input
                      id="apartmentNumber"
                      type="text"
                      name="apartmentNumber"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="yearBuilt" className={labelClass}>
                      Year Built
                    </label>
                    <input
                      id="yearBuilt"
                      type="number"
                      name="yearBuilt"
                      min={1800}
                      max={new Date().getFullYear() + 1}
                      className={inputClass}
                      placeholder="2020"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="currentCarrier" className={labelClass}>
                    Current Carrier Name
                  </label>
                  <input
                    id="currentCarrier"
                    type="text"
                    name="currentCarrier"
                    className={inputClass}
                    placeholder="State Farm, Allstate, etc."
                  />
                </div>

                <div>
                  <label htmlFor="typeOfOwnership" className={labelClass}>
                    Type of Ownership
                  </label>
                  <select
                    id="typeOfOwnership"
                    name="typeOfOwnership"
                    required
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="">Select an option</option>
                    <option value="Landlord/Second Home">Landlord/Second Home</option>
                    <option value="Primary Residence">Primary Residence</option>
                    <option value="Investment Property">Investment Property</option>
                    <option value="Rental Property">Rental Property</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="remarks" className={labelClass}>
                    Any Remarks
                  </label>
                  <textarea
                    id="remarks"
                    name="remarks"
                    rows={4}
                    className={inputClass}
                    placeholder="Tell us anything else you'd like us to know..."
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">
                        We couldn&apos;t send your request.
                      </p>
                      <p className="mt-1">
                        Please try again, or call us at{" "}
                        <a href={tel} className="font-semibold underline">
                          {COMPANY.phone}
                        </a>{" "}
                        and we&apos;ll get your quote started right away.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={cn(
                    "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300",
                    status === "submitting"
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 hover:from-accent-400 hover:via-accent-300 hover:to-accent-400 text-primary-900"
                  )}
                >
                  {status === "submitting" ? "Submitting..." : "Submit"}
                </button>

                <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Phone className="h-4 w-4" />
                  Prefer to talk?{" "}
                  <a href={tel} className="font-semibold text-primary-800 hover:underline">
                    {COMPANY.phone}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
