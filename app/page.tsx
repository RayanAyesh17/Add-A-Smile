"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowWeHelp from "@/components/HowWeHelp";
import OurImpact from "@/components/OurImpact";
import MissionSection from "@/components/MissionSection";
import GetInvolved from "@/components/GetInvolved";
import Footer from "@/components/Footer";
import MakeASmile from "@/components/MakeASmile";

// 1. Import motion from framer-motion
import { motion } from "framer-motion";

// Helper component for animating sections as they come into view
// Uses whileInView for scroll-based animation
import { ReactNode } from "react";

const AnimatedSection = ({
  children,
  delay = 0,
}: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }} // Start invisible and slightly below
    whileInView={{ opacity: 1, y: 0 }} // Animate to fully visible and original position
    viewport={{ once: true, amount: 0.2 }} // Only trigger once, when 20% of the element is visible
    transition={{ duration: 0.8, delay: delay, ease: "easeOut" }} // Smooth transition
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const user = null; // Assuming this is for future authentication checks

  // Base variants for a common, fast fade-in/slide-up
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* 1. Navbar - Simple Fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50"
      >
        <Navbar />
      </motion.div>


      {/* 2. Hero - A more dramatic, immediate animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
      >
        <Hero />
      </motion.div>

      {/* 3. The rest of the sections use the AnimatedSection helper
          for scroll-based fade-in/slide-up effects */}
      <AnimatedSection>
        <HowWeHelp />
      </AnimatedSection>

      <AnimatedSection>
        <MissionSection />
      </AnimatedSection>

      {/* Applying a slight delay to the next section for a staggered effect */}
      <AnimatedSection delay={0.2}>
        <OurImpact />
      </AnimatedSection>

      <AnimatedSection>
        <MakeASmile />
      </AnimatedSection>

      <AnimatedSection>
        <GetInvolved />
      </AnimatedSection>

      {/* Footer - No animation needed, or a simple fade-in if desired */}
      <Footer />

    </div>
  );
}