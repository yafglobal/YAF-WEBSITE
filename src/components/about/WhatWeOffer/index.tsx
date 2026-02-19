"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sparkle } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import { offerings } from "./offeringsData";
import OfferingAccordion from "./OfferingAccordion";
import OfferingDisplay from "./OfferingDisplay";
import ProgressDots from "./ProgressDots";

export default function WhatWeOffer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionScale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient" />

      <motion.div style={{ scale: sectionScale }} className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkle size={16} weight="fill" className="text-plum-tint" />
              <span className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold">
                What We Offer
              </span>
              <Sparkle size={16} weight="fill" className="text-plum-tint" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Just For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-light to-plum-tint">
                You
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
              Events made to give you maximum exposure to the Word from the altar. Activities
              tailored to broaden your perspective and interact with fellow purpose-driven heirs of
              His kingdom.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive accordion */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <OfferingAccordion
            offerings={offerings}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />

          {/* Right: Visual display */}
          <div className="lg:col-span-7 relative">
            <OfferingDisplay offerings={offerings} activeIndex={activeIndex} />
            <ProgressDots
              count={offerings.length}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
