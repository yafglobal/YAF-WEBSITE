"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import { leaders } from "./leadersData";
import FeaturedCard from "./FeaturedCard";
import LeaderCard from "./LeaderCard";

export default function Leadership() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  const featured = leaders[0];
  const others = leaders.slice(1);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-plum-tint/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-plum/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <ScrollReveal>
              <p className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4">
                Our Leadership
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Introducing Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-light to-plum-tint">
                  Pastors
                </span>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-md leading-relaxed">
              Visionary leaders raising a generation of kingdom giants who are equipped for global
              impact.
            </p>
          </ScrollReveal>
        </div>

        {/* Animated divider */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-[1px] mb-16 bg-gradient-to-r from-plum via-plum-tint to-transparent"
        />

        {/* Featured leader */}
        <FeaturedCard leader={featured} />

        {/* Other leaders — 2-column grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {others.map((leader, i) => (
            <LeaderCard key={leader.name} leader={leader} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
