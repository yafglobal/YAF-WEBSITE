"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Lightning,
  MicrophoneStage,
  BookOpen,
  Handshake,
} from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    icon: MicrophoneStage,
    title: "Praise Night",
    desc: "Monthly high-energy worship experiences that draw hundreds of young believers from across the DMV area.",
    tag: "Monthly",
  },
  {
    icon: BookOpen,
    title: "Word Sessions",
    desc: "Deep-dive Bible teaching and mentorship sessions equipping youth for marketplace impact and spiritual growth.",
    tag: "Weekly",
  },
  {
    icon: Handshake,
    title: "Community Impact",
    desc: "Community outreach initiatives and service projects that extend the love of Christ coast to coast across America.",
    tag: "Ongoing",
  },
];

export default function USAMovement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 via-transparent to-plum/5 pointer-events-none" />

      {/* Giant parallax text */}
      <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
        <motion.div style={{ y: textY }} className="w-full">
          <span className="block text-[28vw] font-display font-extrabold italic text-transparent leading-none whitespace-nowrap [-webkit-text-stroke:1px_rgba(239,68,68,0.08)]">
            ABLAZE
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — image + overlay */}
          <div className="relative">
            <ScrollReveal>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/usayaf/pastor-white-outfit-preaching.webp"
                    alt="Pastor preaching at YAF USA"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Overlay content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 backdrop-blur-sm flex items-center justify-center border border-red-500/30">
                      <Lightning weight="fill" className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-red-300/80">
                      Coast to Coast
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-extrabold italic text-white leading-none">
                    Ablaze in America
                  </h3>
                </div>
              </div>
            </ScrollReveal>

            {/* Floating accent image */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="hidden lg:block absolute -bottom-10 -right-10 w-44 h-44 rounded-2xl overflow-hidden shadow-xl border-2 border-[var(--color-surface)] z-10"
            >
              <Image
                src="/usayaf/leaders-standing-ovation.webp"
                alt="Leaders standing ovation"
                fill
                className="object-cover"
                sizes="176px"
              />
            </motion.div>
          </div>

          {/* Right — content cards */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <div className="mb-4">
                <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">
                  The Movement
                </span>
                <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tight">
                  More Than
                  <br />
                  <span className="italic text-red-500">A Service</span>
                </h2>
                <p className="mt-6 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-md font-light">
                  Youth Alive USA is transforming young lives from Bowie, Maryland to communities
                  nationwide — through faith-driven experiences that ignite purpose and power.
                </p>
              </div>
            </ScrollReveal>

            {/* Feature cards */}
            <div className="flex flex-col gap-4">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <ScrollReveal key={f.title} delay={0.1 + i * 0.1}>
                    <div className="group p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-red-500/30 transition-all duration-500 flex items-start gap-5">
                      <div className="mt-1 p-3 rounded-xl bg-red-500/10 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                        <Icon weight="duotone" size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display font-bold text-base text-[var(--color-text-primary)]">
                            {f.title}
                          </h4>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] bg-[var(--color-background)] px-2.5 py-1 rounded-full">
                            {f.tag}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* CTA */}
            <ScrollReveal delay={0.4}>
              <Link
                href="/watch/north-america"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-display font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 w-fit"
              >
                Watch YAF USA
                <ArrowUpRight
                  weight="bold"
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
