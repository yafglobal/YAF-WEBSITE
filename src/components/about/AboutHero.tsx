"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "15%"]);
  const edgeLine = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[700px] flex items-end overflow-hidden"
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

      {/* Cinematic vignette — radial darken at edges + directional gradients */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(10,10,10,0.65) 100%)`,
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/50 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--color-background)]/60 via-transparent to-transparent" />

      {/* Fire particles */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {[
          { left: 5, dur: 10, del: 0, size: 3, op: 0.3 },
          { left: 15, dur: 8, del: 1.5, size: 2, op: 0.5 },
          { left: 25, dur: 12, del: 3, size: 4, op: 0.25 },
          { left: 40, dur: 9, del: 0.5, size: 2, op: 0.4 },
          { left: 55, dur: 11, del: 2.5, size: 3, op: 0.35 },
          { left: 70, dur: 8, del: 4, size: 2, op: 0.5 },
          { left: 82, dur: 10, del: 1, size: 3, op: 0.3 },
          { left: 93, dur: 7, del: 3.5, size: 2, op: 0.4 },
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

      {/* Large ghosted watermark */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 -left-2 md:left-4 z-[4] pointer-events-none select-none"
      >
        <span className="font-display font-extrabold text-[11rem] md:text-[17rem] lg:text-[22rem] leading-[0.75] tracking-tighter text-white/[0.03]">
          YA
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full"
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

        {/* Stacked title — two dramatic lines */}
        <div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem] leading-[1] tracking-tight">
                About Youth
              </h1>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem] leading-[1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold">
                  Alive
                </span>{" "}
                Fellowship
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Horizontal fire line reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] mt-8 bg-gradient-to-r from-fire via-gold/60 to-transparent max-w-xl origin-left"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-6 text-[var(--color-text-secondary)] text-lg md:text-xl max-w-xl leading-relaxed"
        >
          Your vibrant community of kingdom-focused high-flyers equipped to take
          the world by a storm.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-14 flex items-center gap-3"
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

      {/* Bottom edge fire line on scroll */}
      <motion.div
        style={{ width: edgeLine }}
        className="absolute bottom-0 left-0 h-[1px] z-20 bg-gradient-to-r from-fire via-gold to-transparent"
      />
    </section>
  );
}
