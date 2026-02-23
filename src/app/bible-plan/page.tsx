import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BiblePlanPage from "@/components/bible-plan/BiblePlanPage";

export const metadata: Metadata = {
  title: "Bible Reading Plan 2026 | Youth Alive Global",
  description:
    "Join our 53-week journey through the scriptures. Read today's passages, browse past and upcoming readings, and stay on fire for God all year.",
};

export default function BiblePlanRoute() {
  return (
    <main className="relative grain">
      <Navbar />
      <BiblePlanPage />
      <Footer transparent />
    </main>
  );
}
