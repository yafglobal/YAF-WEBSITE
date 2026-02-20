"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import { continents } from "./data";
import ContinentSection from "./ContinentSection";

export default function CommunityPage() {
  const [activeId, setActiveId] = useState("africa");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll-spy: highlight the continent currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative">
      {/* ═══════ Hero ═══════ */}
      <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Photo mosaic background — community images from all regions */}
        <div
          className="absolute inset-0 pointer-events-none will-change-transform [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 auto-rows-fr gap-1 opacity-[0.07] blur-[1px]">
            {[
              "/images/community-bg.jpg",
              "/ukyaf/joyful-praise-gathering.webp",
              "/usayaf/crowd-hands-phones-praise.webp",
              "/yaf-canada/youth-hands-raised-worship.webp",
              "/images/slider-1.jpeg",
              "/ukyaf/southampton-congregation-worship.webp",
              "/usayaf/praise-night-joyful-moment.webp",
              "/yaf-canada/smiling-friends-audience.webp",
              "/images/slider-3.jpeg",
              "/ukyaf/youth-worship-hands-raised.webp",
              "/usayaf/praise-night-worship-leader.webp",
              "/yaf-canada/worship-duo-stage.webp",
              "/images/slider-2.jpeg",
              "/ukyaf/ayac-worship-leader.webp",
              "/usayaf/woman-open-hands-worship.webp",
              "/yaf-canada/choir-leader-band.webp",
              "/images/about/fellowship-photo.png",
              "/usayaf/pastor-white-outfit-preaching.webp",
            ].map((src) => (
              <div key={src} className="relative w-full h-full min-h-0">
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 16.67vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Atmospheric layers */}
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-plum/[0.07] blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-background)] to-transparent" />
        {/* Extra top fade for the mosaic */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[var(--color-background)] to-transparent" />

        <div className="relative z-10 text-center px-6 pt-32 pb-20">
          <ScrollReveal>
            <p className="text-plum font-display text-[11px] tracking-[0.5em] uppercase font-semibold mb-6">
              Youth Alive Global
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-display font-black text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.92] tracking-tight text-[var(--color-text-primary)]">
              Our Global
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-light to-plum-tint">
                Community
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-lg mx-auto">
              One movement across four regions. Thousands of young believers united in purpose,
              faith, and fire.
            </p>
          </ScrollReveal>

          {/* Continent quick-jump pills */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {continents.map((c) => (
                <button
                  key={c.id}
                  onClick={() => scrollTo(c.id)}
                  className="px-5 py-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-display font-semibold hover:border-plum/30 hover:bg-plum/10 transition-all duration-300"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-16"
          >
            <CaretDown size={22} weight="bold" className="text-plum-tint mx-auto opacity-60" />
          </motion.div>
        </div>
      </div>

      {/* ═══════ Sticky continent nav ═══════ */}
      <nav className="sticky top-[68px] z-30 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-1 py-2 overflow-x-auto community-nav-scroll">
          {continents.map((c) => (
            <button
              key={c.id}
              onClick={() => scrollTo(c.id)}
              className={`relative px-5 py-2 rounded-full text-sm font-display font-semibold whitespace-nowrap transition-all duration-300 ${
                activeId === c.id
                  ? "bg-plum text-white shadow-[var(--shadow-plum-sm)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      {/* ═══════ Continent sections ═══════ */}
      {continents.map((c, i) => (
        <div
          key={c.id}
          id={c.id}
          ref={(el) => {
            sectionRefs.current[c.id] = el;
          }}
          className="scroll-mt-[140px]"
        >
          <ContinentSection data={c} index={i} isLast={i === continents.length - 1} />
        </div>
      ))}

      {/* ═══════ CTA ═══════ */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-36 overflow-hidden">
        {/* Floating community photos — one from each region */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Africa */}
          <div className="absolute top-8 left-[5%] md:left-[8%] w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden rotate-[-6deg] opacity-30 md:opacity-40">
            <Image src="/images/slider-2.jpeg" alt="" fill className="object-cover" sizes="112px" />
          </div>
          {/* Europe */}
          <div className="absolute top-12 right-[6%] md:right-[10%] w-16 h-16 md:w-24 md:h-24 rounded-2xl overflow-hidden rotate-[8deg] opacity-25 md:opacity-35">
            <Image
              src="/ukyaf/joyful-praise-gathering.webp"
              alt=""
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          {/* USA */}
          <div className="absolute bottom-12 left-[8%] md:left-[12%] w-18 h-18 md:w-26 md:h-26 rounded-2xl overflow-hidden rotate-[5deg] opacity-25 md:opacity-35">
            <Image
              src="/usayaf/praise-night-joyful-moment.webp"
              alt=""
              fill
              className="object-cover"
              sizes="104px"
            />
          </div>
          {/* Canada */}
          <div className="absolute bottom-8 right-[5%] md:right-[8%] w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden rotate-[-4deg] opacity-30 md:opacity-40">
            <Image
              src="/yaf-canada/smiling-friends-audience.webp"
              alt=""
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          {/* Extra mid-left */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-[3%] w-20 h-20 rounded-xl overflow-hidden rotate-[-10deg] opacity-25">
            <Image
              src="/images/community-bg.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          {/* Extra mid-right */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[3%] w-20 h-20 rounded-xl overflow-hidden rotate-[12deg] opacity-25">
            <Image
              src="/yaf-canada/worship-duo-stage.webp"
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
        </div>

        {/* Radial glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-plum/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <ScrollReveal>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.1] tracking-tight text-[var(--color-text-primary)] mb-6">
              Find your local community
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed mb-10">
              Wherever you are, there&apos;s a Youth Alive family waiting. Connect with
              purpose-driven believers in your region.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-plum text-white font-display font-semibold text-sm tracking-wide uppercase rounded-full hover:bg-plum-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(134,22,87,0.4)]"
            >
              Get in Touch
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
