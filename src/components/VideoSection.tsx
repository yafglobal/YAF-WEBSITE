"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Play } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const VIDEO_ID = "optmgB8AZDI";

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section id="events" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 mesh-gradient" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4 flex items-center justify-center gap-2">
              <Play size={14} weight="fill" />
              Watch & Experience
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Experience the <span className="text-glow-plum text-plum">Fire</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Watch highlights from Jubilee 1.0 and other powerful gatherings that are transforming
              lives across the globe.
            </p>
          </ScrollReveal>
        </div>

        {/* Video embed with plum border — uses a facade to avoid loading ~1MB of YouTube JS until clicked */}
        <ScrollReveal delay={0.3}>
          <motion.div style={{ scale: videoScale }} className="relative">
            {/* Plum border wrapper */}
            <div className="plum-border">
              <div className="video-container bg-[var(--color-surface)]">
                {iframeLoaded ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                    title="JUBILEE 1.0 | YOUTHALIVE GLOBAL"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <button
                    onClick={() => setIframeLoaded(true)}
                    className="absolute inset-0 w-full h-full cursor-pointer group"
                    aria-label="Play video"
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                      alt="JUBILEE 1.0 | YOUTHALIVE GLOBAL"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-plum/90 flex items-center justify-center shadow-[0_0_40px_rgba(134,22,87,0.5)] group-hover:scale-110 transition-transform duration-300">
                        <Play size={32} weight="fill" className="text-white ml-1" />
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Decorative glow beneath */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-plum/15 blur-[60px] rounded-full" />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
