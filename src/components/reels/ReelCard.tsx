"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

export default function ReelCard({
  reel,
  isActive,
  isMuted,
  onToggleMute,
  onRequestNext,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  // Track tap feedback: "play" | "pause" | null
  const [tapIcon, setTapIcon] = useState<"play" | "pause" | null>(null);

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

  // Progress tracking via timeupdate event callback (setState in callback is fine)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isActive) return;

    const onTime = () => {
      if (video.duration) {
        setProgress(video.currentTime / video.duration);
      }
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [isActive]);

  // Auto-advance on video end
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isActive) return;

    const onEnded = () => onRequestNext();
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [isActive, onRequestNext]);

  // Tap to play/pause — setState only in event handler (not in effect)
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

  const preloadValue = isActive ? "auto" : "metadata";

  return (
    <div className="reel-card relative w-full overflow-hidden bg-black">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.src}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
        preload={preloadValue}
        onClick={handleTap}
      />

      {/* Tap play/pause icon */}
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

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <motion.div
          className="h-full bg-plum"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </div>
  );
}
