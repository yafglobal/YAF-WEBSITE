"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import VideoOverlay from "./VideoOverlay";
import type { Leader } from "./types";

export default function FeaturedCard({ leader }: { leader: Leader }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <ScrollReveal>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative rounded-3xl overflow-hidden bg-[var(--color-surface)] mb-8 cursor-pointer"
      >
        <div className="grid md:grid-cols-2 min-h-[420px] md:min-h-[520px]">
          {/* Image / video side */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={leader.image}
              alt={leader.name}
              fill
              className="object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <VideoOverlay video={leader.video} isHovered={isHovered} isMuted={isMuted} />

            {/* Fade into text side */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--color-surface)] hidden md:block z-[3]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent md:hidden z-[3]" />

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-fire/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[3]" />

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
                <SpeakerHigh size={18} weight="fill" className="text-fire" />
              )}
            </button>

            {/* Play indicator */}
            <div
              className={`absolute bottom-4 left-4 z-[4] flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-sm transition-all duration-500 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fire opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fire" />
              </span>
              <span className="text-foreground/80 text-[10px] tracking-widest uppercase font-semibold">
                Now Playing
              </span>
            </div>
          </div>

          {/* Text side */}
          <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <span className="font-display font-extrabold text-8xl lg:text-9xl text-fire/[0.06] absolute top-4 right-8 select-none pointer-events-none">
              01
            </span>

            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-fire" />
              <span className="text-fire text-xs font-semibold tracking-[0.3em] uppercase">
                {leader.role}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-[1.1] tracking-tight">
              {leader.name}
            </h3>

            <p className="mt-2 text-[var(--color-text-secondary)] text-sm">{leader.subtitle}</p>

            <p className="mt-6 text-[var(--color-text-secondary)] text-base leading-relaxed max-w-lg">
              {leader.bio}
            </p>

            <div className="mt-8 w-16 h-[2px] bg-gradient-to-r from-fire to-transparent" />
          </div>
        </div>

        {/* Ring */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[var(--color-border)] group-hover:ring-fire/15 transition-all duration-500" />
      </motion.div>
    </ScrollReveal>
  );
}
