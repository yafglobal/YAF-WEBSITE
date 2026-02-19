"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  YoutubeLogo,
  FacebookLogo,
  InstagramLogo,
  XLogo,
  TiktokLogo,
  MapPin,
  Phone,
  EnvelopeSimple,
  PaperPlaneTilt,
  ArrowUpRight,
} from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const resourceLinks = [
  { label: "Home", href: "#" },
  { label: "About us", href: "#about" },
  { label: "Sermons", href: "#sermons" },
  { label: "Events", href: "#events" },
  { label: "Blogs", href: "#" },
  { label: "Give online", href: "#give" },
];

const socialLinks = [
  { icon: YoutubeLogo, label: "YouTube", href: "https://www.youtube.com/@youthaliveglobal?sub_confirmation=1", color: "#FF0000", glow: "rgba(255, 0, 0, 0.4)" },
  { icon: FacebookLogo, label: "Facebook", href: "https://www.facebook.com/Youthaliveglobal", color: "#1877F2", glow: "rgba(24, 119, 242, 0.4)" },
  { icon: InstagramLogo, label: "Instagram", href: "https://www.instagram.com/youthaliveglobal", color: "#E4405F", glow: "rgba(228, 64, 95, 0.4)" },
  { icon: XLogo, label: "Twitter / X", href: "https://x.com/youthaliveglb", color: "var(--color-text-primary)", glow: "rgba(128, 128, 128, 0.3)" },
  { icon: TiktokLogo, label: "TikTok", href: "https://www.tiktok.com/@youthaliveglobal", color: "#00F2EA", glow: "rgba(0, 242, 234, 0.4)" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Top fire gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/40 to-transparent" />

      {/* Big statement */}
      <div className="relative border-b border-[var(--color-border)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <ScrollReveal>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl">
              Ready to become a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire via-fire-light to-gold">
                Kingdom Giant
              </span>
              ?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-3 px-6 py-3.5 md:px-8 md:py-4 bg-fire text-white font-display font-semibold text-xs md:text-sm tracking-wide uppercase rounded-full hover:bg-fire-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.4)]"
              >
                Connect with us globally
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-[var(--color-border)] text-[var(--color-text-secondary)] font-display font-medium text-xs md:text-sm tracking-wide uppercase rounded-full hover:border-fire/30 hover:text-fire transition-all duration-300"
              >
                Find a location
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4">
            <ScrollReveal>
              <Image
                src="/images/logo.png"
                alt="Youth Alive Global"
                width={155}
                height={40}
                className="h-8 w-auto brightness-200"
                style={{ filter: "var(--logo-filter, brightness(2))" }}
              />
              <p className="mt-5 text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-sm">
                A global youth movement with a balanced commitment to spiritual
                growth, personal development, and purpose-driven living.
              </p>

              {/* Newsletter */}
              <div className="mt-8">
                <p className="font-display font-bold text-[var(--color-text-primary)] text-sm mb-3">
                  Stay in the loop
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-fire/40 transition-colors text-sm"
                  />
                  <button className="px-4 py-3 bg-fire text-white rounded-xl hover:bg-fire-light transition-all duration-300 cursor-pointer">
                    <PaperPlaneTilt size={18} weight="fill" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <ScrollReveal delay={0.1}>
              <h4 className="font-display font-bold text-[var(--color-text-primary)] text-xs tracking-[0.2em] uppercase mb-6">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[var(--color-text-secondary)] text-sm hover:text-fire transition-colors duration-300 inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <ScrollReveal delay={0.2}>
              <h4 className="font-display font-bold text-[var(--color-text-primary)] text-xs tracking-[0.2em] uppercase mb-6">
                Get in Touch
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-[var(--color-text-secondary)] text-sm">
                  <MapPin
                    size={16}
                    className="text-fire mt-0.5 shrink-0"
                    weight="fill"
                  />
                  <span>
                    Global Youth Office, Living Faith Church, Canaanland, Ota,
                    Nigeria.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[var(--color-text-secondary)] text-sm">
                  <Phone
                    size={16}
                    className="text-fire shrink-0"
                    weight="fill"
                  />
                  <span>+234 816 287 9125</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--color-text-secondary)] text-sm">
                  <EnvelopeSimple
                    size={16}
                    className="text-fire shrink-0"
                    weight="fill"
                  />
                  <span>info@winnersyouth.org</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Social — brand-colored hover cards */}
          <div className="md:col-span-3">
            <ScrollReveal delay={0.3}>
              <h4 className="font-display font-bold text-[var(--color-text-primary)] text-xs tracking-[0.2em] uppercase mb-6">
                Follow Us
              </h4>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link, i) => (
                  <ScrollReveal key={link.label} delay={0.35 + i * 0.06}>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative flex items-center gap-3.5 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden transition-all duration-400"
                      style={{
                        // @ts-expect-error -- CSS custom properties
                        "--brand": link.color,
                        "--brand-glow": link.glow,
                      }}
                    >
                      {/* Brand-colored background wash on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(ellipse at 0% 50%, ${link.glow}, transparent 70%)`,
                        }}
                      />

                      {/* Animated border color on hover */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 ring-1 ring-inset pointer-events-none"
                        style={{ "--tw-ring-color": `${link.color}33` } as React.CSSProperties}
                      />

                      {/* Icon with halo */}
                      <div className="relative shrink-0">
                        {/* Glow halo behind icon */}
                        <div
                          className="absolute inset-0 rounded-full blur-[8px] scale-150 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                          style={{ background: link.glow }}
                        />
                        <link.icon
                          size={22}
                          className="relative z-10 transition-colors duration-300"
                          weight="fill"
                          style={{ color: "var(--color-text-muted)" }}
                          // Brand color applied via CSS on hover
                        />
                        {/* We use a style trick: overlay the colored icon on hover */}
                        <link.icon
                          size={22}
                          className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          weight="fill"
                          style={{ color: link.color }}
                        />
                      </div>

                      {/* Label */}
                      <span className="relative z-10 text-[var(--color-text-secondary)] text-sm font-medium group-hover:text-[var(--color-text-primary)] transition-colors duration-300 flex-1">
                        {link.label}
                      </span>

                      {/* Arrow */}
                      <ArrowUpRight
                        size={14}
                        weight="bold"
                        className="relative z-10 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                        style={{ color: link.color }}
                      />
                    </motion.a>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-xs">
            &copy; {new Date().getFullYear()} Youth Alive Global. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2.5 text-[var(--color-text-muted)] rounded-lg transition-all duration-300 group/icon"
                aria-label={link.label}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${link.glow.replace("0.4", "0.1")}, transparent 70%)` }}
                />
                <link.icon
                  size={16}
                  weight="fill"
                  className="relative z-10 transition-colors duration-300"
                />
                {/* Colored overlay on hover */}
                <link.icon
                  size={16}
                  weight="fill"
                  className="absolute top-2.5 left-2.5 z-20 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"
                  style={{ color: link.color }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
