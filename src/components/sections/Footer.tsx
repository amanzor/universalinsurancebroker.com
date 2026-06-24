"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Shield,
  Clock,
} from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
import { COMPANY } from "@/lib/constants";
import { asset } from "@/lib/utils";

const insuranceLinks = [
  { label: "Auto Insurance", href: "/auto-insurance" },
  { label: "Commercial Insurance", href: "/commercial-insurance" },
  { label: "Home Insurance", href: "/home-insurance" },
  { label: "Health Insurance", href: "/health-insurance" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Client Entry", href: "/client-entry" },
  { label: "Get a Quote", href: "/quote" },
];

const offices = [
  {
    city: "Boca Raton",
    address: "3200 N Federal Hwy Suite 224",
    state: "FL 33431",
  },
  {
    city: "Lehigh Acres",
    address: "111 Lee Blvd",
    state: "FL 33936",
  },
  {
    city: "Homestead",
    address: "30101 S Dixie Hwy",
    state: "FL 33033",
  },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  return (
    <footer
      ref={ref}
      className="bg-gradient-to-b from-primary-900 to-primary-950 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <div className="flex items-center gap-2 mb-4">
              <Image src={asset("/images/logo-hd.png")} alt="Universal Insurance Brokers" width={160} height={53} className="h-12 w-auto object-contain mix-blend-screen" />
            </div>
            <p className="text-sm font-semibold text-gray-300 mb-3">
              All Your Insurance Policies Under One Roof
            </p>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Your trusted insurance partner in Florida. We help individuals and
              businesses find the right coverage at competitive rates with
              personalized service you can count on.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Insurance Services */}
          <motion.div
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Insurance Services
            </h3>
            <ul className="space-y-3">
              {insuranceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h3>
            <div className="space-y-4">
              {offices.map((office) => (
                <div key={office.city} className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                  <div className="text-sm text-gray-400">
                    <span className="font-medium text-gray-300">
                      {office.city}:
                    </span>{" "}
                    {office.address}, {office.state}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                <a
                  href="tel:2392042208"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  (239) 204-2208
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                <a
                  href="mailto:universalinsurancebroker@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  universalinsurancebroker@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>&copy; 2016 Universal Insurance Brokers&trade;. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Licensed Insurance Broker - State of Florida
          </p>
        </div>
      </div>
    </footer>
  );
}
