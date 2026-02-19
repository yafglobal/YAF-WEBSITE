"use client";

import { motion, AnimatePresence } from "motion/react";
import { Play } from "@phosphor-icons/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import type { YouTubePlaylistItem } from "@/lib/youtube";

interface FeaturedHeroProps {
  videos: YouTubePlaylistItem[];
  onPlayVideo: (videoId: string, title: string) => void;
}

export default function FeaturedHero({ videos, onPlayVideo }: FeaturedHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track a stable video for the play button so it doesn't shift mid-transition
  const stableVideoRef = useRef(videos[0]);
  const featuredVideo = videos[currentIndex];

  useEffect(() => {
    if (videos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % Math.min(videos.length, 5);
        stableVideoRef.current = videos[next];
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [videos]);

  if (!featuredVideo) return null;

  const highResThumbnail = featuredVideo.thumbnail?.includes("hqdefault")
    ? featuredVideo.thumbnail.replace("hqdefault", "maxresdefault")
    : featuredVideo.thumbnail;

  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden">
      {/* Crossfade: both old and new images render simultaneously */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={highResThumbnail}
            alt={featuredVideo.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-background)] to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end pb-32 md:pb-40 px-6 md:px-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded bg-plum text-white text-[10px] font-bold uppercase tracking-widest">
              Featured
            </span>
            <span className="text-white/60 text-sm font-medium">Youth Alive Global</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={() =>
                onPlayVideo(stableVideoRef.current.videoId, stableVideoRef.current.title)
              }
              className="flex items-center gap-3 bg-plum text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-plum-light transition-colors shadow-xl"
            >
              <Play weight="fill" className="w-6 h-6" /> Play
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
