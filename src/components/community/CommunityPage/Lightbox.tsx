"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { ContinentImage } from "./data";
import { lockBodyScroll } from "@/lib/body-scroll-lock";

interface Props {
  images: ContinentImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  continentName: string;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
  continentName,
}: Props) {
  const isOpen = currentIndex !== null;
  const total = images.length;

  const goPrev = useCallback(() => {
    if (currentIndex !== null) onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex !== null) onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  // Body scroll lock + keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const releaseScrollLock = lockBodyScroll();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      releaseScrollLock();
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  const overlay = (
    <AnimatePresence>
      {isOpen && currentIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-2xl flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X size={22} weight="bold" className="text-white" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 z-30 text-white/50 text-sm font-display font-medium">
            {continentName} &mdash; {currentIndex + 1} / {total}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <CaretLeft size={22} weight="bold" className="text-white" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <CaretRight size={22} weight="bold" className="text-white" />
          </button>

          {/* Image with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[92vw] h-[70vh] md:h-[78vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-contain"
                sizes="92vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Portal to document.body so position:fixed escapes any ancestor transform/stacking context
  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
