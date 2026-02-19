import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityPage from "@/components/community/CommunityPage";

export const metadata: Metadata = {
  title: "Global Community | Youth Alive Global",
  description:
    "Explore Youth Alive communities across Africa, Europe, and North America. Find locations, browse event galleries, and connect with young believers worldwide.",
};

export default function CommunityRoute() {
  return (
    <main className="relative grain">
      <Navbar lightHero />
      <CommunityPage />
      <Footer />
    </main>
  );
}
