"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { List, X, ArrowRight } from "@phosphor-icons/react";

import ThemeToggle from "./ThemeToggle";

const MotionLink = motion.create(Link);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sermons", href: "/#sermons" },
  { label: "Events", href: "/#events" },
  { label: "Community", href: "/#community" },
];

const sectionIds = ["", "about", "sermons", "events", "community"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Derive active nav index from route
  const routeActiveIndex = useMemo(() => {
    return navLinks.findIndex((link) => {
      if (link.href === "/") return pathname === "/";
      return pathname.startsWith(link.href.split("#")[0]) && link.href.split("#")[0] !== "/";
    });
  }, [pathname]);

  // Track scroll position — always visible, just morphs appearance
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  // Scroll-based section detection (only works on homepage where sections exist)
  useEffect(() => {
    if (pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id, index) => {
      const el = id ? document.getElementById(id) : document.querySelector("section");
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(index);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [pathname]);

  const handleNavClick = (href: string, index: number) => {
    setActiveSection(index);
    setMobileOpen(false);
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Full-width bar when at top */}
        <motion.div
          className="max-w-[1400px] mx-auto px-4 md:px-10"
          animate={{
            paddingTop: scrolled ? 12 : 16,
            paddingBottom: scrolled ? 12 : 16,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            layout
            className={`
              relative flex items-center justify-between
              transition-all duration-500 ease-out
              ${
                scrolled
                  ? "bg-[var(--color-surface)]/70 backdrop-blur-2xl border border-[var(--color-border)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-full px-3 py-1.5 md:px-4 md:py-2"
                  : "bg-transparent px-2 py-2"
              }
            `}
          >
            {/* Logo */}
            <Link
              href="/"
              onClick={() => handleNavClick("/", 0)}
              className="relative z-10 flex items-center shrink-0"
            >
              <motion.div
                animate={{ scale: scrolled ? 0.85 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Youth Alive Global"
                  width={155}
                  height={40}
                  className="h-8 w-auto brightness-200"
                  style={{ filter: "var(--logo-filter, brightness(2))" }}
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Pill Links */}
            <div className="hidden md:flex items-center">
              <div
                className={`
                  relative flex items-center gap-0.5 p-1
                  transition-all duration-500
                  ${scrolled ? "bg-[var(--color-background)]/50 rounded-full" : ""}
                `}
              >
                {navLinks.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => handleNavClick(link.href, index)}
                    className={`
                      relative z-10 px-4 py-2 text-[13px] font-medium tracking-wide
                      transition-colors duration-300 rounded-full
                      ${
                        activeSection === index
                          ? "text-white"
                          : scrolled
                            ? "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                            : "text-fire hover:text-fire-light text-glow-fire"
                      }
                    `}
                  >
                    {/* Active pill indicator */}
                    {activeSection === index && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-fire rounded-full"
                        style={{
                          boxShadow: "0 0 20px rgba(255, 77, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
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
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/contact"
                className={`
                  px-4 py-2 text-[13px] font-medium rounded-full
                  transition-all duration-300
                  ${
                    pathname === "/contact"
                      ? "text-fire"
                      : scrolled
                        ? "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
                        : "text-fire hover:text-fire-light text-glow-fire"
                  }
                `}
              >
                Contact
              </Link>
              <Link
                href="/#give"
                className="
                  group relative px-5 py-2.5 text-[13px] font-semibold
                  bg-gradient-to-b from-gold to-gold-dim text-[#1A1A00]
                  rounded-full overflow-hidden
                  transition-all duration-300
                  hover:shadow-[0_0_24px_rgba(255,215,0,0.4)]
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

            {/* Mobile toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
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
          </motion.div>
        </motion.div>
      </motion.nav>

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
                  onClick={() => handleNavClick(link.href, i)}
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
                onClick={() => setMobileOpen(false)}
                className="
                  mt-6 w-full text-center py-4 text-lg font-semibold
                  bg-gradient-to-b from-gold to-gold-dim text-[#1A1A00]
                  rounded-2xl
                  hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]
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
                onClick={() => setMobileOpen(false)}
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
