import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import LoadingScreen from "@/components/LoadingScreen";

// Lazy load below-the-fold sections for faster initial page load
const About = dynamic(() => import("@/components/About"));
const ThemeSection = dynamic(() => import("@/components/ThemeSection"));
const GlobalPresence = dynamic(() => import("@/components/GlobalPresence"));
const BranchesMenu = dynamic(() => import("@/components/FlowingMenu"));
const Community = dynamic(() => import("@/components/Community"));
const PhotoGallery = dynamic(() => import("@/components/PhotoGallery"));
const ProgramsSection = dynamic(() => import("@/components/ProgramsSection"));
const BibleReadingPlanSection = dynamic(
  () => import("@/components/BiblePlan/BibleReadingPlanSection")
);
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
        <ThemeSection />
        <GlobalPresence />
        <BranchesMenu />
        <Community />
        <PhotoGallery />
        <ProgramsSection />
        <BibleReadingPlanSection />
        <AppSection />
        <VideoSection />
        <GiveSection />
        <Footer />
      </main>
    </>
  );
}
