"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { BranchConfig } from "@/lib/branches-config";

interface Props {
  branch: BranchConfig;
}

export default function BranchHero({ branch }: Props) {
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
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0">
        <Image
          src={branch.heroImage}
          alt={`Youth Alive ${branch.name}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </motion.div>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, transparent 30%, var(--color-overlay) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(to top, var(--color-background), color-mix(in srgb, var(--color-background) 50%, transparent), transparent)`,
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(to right, color-mix(in srgb, var(--color-background) 60%, transparent), transparent, transparent)`,
        }}
      />

      {/* Large ghosted watermark */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 -left-2 md:left-4 z-[4] pointer-events-none select-none"
      >
        <span
          className="font-display font-extrabold text-[11rem] md:text-[17rem] lg:text-[22rem] leading-[0.75] tracking-tighter"
          style={{ color: "color-mix(in srgb, var(--color-foreground) 3%, transparent)" }}
        >
          {branch.watermark}
        </span>
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-24 w-full"
      >
        {/* Region badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-[2px] bg-plum" />
          <span className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold">
            {branch.region}
          </span>
        </motion.div>

        {/* Branch name */}
        <div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem] leading-[1] tracking-tight">
                Youth Alive
              </h1>
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem] leading-[1] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-light to-plum-tint">
                  {branch.name}
                </span>
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Gradient line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-[2px] mt-8 bg-gradient-to-r from-plum via-plum-tint/60 to-transparent max-w-xl origin-left"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-6 text-[var(--color-text-secondary)] text-lg md:text-xl max-w-xl leading-relaxed"
        >
          {branch.tagline}
        </motion.p>
      </motion.div>

      {/* Edge line at bottom */}
      <motion.div
        style={{ width: edgeLine }}
        className="absolute bottom-0 left-0 h-[1px] z-20 bg-gradient-to-r from-plum via-plum-tint to-transparent"
      />
    </section>
  );
}
