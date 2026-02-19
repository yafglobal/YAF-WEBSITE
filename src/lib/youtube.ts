const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  itemCount: number;
  videos: YouTubeVideo[];
}

export interface YouTubePlaylistItem {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
  position: number;
}

interface YouTubeThumbnails {
  default?: { url: string };
  medium?: { url: string };
  high?: { url: string };
  maxres?: { url: string };
}

interface YouTubeApiPlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
  };
  contentDetails: {
    itemCount: number;
  };
}

interface YouTubeApiPlaylistVideoItem {
  id: string;
  snippet: {
    title: string;
    thumbnails: YouTubeThumbnails;
    resourceId?: { videoId: string };
    position: number;
  };
}

export async function getChannelPlaylists(): Promise<YouTubePlaylist[]> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) return [];
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=25&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 21600 } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    return (data.items || []).map((item: YouTubeApiPlaylistItem) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url,
      itemCount: item.contentDetails.itemCount,
      videos: [],
    }));
  } catch {
    return [];
  }
}

export async function getPlaylistVideos(
  playlistId: string,
  maxResults: number = 12
): Promise<YouTubePlaylistItem[]> {
  if (!YOUTUBE_API_KEY) return [];
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 21600 } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    return (data.items || [])
      .filter((item: YouTubeApiPlaylistVideoItem) => item.snippet.resourceId?.videoId)
      .map((item: YouTubeApiPlaylistVideoItem) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails?.maxres?.url ||
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url ||
          item.snippet.thumbnails?.default?.url ||
          `https://img.youtube.com/vi/${item.snippet.resourceId!.videoId}/hqdefault.jpg`,
        videoId: item.snippet.resourceId!.videoId,
        position: item.snippet.position,
      }));
  } catch {
    return [];
  }
}
