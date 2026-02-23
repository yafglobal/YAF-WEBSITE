"use client";

import { motion } from "motion/react";
import type { Phase } from "./types";

interface LoadingLogoProps {
  phase: Phase;
  intensity: number;
}

export default function LoadingLogo({ phase, intensity }: LoadingLogoProps) {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center gap-2 select-none"
      animate={{
        opacity: phase === "igniting" ? 0 : phase === "burst" ? 0 : [0.7, 1, 0.7],
        scale: phase === "burst" ? 1.5 : 1,
        y: phase === "igniting" ? 10 : 0,
      }}
      transition={{
        opacity: {
          duration: phase === "burst" ? 0.3 : 2,
          repeat: phase === "burst" || phase === "igniting" ? 0 : Infinity,
          repeatType: "reverse",
        },
        scale: { duration: 0.4 },
        y: { duration: 0.6 },
      }}
    >
      {/* Fire icon / flame symbol */}
      <motion.svg
        viewBox="0 0 40 56"
        className="w-10 h-14 md:w-12 md:h-16"
        animate={{
          filter: `drop-shadow(0 0 ${8 + 16 * intensity}px rgba(134, 22, 87, ${0.5 + 0.3 * intensity}))`,
        }}
        transition={{ duration: 0.8 }}
      >
        <defs>
          <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
            {/* --color-plum */}
            <stop offset="0%" stopColor="#861657" />
            {/* --color-plum-mid */}
            <stop offset="50%" stopColor="#9B3D70" />
            {/* --color-plum-tint */}
            <stop offset="85%" stopColor="#D4A0B9" />
            {/* --color-plum-cream */}
            <stop offset="100%" stopColor="#F5E6EF" />
          </linearGradient>
        </defs>
        <path
          d="M20 0 C20 0 8 16 8 28 C8 36 13 44 20 48 C20 40 26 34 28 28 C30 34 32 38 32 42 C36 38 38 32 38 28 C38 16 20 0 20 0 Z"
          fill="url(#flameGrad)"
        />
        <path
          d="M20 20 C20 20 14 28 14 34 C14 38 17 42 20 44 C23 42 26 38 26 34 C26 28 20 20 20 20 Z"
          fill="#F5E6EF" /* --color-plum-cream */
          opacity="0.7"
        />
      </motion.svg>

      {/* Brand text */}
      <motion.span
        className="font-display text-xs md:text-sm tracking-[0.4em] uppercase font-bold"
        style={{
          background:
            "linear-gradient(to right, var(--color-plum), var(--color-plum-tint), var(--color-plum-light))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Youth Alive
      </motion.span>
    </motion.div>
  );
}
