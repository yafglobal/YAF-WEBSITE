"use client";

import { motion, AnimatePresence } from "motion/react";
import { BookOpen, ArrowsLeftRight, SpinnerGap, X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import {
  getDateForReading,
  formatDateShort,
  DAY_FULL,
  type DayOfWeek,
  type DailyReading,
} from "@/lib/bible-plan-utils";

type Translation = "kjv" | "web";

interface VerseData {
  text: string;
  reference: string;
  translation: string;
}

interface VerseDrawerProps {
  selectedWeek: number;
  expandedDay: DayOfWeek | null;
  reading: DailyReading | null;
  onClose: () => void;
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function VerseDrawer({
  selectedWeek,
  expandedDay,
  reading,
  onClose,
}: VerseDrawerProps) {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [fetchKey, setFetchKey] = useState<string | null>(null);
  const [translation, setTranslation] = useState<Translation>("kjv");
  const [verseIndex, setVerseIndex] = useState(0);
  const [prevDay, setPrevDay] = useState(expandedDay);

  // Reset passage index when a different day is selected (adjust-state-during-render pattern)
  if (expandedDay !== prevDay) {
    setPrevDay(expandedDay);
    setVerseIndex(0);
  }

  // Derive loading state from whether the current key matches the last fetch
  const passage = reading?.passages?.[verseIndex] || reading?.passages?.[0];
  const currentKey = passage ? `${passage}-${translation}` : null;
  const loading = currentKey !== null && (fetchKey !== currentKey || verse === null);

  // Fetch verse text when passage or translation changes
  useEffect(() => {
    if (!reading?.passages?.length) return;
    const p = reading.passages[verseIndex] || reading.passages[0];
    const key = `${p}-${translation}`;
    let cancelled = false;
    fetch(`/api/bible?passage=${encodeURIComponent(p)}&translation=${translation}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled) {
          setVerse(d);
          setFetchKey(key);
        }
      })
      .catch(() => {
        if (!cancelled) setFetchKey(key);
      });
    return () => {
      cancelled = true;
    };
  }, [reading, translation, verseIndex]);

  const words = verse?.text?.split(" ") || [];

  return (
    <AnimatePresence>
      {expandedDay && reading && (
        <motion.div
          key={`drawer-${selectedWeek}-${expandedDay}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-6 p-7 md:p-8 rounded-3xl bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-border)] relative overflow-hidden">
            {/* Noise texture */}
            <div
              className="absolute inset-0 rounded-3xl opacity-15 mix-blend-overlay pointer-events-none"
              style={{ backgroundImage: NOISE_SVG }}
            />
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-plum/10 rounded-full blur-[60px]" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen weight="fill" size={20} className="text-plum" />
                  <div>
                    <p className="font-bold text-[var(--color-text-primary)]">
                      {DAY_FULL[expandedDay]}
                      <span className="text-[var(--color-text-muted)] font-normal ml-2 text-sm">
                        Week {selectedWeek}
                      </span>
                    </p>
                    <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      {formatDateShort(getDateForReading(selectedWeek, expandedDay))}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTranslation((t) => (t === "kjv" ? "web" : "kjv"))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-plum/10 border border-plum/20 hover:bg-plum/20 transition-all"
                  >
                    <ArrowsLeftRight size={12} className="text-plum-muted" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-plum-muted">
                      {translation.toUpperCase()}
                    </span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-[var(--color-charcoal)] flex items-center justify-center hover:bg-plum/20 transition-colors"
                  >
                    <X size={14} className="text-[var(--color-text-muted)]" />
                  </button>
                </div>
              </div>

              {/* Passage toggle pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {reading.passages.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setVerseIndex(i)}
                    className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                      verseIndex === i
                        ? "bg-plum text-white"
                        : "bg-plum/10 text-plum-muted hover:bg-plum/20"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Verse text */}
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center py-10"
                  >
                    <SpinnerGap size={28} className="text-plum animate-spin" />
                  </motion.div>
                ) : verse ? (
                  <motion.div
                    key={`${verse.reference}-${translation}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span className="text-5xl text-plum/20 font-display block leading-none mb-1">
                      &ldquo;
                    </span>
                    <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed max-w-3xl">
                      {words.map((w, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.02, duration: 0.3 }}
                          className="inline-block mr-[0.3em]"
                        >
                          {w}
                        </motion.span>
                      ))}
                    </p>
                    <p className="text-xs font-mono text-plum mt-4">
                      &mdash; {verse.reference} ({verse.translation})
                    </p>
                    <p className="text-[11px] text-[var(--color-text-muted)] italic mt-2">
                      Preview of the opening verses. Read the full chapter in your Bible.
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[var(--color-text-muted)] italic py-6"
                  >
                    Unable to load verses. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
