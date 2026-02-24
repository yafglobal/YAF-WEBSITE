"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { NationalPastorConfig } from "@/lib/national-pastors-config";

/** Returns true when the accent hex is light enough to need dark text */
function isLightAccent(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function NationalPastorSpotlight({
  regionLabel,
  regionSublabel,
  accent,
  wordmark,
  leader,
  flip = false,
}: NationalPastorConfig) {
  const badgeTextColor = isLightAccent(accent) ? "#000" : "#fff";

  return (
    <section className="relative py-28 md:py-44 overflow-hidden">
      {/* Ghost wordmark — purely decorative atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display font-extrabold italic leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(70px, 20vw, 320px)", color: accent, opacity: 0.045 }}
        >
          {wordmark}
        </span>
      </div>

      {/* Ambient glow — bleeds in from the image side */}
      <div
        aria-hidden
        className={`absolute top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none ${
          flip ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        }`}
        style={{ backgroundColor: accent, opacity: 0.08 }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-20 md:mb-28"
        >
          <div className="h-px w-12 shrink-0" style={{ backgroundColor: accent }} />
          <span
            className="text-[10px] font-bold uppercase tracking-[0.5em]"
            style={{ color: accent }}
          >
            National Youth Pastor · {regionLabel}
          </span>
        </motion.div>

        {/* Portrait + Content */}
        <div
          className={`flex flex-col gap-16 md:gap-24 items-center md:flex-row ${
            flip ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-[46%] shrink-0 relative"
          >
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src={leader.image}
                fill
                alt={leader.name}
                className="object-cover"
                style={{ objectPosition: leader.imagePosition ?? "center top" }}
                sizes="(max-width: 768px) 100vw, 46vw"
              />
              {/* Dark-to-transparent gradient so the badge is always readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              {/* Region badge */}
              <div className="absolute bottom-7 left-7">
                <span
                  className="inline-block px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest"
                  style={{ backgroundColor: accent, color: badgeTextColor }}
                >
                  {regionLabel} · {regionSublabel}
                </span>
              </div>
            </div>

            {/* Subtle accent square behind the portrait */}
            <div
              aria-hidden
              className={`absolute -bottom-7 w-36 h-36 rounded-[1.5rem] -z-10 ${
                flip ? "-left-7" : "-right-7"
              }`}
              style={{ backgroundColor: accent, opacity: 0.14 }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: flip ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 min-w-0 space-y-8 md:space-y-10"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[var(--color-text-muted)]">
              The Shepherd
            </p>

            <div className="space-y-4">
              <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.88] tracking-tight text-[var(--color-text-primary)]">
                {leader.name}
              </h2>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.35em]"
                style={{ color: accent }}
              >
                {leader.title}
              </p>
            </div>

            <div className="h-px w-20" style={{ backgroundColor: accent, opacity: 0.5 }} />

            {/* Pull quote */}
            <blockquote className="relative pl-6">
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                style={{ backgroundColor: accent }}
              />
              <p className="text-xl md:text-2xl font-display font-bold italic leading-[1.3] text-[var(--color-text-primary)]">
                &ldquo;{leader.quote}&rdquo;
              </p>
            </blockquote>

            {/* Bio */}
            <p className="text-base md:text-lg text-[var(--color-text-secondary)] font-light leading-relaxed">
              {leader.bio}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
