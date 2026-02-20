"use client";

import { motion, AnimatePresence } from "motion/react";
import { useLoadingPhase } from "./useLoadingPhase";
import FireCore from "./FireCore";
import EmberParticles from "./EmberParticles";
import LoadingLogo from "./LoadingLogo";
import ProgressBar from "./ProgressBar";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function LoadingScreen() {
  const isMobile = useIsMobile();
  const { phase, visible, progress, intensity } = useLoadingPhase(isMobile);

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
            transition: { duration: isMobile ? 0.3 : 0.6, ease: "easeInOut" },
          }}
        >
          {/* Ambient radial glow -- intensifies with phase */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: `radial-gradient(circle at 50% 60%, rgba(134, 22, 87, ${0.15 * intensity}) 0%, rgba(155, 61, 112, ${0.08 * intensity}) 30%, rgba(212, 160, 185, ${0.03 * intensity}) 50%, transparent 70%)`,
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Fire core -- the main flame element */}
          <div className="relative flex items-center justify-center">
            {isMobile ? (
              // Mobile: simple pulsing glow — no blur filters or flame tongues
              <motion.div
                className="absolute rounded-full"
                animate={{
                  width: phase === "burst" ? 200 : 60 + 40 * intensity,
                  height: phase === "burst" ? 200 : 60 + 40 * intensity,
                  opacity: phase === "burst" ? 0 : [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: phase === "burst" ? 0.4 : 1.5,
                  repeat: phase === "burst" ? 0 : Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(134, 22, 87, 0.6) 0%, rgba(212, 160, 185, 0.3) 50%, transparent 70%)",
                }}
              />
            ) : (
              <>
                <FireCore phase={phase} intensity={intensity} />
                <EmberParticles phase={phase} intensity={intensity} />
              </>
            )}
            <LoadingLogo phase={phase} intensity={intensity} />
          </div>

          <ProgressBar phase={phase} progress={progress} />

          {/* Screen flash on burst — desktop only */}
          {!isMobile && phase === "burst" && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(212,160,185,0.9) 0%, rgba(134,22,87,0.4) 40%, transparent 70%)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
