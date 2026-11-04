"use client";

import { useRef } from "react";
import Link from "next/link";
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
  Star,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { COMPANY } from "@/lib/constants";
import DealerVentures from "@/components/DealerVentures";
import ScrollHero from "@/components/ScrollHero";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
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
/*  Section 2 — Services                                               */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: Car,
    title: "Auto Insurance",
    href: "/auto-insurance",
    description:
      "On-the-spot quotes in under 10 minutes with 100+ carriers to find you the lowest rate.",
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
            from 100+ carriers.
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
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-400 transition hover:text-accent-700"
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
    title: "ALL YOUR INSURANCE POLICIES UNDER ONE ROOF",
    description:
      "Manage all your insurance — auto, home, commercial, health — in one place with one trusted team.",
  },
  {
    icon: Award,
    title: "100% SATISFACTION GUARANTEED AND FREE RATE REVISIONS",
    description:
      "We work for you, not the insurance companies.",
  },
  {
    icon: Clock,
    title: "10+ YEARS OF EXPERIENCE IN THE INSURANCE INDUSTRY",
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
              <div className="silver-icon-3d mx-auto flex h-16 w-16 items-center justify-center rounded-full text-accent-600">
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
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-400 transition hover:text-accent-700"
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
            href="https://g.page/r/Ca_MqKD5ujKsEAE/review"
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
      <ScrollHero />
      <ServicesSection />
      <WhyChooseUsSection />
      <DealerVentures />
      <LocationsSection />
      <ReviewCTASection />
    </main>
  );
}
