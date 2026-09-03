export interface YouTubeChannel {
  title: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  thumbnail: string;
  uploadsPlaylistId: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  viewCount?: string;
}

const API_KEY = process.env.YOUTUBE_API_KEY;
const HANDLE = '@VMone';

export async function getChannelData(): Promise<YouTubeChannel | null> {
  if (!API_KEY) return null;

  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&forHandle=${HANDLE}&key=${API_KEY}`,
      { 
        headers: { 'referer': 'https://www.vmhubllp.com/' },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (!data.items || data.items.length === 0) return null;

    const channel = data.items[0];
    
    return {
      title: channel.snippet?.title || 'VMONE',
      subscriberCount: channel.statistics?.subscriberCount || '',
      viewCount: channel.statistics?.viewCount || '',
      videoCount: channel.statistics?.videoCount || '',
      thumbnail: channel.snippet?.thumbnails?.high?.url || '',
      uploadsPlaylistId: channel.contentDetails?.relatedPlaylists?.uploads || '',
    };
  } catch {
    console.error('[YouTube API Error] Failed to fetch channel data.');
    return null;
  }
}

interface PlaylistSnippet {
  resourceId: { videoId: string };
  title: string;
  publishedAt: string;
  thumbnails: {
    maxres?: { url: string };
    high?: { url: string };
  };
}

interface PlaylistItem {
  snippet: PlaylistSnippet;
}

interface VideoItem {
  id: string;
  statistics: { viewCount: string };
  contentDetails: { duration: string };
}

export async function getLatestVideos(uploadsPlaylistId: string): Promise<YouTubeVideo[] | null> {
  if (!API_KEY) return null;

  try {
    // 1. Get latest 15 videos from uploads playlist to ensure we have enough after filtering shorts
    const playlistRes = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=15&key=${API_KEY}`,
      { 
        headers: { 'referer': 'https://www.vmhubllp.com/' },
        next: { revalidate: 3600 } 
      }
    );

    if (!playlistRes.ok) return null;

    const playlistData = await playlistRes.json();
    if (!playlistData.items || playlistData.items.length === 0) return null;

    const videoIds = playlistData.items.map((item: PlaylistItem) => item.snippet.resourceId.videoId).join(',');

    // 2. Get video statistics and contentDetails (for duration)
    const videosRes = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { 
        headers: { 'referer': 'https://www.vmhubllp.com/' },
        next: { revalidate: 3600 } 
      }
    );

    const videosData = videosRes.ok ? await videosRes.json() : { items: [] };
    
    // Create a map of Video data
    const videoDataMap = new Map<string, VideoItem>();
    videosData.items?.forEach((v: VideoItem) => videoDataMap.set(v.id, v));

    // 3. Map and filter out shorts
    const longFormVideos = playlistData.items
      .map((item: PlaylistItem) => {
        const id = item.snippet?.resourceId?.videoId;
        if (!id) return null;
        
        const videoInfo = videoDataMap.get(id);
        if (!videoInfo) return null;

        // Parse ISO 8601 duration (e.g., PT1H2M10S, PT59S, PT1M)
        const durationStr = videoInfo.contentDetails?.duration || '';
        const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        let totalSeconds = 0;
        
        if (match) {
          const hours = parseInt(match[1] || '0', 10);
          const minutes = parseInt(match[2] || '0', 10);
          const seconds = parseInt(match[3] || '0', 10);
          totalSeconds = hours * 3600 + minutes * 60 + seconds;
        }

        // Filter out shorts and mini-reviews.
        // Some vertical "shorts" on this channel are slightly over 60s (e.g., 1m15s, 1m22s).
        // Since VMONE's standard long-form tech reviews are consistently 8-30+ minutes long,
        // we can safely block anything under 3 minutes (180 seconds) to ensure only main reviews pass through.
        if (totalSeconds <= 180) return null;
        
        const thumbnails = item.snippet?.thumbnails;
        const thumbnailUrl = thumbnails?.maxres?.url || thumbnails?.high?.url || '';

        return {
          id,
          title: item.snippet?.title || 'Video',
          publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
          thumbnail: thumbnailUrl,
          url: `https://www.youtube.com/watch?v=${id}`,
          viewCount: videoInfo.statistics?.viewCount,
        };
      })
      .filter((v: YouTubeVideo | null): v is YouTubeVideo => v !== null);

    // Return the top 3 long form videos
    return longFormVideos.slice(0, 3);

  } catch {
    console.error('[YouTube API Error] Failed to fetch latest videos.');
    return null;
  }
}

export function formatCompactNumber(number: string | number): string {
  if (!number) return '0';
  const num = typeof number === 'string' ? parseInt(number, 10) : number;
  
  if (num >= 100000000) {
    return (num / 1000000).toFixed(0) + 'M'; // 329M
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'; // 3.67M
  }
  return num.toLocaleString('en-US');
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval === 1 ? '1 year ago' : `${interval} years ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval === 1 ? '1 month ago' : `${interval} months ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval === 1 ? '1 day ago' : `${interval} days ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
  
  return 'Just now';
}
