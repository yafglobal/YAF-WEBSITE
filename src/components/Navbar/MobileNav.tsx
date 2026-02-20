"use client";

import { motion, AnimatePresence } from "motion/react";
import { List, X, Play, FilmStrip } from "@phosphor-icons/react";
import Image from "next/image";

import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, MotionLink } from "./navConfig";

interface MobileNavProps {
  mobileOpen: boolean;
  activeSection: number;
  onToggle: () => void;
  onNavClick: () => void;
  onClose: () => void;
}

export default function MobileNav({
  mobileOpen,
  activeSection,
  onToggle,
  onNavClick,
  onClose,
}: MobileNavProps) {
  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden flex items-center gap-2 relative z-10">
        <ThemeToggle />
        <motion.button
          onClick={onToggle}
          className="relative z-10 p-2.5 rounded-full text-[var(--color-text-primary)] bg-[var(--color-surface)]/50 border border-[var(--color-border)]"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={22} weight="bold" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <List size={22} weight="bold" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#F0E4F3] flex flex-col items-center overflow-y-auto overscroll-contain"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Decorative plum glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-plum/8 blur-[100px]" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-2 w-full max-w-xs pt-24 pb-12"
            >
              {navLinks.map((link, i) => {
                const isWatch = link.label === "Watch";
                const isCommunity = link.label === "Community";

                return (
                  <div key={link.label} className="w-full">
                    <MotionLink
                      href={link.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      onClick={onNavClick}
                      className={`
                        relative w-full text-center py-4 text-2xl font-display font-bold
                        rounded-2xl transition-colors duration-300 block
                        ${
                          activeSection === i
                            ? "text-plum bg-plum/10"
                            : "text-[#2D1035] hover:text-plum hover:bg-white/40"
                        }
                      `}
                    >
                      {activeSection === i && (
                        <motion.span
                          layoutId="mobile-nav-pill"
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-plum rounded-full"
                        />
                      )}
                      {link.label}
                    </MotionLink>

                    {/* Watch sub-items: visual cards + continent pills */}
                    {isWatch && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12 + i * 0.06 + 0.1 }}
                        className="mt-2 mb-3 space-y-2"
                      >
                        {/* Visual buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <MotionLink
                            href="/watch"
                            onClick={onClose}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center gap-2 py-4 rounded-xl border border-plum/12 bg-white/50 hover:border-plum/30 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center">
                              <Play size={20} weight="fill" className="text-plum ml-0.5" />
                            </div>
                            <span className="text-xs font-bold text-[#2D1035]">Video Library</span>
                          </MotionLink>
                          <MotionLink
                            href="/reels"
                            onClick={onClose}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 }}
                            className="flex flex-col items-center gap-2 py-4 rounded-xl border border-plum/12 bg-white/50 hover:border-plum/30 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center">
                              <FilmStrip size={20} weight="fill" className="text-plum" />
                            </div>
                            <span className="text-xs font-bold text-[#2D1035]">Reels</span>
                          </MotionLink>
                        </div>

                        {/* Region cards */}
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            {
                              label: "Africa",
                              href: "/watch/africa",
                              gradient: "from-amber-500 to-orange-600",
                              emoji: "\u{1F1F3}\u{1F1EC}",
                            },
                            {
                              label: "N. America",
                              href: "/watch/north-america",
                              gradient: "from-red-500 to-rose-600",
                              emoji: "\u{1F1E8}\u{1F1E6}",
                            },
                            {
                              label: "Europe",
                              href: "/watch/europe",
                              gradient: "from-blue-500 to-indigo-600",
                              emoji: "\u{1F1EC}\u{1F1E7}",
                            },
                          ].map((c) => (
                            <MotionLink
                              key={c.href}
                              href={c.href}
                              onClick={onClose}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gradient-to-r ${c.gradient} text-white shadow-sm`}
                            >
                              <span className="text-sm leading-none">{c.emoji}</span>
                              <span className="text-[11px] font-bold drop-shadow-sm">
                                {c.label}
                              </span>
                            </MotionLink>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Community sub-items: branch cards */}
                    {isCommunity && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.12 + i * 0.06 + 0.1 }}
                        className="mt-2 mb-3"
                      >
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            {
                              label: "Africa",
                              href: "/branches/africa",
                              gradient: "from-amber-500 to-orange-600",
                              accent: "/images/branch-accents/africa-continent.png",
                              accentRotate: "",
                            },
                            {
                              label: "Europe",
                              href: "/branches/europe",
                              gradient: "from-blue-500 to-indigo-600",
                              accent: "/images/branch-accents/europe-flag.png",
                              accentRotate: "",
                            },
                            {
                              label: "USA",
                              href: "/branches/usa",
                              gradient: "from-red-500 to-rose-600",
                              accent: "/images/branch-accents/usa-flag.png",
                              accentRotate: "",
                            },
                            {
                              label: "Canada",
                              href: "/branches/canada",
                              gradient: "from-emerald-500 to-teal-600",
                              accent: "/yaf-canada/mapleleaf.png",
                              accentRotate: "rotate-12",
                            },
                          ].map((c) => (
                            <MotionLink
                              key={c.href}
                              href={c.href}
                              onClick={onClose}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`flex items-center justify-center gap-1.5 py-3 rounded-lg bg-gradient-to-r ${c.gradient} text-white shadow-sm`}
                            >
                              <Image
                                src={c.accent}
                                alt=""
                                width={14}
                                height={14}
                                className={`w-3.5 h-3.5 drop-shadow-sm ${c.accentRotate}`}
                              />
                              <span className="text-[12px] font-bold drop-shadow-sm">
                                {c.label}
                              </span>
                            </MotionLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <MotionLink
                href="https://business.payaza.africa/pay/livingfaithchurch-youthalive"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
                onClick={onClose}
                className="
                  mt-6 w-full text-center py-4 text-lg font-semibold
                  bg-plum text-white
                  rounded-2xl shadow-lg shadow-plum/25
                  hover:bg-plum/90
                  transition-all duration-300 active:scale-95
                "
              >
                Give Online
              </MotionLink>

              <MotionLink
                href="/contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="mt-2 text-sm text-[#5A3D62] hover:text-plum transition-colors"
              >
                Contact Us
              </MotionLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
