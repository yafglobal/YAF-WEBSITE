"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

import ThemeToggle from "@/components/ThemeToggle";
import { navLinks } from "./navConfig";

interface DesktopNavProps {
  activeSection: number;
  scrolled: boolean;
  pathname: string;
  onNavClick: (href: string, index: number) => void;
}

export default function DesktopNav({
  activeSection,
  scrolled,
  pathname,
  onNavClick,
}: DesktopNavProps) {
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
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => onNavClick(link.href, index)}
              className={`
                relative z-10 px-4 py-2 text-[13px] font-medium tracking-wide
                transition-colors duration-300 rounded-full
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
            </Link>
          ))}
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
