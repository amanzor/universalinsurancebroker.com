"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InteractiveCalculator() {
  const [coverage, setCoverage] = useState(50000);

  const calculatePrice = () => {
    // Estimate: $50k coverage = ~$120/month base, scales with coverage
    const basePrice = 120;
    const scaleFactor = coverage / 50000;
    return Math.round(basePrice * scaleFactor * 100) / 100;
  };

  const estimatedMonthly = calculatePrice();

  const handleGetQuote = () => {
    window.location.href = "/quotes";
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary-900 to-primary-800 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
          }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">
            Get Your Instant Quote
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-primary-200 max-w-2xl mx-auto">
            See estimated rates based on your coverage needs. No commitment required.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12"
        >
          <div className="space-y-8">
            {/* Coverage Amount Slider */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <label className="text-lg font-semibold">Coverage Amount</label>
                <motion.span
                  key={coverage}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-accent-300"
                >
                  ${coverage.toLocaleString()}
                </motion.span>
              </div>

              <input
                type="range"
                min="25000"
                max="500000"
                step="5000"
                value={coverage}
                onChange={(e) => setCoverage(Number(e.target.value))}
                className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer accent-primary-400 hover:accent-primary-300 transition"
              />

              <div className="flex justify-between text-sm text-primary-200 mt-3">
                <span>$25,000</span>
                <span>$500,000</span>
              </div>
            </div>

            {/* Estimated Price Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-700/40 to-accent-500/20 rounded-xl p-8 border border-white/10"
            >
              <p className="text-primary-200 text-sm mb-2">Estimated Monthly Premium</p>
              <motion.div
                key={estimatedMonthly}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-5xl font-bold">${estimatedMonthly.toFixed(2)}</span>
                <span className="text-primary-300">/month</span>
              </motion.div>
              <p className="text-xs text-primary-300 mt-4 leading-relaxed">
                *This is an estimate based on typical coverage. Actual rates may vary based on your specific situation, location, and risk factors.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={handleGetQuote}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full py-4 px-6 rounded-full font-semibold text-lg",
                "bg-white text-primary-900 hover:bg-primary-50",
                "transition-colors duration-200 flex items-center justify-center gap-2",
                "shadow-lg hover:shadow-xl"
              )}
            >
              Get Exact Quote from TurboRater
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-center text-sm text-primary-200">
              Connects to our secure TurboRater portal — no personal info needed to start
            </p>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
          }}
          className="grid grid-cols-3 gap-4 mt-12"
        >
          {[
            { label: "Instant Quotes", icon: "⚡" },
            { label: "No Commitment", icon: "✓" },
            { label: "100% Secure", icon: "🔒" },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="text-center py-4 px-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-sm font-medium text-primary-100">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
