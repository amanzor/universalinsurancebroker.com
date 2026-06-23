"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info";
}

export default function QuoteEstimatorSection() {
  const [step, setStep] = useState(1);
  const [coverage, setCoverage] = useState(50000);
  const [deductible, setDeductible] = useState(500);
  const [notes, setNotes] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(120);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [notes]);

  // Calculate estimated price
  useEffect(() => {
    const basePrice = 120;
    const coverageScale = coverage / 50000;
    const deductibleFactor = 1 - (deductible / 1000) * 0.15; // Lower deductible = higher price
    const price = Math.round(basePrice * coverageScale * deductibleFactor * 100) / 100;
    setEstimatedPrice(price);
  }, [coverage, deductible]);

  const addToast = (message: string, type: "success" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleStepChange = (newStep: number) => {
    if (newStep > step) {
      addToast(`Step ${step} saved!`, "success");
    }
    setStep(newStep);
  };

  const handleSubmit = () => {
    addToast("Quote generated! Redirecting to TurboRater...", "success");
    setTimeout(() => {
      window.location.href =
        "https://cfd97c1e-303d-4132-818d-6cff751e4bde.quotes.iwantinsurance.com/welcome.aspx?AspxAutoDetectCookieSupport=1";
    }, 1500);
  };

  const stepPercentage = Math.round((step / 3) * 100);

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-accent-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">
            Get Your Instant Quote
          </h2>
          <p className="text-lg text-primary-700 max-w-xl mx-auto">
            Three quick steps to see how much you can save on your insurance
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-primary-900">
              Step {step} of 3
            </span>
            <span className="text-sm font-semibold text-primary-600">
              {stepPercentage}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-600 to-primary-500"
              initial={{ width: "33%" }}
              animate={{ width: `${stepPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100"
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: Coverage */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-lg font-semibold text-primary-900 mb-4">
                    What coverage amount do you need?
                  </label>
                  <p className="text-sm text-primary-600 mb-6">
                    Slide to adjust your desired coverage level
                  </p>

                  {/* Coverage Display */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-6 border border-primary-200"
                  >
                    <p className="text-sm text-primary-600 mb-2">Selected Coverage</p>
                    <motion.p
                      key={coverage}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl font-bold text-primary-900"
                    >
                      ${coverage.toLocaleString()}
                    </motion.p>
                  </motion.div>

                  {/* Slider */}
                  <input
                    type="range"
                    min="25000"
                    max="500000"
                    step="5000"
                    value={coverage}
                    onChange={(e) => setCoverage(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between text-sm text-primary-600 mt-3">
                    <span>$25k</span>
                    <span>$500k</span>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handleStepChange(2)}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  Continue to Deductible
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: Deductible */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-lg font-semibold text-primary-900 mb-4">
                    What deductible works for you?
                  </label>
                  <p className="text-sm text-primary-600 mb-6">
                    Higher deductible = lower monthly payment
                  </p>

                  {/* Deductible Display */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 mb-6 border border-primary-200"
                  >
                    <p className="text-sm text-primary-600 mb-2">Selected Deductible</p>
                    <motion.p
                      key={deductible}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-4xl font-bold text-primary-900"
                    >
                      ${deductible.toLocaleString()}
                    </motion.p>
                  </motion.div>

                  {/* Deductible Options */}
                  <div className="grid grid-cols-3 gap-3">
                    {[250, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDeductible(amount)}
                        className={cn(
                          "py-3 px-4 rounded-lg font-semibold transition-all duration-200",
                          deductible === amount
                            ? "bg-primary-600 text-white shadow-lg"
                            : "bg-gray-100 text-primary-900 hover:bg-gray-200"
                        )}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border-2 border-primary-600 text-primary-600 font-semibold py-4 rounded-lg hover:bg-primary-50 transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleStepChange(3)}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Notes + Estimated Savings */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-lg font-semibold text-primary-900 mb-4">
                    Any additional details?
                  </label>
                  <p className="text-sm text-primary-600 mb-4">
                    Tell us about your specific situation (optional)
                  </p>

                  {/* Auto-expanding textarea */}
                  <textarea
                    ref={textareaRef}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., I have multiple vehicles, looking for bundled discounts, recent accidents..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none transition-all duration-200 font-medium text-primary-900"
                    style={{ minHeight: "80px", maxHeight: "120px" }}
                  />
                </div>

                {/* Estimated Savings */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-green-900 mb-2">
                        Estimated Monthly Savings
                      </p>
                      <motion.p
                        key={estimatedPrice}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-green-700"
                      >
                        ${estimatedPrice}/month
                      </motion.p>
                      <p className="text-xs text-green-800 mt-2">
                        Based on your coverage & deductible selection
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border-2 border-primary-600 text-primary-600 font-semibold py-4 rounded-lg hover:bg-primary-50 transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    Get My Quote
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-primary-600 mt-6"
        >
          Takes less than 2 minutes • No credit card required • Get quotes from 20+ carriers
        </motion.p>
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, x: 400 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 20, x: 400 }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className={cn(
                "rounded-lg px-6 py-3 shadow-lg flex items-center gap-3 pointer-events-auto",
                toast.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-primary-600 text-white"
              )}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
