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

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* ── Diagonal image strip mosaic ──
          The 5 slider images are laid out as vertical strips, tilted
          diagonally, and each drifts up/down independently for a living,
          breathing background. */}
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
              <Image
                src={src}
                alt={`Youth Alive event ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="25vw"
              />
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

      {/* ── Sweeping light beam ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 3,
        }}
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
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* YAF-PC Logo — replaces crown */}
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 1.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/10">
            <Image
              src="/images/yaf-pc.svg"
              alt="Youth Alive Global"
              width={36}
              height={36}
              className="brightness-200 md:w-11 md:h-11"
            />
          </div>
          {/* Radial glow pulse behind logo */}
          <motion.div
            className="absolute inset-0 -inset-6 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(212,160,185,0.4), transparent 70%)",
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold leading-[0.85] tracking-tight text-center"
        >
          <span className="block text-[clamp(3.5rem,14vw,12rem)] text-white drop-shadow-[0_4px_60px_rgba(134,22,87,0.5)]">
            KINGDOM
          </span>
          <span className="block text-[clamp(3.5rem,14vw,12rem)] motion-gradient-text drop-shadow-[0_4px_60px_rgba(212,160,185,0.4)]">
            GIANTS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-6 md:mt-8 text-white/50 text-sm md:text-lg max-w-md font-light leading-relaxed px-2 sm:px-0"
        >
          An enfired community of young people committed to spiritual growth and purpose-driven
          living.
        </motion.p>

        {/* 3D CTA Buttons — preserved from original */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center px-4 sm:px-0"
        >
          <Link
            href="https://business.payaza.africa/pay/livingfaithchurch-youthalive"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ThreeDButton variant="plum">Give</ThreeDButton>
          </Link>

          <Link
            href="https://www.youtube.com/@youthaliveglobal/streams?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ThreeDButton variant="plum-tint">Watch Online</ThreeDButton>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
