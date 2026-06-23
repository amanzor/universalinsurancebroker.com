"use client";

import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function DealerVentures() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-3xl md:text-4xl font-bold text-primary-900 mb-8"
        >
          Dealer Ventures
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={1}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-lg text-primary-800 font-medium leading-relaxed mb-4">
            Our agency is dedicated to help Auto Dealers spot vehicles and increase product penetration. Some of our offices are located inside dealers where we help streamline sales process and provide one of the best in class customer retention.
          </p>
          <p className="text-base text-primary-700">
            For more info contact our dedicated business development team in the contact section top right.
          </p>
        </motion.div>

        {/* Video */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={2}
          className="max-w-3xl mx-auto"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full rounded-2xl shadow-lg"
          >
            <source src="/images/dealer-ventures.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}
