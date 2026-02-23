"use client";

import { motion, AnimatePresence } from "motion/react";
import { BookOpenText, ArrowsLeftRight, Fire, SpinnerGap } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { getCurrentWeek, getPlanProgress } from "@/lib/bible-plan-utils";
import { getTodaysReading, type TodaysReading } from "@/lib/get-todays-reading";

type Translation = "kjv" | "web";

interface VerseData {
  text: string;
  reference: string;
  translation: string;
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function PlanHero() {
  const [reading] = useState<TodaysReading>(() => getTodaysReading());
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [translation, setTranslation] = useState<Translation>("kjv");
  const [fetchKey, setFetchKey] = useState<string | null>(null);

  const progress = getPlanProgress();
  const currentWeek = getCurrentWeek();

  // Derive loading state from whether the current key matches the last fetch
  const currentKey = reading?.passages?.[0] ? `${reading.passages[0]}-${translation}` : null;
  const loading = currentKey !== null && (fetchKey !== currentKey || verse === null);

  useEffect(() => {
    if (!reading?.passages?.length) return;
    let cancelled = false;
    const passage = reading.passages[0];
    const key = `${passage}-${translation}`;
    fetch(`/api/bible?passage=${encodeURIComponent(passage)}&translation=${translation}`)
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
  }, [reading, translation]);

  const words = verse?.text?.split(" ") || [];
  const circumference = 2 * Math.PI * 88;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-28 pb-16">
      {/* Faint watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <span className="text-[16rem] md:text-[28rem] font-black text-[var(--color-text-primary)] select-none leading-none tracking-tighter">
          2026
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.3fr_auto] gap-16 lg:gap-24 items-center">
          {/* Left: Title + Today's verse */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Fire weight="fill" size={14} className="text-plum" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-plum font-black">
                  Scripture Journey
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-[var(--color-text-primary)] leading-[0.9] tracking-tighter mb-8">
                Read the Word.
                <br />
                <span className="italic text-plum">Stay Enfired.</span>
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] font-light leading-relaxed max-w-xl mb-12">
                53 weeks through the entire Bible. Explore any week, read any day&apos;s passages,
                and keep the fire burning all year long.
              </p>
            </motion.div>

            {/* Today's verse card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-border)] shadow-xl max-w-2xl"
            >
              <div
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: NOISE_SVG }}
              />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-plum/15 rounded-full blur-[80px]" />

              <div className="relative z-10 p-7 md:p-8">
                <HeroCardHeader
                  reading={reading}
                  translation={translation}
                  onToggle={() => setTranslation((t) => (t === "kjv" ? "web" : "kjv"))}
                />

                {reading?.passages && reading.passages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {reading.passages.map((p, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-plum/10 text-plum text-xs font-bold"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="l"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-center py-8"
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
                      <p className="text-base md:text-lg text-[var(--color-text-primary)] leading-relaxed">
                        {words.map((w, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.025, duration: 0.35 }}
                            className="inline-block mr-[0.3em]"
                          >
                            {w}
                          </motion.span>
                        ))}
                      </p>
                      <p className="text-xs font-mono text-plum mt-4">
                        &mdash; {verse.reference} ({verse.translation})
                      </p>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="e"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[var(--color-text-muted)] italic py-6"
                    >
                      {reading?.isBeforePlanStart
                        ? "The reading plan begins January 1, 2026"
                        : reading?.isAfterPlanEnd
                          ? "You\u2019ve completed the reading plan!"
                          : "Rest in His presence today"}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right: Progress ring (desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-center gap-8"
          >
            <div className="relative w-52 h-52">
              <div className="absolute inset-6 bg-plum/10 rounded-full blur-[30px]" />
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90 relative z-10">
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="var(--color-plum)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{
                    strokeDashoffset: circumference * (1 - progress / 100),
                  }}
                  style={{ strokeDasharray: `${circumference}` }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.span
                  className="text-5xl font-bold text-[var(--color-text-primary)] tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  {progress}
                  <span className="text-2xl text-plum">%</span>
                </motion.span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-muted)] mt-1">
                  Complete
                </span>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-plum animate-pulse" />
                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                  Week {currentWeek}
                  <span className="text-[var(--color-text-muted)] font-normal"> of 53</span>
                </span>
              </div>
              <p className="text-[11px] text-[var(--color-text-muted)]">{reading?.dateFormatted}</p>
            </div>
          </motion.div>
        </div>

        {/* Mobile progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="lg:hidden mt-12 flex items-center gap-6 p-5 rounded-2xl bg-[var(--color-surface)] backdrop-blur-md border border-[var(--color-border)]"
        >
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="6"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="var(--color-plum)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 85}`}
                strokeDashoffset={`${2 * Math.PI * 85 * (1 - progress / 100)}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--color-text-primary)]">
                {progress}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">
              Week {currentWeek} of 53
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">{reading?.dateFormatted}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Small extracted sub-component for the card header ── */

function HeroCardHeader({
  reading,
  translation,
  onToggle,
}: {
  reading: TodaysReading | null;
  translation: Translation;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-plum/15 rounded-xl flex items-center justify-center">
          <BookOpenText weight="fill" size={16} className="text-plum" />
        </div>
        <div>
          <p className="text-xs font-bold text-plum uppercase tracking-wider">
            Today&apos;s Reading
          </p>
          <p className="text-[10px] text-[var(--color-text-muted)] font-mono">
            {reading?.dayLabel} &bull; Week {reading?.week}
          </p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-plum/10 border border-plum/20 hover:bg-plum/20 transition-all"
      >
        <ArrowsLeftRight size={12} className="text-plum-muted" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-plum-muted">
          {translation.toUpperCase()}
        </span>
      </button>
    </div>
  );
}
