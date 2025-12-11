"use client";

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
// Import the colors from Palette 1 for consistency
const COLOR_NAVY = "#1A437E"; // Deep Navy
const COLOR_GOLD = "#EAB308"; // Soft Gold/Amber

export default function Footer() {
  return (
    // 1. Use COLOR_NAVY (Deep Navy) for the background for a trustworthy, strong foundation
    <footer 
      className="py-16" 
      style={{ backgroundColor: COLOR_NAVY, fontFamily: 'var(--font-outfit)' }} 
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-white">
        
        {/* Logo / Brand (Column 1) */}
        <div className="flex flex-col items-start space-y-4 md:col-span-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Add-a-Smile
          </h1>
          <p className="text-gray-300 max-w-xs text-sm">
            Bringing joy and relief to families in need, one smile at a time.
          </p>
          
          {/* Social Media Links */}
          <div className="flex space-x-3 mt-4">
            {/* The social icon background is improved for better visibility and hover contrast */}
            <a
              href="#"
              className="bg-white/10 p-2 rounded-full hover:shadow-lg transition-all duration-300"
              style={{ color: COLOR_GOLD, borderColor: COLOR_GOLD }}
            >
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-white/10 p-2 rounded-full hover:shadow-lg transition-all duration-300"
              style={{ color: COLOR_GOLD }}
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="bg-white/10 p-2 rounded-full hover:shadow-lg transition-all duration-300"
              style={{ color: COLOR_GOLD }}
            >
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links (Column 2) - Increased columns for better link organization */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-white">
            Quick Links
          </h3>
          {/* Gold hover for key interaction */}
          <a href="/" className="text-gray-300 hover:underline transition-colors" style={{ hover: { color: COLOR_GOLD } }}>
            Home
          </a>
          <a href="/about" className="text-gray-300 hover:underline transition-colors" style={{ hover: { color: COLOR_GOLD } }}>
            About Us
          </a>
          <a href="/donate" className="text-gray-300 hover:underline transition-colors" style={{ hover: { color: COLOR_GOLD } }}>
            Donate
          </a>
        </div>
        
        {/* More Links (Column 3) - Separated long link list */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-white">
            Ways to Help
          </h3>
          <a href="/sponsor" className="text-gray-300 hover:underline transition-colors" style={{ hover: { color: COLOR_GOLD } }}>
            Sponsor a Family
          </a>
          <a href="/report-family" className="text-gray-300 hover:underline transition-colors" style={{ hover: { color: COLOR_GOLD } }}>
            Report a Family
          </a>
          <a href="/volunteer" className="text-gray-300 hover:underline transition-colors" style={{ hover: { color: COLOR_GOLD } }}>
            Volunteer
          </a>
        </div>

        {/* Contact (Column 4) */}
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-white">
            Get in Touch
          </h3>
          <p className="text-gray-300">
            Email: <a href="mailto:info@add-a-smile.org" className="hover:underline transition-colors" style={{ hover: { color: COLOR_GOLD } }}>info@add-a-smile.org</a>
          </p>
          <p className="text-gray-300">
            Phone: <a href="tel:+1234567890" className="hover:underline transition-colors" style={{ hover: { color: COLOR_GOLD } }}>+1 234 567 890</a>
          </p>
          <p className="text-gray-300">
            Address: 123 Smiles Street, Happy Town, Earth
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-white/20 mt-16 pt-6 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} Add-a-Smile. All rights reserved. Registered Charity No. 98765.
      </div>
    </footer>
  );
}