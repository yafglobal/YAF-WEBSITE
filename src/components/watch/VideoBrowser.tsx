"use client";

import { useState } from "react";
import FeaturedHero from "./FeaturedHero";
import VideoRow from "./VideoRow";
import VideoModal from "./VideoModal";
import type { YouTubePlaylistItem } from "@/lib/youtube";

// Nigeria flag SVG
const NigeriaFlag = () => (
  <svg width="20" height="14" viewBox="0 0 3 2" className="rounded-sm shadow-sm">
    <rect width="1" height="2" fill="#008751" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#008751" />
  </svg>
);

// Canada flag SVG
const CanadaFlag = () => (
  <svg width="20" height="10" viewBox="0 0 9600 4800" className="rounded-sm shadow-sm">
    <rect fill="#f00" width="2400" height="4800" />
    <rect fill="#fff" x="2400" width="4800" height="4800" />
    <rect fill="#f00" x="7200" width="2400" height="4800" />
    <path
      fill="#f00"
      d="M4800 1e3l-319 1538-1 1-137-67 148 613-306-156 1 2-39-175-192 399-5-1 30-266-338 77-2-2 306-571-306-571 2-2 338 77-30-266 5-1 192 399 39-175-1 2 306-156-148 613 137-67 1 1z"
    />
  </svg>
);

interface PlaylistWithVideos {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  videos: YouTubePlaylistItem[];
  region?: "global" | "canada" | "usa" | "uk" | "kenya";
}

interface VideoBrowserProps {
  globalPlaylists: PlaylistWithVideos[];
  canadaPlaylists: PlaylistWithVideos[];
  usaPlaylists: PlaylistWithVideos[];
  ukPlaylists: PlaylistWithVideos[];
  kenyaPlaylists: PlaylistWithVideos[];
  allVideos: YouTubePlaylistItem[];
}

// Kenya flag SVG
const KenyaFlag = () => (
  <svg width="20" height="13" viewBox="0 0 900 600" className="rounded-sm shadow-sm">
    <rect width="900" height="600" fill="#006600" />
    <rect y="0" width="900" height="200" fill="#000" />
    <rect y="400" width="900" height="200" fill="#006600" />
    <rect y="170" width="900" height="260" fill="#bb0000" />
    <rect y="200" width="900" height="200" fill="#bb0000" />
    <g fill="#fff">
      <rect y="185" width="900" height="15" />
      <rect y="400" width="900" height="15" />
    </g>
  </svg>
);

// UK flag SVG
const UKFlag = () => (
  <svg width="20" height="12" viewBox="0 0 60 30" className="rounded-sm shadow-sm">
    <clipPath id="uk-clip">
      <rect width="60" height="30" />
    </clipPath>
    <g clipPath="url(#uk-clip)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-clip)" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

// USA flag SVG
const USAFlag = () => (
  <svg width="20" height="11" viewBox="0 0 1235 650" className="rounded-sm shadow-sm">
    <rect width="1235" height="650" fill="#B22234" />
    <g fill="#fff">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} y={i * 100} width="1235" height="50" />
      ))}
    </g>
    <rect width="494" height="350" fill="#3C3B6E" />
  </svg>
);

export default function VideoBrowser({
  globalPlaylists,
  canadaPlaylists,
  usaPlaylists,
  ukPlaylists,
  kenyaPlaylists,
  allVideos,
}: VideoBrowserProps) {
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

      <div className="relative z-10 -mt-32 pb-20 space-y-8 bg-gradient-to-b from-transparent via-[var(--color-background)] to-[var(--color-background)]">
        {/* Recently Added */}
        {recentVideos.length > 0 && (
          <VideoRow
            title="Recently Added"
            videos={recentVideos}
            onPlayVideo={handlePlayVideo}
            regionLabel="New"
          />
        )}

        {/* GLOBAL section first (Nigeria flag) */}
        {globalPlaylists.map(
          (playlist) =>
            playlist.videos.length > 0 && (
              <VideoRow
                key={playlist.id}
                title={playlist.title}
                videos={playlist.videos}
                onPlayVideo={handlePlayVideo}
                playlistId={playlist.id}
                flag={<NigeriaFlag />}
                regionLabel="Global Church"
              />
            )
        )}

        {/* CANADA section (Canada flag) */}
        {canadaPlaylists.map(
          (playlist) =>
            playlist.videos.length > 0 && (
              <VideoRow
                key={playlist.id}
                title={playlist.title}
                videos={playlist.videos}
                onPlayVideo={handlePlayVideo}
                playlistId={playlist.id}
                flag={<CanadaFlag />}
                regionLabel="Canada"
              />
            )
        )}

        {/* USA section (USA flag) */}
        {usaPlaylists.map(
          (playlist) =>
            playlist.videos.length > 0 && (
              <VideoRow
                key={playlist.id}
                title={playlist.title}
                videos={playlist.videos}
                onPlayVideo={handlePlayVideo}
                playlistId={playlist.id}
                flag={<USAFlag />}
                regionLabel="USA"
              />
            )
        )}

        {/* UK section (UK flag) */}
        {ukPlaylists.map(
          (playlist) =>
            playlist.videos.length > 0 && (
              <VideoRow
                key={playlist.id}
                title={playlist.title}
                videos={playlist.videos}
                onPlayVideo={handlePlayVideo}
                playlistId={playlist.id}
                flag={<UKFlag />}
                regionLabel="United Kingdom"
              />
            )
        )}

        {/* Kenya section (Kenya flag) */}
        {kenyaPlaylists.map(
          (playlist) =>
            playlist.videos.length > 0 && (
              <VideoRow
                key={playlist.id}
                title={playlist.title}
                videos={playlist.videos}
                onPlayVideo={handlePlayVideo}
                playlistId={playlist.id}
                flag={<KenyaFlag />}
                regionLabel="Kenya"
              />
            )
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
