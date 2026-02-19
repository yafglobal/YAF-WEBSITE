"use client";

import { DownloadSimple, Eye, BookOpen } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useState } from "react";
import BiblePlanModal from "./BiblePlanModal";
import DailyScriptureCard from "./DailyScriptureCard";

export default function BibleReadingPlanSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <section
      id="bible-plan"
      className="py-24 bg-[var(--color-background)] overflow-hidden relative z-20 border-t border-[var(--color-border)]"
    >
      <BiblePlanModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />

      {/* Background Stylized 2026 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="text-[20rem] md:text-[45rem] font-black text-[var(--color-text-primary)] select-none leading-none tracking-tighter">
          2026
        </span>
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-plum/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-plum text-xs tracking-[0.5em] uppercase mb-8 block font-black">
                Personal Growth
              </span>
              <h2 className="font-display text-6xl md:text-8xl font-bold text-[var(--color-text-primary)] mb-10 leading-[0.9] tracking-tighter">
                Master the Word <br />
                <span className="italic text-plum">in 2026</span>
              </h2>
              <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] font-light leading-relaxed mb-16 max-w-xl mx-auto lg:mx-0">
                Join our 53-week journey through the scriptures. Deepen your faith, understand your
                purpose, and stay on fire for God throughout the year.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="group flex items-center gap-4 bg-plum text-white px-10 py-6 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-plum-light transition-all duration-500 shadow-xl active:scale-95"
                >
                  <Eye
                    weight="bold"
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  View Online
                </button>

                <a
                  href="/bible-plan-2026.pdf"
                  download
                  className="group flex items-center gap-4 border border-[var(--color-border-medium)] text-[var(--color-text-primary)] px-10 py-6 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-[var(--color-surface-hover)] transition-all duration-500 active:scale-95"
                >
                  <DownloadSimple
                    weight="bold"
                    size={20}
                    className="group-hover:translate-y-1 transition-transform"
                  />
                  Download PDF
                </a>
              </div>

              <div className="mt-12 flex items-center gap-5 text-[var(--color-text-muted)] justify-center lg:justify-start">
                <div className="w-12 h-12 bg-plum/10 rounded-xl border border-plum/20 flex items-center justify-center backdrop-blur-sm">
                  <BookOpen weight="fill" size={24} className="text-plum" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[var(--color-text-primary)] font-bold tracking-tight text-sm">
                    53 Weeks
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-black text-[var(--color-text-muted)]">
                    Full Bible Journey
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <DailyScriptureCard onViewPlan={() => setIsPreviewOpen(true)} />
        </div>
      </div>
    </section>
  );
}
