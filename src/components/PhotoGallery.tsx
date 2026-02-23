"use client";

import { Images } from "@phosphor-icons/react";
import { DiagonalGallery } from "@/components/ui/diagonal-gallery";
import ScrollReveal from "./ScrollReveal";

const PhotoGallery = () => {
  return (
    <section id="gallery" className="py-12 sm:py-24 relative overflow-hidden">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-6 px-5 sm:px-7 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base border border-[var(--color-border-medium)] bg-[var(--glass-bg)] backdrop-blur-sm text-[var(--color-text-primary)]">
            <Images size={18} weight="fill" className="text-plum" />
            <span>Celebrating Youth Across Nations</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--color-text-primary)] mb-5 sm:mb-7 leading-[0.9] tracking-tight">
            <span className="block">Photo</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-light to-plum-tint pb-2">
              Gallery
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Witness the power of unity as Youth Alive brings together young people across the globe
            through events, conferences, and community fellowships.
          </p>
        </ScrollReveal>
      </div>

      {/* Diagonal Gallery — Full Width */}
      <ScrollReveal delay={0.3}>
        <DiagonalGallery />
      </ScrollReveal>
    </section>
  );
};

export default PhotoGallery;
