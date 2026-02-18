const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export type YouTubeChannelStats = {
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
};

export type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: string;
};

export async function fetchChannelStats(): Promise<YouTubeChannelStats | null> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) return null;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
  );

  if (!res.ok) return null;
  const data = await res.json();
  const stats = data.items?.[0]?.statistics;
  if (!stats) return null;

  return {
    subscriberCount: stats.subscriberCount,
    videoCount: stats.videoCount,
    viewCount: stats.viewCount,
  };
}

export async function fetchLatestVideos(maxResults = 10): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) return [];

  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&order=date&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
  );

  if (!searchRes.ok) return [];
  const searchData = await searchRes.json();

  const videos: YouTubeVideo[] = (searchData.items || []).map(
    (item: { id: { videoId: string }; snippet: { title: string; thumbnails: { high?: { url: string } }; publishedAt: string } }) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url || "",
      publishedAt: item.snippet.publishedAt,
    })
  );

  // Fetch view counts
  if (videos.length > 0) {
    const ids = videos.map((v) => v.id).join(",");
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${YOUTUBE_API_KEY}`
    );

    if (statsRes.ok) {
      const statsData = await statsRes.json();
      for (const item of statsData.items || []) {
        const video = videos.find((v) => v.id === item.id);
        if (video) video.viewCount = item.statistics?.viewCount;
      }
    }
  }

  return videos;
}
