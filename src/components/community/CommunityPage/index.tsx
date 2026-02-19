"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";
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

const Grainient = dynamic(() => import("@/components/contact/Grainient"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#1a0a2e]" />,
});

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
  return (
    <section className="relative min-h-screen">
      {/* Grainient shader — fixed full-page background */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Grainient
          color1="#862256"
          color2="#FF4D00"
          color3="#2a0845"
          timeSpeed={0.15}
          warpStrength={0.8}
          warpFrequency={4.0}
          warpSpeed={1.5}
          warpAmplitude={60}
          rotationAmount={400}
          noiseScale={2.5}
          grainAmount={0.08}
          contrast={1.4}
          saturation={1.1}
          zoom={0.85}
          className="w-full h-full"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        {/* Hero section */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-16 md:pb-24">
          <div className="text-center max-w-3xl mx-auto">
            {/* YAF-PC Logo */}
            <ScrollReveal>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 mb-8">
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
              <p className="text-white/60 font-display text-xs tracking-[0.4em] uppercase font-semibold mb-6">
                YAF Professional Community
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white">
                Where Purpose Meets{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum-cream via-plum-tint to-[#FF8C42]">
                  Profession
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="mt-8 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Connect with vision-driven individuals, participate in job fairs, attend workshops,
                and access invaluable resources to accelerate your professional life — all within a
                faith-driven community.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 mt-10 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-display font-semibold text-sm tracking-wide uppercase rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
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

        {/* What We Offer — feature cards */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <ScrollReveal>
            <p className="text-white/50 font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4 text-center">
              What We Offer
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.1] tracking-tight text-white text-center mb-16">
              Everything you need to thrive
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {features.map((feat, i) => (
              <ScrollReveal key={feat.title} delay={0.15 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-6 md:p-8 bg-white/[0.07] backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/[0.12] hover:border-white/20 transition-colors duration-300 group h-full"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 mb-5 group-hover:bg-plum/20 group-hover:border-plum/30 transition-all duration-300">
                    <feat.icon
                      size={24}
                      className="text-plum-tint group-hover:text-plum-cream transition-colors"
                      weight="duotone"
                    />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{feat.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{feat.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Community image + pillars section */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="relative max-w-lg mx-auto lg:max-w-none">
                <div className="aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/community-bg.jpg"
                    alt="Youth Alive Professional Community"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                {/* Glow beneath image */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-plum/20 blur-[50px] rounded-full" />
              </div>
            </ScrollReveal>

            {/* Pillars */}
            <div>
              <ScrollReveal delay={0.1}>
                <p className="text-white/50 font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4">
                  Our Pillars
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl leading-[1.1] tracking-tight text-white mb-10">
                  Built on what matters
                </h2>
              </ScrollReveal>

              <div className="space-y-6">
                {pillars.map((pillar, i) => (
                  <ScrollReveal key={pillar.title} delay={0.2 + i * 0.1}>
                    <div className="flex gap-5 group">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center group-hover:bg-plum/15 group-hover:border-plum/25 transition-all duration-300">
                        <pillar.icon size={22} className="text-plum-tint" weight="duotone" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-white text-base mb-1">
                          {pillar.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 pb-24 md:pb-32">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.1] tracking-tight text-white mb-6">
                Ready to join the community?
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10">
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
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-display font-semibold text-sm tracking-wide uppercase rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Learn About Us
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
