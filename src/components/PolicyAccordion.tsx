"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  icon: string;
}

const policyItems: AccordionItem[] = [
  {
    id: "auto",
    title: "Auto Insurance Coverage",
    description: "Protect yourself on the road",
    icon: "🚗",
    content: (
      <div className="space-y-3 text-gray-600 leading-relaxed">
        <p>
          Our auto insurance policies cover liability, collision, comprehensive, and uninsured motorist protection.
          We work with 20+ carriers to find the best rates for your vehicle and driving profile.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Liability Coverage (Bodily Injury & Property Damage)</li>
          <li>Collision Coverage for accident repairs</li>
          <li>Comprehensive Coverage for theft, weather, and other incidents</li>
          <li>Uninsured/Underinsured Motorist Protection</li>
          <li>Medical Payments Coverage</li>
        </ul>
      </div>
    ),
  },
  {
    id: "home",
    title: "Home Insurance Protection",
    description: "Peace of mind for your home",
    icon: "🏠",
    content: (
      <div className="space-y-3 text-gray-600 leading-relaxed">
        <p>
          Comprehensive homeowners insurance covering your dwelling, personal property, and liability.
          Florida-specific coverage available for flood and hurricane protection.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Dwelling Coverage for your home structure</li>
          <li>Personal Property Protection for belongings</li>
          <li>Liability Coverage for accidents on your property</li>
          <li>Additional Living Expenses if displaced</li>
          <li>Optional Flood & Hurricane Coverage</li>
        </ul>
      </div>
    ),
  },
  {
    id: "commercial",
    title: "Commercial Insurance Plans",
    description: "Business protection tailored to you",
    icon: "💼",
    content: (
      <div className="space-y-3 text-gray-600 leading-relaxed">
        <p>
          Customized business coverage for companies of all sizes. From startups to established enterprises,
          we provide comprehensive commercial insurance solutions.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>General Liability for third-party claims</li>
          <li>Commercial Property Coverage</li>
          <li>Workers' Compensation for employees</li>
          <li>Commercial Auto for business vehicles</li>
          <li>Professional Liability (Errors & Omissions)</li>
          <li>Umbrella Policies for extra protection</li>
        </ul>
      </div>
    ),
  },
  {
    id: "health",
    title: "Health Insurance Options",
    description: "Affordable healthcare coverage",
    icon: "❤️",
    content: (
      <div className="space-y-3 text-gray-600 leading-relaxed">
        <p>
          We provide ACA marketplace health insurance at zero cost to you. Our team helps navigate enrollment
          and find plans matching your healthcare needs and budget.
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>ACA Marketplace Plans (zero advisory fee)</li>
          <li>Medicare & Medicare Supplement options</li>
          <li>Individual & Family Plans</li>
          <li>Coverage comparison & enrollment assistance</li>
          <li>Special Enrollment Period guidance</li>
        </ul>
      </div>
    ),
  },
];

export default function PolicyAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Coverage Types Explained
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understand what each insurance type covers and how we can protect your assets
          </p>
        </motion.div>

        <div className="space-y-3">
          {policyItems.map((item, index) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleAccordion(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-5 text-left",
                    "bg-white border-2 border-transparent transition-all duration-200",
                    "hover:border-primary-500/20 hover:shadow-md",
                    isExpanded && "border-primary-500 shadow-lg bg-primary-50/30"
                  )}
                  aria-expanded={isExpanded}
                >
                  {/* Icon */}
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: isExpanded ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="text-3xl flex-shrink-0"
                  >
                    {item.icon}
                  </motion.span>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary-900 text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>

                  {/* Chevron Icon */}
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-primary-600" />
                  </motion.div>
                </motion.button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: {
                            type: "spring",
                            stiffness: 400,
                            damping: 40,
                            duration: 0.3,
                          },
                          opacity: { duration: 0.2, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25 },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ delay: 0.1 }}
                        className="px-6 py-5 bg-gradient-to-br from-primary-50/50 to-accent-50/30 border-t-2 border-primary-200"
                      >
                        {item.content}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 p-8 bg-white rounded-xl border-2 border-primary-200 text-center"
        >
          <h3 className="text-xl font-semibold text-primary-900 mb-2">
            Not sure which coverage you need?
          </h3>
          <p className="text-gray-600 mb-5">
            Our insurance experts can recommend the right coverage for your situation
          </p>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-800 text-white rounded-full font-semibold hover:bg-primary-900 transition"
          >
            Call Our Team Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
