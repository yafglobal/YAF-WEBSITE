"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { MagnifyingGlassPlus } from "@phosphor-icons/react";
import type { ContinentImage } from "./data";
import Lightbox from "./Lightbox";

/* Bento layout classes for a 4-column desktop / 2-column mobile grid.
   Desktop: 3 rows of fixed heights with the hero spanning 2x2.
   Mobile:  aspect ratios control cell height. */
const bentoClasses = [
  "col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto", // 0 — hero (large)
  "aspect-square md:aspect-auto", // 1
  "aspect-square md:aspect-auto", // 2
  "col-span-2 aspect-[21/9] md:aspect-auto", // 3 — wide mid
  "col-span-2 aspect-[21/9] md:aspect-auto", // 4 — wide bottom
  "aspect-square md:aspect-auto", // 5
  "aspect-square md:aspect-auto", // 6
];

interface Props {
  images: ContinentImage[];
  continentName: string;
}

export default function BentoGallery({ images, continentName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-[220px_220px_200px] gap-1.5 md:gap-2.5">
        {images.slice(0, 7).map((img, i) => {
          const isWide = i === 0 || i === 3 || i === 4;
          return (
            <motion.button
              key={img.src}
              whileHover={{ scale: 1.012 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => setLightboxIndex(i)}
              className={`${bentoClasses[i] || ""} relative rounded-xl overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-plum`}
              aria-label={`View: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes={isWide ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
              {/* Hover overlay with zoom icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <MagnifyingGlassPlus
                  size={28}
                  weight="bold"
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
        continentName={continentName}
      />
    </>
  );
}
