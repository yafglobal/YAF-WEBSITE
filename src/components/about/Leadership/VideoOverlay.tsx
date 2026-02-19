"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import MuxPlayer from "@mux/mux-player-react";
import type { VideoConfig } from "./types";

interface VideoOverlayProps {
  video: VideoConfig;
  isHovered: boolean;
  isMuted: boolean;
}

export default function VideoOverlay({ video, isHovered, isMuted }: VideoOverlayProps) {
  const localRef = useRef<HTMLVideoElement>(null);
  const muxRef = useRef<HTMLElement & { play: () => void; pause: () => void; muted: boolean }>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isHovered) {
      if (video.type === "local" && localRef.current) {
        localRef.current.play().catch(() => {});
      } else if (muxRef.current) {
        try {
          muxRef.current.play();
        } catch {
          /* noop */
        }
      }
    } else {
      localRef.current?.pause();
      muxRef.current?.pause();
    }
  }, [isHovered, video.type]);

  useEffect(() => {
    if (localRef.current) localRef.current.muted = isMuted;
    if (muxRef.current) muxRef.current.muted = isMuted;
  }, [isMuted]);

  const handlePlaying = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);

  const showVideo = isHovered && isPlaying;

  if (video.type === "local") {
    return (
      <video
        ref={localRef}
        src={video.src}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        onPlaying={handlePlaying}
        onPause={handlePause}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-[2] ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
      />
    );
  }

  return (
    <MuxPlayer
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={muxRef as React.RefObject<any>}
      playbackId={video.playbackId}
      muted={isMuted}
      loop
      playsInline
      preload="metadata"
      streamType="on-demand"
      maxResolution="1080p"
      minResolution="480p"
      onPlaying={handlePlaying}
      onPause={handlePause}
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 z-[2] ${
        showVideo ? "opacity-100" : "opacity-0"
      }`}
      style={
        {
          "--controls": "none",
          "--media-object-fit": "cover",
          "--media-object-position": "center",
          aspectRatio: "unset",
          width: "100%",
          height: "100%",
        } as Record<string, string>
      }
    />
  );
}
