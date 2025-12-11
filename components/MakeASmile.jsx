"use client";

import { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "@/app/layout";

export default function MakeASmile() {
  const { setAuthOpen, setDefaultForm, isLoggedIn } = useContext(AuthContext);

  const handleCTAClick = () => {
    if (isLoggedIn) {
      window.location.href = "/give-smile";
    } else {
      setDefaultForm("login");
      setAuthOpen(true);
    }
  };

  // Variants for staggered animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[80vh] py-24 px-6 text-center 
                 bg-gradient-to-r from-[#1A437E] via-[#2D6A9F] to-[#1A437E] animate-gradient-x"
      style={{ backgroundSize: '400% 400%' }} 
    >
      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl"
        >
          Share a <span className="text-[#FFD166]">Smile</span> Today
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed"
        >
          One small gift, one big smile. Sponsor a child’s joy and be part of something magical.
          Every contribution counts — and every smile matters.
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCTAClick}
          className="px-10 py-4 bg-[#FFD166] text-[#1A437E] font-semibold rounded-full shadow-lg hover:bg-[#F2A500] transition-all duration-300
            hover:shadow-xl hover:brightness-110"
        >
          Start Your Impact
        </motion.button>
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-3 w-full overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap text-lg md:text-xl font-bold text-white/80 tracking-wide"
        >
          {Array(4)
            .fill("Share a Smile Today! Make Kids 10x Happier! Spread Joy! ")
            .map((text, i) => (
              <span key={i} className="mr-12">
                {text}
              </span>
            ))}
        </motion.div>
      </div>
    </section>
  );
}
