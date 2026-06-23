"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate brief processing
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Redirect to TurboRater with pre-filled data via query parameters
    const turboRaterUrl = new URL(
      "https://cfd97c1e-303d-4132-818d-6cff751e4bde.quotes.iwantinsurance.com/welcome.aspx"
    );

    turboRaterUrl.searchParams.append("AspxAutoDetectCookieSupport", "1");
    turboRaterUrl.searchParams.append("firstName", formData.firstName);
    turboRaterUrl.searchParams.append("lastName", formData.lastName);
    turboRaterUrl.searchParams.append("email", formData.email);
    turboRaterUrl.searchParams.append("phone", formData.phone.replace(/\D/g, ""));
    turboRaterUrl.searchParams.append("zipCode", formData.zipCode);

    setSubmitted(true);

    // Redirect after showing success state
    setTimeout(() => {
      window.location.href = turboRaterUrl.toString();
    }, 1200);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formFields = [
    { label: "First Name", name: "firstName", type: "text", placeholder: "John" },
    { label: "Last Name", name: "lastName", type: "text", placeholder: "Doe" },
    { label: "Email Address", name: "email", type: "email", placeholder: "john@example.com" },
    { label: "Phone Number", name: "phone", type: "tel", placeholder: "(239) 123-4567" },
    { label: "Zip Code", name: "zipCode", type: "text", placeholder: "33836" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="text-center mb-12"
        >
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your Free Quote
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-primary-200 max-w-xl mx-auto">
            Fill out this quick form and we'll connect you with TurboRater to compare rates from 100+ carriers
          </motion.p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          {submitted ? (
            // Success State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <CheckCircle2 className="w-20 h-20 text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-bold text-primary-900 mb-3">Perfect!</h2>
              <p className="text-gray-600 text-lg mb-6">
                Your information has been submitted. Redirecting to TurboRater to get your quotes...
              </p>
              <div className="flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                    className="w-2 h-2 bg-primary-500 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formFields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    transition={{ delay: 0.05 * index }}
                    className={field.name === "email" || field.name === "zipCode" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      {field.label}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none",
                        errors[field.name]
                          ? "border-red-500 focus:border-red-600 bg-red-50"
                          : "border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      )}
                    />
                    {errors[field.name] && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mt-2 text-red-600 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors[field.name]}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Info Box */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.35 }}
                className="bg-blue-50 border-l-4 border-primary-500 p-4 rounded"
              >
                <p className="text-sm text-primary-900">
                  <span className="font-semibold">Your information is secure.</span> We use your data only to provide you with accurate quotes and important information via email, phone, or text messages. By continuing, you acknowledge that you've reviewed our{" "}
                  <a
                    href="#"
                    className="text-primary-600 hover:underline font-semibold"
                  >
                    privacy policy
                  </a>
                  .
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 px-6 rounded-lg font-semibold text-lg",
                  "flex items-center justify-center gap-2",
                  "transition-all duration-200",
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-lg"
                )}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to TurboRater
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Trust Indicators */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.45 }}
                className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200"
              >
                {[
                  { emoji: "✓", text: "No Commitment" },
                  { emoji: "⚡", text: "Instant Quotes" },
                  { emoji: "🔒", text: "100% Secure" },
                ].map((item) => (
                  <div key={item.text} className="text-center">
                    <div className="text-2xl mb-2">{item.emoji}</div>
                    <p className="text-xs text-gray-600 font-medium">{item.text}</p>
                  </div>
                ))}
              </motion.div>
            </form>
          )}
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-primary-200 text-sm mt-8"
        >
          Have questions?{" "}
          <a href="tel:(239)204-2208" className="text-white hover:underline font-semibold">
            Call us at (239) 204-2208
          </a>
        </motion.p>
      </div>
    </div>
  );
}
