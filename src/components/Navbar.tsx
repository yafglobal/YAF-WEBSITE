"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Sermons", href: "#sermons" },
  { label: "Events", href: "#events" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="relative z-10 flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Youth Alive Global"
              width={155}
              height={40}
              className="brightness-200 h-8 w-auto"
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-fire group-hover:w-6 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a
              href="#give"
              className="px-6 py-2.5 text-sm font-semibold bg-fire text-white rounded-full hover:bg-fire-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,77,0,0.3)]"
            >
              Give Online
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-10 p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-display font-bold text-white hover:text-fire transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#give"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-10 py-4 text-lg font-semibold bg-fire text-white rounded-full hover:bg-fire-light transition-all"
              >
                Give Online
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
