import type { Metadata } from "next";
import { REELS, shuffleReels } from "@/lib/reels-config";
import ReelsFeed from "@/components/reels/ReelsFeed";

export const metadata: Metadata = {
  title: "Reels | Youth Alive Global",
  description:
    "Short-form video highlights from Youth Alive branches worldwide. Swipe through worship, events, and kingdom moments.",
};

export default function ReelsPage() {
  // Shuffle server-side so every visit gets a fresh order
  // (no hydration mismatch since this is a Server Component)
  const shuffled = shuffleReels(REELS);

  return <ReelsFeed reels={shuffled} />;
}
