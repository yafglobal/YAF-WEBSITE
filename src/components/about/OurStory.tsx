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

  const image1Y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const image2Y = useTransform(scrollYProgress, [0, 1], ["-5%", "10%"]);
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

        {/* Content grid - asymmetric layout */}
        <div className="mt-20 grid lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Overlapping images column */}
          <div className="lg:col-span-7 relative min-h-[350px] sm:min-h-[450px] md:min-h-[640px]">
            {/* Primary image */}
            <ScrollReveal delay={0.2} direction="left">
              <motion.div
                style={{ y: image1Y }}
                className="relative w-[70%] sm:w-[75%] md:w-[65%] aspect-[3/4] rounded-2xl overflow-hidden z-10"
              >
                <Image
                  src="/images/about/worship-portrait.png"
                  alt="Youth worshipping at YAF"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 75vw, 40vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/60 via-transparent to-transparent" />
              </motion.div>
            </ScrollReveal>

            {/* Secondary image - overlapping */}
            <ScrollReveal delay={0.4} direction="right">
              <motion.div
                style={{ y: image2Y }}
                className="absolute right-0 top-[35%] sm:top-[30%] w-[50%] md:w-[50%] aspect-[4/3] rounded-2xl overflow-hidden z-20 shadow-2xl"
              >
                <Image
                  src="/images/about/fellowship-photo.png"
                  alt="Youth fellowship at YAF"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 55vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/40 via-transparent to-transparent" />

                {/* Decorative border glow */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
              </motion.div>
            </ScrollReveal>

            {/* Floating accent behind images */}
            <div className="absolute top-[15%] left-[30%] w-60 h-60 bg-fire/10 rounded-full blur-[80px] pointer-events-none z-0" />
          </div>

          {/* Text column */}
          <div className="lg:col-span-5 lg:pt-12">
            <ScrollReveal delay={0.3}>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-[1.8] mb-6">
                Community, development, and fellowship all in one place. Youth
                Alive Fellowship is your platform for spiritual edification,
                career advancement, and personal growth.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-[1.8] mb-8">
                We are a community of mentors, leaders, and associates who focus
                on balancing talents and God-given purpose. Get ready for a 360
                life transformation.
              </p>
            </ScrollReveal>

            {/* Pull quote */}
            <ScrollReveal delay={0.5}>
              <div className="relative pl-6 py-4">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-fire via-gold to-transparent rounded-full" />
                <p className="text-[var(--color-text-primary)] font-display font-bold text-xl md:text-2xl leading-snug">
                  &ldquo;Kingdom Giant, welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire to-gold">
                    YAF
                  </span>
                  &rdquo;
                </p>
              </div>
            </ScrollReveal>

            {/* Pillars */}
            <ScrollReveal delay={0.6}>
              <div className="mt-10 flex flex-wrap gap-3">
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
        </div>
      </div>
    </section>
  );
}
