"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MapPin } from "@phosphor-icons/react";
import type { ReelConfig } from "@/lib/reels-config";
import ReelCard from "./ReelCard";

/** Only mount video elements for reels within ±BUFFER of the active index */
const VIRTUALIZATION_BUFFER = 2;

interface ReelsFeedProps {
  reels: ReelConfig[];
}

export default function ReelsFeed({ reels }: ReelsFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // IntersectionObserver to detect which reel is in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) setCurrentIndex(idx);
          }
        }
      },
      { root: container, threshold: 0.6 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [reels]);

  // Scroll to a specific reel by index (clamped)
  const scrollToIndex = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= reels.length) return;
      cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
    },
    [reels.length]
  );

  // Auto-advance callback passed to each ReelCard
  const scrollToNext = useCallback(() => {
    scrollToIndex(currentIndex + 1);
  }, [currentIndex, scrollToIndex]);

  // Keyboard navigation — arrow keys to move between reels
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex(currentIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex(currentIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, scrollToIndex]);

  // Keep the active dot indicator scrolled into view on desktop
  useEffect(() => {
    const dots = dotsRef.current;
    if (!dots) return;
    const activeDot = dots.children[currentIndex] as HTMLElement | undefined;
    activeDot?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [currentIndex]);

  return (
    <div className="w-full h-dvh bg-black flex items-center justify-center">
      {/* Desktop: phone-shaped container | Mobile: full width */}
      <div
        ref={containerRef}
        className="reels-container w-full h-full md:max-w-[420px] md:h-[calc(100dvh-40px)] md:rounded-3xl md:overflow-hidden md:shadow-2xl md:shadow-black/60 md:border md:border-white/5 relative"
      >
        {reels.map((reel, i) => {
          const isActive = currentIndex === i;
          const isNearby = Math.abs(currentIndex - i) <= VIRTUALIZATION_BUFFER;

          return (
            <div
              key={reel.id}
              data-index={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="reel-card relative w-full overflow-hidden bg-black"
            >
              {isNearby ? (
                <ReelCard
                  reel={reel}
                  isActive={isActive}
                  isMuted={isMuted}
                  onToggleMute={() => setIsMuted((m) => !m)}
                  onRequestNext={scrollToNext}
                />
              ) : (
                /* Lightweight placeholder — maintains scroll-snap position
                   with minimal DOM while showing reel metadata */
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative z-10">
                    <p className="text-white/40 text-sm font-bold">{reel.title}</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-white/25 text-xs">
                      <MapPin size={10} weight="fill" />
                      {reel.region}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop side indicator dots — auto-scrolls to keep active dot visible */}
      <div
        ref={dotsRef}
        className="hidden md:flex flex-col gap-1.5 ml-4 max-h-[60vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reels.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              scrollToIndex(i);
            }}
            className={`w-2 shrink-0 rounded-full transition-all duration-300 ${
              currentIndex === i ? "h-6 bg-plum" : "h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
