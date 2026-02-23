"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { HandsPraying, MusicNotes, Users, Megaphone } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

interface Expression {
  title: string;
  desc: string;
  image: string;
  icon: typeof HandsPraying;
  accent: string;
}

const expressions: Expression[] = [
  {
    title: "Worship",
    desc: "From intimate acoustic moments to full-band praise nights, European youth pour out their hearts in worship that transcends language and culture.",
    image: "/ukyaf/ayac-worship-vocalist.webp",
    icon: MusicNotes,
    accent: "text-violet-400",
  },
  {
    title: "Prayer",
    desc: "Prayer summits and intercession gatherings where young believers unite across borders, standing in the gap for their generation and nations.",
    image: "/ukyaf/ayac-prayer-moment.webp",
    icon: HandsPraying,
    accent: "text-amber-400",
  },
  {
    title: "Fellowship",
    desc: "True community that goes beyond Sunday — real friendships forged through shared faith, meals, conversations, and life together across cities.",
    image: "/ukyaf/joyful-praise-gathering.webp",
    icon: Users,
    accent: "text-emerald-400",
  },
  {
    title: "Outreach",
    desc: "Taking the fire beyond church walls — street evangelism, community service, and bold proclamation of the gospel across European cities.",
    image: "/ukyaf/ayac-praise-singer.webp",
    icon: Megaphone,
    accent: "text-rose-400",
  },
];

export default function EuropeExpressions() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % expressions.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const current = expressions[active];

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/[0.03] blur-[150px]" />
      </div>

      {/* Ghost text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[18vw] font-display font-extrabold italic text-[var(--color-foreground)] opacity-[0.02] whitespace-nowrap leading-none">
          UNITED
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="text-blue-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
              Many Voices, One Fire
            </span>
            <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
              Expressions of <span className="italic text-blue-400">Faith</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Main showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image side */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

            {/* Floating label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${active}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-8 left-8"
              >
                <span className="text-6xl md:text-7xl font-display font-extrabold italic text-white/20 leading-none">
                  {current.title}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content side */}
          <div className="flex flex-col gap-8">
            {/* Active expression detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${active}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-10 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl"
              >
                <div className={`p-3 rounded-2xl bg-blue-400/10 w-fit mb-6 ${current.accent}`}>
                  <current.icon weight="duotone" size={32} />
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--color-text-primary)] italic mb-4">
                  {current.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed font-light">
                  {current.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation tabs */}
            <div className="grid grid-cols-4 gap-3">
              {expressions.map((exp, i) => {
                const Icon = exp.icon;
                const isActive = i === active;
                return (
                  <button
                    key={exp.title}
                    onClick={() => setActive(i)}
                    className={`relative p-4 rounded-2xl text-center transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-blue-400/10 border-2 border-blue-400/40 shadow-lg"
                        : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-blue-400/20"
                    }`}
                  >
                    <Icon
                      weight={isActive ? "fill" : "regular"}
                      size={22}
                      className={`mx-auto mb-2 ${isActive ? "text-blue-400" : "text-[var(--color-text-muted)]"}`}
                    />
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${
                        isActive ? "text-blue-400" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {exp.title}
                    </span>

                    {/* Progress bar */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-400 rounded-b-2xl"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
