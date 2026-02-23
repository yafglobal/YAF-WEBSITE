"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react";
import { ArrowUpRight, Lightning, PlayCircle, Sparkle } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

const cultureImages = [
  "/yaf-canada/youth-hands-raised-worship.webp",
  "/yaf-canada/pastor-preaching-wide.webp",
  "/yaf-canada/choir-leader-band.webp",
];

function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={`overflow-hidden relative h-full w-full ${className}`}>
      <motion.div style={{ y: smoothY }} className="w-full relative h-[130%] -top-[15%]">
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover ${imageClassName}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  );
}

function RotatingParallaxImage({
  sources,
  alt,
  className = "",
}: {
  sources: string[];
  alt: string;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sources.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % sources.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [sources]);

  const src = sources[index] ?? sources[0];

  return (
    <div ref={ref} className={`overflow-hidden relative h-full w-full ${className}`}>
      <motion.div style={{ y: smoothY }} className="h-[130%] w-full relative -top-[15%]">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function CanadaAtmosphere() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <ScrollReveal>
              <h2 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
                More Than <br />
                <span className="text-plum-tint italic">A Gathering</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[var(--color-text-secondary)] text-lg md:text-xl font-light leading-relaxed mt-8 max-w-lg">
                We are a generation set on fire for God. Beyond our weekly services, we build lives
                of impact, excellence, and authentic community across Canada.
              </p>
            </ScrollReveal>
          </div>
          <div className="hidden lg:flex gap-4">
            <ScrollReveal delay={0.2} direction="right">
              <div className="p-5 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] flex items-center gap-4">
                <div className="p-3 bg-plum/10 rounded-xl text-plum">
                  <Lightning weight="fill" size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest leading-none text-[var(--color-text-primary)] whitespace-pre-line">
                  {"Marketplace\nDominance"}
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3} direction="right">
              <div className="p-5 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] flex items-center gap-4">
                <div className="p-3 bg-plum/10 rounded-xl text-plum">
                  <Sparkle weight="fill" size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest leading-none text-[var(--color-text-primary)] whitespace-pre-line">
                  {"Divine\nPurpose"}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 md:auto-rows-[500px] lg:auto-rows-[600px]">
          {/* Main Featured — The Culture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-6 min-h-[400px] relative rounded-3xl overflow-hidden group shadow-2xl"
          >
            <RotatingParallaxImage sources={cultureImages} alt="Community Life" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold mb-2 block text-plum-tint drop-shadow-lg">
                The Culture
              </span>
              <h3 className="text-3xl md:text-4xl font-display font-bold italic mb-4 leading-none">
                Authentic Fellowship
              </h3>
              <p className="text-white/60 max-w-sm font-light text-sm">
                Find your tribe in a city that can feel large. Real relationships, real growth.
              </p>
            </div>
          </motion.div>

          {/* Right Stacks — Top */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:flex-1 min-h-[280px] relative rounded-3xl overflow-hidden group shadow-xl"
            >
              <ParallaxImage src="/yaf-canada/panel-discussion-stage.webp" alt="Panel discussion" />
              <div className="absolute inset-0 bg-plum/10 group-hover:bg-transparent transition-colors" />
            </motion.div>

            {/* School of Destiny */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:flex-1 min-h-[280px] bg-plum-tint rounded-3xl p-8 md:p-10 flex flex-col justify-between group cursor-pointer hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)] transition-all duration-500 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/10 group-hover:bg-plum/20 backdrop-blur-sm rounded-full border border-black/20 group-hover:border-plum/30 transition-colors">
                <span className="text-[8px] font-bold uppercase tracking-widest text-black group-hover:text-plum transition-colors">
                  Q2 2026
                </span>
              </div>

              <Lightning
                weight="duotone"
                size={48}
                className="text-black group-hover:text-plum transition-colors"
              />
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold italic leading-none mb-2">
                  School of Destiny
                </h3>
                <p className="text-sm opacity-60 font-light mb-4 text-black group-hover:text-[var(--color-text-secondary)] transition-colors">
                  Enrichment program empowering Canadian youth for marketplace excellence.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/60 group-hover:text-plum transition-colors">
                  <span>Explore</span>
                  <ArrowUpRight weight="bold" className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Far Right Stacks */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col gap-4 md:gap-6">
            {/* Watch Online */}
            <Link
              href="/watch/north-america"
              className="md:flex-1 min-h-[280px] bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-xl border border-[var(--color-border)] hover:border-plum/40 hover:text-plum-tint transition-all duration-500"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="flex items-center justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-plum/10 flex items-center justify-center">
                  <PlayCircle weight="fill" size={32} className="text-plum-tint" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--color-text-muted)]">
                  Live
                </span>
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold italic mb-3 leading-none">
                  Watch Online
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] font-light mb-6">
                  Catch the latest messages, worship, and special gatherings.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                  <span>Go to Watch</span>
                  <ArrowUpRight weight="bold" className="w-3 h-3" />
                </div>
              </div>
            </Link>

            {/* The Expression */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="md:flex-1 min-h-[280px] relative rounded-3xl overflow-hidden group shadow-xl"
            >
              <ParallaxImage
                src="/yaf-canada/worship-leader-singing.webp"
                alt="Worship Expression"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <span className="text-white font-display text-3xl font-bold italic">
                  The Expression
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
