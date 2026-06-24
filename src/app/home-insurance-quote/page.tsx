"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HomeInsuranceQuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        e.currentTarget.reset();
        setTimeout(() => {
          window.location.href = "/home-insurance";
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/home-insurance"
            className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home Insurance
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">
            Home Owner Quote Request
          </h1>
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
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-primary-900 mb-2">
                  Thank You!
                </h2>
                <p className="text-gray-600 mb-4">
                  We will be contacting you as soon as possible
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting you back to home insurance...
                </p>
              </div>
            ) : (
              <>
                <p className="text-center text-gray-600 mb-8">
                  We will be contacting you as soon as possible
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="(239) 555-0000"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Full Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address
                    </label>
                    <textarea
                      name="fullAddress"
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="123 Main St"
                    />
                  </div>

                  {/* Apartment/Unit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apartment/Unit #
                    </label>
                    <input
                      type="text"
                      name="apartmentNumber"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="(Optional)"
                    />
                  </div>

                  {/* Year Built */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      name="yearBuilt"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="2020"
                    />
                  </div>

                  {/* Current Carrier */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Carrier Name
                    </label>
                    <input
                      type="text"
                      name="currentCarrier"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="State Farm, Allstate, etc."
                    />
                  </div>

                  {/* Type of Ownership */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type of Ownership
                    </label>
                    <select
                      name="typeOfOwnership"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      <option value="Landlord/Second Home">
                        Landlord/Second Home
                      </option>
                      <option value="Primary Residence">Primary Residence</option>
                      <option value="Investment Property">
                        Investment Property
                      </option>
                      <option value="Rental Property">Rental Property</option>
                    </select>
                  </div>

                  {/* Remarks */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Any Remarks
                    </label>
                    <textarea
                      name="remarks"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tell us anything else you'd like us to know..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors",
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary-900 hover:bg-primary-800"
                    )}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
