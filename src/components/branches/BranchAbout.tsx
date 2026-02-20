"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import type { BranchConfig } from "@/lib/branches-config";

interface Props {
  branch: BranchConfig;
}

export default function BranchAbout({ branch }: Props) {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text content */}
          <div>
            <ScrollReveal>
              <p className="text-plum font-display text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase font-semibold mb-4">
                About the Fellowship
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
                The story of{" "}
                <span className="text-glow-plum-tint text-plum-tint">{branch.name}</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-lg">
                {branch.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={branch.watchHref}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-plum hover:bg-plum-light text-white font-display font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[var(--shadow-plum-md)]"
                >
                  Watch Online
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] hover:border-plum/40 text-[var(--color-text-primary)] font-display font-semibold text-sm rounded-xl transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Image with plum border */}
          <ScrollReveal delay={0.2} direction="right">
            <div ref={imageRef} className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden plum-border">
                <motion.div style={{ y: imageY }} className="absolute inset-0 h-[116%] -top-[8%]">
                  <Image
                    src={branch.images[1]?.src || branch.heroImage}
                    alt={branch.images[1]?.alt || `Youth Alive ${branch.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </div>

              {/* Decorative plum glow */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-plum/10 blur-3xl pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
