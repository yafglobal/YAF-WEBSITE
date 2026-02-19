"use client";

import { motion } from "motion/react";
import type { Phase } from "./types";

interface ProgressBarProps {
  phase: Phase;
  progress: number;
}

export default function ProgressBar({ phase, progress }: ProgressBarProps) {
  return (
    <motion.div
      className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-[min(12rem,60vw)] md:w-56"
      animate={{
        opacity: phase === "burst" || phase === "done" ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Track */}
      <div
        className="relative h-[2px] rounded-full overflow-hidden"
        style={{ background: "var(--color-text-primary)", opacity: 0.1 }}
      >
        {/* Fill */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--color-plum), var(--color-plum-mid), var(--color-plum-tint))",
            boxShadow: "0 0 12px rgba(134, 22, 87, 0.6)",
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Loading text */}
      <motion.p
        className="text-center mt-4 text-[10px] md:text-xs tracking-[0.3em] uppercase font-body"
        style={{ color: "var(--color-text-primary)", opacity: 0.3 }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        Igniting
      </motion.p>
    </motion.div>
  );
}
