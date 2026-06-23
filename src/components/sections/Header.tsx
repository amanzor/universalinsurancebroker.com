"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
const TwitterX = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn, asset } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ─── Top Bar ─── */}
      <div className="bg-primary-900 text-white text-sm">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-6">
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary-300" />
              {COMPANY.hours}
            </span>
            <a
              href={`mailto:${COMPANY.email}`}
              className="hidden md:flex items-center gap-1.5 hover:text-primary-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-primary-300" />
              {COMPANY.email}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={COMPANY.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary-300 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={COMPANY.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary-300 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={COMPANY.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-primary-300 transition-colors"
            >
              <TwitterX className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Nav ─── */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,1)",
          backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "blur(0px)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(0,0,0,0.04) inset"
            : "0 1px 0 rgba(255,255,255,0.6) inset, 0 -1px 0 rgba(0,0,0,0.03) inset",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "relative border-b transition-all duration-300",
          scrolled
            ? "border-accent-200/60"
            : "border-gray-100"
        )}
        style={{
          backgroundImage: scrolled
            ? "linear-gradient(180deg, rgba(240,242,245,0.5) 0%, rgba(255,255,255,0.92) 40%, rgba(245,247,250,0.6) 100%)"
            : "linear-gradient(180deg, rgba(250,251,252,1) 0%, rgba(255,255,255,1) 50%, rgba(245,247,250,0.8) 100%)",
        }}
      >
        {/* Animated shimmer sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,255,255,0.7) 45%, rgba(200,210,220,0.3) 50%, rgba(255,255,255,0.7) 55%, transparent 65%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
        {/* Animated bottom silver line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(170,180,194,0.5) 20%, rgba(220,225,232,0.8) 40%, rgba(244,245,250,1) 50%, rgba(220,225,232,0.8) 60%, rgba(170,180,194,0.5) 80%, transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative z-10 mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src={asset("/images/logo-hd.png")}
                alt="Universal Insurance Brokers"
                width={260}
                height={80}
                className="h-16 -my-4 w-auto object-contain mix-blend-multiply drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      dropdownOpen
                        ? "text-accent-400 bg-accent-50"
                        : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                    <motion.span
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" as const }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden"
                      >
                        {link.children.map((child, i) => (
                          <motion.div
                            key={child.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <Link
                              href={child.href}
                              onClick={() => setDropdownOpen(false)}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-700 transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              )
            )}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Phone className="h-4 w-4 text-primary-600" />
              </motion.span>
              {COMPANY.phone}
            </a>
            <Link
              href="/quotes"
              className="btn-silver-3d relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-primary-900 text-sm font-semibold transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Get a Quote</span>
              <motion.span
                className="absolute inset-0 bg-accent-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "blur(20px)" }}
              />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-gray-700" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* ─── Mobile Panel ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image src={asset("/images/logo-hd.png")} alt="UIB" width={120} height={40} className="h-8 w-auto object-contain" />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <nav className="p-4 space-y-1">
                {NAV_LINKS.map((link, i) =>
                  link.children ? (
                    <div key={link.label}>
                      <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.span>
                      </motion.button>
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden ml-3 border-l-2 border-primary-100"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-r-lg transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              <div className="p-4 space-y-3 border-t border-gray-100">
                <a
                  href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent-400" />
                  <span className="text-sm font-medium">{COMPANY.phone}</span>
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary-500" />
                  <span className="text-sm font-medium truncate">{COMPANY.email}</span>
                </a>
                <Link
                  href="/quotes"
                  onClick={() => setMobileOpen(false)}
                  className="btn-silver-3d block w-full text-center px-5 py-3 rounded-lg text-primary-900 font-semibold transition-all"
                >
                  Get a Quote
                </Link>
              </div>

              <div className="flex items-center justify-center gap-6 p-4 border-t border-gray-100">
                <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={COMPANY.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <TwitterX className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
