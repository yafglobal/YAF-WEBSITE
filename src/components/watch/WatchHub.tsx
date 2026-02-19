"use client";

import { useState } from "react";
import FeaturedHero from "./FeaturedHero";
import VideoRow from "./VideoRow";
import VideoModal from "./VideoModal";
import ContinentCards from "./ContinentCards";
import type { YouTubePlaylistItem } from "@/lib/youtube";

interface ContinentCardData {
  name: string;
  slug: string;
  videoCount: number;
  countries: { name: string; flag: string }[];
}

interface WatchHubProps {
  continents: ContinentCardData[];
  allVideos: YouTubePlaylistItem[];
}

export default function WatchHub({ continents, allVideos }: WatchHubProps) {
  const [selectedVideo, setSelectedVideo] = useState<{
    videoId: string;
    title: string;
  } | null>(null);

  const handlePlayVideo = (videoId: string, title: string) => {
    setSelectedVideo({ videoId, title });
  };

  const recentVideos = allVideos.slice(0, 12);

  return (
    <div className="min-h-screen">
      <FeaturedHero videos={recentVideos.slice(0, 5)} onPlayVideo={handlePlayVideo} />

      <div className="relative z-10 -mt-32 pb-20 bg-gradient-to-b from-transparent via-[var(--color-background)] to-[var(--color-background)]">
        {/* Recently Added */}
        {recentVideos.length > 0 && (
          <VideoRow
            title="Recently Added"
            videos={recentVideos}
            onPlayVideo={handlePlayVideo}
            regionLabel="New"
          />
        )}

        {/* Browse by Continent */}
        <ContinentCards continents={continents} />
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoId={selectedVideo?.videoId || null}
        title={selectedVideo?.title || ""}
      />
    </div>
  );
}
