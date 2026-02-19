"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// Pre-computed ember data to avoid hydration mismatches
const emberData = [
  { x: 48, delay: 0, dur: 2.2, size: 3, drift: -12 },
  { x: 50, delay: 0.3, dur: 1.8, size: 4, drift: 8 },
  { x: 52, delay: 0.1, dur: 2.5, size: 2, drift: -5 },
  { x: 46, delay: 0.6, dur: 2.0, size: 3, drift: 15 },
  { x: 54, delay: 0.4, dur: 2.3, size: 5, drift: -10 },
  { x: 49, delay: 0.8, dur: 1.9, size: 2, drift: 6 },
  { x: 51, delay: 0.2, dur: 2.6, size: 4, drift: -18 },
  { x: 47, delay: 0.5, dur: 2.1, size: 3, drift: 11 },
  { x: 53, delay: 0.7, dur: 1.7, size: 2, drift: -7 },
  { x: 50, delay: 0.9, dur: 2.4, size: 5, drift: 14 },
  { x: 45, delay: 1.0, dur: 2.0, size: 3, drift: -20 },
  { x: 55, delay: 1.1, dur: 2.2, size: 4, drift: 9 },
  { x: 48, delay: 1.2, dur: 1.6, size: 2, drift: -13 },
  { x: 52, delay: 0.15, dur: 2.8, size: 3, drift: 7 },
  { x: 50, delay: 0.45, dur: 2.1, size: 6, drift: -4 },
  { x: 44, delay: 0.65, dur: 2.3, size: 3, drift: 22 },
  { x: 56, delay: 0.85, dur: 1.9, size: 4, drift: -16 },
  { x: 49, delay: 1.05, dur: 2.5, size: 2, drift: 10 },
];

// Separate set of embers that appear in the burst phase
const burstEmberData = [
  { angle: 0, dist: 120, size: 4, delay: 0 },
  { angle: 30, dist: 150, size: 3, delay: 0.02 },
  { angle: 60, dist: 130, size: 5, delay: 0.04 },
  { angle: 90, dist: 160, size: 3, delay: 0.01 },
  { angle: 120, dist: 140, size: 4, delay: 0.05 },
  { angle: 150, dist: 170, size: 2, delay: 0.03 },
  { angle: 180, dist: 125, size: 5, delay: 0.02 },
  { angle: 210, dist: 155, size: 3, delay: 0.06 },
  { angle: 240, dist: 145, size: 4, delay: 0.01 },
  { angle: 270, dist: 135, size: 2, delay: 0.04 },
  { angle: 300, dist: 165, size: 5, delay: 0.03 },
  { angle: 330, dist: 140, size: 3, delay: 0.05 },
  { angle: 15, dist: 180, size: 2, delay: 0.02 },
  { angle: 45, dist: 110, size: 4, delay: 0.04 },
  { angle: 75, dist: 190, size: 3, delay: 0.01 },
  { angle: 105, dist: 145, size: 5, delay: 0.06 },
  { angle: 135, dist: 160, size: 2, delay: 0.03 },
  { angle: 165, dist: 130, size: 4, delay: 0.05 },
  { angle: 195, dist: 175, size: 3, delay: 0.02 },
  { angle: 225, dist: 150, size: 5, delay: 0.04 },
  { angle: 255, dist: 140, size: 2, delay: 0.01 },
  { angle: 285, dist: 185, size: 4, delay: 0.03 },
  { angle: 315, dist: 155, size: 3, delay: 0.06 },
  { angle: 345, dist: 120, size: 5, delay: 0.02 },
];

export default function LoadingScreen() {
  const [phase, setPhase] = useState<
    "igniting" | "burning" | "blazing" | "burst" | "done"
  >("igniting");
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const hasRun = useRef(false);

  // Check if loading screen has already been shown this session
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const alreadyShown = sessionStorage.getItem("yag-loaded");
    if (alreadyShown) {
      setVisible(false);
      setPhase("done");
      return;
    }

    // Lock scroll during loading
    document.body.style.overflow = "hidden";
  }, []);

  const handleComplete = useCallback(() => {
    // Fire phases: igniting → burning → blazing → burst → done
    setPhase("blazing");

    setTimeout(() => {
      setPhase("burst");

      setTimeout(() => {
        setPhase("done");
        setVisible(false);
        document.body.style.overflow = "";
        sessionStorage.setItem("yag-loaded", "1");
      }, 1000);
    }, 600);
  }, []);

  // Track loading progress
  useEffect(() => {
    if (phase === "done" || !visible) return;

    let progressInterval: ReturnType<typeof setInterval>;
    let minTimeReached = false;
    let pageReady = false;

    const checkReady = () => {
      if (minTimeReached && pageReady) {
        clearInterval(progressInterval);
        setProgress(100);
        handleComplete();
      }
    };

    // Minimum display time for the animation to feel impactful (2.5s)
    setTimeout(() => {
      minTimeReached = true;
      checkReady();
    }, 2500);

    // Move to "burning" phase after initial ignition
    setTimeout(() => {
      setPhase("burning");
    }, 800);

    // Simulate progress with acceleration
    let currentProgress = 0;
    progressInterval = setInterval(() => {
      if (currentProgress < 90) {
        currentProgress += (90 - currentProgress) * 0.08;
        setProgress(Math.min(currentProgress, 90));
      }
    }, 50);

    // Detect page readiness
    const onReady = () => {
      pageReady = true;
      currentProgress = 95;
      setProgress(95);
      checkReady();
    };

    if (document.readyState === "complete") {
      // Small delay even if already loaded, so the animation gets a chance
      setTimeout(onReady, 500);
    } else {
      window.addEventListener("load", onReady);
    }

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener("load", onReady);
    };
  }, [visible, phase, handleComplete]);

  if (!visible && phase === "done") return null;

  // Phase-based intensity multiplier
  const intensity =
    phase === "igniting"
      ? 0.3
      : phase === "burning"
        ? 0.6
        : phase === "blazing"
          ? 1
          : phase === "burst"
            ? 1.5
            : 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#050505" }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          {/* Ambient radial glow — intensifies with phase */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: `radial-gradient(circle at 50% 60%, rgba(255, 77, 0, ${0.15 * intensity}) 0%, rgba(255, 140, 0, ${0.08 * intensity}) 30%, rgba(255, 215, 0, ${0.03 * intensity}) 50%, transparent 70%)`,
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Fire core — the main flame element */}
          <div className="relative flex items-center justify-center">
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
                  "radial-gradient(circle, rgba(255, 77, 0, 0.5) 0%, rgba(255, 140, 0, 0.2) 50%, transparent 70%)",
                filter: `blur(${20 + 20 * intensity}px)`,
              }}
            />

            {/* Fire tongues — CSS animated flames */}
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
                    background: `linear-gradient(to top, #FF4D00 0%, #FF6B2B ${40 - i * 5}%, #FFD700 ${75 + i * 3}%, rgba(255, 255, 200, 0.9) 100%)`,
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
                  "radial-gradient(circle, rgba(255,255,220,0.9) 0%, rgba(255,200,50,0.6) 40%, rgba(255,77,0,0.3) 70%, transparent 100%)",
                filter: `blur(${4 + 6 * intensity}px)`,
              }}
            />

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
                  background: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#FF6B2B" : "#FF4D00",
                  left: `${ember.x}%`,
                  bottom: "50%",
                  filter: "blur(0.5px)",
                  boxShadow: `0 0 ${ember.size * 2}px ${i % 2 === 0 ? "rgba(255,77,0,0.6)" : "rgba(255,215,0,0.6)"}`,
                }}
              />
            ))}

            {/* Burst embers — only visible during burst phase */}
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
                      background:
                        i % 3 === 0
                          ? "#FFD700"
                          : i % 3 === 1
                            ? "#FF6B2B"
                            : "#FFFBE6",
                      boxShadow: `0 0 ${b.size * 3}px rgba(255,165,0,0.8)`,
                    }}
                  />
                );
              })}

            {/* Logo / Brand text */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-2 select-none"
              animate={{
                opacity:
                  phase === "igniting"
                    ? 0
                    : phase === "burst"
                      ? 0
                      : [0.7, 1, 0.7],
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
                  filter: `drop-shadow(0 0 ${8 + 16 * intensity}px rgba(255, 77, 0, ${0.5 + 0.3 * intensity}))`,
                }}
                transition={{ duration: 0.8 }}
              >
                <defs>
                  <linearGradient
                    id="flameGrad"
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#FF4D00" />
                    <stop offset="50%" stopColor="#FF8C00" />
                    <stop offset="85%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FFFBE6" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 0 C20 0 8 16 8 28 C8 36 13 44 20 48 C20 40 26 34 28 28 C30 34 32 38 32 42 C36 38 38 32 38 28 C38 16 20 0 20 0 Z"
                  fill="url(#flameGrad)"
                />
                <path
                  d="M20 20 C20 20 14 28 14 34 C14 38 17 42 20 44 C23 42 26 38 26 34 C26 28 20 20 20 20 Z"
                  fill="#FFFBE6"
                  opacity="0.7"
                />
              </motion.svg>

              {/* Brand text */}
              <motion.span
                className="font-display text-xs md:text-sm tracking-[0.4em] uppercase font-bold"
                style={{
                  background:
                    "linear-gradient(to right, #FF4D00, #FFD700, #FF6B2B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Youth Alive
              </motion.span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-[min(12rem,60vw)] md:w-56"
            animate={{
              opacity: phase === "burst" || phase === "done" ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Track */}
            <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
              {/* Fill */}
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #FF4D00, #FF8C00, #FFD700)",
                  boxShadow: "0 0 12px rgba(255, 77, 0, 0.6)",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="text-center mt-4 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/30 font-body"
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
