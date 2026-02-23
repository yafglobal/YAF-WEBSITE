import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContinentVideoBrowser from "@/components/watch/ContinentVideoBrowser";
import { getPlaylistVideos, getChannelPlaylists } from "@/lib/youtube";
import { CONTINENTS, getContinentBySlug, CANADA_CHANNEL_PLAYLIST_ID } from "@/lib/watch-config";

interface ContinentPageProps {
  params: Promise<{ continent: string }>;
}

export async function generateStaticParams() {
  return CONTINENTS.map((c) => ({ continent: c.slug }));
}

export async function generateMetadata({ params }: ContinentPageProps): Promise<Metadata> {
  const { continent: slug } = await params;
  const continent = getContinentBySlug(slug);
  if (!continent) return {};
  return {
    title: `Watch ${continent.name} | Youth Alive Global`,
    description: `Watch videos from Youth Alive fellowships across ${continent.name} — ${continent.countries.map((c) => c.name).join(", ")}.`,
  };
}

export default async function ContinentPage({ params }: ContinentPageProps) {
  const { continent: slug } = await params;
  const continent = getContinentBySlug(slug);
  if (!continent) notFound();

  // Collect all playlists for this continent
  const allPlaylists = continent.countries.flatMap((country) =>
    country.playlists.map((p) => ({ ...p, countryName: country.name, countryFlag: country.flag }))
  );

  // Fetch all playlist videos in parallel
  const videoArrays = await Promise.all(allPlaylists.map((p) => getPlaylistVideos(p.id, 50)));

  // For North America, also fetch Canada channel-level playlists
  let channelPlaylists: {
    id: string;
    title: string;
    videos: Awaited<ReturnType<typeof getPlaylistVideos>>;
    countryName: string;
    countryFlag: string;
  }[] = [];
  if (slug === "north-america") {
    const rawPlaylists = await getChannelPlaylists();
    const filtered = rawPlaylists.filter((p) => p.id !== CANADA_CHANNEL_PLAYLIST_ID);
    channelPlaylists = await Promise.all(
      filtered.map(async (playlist) => {
        const videos = await getPlaylistVideos(playlist.id, 15);
        return {
          id: playlist.id,
          title: playlist.title,
          videos,
          countryName: "Canada",
          countryFlag: "🇨🇦",
        };
      })
    );
  }

  // Build playlist entries with country metadata
  const playlistEntries = allPlaylists
    .map((p, i) => ({
      id: p.id,
      title: p.title,
      description: `${p.title} playlist`,
      thumbnail: videoArrays[i]?.[0]?.thumbnail || "",
      itemCount: videoArrays[i]?.length || 0,
      videos: videoArrays[i] || [],
      countryName: p.countryName,
      countryFlag: p.countryFlag,
    }))
    .filter((p) => p.videos.length > 0);

  // Add channel playlists for North America
  const channelEntries = channelPlaylists
    .filter((p) => p.videos.length > 0)
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: `${p.title} playlist`,
      thumbnail: p.videos[0]?.thumbnail || "",
      itemCount: p.videos.length,
      videos: p.videos,
      countryName: p.countryName,
      countryFlag: p.countryFlag,
    }));

  const allEntries = [...playlistEntries, ...channelEntries];

  // All videos for the featured hero
  const allVideos = allEntries
    .flatMap((p) => p.videos)
    .filter((video, index, self) => index === self.findIndex((v) => v.videoId === video.videoId))
    .slice(0, 20);

  return (
    <main className="relative grain min-h-screen">
      <Navbar />
      <ContinentVideoBrowser
        continentName={continent.name}
        continentSlug={continent.slug}
        playlists={allEntries}
        allVideos={allVideos}
        countries={continent.countries.map((c) => ({
          name: c.name,
          flag: c.flag,
        }))}
      />
      <Footer />
    </main>
  );
}
