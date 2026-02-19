"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Briefcase,
  Handshake,
  ChalkboardTeacher,
  Trophy,
  ArrowRight,
  Users,
  Lightbulb,
  Rocket,
} from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

const features = [
  {
    icon: Handshake,
    title: "Connect",
    desc: "Network with vision-driven professionals across the globe. Build relationships that fuel your purpose and open doors to new possibilities.",
  },
  {
    icon: Briefcase,
    title: "Job Fairs",
    desc: "Access curated career opportunities, employer meet-and-greets, and professional guidance tailored to young professionals.",
  },
  {
    icon: ChalkboardTeacher,
    title: "Workshops",
    desc: "Attend skill-building workshops led by industry experts and mentors who are invested in your growth.",
  },
  {
    icon: Trophy,
    title: "Brand Building",
    desc: "Showcase your brand, pitch your business, and gain exposure within a supportive community of peers and mentors.",
  },
];

const pillars = [
  {
    icon: Users,
    title: "Mentorship",
    desc: "Access seasoned professionals who guide your career journey with wisdom and real-world experience.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Collaborate on projects that push boundaries and bring fresh solutions to the marketplace.",
  },
  {
    icon: Rocket,
    title: "Growth",
    desc: "Accelerate your personal and professional development through structured programs and resources.",
  },
];

export default function CommunityPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.75]);

  return (
    <section className="relative">
      {/* Hero with parallax community image */}
      <div ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 -inset-y-[30%]">
          <Image
            src="/images/community-bg.jpg"
            alt="Youth Alive Professional Community"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[var(--color-background)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)]" />

        {/* Hero content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-surface)]/50 border border-[var(--color-border)] mb-8">
                <Image
                  src="/images/yaf-pc.svg"
                  alt="YAF Professional Community"
                  width={40}
                  height={40}
                  className="brightness-200"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold mb-6">
                YAF Professional Community
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[var(--color-text-primary)]">
                Where Purpose Meets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-light to-plum-tint">
                  Profession
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="mt-8 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Connect with vision-driven individuals, participate in job fairs, attend workshops,
                and access invaluable resources to accelerate your professional life — all within a
                faith-driven community.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 mt-10 px-8 py-4 bg-plum text-white font-display font-semibold text-sm tracking-wide uppercase rounded-full hover:bg-plum-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(134,22,87,0.4)] group"
              >
                Get Involved
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* What We Offer — feature cards */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-plum/5 rounded-full blur-[150px] pointer-events-none" />

        <ScrollReveal>
          <p className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4 text-center">
            What We Offer
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.1] tracking-tight text-[var(--color-text-primary)] text-center mb-16">
            Everything you need to thrive
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {features.map((feat, i) => (
            <ScrollReveal key={feat.title} delay={0.15 + i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-6 md:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:border-plum/20 hover:bg-[var(--color-surface-hover)] transition-colors duration-300 group h-full"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-plum/10 border border-plum/15 mb-5 group-hover:bg-plum/20 group-hover:border-plum/30 transition-all duration-300">
                  <feat.icon
                    size={24}
                    className="text-plum group-hover:text-plum-light transition-colors"
                    weight="duotone"
                  />
                </div>
                <h3 className="font-display font-bold text-[var(--color-text-primary)] text-lg mb-2">
                  {feat.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Pillars section */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-plum-tint/5 rounded-full blur-[120px] pointer-events-none" />

        <ScrollReveal>
          <p className="text-plum font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4 text-center">
            Our Pillars
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl leading-[1.1] tracking-tight text-[var(--color-text-primary)] text-center mb-16">
            Built on what matters
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={0.15 + i * 0.1}>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-5 group-hover:border-plum/20 group-hover:bg-plum/5 transition-all duration-300">
                  <pillar.icon size={24} className="text-plum" weight="duotone" />
                </div>
                <h3 className="font-display font-bold text-[var(--color-text-primary)] text-base mb-2">
                  {pillar.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 pb-24 md:pb-32">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.1] tracking-tight text-[var(--color-text-primary)] mb-6">
              Ready to join the community?
            </h2>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed mb-10">
              Take the next step in your professional journey. Connect with mentors, discover
              opportunities, and grow alongside purpose-driven individuals worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-plum text-white font-display font-semibold text-sm tracking-wide uppercase rounded-full hover:bg-plum-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(134,22,87,0.4)] group"
              >
                Get in Touch
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-display font-semibold text-sm tracking-wide uppercase rounded-full hover:bg-[var(--color-surface-hover)] hover:border-plum/30 transition-all duration-300"
              >
                Learn About Us
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
