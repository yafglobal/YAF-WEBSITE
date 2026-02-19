"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import ScrollReveal from "../ScrollReveal";

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
      className="relative py-32 md:py-44 overflow-hidden"
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

      {/* Fire gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-fire/10 via-transparent to-gold/5" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <ScrollReveal>
          <p className="text-fire font-display text-xs tracking-[0.4em] uppercase font-semibold mb-6">
            Get Involved
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl mx-auto">
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
              className="group relative inline-flex items-center gap-3 px-7 py-4 md:px-10 md:py-5 bg-fire text-white font-display font-bold text-sm md:text-base tracking-wide rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,77,0,0.4)]"
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
              className="group inline-flex items-center gap-3 px-7 py-4 md:px-10 md:py-5 bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] font-display font-bold text-sm md:text-base tracking-wide rounded-full hover:border-gold/40 hover:bg-gold/5 transition-all duration-300"
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

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
          <div className="w-1.5 h-1.5 rounded-full bg-fire" />
          <div className="w-12 h-[1px] bg-gradient-to-r from-fire to-transparent" />
        </div>
      </div>
    </section>
  );
}
