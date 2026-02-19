"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

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
    <footer className="bg-black text-white py-0 px-0 relative overflow-hidden min-h-[60vh] md:min-h-[80vh] flex items-center justify-center">
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
    </footer>
  );
}
