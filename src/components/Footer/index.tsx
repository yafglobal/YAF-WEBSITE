"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
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
        {/* Big statement */}
        <div className="border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <ScrollReveal>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl text-white">
                Ready to become a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-tint to-plum-tint">
                  Kingdom Giant
                </span>
                ?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 px-6 py-3.5 md:px-8 md:py-4 bg-plum text-white font-display font-semibold text-xs md:text-sm tracking-wide uppercase rounded-full hover:bg-plum-tint hover:text-charcoal transition-all duration-300 hover:shadow-[0_0_40px_rgba(134,22,87,0.4)]"
                >
                  Connect with us globally
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-white/20 text-white/70 font-display font-medium text-xs md:text-sm tracking-wide uppercase rounded-full hover:border-plum/50 hover:text-plum-tint transition-all duration-300"
                >
                  Find a location
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

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
