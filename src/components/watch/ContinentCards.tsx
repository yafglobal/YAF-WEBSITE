"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Play, ArrowRight } from "@phosphor-icons/react";

interface ContinentCardData {
  name: string;
  slug: string;
  videoCount: number;
  countries: { name: string; flag: string }[];
}

interface ContinentCardsProps {
  continents: ContinentCardData[];
}

// Each continent gets a distinct gradient personality
const gradients: Record<string, string> = {
  africa:
    "radial-gradient(ellipse at 30% 80%, rgba(180, 100, 50, 0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(134, 22, 87, 0.4) 0%, transparent 50%), linear-gradient(160deg, #2a1a12 0%, #1a0e0a 40%, #12080c 100%)",
  "north-america":
    "radial-gradient(ellipse at 70% 80%, rgba(60, 59, 110, 0.6) 0%, transparent 60%), radial-gradient(ellipse at 30% 20%, rgba(134, 22, 87, 0.3) 0%, transparent 50%), linear-gradient(160deg, #141428 0%, #0e0e1a 40%, #0c0810 100%)",
  europe:
    "radial-gradient(ellipse at 50% 80%, rgba(134, 22, 87, 0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(212, 160, 185, 0.2) 0%, transparent 50%), linear-gradient(160deg, #1e0c1a 0%, #140a12 40%, #0c060a 100%)",
};

export default function ContinentCards({ continents }: ContinentCardsProps) {
  return (
    <section className="px-6 md:px-12 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-black text-[var(--color-text-primary)] tracking-tight mb-2">
          Browse by Continent
        </h2>
        <p className="text-[var(--color-text-muted)] text-sm md:text-base mb-10">
          Explore services, conferences and worship nights from chapters worldwide.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {continents.map((continent, i) => (
          <motion.div
            key={continent.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              href={`/watch/${continent.slug}`}
              className="group relative block h-[380px] md:h-[420px] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-plum/30 transition-all duration-500"
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: gradients[continent.slug] || gradients.africa }}
              />

              {/* Subtle crosshatch pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 11px)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-7">
                {/* Video count badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.06] text-white/70 text-xs font-medium">
                    <Play weight="fill" className="w-3 h-3" />
                    {continent.videoCount} videos
                  </span>
                </div>

                {/* Bottom content */}
                <div>
                  <h3 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300">
                    {continent.name}
                  </h3>

                  {/* Country flags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {continent.countries.map((country) => (
                      <span
                        key={country.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-white/80 text-xs font-medium"
                      >
                        <span className="text-sm">{country.flag}</span>
                        {country.name}
                      </span>
                    ))}
                  </div>

                  {/* Explore CTA */}
                  <span className="inline-flex items-center gap-2 text-white/80 text-sm font-semibold group-hover:text-white transition-colors">
                    Explore
                    <ArrowRight
                      weight="bold"
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
