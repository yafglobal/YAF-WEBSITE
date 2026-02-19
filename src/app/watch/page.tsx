import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoBrowser from "@/components/watch/VideoBrowser";
import { getChannelPlaylists, getPlaylistVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Watch | Youth Alive Global",
  description:
    "Experience powerful messages, worship sessions, and event highlights from Youth Alive Global and regional fellowships worldwide.",
};

// AYAC Global Church playlists (from Winners Chapel International — Nigeria HQ)
const AYAC_GLOBAL_PLAYLISTS = [
  {
    id: "PLvndVG-sYL-uTlKxKry4dr9z_6tZRwrlI",
    title: "AYAC 2025 — Global Church",
  },
  {
    id: "PLvndVG-sYL-utpNLcZ_r8R1ZE-vUojYNj",
    title: "AYAC 2024 — Global Church",
  },
  {
    id: "PLvndVG-sYL-s8B4bWNeMcEMMDmozY9uDS",
    title: "AYAC 2023 — Global Church",
  },
];

// Canada featured playlist
const CANADA_FEATURED_PLAYLIST_ID = "PLZOdi9XtMZfiXIs-qOGFhbABQ50OmGUIo";

// USA featured playlist
const USA_FEATURED_PLAYLIST_ID = "PLuvXgLl_YONfXZdbO9At15vIDT1j2ojex";

// UK featured playlist
const UK_FEATURED_PLAYLIST_ID = "PLuvXgLl_YONevjsA5j4fIhWGJhKZz9QLC";

// Kenya (Nairobi) featured playlist
const KENYA_FEATURED_PLAYLIST_ID = "PLuvXgLl_YONcNsQDtRMPbs5YdpAmqJsCm";

export default async function WatchPage() {
  // Fetch global AYAC playlists + Canada/USA featured videos + channel playlists
  const [
    channelPlaylists,
    canadaFeaturedVideos,
    usaFeaturedVideos,
    ukFeaturedVideos,
    kenyaFeaturedVideos,
    ...ayacVideoArrays
  ] = await Promise.all([
    getChannelPlaylists(),
    getPlaylistVideos(CANADA_FEATURED_PLAYLIST_ID, 50),
    getPlaylistVideos(USA_FEATURED_PLAYLIST_ID, 50),
    getPlaylistVideos(UK_FEATURED_PLAYLIST_ID, 50),
    getPlaylistVideos(KENYA_FEATURED_PLAYLIST_ID, 50),
    ...AYAC_GLOBAL_PLAYLISTS.map((p) => getPlaylistVideos(p.id, 50)),
  ]);

  // Fetch videos for each channel playlist
  const channelPlaylistsWithVideos = await Promise.all(
    channelPlaylists
      .filter((p) => p.id !== CANADA_FEATURED_PLAYLIST_ID)
      .map(async (playlist) => {
        const videos = await getPlaylistVideos(playlist.id, 15);
        return { ...playlist, videos, region: "canada" as const };
      })
  );

  // Build GLOBAL playlist entries
  const globalPlaylists = AYAC_GLOBAL_PLAYLISTS.map((p, i) => ({
    id: p.id,
    title: p.title,
    description: `${p.title} playlist`,
    thumbnail: ayacVideoArrays[i]?.[0]?.thumbnail || "",
    itemCount: ayacVideoArrays[i]?.length || 0,
    videos: ayacVideoArrays[i] || [],
    region: "global" as const,
  })).filter((p) => p.videos.length > 0);

  // Build CANADA playlist entries
  const canadaFeaturedEntry = {
    id: CANADA_FEATURED_PLAYLIST_ID,
    title: "Youth Alive Fellowship Canada",
    description: "All videos from Youth Alive Fellowship Canada",
    thumbnail: canadaFeaturedVideos[0]?.thumbnail || "",
    itemCount: canadaFeaturedVideos.length,
    videos: canadaFeaturedVideos,
    region: "canada" as const,
  };

  const canadaPlaylists = [canadaFeaturedEntry, ...channelPlaylistsWithVideos];

  // Build USA playlist entry
  const usaPlaylists =
    usaFeaturedVideos.length > 0
      ? [
          {
            id: USA_FEATURED_PLAYLIST_ID,
            title: "Youth Alive Fellowship USA",
            description: "All videos from Youth Alive Fellowship USA",
            thumbnail: usaFeaturedVideos[0]?.thumbnail || "",
            itemCount: usaFeaturedVideos.length,
            videos: usaFeaturedVideos,
            region: "usa" as const,
          },
        ]
      : [];

  // Build UK playlist entry
  const ukPlaylists =
    ukFeaturedVideos.length > 0
      ? [
          {
            id: UK_FEATURED_PLAYLIST_ID,
            title: "Youth Alive Fellowship United Kingdom",
            description: "All videos from Youth Alive Fellowship UK",
            thumbnail: ukFeaturedVideos[0]?.thumbnail || "",
            itemCount: ukFeaturedVideos.length,
            videos: ukFeaturedVideos,
            region: "uk" as const,
          },
        ]
      : [];

  // Build KENYA playlist entry
  const kenyaPlaylists =
    kenyaFeaturedVideos.length > 0
      ? [
          {
            id: KENYA_FEATURED_PLAYLIST_ID,
            title: "Youth Alive Nairobi",
            description: "All videos from Youth Alive Nairobi",
            thumbnail: kenyaFeaturedVideos[0]?.thumbnail || "",
            itemCount: kenyaFeaturedVideos.length,
            videos: kenyaFeaturedVideos,
            region: "kenya" as const,
          },
        ]
      : [];

  // All videos combined for "Recently Added"
  const allVideos = [
    ...globalPlaylists,
    ...canadaPlaylists,
    ...usaPlaylists,
    ...ukPlaylists,
    ...kenyaPlaylists,
  ]
    .flatMap((p) => p.videos)
    .filter((video, index, self) => index === self.findIndex((v) => v.videoId === video.videoId))
    .slice(0, 20);

  return (
    <main className="relative grain min-h-screen">
      <Navbar />
      <VideoBrowser
        globalPlaylists={globalPlaylists}
        canadaPlaylists={canadaPlaylists}
        usaPlaylists={usaPlaylists}
        ukPlaylists={ukPlaylists}
        kenyaPlaylists={kenyaPlaylists}
        allVideos={allVideos}
      />
      <Footer />
    </main>
  );
}
