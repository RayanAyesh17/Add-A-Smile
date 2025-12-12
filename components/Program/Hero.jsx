import Image from "next/image";

export default function ProgramsHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 sm:py-24">
      <Image
        src="/images/ourImpact/smile2.jpg"
        alt="Hero"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-6">
          Christmas Gifts <br className="hidden md:block" /> That Bring Real Joy
        </h1>
        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 text-white/90 max-w-2xl mx-auto">
          Celebrate the season of giving by transforming generosity into meaningful
          moments for children and families. Each program spreads warmth, hope, and holiday cheer.
        </p>
      </div>
    </section>
  );
}
