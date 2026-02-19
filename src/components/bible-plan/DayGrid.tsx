"use client";

import { motion } from "motion/react";
import { Check, Clock } from "@phosphor-icons/react";
import {
  getWeekData,
  getDateForReading,
  formatDateShort,
  isToday,
  isPast,
  DAY_FULL,
  type DayOfWeek,
} from "@/lib/bible-plan-utils";
import VerseDrawer from "./VerseDrawer";

interface DayGridProps {
  selectedWeek: number;
  expandedDay: DayOfWeek | null;
  onExpandDay: (day: DayOfWeek | null) => void;
}

export default function DayGrid({ selectedWeek, expandedDay, onExpandDay }: DayGridProps) {
  const weekData = getWeekData(selectedWeek);

  if (!weekData) return null;

  const expandedReading = weekData.readings.find((r) => r.day === expandedDay) || null;

  return (
    <section className="relative z-20 pb-24 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <motion.div
          key={selectedWeek}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-display font-bold text-[var(--color-text-primary)]">
            Week {selectedWeek}
            <span className="text-[var(--color-text-muted)] font-normal text-base ml-3">
              {weekData.readings.length} {weekData.readings.length === 1 ? "day" : "days"}
            </span>
          </h3>
        </motion.div>

        {/* Day cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weekData.readings.map((reading, idx) => {
            const today = isToday(selectedWeek, reading.day);
            const past = isPast(selectedWeek, reading.day);
            const isExpanded = expandedDay === reading.day;
            const date = getDateForReading(selectedWeek, reading.day);

            return (
              <motion.button
                key={`${selectedWeek}-${reading.day}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                onClick={() => onExpandDay(isExpanded ? null : reading.day)}
                className={`
                  relative text-left p-5 rounded-2xl border
                  transition-all duration-300 group
                  ${
                    isExpanded
                      ? "bg-plum/10 border-plum/40 shadow-[var(--shadow-plum-sm)]"
                      : today
                        ? "bg-plum/5 border-plum/20 hover:border-plum/40"
                        : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                  }
                `}
              >
                {/* "Today" badge */}
                {today && (
                  <div className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-plum text-white text-[9px] font-bold uppercase tracking-wider">
                    Today
                  </div>
                )}

                {/* Day name + date */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-[var(--color-text-primary)] text-sm">
                      {DAY_FULL[reading.day]}
                    </p>
                    <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      {formatDateShort(date)}
                    </p>
                  </div>
                  {past && !today ? (
                    <div className="w-6 h-6 rounded-full bg-plum/15 flex items-center justify-center">
                      <Check size={12} weight="bold" className="text-plum" />
                    </div>
                  ) : !past && !today ? (
                    <Clock size={16} className="text-[var(--color-text-muted)] opacity-50" />
                  ) : null}
                </div>

                {/* Passage tags */}
                <div className="flex flex-wrap gap-1.5">
                  {reading.passages.map((p, pi) => (
                    <span
                      key={pi}
                      className={`text-[11px] px-2 py-1 rounded-lg font-medium ${
                        isExpanded
                          ? "bg-plum/20 text-plum"
                          : "bg-[var(--color-charcoal)] text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>

                {/* Action label */}
                <div
                  className={`mt-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    isExpanded
                      ? "text-plum"
                      : "text-[var(--color-text-muted)] group-hover:text-plum"
                  }`}
                >
                  {isExpanded ? "Close" : "Read verses"}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Verse drawer (expands below the grid) */}
        <VerseDrawer
          selectedWeek={selectedWeek}
          expandedDay={expandedDay}
          reading={expandedReading}
          onClose={() => onExpandDay(null)}
        />
      </div>
    </section>
  );
}
