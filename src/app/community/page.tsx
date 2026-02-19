import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityPage from "@/components/community/CommunityPage";

export const metadata: Metadata = {
  title: "Professional Community | Youth Alive Global",
  description:
    "Connect with vision-driven professionals across the globe. Access job fairs, workshops, mentorship, and career opportunities through the Youth Alive Professional Community.",
};

export default function CommunityRoute() {
  return (
    <main className="relative grain">
      <Navbar />
      <CommunityPage />
      <Footer />
    </main>
  );
}
