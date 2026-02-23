"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import ThreeDButton from "./ui/ThreeDButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const slides = [
  "/images/slider-1.jpeg",
  "/images/slider-2.jpeg",
  "/images/slider-3.jpeg",
  "/images/slider-4.jpeg",
  "/images/slider-5.jpeg",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative h-[100dvh] min-h-screen overflow-hidden">
      {/* ── Diagonal image strip mosaic ──
          Desktop: strips drift up/down independently.
          Mobile: static strips for smooth scrolling. */}
      <div
        className="absolute inset-0 origin-center"
        style={{ transform: "rotate(-12deg) scale(1.6) translateZ(0)", willChange: "transform" }}
      >
        <div className="flex w-full h-full">
          {slides.map((src, i) => (
            <motion.div
              key={i}
              className="relative flex-1 h-full overflow-hidden"
              animate={isMobile ? { y: 0 } : { y: i % 2 === 0 ? [0, -40, 0] : [0, 40, 0] }}
              transition={
                isMobile
                  ? { duration: 0 }
                  : {
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
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

      {/* ── Sweeping light beam — desktop only ── */}
      {!isMobile && (
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
      )}

      {/* Grain */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        style={isMobile ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
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

        {/* 3D CTA Buttons */}
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
