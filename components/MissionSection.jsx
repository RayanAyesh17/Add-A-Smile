"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MissionSection() {
  return (
    <section
      className="relative py-24 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/bg-about.png')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto px-6 text-center text-white"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFD166]">
          Our Mission
        </h2>

        <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">
          At Add-a-Smile, our mission is to foster a spirit of generosity and
          community by connecting families in need with caring supporters.
        </p>

        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/about"
            className="inline-block px-10 py-4 bg-[#FFD166] text-[#1A437E] font-semibold rounded-full shadow-lg 
            hover:bg-[#F2A500] transition-all duration-300 hover:shadow-xl"
          >
            Read More
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
