"use client";

import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import type { Offering } from "./offeringsData";

interface OfferingAccordionProps {
  offerings: Offering[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function OfferingAccordion({
  offerings,
  activeIndex,
  onSelect,
}: OfferingAccordionProps) {
  return (
    <div className="lg:col-span-5 space-y-2">
      {offerings.map((item, i) => {
        const isActive = activeIndex === i;
        const Icon = item.icon;
        return (
          <ScrollReveal key={item.id} delay={0.1 * i}>
            <motion.button
              onClick={() => onSelect(i)}
              className={`w-full text-left p-5 md:p-6 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                isActive
                  ? "bg-[var(--color-surface)]"
                  : "bg-transparent hover:bg-[var(--color-surface)]/50"
              }`}
              layout
            >
              {/* Active glow */}
              {isActive && (
                <motion.div
                  layoutId="offerGlow"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 0% 50%, ${item.glowColor}, transparent 70%)`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {/* Active border */}
              {isActive && (
                <motion.div
                  layoutId="offerBorder"
                  className="absolute inset-0 rounded-2xl ring-1 ring-fire/20"
                  transition={{ duration: 0.4 }}
                />
              )}

              <div className="relative flex items-start gap-4">
                {/* Number */}
                <span
                  className={`font-display text-sm font-bold mt-1 transition-colors duration-300 ${
                    isActive ? "text-fire" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {item.number}
                </span>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive ? "bg-fire/10" : "bg-[var(--color-surface)] group-hover:bg-fire/5"
                      }`}
                    >
                      <Icon
                        size={20}
                        weight="fill"
                        className={`transition-colors duration-300 ${
                          isActive ? "text-fire" : "text-[var(--color-text-secondary)]"
                        }`}
                      />
                    </div>
                    <h3
                      className={`font-display font-bold text-base md:text-lg transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--color-text-primary)]"
                          : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-[var(--color-text-secondary)] text-sm leading-relaxed pl-0 md:pl-[52px]">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.button>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
