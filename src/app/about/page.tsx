import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import WhatWeOffer from "@/components/about/WhatWeOffer";
import Leadership from "@/components/about/Leadership";
import ImpactStats from "@/components/about/ImpactStats";
import JoinCTA from "@/components/about/JoinCTA";

export const metadata: Metadata = {
  title: "About Us | Youth Alive Global",
  description:
    "Discover Youth Alive Fellowship — a vibrant community of kingdom-focused high-flyers equipped to take the world by a storm. Spiritual growth, career advancement, and personal transformation.",
};

export default function AboutPage() {
  return (
    <main className="relative grain">
      <Navbar />
      <AboutHero />
      <OurStory />
      <WhatWeOffer />
      <ImpactStats />
      <Leadership />
      <JoinCTA />
      <Footer />
    </main>
  );
}
