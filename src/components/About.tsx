"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Fire, Users, Globe, Lightning } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { icon: Globe, value: "50+", label: "Countries" },
  { icon: Users, value: "100K+", label: "Youth Globally" },
  { icon: Fire, value: "1000+", label: "Chapters" },
  { icon: Lightning, value: "365", label: "Days Active" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-plum/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-plum-tint/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <ScrollReveal>
          <p className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            Who We Are
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Text content */}
          <div className="order-2 md:order-1">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Welcome to an{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-light to-plum-tint">
                  &ldquo;ENFIRED&rdquo;
                </span>{" "}
                Community
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-lg">
                Welcome to YAF, a youth community with a balanced commitment to spiritual growth and
                personal development. We are a community of mentors, leaders, and associates who
                focus on balancing talents and God-given purpose.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-4 text-[var(--color-text-muted)] text-base leading-relaxed max-w-lg">
                Kingdom Giant, welcome to YAF.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <a
                href="/about"
                className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-display font-semibold text-sm tracking-wide uppercase rounded-full hover:bg-[var(--color-surface-hover)] hover:border-plum/30 transition-all duration-300 group"
              >
                Learn more about us
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </ScrollReveal>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative">
            <ScrollReveal delay={0.2} direction="right">
              <div className="relative max-w-md mx-auto md:max-w-none">
                {/* Animated plum border (same as video section) */}
                <div className="plum-border">
                  <div className="aspect-[3/4] relative">
                    <motion.div style={{ y: imageY }} className="absolute inset-0">
                      <Image
                        src="/images/theme-image.png"
                        alt="Youth Alive Leadership"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Gradient fade on edges */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent opacity-60" />
                    </motion.div>
                  </div>
                </div>

                {/* Decorative glow beneath */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-plum/15 blur-[60px] rounded-full" />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 * i}>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-4 group-hover:border-plum/20 group-hover:bg-plum/5 transition-all duration-300">
                  <stat.icon size={24} className="text-plum" weight="fill" />
                </div>
                <p className="font-display font-extrabold text-2xl md:text-4xl text-[var(--color-text-primary)] tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-[var(--color-text-secondary)] text-sm tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
