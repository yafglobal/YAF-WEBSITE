"use client";

import { useRef, useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "@phosphor-icons/react";

// Subscribe to theme changes on <html> class list
function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

// Server always renders dark (matches the inline script default)
function getServerSnapshot() {
  return "dark" as const;
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(async () => {
    const nextDark = !isDark;

    // Fallback for browsers without View Transitions or reduced motion
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      flushSync(() => {
        document.documentElement.classList.toggle("light", !nextDark);
        localStorage.setItem("theme", nextDark ? "dark" : "light");
      });
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
        document.documentElement.classList.toggle("light", !nextDark);
        localStorage.setItem("theme", nextDark ? "dark" : "light");
      });
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
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
      className="relative p-2.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-plum/30 transition-all duration-300 group cursor-pointer"
    >
      {isDark ? (
        <Sun
          size={18}
          weight="bold"
          className="text-plum-tint group-hover:text-plum transition-colors"
        />
      ) : (
        <Moon
          size={18}
          weight="bold"
          className="text-plum group-hover:text-plum-tint transition-colors"
        />
      )}
    </button>
  );
}
