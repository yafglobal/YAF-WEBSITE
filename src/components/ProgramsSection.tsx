"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Cross,
  GraduationCap,
  Heartbeat,
  MusicNote,
  YoutubeLogo,
} from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const programs = [
  {
    icon: Cross,
    title: "Faith & Spirituality",
    description: "Deepening your walk with God through powerful teachings and prayer",
    color: "from-fire to-fire-light",
  },
  {
    icon: GraduationCap,
    title: "Career & Education",
    description: "Workshops, job fairs, and mentorship for professional growth",
    color: "from-gold to-gold-dim",
  },
  {
    icon: Heartbeat,
    title: "Holistic Development",
    description: "Empowering you to live a balanced and triumphant life",
    color: "from-fire-light to-gold",
  },
  {
    icon: MusicNote,
    title: "Praise & Worship",
    description: "An hour of praise, thanksgiving and wonders that transforms lives",
    color: "from-gold-dim to-fire",
  },
];

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sermonY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

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
        <div className="max-w-3xl">
          <ScrollReveal>
            <p className="text-fire font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4">
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

          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-ash text-base md:text-lg leading-relaxed max-w-2xl">
              With programmes targeted at your faith, your career, and your
              overall development. We don&apos;t deal with mediocrity. We&apos;re
              here to empower you to have a triumphant life as desired for you by
              God.
            </p>
          </ScrollReveal>
        </div>

        {/* Programs - asymmetric layout */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {/* Left column: 2 stacked cards */}
          <div className="flex flex-col gap-6">
            {programs.slice(0, 2).map((prog, i) => (
              <ScrollReveal key={prog.title} delay={0.2 + i * 0.1}>
                <div className="p-8 bg-charcoal-light border border-white/5 rounded-3xl hover:border-white/10 transition-all duration-500 group relative overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${prog.color} opacity-10 rounded-full blur-[60px]`}
                    />
                  </div>
                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${prog.color} mb-5`}
                    >
                      <prog.icon size={22} className="text-white" weight="fill" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">
                      {prog.title}
                    </h3>
                    <p className="mt-2 text-ash text-sm leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Middle: tall sermon/music card */}
          <ScrollReveal delay={0.3}>
            <div className="h-full p-8 bg-charcoal-light border border-white/5 rounded-3xl hover:border-fire/15 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-fire/5 to-transparent" />
              </div>
              <div className="relative z-10">
                <motion.div style={{ y: sermonY }}>
                  <Image
                    src="/images/sermon-image.png"
                    alt="Youth Alive Music"
                    width={120}
                    height={120}
                    className="w-20 h-20 rounded-2xl mb-6 shadow-lg"
                  />
                </motion.div>
                <h3 className="font-display font-bold text-xl text-white">
                  Listen & Be Inspired
                </h3>
                <p className="mt-2 text-ash text-sm leading-relaxed">
                  Access powerful sermons, worship sessions, and teachings that
                  will ignite your faith and fuel your purpose.
                </p>
              </div>
              <a
                href="https://www.youtube.com/@YouthAliveGlobal"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 mt-8 inline-flex items-center gap-2 px-6 py-3 bg-fire/10 border border-fire/20 text-fire font-display font-semibold text-sm rounded-xl hover:bg-fire/20 transition-all duration-300 group/btn w-fit"
              >
                <YoutubeLogo size={18} weight="fill" />
                Watch on YouTube
                <span className="inline-block transition-transform group-hover/btn:translate-x-1">
                  &rarr;
                </span>
              </a>
            </div>
          </ScrollReveal>

          {/* Right column: 2 stacked cards */}
          <div className="flex flex-col gap-6">
            {programs.slice(2, 4).map((prog, i) => (
              <ScrollReveal key={prog.title} delay={0.4 + i * 0.1}>
                <div className="p-8 bg-charcoal-light border border-white/5 rounded-3xl hover:border-white/10 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${prog.color} opacity-10 rounded-full blur-[60px]`}
                    />
                  </div>
                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${prog.color} mb-5`}
                    >
                      <prog.icon size={22} className="text-white" weight="fill" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white">
                      {prog.title}
                    </h3>
                    <p className="mt-2 text-ash text-sm leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
