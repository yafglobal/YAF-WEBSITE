"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import ScrollReveal from "../ScrollReveal";

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-fire/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-gold/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Top: Large statement */}
        <div className="max-w-4xl">
          <ScrollReveal>
            <p className="text-fire font-display text-xs tracking-[0.4em] uppercase font-semibold mb-6">
              Our Story
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              An All-Rounded{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold">
                Experience
              </span>
            </h2>
          </ScrollReveal>

          {/* Animated divider */}
          <motion.div
            style={{ width: lineWidth }}
            className="h-[2px] mt-8 bg-gradient-to-r from-fire via-gold to-transparent"
          />
        </div>

        {/* Content: asymmetric grid */}
        <div className="mt-20 grid lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Primary image column */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.2} direction="left">
              <motion.div
                style={{ y: imageY }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/about/worship-portrait.png"
                  alt="Youth worshipping at YAF"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
              </motion.div>
            </ScrollReveal>
          </div>

          {/* Text + secondary image column */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-10 lg:pt-8">
            {/* Text block */}
            <div>
              <ScrollReveal delay={0.3}>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-[1.8] mb-6 max-w-xl">
                  Community, development, and fellowship all in one place. Youth
                  Alive Fellowship is your platform for spiritual edification,
                  career advancement, and personal growth.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-[1.8] mb-8 max-w-xl">
                  We are a community of mentors, leaders, and associates who focus
                  on balancing talents and God-given purpose. Get ready for a 360
                  life transformation.
                </p>
              </ScrollReveal>

              {/* Pull quote */}
              <ScrollReveal delay={0.5}>
                <div className="relative py-6">
                  <span className="font-display font-extrabold text-6xl md:text-7xl leading-none text-transparent bg-clip-text bg-gradient-to-br from-fire/40 to-gold/20 select-none">
                    &ldquo;
                  </span>
                  <p className="mt-1 text-[var(--color-text-primary)] font-display font-bold text-xl md:text-2xl leading-snug">
                    Kingdom Giant, welcome to{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire to-gold">
                      YAF
                    </span>
                    &rdquo;
                  </p>
                </div>
              </ScrollReveal>

              {/* Pillars */}
              <ScrollReveal delay={0.6}>
                <div className="mt-4 flex flex-wrap gap-3">
                  {["Spiritual Growth", "Career Advancement", "Personal Development", "Community"].map(
                    (pillar) => (
                      <span
                        key={pillar}
                        className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full hover:border-fire/20 hover:text-fire transition-all duration-300"
                      >
                        {pillar}
                      </span>
                    )
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Secondary image — wide landscape, placed naturally in flow */}
            <ScrollReveal delay={0.5} direction="right">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/fellowship-photo.png"
                  alt="Youth fellowship at YAF"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/40 via-transparent to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
