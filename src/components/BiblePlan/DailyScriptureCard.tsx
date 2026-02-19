"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import {
  BookBookmark,
  ArrowRight,
  ArrowsLeftRight,
  Clock,
  SpinnerGap,
} from "@phosphor-icons/react";
import { getTodaysReading, type TodaysReading } from "@/lib/get-todays-reading";

/* ── Types ─────────────────────────────────── */

interface VerseData {
  text: string;
  reference: string;
  translation: string;
}

type Translation = "kjv" | "web";

const TRANSLATION_LABELS: Record<Translation, string> = {
  kjv: "KJV",
  web: "WEB",
};

const TRANSLATION_FULL_NAMES: Record<Translation, string> = {
  kjv: "King James Version",
  web: "World English Bible",
};

/* ── Verse fetcher ─────────────────────────── */

async function fetchVerse(passage: string, translation: Translation): Promise<VerseData | null> {
  try {
    const res = await fetch(
      `/api/bible?passage=${encodeURIComponent(passage)}&translation=${translation}`
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/* ── Countdown hook ────────────────────────── */

interface CountdownTime {
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeUntilLocalMidnight(): CountdownTime {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function useCountdown() {
  const [time, setTime] = useState<CountdownTime & { mounted: boolean }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    mounted: false,
  });

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setTime({ ...getTimeUntilLocalMidnight(), mounted: true });
    });
    const interval = setInterval(() => {
      setTime((prev) => ({
        ...getTimeUntilLocalMidnight(),
        mounted: prev.mounted,
      }));
    }, 1000);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(interval);
    };
  }, []);

  return time;
}

/* ── Component ─────────────────────────────── */

interface DailyScriptureCardProps {
  onViewPlan: () => void;
}

export default function DailyScriptureCard({ onViewPlan }: DailyScriptureCardProps) {
  const [todaysReading] = useState<TodaysReading>(() => getTodaysReading());
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [translation, setTranslation] = useState<Translation>("kjv");
  const [verseIndex, setVerseIndex] = useState(0);
  const [fetchKey, setFetchKey] = useState<string | null>(null);

  const countdown = useCountdown();
  const formatTime = (n: number) => n.toString().padStart(2, "0");

  // Derive loading state
  const currentKey = todaysReading?.passages?.[verseIndex]
    ? `${todaysReading.passages[verseIndex]}-${translation}`
    : null;
  const isLoading = currentKey !== null && (fetchKey !== currentKey || verse === null);

  // Fetch verse when passage or translation changes
  useEffect(() => {
    if (!todaysReading?.passages?.length) return;

    let cancelled = false;
    const passage = todaysReading.passages[verseIndex] || todaysReading.passages[0];
    const key = `${passage}-${translation}`;

    fetchVerse(passage, translation).then((data) => {
      if (!cancelled) {
        setVerse(data);
        setFetchKey(key);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [todaysReading, translation, verseIndex]);

  const toggleTranslation = () => setTranslation((t) => (t === "kjv" ? "web" : "kjv"));

  // Split for word-by-word animation
  const words = verse?.text?.split(" ") || [];

  return (
    <div className="relative w-full max-w-[500px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl"
      >
        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-plum/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-plum-tint/15 rounded-full blur-[100px]" />

        <div className="relative z-10 p-8 md:p-10">
          {/* ── Header ─────────────────────────── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <motion.div
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-plum animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                  {todaysReading?.dayLabel} &bull; Week {todaysReading?.week}
                </span>
              </motion.div>
              <motion.h3
                className="text-[var(--color-text-primary)] font-display text-2xl md:text-3xl italic"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Today&apos;s Scripture
              </motion.h3>
            </div>

            {/* Translation Toggle */}
            <motion.button
              onClick={toggleTranslation}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-plum/10 border border-plum/20 hover:bg-plum/20 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={TRANSLATION_FULL_NAMES[translation]}
            >
              <ArrowsLeftRight
                size={14}
                className="text-plum-muted group-hover:text-plum transition-colors"
              />
              <span className="text-[10px] font-mono uppercase tracking-wider text-plum-muted">
                {TRANSLATION_LABELS[translation]}
              </span>
            </motion.button>
          </div>

          {/* ── Passage Pills ──────────────────── */}
          {todaysReading?.passages && todaysReading.passages.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {todaysReading.passages.map((passage, idx) => (
                <button
                  key={idx}
                  onClick={() => setVerseIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                    verseIndex === idx
                      ? "bg-plum text-white"
                      : "bg-plum/10 text-plum-muted hover:bg-plum/20 hover:text-plum"
                  }`}
                >
                  {passage}
                </button>
              ))}
            </motion.div>
          )}

          {/* ── Verse Display ──────────────────── */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {todaysReading?.passages && todaysReading.passages.length > 0 ? (
                isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex justify-center py-12"
                  >
                    <SpinnerGap size={32} className="text-plum animate-spin" />
                  </motion.div>
                ) : verse ? (
                  <motion.div
                    key={`${verse.reference}-${translation}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Capped verse area with fade-out mask */}
                    <div className="relative max-h-[220px] overflow-hidden">
                      {/* Opening Quote */}
                      <motion.span
                        className="block text-7xl text-plum/30 leading-none mb-1 font-display"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        &ldquo;
                      </motion.span>

                      {/* Word-by-word animated verse */}
                      <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed font-body">
                        {words.map((word, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.2 + i * 0.03,
                              duration: 0.4,
                              ease: "easeOut",
                            }}
                            className="inline-block mr-[0.3em]"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </p>

                      {/* Fade-out gradient mask */}
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--color-surface)] to-transparent pointer-events-none" />
                    </div>

                    {/* Reference + disclaimer sit below the capped area */}
                    <motion.p
                      className="text-xs font-mono text-plum tracking-wide mt-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + Math.min(words.length, 30) * 0.03 }}
                    >
                      &mdash; {verse.reference} ({verse.translation})
                    </motion.p>

                    <motion.p
                      className="text-[11px] text-[var(--color-text-muted)] italic mt-2 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + Math.min(words.length, 30) * 0.03 }}
                    >
                      Preview of the opening verses. Full reading above.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[var(--color-text-muted)] text-lg italic py-8"
                  >
                    Unable to load verse. Please try again later.
                  </motion.p>
                )
              ) : (
                <motion.p
                  key="no-verse"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[var(--color-text-muted)] text-lg italic py-8"
                >
                  {todaysReading?.isBeforePlanStart
                    ? "The reading plan begins January 1, 2026"
                    : todaysReading?.isAfterPlanEnd
                      ? "You've completed the reading plan!"
                      : "Rest in His presence today"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── Countdown Timer ────────────────── */}
          <motion.div
            className="mt-8 p-4 rounded-2xl bg-[var(--color-charcoal)] border border-[var(--color-border)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[var(--color-text-muted)]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                  Next Reading In
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                    {countdown.mounted ? formatTime(countdown.hours) : "--"}
                  </span>
                  <span className="text-[8px] uppercase text-[var(--color-text-muted)]">hrs</span>
                </div>
                <span className="text-2xl font-bold text-[var(--color-border-medium)] -mt-3">
                  :
                </span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-[var(--color-text-primary)] tabular-nums">
                    {countdown.mounted ? formatTime(countdown.minutes) : "--"}
                  </span>
                  <span className="text-[8px] uppercase text-[var(--color-text-muted)]">min</span>
                </div>
                <span className="text-2xl font-bold text-[var(--color-border-medium)] -mt-3">
                  :
                </span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-plum tabular-nums">
                    {countdown.mounted ? formatTime(countdown.seconds) : "--"}
                  </span>
                  <span className="text-[8px] uppercase text-[var(--color-text-muted)]">sec</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Footer Actions ─────────────────── */}
          <motion.div
            className="flex items-center justify-between mt-6 pt-6 border-t border-[var(--color-border)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-plum/15 flex items-center justify-center">
                <BookBookmark weight="fill" size={20} className="text-plum" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                  Reading Plan
                </p>
                <p className="text-sm font-bold text-[var(--color-text-secondary)]">
                  53 Weeks &bull; Full Bible
                </p>
              </div>
            </div>
            <motion.button
              onClick={onViewPlan}
              className="group flex items-center gap-2 px-5 py-3 rounded-full bg-plum text-white font-bold text-xs uppercase tracking-wider hover:shadow-[var(--shadow-plum-sm)] transition-all"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              View Full Plan
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 border border-plum/20 rounded-full pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[var(--color-border)] rounded-full pointer-events-none" />
    </div>
  );
}
