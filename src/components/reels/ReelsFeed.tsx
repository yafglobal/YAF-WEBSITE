"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { ReelConfig } from "@/lib/reels-config";
import ReelCard from "./ReelCard";

interface ReelsFeedProps {
  reels: ReelConfig[];
}

export default function ReelsFeed({ reels }: ReelsFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // IntersectionObserver to track which reel is in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".reel-card");

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

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [reels]);

  // Scroll to next reel (for auto-advance)
  const scrollToNext = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const nextIdx = currentIndex + 1;
    if (nextIdx >= reels.length) return; // stop at last reel

    const cards = container.querySelectorAll<HTMLElement>(".reel-card");
    cards[nextIdx]?.scrollIntoView({ behavior: "smooth" });
  }, [currentIndex, reels.length]);

  return (
    <div className="w-full h-dvh bg-black flex items-center justify-center">
      {/* Desktop: phone-shaped container | Mobile: full width */}
      <div
        ref={containerRef}
        className="reels-container w-full h-full md:max-w-[420px] md:h-[calc(100dvh-40px)] md:rounded-3xl md:overflow-hidden md:shadow-2xl md:shadow-black/60 md:border md:border-white/5 relative"
      >
        {reels.map((reel, i) => {
          const isNeighbor = Math.abs(currentIndex - i) === 1;
          return (
            <div key={reel.id} data-index={i}>
              <ReelCard
                reel={reel}
                isActive={currentIndex === i}
                isNeighbor={isNeighbor}
                isMuted={isMuted}
                onToggleMute={() => setIsMuted((m) => !m)}
                onRequestNext={scrollToNext}
              />
            </div>
          );
        })}
      </div>

      {/* Desktop side indicator dots */}
      <div className="hidden md:flex flex-col gap-1.5 ml-4 max-h-[60vh] overflow-hidden">
        {reels.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const container = containerRef.current;
              if (!container) return;
              const cards = container.querySelectorAll<HTMLElement>(".reel-card");
              cards[i]?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-2 rounded-full transition-all duration-300 ${
              currentIndex === i ? "h-6 bg-plum" : "h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
