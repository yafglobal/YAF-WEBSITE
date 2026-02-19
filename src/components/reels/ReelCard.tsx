"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, Pause, SpeakerHigh, SpeakerSlash, House, MapPin } from "@phosphor-icons/react";
import Link from "next/link";
import type { ReelConfig } from "@/lib/reels-config";

interface ReelCardProps {
  reel: ReelConfig;
  isActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onRequestNext: () => void;
}

/**
 * Renders the video + overlays for a single reel.
 * No wrapper div — the parent in ReelsFeed provides the positioned container
 * so this component can be virtualized (mounted/unmounted) without affecting
 * the scroll-snap layout.
 */
export default function ReelCard({
  reel,
  isActive,
  isMuted,
  onToggleMute,
  onRequestNext,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [tapIcon, setTapIcon] = useState<"play" | "pause" | null>(null);

  // Show/hide loader via direct DOM mutation (no React state, no re-renders)
  useEffect(() => {
    const video = videoRef.current;
    const loader = loaderRef.current;
    if (!video || !loader) return;

    const hide = () => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
    };
    const show = () => {
      loader.style.opacity = "1";
      loader.style.pointerEvents = "auto";
    };

    // Already buffered (e.g. neighbor that just became active)
    if (video.readyState >= 3) {
      hide();
    } else {
      show();
      video.addEventListener("canplay", hide, { once: true });
    }

    return () => video.removeEventListener("canplay", hide);
  }, [reel.src]);

  // Play / pause based on active state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isActive]);

  // Sync muted state
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  // Smooth 60fps progress bar — direct DOM mutation via rAF, no React re-renders.
  // Uses GPU-composited scaleX transform instead of width to avoid layout thrash.
  useEffect(() => {
    const video = videoRef.current;
    const bar = progressRef.current;
    if (!video || !bar || !isActive) {
      if (bar) bar.style.transform = "scaleX(0)";
      return;
    }

    let rafId: number;
    const tick = () => {
      if (video.duration > 0) {
        bar.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  // Auto-advance when video ends (no loop attr — plays once then advances)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isActive) return;

    const onEnded = () => onRequestNext();
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [isActive, onRequestNext]);

  // Tap to play/pause
  const handleTap = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setTapIcon("play");
    } else {
      video.pause();
      setTapIcon("pause");
    }
    setTimeout(() => setTapIcon(null), 600);
  }, []);

  return (
    <>
      {/* Video — no loop so the ended event fires for auto-advance */}
      <video
        ref={videoRef}
        src={reel.src}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        preload="auto"
        onClick={handleTap}
      />

      {/* Loading overlay — fades out via CSS transition once video can play */}
      <div
        ref={loaderRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black transition-opacity duration-300"
      >
        <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-plum animate-spin" />
        <p className="mt-4 text-white/40 text-xs font-medium tracking-wide uppercase">Loading</p>
      </div>

      {/* Tap play/pause feedback */}
      <AnimatePresence>
        {tapIcon && (
          <motion.div
            key={tapIcon}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              {tapIcon === "pause" ? (
                <Pause size={36} weight="fill" className="text-white" />
              ) : (
                <Play size={36} weight="fill" className="text-white ml-1" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom gradient overlay for text */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />

      {/* Top gradient for controls */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />

      {/* Right side controls */}
      <div className="absolute right-4 top-5 z-30 flex flex-col gap-3">
        <Link
          href="/"
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <House size={20} weight="bold" />
        </Link>
        <button
          onClick={onToggleMute}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          {isMuted ? (
            <SpeakerSlash size={20} weight="bold" />
          ) : (
            <SpeakerHigh size={20} weight="bold" />
          )}
        </button>
      </div>

      {/* Bottom info overlay */}
      <div className="absolute bottom-6 left-4 right-16 z-20">
        <h3 className="text-white text-lg font-bold font-display leading-tight mb-1">
          {reel.title}
        </h3>
        <p className="text-white/70 text-sm font-medium mb-2">{reel.branch}</p>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-plum/60 backdrop-blur-sm text-white text-xs font-medium">
          <MapPin size={12} weight="fill" />
          {reel.region}
        </span>
      </div>

      {/* Progress bar — GPU-composited scaleX, no React re-renders */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-plum"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </>
  );
}
