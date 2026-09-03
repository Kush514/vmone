import { getChannelData, getLatestVideos } from "@/lib/youtube";
import YoutubeContent from "@/components/youtube/YoutubeContent";

export default async function YoutubeSection() {
  // Fetch real data server-side securely
  const channelData = await getChannelData();
  
  let latestVideos = null;
  if (channelData?.uploadsPlaylistId) {
    latestVideos = await getLatestVideos(channelData.uploadsPlaylistId);
  }

  // Render the client component for GSAP animations
  return <YoutubeContent channelData={channelData} latestVideos={latestVideos} />;
}
