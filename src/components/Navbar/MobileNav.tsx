"use client";

import { motion, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";

import ThemeToggle from "@/components/ThemeToggle";
import { navLinks, MotionLink } from "./navConfig";

interface MobileNavProps {
  mobileOpen: boolean;
  activeSection: number;
  onToggle: () => void;
  onNavClick: (href: string, index: number) => void;
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
            className="fixed inset-0 z-40 bg-[var(--color-background)]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Decorative ember glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-fire/5 blur-[100px]" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-2 w-full max-w-xs"
            >
              {navLinks.map((link, i) => (
                <MotionLink
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onNavClick(link.href, i)}
                  className={`
                    relative w-full text-center py-4 text-2xl font-display font-bold
                    rounded-2xl transition-colors duration-300
                    ${
                      activeSection === i
                        ? "text-fire bg-fire/10"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                    }
                  `}
                >
                  {activeSection === i && (
                    <motion.span
                      layoutId="mobile-nav-pill"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-fire rounded-full"
                    />
                  )}
                  {link.label}
                </MotionLink>
              ))}

              {/* Mobile CTA */}
              <MotionLink
                href="/#give"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
                onClick={onClose}
                className="
                  mt-6 w-full text-center py-4 text-lg font-semibold
                  bg-gradient-to-b from-gold to-gold-dim text-[#1A1A00]
                  rounded-2xl
                  hover:shadow-[var(--shadow-gold-md)]
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
                className="mt-2 text-sm text-[var(--color-text-secondary)] hover:text-fire transition-colors"
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
