"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { GlobeHemisphereWest, UsersThree, CalendarBlank, Fire } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return { count, ref };
}

const stats = [
  {
    number: 54,
    suffix: "+",
    label: "Nations Reached",
    desc: "Youth Alive fellowships active across the African continent and beyond",
    icon: GlobeHemisphereWest,
    span: "lg:col-span-5",
  },
  {
    number: 25,
    suffix: "+",
    label: "Years of Fire",
    desc: "Decades of raising purpose-driven, faith-filled young leaders",
    icon: CalendarBlank,
    span: "lg:col-span-4",
  },
  {
    number: 1000,
    suffix: "s",
    label: "Youth On Fire",
    desc: "A generation set ablaze for God, impacting every sphere of society",
    icon: UsersThree,
    span: "lg:col-span-3",
  },
];

export default function AfricaImpact() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Africa continent silhouette watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <svg
          viewBox="0 0 400 460"
          className="w-[50vw] max-w-[600px] opacity-[0.02] text-[var(--color-foreground)]"
          fill="currentColor"
        >
          <path d="M200 10 C170 20 150 15 140 30 C130 40 120 35 115 50 C108 65 100 60 95 75 C88 90 75 95 70 110 C60 130 50 140 45 160 C35 185 30 200 35 220 C38 235 42 250 50 265 C55 275 60 290 70 305 C80 320 85 340 95 355 C105 370 110 380 125 390 C140 400 155 410 170 415 C185 420 195 425 210 420 C225 415 240 410 255 400 C270 390 280 375 290 355 C298 340 305 320 310 300 C315 280 320 260 325 240 C330 220 335 200 330 180 C325 160 320 140 310 125 C300 110 290 95 280 80 C270 65 260 50 245 40 C230 30 215 15 200 10 Z" />
        </svg>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-plum/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <Fire weight="fill" className="w-5 h-5 text-amber-500" />
                <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px]">
                  By The Numbers
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
                The Global
                <br />
                <span className="italic text-amber-500">Impact</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-md font-light leading-relaxed">
              What started in Canaanland has become an unstoppable force across continents,
              cultures, and generations.
            </p>
          </ScrollReveal>
        </div>

        {/* Stats grid — asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return <StatCard key={stat.label} stat={stat} Icon={Icon} index={i} />;
          })}
        </div>

        {/* Bottom pulse indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mt-16 md:mt-20"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            And still growing
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({
  stat,
  Icon,
  index,
}: {
  stat: (typeof stats)[number];
  Icon: typeof GlobeHemisphereWest;
  index: number;
}) {
  const { count, ref } = useCountUp(stat.number, 2200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      className={`${stat.span} col-span-1 group relative p-8 md:p-10 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-amber-500/30 transition-all duration-500 overflow-hidden`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-8">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <Icon weight="duotone" size={28} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)] mt-2">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-[var(--color-text-primary)] leading-none tabular-nums">
            {count}
          </span>
          <span className="text-3xl md:text-4xl font-display font-extrabold text-amber-500">
            {stat.suffix}
          </span>
        </div>

        <h3 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-2">
          {stat.label}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed">
          {stat.desc}
        </p>
      </div>
    </motion.div>
  );
}
