"use client";

import { HeartHandshake, ShieldCheck, Smile } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HowWeHelp() {
  return (
    <section className="bg-[#F3F7FF] py-14 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-semibold text-[var(--accent)]">
            How We Add Smiles
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
            A simple, safe process that connects donors with families in need —
            while keeping everyone’s privacy protected.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariant}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-md p-7 hover:shadow-xl transition-all border border-blue-50"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center mb-4"
            >
              <HeartHandshake className="w-6 h-6 text-yellow-500" />
            </motion.div>
            <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">
              Report a Family
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Anyone can confidentially report a family that needs support.
              Only age, gender, and basic needs are required.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariant}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-md p-7 hover:shadow-xl transition-all border border-blue-50"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4"
            >
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </motion.div>
            <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">
              We Verify Safely
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our team verifies each report with care while ensuring families
              stay anonymous and protected.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariant}
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl shadow-md p-7 hover:shadow-xl transition-all border border-blue-50"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4"
            >
              <Smile className="w-6 h-6 text-green-600" />
            </motion.div>
            <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">
              Donors Add a Smile
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Donors provide essentials like milk, diapers, and food — privately
              and securely — bringing real help to real families.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
