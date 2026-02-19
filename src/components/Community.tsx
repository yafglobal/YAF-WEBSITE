"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, Handshake, ChalkboardTeacher, Trophy } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Handshake,
    title: "Connect",
    desc: "Network with vision-driven individuals across the globe",
  },
  {
    icon: Briefcase,
    title: "Job Fairs",
    desc: "Access career opportunities and professional guidance",
  },
  {
    icon: ChalkboardTeacher,
    title: "Workshops",
    desc: "Attend skill-building workshops and mentorship sessions",
  },
  {
    icon: Trophy,
    title: "Brand Building",
    desc: "Stand a chance to showcase and sell your brand",
  },
];

export default function Community() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.5, 0.7]);

  return (
    <section id="community" ref={sectionRef} className="relative py-40 md:py-52 overflow-hidden">
      {/* Parallax background image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -inset-y-20">
        <Image
          src="/images/community-bg.jpg"
          alt="Professional Community"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[var(--color-background)]"
      />

      {/* Gradient overlays for seamless blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)]" />

      {/* Mesh glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-plum/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        {/* Icon */}
        <ScrollReveal>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-surface)]/50 border border-[var(--color-border)] mb-8">
            <Image
              src="/images/yaf-pc.svg"
              alt="YAF Professional Community"
              width={32}
              height={32}
              className="brightness-200"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight text-foreground max-w-4xl mx-auto">
            Connect with our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum to-plum-tint">
              Professional
            </span>{" "}
            Community
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-8 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Get more information from our community page, connect with vision-driven individuals to
            get inspired, participate in job fairs, attend workshops and so many more valuable
            resources to get you ahead in your professional life.
          </p>
        </ScrollReveal>

        {/* Feature grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
          {features.map((feat, i) => (
            <ScrollReveal key={feat.title} delay={0.3 + i * 0.1}>
              <div className="p-4 md:p-6 bg-[var(--color-surface)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-2xl hover:border-plum/20 hover:bg-[var(--color-surface)]/50 transition-all duration-300 group">
                <feat.icon
                  size={28}
                  className="text-plum mx-auto mb-3 group-hover:scale-110 transition-transform"
                  weight="duotone"
                />
                <p className="font-display font-bold text-foreground text-sm">{feat.title}</p>
                <p className="mt-1 text-ash text-xs leading-relaxed">{feat.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-12 px-6 py-3.5 md:px-10 md:py-4 bg-plum text-white font-display font-semibold text-xs md:text-sm tracking-wide uppercase rounded-full hover:bg-plum-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(134,22,87,0.4)] group text-center"
          >
            Explore our Professional Community
            <span className="inline-block transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
