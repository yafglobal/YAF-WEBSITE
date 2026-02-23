"use client";

import { motion } from "motion/react";
import { Play, CaretLeft, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { YouTubePlaylistItem } from "@/lib/youtube";

function VideoCard({
  video,
  onPlay,
  index,
}: {
  video: YouTubePlaylistItem;
  onPlay: (videoId: string, title: string) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer"
      onClick={() => onPlay(video.videoId, video.title)}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--color-charcoal)] ring-1 ring-[var(--color-border)] group-hover:ring-plum/50 transition-all duration-300 group-hover:scale-105 group-hover:z-10 group-hover:shadow-2xl group-hover:shadow-plum/20">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-plum/20 to-[var(--color-charcoal)] flex items-center justify-center">
            <Play weight="fill" className="w-12 h-12 text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-plum flex items-center justify-center scale-75 group-hover:scale-100 transition-transform shadow-xl">
            <Play weight="fill" className="w-7 h-7 text-white ml-1" />
          </div>
        </div>
      </div>
      <div className="mt-3 pr-2">
        <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] line-clamp-2 transition-colors">
          {video.title}
        </h3>
      </div>
    </motion.div>
  );
}

interface VideoRowProps {
  title: string;
  videos: YouTubePlaylistItem[];
  onPlayVideo: (videoId: string, title: string) => void;
  playlistId?: string;
  flag?: React.ReactNode;
  regionLabel?: string;
}

export default function VideoRow({
  title,
  videos,
  onPlayVideo,
  playlistId,
  flag,
  regionLabel,
}: VideoRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 340 * 3;
    const newPosition =
      scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
    scrollRef.current.scrollTo({ left: newPosition, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  if (!videos || videos.length === 0) return null;

  return (
    <div className="relative py-6 md:py-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-6 px-6 md:px-12"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:block w-1 h-8 bg-gradient-to-b from-plum to-plum/0 rounded-full" />
          <div>
            {regionLabel && (
              <div className="flex items-center gap-2 mb-1">
                {flag}
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-plum">
                  {regionLabel}
                </span>
              </div>
            )}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-[var(--color-text-primary)] tracking-tight uppercase">
              {title}
            </h2>
          </div>
        </div>
        {playlistId && (
          <a
            href={`https://www.youtube.com/playlist?list=${playlistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-secondary)] hover:text-plum hover:border-plum transition-all"
          >
            VIEW ALL <CaretRight weight="bold" className="w-4 h-4" />
          </a>
        )}
      </motion.div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent flex items-center justify-start pl-2 transition-opacity duration-300 ${showLeftArrow ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="w-10 h-10 rounded-full bg-[var(--color-surface-hover)] flex items-center justify-center transition-colors">
            <CaretLeft weight="bold" className="w-6 h-6 text-[var(--color-text-primary)]" />
          </div>
        </button>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto px-6 md:px-12 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} onPlay={onPlayVideo} index={index} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-0 bottom-0 z-20 w-12 md:w-16 bg-gradient-to-l from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent flex items-center justify-end pr-2 transition-opacity duration-300 ${showRightArrow ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="w-10 h-10 rounded-full bg-[var(--color-surface-hover)] flex items-center justify-center transition-colors">
            <CaretRight weight="bold" className="w-6 h-6 text-[var(--color-text-primary)]" />
          </div>
        </button>
      </div>
    </div>
  );
}
