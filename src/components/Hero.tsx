"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import ThreeDButton from "./ui/ThreeDButton";

const slides = [
  "/images/slider-1.jpeg",
  "/images/slider-2.jpeg",
  "/images/slider-3.jpeg",
  "/images/slider-4.jpeg",
  "/images/slider-5.jpeg",
];

// Pre-computed particle positions to avoid hydration mismatch from Math.random()
const particleData = [
  { left: 5, dur: 8, del: 2, size: 3, op: 0.5 },
  { left: 12, dur: 10, del: 7, size: 4, op: 0.6 },
  { left: 20, dur: 7, del: 1, size: 2, op: 0.7 },
  { left: 28, dur: 12, del: 4, size: 5, op: 0.45 },
  { left: 35, dur: 9, del: 8, size: 3, op: 0.55 },
  { left: 42, dur: 11, del: 3, size: 4, op: 0.65 },
  { left: 48, dur: 7, del: 6, size: 2, op: 0.5 },
  { left: 55, dur: 13, del: 0, size: 5, op: 0.7 },
  { left: 62, dur: 8, del: 5, size: 3, op: 0.6 },
  { left: 68, dur: 10, del: 9, size: 4, op: 0.45 },
  { left: 75, dur: 6, del: 2, size: 2, op: 0.75 },
  { left: 82, dur: 12, del: 7, size: 5, op: 0.5 },
  { left: 88, dur: 9, del: 1, size: 3, op: 0.65 },
  { left: 93, dur: 11, del: 4, size: 4, op: 0.55 },
  { left: 97, dur: 7, del: 8, size: 2, op: 0.7 },
  { left: 3, dur: 13, del: 6, size: 5, op: 0.4 },
  { left: 17, dur: 8, del: 3, size: 3, op: 0.6 },
  { left: 38, dur: 10, del: 5, size: 4, op: 0.5 },
  { left: 58, dur: 6, del: 9, size: 2, op: 0.75 },
  { left: 78, dur: 11, del: 0, size: 5, op: 0.55 },
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.op,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background slideshow with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {slides.map((src, i) => (
          <div key={i} className="hero-slide absolute inset-0">
            <Image
              src={src}
              alt={`Youth Alive event ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0A0A0A]" />
        {/* Fire tint at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
      </motion.div>

      {/* Particles */}
      <Particles />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-fire font-display text-sm md:text-base tracking-[0.35em] uppercase font-semibold mb-6"
        >
          Youth Alive Global
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-white leading-[0.9] tracking-tight"
        >
          <span className="block text-[clamp(3.5rem,12vw,10rem)] text-glow-fire">
            KINGDOM
          </span>
          <span className="block text-[clamp(3.5rem,12vw,10rem)] text-transparent bg-clip-text bg-gradient-to-r from-gold via-fire-light to-fire">
            GIANTS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-6 md:mt-8 text-white/60 text-sm md:text-lg max-w-md font-light leading-relaxed px-2 sm:px-0"
        >
          An enfired community of young people committed to spiritual growth and
          purpose-driven living.
        </motion.p>

        {/* 3D CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center px-4 sm:px-0"
        >
          <Link href="#give">
            <ThreeDButton variant="fire">
              Give
            </ThreeDButton>
          </Link>

          <Link
            href="https://www.youtube.com/@youthaliveglobal/streams?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ThreeDButton variant="gold">
              Watch Online
            </ThreeDButton>
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
}
