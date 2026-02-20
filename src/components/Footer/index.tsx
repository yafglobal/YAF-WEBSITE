"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import BrandColumn from "./BrandColumn";
import ResourcesColumn from "./ResourcesColumn";
import ContactColumn from "./ContactColumn";
import SocialLinks from "./SocialLinks";
import BottomBar from "./BottomBar";
import { useIsMobile } from "@/hooks/useIsMobile";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/50 animate-pulse" />,
});

interface FooterProps {
  transparent?: boolean;
}

export default function Footer({ transparent = false }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  // On mobile, only mount MuxPlayer when the footer scrolls into view
  const isInView = useInView(footerRef, { once: true, margin: "200px" });
  const shouldLoadVideo = !transparent && (!isMobile || isInView);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className={`relative overflow-hidden min-h-[60vh] md:min-h-[80vh] flex flex-col ${transparent ? "bg-transparent" : "footer-video"}`}
    >
      {/* Mux Video Background — deferred on mobile until footer is near viewport */}
      {shouldLoadVideo && (
        <>
          <div className="absolute inset-0 z-0 overflow-hidden">
            <MuxPlayer
              playbackId="ibkeVQItsSzwuxf013QDq9Elj00pwRYGXkfZT00Q5dCExs"
              metadata={{
                video_id: "yaf-toronto-footer-bg",
                video_title: "Youth Alive Canada Background",
                viewer_user_id: "footer-bg-visitor",
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "0",
                left: "0",
              }}
              className="w-full h-full"
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
            />
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 z-[1] bg-black/65" />
        </>
      )}

      {/* Top fire gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px z-[2] bg-gradient-to-r from-transparent via-plum/40 to-transparent" />

      {/* Content layer */}
      <div className="relative z-[2] flex-1 flex flex-col justify-center">
        {/* Main footer content */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 md:py-12 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 md:gap-8">
            <BrandColumn />
            <ResourcesColumn />
            <ContactColumn />
            <SocialLinks />
          </div>

          <BottomBar />
        </div>
      </div>
    </footer>
  );
}
