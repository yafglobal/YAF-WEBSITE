"use client";

import Image from "next/image";
import { InfiniteSlider } from "./infinite-slider";

// Gallery images from global YAG assets, UKYAF / AYAC Europe, and YAF Canada
const galleryImages = [
  { id: "1", src: "/images/slider-1.jpeg", alt: "Youth worship gathering" },
  { id: "2", src: "/ukyaf/ayac-praise-singer.png", alt: "AYAC Europe praise singer" },
  {
    id: "3",
    src: "/yaf-canada/youth-hands-raised-worship.jpg",
    alt: "YAF Canada youth with hands raised in worship",
  },
  { id: "4", src: "/images/slider-2.jpeg", alt: "Youth fellowship event" },
  {
    id: "5",
    src: "/ukyaf/youth-fellowship-friends.png",
    alt: "Youth fellowship friends at Winners Middlesbrough",
  },
  {
    id: "6",
    src: "/yaf-canada/worship-leader-singing.jpg",
    alt: "YAF Canada worship leader singing",
  },
  { id: "7", src: "/images/slider-3.jpeg", alt: "Youth conference session" },
  { id: "8", src: "/ukyaf/ayac-keyboardist.png", alt: "AYAC Europe Sure Foundation keyboardist" },
  {
    id: "9",
    src: "/yaf-canada/smiling-friends-audience.jpg",
    alt: "Smiling friends in YAF Canada audience",
  },
  { id: "10", src: "/images/slider-4.jpeg", alt: "Youth praise and worship" },
  { id: "11", src: "/ukyaf/joyful-praise-gathering.png", alt: "Joyful praise gathering" },
  {
    id: "12",
    src: "/yaf-canada/bible-reading-closeup.jpg",
    alt: "Youth reading Bible during service",
  },
  { id: "13", src: "/images/slider-5.jpeg", alt: "Youth community outreach" },
  { id: "14", src: "/ukyaf/ayac-worship-leader.png", alt: "AYAC Europe worship leader" },
  {
    id: "15",
    src: "/yaf-canada/pastor-preaching-wide.jpg",
    alt: "Pastor preaching at YAF Canada conference",
  },
  { id: "16", src: "/images/community-bg.jpg", alt: "Community fellowship moment" },
  { id: "17", src: "/ukyaf/ayac-europe-speaker.png", alt: "AYAC Europe Sure Foundation speaker" },
  { id: "18", src: "/yaf-canada/worship-duo-stage.jpg", alt: "Worship duo on stage at YAF Canada" },
  { id: "19", src: "/images/about/worship-portrait.png", alt: "Worship portrait" },
  { id: "20", src: "/ukyaf/ayac-prayer-moment.png", alt: "AYAC Europe prayer moment" },
  { id: "21", src: "/yaf-canada/youth-in-prayer.jpg", alt: "Youth in prayer at YAF Canada" },
  { id: "22", src: "/images/about/fellowship-photo.png", alt: "Fellowship gathering" },
  { id: "23", src: "/ukyaf/ayac-worship-vocalist.png", alt: "AYAC Europe worship vocalist" },
  {
    id: "24",
    src: "/yaf-canada/panel-discussion-stage.jpg",
    alt: "Panel discussion at YAF Canada conference",
  },
  { id: "25", src: "/images/about/hero-bg.jpg", alt: "Youth alive conference" },
  {
    id: "26",
    src: "/ukyaf/southampton-congregation-worship.jpg",
    alt: "Southampton congregation in worship",
  },
  {
    id: "27",
    src: "/yaf-canada/youth-sisters-listening.jpg",
    alt: "Young women listening at YAF Canada",
  },
  { id: "28", src: "/images/sermon-image.png", alt: "Youth sermon session" },
  {
    id: "29",
    src: "/ukyaf/youth-worship-hands-raised.png",
    alt: "Youth worship with hands raised",
  },
  {
    id: "30",
    src: "/yaf-canada/pastor-colorful-backdrop.jpg",
    alt: "Pastor speaking with colorful backdrop",
  },
  { id: "31", src: "/ukyaf/ayac-prayer-session.png", alt: "AYAC Europe prayer session" },
  {
    id: "32",
    src: "/yaf-canada/peaceful-worship-moment.jpg",
    alt: "Peaceful worship moment at YAF Canada",
  },
  { id: "33", src: "/yaf-canada/women-in-worship.jpg", alt: "Women in worship at YAF Canada" },
  { id: "34", src: "/yaf-canada/youth-taking-notes.jpg", alt: "Youth taking notes during service" },
  {
    id: "35",
    src: "/yaf-canada/female-presenter-stage.jpg",
    alt: "Female presenter on stage at YAF Canada",
  },
  {
    id: "36",
    src: "/yaf-canada/youth-standing-worship.jpg",
    alt: "Youth standing in worship at Winners Chapel",
  },
  {
    id: "37",
    src: "/yaf-canada/choir-leader-band.jpg",
    alt: "Choir leader with band at YAF Canada",
  },
  {
    id: "38",
    src: "/yaf-canada/senior-pastor-stage.jpg",
    alt: "Senior pastor on stage at YAF Canada",
  },
  {
    id: "39",
    src: "/yaf-canada/youth-fellowship-speaker.jpg",
    alt: "Youth fellowship speaker at YAF Canada",
  },
  {
    id: "40",
    src: "/yaf-canada/youth-member-portrait.jpg",
    alt: "Youth member portrait at YAF Canada",
  },
  {
    id: "41",
    src: "/yaf-canada/worship-portrait-closeup.jpg",
    alt: "Worship portrait closeup at YAF Canada",
  },
  {
    id: "42",
    src: "/yaf-canada/stage-speaker-portrait.jpg",
    alt: "Stage speaker portrait at YAF Canada",
  },
  {
    id: "43",
    src: "/yaf-canada/senior-pastor-closeup.jpg",
    alt: "Senior pastor closeup at YAF Canada",
  },
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
