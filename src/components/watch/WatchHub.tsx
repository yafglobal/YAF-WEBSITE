"use client";

import { useState } from "react";
import { motion } from "motion/react";
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

interface PlaylistEntry {
  id: string;
  title: string;
  videos: YouTubePlaylistItem[];
  countryName: string;
  countryFlag: string;
  continentName: string;
}

interface WatchHubProps {
  continents: ContinentCardData[];
  allVideos: YouTubePlaylistItem[];
  playlists: PlaylistEntry[];
}

export default function WatchHub({ continents, allVideos, playlists }: WatchHubProps) {
  const [selectedVideo, setSelectedVideo] = useState<{
    videoId: string;
    title: string;
  } | null>(null);

  const handlePlayVideo = (videoId: string, title: string) => {
    setSelectedVideo({ videoId, title });
  };

  const recentVideos = allVideos.slice(0, 12);

  // Group playlists by continent
  const playlistsByContinent = playlists.reduce<Record<string, PlaylistEntry[]>>(
    (acc, playlist) => {
      if (!acc[playlist.continentName]) acc[playlist.continentName] = [];
      acc[playlist.continentName].push(playlist);
      return acc;
    },
    {}
  );

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

        {/* All Playlists */}
        {Object.keys(playlistsByContinent).length > 0 && (
          <div className="mt-8 md:mt-12">
            {Object.entries(playlistsByContinent).map(([continent, entries]) => (
              <div key={continent} className="mt-6 md:mt-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="px-6 md:px-12 mb-2"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-plum/70">
                    {continent}
                  </span>
                </motion.div>

                {entries.map((playlist) => (
                  <VideoRow
                    key={playlist.id}
                    title={playlist.title}
                    videos={playlist.videos}
                    onPlayVideo={handlePlayVideo}
                    playlistId={playlist.id}
                    regionLabel={playlist.countryName}
                    flag={<span className="text-base">{playlist.countryFlag}</span>}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
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
