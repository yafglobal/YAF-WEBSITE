let lockCount = 0;
let previousOverflow = "";

/**
 * Locks body scrolling and returns an idempotent release function.
 * Uses a shared ref-count so multiple overlays/modals can coexist safely.
 */
export function lockBodyScroll() {
  if (typeof document === "undefined") {
    return () => {};
  }

  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  lockCount += 1;

  let released = false;

  return () => {
    if (released || typeof document === "undefined") return;
    released = true;

    lockCount = Math.max(0, lockCount - 1);

    if (lockCount === 0) {
      if (previousOverflow) {
        document.body.style.overflow = previousOverflow;
      } else {
        document.body.style.removeProperty("overflow");
      }
      previousOverflow = "";
    }
  };
}
