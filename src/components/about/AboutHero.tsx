"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

const words = ["About", "Youth", "Alive", "Fellowship"];

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] flex items-end overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/about/hero-bg.jpg"
          alt="Youth Alive Fellowship community"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/40 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--color-background)]/70 via-transparent to-transparent" />

      {/* Animated fire particles at edges */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {[
          { left: 8, dur: 9, del: 0, size: 3, op: 0.4 },
          { left: 15, dur: 7, del: 1.5, size: 2, op: 0.6 },
          { left: 25, dur: 11, del: 3, size: 4, op: 0.3 },
          { left: 45, dur: 8, del: 0.5, size: 2, op: 0.5 },
          { left: 60, dur: 10, del: 2, size: 3, op: 0.4 },
          { left: 78, dur: 9, del: 4, size: 2, op: 0.6 },
          { left: 92, dur: 7, del: 1, size: 3, op: 0.3 },
        ].map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.del}s`,
              width: p.size,
              height: p.size,
              opacity: p.op,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full"
      >
        {/* Breadcrumb tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-[2px] bg-fire" />
          <span className="text-fire font-display text-xs tracking-[0.4em] uppercase font-semibold">
            Who We Are
          </span>
        </motion.div>

        {/* Title with staggered word reveal */}
        <div className="overflow-hidden">
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.02] tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-[0.3em]"
              >
                {i === 2 ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-6 text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          Your vibrant community of kingdom-focused high-flyers equipped to take
          the world by a storm.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex items-center gap-3"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-fire to-transparent"
          />
          <span className="text-[var(--color-text-muted)] text-xs tracking-[0.3em] uppercase">
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
