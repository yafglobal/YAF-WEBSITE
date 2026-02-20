"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Crown,
  Lightning,
  ArrowDown,
  Fire,
  Sword,
  ShieldStar,
  Cross,
  HandFist,
} from "@phosphor-icons/react";

/* ─── Shared slide images ────────────────────── */
const slides = [
  "/images/slider-1.jpeg",
  "/images/slider-2.jpeg",
  "/images/slider-3.jpeg",
  "/images/slider-4.jpeg",
  "/images/slider-5.jpeg",
];

/* ─── Nav bar ────────────────────────────────── */
function HeroNav({ active }: { active: number }) {
  const labels = ["The Coronation", "The Monolith", "The Throne Room", "The Uprising"];
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 py-4 px-4 backdrop-blur-xl bg-black/60 border-b border-white/5">
      <span className="text-[10px] tracking-[0.25em] uppercase text-plum-tint mr-4 hidden sm:block font-bold">
        Hero Concepts
      </span>
      {labels.map((label, i) => (
        <button
          key={i}
          onClick={() =>
            document.getElementById(`hero-${i}`)?.scrollIntoView({ behavior: "smooth" })
          }
          className={`px-3 py-1.5 text-[11px] rounded-full transition-all duration-300 font-bold tracking-wide ${
            active === i
              ? "bg-plum text-white shadow-[var(--shadow-plum-sm)]"
              : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
          }`}
        >
          {i + 1}. {label}
        </button>
      ))}
    </nav>
  );
}

/* ═════════════════════════════════════════════════
   HERO 1 — "THE CORONATION"

   Diagonal image strip mosaic behind an animated
   mesh gradient. Crown descends with a golden
   flare. Text has a cinematic film-grain overlay.
   Images are stacked diagonally in strips that
   slowly drift.
   ═════════════════════════════════════════════════ */

function HeroCoronation() {
  return (
    <section
      id="hero-0"
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* ── Diagonal image strips mosaic ── */}
      <div className="absolute inset-0 -rotate-12 scale-[1.6] origin-center">
        <div className="flex h-full">
          {slides.map((src, i) => (
            <motion.div
              key={i}
              className="relative flex-1 overflow-hidden"
              animate={{ y: i % 2 === 0 ? [0, -40, 0] : [0, 40, 0] }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Gradient overlay — plum-infused darkness ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 35%, rgba(134,22,87,0.4) 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(92,14,59,0.5) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 80% 80%, rgba(134,22,87,0.3) 0%, transparent 50%),
            linear-gradient(to bottom, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.75) 50%, rgba(5,5,5,0.95) 100%)
          `,
        }}
      />

      {/* ── Animated light beam — sweeps diagonally ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
      >
        <div
          className="h-full w-[30%]"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(212,160,185,0.06) 45%, rgba(134,22,87,0.1) 50%, rgba(212,160,185,0.06) 55%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Grain */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Crown with descending flare */}
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 1.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-4"
        >
          <Crown
            weight="fill"
            className="w-16 h-16 md:w-24 md:h-24 text-plum-tint drop-shadow-[0_0_40px_rgba(212,160,185,0.9)]"
          />
          {/* Radial glow pulse behind crown */}
          <motion.div
            className="absolute inset-0 -inset-8 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,160,185,0.4), transparent 70%)",
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-center leading-[0.85]"
        >
          <span className="block text-[clamp(4rem,14vw,12rem)] text-white drop-shadow-[0_4px_60px_rgba(134,22,87,0.5)]">
            KINGDOM
          </span>
          <span className="block text-[clamp(4rem,14vw,12rem)] motion-gradient-text drop-shadow-[0_4px_60px_rgba(212,160,185,0.4)]">
            GIANTS
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-8 text-white/50 text-sm md:text-lg tracking-[0.15em] uppercase font-bold"
        >
          Youth Alive Global
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-10 flex gap-5"
        >
          <button className="group relative px-8 py-3.5 bg-plum text-white font-bold tracking-widest text-xs uppercase rounded-full overflow-hidden hover:shadow-[0_0_40px_rgba(134,22,87,0.6)] transition-shadow duration-500">
            <span className="relative z-10">Join Us</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-plum-light to-plum"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.3 }}
            />
          </button>
          <button className="px-8 py-3.5 border border-plum-tint/30 text-plum-tint font-bold tracking-widest text-xs uppercase rounded-full hover:bg-plum-tint/10 hover:border-plum-tint/60 transition-all duration-300">
            Watch Live
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-plum-tint/40" />
      </motion.div>
    </section>
  );
}

/* ═════════════════════════════════════════════════
   HERO 2 — "THE MONOLITH"

   Text masks the background — you see event
   photos THROUGH the giant letters. The
   background is a slow-zooming slideshow
   visible only inside the text silhouette.
   Rest of the screen is deep dark.
   ═════════════════════════════════════════════════ */

function HeroMonolith() {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero-1"
      className="relative h-screen overflow-hidden flex items-center justify-center bg-[#030303]"
    >
      {/* ── Ambient mesh gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 30% 70%, rgba(134,22,87,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 30%, rgba(212,160,185,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Horizontal drifting image strips in background (very subtle) ── */}
      <div className="absolute inset-0 opacity-[0.07]">
        {slides.map((src, i) => (
          <motion.div
            key={i}
            className="absolute h-[20%] w-[200%]"
            style={{ top: `${i * 20}%` }}
            animate={{ x: i % 2 === 0 ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{
              duration: 30 + i * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="200vw" />
          </motion.div>
        ))}
      </div>

      {/* ── Grain ── */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Pre-title with expanding lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent to-plum-tint"
          />
          <span className="text-plum-tint text-[10px] tracking-[0.5em] uppercase font-bold">
            Youth Alive Global
          </span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-[1px] bg-gradient-to-l from-transparent to-plum-tint"
          />
        </motion.div>

        {/* ── IMAGE-CLIPPED TEXT — the hero moment ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* The text that clips the image */}
          <h1
            className="font-display font-black text-[clamp(5rem,20vw,18rem)] leading-[0.82] tracking-[-0.04em] text-center select-none"
            style={{
              backgroundImage: `url(${slides[imgIdx]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "background-image 0.8s ease-in-out",
            }}
          >
            KING
            <br />
            DOM
          </h1>

          {/* Glowing outline version behind for depth */}
          <h1
            className="absolute inset-0 font-display font-black text-[clamp(5rem,20vw,18rem)] leading-[0.82] tracking-[-0.04em] text-center select-none -z-10"
            style={{
              WebkitTextStroke: "1px rgba(134,22,87,0.3)",
              WebkitTextFillColor: "transparent",
              filter: "blur(2px)",
            }}
          >
            KING
            <br />
            DOM
          </h1>
        </motion.div>

        {/* GIANTS — solid plum gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-[clamp(3rem,12vw,10rem)] leading-none tracking-[0.05em] -mt-2 md:-mt-4 text-center"
          style={{
            background: "linear-gradient(180deg, #d4a0b9 0%, #861657 60%, #3d0a29 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(134,22,87,0.5))",
          }}
        >
          GIANTS
        </motion.h1>

        {/* Image cycle indicator dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex gap-2 mt-8"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === imgIdx ? "bg-plum-tint w-6" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-6 text-white/40 text-sm md:text-base max-w-md text-center leading-relaxed font-light"
        >
          An enfired community of young people committed to spiritual growth and purpose-driven
          living.
        </motion.p>

        {/* CTA — minimal expanding line style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-10 flex items-center gap-10"
        >
          <button className="group flex items-center gap-3 text-plum-tint text-xs font-bold tracking-[0.3em] uppercase hover:text-white transition-colors duration-300">
            <Fire weight="fill" className="w-4 h-4" />
            <span>Explore</span>
            <span className="block w-8 h-[1px] bg-plum-tint group-hover:w-14 transition-all duration-300" />
          </button>
          <button className="group flex items-center gap-3 text-white/30 text-xs font-bold tracking-[0.3em] uppercase hover:text-white/70 transition-colors duration-300">
            <Lightning weight="fill" className="w-4 h-4" />
            <span>Watch</span>
            <span className="block w-8 h-[1px] bg-white/30 group-hover:w-14 transition-all duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-20 left-6 w-10 h-10 border-t border-l border-plum/30" />
      <div className="absolute top-20 right-6 w-10 h-10 border-t border-r border-plum/30" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b border-l border-plum/30" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b border-r border-plum/30" />
    </section>
  );
}

/* ═════════════════════════════════════════════════
   HERO 3 — "THE THRONE ROOM"

   Full-bleed cinematic hero with multiple parallax
   depth layers, animated bokeh orbs, fire embers
   rising, and a dramatic upward light cone. The
   event photo is large and vivid with a color-graded
   treatment.
   ═════════════════════════════════════════════════ */

// Pre-computed bokeh positions
const bokehData = [
  { x: 10, y: 30, size: 120, delay: 0, dur: 6 },
  { x: 75, y: 20, size: 80, delay: 1.5, dur: 8 },
  { x: 40, y: 70, size: 150, delay: 0.5, dur: 7 },
  { x: 85, y: 60, size: 60, delay: 2, dur: 5 },
  { x: 25, y: 85, size: 100, delay: 3, dur: 9 },
  { x: 60, y: 15, size: 90, delay: 1, dur: 6 },
  { x: 50, y: 50, size: 200, delay: 0, dur: 10 },
];

// Pre-computed ember positions
const emberData = [
  { x: 15, dur: 6, delay: 0 },
  { x: 25, dur: 8, delay: 2 },
  { x: 35, dur: 5, delay: 1 },
  { x: 45, dur: 7, delay: 3 },
  { x: 55, dur: 6, delay: 0.5 },
  { x: 65, dur: 9, delay: 2.5 },
  { x: 75, dur: 5, delay: 1.5 },
  { x: 85, dur: 7, delay: 3.5 },
  { x: 20, dur: 8, delay: 4 },
  { x: 50, dur: 6, delay: 1 },
  { x: 70, dur: 7, delay: 2 },
  { x: 90, dur: 5, delay: 0 },
  { x: 10, dur: 9, delay: 3 },
  { x: 40, dur: 6, delay: 1.5 },
  { x: 60, dur: 8, delay: 2.5 },
  { x: 80, dur: 5, delay: 0.5 },
];

function HeroThroneRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero-2" ref={containerRef} className="relative h-screen overflow-hidden">
      {/* ── Background image — vivid, full-bleed ── */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <Image src="/images/slider-1.jpeg" alt="" fill className="object-cover" sizes="100vw" />
        {/* Color grade — warm plum tint */}
        <div className="absolute inset-0 bg-plum/20 mix-blend-overlay" />
      </motion.div>

      {/* ── Dark vignette overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.85) 100%),
            linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 40%)
          `,
        }}
      />

      {/* ── Upward light cone from bottom center ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[80vh]"
        style={{
          background:
            "conic-gradient(from 250deg at 50% 100%, transparent 0deg, rgba(134,22,87,0.15) 10deg, rgba(212,160,185,0.08) 20deg, transparent 40deg, transparent 320deg, rgba(212,160,185,0.08) 340deg, rgba(134,22,87,0.15) 350deg, transparent 360deg)",
          filter: "blur(30px)",
        }}
      />

      {/* ── Animated bokeh orbs ── */}
      {bokehData.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, rgba(${i % 2 === 0 ? "134,22,87" : "212,160,185"},0.15), transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            delay: b.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Rising fire embers ── */}
      {emberData.map((e, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${e.x}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            background: i % 2 === 0 ? "#d4a0b9" : "#861657",
            boxShadow:
              i % 2 === 0 ? "0 0 6px rgba(212,160,185,0.8)" : "0 0 6px rgba(134,22,87,0.8)",
          }}
          animate={{
            y: ["100vh", "-10vh"],
            opacity: [0, 0.8, 0.6, 0],
            x: [0, i % 2 === 0 ? 15 : -15, 0],
          }}
          transition={{
            duration: e.dur,
            repeat: Infinity,
            delay: e.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Grain */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          <Cross weight="light" className="w-8 h-8 text-plum-tint/70 mb-4" />
        </motion.div>

        {/* "WE ARE" */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="text-plum text-xs uppercase font-bold mb-4"
        >
          We Are
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-[clamp(4rem,14vw,12rem)] leading-[0.85] text-white drop-shadow-[0_0_80px_rgba(0,0,0,0.5)]"
        >
          KINGDOM
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-[clamp(4rem,14vw,12rem)] leading-[0.85] -mt-1"
          style={{
            background: "linear-gradient(180deg, #f5f5f5 0%, #d4a0b9 40%, #861657 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 60px rgba(134,22,87,0.6))",
          }}
        >
          GIANTS
        </motion.h1>

        {/* Decorative ruled line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex items-center gap-3 mt-6"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-plum" />
          <Fire weight="fill" className="w-4 h-4 text-plum" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-plum" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-5 text-white/50 text-sm md:text-lg max-w-sm font-light leading-relaxed"
        >
          An enfired community of young people committed to spiritual growth and purpose-driven
          living.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <button className="px-10 py-4 bg-gradient-to-r from-plum to-plum-dark text-white font-bold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_50px_rgba(134,22,87,0.6)] transition-all duration-500 rounded-sm">
            Enter the Kingdom
          </button>
          <button className="px-10 py-4 text-plum-tint font-bold text-xs tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 flex items-center gap-2">
            <Fire weight="fill" className="w-4 h-4" />
            Watch Online
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
    </section>
  );
}

/* ═════════════════════════════════════════════════
   HERO 4 — "THE UPRISING"

   Split-panel collage: images arranged in an
   asymmetric, editorial bento grid behind the text.
   Each panel slowly pans/zooms independently.
   Giant text overlaid with a bold slab design.
   Strong color-blocked sections with plum gradients.
   ═════════════════════════════════════════════════ */

function HeroUprising() {
  return (
    <section
      id="hero-3"
      className="relative h-screen overflow-hidden flex items-center justify-center bg-[#030303]"
    >
      {/* ── Bento image collage background ── */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-[2px] opacity-40">
        {/* Top-left large panel */}
        <motion.div
          className="relative col-span-2 row-span-2 overflow-hidden"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={slides[0]} alt="" fill className="object-cover" sizes="66vw" />
        </motion.div>

        {/* Top-right vertical strip */}
        <motion.div
          className="relative overflow-hidden"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={slides[1]} alt="" fill className="object-cover" sizes="34vw" />
        </motion.div>

        {/* Mid-right panel */}
        <motion.div
          className="relative overflow-hidden"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Image src={slides[2]} alt="" fill className="object-cover" sizes="34vw" />
        </motion.div>

        {/* Bottom-left panel */}
        <motion.div
          className="relative overflow-hidden"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Image src={slides[3]} alt="" fill className="object-cover" sizes="34vw" />
        </motion.div>

        {/* Bottom-center panel */}
        <motion.div
          className="relative overflow-hidden"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <Image src={slides[4]} alt="" fill className="object-cover" sizes="34vw" />
        </motion.div>

        {/* Bottom-right panel */}
        <motion.div
          className="relative overflow-hidden"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Image src={slides[0]} alt="" fill className="object-cover" sizes="34vw" />
        </motion.div>
      </div>

      {/* ── Heavy overlay — plum-tinted blackout ── */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 70% at 50% 50%, rgba(134,22,87,0.3) 0%, rgba(5,5,5,0.8) 60%, rgba(3,3,3,0.95) 100%),
            linear-gradient(to bottom, rgba(3,3,3,0.3), rgba(3,3,3,0.6))
          `,
        }}
      />

      {/* ── Animated diagonal plum streaks ── */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[200vh] w-[2px] pointer-events-none"
          style={{
            left: `${25 + i * 25}%`,
            top: "-50%",
            background: `linear-gradient(to bottom, transparent, rgba(134,22,87,${0.15 - i * 0.03}), transparent)`,
            transform: "rotate(15deg)",
          }}
          animate={{ y: ["-20%", "20%", "-20%"] }}
          transition={{
            duration: 8 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Grain */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Shield icon */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6"
        >
          <ShieldStar weight="duotone" className="w-10 h-10 text-plum" />
        </motion.div>

        {/* ── Per-letter animated title ── */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.3,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display font-black text-[clamp(4rem,14vw,12rem)] leading-[0.85] text-white text-center"
          >
            KINGDOM
          </motion.h1>
        </div>

        <div className="overflow-hidden -mt-1 md:-mt-3">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display font-black text-[clamp(4rem,14vw,12rem)] leading-[0.85] text-center text-glow-plum"
            style={{
              background: "linear-gradient(90deg, #d4a0b9, #861657, #d4a0b9)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradient-flow 4s ease infinite",
            }}
          >
            GIANTS
          </motion.h1>
        </div>

        {/* Animated underline bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-40 h-1 rounded-full bg-gradient-to-r from-plum-dark via-plum to-plum-tint mt-5 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 text-white/40 text-sm md:text-base max-w-md text-center leading-relaxed font-light"
        >
          An enfired community of young people committed to spiritual growth and purpose-driven
          living.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="mt-3 text-plum-tint text-[10px] tracking-[0.4em] uppercase font-bold"
        >
          Youth Alive Global
        </motion.p>

        {/* CTA — rounded pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-10 flex gap-5"
        >
          <button className="group relative px-8 py-3.5 overflow-hidden rounded-full bg-plum hover:bg-plum-light transition-colors duration-300">
            <span className="relative z-10 text-white font-bold text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <Sword weight="bold" className="w-4 h-4" />
              Rise Up
            </span>
          </button>
          <button className="px-8 py-3.5 border border-plum/40 text-plum-tint font-bold text-xs tracking-[0.2em] uppercase rounded-full hover:border-plum hover:bg-plum/10 transition-all duration-300 flex items-center gap-2">
            <Lightning weight="fill" className="w-4 h-4" />
            Watch Live
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main page ──────────────────────────────── */

export default function TestHeroes() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[id^='hero-']");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.id.replace("hero-", ""), 10);
            setActive(index);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <HeroNav active={active} />
      <HeroCoronation />
      <HeroMonolith />
      <HeroThroneRoom />
      <HeroUprising />
    </main>
  );
}
