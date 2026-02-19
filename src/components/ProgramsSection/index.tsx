"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import { programs } from "./programsData";
import ProgramRow from "./ProgramRow";
import YouTubeCTA from "./YouTubeCTA";

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);

  return (
    <section id="sermons" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-plum-tint/3 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-plum/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 items-end mb-20">
          <div>
            <ScrollReveal>
              <p className="text-plum font-display text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Our Programmes
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Our focus is on{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum-tint via-plum to-plum-light">
                  YOU
                </span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
              With programmes targeted at your faith, your career, and your overall development. We
              don&apos;t deal with mediocrity — we&apos;re here to empower you to have a triumphant
              life.
            </p>
          </ScrollReveal>
        </div>

        {/* Animated divider line */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-px bg-gradient-to-r from-plum via-plum-tint to-transparent mb-16"
        />

        {/* Programs - Interactive accordion/reveal */}
        <div className="space-y-2">
          {programs.map((prog, i) => (
            <ScrollReveal key={prog.title} delay={0.1 * i}>
              <ProgramRow
                icon={prog.icon}
                title={prog.title}
                description={prog.description}
                accent={prog.accent}
                image={prog.image}
                index={i}
                isHovered={hoveredIndex === i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTap={() => setHoveredIndex(hoveredIndex === i ? null : i)}
              />
            </ScrollReveal>
          ))}
        </div>

        <YouTubeCTA />
      </div>
    </section>
  );
}
