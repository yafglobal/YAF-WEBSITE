"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import { socialLinks } from "./footerConfig";

export default function SocialLinks() {
  return (
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
                  <div
                    className="absolute inset-0 rounded-full blur-[8px] scale-150 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: link.glow }}
                  />
                  <link.icon
                    size={22}
                    className="relative z-10 transition-colors duration-300"
                    weight="fill"
                    style={{ color: "var(--color-text-muted)" }}
                  />
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
  );
}
