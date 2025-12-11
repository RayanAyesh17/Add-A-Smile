"use client";

import "./globals.css";
import React, { ReactNode, useState } from "react";
import AuthModal from "@/components/AuthModal";

export const AuthContext = React.createContext<any>(null);

export default function RootLayout({ children }: { children: ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [defaultForm, setDefaultForm] = useState<"login" | "register">("login");

  const openLogin = () => {
    setDefaultForm("login");
    setAuthOpen(true);
  };

  const openRegister = () => {
    setDefaultForm("register");
    setAuthOpen(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
  };

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthContext.Provider
          value={{ openLogin, openRegister, closeAuth }}
        >
          <main>{children}</main>

          <AuthModal
            isOpen={authOpen}
            onClose={closeAuth}
            defaultForm={defaultForm}
          />
        </AuthContext.Provider>
      </body>
    </html>
  );
}
