import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WatchHub from "@/components/watch/WatchHub";
import { getPlaylistVideos, getChannelPlaylists } from "@/lib/youtube";
import { CONTINENTS, CANADA_CHANNEL_PLAYLIST_ID } from "@/lib/watch-config";

export const metadata: Metadata = {
  title: "Watch | Youth Alive Global",
  description:
    "Experience powerful messages, worship sessions, and event highlights from Youth Alive Global and regional fellowships worldwide.",
};

export default async function WatchPage() {
  // Collect all playlist IDs across all continents (with country metadata)
  const allPlaylists = CONTINENTS.flatMap((c) =>
    c.countries.flatMap((country) =>
      country.playlists.map((p) => ({
        ...p,
        countryName: country.name,
        countryFlag: country.flag,
        continentName: c.name,
      }))
    )
  );

  // Fetch all playlist videos + channel playlists in parallel
  const [channelPlaylists, ...allVideoArrays] = await Promise.all([
    getChannelPlaylists(),
    ...allPlaylists.map((p) => getPlaylistVideos(p.id, 50)),
  ]);

  // Fetch additional channel-level playlists (Canada channel)
  const channelPlaylistsFiltered = channelPlaylists.filter(
    (p) => p.id !== CANADA_CHANNEL_PLAYLIST_ID
  );
  const channelPlaylistVideos = await Promise.all(
    channelPlaylistsFiltered.map((playlist) => getPlaylistVideos(playlist.id, 15))
  );
  const additionalVideos = channelPlaylistVideos.reduce((sum, vids) => sum + vids.length, 0);

  // Build video count per continent
  const continentData = CONTINENTS.map((continent) => {
    let videoCount = 0;
    for (const country of continent.countries) {
      for (const playlist of country.playlists) {
        const idx = allPlaylists.findIndex((p) => p.id === playlist.id);
        if (idx !== -1) videoCount += allVideoArrays[idx]?.length || 0;
      }
    }
    if (continent.slug === "north-america") {
      videoCount += additionalVideos;
    }
    return {
      name: continent.name,
      slug: continent.slug,
      videoCount,
      countries: continent.countries.map((c) => ({ name: c.name, flag: c.flag })),
    };
  });

  // Build playlist entries with videos for display
  const playlistEntries = allPlaylists
    .map((p, i) => ({
      id: p.id,
      title: p.title,
      videos: allVideoArrays[i] || [],
      countryName: p.countryName,
      countryFlag: p.countryFlag,
      continentName: p.continentName,
    }))
    .filter((p) => p.videos.length > 0);

  // Add Canada channel-level playlists
  const channelEntries = channelPlaylistsFiltered
    .map((p, i) => ({
      id: p.id,
      title: p.title,
      videos: channelPlaylistVideos[i] || [],
      countryName: "Canada",
      countryFlag: "🇨🇦",
      continentName: "North America",
    }))
    .filter((p) => p.videos.length > 0);

  const allPlaylistEntries = [...playlistEntries, ...channelEntries];

  // Collect all videos for "Recently Added" and featured hero
  const allVideos = allVideoArrays
    .flat()
    .filter((video, index, self) => index === self.findIndex((v) => v.videoId === video.videoId))
    .slice(0, 20);

  return (
    <main className="relative grain min-h-screen">
      <Navbar />
      <WatchHub continents={continentData} allVideos={allVideos} playlists={allPlaylistEntries} />
      <Footer />
    </main>
  );
}
