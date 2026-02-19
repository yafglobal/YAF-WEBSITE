import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load below-the-fold sections for faster initial page load
const About = dynamic(() => import("@/components/About"));
const GlobalPresence = dynamic(() => import("@/components/GlobalPresence"));
const Community = dynamic(() => import("@/components/Community"));
const ProgramsSection = dynamic(() => import("@/components/ProgramsSection"));
const AppSection = dynamic(() => import("@/components/AppSection"));
const VideoSection = dynamic(() => import("@/components/VideoSection"));
const GiveSection = dynamic(() => import("@/components/GiveSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <LoadingScreen />
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
    </>
  );
}
