"use client";

import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import type { Offering } from "./offeringsData";

interface OfferingDisplayProps {
  offerings: Offering[];
  activeIndex: number;
}

export default function OfferingDisplay({ offerings, activeIndex }: OfferingDisplayProps) {
  const active = offerings[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <ScrollReveal delay={0.3} direction="right">
      <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--color-surface)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Gradient mesh */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 20%, ${active.glowColor} 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 80%, rgba(212, 160, 185, 0.06) 0%, transparent 50%)
                `,
              }}
            />

            {/* Large icon centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 0.08, rotate: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ActiveIcon size={280} weight="fill" className="text-plum" />
              </motion.div>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-16 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${active.color} font-display text-xs tracking-[0.4em] uppercase font-semibold`}
                >
                  {active.subtitle}
                </span>
              </motion.div>

              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-4 font-display font-extrabold text-2xl md:text-5xl lg:text-6xl text-[var(--color-text-primary)] tracking-tight"
              >
                {active.title}
              </motion.h3>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4 md:mt-6 text-[var(--color-text-secondary)] text-sm md:text-lg max-w-md leading-relaxed"
              >
                {active.description}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Border glow */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[var(--color-border)]" />
      </div>
    </ScrollReveal>
  );
}
