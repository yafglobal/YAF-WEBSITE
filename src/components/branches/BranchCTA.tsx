"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, EnvelopeSimple, MapTrifold } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import type { BranchConfig } from "@/lib/branches-config";

interface Props {
  branch: BranchConfig;
}

/** Pre-computed positions for the floating photos so we avoid Math.random at render time */
const FLOAT_POSITIONS = [
  { top: "10%", left: "5%", rotate: -8, delay: 0 },
  { top: "15%", right: "8%", rotate: 6, delay: 0.3 },
  { bottom: "20%", left: "3%", rotate: 4, delay: 0.6 },
  { bottom: "10%", right: "5%", rotate: -5, delay: 0.9 },
];

export default function BranchCTA({ branch }: Props) {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Radial plum glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(134, 22, 87, 0.08), transparent 70%)",
        }}
      />

      {/* Floating photos (desktop only) */}
      <div className="hidden lg:block">
        {FLOAT_POSITIONS.map((pos, i) => {
          const img = branch.images[i + 3]; // offset to skip hero/about/gatherings images
          if (!img) return null;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.25, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: pos.delay, duration: 0.8 }}
              className="absolute w-28 h-28 rounded-xl overflow-hidden shadow-lg pointer-events-none"
              style={{
                top: pos.top,
                left: pos.left,
                right: (pos as { right?: string }).right,
                bottom: pos.bottom,
                rotate: `${pos.rotate}deg`,
              }}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="112px" />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 text-center">
        <ScrollReveal>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
            Connect with Youth Alive{" "}
            <span className="text-glow-plum-tint text-plum-tint">{branch.name}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
            Be part of a generation that refuses to be ordinary. Find your community, ignite your
            purpose, and live on fire.
          </p>
        </ScrollReveal>

        {/* Action buttons */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-plum hover:bg-plum-light text-white font-display font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[var(--shadow-plum-md)]"
            >
              <EnvelopeSimple size={18} weight="bold" />
              Contact Us
            </Link>
            <a
              href={branch.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 border border-[var(--color-border)] hover:border-plum/40 text-[var(--color-text-primary)] font-display font-semibold text-sm rounded-xl transition-all duration-300"
            >
              <MapTrifold size={18} weight="bold" />
              Get Directions
            </a>
          </div>
        </ScrollReveal>

        {/* Back to branches link */}
        <ScrollReveal delay={0.3}>
          <Link
            href="/#branches"
            className="inline-flex items-center gap-2 mt-10 text-[var(--color-text-secondary)] hover:text-plum text-sm font-medium transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            Back to All Branches
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
