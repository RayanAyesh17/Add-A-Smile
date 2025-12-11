"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/app/layout";


export default function FeaturedGift() {
  const { openLogin } = useContext(AuthContext);
  return (
    <section className="py-28 bg-gradient-to-br from-[#E0F2FE] via-white to-[#FFF7E0]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <div className="relative">
          <img
            src="/images/ourImpact/hero.jpg"
            alt="Winter Warmth Program"
            className="rounded-3xl h-[420px] w-full object-cover shadow-lg"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 rounded-3xl bg-black/20"></div>
        </div>

        {/* Content */}
        <div>
          <span className="text-sm uppercase tracking-widest text-[#FFD166] font-medium">
            Featured Program
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-[#1A437E]">
            Winter Warmth Package
          </h2>

          <p className="mt-6 text-lg text-gray-700 max-w-lg leading-relaxed">
            A complete winter care package including warm clothing and essentials,
            delivered before Christmas to bring comfort and joy.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex gap-6">
            <button
              onClick={() => openLogin()}
              className="px-8 py-4 bg-[#1A437E] text-white font-semibold rounded-full shadow-md hover:bg-[#2C5BA9] transition-all duration-300 hover:shadow-lg"
            >
              Sponsor a Child
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
