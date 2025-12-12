// components/LoginForm.jsx
"use client";

import { useState } from "react";
import { FaSignInAlt, FaSpinner } from "react-icons/fa";

export default function LoginForm({ switchToRegister, onClose }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed.");
            } else {
                if (onClose) onClose();

                // Redirect based on user role
                if (data.role === "donor") {
                    window.location.href = "/dashboard/donor";
                } else if (data.role === "admin") {
                    window.location.href = "/dashboard/admin"; 
                } else {
                    window.location.href = "/"; 
                }
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
                <FaSignInAlt className="mr-2" /> Log In
            </h3>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
                    {error}
                </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 rounded-lg
    border border-gray-400 sm:border-gray-300
    text-gray-900 placeholder-gray-700 sm:placeholder-gray-400
    focus:ring-indigo-500 focus:border-indigo-500
    disabled:bg-gray-100"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full p-3 rounded-lg
    border border-gray-400 sm:border-gray-300
    text-gray-900 placeholder-gray-700 sm:placeholder-gray-400
    focus:ring-indigo-500 focus:border-indigo-500
    disabled:bg-gray-100"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--accent)] text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md flex items-center justify-center disabled:bg-indigo-400"
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" /> Logging In...
                        </>
                    ) : (
                        "Secure Login"
                    )}
                </button>
            </form>
            <div className="border-t border-gray-200 pt-4 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                        onClick={switchToRegister}
                        className="text-red-500 hover:text-red-700 font-bold transition"
                        disabled={loading}
                    >
                        Register Here
                    </button>
                </p>
            </div>
        </div>
    );
}
