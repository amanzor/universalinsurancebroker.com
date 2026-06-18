"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Car,
  Building2,
  Home,
  HeartPulse,
  Shield,
  Award,
  Clock,
  MapPin,
  Phone,
  Star,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

function useAnimateInView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Section 1 — Hero                                                   */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "10+", label: "Insurance Carriers" },
  { value: "3", label: "Florida Locations" },
  { value: "100%", label: "Satisfaction" },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-900 to-primary-950">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image src="/images/hero-umbrella.png" alt="" fill className="object-cover object-center opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/70 to-primary-950" />
      </div>
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary-700/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-primary-600/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="space-y-6"
        >
          <motion.h1
            variants={fadeUp}
            transition={spring}
            className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Protect What Matters Most
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={spring}
            className="mx-auto max-w-2xl text-lg text-primary-200 sm:text-xl"
          >
            Welcome to the future of online insurance. Get a real price on your
            auto insurance in less than 10 minutes.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={spring}
            className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/quotes"
              className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent-500/30 transition hover:bg-accent-600"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              <Phone className="h-5 w-5" />
              Call Us Now
            </a>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              transition={spring}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 backdrop-blur-sm"
            >
              <p className="text-3xl font-bold text-accent-400">{s.value}</p>
              <p className="mt-1 text-sm text-primary-200">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Services                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: Car,
    title: "Auto Insurance",
    href: "/auto-insurance",
    description:
      "On-the-spot quotes in under 10 minutes with 10+ carriers to find you the lowest rate.",
  },
  {
    icon: Building2,
    title: "Commercial Insurance",
    href: "/commercial-insurance",
    description:
      "Coverage for 10,000+ business types — general liability, workers comp, commercial auto & more.",
  },
  {
    icon: Home,
    title: "Home Insurance",
    href: "/home-insurance",
    description:
      "Homeowners, landlord, and renters insurance with best-in-class quote comparisons.",
  },
  {
    icon: HeartPulse,
    title: "Health Insurance",
    href: "/health-insurance",
    description:
      "Individual health insurance at zero cost to you through the Affordable Care Act.",
  },
];

function ServicesSection() {
  const { ref, inView } = useAnimateInView();

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center"
        >
          <motion.h2
            variants={fadeUp}
            transition={spring}
            className="text-3xl font-bold text-primary-900 sm:text-4xl"
          >
            Comprehensive Insurance Solutions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={spring}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          >
            From auto to health, we&apos;ve got you covered with the best rates
            from 10+ carriers.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              transition={spring}
              whileHover={{ scale: 1.04, y: -4 }}
              className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-primary-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {s.description}
              </p>
              <Link
                href={s.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-600 transition hover:text-accent-700"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Why Choose Us                                          */
/* ------------------------------------------------------------------ */

const reasons = [
  {
    icon: Shield,
    title: "All Policies Under One Roof",
    description:
      "Manage all your insurance — auto, home, commercial, health — in one place with one trusted team.",
  },
  {
    icon: Award,
    title: "100% Satisfaction Guaranteed",
    description:
      "Free rate revisions anytime. We work for you, not the insurance companies.",
  },
  {
    icon: Clock,
    title: "10+ Years of Experience",
    description:
      "Our deep industry knowledge and carrier relationships mean better coverage at lower prices.",
  },
];

function WhyChooseUsSection() {
  const { ref, inView } = useAnimateInView();

  return (
    <section ref={ref} className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={spring}
          className="text-center text-3xl font-bold text-primary-900 sm:text-4xl"
        >
          Why Choose {COMPANY.name}?
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mt-14 grid gap-10 sm:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              transition={spring}
              className="text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                <r.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-primary-900">
                {r.title}
              </h3>
              <p className="mt-2 text-gray-600">{r.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — CTA Banner                                             */
/* ------------------------------------------------------------------ */

function CTABannerSection() {
  const { ref, inView } = useAnimateInView();

  return (
    <section
      ref={ref}
      className="bg-gradient-to-r from-accent-500 to-accent-600 py-20"
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <motion.h2
          variants={fadeUp}
          transition={spring}
          className="text-3xl font-bold text-white sm:text-4xl"
        >
          Ready to Save on Your Insurance?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={spring}
          className="mt-4 text-lg text-white/90"
        >
          Get your free quote in under 10 minutes. No obligations, no hidden
          fees.
        </motion.p>
        <motion.div
          variants={fadeUp}
          transition={spring}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <Link
            href="/quotes"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-accent-600 shadow-lg transition hover:bg-gray-50"
          >
            Quote My Insurance Now!
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href={`tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`}
            className="inline-flex items-center gap-2 text-white/90 transition hover:text-white"
          >
            <Phone className="h-5 w-5" />
            Or call us: {COMPANY.phone}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Locations                                              */
/* ------------------------------------------------------------------ */

function LocationsSection() {
  const { ref, inView } = useAnimateInView();

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={spring}
          className="text-center text-3xl font-bold text-primary-900 sm:text-4xl"
        >
          Visit Us at Our Florida Offices
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mt-14 grid gap-8 sm:grid-cols-3"
        >
          {COMPANY.locations.map((loc) => {
            const q = encodeURIComponent(
              `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`
            );
            return (
              <motion.div
                key={loc.name}
                variants={fadeUp}
                transition={spring}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary-900">
                  {loc.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {loc.address}
                  <br />
                  {loc.city}, {loc.state} {loc.zip}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${q}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-600 transition hover:text-accent-700"
                >
                  Get Directions <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Testimonial / Review CTA                               */
/* ------------------------------------------------------------------ */

function ReviewCTASection() {
  const { ref, inView } = useAnimateInView();

  return (
    <section ref={ref} className="bg-gray-50 py-24">
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={stagger}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <motion.div
          variants={fadeUp}
          transition={spring}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/20 text-gold-500"
        >
          <Star className="h-8 w-8" />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          transition={spring}
          className="mt-6 text-3xl font-bold text-primary-900 sm:text-4xl"
        >
          Your Opinion Matters!
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={spring}
          className="mt-4 text-lg text-gray-600"
        >
          We love hearing from our clients. Your feedback helps us serve you
          better.
        </motion.p>
        <motion.div variants={fadeUp} transition={spring} className="mt-8">
          <a
            href="https://g.page/r/universalinsurancebroker/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-primary-900"
          >
            Leave a Google Review
            <ExternalLink className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CTABannerSection />
      <LocationsSection />
      <ReviewCTASection />
    </main>
  );
}
