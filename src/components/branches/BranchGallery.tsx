"use client";

import ScrollReveal from "@/components/ScrollReveal";
import BentoGallery from "@/components/community/CommunityPage/BentoGallery";
import type { BranchConfig } from "@/lib/branches-config";

interface Props {
  branch: BranchConfig;
}

export default function BranchGallery({ branch }: Props) {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-plum/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <p className="text-plum font-display text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase font-semibold mb-4">
              Gallery
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
              Life at Youth Alive{" "}
              <span className="text-glow-plum-tint text-plum-tint">{branch.name}</span>
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <BentoGallery images={branch.images} continentName={branch.name} />
        </ScrollReveal>
      </div>
    </section>
  );
}
