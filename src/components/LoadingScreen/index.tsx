"use client";

import { motion, AnimatePresence } from "motion/react";
import { useLoadingPhase } from "./useLoadingPhase";
import FireCore from "./FireCore";
import EmberParticles from "./EmberParticles";
import LoadingLogo from "./LoadingLogo";
import ProgressBar from "./ProgressBar";

export default function LoadingScreen() {
  const { phase, visible, progress, intensity } = useLoadingPhase();

  if (!visible && phase === "done") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "var(--color-charcoal-deep)" }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          {/* Ambient radial glow -- intensifies with phase */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: `radial-gradient(circle at 50% 60%, rgba(255, 77, 0, ${0.15 * intensity}) 0%, rgba(255, 140, 0, ${0.08 * intensity}) 30%, rgba(255, 215, 0, ${0.03 * intensity}) 50%, transparent 70%)`,
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Fire core -- the main flame element */}
          <div className="relative flex items-center justify-center">
            <FireCore phase={phase} intensity={intensity} />
            <EmberParticles phase={phase} intensity={intensity} />
            <LoadingLogo phase={phase} intensity={intensity} />
          </div>

          <ProgressBar phase={phase} progress={progress} />

          {/* Screen flash on burst */}
          {phase === "burst" && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,200,50,0.9) 0%, rgba(255,77,0,0.4) 40%, transparent 70%)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
