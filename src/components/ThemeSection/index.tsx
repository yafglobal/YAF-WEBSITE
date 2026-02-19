"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
  Eye,
  Trophy,
  Key,
  Crosshair,
  CheckCircle,
  GlobeHemisphereWest,
  MapPin,
  BookOpenText,
  Hammer,
  ShieldCheck,
} from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import { theme2026, youthThemes2025 } from "./themeData";

const ThemeSection = () => {
  const [activeTab, setActiveTab] = useState<"2026" | "2025">("2026");
  const [activeRegion, setActiveRegion] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for 3D effect
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => setIsImageHovered(true);
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsImageHovered(false);
  };

  const currentYouthTheme = youthThemes2025[activeRegion];

  return (
    <section id="themes" className="py-12 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-8 sm:mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 sm:px-6 py-2 sm:py-3 bg-[var(--glass-bg)] backdrop-blur-sm text-[var(--color-text-primary)] rounded-full font-semibold text-base sm:text-lg shadow-lg border border-[var(--color-border-medium)]">
              Prophetic Themes &amp; Focus
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-4 sm:mb-6 leading-tight pb-3">
            <span className="block">Divine</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-plum-tint to-plum-cream">
              Direction
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Discover God&apos;s prophetic word for each season as we align with His divine purposes.
            Explore our yearly themes that guide our spiritual journey.
          </p>
        </ScrollReveal>

        {/* Tab Navigation */}
        <ScrollReveal delay={0.2} className="flex justify-center mb-6 sm:mb-12 px-4 sm:px-0">
          <div className="bg-[var(--glass-bg)] backdrop-blur-md rounded-2xl p-1.5 sm:p-2 shadow-lg border border-[var(--color-border-medium)] max-w-full">
            <div className="flex">
              {[
                { id: "2026", label: "2026 Church Theme", mobileLabel: "2026 Theme" },
                { id: "2025", label: "2025 Youth Themes", mobileLabel: "2025 Youth" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "2026" | "2025")}
                  className={cn(
                    "px-3 sm:px-8 py-2.5 sm:py-4 rounded-xl font-semibold text-xs sm:text-lg transition-all duration-300 cursor-pointer whitespace-nowrap",
                    activeTab === tab.id
                      ? "bg-plum text-white shadow-md"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
                  )}
                >
                  <span className="sm:hidden">{tab.mobileLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "2026" && (
            <motion.div
              key="2026"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 sm:space-y-12"
            >
              {/* Hero Row — Title + Image */}
              <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10 items-center">
                {/* Left — Large Typography */}
                <div className="text-center lg:text-left order-2 lg:order-1">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4"
                  >
                    <span className="text-8xl sm:text-9xl lg:text-[10rem] font-black text-[var(--color-text-primary)] opacity-20 leading-none select-none">
                      2026
                    </span>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-plum-tint to-plum-cream -mt-12 sm:-mt-16 lg:-mt-20 relative z-10"
                  >
                    {theme2026.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="inline-block mt-3 px-4 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm font-medium"
                  >
                    <GlobeHemisphereWest
                      size={14}
                      weight="fill"
                      className="inline mr-1.5 -mt-0.5"
                    />
                    {theme2026.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-base sm:text-lg text-[var(--color-text-secondary)] mt-4 leading-relaxed max-w-md mx-auto lg:mx-0"
                  >
                    {theme2026.description}
                  </motion.p>
                </div>

                {/* Right — Hero Image with Scripture Overlay */}
                <motion.div
                  ref={cardRef}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative order-1 lg:order-2 cursor-pointer"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ perspective: "1000px" }}
                >
                  <motion.div
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform-gpu"
                    style={{
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <Image
                      src={theme2026.image}
                      alt={theme2026.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover object-[center_20%]"
                      priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Animated shine */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Scripture Overlay — appears on hover */}
                    <AnimatePresence>
                      {isImageHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent"
                        >
                          <blockquote className="text-white/90 text-xs sm:text-sm lg:text-base italic leading-relaxed">
                            &ldquo;{theme2026.verse}&rdquo;
                          </blockquote>
                          <cite className="block mt-2 text-plum-tint font-semibold text-sm not-italic">
                            {theme2026.reference}
                          </cite>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom Section — Glowing Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                {/* Expectation Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="md:col-span-5"
                >
                  <div className="relative h-full rounded-[2rem] bg-[var(--color-surface)] p-8 sm:p-10 overflow-hidden shadow-sm border border-[var(--color-border)] group">
                    <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-plum/15 via-plum/8 to-transparent rounded-full blur-3xl translate-x-8 -translate-y-8 opacity-80" />

                    <div className="absolute top-6 right-6 w-12 h-12 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-full flex items-center justify-center">
                      <Eye size={20} weight="fill" className="text-[var(--color-text-primary)]" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                      <div>
                        <h4 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-4">
                          Covenant
                          <br />
                          <span className="text-plum">Mentality</span>
                        </h4>
                        <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed max-w-[280px]">
                          Approach 2026 seeing &ldquo;open doors&rdquo; as a divine verdict
                          requiring faith and obedience.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Highlights Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="md:col-span-3 md:row-span-2"
                >
                  <div className="relative h-full rounded-[2rem] bg-[var(--color-surface)] p-8 overflow-hidden shadow-sm border border-[var(--color-border)] group">
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-plum-tint/10 via-plum/5 to-transparent rounded-full blur-3xl -translate-x-8 translate-y-8 opacity-90" />

                    <div className="absolute top-6 right-6 w-12 h-12 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-full flex items-center justify-center">
                      <Crosshair
                        size={20}
                        weight="fill"
                        className="text-[var(--color-text-primary)]"
                      />
                    </div>

                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-6">
                        Key
                        <br />
                        <span className="text-plum">Highlights</span>
                      </h4>

                      <div className="space-y-3">
                        {theme2026.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 text-[var(--color-text-secondary)]"
                          >
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full shrink-0",
                                index < 2 ? "bg-plum" : "bg-[var(--color-border-medium)]"
                              )}
                            />
                            <span
                              className={cn(
                                "text-sm",
                                index < 2
                                  ? "text-[var(--color-text-primary)] font-medium"
                                  : "text-[var(--color-text-secondary)]"
                              )}
                            >
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Requirements Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="md:col-span-4 md:row-span-2"
                >
                  <div className="relative h-full rounded-3xl border border-plum/30 p-1.5 overflow-hidden group shadow-2xl shadow-plum/10">
                    <GlowingEffect
                      spread={60}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                      variant="plum"
                    />
                    <div className="relative h-full flex flex-col rounded-[1.4rem] bg-gradient-to-br from-plum via-plum-dark to-[#3D0A29] p-6 sm:p-8 text-white overflow-hidden">
                      {/* Decorative pattern */}
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Key size={128} weight="fill" className="rotate-12" />
                      </div>

                      <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                        <Key size={24} weight="fill" className="text-white" />
                      </div>

                      <h4 className="text-2xl font-bold mb-6 tracking-tight leading-tight">
                        Keys to Keep <br />
                        Doors Open
                      </h4>

                      <div className="space-y-4 flex-1">
                        {theme2026.requirements.items.map((item, index) => (
                          <div
                            key={index}
                            className="group/item relative flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 transition-all"
                          >
                            <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-sm font-black">
                              0{index + 1}
                            </span>
                            <span className="font-semibold text-sm sm:text-base leading-snug">
                              {item}
                            </span>
                            <CheckCircle
                              size={20}
                              weight="fill"
                              className="absolute right-4 opacity-0 group-hover/item:opacity-30 transition-opacity"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-white/60 text-xs uppercase tracking-widest font-bold">
                          Revelation 3:7-8
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="md:col-span-5"
                >
                  <div className="relative h-full rounded-[2rem] bg-[var(--color-surface)] p-8 sm:p-10 overflow-hidden shadow-sm border border-[var(--color-border)] group">
                    <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-plum-tint/15 via-plum-tint/8 to-transparent rounded-full blur-3xl translate-x-8 translate-y-8 opacity-80" />

                    <div className="absolute top-6 right-6 w-12 h-12 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-full flex items-center justify-center">
                      <Trophy
                        size={20}
                        weight="fill"
                        className="text-[var(--color-text-primary)]"
                      />
                    </div>

                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                      <div>
                        <h4 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-4">
                          Visible
                          <br />
                          <span className="text-plum-tint">Testimonies</span>
                        </h4>
                        <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed max-w-[280px]">
                          God answers with manifest proofs of access, promotion, and supernatural
                          lifting.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "2025" && (
            <motion.div
              key="2025"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 sm:space-y-10"
            >
              {/* Region Selector — Pill Toggle */}
              <div className="flex justify-center overflow-x-auto community-nav-scroll px-4 sm:px-0">
                <div className="bg-[var(--glass-bg)] backdrop-blur-md rounded-2xl p-1.5 shadow-lg border border-[var(--color-border-medium)] inline-flex">
                  {youthThemes2025.map((theme, index) => (
                    <button
                      key={theme.region}
                      onClick={() => setActiveRegion(index)}
                      className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-7 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-base cursor-pointer whitespace-nowrap"
                    >
                      {activeRegion === index && (
                        <motion.div
                          layoutId="regionPill"
                          className="absolute inset-0 rounded-xl bg-plum shadow-md"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                      <MapPin
                        size={16}
                        weight={activeRegion === index ? "fill" : "regular"}
                        className={cn(
                          "relative z-10 transition-colors duration-300",
                          activeRegion === index ? "text-white" : "text-[var(--color-text-muted)]"
                        )}
                      />
                      <span
                        className={cn(
                          "relative z-10 transition-colors duration-300",
                          activeRegion === index
                            ? "text-white"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                        )}
                      >
                        {theme.region}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bento Theme Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentYouthTheme.region}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Row 1: Hero image + Title card */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                    {/* Theme Image — spans 7 cols, natural aspect ratio */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="md:col-span-7"
                    >
                      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-[var(--color-border)] group">
                        <div
                          className="relative w-full"
                          style={{
                            aspectRatio: currentYouthTheme.imageAspect,
                          }}
                        >
                          <Image
                            src={currentYouthTheme.image}
                            alt={currentYouthTheme.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 58vw"
                            className="object-contain"
                          />
                        </div>

                        {/* Animated shine */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 5,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Title + Description card — spans 5 cols */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="md:col-span-5"
                    >
                      <div className="relative h-full rounded-[2rem] bg-[var(--color-surface)] p-8 sm:p-10 overflow-hidden border border-[var(--color-border)] flex flex-col justify-center">
                        {/* Gradient blob */}
                        <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-plum/12 via-plum-tint/8 to-transparent rounded-full blur-3xl translate-x-8 -translate-y-8 opacity-80" />

                        <div className="relative z-10 space-y-5">
                          {/* Region badge */}
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-plum/10 border border-plum/20 text-sm font-medium text-plum-tint">
                            <span className="text-base">{currentYouthTheme.flag}</span>
                            {currentYouthTheme.subtitle}
                          </div>

                          {/* Big year watermark + title */}
                          <div>
                            <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-[var(--color-text-primary)] opacity-10 leading-none select-none block">
                              2025
                            </span>
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-plum-tint to-plum-cream -mt-6 sm:-mt-8 relative z-10">
                              {currentYouthTheme.title}
                            </h3>
                          </div>

                          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                            {currentYouthTheme.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Row 2: Pillar cards + Scripture card + Highlights card */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                    {/* Pillar 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="md:col-span-4"
                    >
                      <div className="relative h-full rounded-[2rem] bg-[var(--color-surface)] p-7 sm:p-8 overflow-hidden shadow-sm border border-[var(--color-border)] group">
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-plum/10 via-transparent to-transparent rounded-full blur-3xl -translate-x-4 translate-y-4 opacity-80" />

                        <div className="absolute top-6 right-6 w-10 h-10 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-full flex items-center justify-center">
                          <Hammer
                            size={18}
                            weight="fill"
                            className="text-[var(--color-text-primary)]"
                          />
                        </div>

                        <div className="relative z-10">
                          <h4 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-3">
                            {currentYouthTheme.pillars[0].title}
                            <br />
                            <span className="text-plum">{currentYouthTheme.pillars[0].accent}</span>
                          </h4>
                          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                            {currentYouthTheme.pillars[0].body}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Scripture Card — glowing accent */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="md:col-span-4"
                    >
                      <div className="relative h-full rounded-3xl border border-plum/30 p-1.5 overflow-hidden group shadow-2xl shadow-plum/10">
                        <GlowingEffect
                          spread={60}
                          glow={true}
                          disabled={false}
                          proximity={64}
                          inactiveZone={0.01}
                          borderWidth={2}
                          variant="plum"
                        />
                        <div className="relative h-full flex flex-col rounded-[1.4rem] bg-gradient-to-br from-plum via-plum-dark to-[#3D0A29] p-6 sm:p-8 text-white overflow-hidden">
                          {/* Decorative icon */}
                          <div className="absolute top-0 right-0 p-6 opacity-10">
                            <BookOpenText size={96} weight="fill" className="rotate-6" />
                          </div>

                          <div className="w-10 h-10 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
                            <BookOpenText size={20} weight="fill" className="text-white" />
                          </div>

                          <blockquote className="text-white/90 text-sm sm:text-base italic leading-relaxed flex-1">
                            &ldquo;{currentYouthTheme.verse}&rdquo;
                          </blockquote>

                          <div className="mt-6 pt-4 border-t border-white/10">
                            <p className="text-white/60 text-xs uppercase tracking-widest font-bold">
                              {currentYouthTheme.reference}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Pillar 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="md:col-span-4"
                    >
                      <div className="relative h-full rounded-[2rem] bg-[var(--color-surface)] p-7 sm:p-8 overflow-hidden shadow-sm border border-[var(--color-border)] group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-plum-tint/10 via-transparent to-transparent rounded-full blur-3xl translate-x-4 -translate-y-4 opacity-80" />

                        <div className="absolute top-6 right-6 w-10 h-10 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-full flex items-center justify-center">
                          <ShieldCheck
                            size={18}
                            weight="fill"
                            className="text-[var(--color-text-primary)]"
                          />
                        </div>

                        <div className="relative z-10">
                          <h4 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-3">
                            {currentYouthTheme.pillars[1].title}
                            <br />
                            <span className="text-plum-tint">
                              {currentYouthTheme.pillars[1].accent}
                            </span>
                          </h4>
                          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                            {currentYouthTheme.pillars[1].body}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Row 3: Highlights + Mission */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
                    {/* Highlights Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="md:col-span-5"
                    >
                      <div className="relative h-full rounded-[2rem] bg-[var(--color-surface)] p-7 sm:p-8 overflow-hidden shadow-sm border border-[var(--color-border)]">
                        <div className="absolute top-6 right-6 w-10 h-10 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-full flex items-center justify-center">
                          <Crosshair
                            size={18}
                            weight="fill"
                            className="text-[var(--color-text-primary)]"
                          />
                        </div>

                        <div className="relative z-10">
                          <h4 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-5">
                            Key
                            <br />
                            <span className="text-plum">Highlights</span>
                          </h4>

                          <div className="grid grid-cols-2 gap-2.5">
                            {currentYouthTheme.highlights.map((highlight, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[var(--glass-bg)] border border-[var(--color-border)]"
                              >
                                <div
                                  className={cn(
                                    "w-2 h-2 rounded-full shrink-0",
                                    index < 2 ? "bg-plum" : "bg-plum-tint/50"
                                  )}
                                />
                                <span className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)]">
                                  {highlight}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                      className="md:col-span-7"
                    >
                      <div className="relative h-full rounded-[2rem] bg-[var(--color-surface)] p-7 sm:p-8 overflow-hidden shadow-sm border border-[var(--color-border)]">
                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-plum-tint/8 via-transparent to-transparent rounded-full blur-3xl translate-x-6 translate-y-6 opacity-80" />

                        <div className="absolute top-6 right-6 w-10 h-10 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded-full flex items-center justify-center">
                          <Trophy
                            size={18}
                            weight="fill"
                            className="text-[var(--color-text-primary)]"
                          />
                        </div>

                        <div className="relative z-10">
                          <h4 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight mb-3">
                            The
                            <br />
                            <span className="text-plum-tint">Mission</span>
                          </h4>
                          <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed">
                            {currentYouthTheme.mission}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ThemeSection;
