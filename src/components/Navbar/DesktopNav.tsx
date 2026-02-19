"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { useState, useRef } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import { navLinks } from "./navConfig";
import WatchMegaDropdown from "./WatchMegaDropdown";

interface DesktopNavProps {
  activeSection: number;
  scrolled: boolean;
  pathname: string;
  onNavClick: () => void;
  lightHero?: boolean;
}

export default function DesktopNav({
  activeSection,
  scrolled,
  pathname,
  onNavClick,
  lightHero = false,
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
                  onClick={onNavClick}
                  className={`
                    relative z-10 px-4 py-2 text-[13px] font-medium tracking-wide
                    transition-colors duration-300 rounded-full inline-flex items-center gap-1
                    ${
                      activeSection === index
                        ? "text-[var(--color-text-primary)]"
                        : scrolled
                          ? "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                          : lightHero
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
                {isWatch && (
                  <AnimatePresence>{watchHovered && <WatchMegaDropdown />}</AnimatePresence>
                )}
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
                  : lightHero
                    ? "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                    : "text-white/80 hover:text-white"
            }
          `}
        >
          Contact
        </Link>
        <Link
          href="https://business.payaza.africa/pay/livingfaithchurch-youthalive"
          target="_blank"
          rel="noopener noreferrer"
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
