"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Heart, HandHeart } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

export default function GiveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="give"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Moving gradient background */}
      <motion.div
        style={{ x: bgX }}
        className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal"
      />

      {/* Decorative fire streaks */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-fire/10 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gold/8 to-transparent" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fire/10 border border-fire/20 mb-8">
            <HandHeart size={28} className="text-fire" weight="duotone" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-2xl mx-auto">
            For God loveth a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-fire">
              cheerful giver
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 text-ash text-base md:text-lg leading-relaxed max-w-xl mx-auto italic">
            &ldquo;Every man according as he purposeth in his heart, so let him
            give; not grudgingly, or of necessity.&rdquo;
          </p>
          <p className="mt-2 text-white/30 text-sm font-display">
            — 2 Corinthians 9:7
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <a
            href="#"
            className="inline-flex items-center gap-3 mt-12 px-12 py-5 bg-gradient-to-r from-fire to-fire-light text-white font-display font-bold text-base tracking-wide uppercase rounded-full hover:shadow-[0_0_60px_rgba(255,77,0,0.4)] transition-all duration-500 group"
          >
            <Heart size={20} weight="fill" className="group-hover:scale-125 transition-transform" />
            Give Online
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
