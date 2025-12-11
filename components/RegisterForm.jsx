// components/RegisterForm.jsx
"use client";

import { useState } from "react";
import { FaUserPlus, FaSpinner } from "react-icons/fa";

export default function RegisterForm({ switchToLogin, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "", // Added phone
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed.");
      } else {
        if (onClose) onClose();
        window.location.reload(); // Refresh Navbar
      }
    } catch (err) {
      setError("Network error, try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-3xl font-extrabold text-[var(--accent)] flex items-center justify-center">
        <FaUserPlus className="mr-2" /> Register
      </h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
        />
        {/* Phone Number Field */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--accent)] text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md flex items-center justify-center disabled:bg-indigo-400"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" /> Registering...
            </>
          ) : (
            "Secure Register"
          )}
        </button>
      </form>
      <div className="border-t border-gray-200 pt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-blue-500 hover:text-blue-700 font-bold transition"
            disabled={loading}
          >
            Login Here
          </button>
        </p>
      </div>
    </div>
  );
}
