"use client";

import { motion } from "framer-motion";
import { FaGift, FaChild, FaUsers, FaBook } from "react-icons/fa";
import Link from "next/link";

const impactMetrics = [
  { number: "500+", label: "Gifts Delivered", icon: <FaGift size={28} className="text-[#1A437E]" /> },
  { number: "1,200+", label: "Children Supported", icon: <FaChild size={28} className="text-[#1A437E]" /> },
  { number: "300+", label: "Families Assisted", icon: <FaUsers size={28} className="text-[#1A437E]" /> },
  { number: "150+", label: "Education Kits Provided", icon: <FaBook size={28} className="text-[#1A437E]" /> },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Stagger each card
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 12px 24px rgba(26, 67, 126, 0.2)",
    transition: { duration: 0.3 }
  }
};

export default function OurImpactSection() {
  return (
    <section className="relative py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-12">

        {/* Left Column: Heading + Paragraph */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A437E] mb-4">
            Our <span className="text-[#FFD166]">Impact</span>
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed border-l-2 border-[#FFD166] pl-3">
            Thanks to the support of our generous community, we’ve reached thousands of children and families, providing essential resources and creating lasting change. Every number represents a life touched.
          </p>
        </motion.div>

        {/* Right Column: 2x2 Grid Metrics + CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="md:w-1/2 flex flex-col justify-center gap-6"
        >
          <div className="grid grid-cols-2 gap-6">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="flex items-center bg-white p-4 rounded-xl shadow-md gap-3"
              >
                {metric.icon}
                <div className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-extrabold text-[#1A437E]">{metric.number}</span>
                  <p className="text-gray-700 text-sm md:text-base">{metric.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
            <Link href="/programs">
              <button className="mt-2 px-6 py-3 bg-[#FFD166] text-[#1A437E] font-semibold rounded-full shadow-lg hover:bg-[#F2A500] transition-colors duration-300 self-start">
                Explore Our Stories
              </button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
