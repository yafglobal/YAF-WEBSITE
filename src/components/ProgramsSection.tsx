"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Cross,
  GraduationCap,
  Heartbeat,
  MusicNote,
  YoutubeLogo,
  ArrowRight,
} from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const programs = [
  {
    icon: Cross,
    title: "Faith & Spirituality",
    description:
      "Deepening your walk with God through powerful teachings, prayer gatherings, and spirit-filled encounters that transform lives.",
    accent: "from-fire to-fire-light",
    image: "/images/slider-1.jpeg",
  },
  {
    icon: GraduationCap,
    title: "Career & Education",
    description:
      "Workshops, job fairs, mentorship programmes, and professional networking to accelerate your career growth.",
    accent: "from-gold to-gold-dim",
    image: "/images/slider-3.jpeg",
  },
  {
    icon: Heartbeat,
    title: "Holistic Development",
    description:
      "Empowering you to live a balanced and triumphant life — mind, body, and spirit — as desired for you by God.",
    accent: "from-fire-light to-gold",
    image: "/images/slider-5.jpeg",
  },
  {
    icon: MusicNote,
    title: "Praise & Worship",
    description:
      "An hour of praise, thanksgiving and wonders. Experience worship that shifts atmospheres and ignites faith.",
    accent: "from-gold-dim to-fire",
    image: "/images/slider-4.jpeg",
  },
];

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);

  return (
    <section
      id="sermons"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-fire/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 items-end mb-20">
          <div>
            <ScrollReveal>
              <p className="text-fire font-display text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Our Programmes
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Our focus is on{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-fire to-fire-light">
                  YOU
                </span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
              With programmes targeted at your faith, your career, and your
              overall development. We don&apos;t deal with mediocrity — we&apos;re
              here to empower you to have a triumphant life.
            </p>
          </ScrollReveal>
        </div>

        {/* Animated divider line */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-px bg-gradient-to-r from-fire via-gold to-transparent mb-16"
        />

        {/* Programs - Interactive accordion/reveal */}
        <div className="space-y-2">
          {programs.map((prog, i) => (
            <ScrollReveal key={prog.title} delay={0.1 * i}>
              <motion.div
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] hover:border-fire/20 transition-all duration-500 cursor-pointer"
              >
                {/* Background image that reveals on hover */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-[var(--color-background)]/80 backdrop-blur-sm" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex items-center gap-4 md:gap-10 p-4 md:p-8">
                  {/* Number */}
                  <span className="hidden md:block font-display font-bold text-3xl text-[var(--color-border-hover)] group-hover:text-fire/30 transition-colors w-12">
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <div
                    className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <prog.icon size={24} className="text-white" weight="fill" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--color-text-primary)]">
                      {prog.title}
                    </h3>
                    <motion.p
                      initial={false}
                      animate={{
                        height: hoveredIndex === i ? "auto" : 0,
                        opacity: hoveredIndex === i ? 1 : 0,
                        marginTop: hoveredIndex === i ? 8 : 0,
                      }}
                      className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed max-w-2xl overflow-hidden"
                    >
                      {prog.description}
                    </motion.p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={24}
                    className="shrink-0 text-[var(--color-text-muted)] group-hover:text-fire group-hover:translate-x-1 transition-all duration-300"
                    weight="bold"
                  />
                </div>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${prog.accent} origin-left`}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* YouTube CTA */}
        <ScrollReveal delay={0.5}>
          <div className="mt-16 flex flex-col md:flex-row items-center gap-5 md:gap-8 p-5 md:p-10 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <Image
              src="/images/sermon-image.png"
              alt="Youth Alive Music"
              width={120}
              height={120}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)]">
                Listen & Be Inspired
              </h3>
              <p className="mt-1 text-[var(--color-text-secondary)] text-sm leading-relaxed">
                Access powerful sermons, worship sessions, and teachings that
                will ignite your faith and fuel your purpose.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@youthaliveglobal?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-fire text-white font-display font-semibold text-xs md:text-sm rounded-full hover:bg-fire-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,77,0,0.3)] group w-full md:w-auto justify-center"
            >
              <YoutubeLogo size={20} weight="fill" />
              Watch on YouTube
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
