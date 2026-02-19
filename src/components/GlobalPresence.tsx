"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, GlobeHemisphereWest, Compass, Airplane } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const regions = [
  { name: "Africa", count: "25+ Nations" },
  { name: "Europe", count: "10+ Nations" },
  { name: "Americas", count: "8+ Nations" },
  { name: "Asia", count: "5+ Nations" },
  { name: "Oceania", count: "3+ Nations" },
];

export default function GlobalPresence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const globeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Background map texture */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-20">
        <Image
          src="/images/global-bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <ScrollReveal>
              <p className="text-fire font-display text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase font-semibold mb-4 flex items-center gap-2">
                <MapPin size={14} weight="fill" />
                Our Global Reach
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                All across the{" "}
                <span className="text-glow-gold text-gold">globe</span>,
                <br />
                we are there.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="mt-8 text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-lg">
                Connect with any of our locations worldwide. Youth Alive is a
                global movement reaching young people in every continent with the
                message of faith, purpose, and empowerment.
              </p>
            </ScrollReveal>

            {/* Region pills */}
            <div className="mt-10 flex flex-wrap gap-3">
              {regions.map((region, i) => (
                <ScrollReveal key={region.name} delay={0.3 + i * 0.08}>
                  <div className="px-3 py-2 md:px-5 md:py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl hover:border-fire/20 hover:bg-fire/5 transition-all duration-300 cursor-default">
                    <p className="text-[var(--color-text-primary)] font-display font-semibold text-sm">
                      {region.name}
                    </p>
                    <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">{region.count}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.6}>
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-10 text-fire font-display font-semibold text-sm tracking-wide uppercase group"
              >
                <Compass size={18} weight="fill" />
                Find a location near you
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            </ScrollReveal>
          </div>

          {/* Right: Globe visual */}
          <div className="relative flex items-center justify-center">
            <ScrollReveal delay={0.2} direction="right">
              <div className="relative w-[min(300px,80vw)] h-[min(300px,80vw)] md:w-[420px] md:h-[420px]">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full border border-fire/10 animate-pulse" />
                <div className="absolute inset-4 rounded-full border border-gold/10" />
                <div className="absolute inset-8 rounded-full border border-[var(--color-border)]" />

                {/* Globe image */}
                <motion.div
                  style={{ rotate: globeRotate }}
                  className="absolute inset-12 flex items-center justify-center"
                >
                  <Image
                    src="/images/globe.png"
                    alt="Global Presence"
                    width={300}
                    height={300}
                    className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(255,77,0,0.2)]"
                  />
                </motion.div>

                {/* Floating location pins */}
                {[
                  { top: "10%", left: "50%", delay: 0 },
                  { top: "30%", left: "85%", delay: 0.5 },
                  { top: "70%", left: "80%", delay: 1 },
                  { top: "80%", left: "30%", delay: 1.5 },
                  { top: "25%", left: "15%", delay: 2 },
                ].map((pin, i) => (
                  <motion.div
                    key={i}
                    className="absolute ember"
                    style={{
                      top: pin.top,
                      left: pin.left,
                      animationDelay: `${pin.delay}s`,
                    }}
                  >
                    <div className="w-3 h-3 bg-fire rounded-full shadow-[0_0_12px_rgba(255,77,0,0.6)]" />
                  </motion.div>
                ))}

                {/* Airplane icon orbiting */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Airplane size={20} className="text-gold/60" weight="fill" />
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
