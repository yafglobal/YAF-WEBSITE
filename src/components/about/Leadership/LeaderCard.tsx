"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import VideoOverlay from "./VideoOverlay";
import type { Leader } from "./types";

export default function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <ScrollReveal delay={0.15 * (index + 1)}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative cursor-pointer"
      >
        {/* Image / video container */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--color-surface)]">
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <VideoOverlay video={leader.video} isHovered={isHovered} isMuted={isMuted} />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent z-[3]" />

          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-plum/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[3]" />

          {/* Audio toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted((m) => !m);
            }}
            className={`absolute top-4 left-4 z-[5] w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center transition-all duration-400 hover:bg-background/80 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
            }`}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <SpeakerSlash size={18} weight="fill" className="text-foreground/80" />
            ) : (
              <SpeakerHigh size={18} weight="fill" className="text-plum" />
            )}
          </button>

          {/* Play indicator */}
          <div
            className={`absolute top-4 right-4 z-[4] flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-sm transition-all duration-500 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-plum opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-plum" />
            </span>
            <span className="text-foreground/80 text-[10px] tracking-widest uppercase font-semibold">
              Now Playing
            </span>
          </div>

          {/* Content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-[4]">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-5 h-[1.5px] bg-plum" />
              <span className="text-plum text-xs font-semibold tracking-wider uppercase">
                {leader.role}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--color-text-primary)] leading-tight">
              {leader.name}
            </h3>

            <p className="mt-1 text-[var(--color-text-secondary)] text-sm">{leader.subtitle}</p>

            {/* Bio on hover */}
            <p className="mt-3 text-[var(--color-text-muted)] text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-out">
              {leader.bio}
            </p>
          </div>

          {/* Corner accent on hover */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[4]">
            <div className="absolute top-4 right-4 w-8 h-[2px] bg-plum" />
            <div className="absolute top-4 right-4 w-[2px] h-8 bg-plum" />
          </div>

          {/* Ring */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[var(--color-border)] group-hover:ring-plum/20 transition-all duration-500 z-[4]" />
        </div>

        {/* Number indicator */}
        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-plum/30 group-hover:bg-plum/10 transition-all duration-300 z-10">
          <span className="font-display font-bold text-sm text-[var(--color-text-secondary)] group-hover:text-plum transition-colors">
            {String(index + 2).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
