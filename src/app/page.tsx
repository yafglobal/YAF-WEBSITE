import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import GlobalPresence from "@/components/GlobalPresence";
import Community from "@/components/Community";
import AppSection from "@/components/AppSection";
import ProgramsSection from "@/components/ProgramsSection";
import VideoSection from "@/components/VideoSection";
import GiveSection from "@/components/GiveSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative grain">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <GlobalPresence />
      <Community />
      <ProgramsSection />
      <AppSection />
      <VideoSection />
      <GiveSection />
      <Footer />
    </main>
  );
}
