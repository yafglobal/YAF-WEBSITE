"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import BrandColumn from "./BrandColumn";
import ResourcesColumn from "./ResourcesColumn";
import ContactColumn from "./ContactColumn";
import SocialLinks from "./SocialLinks";
import BottomBar from "./BottomBar";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/50 animate-pulse" />,
});

export default function Footer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (!containerRef.current || shouldLoadVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  return (
    <footer id="contact" className="relative overflow-hidden footer-video">
      {/* Mux Video Background */}
      <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
        {shouldLoadVideo ? (
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
        ) : (
          <div className="absolute inset-0 bg-black/50 animate-pulse" />
        )}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/65" />

      {/* Top fire gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px z-[2] bg-gradient-to-r from-transparent via-plum/40 to-transparent" />

      {/* Content layer */}
      <div className="relative z-[2]">
        {/* Main footer content */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
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
