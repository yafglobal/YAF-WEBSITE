"use client";

import { useRef, useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "@phosphor-icons/react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? !document.documentElement.classList.contains("light")
      : true
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(async () => {
    const nextDark = !isDark;

    // Fallback for browsers without View Transitions or reduced motion
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      flushSync(() => setIsDark(nextDark));
      document.documentElement.classList.toggle("light", !nextDark);
      localStorage.setItem("theme", nextDark ? "dark" : "light");
      return;
    }

    // Get button position for circular reveal origin
    const btn = buttonRef.current!;
    const { top, left, width, height } = btn.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setIsDark(nextDark);
        document.documentElement.classList.toggle("light", !nextDark);
        localStorage.setItem("theme", nextDark ? "dark" : "light");
      });
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [isDark]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative p-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-fire/30 transition-all duration-300 group cursor-pointer"
    >
      {isDark ? (
        <Sun
          size={18}
          weight="bold"
          className="text-gold group-hover:text-fire transition-colors"
        />
      ) : (
        <Moon
          size={18}
          weight="bold"
          className="text-fire group-hover:text-gold transition-colors"
        />
      )}
    </button>
  );
}
