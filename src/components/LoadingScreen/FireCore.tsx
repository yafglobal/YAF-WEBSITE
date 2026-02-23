"use client";

import { motion } from "motion/react";
import type { Phase } from "./types";

interface FireCoreProps {
  phase: Phase;
  intensity: number;
}

export default function FireCore({ phase, intensity }: FireCoreProps) {
  return (
    <>
      {/* Base glow */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          width: phase === "burst" ? 600 : 80 + 120 * intensity,
          height: phase === "burst" ? 600 : 80 + 120 * intensity,
          opacity: phase === "burst" ? 0 : 0.6 * intensity,
        }}
        transition={{
          duration: phase === "burst" ? 0.5 : 1,
          ease: "easeOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(134, 22, 87, 0.5) 0%, rgba(155, 61, 112, 0.2) 50%, transparent 70%)",
          filter: `blur(${20 + 20 * intensity}px)`,
        }}
      />

      {/* Fire tongues -- CSS animated flames */}
      <div className="absolute flex items-end justify-center">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`flame-${i}`}
            className="loading-flame absolute"
            animate={{
              height:
                phase === "burst"
                  ? 0
                  : [
                      40 + 60 * intensity + i * 8,
                      60 + 80 * intensity + i * 12,
                      45 + 65 * intensity + i * 6,
                    ],
              opacity: phase === "burst" ? 0 : [0.7, 1, 0.7],
            }}
            transition={{
              duration: 0.6 + i * 0.1,
              repeat: phase === "burst" ? 0 : Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.08,
            }}
            style={{
              width: 20 + i * 4,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: `linear-gradient(to top, var(--color-plum) 0%, var(--color-plum-light) ${40 - i * 5}%, var(--color-plum-tint) ${75 + i * 3}%, rgba(245, 230, 239, 0.9) 100%)`,
              filter: `blur(${2 + i}px)`,
              transformOrigin: "bottom center",
              left: `${-10 + i * 5 - 10}px`,
              bottom: 0,
            }}
          />
        ))}
      </div>

      {/* Inner bright core */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          width: phase === "burst" ? 300 : 20 + 30 * intensity,
          height: phase === "burst" ? 300 : 20 + 30 * intensity,
          opacity: phase === "burst" ? 0 : [0.8, 1, 0.8],
        }}
        transition={{
          duration: phase === "burst" ? 0.4 : 0.8,
          repeat: phase === "burst" ? 0 : Infinity,
          repeatType: "reverse",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(245,230,239,0.9) 0%, rgba(212,160,185,0.6) 40%, rgba(134,22,87,0.3) 70%, transparent 100%)",
          filter: `blur(${4 + 6 * intensity}px)`,
        }}
      />
    </>
  );
}
