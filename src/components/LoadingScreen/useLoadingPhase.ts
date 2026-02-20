"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import type { Phase } from "./types";
import { lockBodyScroll } from "@/lib/body-scroll-lock";

// Use useSyncExternalStore to read sessionStorage without hydration mismatch.
// Server snapshot returns false; client reads the real value. React handles
// the mismatch gracefully with a synchronous re-render when they differ.
const noopSubscribe = () => () => {};
const getAlreadyShownSnapshot = () => sessionStorage.getItem("yag-loaded") === "1";
const getAlreadyShownServerSnapshot = () => false;

export function useLoadingPhase(isMobile = false) {
  const alreadyShown = useSyncExternalStore(
    noopSubscribe,
    getAlreadyShownSnapshot,
    getAlreadyShownServerSnapshot
  );

  const [phase, setPhase] = useState<Phase>("igniting");
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // Lock scroll while the loading experience is active.
  useEffect(() => {
    if (alreadyShown || !visible) return;
    return lockBodyScroll();
  }, [alreadyShown, visible]);

  const handleComplete = useCallback(() => {
    // Fire phases: igniting -> burning -> blazing -> burst -> done
    setPhase("blazing");

    setTimeout(() => {
      setPhase("burst");

      setTimeout(() => {
        setPhase("done");
        setVisible(false);
        sessionStorage.setItem("yag-loaded", "1");
      }, 1000);
    }, 600);
  }, []);

  // Track loading progress
  useEffect(() => {
    if (alreadyShown || phase === "done" || !visible) return;

    let minTimeReached = false;
    let pageReady = false;
    let currentProgress = 0;

    // Simulate progress with acceleration
    const progressInterval = setInterval(() => {
      if (currentProgress < 90) {
        currentProgress += (90 - currentProgress) * 0.08;
        setProgress(Math.min(currentProgress, 90));
      }
    }, 50);

    const checkReady = () => {
      if (minTimeReached && pageReady) {
        clearInterval(progressInterval);
        setProgress(100);
        handleComplete();
      }
    };

    // Minimum display time for the animation to feel impactful
    // Shorter on mobile (1.2s) for a snappier experience
    setTimeout(
      () => {
        minTimeReached = true;
        checkReady();
      },
      isMobile ? 1200 : 2500
    );

    // Move to "burning" phase after initial ignition
    setTimeout(() => {
      setPhase("burning");
    }, 800);

    // Detect page readiness
    const onReady = () => {
      pageReady = true;
      currentProgress = 95;
      setProgress(95);
      checkReady();
    };

    if (document.readyState === "complete") {
      // Small delay even if already loaded, so the animation gets a chance
      setTimeout(onReady, 500);
    } else {
      window.addEventListener("load", onReady);
    }

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener("load", onReady);
    };
  }, [alreadyShown, visible, phase, handleComplete, isMobile]);

  // Short-circuit for return visits — all hooks are called above
  if (alreadyShown) {
    return { phase: "done" as Phase, visible: false, progress: 100, intensity: 0 };
  }

  // Phase-based intensity multiplier
  const intensity =
    phase === "igniting"
      ? 0.3
      : phase === "burning"
        ? 0.6
        : phase === "blazing"
          ? 1
          : phase === "burst"
            ? 1.5
            : 0;

  return { phase, visible, progress, intensity };
}
