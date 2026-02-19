"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, DownloadSimple } from "@phosphor-icons/react";
import { useEffect, useCallback } from "react";
import { lockBodyScroll } from "@/lib/body-scroll-lock";

interface BiblePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BiblePlanModal({ isOpen, onClose }: BiblePlanModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleEscape);
    const releaseScrollLock = lockBodyScroll();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      releaseScrollLock();
    };
  }, [isOpen, handleEscape]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black" />

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 hover:bg-plum border border-white/20 hover:border-plum transition-all duration-300"
          >
            <X weight="bold" className="w-5 h-5 text-white" />
            <span className="text-white text-xs font-bold uppercase tracking-wider">Close</span>
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-[85vh] max-w-6xl z-10 flex flex-col mt-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-display italic text-white">
                2026 Bible Reading Plan
              </h2>
              <a
                href="/bible-plan-2026.pdf"
                download
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-plum text-white text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105"
              >
                <DownloadSimple weight="bold" className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>
            </div>

            <div className="relative flex-1 rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-white/10">
              <iframe
                src="/bible-plan-2026.pdf#toolbar=0"
                className="absolute inset-0 w-full h-full"
                title="Bible Reading Plan Preview"
              />
            </div>

            <div className="mt-4 text-center">
              <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                Scroll inside the viewer to see all pages &bull; Press ESC to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
