"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { useState, useRef } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, watchDropdownItems } from "./navConfig";

interface DesktopNavProps {
  activeSection: number;
  scrolled: boolean;
  pathname: string;
  onNavClick: (href: string, index: number) => void;
}

function WatchDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl shadow-black/20 backdrop-blur-xl overflow-hidden z-50"
    >
      {watchDropdownItems.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          className={`
            flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium
            transition-colors duration-150
            text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]
            ${i === 0 ? "border-b border-[var(--color-border)] mb-1 pb-3" : ""}
          `}
        >
          {item.flag && <span className="text-base">{item.flag}</span>}
          {item.label}
        </Link>
      ))}
    </motion.div>
  );
}

export default function DesktopNav({
  activeSection,
  scrolled,
  pathname,
  onNavClick,
}: DesktopNavProps) {
  const [watchHovered, setWatchHovered] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setWatchHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setWatchHovered(false), 150);
  };

  return (
    <>
      {/* Desktop Pill Links */}
      <div className="hidden md:flex items-center relative z-10">
        <div
          className={`
            relative flex items-center gap-0.5 p-1
            transition-all duration-500
            ${scrolled ? "rounded-full" : ""}
          `}
        >
          {navLinks.map((link, index) => {
            const isWatch = link.label === "Watch";

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={isWatch ? handleMouseEnter : undefined}
                onMouseLeave={isWatch ? handleMouseLeave : undefined}
              >
                <Link
                  href={link.href}
                  onClick={() => onNavClick(link.href, index)}
                  className={`
                    relative z-10 px-4 py-2 text-[13px] font-medium tracking-wide
                    transition-colors duration-300 rounded-full inline-flex items-center gap-1
                    ${
                      activeSection === index
                        ? "text-[var(--color-text-primary)]"
                        : scrolled
                          ? "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                          : "text-white/80 hover:text-white"
                    }
                  `}
                >
                  {/* Active pill indicator */}
                  {activeSection === index && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-plum rounded-full"
                      style={{
                        boxShadow: "var(--shadow-plum-sm), inset 0 1px 0 var(--glass-highlight)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {isWatch && (
                    <CaretDown
                      weight="bold"
                      className={`relative z-10 w-3 h-3 transition-transform duration-200 ${watchHovered ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {/* Watch dropdown */}
                {isWatch && <AnimatePresence>{watchHovered && <WatchDropdown />}</AnimatePresence>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center gap-2 relative z-10">
        <ThemeToggle />
        <Link
          href="/contact"
          className={`
            px-4 py-2 text-[13px] font-medium rounded-full
            transition-all duration-300
            ${
              pathname === "/contact"
                ? "text-plum"
                : scrolled
                  ? "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  : "text-white/80 hover:text-white"
            }
          `}
        >
          Contact
        </Link>
        <Link
          href="/#give"
          className="
            group relative px-5 py-2.5 text-[13px] font-semibold
            bg-gradient-to-b from-plum-tint to-plum-muted text-[#1A1A00]
            rounded-full overflow-hidden
            transition-all duration-300
            hover:shadow-[var(--shadow-plum-tint-md)]
            active:scale-95
          "
        >
          <span className="relative z-10 flex items-center gap-1.5">
            Give Online
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </Link>
      </div>
    </>
  );
}
