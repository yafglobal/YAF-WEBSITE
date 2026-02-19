"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import FeaturedHero from "./FeaturedHero";
import VideoRow from "./VideoRow";
import VideoModal from "./VideoModal";
import type { YouTubePlaylistItem } from "@/lib/youtube";

interface PlaylistEntry {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  videos: YouTubePlaylistItem[];
  countryName: string;
  countryFlag: string;
}

interface ContinentVideoBrowserProps {
  continentName: string;
  continentSlug: string;
  playlists: PlaylistEntry[];
  allVideos: YouTubePlaylistItem[];
  countries: { name: string; flag: string }[];
}

export default function ContinentVideoBrowser({
  continentName,
  continentSlug,
  playlists,
  allVideos,
  countries,
}: ContinentVideoBrowserProps) {
  const [selectedVideo, setSelectedVideo] = useState<{
    videoId: string;
    title: string;
  } | null>(null);

  // Suppress unused variable warning — slug reserved for future use
  void continentSlug;

  const handlePlayVideo = (videoId: string, title: string) => {
    setSelectedVideo({ videoId, title });
  };

  const recentVideos = allVideos.slice(0, 12);

  // Group playlists by country
  const countriesWithPlaylists = countries
    .map((country) => ({
      ...country,
      playlists: playlists.filter((p) => p.countryName === country.name),
    }))
    .filter((c) => c.playlists.length > 0);

  return (
    <div className="min-h-screen">
      <FeaturedHero videos={recentVideos.slice(0, 5)} onPlayVideo={handlePlayVideo} />

      <div className="relative z-10 -mt-32 pb-20 bg-gradient-to-b from-transparent via-[var(--color-background)] to-[var(--color-background)]">
        {/* Breadcrumb / back link */}
        <div className="px-6 md:px-12 pt-40 pb-6 flex items-center gap-4">
          <Link
            href="/watch"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-plum transition-colors"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
            All Regions
          </Link>
          <span className="text-[var(--color-text-muted)]/30">/</span>
          <span className="text-sm font-semibold text-[var(--color-text-primary)]">
            {continentName}
          </span>
        </div>

        {/* Continent header */}
        <div className="px-6 md:px-12 mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-[var(--color-text-primary)] tracking-tight mb-3">
            {continentName}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            {countries.map((country) => (
              <span
                key={country.name}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]"
              >
                <span className="text-base">{country.flag}</span>
                {country.name}
              </span>
            ))}
            <span className="text-[var(--color-text-muted)] text-sm">
              &middot; {allVideos.length}+ videos
            </span>
          </div>
        </div>

        {/* Recently Added from this continent */}
        {recentVideos.length > 0 && (
          <VideoRow
            title="Recently Added"
            videos={recentVideos}
            onPlayVideo={handlePlayVideo}
            regionLabel="New"
          />
        )}

        {/* Playlist rows grouped by country */}
        {countriesWithPlaylists.map((country) =>
          country.playlists.map((playlist) => (
            <VideoRow
              key={playlist.id}
              title={playlist.title}
              videos={playlist.videos}
              onPlayVideo={handlePlayVideo}
              playlistId={playlist.id}
              flag={<span className="text-lg">{country.flag}</span>}
              regionLabel={country.name}
            />
          ))
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
