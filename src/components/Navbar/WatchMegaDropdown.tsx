"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Play, FilmStrip } from "@phosphor-icons/react";
import { watchDropdownItems } from "./navConfig";

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
        {/* Video Library card */}
        <Link
          href="/watch"
          className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 hover:border-plum/40 hover:shadow-[var(--shadow-plum-sm)]"
        >
          {/* YouTube thumbnail preview */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="https://img.youtube.com/vi/optmgB8AZDI/hqdefault.jpg"
              alt="Video Library"
              fill
              sizes="240px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/20">
              <div className="w-12 h-12 rounded-full bg-plum/80 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play size={22} weight="fill" className="text-white ml-0.5" />
              </div>
            </div>
          </div>

          <div className="p-3">
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-1.5">
              <Play size={16} weight="bold" className="text-plum" />
              Video Library
            </h4>
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Sermons & conferences</p>
          </div>
        </Link>

        {/* Reels card */}
        <Link
          href="/reels"
          className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 hover:border-plum/40 hover:shadow-[var(--shadow-plum-sm)]"
        >
          {/* Phone mockup with looping video preview */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-plum-dark/40 to-charcoal flex items-center justify-center">
            {/* Phone frame */}
            <div className="relative w-[72px] h-[128px] rounded-xl border-2 border-white/20 overflow-hidden shadow-xl shadow-plum/20 bg-black">
              <video
                src="https://globalreels.winnerschapelsudbury.org/videos/ayac-2025-spirit-tunnel.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
              {/* Phone notch */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-black/60" />
            </div>
            {/* Decorative glow behind phone */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-plum/20 blur-2xl" />
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

      {/* Continent quick pills */}
      <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border)]">
        {watchDropdownItems.slice(1).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-1.5 text-xs font-medium rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-plum hover:border-plum/30 transition-colors"
          >
            {item.flag} {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
