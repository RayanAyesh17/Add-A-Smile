// components/Navbar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import AuthModal from "./AuthModal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formType, setFormType] = useState("register");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Activities", href: "/programs" },
    { name: "Report A Family", href: "/report-a-family" },
    { name: "Contact", href: "/contact" },

  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="bg-white text-gray-800 shadow-lg sticky top-0 w-full z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10">
                  <img
                    src="/images/logo.jpg"
                    alt="NGO Logo"
                    className="object-contain w-full h-full rounded-full"
                  />
                </div>
                <span className="text-xl font-bold text-[var(--accent)] hidden sm:inline">
                  Add A  <span className="text-[#FFD166]">Smile</span>
                </span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center text-base font-medium mr-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 border-b-2 border-transparent hover:border-yellow-400 transition duration-300 font-bold text-[var(--accent)]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Desktop Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 rounded-full text-[var(--accent)] hover:bg-blue-50 hover:text-yellow-400 transition duration-150"
                  aria-label="User Menu"
                >
                  <FaUserCircle className="text-2xl" />
                </button>

                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    {formType === "register" ? (
                      <RegisterForm
                        onClose={() => setDropdownOpen(false)}
                        switchToLogin={() => setFormType("login")}
                      />
                    ) : (
                      <LoginForm
                        onClose={() => setDropdownOpen(false)}
                        switchToRegister={() => setFormType("register")}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Donate Button */}
              <Link
                href="/donate"
                className="px-4 py-2 bg-[#FFD166] text-[#1A437E] font-semibold rounded-full shadow-lg hover:bg-[#F2A500] transition duration-300 ease-in-out flex items-center space-x-2"
              >
                <FaHeart className="w-4 h-4" />
                <span>Sponsor a Family</span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden focus:outline-none text-blue-800 p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 text-gray-800 px-4 pt-2 pb-4 space-y-1 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-50 hover:text-yellow-400"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile User Icon */}
            <button
              onClick={() => {
                setIsMobileModalOpen(true);
                setMobileOpen(false);
              }}
              className="w-full flex items-center justify-start px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-50 hover:text-yellow-400"
            >
              <FaUserCircle className="text-2xl mr-2" />
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Auth Modal */}
      <AuthModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
      />
    </>
  );
}
