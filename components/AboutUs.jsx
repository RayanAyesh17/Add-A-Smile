"use client";

import { motion } from "framer-motion";
import { FaHandsHelping, FaEye, FaBullseye, FaHandshake } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "@/app/layout";


const values = [
    {
        title: "Compassion",
        description: "Putting the needs and well-being of every child and family at the heart of our decisions.",
        icon: <FaHandsHelping className="text-[#FFD166]" />
    },
    {
        title: "Transparency",
        description: "Operating with openness and integrity so every donor knows where their generosity goes.",
        icon: <FaEye className="text-[#FFD166]" />
    },
    {
        title: "Impact",
        description: "Focusing our efforts on delivering tangible, measurable results and creating lasting change.",
        icon: <FaBullseye className="text-[#FFD166]" />
    },
    {
        title: "Dedication",
        description: "Commitment to serving our community with unwavering effort and enthusiasm.",
        icon: <FaHandshake className="text-[#FFD166]" />
    },
];

const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, delay: 0.2 } },
};


export default function AboutUs() {
    const { openLogin } = useContext(AuthContext);
    return (
        <div className="w-full bg-white">

            {/* --- Hero Section --- */}
            <section className="relative pt-16 pb-20 bg-gradient-to-br from-[#1A437E]/90 to-[#1A437E]/60 text-center overflow-hidden">
                {/* Background Illustration */}
                <div className="absolute inset-0">
                    <img src="/images/bg-about.png" alt="" className="w-full h-full object-cover opacity-20" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={headerVariants}
                        className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-snug"
                    >
                        Our Mission: Bringing <span className="text-[#FFD166]">Smiles</span> to Every Child
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
                    >
                        At Add-a-Smile, we connect compassionate supporters with families in need, providing gifts, essentials, and emotional support to create lasting impact.
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openLogin()}  
                        className="px-8 py-3 bg-[#FFD166] text-[#1A437E] font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Get Involved
                    </motion.button>

                </div>
            </section>

            {/* --- Mission & Vision Section --- */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center"
                    >
                        <h2 className="text-4xl font-bold text-[#1A437E] mb-4">Our Driving Force</h2>
                        <p className="text-gray-700 text-lg leading-relaxed mb-6 border-l-4 border-[#FFD166] pl-4">
                            At Add-a-Smile, our mission is to cultivate a spirit of generosity and community by connecting individuals and families in need with compassionate supporters who 'adopt' them during the holiday season and throughout the year. We aim to bring joy, relief, and hope by providing toys, food, clothing, essential necessities, and emotional support, creating brighter futures—one smile at a time.
                        </p>
                        <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-[#FFD166] pl-4">
                            Our vision is to foster a global community where compassion is easily translated into action, ensuring no child or family feels unsupported.
                        </p>
                    </motion.div>

                    {/* Placeholder Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="h-80 w-full rounded-xl overflow-hidden shadow-lg"
                    >
                        <img
                            src="/images/AboutUs.jpg"
                            alt="Happy children and families"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                </div>
            </section>

            {/* --- Our Story Section --- */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-[#1A437E] mb-6"
                    >
                        How We Started
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-600 text-lg leading-loose"
                    >
                        Founded in 2022 by a group of friends who noticed the gap between willing donors and families in need, Add-a-Smile began by sponsoring birthday gifts for local children. Today, we connect thousands of generous hearts directly to vetted families, ensuring every donation delivers a tangible gift or service. We remove barriers, simplify giving, and focus on real, measurable impact.
                    </motion.p>
                </div>
            </section>

            {/* --- Values Section --- */}
            <section className="py-20 px-6 bg-blue-50">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-4xl font-bold text-[#1A437E] mb-12"
                    >
                        Our Core Values
                    </motion.h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-[#FFD166] hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start gap-3"
                            >
                                <div className="text-3xl">{value.icon}</div>
                                <h3 className="text-xl font-bold text-[#1A437E]">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
