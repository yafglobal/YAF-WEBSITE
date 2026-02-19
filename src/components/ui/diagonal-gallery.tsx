"use client";

import Image from "next/image";
import { InfiniteSlider } from "./infinite-slider";

// Static gallery images from existing project assets + UKYAF / AYAC Europe photos
const galleryImages = [
  { id: "1", src: "/images/slider-1.jpeg", alt: "Youth worship gathering" },
  { id: "2", src: "/ukyaf/ayac-praise-singer.png", alt: "AYAC Europe praise singer" },
  { id: "3", src: "/images/slider-2.jpeg", alt: "Youth fellowship event" },
  {
    id: "4",
    src: "/ukyaf/youth-fellowship-friends.png",
    alt: "Youth fellowship friends at Winners Middlesbrough",
  },
  { id: "5", src: "/images/slider-3.jpeg", alt: "Youth conference session" },
  { id: "6", src: "/ukyaf/ayac-keyboardist.png", alt: "AYAC Europe Sure Foundation keyboardist" },
  { id: "7", src: "/images/slider-4.jpeg", alt: "Youth praise and worship" },
  { id: "8", src: "/ukyaf/joyful-praise-gathering.png", alt: "Joyful praise gathering" },
  { id: "9", src: "/images/slider-5.jpeg", alt: "Youth community outreach" },
  { id: "10", src: "/ukyaf/ayac-worship-leader.png", alt: "AYAC Europe worship leader" },
  { id: "11", src: "/images/community-bg.jpg", alt: "Community fellowship moment" },
  { id: "12", src: "/ukyaf/ayac-europe-speaker.png", alt: "AYAC Europe Sure Foundation speaker" },
  { id: "13", src: "/images/about/worship-portrait.png", alt: "Worship portrait" },
  { id: "14", src: "/ukyaf/ayac-prayer-moment.png", alt: "AYAC Europe prayer moment" },
  { id: "15", src: "/images/about/fellowship-photo.png", alt: "Fellowship gathering" },
  { id: "16", src: "/ukyaf/ayac-worship-vocalist.png", alt: "AYAC Europe worship vocalist" },
  { id: "17", src: "/images/about/hero-bg.jpg", alt: "Youth alive conference" },
  {
    id: "18",
    src: "/ukyaf/southampton-congregation-worship.jpg",
    alt: "Southampton congregation in worship",
  },
  { id: "19", src: "/images/sermon-image.png", alt: "Youth sermon session" },
  {
    id: "20",
    src: "/ukyaf/youth-worship-hands-raised.png",
    alt: "Youth worship with hands raised",
  },
  { id: "21", src: "/ukyaf/ayac-prayer-session.png", alt: "AYAC Europe prayer session" },
];

export function DiagonalGallery() {
  const halfLength = Math.ceil(galleryImages.length / 2);
  const topRowImages = galleryImages.slice(0, halfLength);
  const bottomRowImages = galleryImages.slice(halfLength);

  return (
    <div className="relative py-4 sm:py-8 overflow-hidden">
      {/* Skewed container */}
      <div
        className="relative py-12 sm:py-20"
        style={{
          transform: "skewY(-5deg) scale(1.05)",
          transformOrigin: "center center",
        }}
      >
        {/* Ambient glow effects — plum palette */}
        <div className="hidden sm:block absolute -inset-20 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-plum/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-plum-tint/20 rounded-full blur-[100px]" />
        </div>

        {/* Top row — slides left */}
        <div className="mb-4 sm:mb-8">
          <InfiniteSlider duration={40} gap={24} className="overflow-visible">
            {topRowImages.map((image) => (
              <div
                key={`top-${image.id}`}
                className="flex-shrink-0 group"
                style={{ transform: "skewY(5deg)" }}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-plum/20">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={400}
                    className="w-[160px] sm:w-[260px] md:w-[300px] h-[220px] sm:h-[360px] md:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </InfiniteSlider>
        </div>

        {/* Bottom row — slides right */}
        <div>
          <InfiniteSlider duration={45} gap={24} reverse className="overflow-visible">
            {bottomRowImages.map((image) => (
              <div
                key={`bottom-${image.id}`}
                className="flex-shrink-0 group"
                style={{ transform: "skewY(5deg)" }}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-plum/20">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={400}
                    className="w-[160px] sm:w-[260px] md:w-[300px] h-[220px] sm:h-[360px] md:h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </div>
  );
}
