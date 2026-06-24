"use client";

import { useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    fullAddress: "",
    apartmentNumber: "",
    yearBuilt: "",
    currentCarrier: "",
    typeOfOwnership: "",
    remarks: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("mailto:universalinsurancebroker@gmail.com?subject=Home Owner Quote Request", {
        method: "POST",
      });

      setSubmitted(true);
      setFormData({
        fullName: "",
        dateOfBirth: "",
        phoneNumber: "",
        email: "",
        fullAddress: "",
        apartmentNumber: "",
        yearBuilt: "",
        currentCarrier: "",
        typeOfOwnership: "",
        remarks: "",
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Quote Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Home Owner Quote Request
            </h2>
            <p className="text-lg text-gray-600">
              We will be contacting you as soon as possible
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200"
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-primary-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  We will contact you as soon as possible
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="(239) 204-2208"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Full Address
                  </label>
                  <textarea
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Apartment */}
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Apartment#
                    </label>
                    <input
                      type="text"
                      name="apartmentNumber"
                      value={formData.apartmentNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Year Built */}
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Year Built
                    </label>
                    <input
                      type="number"
                      name="yearBuilt"
                      value={formData.yearBuilt}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="2020"
                    />
                  </div>
                </div>

                {/* Current Carrier */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Current Carrier Name
                  </label>
                  <input
                    type="text"
                    name="currentCarrier"
                    value={formData.currentCarrier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="State Farm, Allstate, etc."
                  />
                </div>

                {/* Type of Ownership */}
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Type of Ownership
                  </label>
                  <select
                    name="typeOfOwnership"
                    value={formData.typeOfOwnership}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Any Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Tell us anything else you'd like us to know..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300",
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-accent-300 via-accent-200 to-accent-300 hover:from-accent-400 hover:via-accent-300 hover:to-accent-400 text-primary-900"
                  )}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
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
            <a
              href={`tel:${COMPANY.phone.replace(/[^0-9]/g, "")}`}
              className={cn(
                "inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full",
                "font-semibold text-lg hover:bg-gray-100 transition-colors"
              )}
            >
              <Phone className="w-5 h-5" />
              Call Now: {COMPANY.phone}
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
