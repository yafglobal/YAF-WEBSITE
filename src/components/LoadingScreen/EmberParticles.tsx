"use client";

import { motion } from "motion/react";
import type { Phase } from "./types";
import { emberData, burstEmberData } from "./emberData";

interface EmberParticlesProps {
  phase: Phase;
  intensity: number;
}

export default function EmberParticles({ phase, intensity }: EmberParticlesProps) {
  return (
    <>
      {/* Rising ember particles */}
      {emberData.map((ember, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute rounded-full"
          animate={{
            y: phase === "burst" ? [-20, -300] : [-20, -80 - 60 * intensity],
            x: [0, ember.drift * intensity],
            opacity: phase === "burst" ? [0.9, 0] : [0, 0.8 * intensity, 0],
            scale: phase === "burst" ? [1, 0] : [0.5, 1, 0.3],
          }}
          transition={{
            duration: phase === "burst" ? 0.5 : ember.dur,
            delay: ember.delay,
            repeat: phase === "burst" ? 0 : Infinity,
            ease: "easeOut",
          }}
          style={{
            width: ember.size,
            height: ember.size,
            /* --color-plum-tint / --color-plum-light / --color-plum */
            background: i % 3 === 0 ? "#D4A0B9" : i % 3 === 1 ? "#A85A8A" : "#861657",
            left: `${ember.x}%`,
            bottom: "50%",
            filter: "blur(0.5px)",
            boxShadow: `0 0 ${ember.size * 2}px ${i % 2 === 0 ? "rgba(134,22,87,0.6)" : "rgba(212,160,185,0.6)"}`,
          }}
        />
      ))}

      {/* Burst embers -- only visible during burst phase */}
      {phase === "burst" &&
        burstEmberData.map((b, i) => {
          const rad = (b.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * b.dist;
          const ty = Math.sin(rad) * b.dist;
          return (
            <motion.div
              key={`burst-${i}`}
              className="absolute rounded-full"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: tx,
                y: ty,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 0.7,
                delay: b.delay,
                ease: "easeOut",
              }}
              style={{
                width: b.size,
                height: b.size,
                /* --color-plum-tint / --color-plum-light / --color-plum-cream */
                background: i % 3 === 0 ? "#D4A0B9" : i % 3 === 1 ? "#A85A8A" : "#F5E6EF",
                boxShadow: `0 0 ${b.size * 3}px rgba(168,90,138,0.8)`,
              }}
            />
          );
        })}
    </>
  );
}
