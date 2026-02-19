"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Heart } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

export default function GiveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section id="give" ref={sectionRef} className="relative py-40 md:py-52 overflow-hidden">
      {/* Parallax background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -inset-y-20">
        <Image
          src="/images/slider-2.jpeg"
          alt="Youth Alive congregation"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay — uses CSS var so light mode adapts */}
      <div className="absolute inset-0" style={{ backgroundColor: "var(--color-overlay)" }} />

      {/* Gradient blends */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)]" />

      {/* Plum glow at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-plum/10 rounded-full blur-[120px]" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 text-center"
      >
        <ScrollReveal>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-plum/10 border border-plum/20 mb-8">
            <Heart size={36} className="text-plum" weight="duotone" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground">
            For God loveth a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum-tint to-plum">
              cheerful giver
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-[var(--color-text-muted)] text-base md:text-xl leading-relaxed max-w-xl mx-auto italic font-light">
            &ldquo;Every man according as he purposeth in his heart, so let him give; not
            grudgingly, or of necessity.&rdquo;
          </p>
          <p
            className="mt-3 text-sm font-display font-medium tracking-wider"
            style={{ color: "color-mix(in srgb, var(--color-foreground) 25%, transparent)" }}
          >
            2 Corinthians 9:7
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://business.payaza.africa/pay/livingfaithchurch-youthalive"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-5 overflow-hidden rounded-full transition-all duration-500"
            >
              {/* Shimmer background */}
              <div className="absolute inset-0 bg-gradient-to-r from-plum via-plum-light to-plum shimmer-btn rounded-full" />
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_60px_rgba(134,22,87,0.5)]" />
              <span className="relative z-10 flex items-center gap-3 text-white font-display font-bold text-base tracking-wide uppercase">
                <Heart
                  size={20}
                  weight="fill"
                  className="group-hover:scale-125 transition-transform"
                />
                Give Online
              </span>
            </a>
          </div>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}
