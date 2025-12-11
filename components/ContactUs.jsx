"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const handleSubmit = async (formData) => {
  console.log("Form submitted with:", formData);
  return new Promise(resolve => setTimeout(() => resolve(true), 1000));
};

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const success = await handleSubmit(formData);
      if (success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pt-20 pb-16 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A437E] mb-3">
            Get in Touch
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            We're here to answer your questions and help you make an impact.
          </p>
        </motion.div>

        {/* Grid: Form & Map */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 bg-white p-8 rounded-xl shadow-lg flex flex-col"
          >
            <h2 className="text-xl font-bold text-[#1A437E] mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-5 flex-1 flex flex-col">

              {/* Status Messages */}
              {status === "success" && (
                <p className="p-3 bg-green-100 text-green-700 font-medium rounded-lg border border-green-300 text-sm">
                  Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="p-3 bg-red-100 text-red-700 font-medium rounded-lg border border-red-300 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}

              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-md text-sm focus:ring-[#FFD166] focus:border-[#FFD166] transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-md text-sm focus:ring-[#FFD166] focus:border-[#FFD166] transition"
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-md text-sm focus:ring-[#FFD166] focus:border-[#FFD166] transition"
              />

              {/* Message */}
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-md text-sm focus:ring-[#FFD166] focus:border-[#FFD166] transition flex-1"
              ></textarea>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                disabled={status === "submitting"}
                className="w-full px-6 py-3 bg-[#1A437E] text-white font-semibold rounded-full shadow-md hover:bg-[#112D55] text-sm disabled:bg-gray-400 transition mt-3"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-1 rounded-xl overflow-hidden shadow-lg h-full"
          >
            <iframe
              title="Charity Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086973792446!2d-122.41941518468145!3d37.77492977975962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sSan+Francisco!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
