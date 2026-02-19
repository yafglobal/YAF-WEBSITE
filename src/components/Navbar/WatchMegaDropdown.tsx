"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Play, FilmStrip, GlobeHemisphereWest } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { NAVBAR_PREVIEW_REEL } from "@/lib/reels-config";

/** Real video IDs from the channel's playlists for the auto-rotating carousel */
const CAROUSEL_THUMBS = [
  "optmgB8AZDI", // Jubilee 1.0 — main channel
  "97PvDJ3Sfpw", // Exploring The Virtue Of Love — AYAC 2025
  "JogLQdBPR-I", // AYAC 2025 Word Sessions — Canada
  "tXsXRNt6tRQ", // SHABACH End-of-Year Praise — Kenya
  "o8uezl05-vc", // Understanding The Power Of Obedience — AYAC 2025
];

const CONTINENTS = [
  {
    label: "Africa",
    href: "/watch/africa",
    gradient: "from-amber-600/80 to-orange-800/80",
    emoji: "\u{1F1F3}\u{1F1EC}",
    accent: "group-hover:shadow-amber-500/30",
  },
  {
    label: "North America",
    href: "/watch/north-america",
    gradient: "from-red-600/80 to-rose-800/80",
    emoji: "\u{1F1E8}\u{1F1E6}",
    accent: "group-hover:shadow-red-500/30",
  },
  {
    label: "Europe",
    href: "/watch/europe",
    gradient: "from-blue-600/80 to-indigo-800/80",
    emoji: "\u{1F1EC}\u{1F1E7}",
    accent: "group-hover:shadow-blue-500/30",
  },
];

function ThumbnailCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CAROUSEL_THUMBS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      {CAROUSEL_THUMBS.map((videoId, i) => (
        <Image
          key={videoId}
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={`Video thumbnail ${i + 1}`}
          fill
          sizes="240px"
          className={`object-cover transition-opacity duration-700 ${
            i === activeIdx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Play button overlay */}
      <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-colors group-hover:bg-black/15">
        <div className="w-11 h-11 rounded-full bg-plum/80 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play size={20} weight="fill" className="text-white ml-0.5" />
        </div>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {CAROUSEL_THUMBS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === activeIdx ? "w-4 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function WatchMegaDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl shadow-black/30 backdrop-blur-xl z-50"
    >
      {/* Two visual cards side-by-side */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Video Library — thumbnail carousel */}
        <Link
          href="/watch"
          className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 hover:border-plum/40 hover:shadow-[var(--shadow-plum-sm)]"
        >
          <ThumbnailCarousel />
          <div className="p-3">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
              <Play size={16} weight="bold" className="text-plum" />
              Video Library
            </h4>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Sermons & conferences</p>
          </div>
        </Link>

        {/* Reels — phone mockup with live preview */}
        <Link
          href="/reels"
          className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 hover:border-plum/40 hover:shadow-[var(--shadow-plum-sm)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-plum-dark/40 to-charcoal flex items-center justify-center">
            {/* Phone frame */}
            <div className="relative w-[72px] h-[128px] rounded-xl border-2 border-white/20 overflow-hidden shadow-xl shadow-plum/20 bg-black transition-transform duration-500 group-hover:scale-105">
              <video
                src={NAVBAR_PREVIEW_REEL}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-black/60" />
            </div>
            {/* Glow behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-28 h-28 rounded-full bg-plum/20 blur-2xl transition-all duration-500 group-hover:bg-plum/30 group-hover:w-32 group-hover:h-32" />
            </div>
          </div>

          <div className="p-3">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
              <FilmStrip size={16} weight="bold" className="text-plum" />
              Reels
            </h4>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
              Short clips from branches worldwide
            </p>
          </div>
        </Link>
      </div>

      {/* Browse by Region — visual mini cards */}
      <div className="pt-2.5 border-t border-[var(--color-border)]">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-2 flex items-center gap-1.5">
          <GlobeHemisphereWest size={12} weight="bold" />
          Browse by Region
        </p>
        <div className="grid grid-cols-3 gap-2">
          {CONTINENTS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r ${c.gradient} overflow-hidden transition-all duration-300 hover:shadow-lg ${c.accent}`}
            >
              <span className="text-lg leading-none">{c.emoji}</span>
              <span className="text-xs font-bold text-white drop-shadow-sm">{c.label}</span>
              {/* Subtle shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
