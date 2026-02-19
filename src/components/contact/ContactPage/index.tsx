"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useContactForm } from "./useContactForm";
import ContactInfoSection from "./ContactInfoSection";
import ContactFormCard from "./ContactFormCard";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/60 animate-pulse" />,
});

export default function ContactPage() {
  const { form, submitted, sending, handleChange, handleSubmit } = useContactForm();
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // Load video immediately since it's the page background
    const rafId = requestAnimationFrame(() => setShouldLoadVideo(true));
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="relative min-h-screen">
      {/* Mux Video — fixed full-page background (shared with footer) */}
      <div ref={videoRef} className="fixed inset-0 z-0" aria-hidden="true">
        {shouldLoadVideo ? (
          <MuxPlayer
            playbackId="ibkeVQItsSzwuxf013QDq9Elj00pwRYGXkfZT00Q5dCExs"
            metadata={{
              video_id: "yaf-contact-page-bg",
              video_title: "Youth Alive Background",
              viewer_user_id: "contact-bg-visitor",
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
          <div className="absolute inset-0 bg-black/60 animate-pulse" />
        )}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <ContactInfoSection />
          <ContactFormCard
            form={form}
            submitted={submitted}
            sending={sending}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
