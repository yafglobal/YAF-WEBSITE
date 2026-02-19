"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { CaretLeft, CaretRight, Fire } from "@phosphor-icons/react";
import { getCurrentWeek, getWeekRange } from "@/lib/bible-plan-utils";

interface WeekTimelineProps {
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
}

export default function WeekTimeline({ selectedWeek, onSelectWeek }: WeekTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentWeek = getCurrentWeek();

  // Auto-scroll to selected week on mount and when selection changes
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-week="${selectedWeek}"]`) as HTMLElement;
    if (btn) {
      const left = btn.offsetLeft - container.clientWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [selectedWeek]);

  const scroll = useCallback((dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="relative z-20 py-10 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text-primary)] tracking-tight">
              Browse Weeks
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Select any week to view its daily readings
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              <CaretLeft size={18} className="text-[var(--color-text-secondary)]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              <CaretRight size={18} className="text-[var(--color-text-secondary)]" />
            </button>
          </div>
        </div>

        {/* Week pills - horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto scroll-smooth pb-3"
          style={{ scrollbarWidth: "none" }}
        >
          {Array.from({ length: 53 }, (_, i) => i + 1).map((week) => {
            const isCurrent = week === currentWeek;
            const isSelected = week === selectedWeek;
            const isPastWeek = week < currentWeek;

            return (
              <motion.button
                key={week}
                data-week={week}
                onClick={() => onSelectWeek(week)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative shrink-0 flex flex-col items-center gap-1
                  px-4 py-3 rounded-2xl border transition-all duration-300
                  ${
                    isSelected
                      ? "bg-plum text-white border-plum shadow-[var(--shadow-plum-sm)]"
                      : isCurrent
                        ? "bg-plum/15 text-plum border-plum/30"
                        : isPastWeek
                          ? "bg-[var(--color-surface)] text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-plum/20"
                          : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-plum/20"
                  }
                `}
              >
                {isCurrent && !isSelected && (
                  <Fire weight="fill" size={10} className="absolute -top-1 -right-1 text-plum" />
                )}
                <span className="text-[9px] uppercase tracking-widest font-bold opacity-60">
                  Week
                </span>
                <span className="text-lg font-bold tabular-nums">{week}</span>
                <span className="text-[8px] tracking-wide opacity-50 whitespace-nowrap">
                  {getWeekRange(week) || "\u2014"}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
