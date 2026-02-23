"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface SlideStripProps {
  images: string[];
  stripIndex: number; // 0-4, determines drift direction and speed
  startDelay?: number; // ms — staggers cycle starts so strips don't all switch at once
}

// Interval between image swaps within a single strip (ms)
const CYCLE_INTERVAL = 3000;

export default function SlideStrip({ images, stripIndex, startDelay = 0 }: SlideStripProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (images.length <= 1) return;
    let interval: ReturnType<typeof setInterval>;

    // Stagger the start of each strip's cycle so they don't all crossfade simultaneously
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setImageIndex((i) => (i + 1) % images.length);
      }, CYCLE_INTERVAL);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [images.length, startDelay]);

  // Alternating up/down drift; slower strips get more time per cycle
  const driftY = stripIndex % 2 === 0 ? [0, -40, 0] : [0, 40, 0];
  const driftDuration = 10 + stripIndex * 2;

  return (
    <motion.div
      className="relative flex-1 h-full overflow-hidden"
      animate={isMobile ? { y: 0 } : { y: driftY }}
      transition={
        isMobile
          ? { duration: 0 }
          : { duration: driftDuration, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={imageIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={images[imageIndex]}
            alt="Youth Alive event"
            fill
            className="object-cover"
            priority={stripIndex === 0 && imageIndex === 0}
            sizes="25vw"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
