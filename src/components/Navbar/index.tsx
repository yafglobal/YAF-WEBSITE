"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import GlassSurface from "@/components/ui/GlassSurface";
import { navLinks } from "./navConfig";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

interface NavbarProps {
  lightHero?: boolean;
}

export default function Navbar({ lightHero = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const branchAccent = useMemo(() => {
    const accents: Record<string, { src: string; size: number; rotate: number }> = {
      "/branches/africa": {
        src: "/images/branch-accents/africa-continent.png",
        size: 20,
        rotate: 0,
      },
      "/branches/europe": { src: "/images/branch-accents/europe-flag.png", size: 20, rotate: 0 },
      "/branches/usa": { src: "/images/branch-accents/usa-flag.png", size: 22, rotate: 0 },
      "/branches/canada": { src: "/yaf-canada/mapleleaf.png", size: 20, rotate: 12 },
    };
    return accents[pathname] ?? null;
  }, [pathname]);

  const activeSection = useMemo(() => {
    return navLinks.findIndex((link) => {
      if (link.href === "/") return pathname === "/";
      return pathname.startsWith(link.href.split("#")[0]) && link.href.split("#")[0] !== "/";
    });
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const handleNavClick = () => {
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
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
              ${scrolled ? "rounded-full px-3 py-1.5 md:px-4 md:py-2" : "bg-transparent px-2 py-2"}
            `}
          >
            {/* GlassSurface background -- fades in when scrolled */}
            <div
              className={`
                absolute inset-0 rounded-full overflow-hidden
                transition-opacity duration-500 ease-out
                ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
            >
              <GlassSurface
                width="100%"
                height="100%"
                borderRadius={9999}
                brightness={25}
                opacity={0.9}
                blur={14}
                displace={0.3}
                backgroundOpacity={0.05}
                saturation={1.2}
                distortionScale={-180}
                redOffset={0}
                greenOffset={8}
                blueOffset={16}
                mixBlendMode="difference"
                style={{ position: "absolute", inset: 0 }}
              />
            </div>

            {/* Logo */}
            <Link
              href="/"
              onClick={handleNavClick}
              className="relative z-10 flex items-center shrink-0"
            >
              <motion.div
                animate={{ scale: scrolled ? 0.85 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src="/images/logo.png"
                  alt="Youth Alive Global"
                  width={155}
                  height={40}
                  className="h-8 w-auto"
                  style={{ filter: "var(--logo-filter, brightness(2))" }}
                  priority
                />
                {/* Branch accent icon on logo — branch pages only */}
                {branchAccent && (
                  <motion.span
                    key={branchAccent.src}
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: branchAccent.rotate }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                    className="pointer-events-none absolute -top-1.5 -right-1 md:-right-0.5"
                  >
                    <Image
                      src={branchAccent.src}
                      alt=""
                      width={branchAccent.size}
                      height={branchAccent.size}
                      className="w-4.5 h-4.5 md:w-5 md:h-5 drop-shadow-sm"
                    />
                  </motion.span>
                )}
              </motion.div>
            </Link>

            <DesktopNav
              activeSection={activeSection}
              scrolled={scrolled}
              pathname={pathname}
              onNavClick={handleNavClick}
              lightHero={lightHero}
            />

            <MobileNav
              mobileOpen={mobileOpen}
              activeSection={activeSection}
              onToggle={() => setMobileOpen(!mobileOpen)}
              onNavClick={handleNavClick}
              onClose={() => setMobileOpen(false)}
            />
          </motion.div>
        </motion.div>
      </motion.nav>
    </>
  );
}
