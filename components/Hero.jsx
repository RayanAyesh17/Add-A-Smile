"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full min-h-[70vh] flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-8 md:px-12 py-12 sm:py-16 bg-white overflow-hidden">

      {/* LEFT SIDE - Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 max-w-lg space-y-4 text-center md:text-left"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--accent)] mb-4 tracking-tight leading-snug"
        >
          Together, We Bring <span className="text-[#FFD166]">Smiles</span>
          <br /> to Families in Need
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-gray-600 text-base sm:text-lg"
        >
          We connect generous donors with vulnerable families to create real,
          direct, and meaningful impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 justify-center md:justify-start"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-blue-50 text-[var(--accent)] rounded-full font-semibold shadow hover:bg-blue-700 transition"
          >
            Sponsor a Family
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/report-a-family"
              className="inline-block px-5 py-2.5 bg-[#FFD166] text-[#1A437E] font-semibold rounded-full shadow-lg 
              hover:bg-[#F2A500] transition-all duration-300 hover:shadow-xl hover:brightness-110"
            >
              Report a Family
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] mb-8 md:mb-0"
      >
        {/* Soft blob background */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute inset-0 bg-blue-100 rounded-[45%]"
        />

        {/* Main image */}
        <motion.img
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          src="/images/hero/hero.png"
          alt="Happy child"
          className="absolute inset-0 w-full h-full object-cover rounded-[45%] shadow-lg"
        />
      </motion.div>
    </section>
  );
}
