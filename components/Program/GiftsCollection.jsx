"use client";
import Image from "next/image";
import { programsGifts } from "@/data/programsGifts";
import { useContext } from "react";
import { AuthContext } from "@/app/layout";

export default function GiftsCollection() {
  const { openLogin } = useContext(AuthContext);

  return (
    <section className="py-24 bg-gradient-to-br from-[#E0F2FE] via-white to-[#FFF7E0]">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-4xl font-bold text-center text-[#1A437E] mb-16">
          More Activities
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programsGifts.map((gift, i) => (
            <article
              key={i}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-[320px]" // fixed height
            >
              {/* Image fills card */}
              <Image
                src={gift.image}
                alt={gift.title}
                fill
                className="object-cover transition-all duration-500 group-hover:blur-sm group-hover:brightness-75"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40">
                <h4 className="text-2xl font-semibold text-[#FFD166] drop-shadow-lg">
                  {gift.title}
                </h4>
                <p className="mt-3 text-white max-w-md">{gift.description}</p>
                <button
                  onClick={() => openLogin()}
                  className="mt-6 inline-block px-6 py-3 bg-[#1A437E] text-white font-semibold rounded-full shadow hover:bg-[#2C5BA9] transition-all duration-300"
                >
                  Sponsor a Child →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
