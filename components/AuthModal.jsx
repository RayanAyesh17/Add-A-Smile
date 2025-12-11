"use client";

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ isOpen, onClose, defaultForm = "login" }) {
  const [formType, setFormType] = useState(defaultForm);

  useEffect(() => {
    setFormType(defaultForm);
  }, [defaultForm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>

        {formType === "register" ? (
          <RegisterForm
            onClose={onClose}
            switchToLogin={() => setFormType("login")}
          />
        ) : (
          <LoginForm
            onClose={onClose}
            switchToRegister={() => setFormType("register")}
          />
        )}
      </div>
    </div>
  );
}
