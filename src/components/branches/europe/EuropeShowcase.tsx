"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

const showcaseItems = [
  {
    src: "/ukyaf/ayac-praise-singer.webp",
    alt: "AYAC praise singer on stage",
    label: "AYAC Conference",
    city: "Dartford, UK",
    objectPosition: "center top",
  },
  {
    src: "/ukyaf/ayac-worship-leader.webp",
    alt: "AYAC worship leader",
    label: "Worship Night",
    city: "London, UK",
    objectPosition: "center 25%",
  },
  {
    src: "/ukyaf/ayac-prayer-session.webp",
    alt: "Prayer session at AYAC",
    label: "Prayer Summit",
    city: "Birmingham, UK",
  },
  {
    src: "/ukyaf/southampton-congregation-worship.webp",
    alt: "Southampton congregation",
    label: "Sunday Encounter",
    city: "Southampton, UK",
  },
  {
    src: "/ukyaf/ayac-keyboardist.webp",
    alt: "Keyboardist at AYAC Europe worship",
    label: "The Sound",
    city: "Dartford, UK",
    objectPosition: "center top",
  },
  {
    src: "/ukyaf/ayac-europe-speaker.webp",
    alt: "Europe conference speaker",
    label: "Word Conference",
    city: "Dartford, UK",
  },
];

export default function EuropeShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      {/* Ambient atmosphere */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-500/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-plum/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-blue-400" />
                <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px]">
                  Photo Essay
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
                Across Every
                <br />
                <span className="italic text-blue-400">Border</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-md font-light leading-relaxed">
              From conferences in Dartford to fellowships across the United Kingdom, the fire burns
              brighter with every gathering.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Horizontal scroll reel */}
      <motion.div style={{ x }} className="flex gap-6 md:gap-8 pl-6 md:pl-10">
        {showcaseItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="flex-shrink-0 group relative w-[320px] md:w-[400px] lg:w-[480px]"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                sizes="(max-width: 768px) 320px, (max-width: 1200px) 400px, 480px"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* City badge */}
              <div className="absolute top-5 left-5">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                  <MapPin weight="fill" className="w-3.5 h-3.5 text-blue-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                    {item.city}
                  </span>
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-display font-bold italic text-2xl md:text-3xl text-white leading-none mb-2">
                  {item.label}
                </h3>
                <div className="h-px w-12 bg-blue-400 opacity-60 group-hover:w-20 transition-all duration-500" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex justify-center"
      >
        <div className="flex items-center gap-3 text-[var(--color-text-muted)]">
          <div className="w-8 h-[1px] bg-[var(--color-border)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Scroll to explore
          </span>
          <div className="w-8 h-[1px] bg-[var(--color-border)]" />
        </div>
      </motion.div>
    </section>
  );
}
