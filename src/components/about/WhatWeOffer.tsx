"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Cross,
  Briefcase,
  MusicNote,
  BookOpen,
  Sparkle,
  Handshake,
} from "@phosphor-icons/react";
import ScrollReveal from "../ScrollReveal";

const offerings = [
  {
    id: "spiritual",
    number: "01",
    title: "Spiritual Edification",
    subtitle: "Rooted in the Word",
    description:
      "Encounter the depths of God's word through powerful sermons, Bible study sessions, and life-transforming altar calls. Build an unshakeable foundation of faith.",
    icon: Cross,
    color: "from-fire to-fire-light",
    glowColor: "rgba(255, 77, 0, 0.15)",
  },
  {
    id: "career",
    number: "02",
    title: "Career Advancement",
    subtitle: "Excel in Your Field",
    description:
      "Job fairs, workshops, mentorship programs, and networking opportunities designed to launch and accelerate your career. Be a kingdom giant in your industry.",
    icon: Briefcase,
    color: "from-gold to-gold-dim",
    glowColor: "rgba(255, 215, 0, 0.12)",
  },
  {
    id: "worship",
    number: "03",
    title: "Praise & Worship",
    subtitle: "Enter His Presence",
    description:
      "Experience electrifying worship that sets your spirit ablaze. Our praise sessions are designed to usher you into a deeper, more intimate encounter with God.",
    icon: MusicNote,
    color: "from-fire via-fire-light to-gold",
    glowColor: "rgba(255, 107, 43, 0.12)",
  },
  {
    id: "development",
    number: "04",
    title: "Holistic Development",
    subtitle: "Grow Every Dimension",
    description:
      "From leadership training to health awareness, creative arts to financial literacy — we invest in every dimension of your life to produce well-rounded kingdom ambassadors.",
    icon: BookOpen,
    color: "from-gold-dim to-fire",
    glowColor: "rgba(184, 150, 12, 0.12)",
  },
  {
    id: "community",
    number: "05",
    title: "Community & Fellowship",
    subtitle: "You Belong Here",
    description:
      "Build lifelong connections with fellow purpose-driven youth. Engage in events, retreats, and activities tailored to broaden your perspective and deepen friendships.",
    icon: Handshake,
    color: "from-fire-light to-gold",
    glowColor: "rgba(255, 107, 43, 0.12)",
  },
];

export default function WhatWeOffer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionScale = useTransform(scrollYProgress, [0, 0.2], [0.96, 1]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient" />

      <motion.div style={{ scale: sectionScale }} className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 mb-6">
              <Sparkle size={16} weight="fill" className="text-gold" />
              <span className="text-fire font-display text-xs tracking-[0.4em] uppercase font-semibold">
                What We Offer
              </span>
              <Sparkle size={16} weight="fill" className="text-gold" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Just For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold">
                You
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
              Events made to give you maximum exposure to the Word from the
              altar. Activities tailored to broaden your perspective and interact
              with fellow purpose-driven heirs of His kingdom.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive accordion */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Accordion list */}
          <div className="lg:col-span-5 space-y-2">
            {offerings.map((item, i) => {
              const isActive = activeIndex === i;
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.id} delay={0.1 * i}>
                  <motion.button
                    onClick={() => setActiveIndex(i)}
                    className={`w-full text-left p-5 md:p-6 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                      isActive
                        ? "bg-[var(--color-surface)]"
                        : "bg-transparent hover:bg-[var(--color-surface)]/50"
                    }`}
                    layout
                  >
                    {/* Active glow */}
                    {isActive && (
                      <motion.div
                        layoutId="offerGlow"
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `radial-gradient(ellipse at 0% 50%, ${item.glowColor}, transparent 70%)`,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    )}

                    {/* Active border */}
                    {isActive && (
                      <motion.div
                        layoutId="offerBorder"
                        className="absolute inset-0 rounded-2xl ring-1 ring-fire/20"
                        transition={{ duration: 0.4 }}
                      />
                    )}

                    <div className="relative flex items-start gap-4">
                      {/* Number */}
                      <span
                        className={`font-display text-sm font-bold mt-1 transition-colors duration-300 ${
                          isActive ? "text-fire" : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        {item.number}
                      </span>

                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? "bg-fire/10"
                                : "bg-[var(--color-surface)] group-hover:bg-fire/5"
                            }`}
                          >
                            <Icon
                              size={20}
                              weight="fill"
                              className={`transition-colors duration-300 ${
                                isActive
                                  ? "text-fire"
                                  : "text-[var(--color-text-secondary)]"
                              }`}
                            />
                          </div>
                          <h3
                            className={`font-display font-bold text-base md:text-lg transition-colors duration-300 ${
                              isActive
                                ? "text-[var(--color-text-primary)]"
                                : "text-[var(--color-text-secondary)]"
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="mt-3 text-[var(--color-text-secondary)] text-sm leading-relaxed pl-0 md:pl-[52px]">
                                {item.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right: Visual display */}
          <div className="lg:col-span-7 relative">
            <ScrollReveal delay={0.3} direction="right">
              <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--color-surface)]">
                {/* Dynamic gradient background based on active item */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {/* Gradient mesh */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `
                          radial-gradient(ellipse at 30% 20%, ${offerings[activeIndex].glowColor} 0%, transparent 50%),
                          radial-gradient(ellipse at 70% 80%, rgba(255, 215, 0, 0.06) 0%, transparent 50%)
                        `,
                      }}
                    />

                    {/* Large icon centered */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {(() => {
                        const ActiveIcon = offerings[activeIndex].icon;
                        return (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 0.08, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                          >
                            <ActiveIcon size={280} weight="fill" className="text-fire" />
                          </motion.div>
                        );
                      })()}
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-16 text-center">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <span
                          className={`text-transparent bg-clip-text bg-gradient-to-r ${offerings[activeIndex].color} font-display text-xs tracking-[0.4em] uppercase font-semibold`}
                        >
                          {offerings[activeIndex].subtitle}
                        </span>
                      </motion.div>

                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4 font-display font-extrabold text-2xl md:text-5xl lg:text-6xl text-[var(--color-text-primary)] tracking-tight"
                      >
                        {offerings[activeIndex].title}
                      </motion.h3>

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-4 md:mt-6 text-[var(--color-text-secondary)] text-sm md:text-lg max-w-md leading-relaxed"
                      >
                        {offerings[activeIndex].description}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Border glow */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[var(--color-border)]" />
              </div>
            </ScrollReveal>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {offerings.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIndex === i
                      ? "w-8 bg-fire"
                      : "w-1.5 bg-[var(--color-border-hover)] hover:bg-fire/40"
                  }`}
                  aria-label={`View offering ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
