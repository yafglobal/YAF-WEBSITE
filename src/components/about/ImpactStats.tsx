"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Globe, Users, Fire, Church, HandsClapping } from "@phosphor-icons/react";
import ScrollReveal from "../ScrollReveal";

const stats = [
  {
    icon: Globe,
    value: 50,
    suffix: "+",
    label: "Countries",
    description: "Global presence across continents",
  },
  {
    icon: Users,
    value: 100,
    suffix: "K+",
    label: "Youth Globally",
    description: "Young people touched worldwide",
  },
  {
    icon: Church,
    value: 1000,
    suffix: "+",
    label: "Chapters",
    description: "Local fellowship chapters",
  },
  {
    icon: Fire,
    value: 365,
    suffix: "",
    label: "Days Active",
    description: "Nonstop, year-round ministry",
  },
  {
    icon: HandsClapping,
    value: 500,
    suffix: "+",
    label: "Events Yearly",
    description: "Programs, workshops & gatherings",
  },
];

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Dark textured background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20 z-0">
        <div className="absolute inset-0 bg-charcoal" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,77,0,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-fire/8 rounded-full blur-[150px] pointer-events-none z-[1]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-gold/5 rounded-full blur-[130px] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-20">
          <ScrollReveal>
            <p className="text-fire font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4">
              Our Impact
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white">
              Setting the World{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold text-glow-fire">
                Ablaze
              </span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Stats grid */}
        <div ref={counterRef} className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 * i}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative group text-center p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-fire/20 hover:bg-fire/[0.03] transition-all duration-500"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-fire/10 mb-5 group-hover:bg-fire/15 transition-colors duration-300">
                  <stat.icon size={24} weight="fill" className="text-fire" />
                </div>

                {/* Number */}
                <p className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                </p>

                {/* Label */}
                <p className="mt-2 text-[var(--color-text-secondary)] text-sm font-medium tracking-wider uppercase">
                  {stat.label}
                </p>

                {/* Description on hover */}
                <p className="mt-2 text-[var(--color-text-muted)] text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
