"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Fire, MapPin, Compass } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

const milestones = [
  {
    year: "1981",
    label: "The Foundation",
    desc: "Living Faith Church founded by Bishop David Oyedepo",
  },
  {
    year: "2000s",
    label: "Youth Ignition",
    desc: "Youth Alive Fellowship launched across Nigeria",
  },
  {
    year: "Today",
    label: "Global Movement",
    desc: "Thousands of youth ablaze across multiple continents",
  },
];

export default function AfricaGenesis() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const smoothY = useSpring(imageY, { stiffness: 100, damping: 30 });

  return (
    <section className="relative py-24 md:py-44 overflow-hidden">
      {/* Ghost text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[22vw] font-display font-extrabold italic text-[var(--color-foreground)] opacity-[0.02] whitespace-nowrap tracking-tight leading-none">
          GENESIS
        </span>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-plum/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-10">
        {/* Main editorial spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image — dramatic oversized portrait */}
          <div ref={imageRef} className="lg:col-span-7 relative">
            <ScrollReveal direction="left">
              <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <motion.div style={{ y: smoothY }} className="absolute inset-0 h-[124%] -top-[12%]">
                  <Image
                    src="/images/slider-3.jpeg"
                    alt="Youth Alive conference at Canaanland"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </motion.div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                {/* Bottom badge inside image */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3 text-white/90">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 backdrop-blur-sm flex items-center justify-center border border-amber-500/30">
                      <Fire weight="fill" className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-300/80">
                        Headquarters
                      </p>
                      <p className="text-sm font-bold">Canaanland, Ota, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Floating accent image — layered behind main, offset */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:block absolute -bottom-12 -right-8 w-52 h-52 rounded-2xl overflow-hidden shadow-xl z-[-1] border-2 border-[var(--color-surface)]"
            >
              <Image
                src="/images/slider-1.jpeg"
                alt="Youth worship at Canaanland"
                fill
                className="object-cover"
                sizes="208px"
              />
            </motion.div>
          </div>

          {/* Text content — editorial right panel */}
          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-amber-500" />
                <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px]">
                  The Beginning
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.9] tracking-tight">
                Where It
                <br />
                <span className="italic text-amber-500">All Began</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-md">
                From the sacred grounds of Canaanland in Ota, Nigeria, a fire was ignited that would
                spread across the world. Youth Alive Africa is the birthplace of this global
                movement — where thousands gather every week with an unquenchable passion for God
                and purpose.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="h-px w-full bg-[var(--color-border)]" />
            </ScrollReveal>

            {/* Feature cards */}
            <ScrollReveal delay={0.5}>
              <div className="flex flex-col gap-4">
                <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-start gap-4">
                  <div className="mt-1 p-2.5 rounded-xl bg-amber-500/10">
                    <MapPin weight="fill" className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)] text-sm">
                      Global Youth Headquarters
                    </h4>
                    <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">
                      Living Faith Church, Canaanland, Ota, Ogun State, Nigeria
                    </p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-start gap-4">
                  <div className="mt-1 p-2.5 rounded-xl bg-amber-500/10">
                    <Compass weight="fill" className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-text-primary)] text-sm">
                      The Vision
                    </h4>
                    <p className="text-[var(--color-text-muted)] text-xs mt-1 leading-relaxed">
                      Raising a generation of kingdom giants who dominate in every sphere of life
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Milestone ribbon */}
        <div className="mt-24 md:mt-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={0.1 * i}>
                <div
                  className={`relative p-8 md:p-10 group ${
                    i < milestones.length - 1
                      ? "md:border-r border-b md:border-b-0 border-[var(--color-border)]"
                      : ""
                  }`}
                >
                  <span className="text-4xl md:text-5xl font-display font-extrabold text-amber-500/20 group-hover:text-amber-500/40 transition-colors duration-500">
                    {m.year}
                  </span>
                  <h4 className="mt-4 font-display font-bold text-lg text-[var(--color-text-primary)]">
                    {m.label}
                  </h4>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
