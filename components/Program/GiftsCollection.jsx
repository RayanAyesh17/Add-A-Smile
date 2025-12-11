import { programsGifts } from "@/data/programsGifts";
import Link from "next/link";

export default function GiftsCollection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#E0F2FE] via-white to-[#FFF7E0]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <h3 className="text-4xl font-bold text-center text-[#1A437E] mb-16">
          More Programs
        </h3>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programsGifts.map((gift, i) => (
            <article
              key={i}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <img
                src={gift.image}
                alt={gift.title}
                className="h-[320px] w-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:brightness-75"
              />

              {/* Overlay Content (hidden until hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h4 className="text-2xl font-semibold text-[#FFD166] drop-shadow-lg">
                  {gift.title}
                </h4>
                <p className="mt-3 text-white max-w-md">
                  {gift.description}
                </p>
                <Link
                  href="/programs"
                  className="mt-6 inline-block px-6 py-3 bg-[#1A437E] text-white font-semibold rounded-full shadow hover:bg-[#2C5BA9] transition-all duration-300"
                >
                  Sponsor a Child →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
