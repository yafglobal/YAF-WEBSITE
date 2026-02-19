"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import ScrollReveal from "../ScrollReveal";

const leaders = [
  {
    name: "Bishop David Oyedepo",
    role: "Presiding Bishop",
    subtitle: "Living Faith Church Worldwide",
    image: "/images/about/bishop-oyedepo.jpg",
    bio: "Bishop David Oyedepo is the founder and presiding Bishop of Living Faith Church Worldwide (Winners Chapel International), one of the largest church networks in Africa with presence in over 80 nations.",
  },
  {
    name: "Pastor Steve Ogah",
    role: "Global Youth Pastor",
    subtitle: "Living Faith Church Worldwide",
    image: "/images/about/pastor-steve-ogah.png",
    bio: "Pastor Steve Ogah is the Global Youth Pastor of Living Faith Church Worldwide and Chief of Staff to Bishop David Oyedepo. A Covenant University pioneer graduate, he mentors young adults through teachings on purposeful living, vision, and the help of the Holy Spirit.",
  },
  {
    name: "Pastor David Oyedepo Jnr.",
    role: "Pastor",
    subtitle: "Youth Alive Fellowship",
    image: "/images/about/pastor-david-jnr.png",
    bio: "Pastor David Oyedepo Jnr. serves as a Pastor at Living Faith Church, bringing dynamic teaching and leadership to the youth ministry. He is passionate about raising a generation of purpose-driven kingdom giants.",
  },
];

export default function Leadership() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  const featured = leaders[0];
  const others = leaders.slice(1);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gold/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-fire/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <ScrollReveal>
              <p className="text-fire font-display text-xs tracking-[0.4em] uppercase font-semibold mb-4">
                Our Leadership
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                Introducing Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold">
                  Pastors
                </span>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-md leading-relaxed">
              Visionary leaders raising a generation of kingdom giants who are
              equipped for global impact.
            </p>
          </ScrollReveal>
        </div>

        {/* Animated divider */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-[1px] mb-16 bg-gradient-to-r from-fire via-gold to-transparent"
        />

        {/* Featured leader — Bishop Oyedepo (editorial horizontal card) */}
        <ScrollReveal>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl overflow-hidden bg-[var(--color-surface)] mb-8"
          >
            <div className="grid md:grid-cols-2 min-h-[420px] md:min-h-[520px]">
              {/* Image side */}
              <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Fade into text side */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--color-surface)] hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent md:hidden" />
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-fire/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text side */}
              <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-16">
                {/* Large ghosted number */}
                <span className="font-display font-extrabold text-8xl lg:text-9xl text-fire/[0.06] absolute top-4 right-8 select-none pointer-events-none">
                  01
                </span>

                {/* Role tag */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-[2px] bg-fire" />
                  <span className="text-fire text-xs font-semibold tracking-[0.3em] uppercase">
                    {featured.role}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] leading-[1.1] tracking-tight">
                  {featured.name}
                </h3>

                <p className="mt-2 text-[var(--color-text-secondary)] text-sm">
                  {featured.subtitle}
                </p>

                <p className="mt-6 text-[var(--color-text-secondary)] text-base leading-relaxed max-w-lg">
                  {featured.bio}
                </p>

                {/* Decorative fire accent */}
                <div className="mt-8 w-16 h-[2px] bg-gradient-to-r from-fire to-transparent" />
              </div>
            </div>

            {/* Ring */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-[var(--color-border)] group-hover:ring-fire/15 transition-all duration-500" />
          </motion.div>
        </ScrollReveal>

        {/* Other leaders — 2-column portrait grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {others.map((leader, i) => (
            <ScrollReveal key={leader.name} delay={0.15 * (i + 1)}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* Image container */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--color-surface)]">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-fire/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    {/* Role tag — always visible */}
                    <div className="inline-flex items-center gap-2 mb-3">
                      <div className="w-5 h-[1.5px] bg-fire" />
                      <span className="text-fire text-xs font-semibold tracking-wider uppercase">
                        {leader.role}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white leading-tight">
                      {leader.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="mt-1 text-white/60 text-sm">
                      {leader.subtitle}
                    </p>

                    {/* Bio on hover */}
                    <p className="mt-3 text-white/50 text-xs leading-relaxed max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-out">
                      {leader.bio}
                    </p>
                  </div>

                  {/* Corner accent on hover */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 w-8 h-[2px] bg-fire" />
                    <div className="absolute top-4 right-4 w-[2px] h-8 bg-fire" />
                  </div>

                  {/* Ring */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] group-hover:ring-fire/20 transition-all duration-500" />
                </div>

                {/* Number indicator */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center group-hover:border-fire/30 group-hover:bg-fire/10 transition-all duration-300 z-10">
                  <span className="font-display font-bold text-sm text-[var(--color-text-secondary)] group-hover:text-fire transition-colors">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
