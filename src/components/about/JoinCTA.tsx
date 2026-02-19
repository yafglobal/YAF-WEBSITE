"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

/* Pre-computed ember particles for hydration safety */
const embers = [
  { left: 8, dur: 7, del: 0, size: 3, isGold: false },
  { left: 18, dur: 9, del: 1.2, size: 2, isGold: true },
  { left: 30, dur: 6.5, del: 0.5, size: 4, isGold: false },
  { left: 42, dur: 8.5, del: 2, size: 2, isGold: false },
  { left: 55, dur: 7, del: 3, size: 3, isGold: true },
  { left: 65, dur: 9.5, del: 0.8, size: 2, isGold: false },
  { left: 76, dur: 6, del: 1.5, size: 3, isGold: true },
  { left: 87, dur: 8, del: 2.5, size: 2, isGold: false },
  { left: 94, dur: 10, del: 0.3, size: 3, isGold: false },
];

export default function JoinCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.85, 0.7]);

  return (
    <section
      ref={sectionRef}
      className="relative py-36 md:py-52 overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20 -bottom-20 z-0"
      >
        <Image
          src="/images/about/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-[var(--color-background)]"
      />

      {/* Fire radial glow behind content */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `
            radial-gradient(ellipse at 50% 55%, rgba(255, 77, 0, 0.12) 0%, transparent 55%),
            linear-gradient(to top, var(--color-overlay), transparent)
          `,
        }}
      />

      {/* Ember particles */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {embers.map((e, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.dur}s`,
              animationDelay: `${e.del}s`,
              background: e.isGold ? "var(--color-gold)" : "var(--color-fire)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <ScrollReveal>
          <p className="text-fire font-display text-xs tracking-[0.4em] uppercase font-semibold mb-6">
            Get Involved
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-8xl leading-[1] tracking-tight max-w-5xl mx-auto">
            Ready to Become a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold text-glow-fire">
              Kingdom Giant?
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-[var(--color-text-secondary)] text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Join a vibrant community of purpose-driven youth making waves across
            the globe. Your journey to greatness starts here.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <a
              href="/"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-fire text-white font-display font-bold text-base tracking-wide rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,77,0,0.5)]"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-btn" />
              <span className="relative">Join YAF Today</span>
              <ArrowRight
                size={20}
                weight="bold"
                className="relative transition-transform group-hover:translate-x-1"
              />
            </a>

            {/* Secondary CTA */}
            <a
              href="/#give"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] font-display font-bold text-base tracking-wide rounded-full hover:border-gold/40 hover:bg-gold/5 transition-all duration-300"
            >
              Give Online
              <ArrowRight
                size={20}
                weight="bold"
                className="text-gold transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </ScrollReveal>

        {/* Decorative fire line */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-fire/50" />
            <div className="w-2 h-2 rounded-full bg-fire/40" />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-fire/50" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
