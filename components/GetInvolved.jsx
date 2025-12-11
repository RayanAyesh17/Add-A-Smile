"use client";

import { motion } from "framer-motion";

export default function GetInvolvedRoadmap() {
  const steps = [
    {
      title: "Donate",
      description:
        "Support families in need with your generous donation and help us bring smiles this holiday season.",
      link: "/donate",
    },
    {
      title: "Sponsor a Family",
      description:
        "Adopt a family and provide gifts, food, and necessities to make their season joyful and warm.",
      link: "/sponsor",
    },
    {
      title: "Report a Poor Family",
      description:
        "Know a family in need? Report them to us and help us reach them with essential financial and emotional support.",
      link: "/report-a-family",
    },
  ];

  // Container variants to stagger children
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(26, 67, 126, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-blue-100 font-[var(--font-outfit)]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent)] mb-14 tracking-tight">
          How You Can Get Involved
        </h2>

        <motion.div
          className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center relative md:w-1/3 group"
              variants={stepVariants}
              whileHover="hover"
            >
              {/* Step Badge */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFD166] to-[#F2A500] text-white font-bold text-lg shadow-md mb-4 z-10 group-hover:scale-110 transition-transform">
                {i + 1}
              </div>

              {/* Connector Line */}
              {i !== steps.length - 1 && (
                <div className="absolute top-7 right-0 w-full h-0.5 border-t-4 border-dashed border-[#FFD166] z-0 md:-right-1/2 animate-pulse"></div>
              )}

              {/* Step Card */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-left text-[var(--ink)]">
                <h3 className="text-xl font-semibold text-[var(--accent)] mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  {step.description}
                </p>
                <a
                  href={step.link}
                  className="block mx-auto w-fit px-5 py-2 bg-[#FFD166] text-[#1A437E] font-semibold rounded-full hover:bg-[#F2A500] transition"
                >
                  {step.title}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
