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
    transition: { duration: 0.5 },
  },
};

export default function HomeInsuranceFormPage() {
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
      const emailBody = `
Home Owner Quote Request

Full Name: ${formData.fullName}
Date of Birth: ${formData.dateOfBirth}
Phone Number: ${formData.phoneNumber}
Email: ${formData.email}
Full Address: ${formData.fullAddress}
Apartment/Unit #: ${formData.apartmentNumber}
Year Built: ${formData.yearBuilt}
Current Carrier: ${formData.currentCarrier}
Type of Ownership: ${formData.typeOfOwnership}
Remarks: ${formData.remarks}
      `.trim();

      window.location.href = `mailto:universalinsurancebroker@gmail.com?subject=Home Owner Quote Request&body=${encodeURIComponent(emailBody)}`;

      setSubmitted(true);
      setTimeout(() => {
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
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
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
                  Your email client is opening...
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
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="(239) 555-0000"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
