"use client";

import dynamic from "next/dynamic";
import { GlobeHemisphereWest } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import { BRANCHES } from "@/lib/branches-config";
import FlowingMenuMobile from "./FlowingMenuMobile";

const FlowingMenuDesktop = dynamic(() => import("./FlowingMenuDesktop"), {
  ssr: false,
});

const desktopItems = BRANCHES.map((b) => ({
  link: `/branches/${b.slug}`,
  text: b.menuLabel,
  image: b.menuImage,
  images: b.images.map((img) => ({ src: img.src, objectPosition: img.objectPosition })),
}));

const mobileItems = BRANCHES.map((b) => ({
  link: `/branches/${b.slug}`,
  text: b.menuLabel,
  image: b.menuImage,
  tagline: b.tagline,
}));

export default function BranchesMenu() {
  return (
    <section id="branches" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-plum/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal>
            <p className="text-plum font-display text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase font-semibold mb-4 flex items-center justify-center gap-2">
              <GlobeHemisphereWest size={14} weight="fill" />
              Our Branches
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Explore <span className="text-glow-plum-tint text-plum-tint">the Fire</span>
              <br className="hidden md:block" /> worldwide
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              Discover the vibrant Youth Alive communities across the globe. Each branch carries the
              same fire — ignited for purpose, united in faith.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop: FlowingMenu */}
        <div className="hidden md:block">
          <ScrollReveal delay={0.3}>
            <div
              className="relative rounded-2xl overflow-hidden border border-[var(--color-border)]"
              style={{ height: "60vh", minHeight: "400px", maxHeight: "600px" }}
            >
              <FlowingMenuDesktop items={desktopItems} />
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile: Card layout */}
        <div className="md:hidden">
          <FlowingMenuMobile items={mobileItems} />
        </div>
      </div>
    </section>
  );
}
