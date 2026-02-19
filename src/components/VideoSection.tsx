"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Play } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section id="events" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4 flex items-center justify-center gap-2">
              <Play size={14} weight="fill" />
              Watch & Experience
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Experience the <span className="text-glow-plum text-plum">Fire</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Watch highlights from Jubilee 1.0 and other powerful gatherings that are transforming
              lives across the globe.
            </p>
          </ScrollReveal>
        </div>

        {/* Video embed with plum border */}
        <ScrollReveal delay={0.3}>
          <motion.div style={{ scale: videoScale }} className="relative">
            {/* Plum border wrapper */}
            <div className="plum-border">
              <div className="video-container bg-[var(--color-surface)]">
                <iframe
                  src="https://www.youtube.com/embed/optmgB8AZDI?si=JO3ZUiv-qZIMWffu"
                  title="JUBILEE 1.0 | YOUTHALIVE GLOBAL"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Decorative glow beneath */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-plum/15 blur-[60px] rounded-full" />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
