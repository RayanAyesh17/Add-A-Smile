"use client";

import Link from "next/link";

export default function ProgramsHero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center py-24"
      style={{
        backgroundImage: "url('/images/ourImpact/smile2.jpg')", // replace with your hero background
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
        {/* Heading */}
        <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight mb-6">
          Christmas Gifts <br className="hidden md:block" />
          That Bring Real Joy
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-lg md:text-xl leading-relaxed mb-10 text-white/90 max-w-2xl mx-auto">
          Celebrate the season of giving by transforming generosity into meaningful
          moments for children and families. Each program spreads warmth, hope,
          and holiday cheer.
        </p>
      </div>
    </section>
  );
}
