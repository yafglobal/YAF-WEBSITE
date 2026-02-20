"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Bell, DeviceMobileCamera, ChatCircleDots, CalendarCheck } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const appFeatures = [
  { icon: CalendarCheck, text: "Events & Programs" },
  { icon: ChatCircleDots, text: "Community Chats" },
  { icon: Bell, text: "Devotionals Daily" },
  { icon: DeviceMobileCamera, text: "Live Streaming" },
];

export default function AppSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* ── Curved top — pulls dark bg up into the light section ── */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="block w-full h-[80px] md:h-[140px] lg:h-[200px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200V100C0 100 200 0 720 0C1240 0 1440 100 1440 100V200Z"
            fill="var(--color-charcoal)"
          />
        </svg>
        {/* Plum glow at the curve boundary */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/2 w-[500px] h-24 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(134,22,87,0.1) 0%, rgba(0,0,0,0) 70%)",
            transform: "translateZ(0)",
          }}
        />
      </div>

      {/* ── Main section content ───────────────────────────────── */}
      <div className="relative pb-32 pt-16 md:pb-44 md:pt-24">
        {/* Theme-responsive gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom right, var(--color-charcoal), var(--color-background), var(--color-charcoal))`,
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(134,22,87,0.08) 0%, rgba(0,0,0,0) 70%)",
            transform: "translateZ(0)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Phone mockup */}
            <div className="relative flex justify-center">
              <ScrollReveal direction="left">
                <motion.div style={{ y: phoneY, rotate: phoneRotate }} className="relative">
                  <div className="relative w-[min(280px,85vw)] md:w-[360px]">
                    <Image
                      src="/images/app-mockup.png"
                      alt="Youth Alive Mobile App"
                      width={717}
                      height={580}
                      className="w-full h-auto"
                      style={{ transform: "translateZ(0)", willChange: "transform" }}
                    />
                  </div>

                  {/* Floating glow behind phone */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full -z-10"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(134,22,87,0.2) 0%, rgba(0,0,0,0) 70%)",
                      transform: "translateZ(0)",
                    }}
                  />
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Content */}
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-plum/10 border border-plum/20 rounded-full mb-6">
                  <span className="w-2 h-2 bg-plum rounded-full animate-pulse" />
                  <span className="text-plum text-xs font-display font-semibold tracking-wider uppercase">
                    Coming Soon
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                  Get Notified
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum to-plum-tint">
                    When We Launch
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="mt-8 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-lg">
                  Youth Alive is going Mobile! Get ready to connect, grow, and stay inspired
                  wherever you are. The Youth Alive mobile app is launching soon with devotionals,
                  events, chats, and more — all in one place.
                </p>
              </ScrollReveal>

              {/* Feature pills */}
              <div className="mt-8 flex flex-wrap gap-3">
                {appFeatures.map((feat, i) => (
                  <ScrollReveal key={feat.text} delay={0.3 + i * 0.08}>
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
                      <feat.icon size={16} className="text-plum" weight="fill" />
                      <span className="text-[var(--color-text-secondary)] text-sm">
                        {feat.text}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Email signup */}
              <ScrollReveal delay={0.5}>
                <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-plum/40 transition-colors text-sm"
                  />
                  <button className="px-6 py-4 bg-plum text-white font-display font-semibold text-sm rounded-xl hover:bg-plum-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(134,22,87,0.3)] flex items-center gap-2 justify-center whitespace-nowrap">
                    <Bell size={16} weight="fill" />
                    Notify Me
                  </button>
                </div>
              </ScrollReveal>

              {/* Store badges */}
              <ScrollReveal delay={0.6}>
                <div className="mt-6 flex items-center gap-3">
                  <Image
                    src="/images/yaf-pc.svg"
                    alt="Play Store"
                    width={28}
                    height={28}
                    className="opacity-30 hover:opacity-50 transition-opacity cursor-pointer"
                  />
                  <span className="text-[var(--color-text-muted)] text-xs">
                    Available soon on iOS & Android
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
