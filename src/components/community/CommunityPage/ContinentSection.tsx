"use client";

import { MapPin, ArrowUpRight } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import type { ContinentData } from "./data";
import BentoGallery from "./BentoGallery";

interface Props {
  data: ContinentData;
  index: number;
  isLast: boolean;
}

export default function ContinentSection({ data, index, isLast }: Props) {
  const isEven = index % 2 === 0;

  return (
    <section className="relative py-20 md:py-28">
      {/* Ambient glow — alternates position per section */}
      <div
        className={`absolute top-20 ${isEven ? "right-0" : "left-0"} w-[500px] h-[500px] bg-plum/[0.04] rounded-full blur-[180px] pointer-events-none`}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* ── Section header ── */}
        <div className="mb-12 md:mb-16">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-plum font-display text-[11px] tracking-[0.4em] uppercase font-semibold">
                {data.name}
              </span>
              <span className="w-8 h-px bg-plum/40" />
              <span className="text-[var(--color-text-muted)] font-display text-[11px] tracking-[0.2em] uppercase">
                {data.region}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tight text-[var(--color-text-primary)] leading-[1]">
              {data.tagline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-5 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-2xl">
              {data.description}
            </p>
          </ScrollReveal>
        </div>

        {/* ── Bento gallery ── */}
        <ScrollReveal delay={0.15}>
          <BentoGallery images={data.images} continentName={data.name} />
        </ScrollReveal>

        {/* ── Location card ── */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 md:mt-14 max-w-xl">
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-plum/20 transition-colors duration-300 group">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-plum/10 border border-plum/15 flex items-center justify-center group-hover:bg-plum/20 transition-colors">
                  <MapPin size={22} weight="duotone" className="text-plum" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-[var(--color-text-primary)] text-base mb-1">
                    {data.locationName}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4">
                    {data.address}
                  </p>
                  <a
                    href={data.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-plum text-sm font-display font-semibold hover:text-plum-light transition-colors"
                  >
                    Open in Google Maps
                    <ArrowUpRight size={16} weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Gradient divider between sections */}
      {!isLast && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-20 md:mt-28">
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
        </div>
      )}
    </section>
  );
}
