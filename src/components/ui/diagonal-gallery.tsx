"use client";

import Image from "next/image";
import { InfiniteSlider } from "./infinite-slider";

// Gallery images: YAG global, UKYAF/AYAC Europe, YAF Canada, USA YAF/AYAC USA
const galleryImages = [
  // --- Row mix: Global, UK, Canada, USA spread evenly ---
  { id: "1", src: "/images/slider-1.jpeg", alt: "Youth worship gathering" },
  { id: "2", src: "/ukyaf/ayac-praise-singer.webp", alt: "AYAC Europe praise singer" },
  {
    id: "3",
    src: "/yaf-canada/youth-hands-raised-worship.webp",
    alt: "YAF Canada youth with hands raised in worship",
  },
  {
    id: "4",
    src: "/usayaf/praise-night-worship-leader.webp",
    alt: "AYAC USA Sure Foundation praise night worship leader",
  },
  { id: "5", src: "/images/slider-2.jpeg", alt: "Youth fellowship event" },
  {
    id: "6",
    src: "/ukyaf/youth-fellowship-friends.webp",
    alt: "Youth fellowship friends at Winners Middlesbrough",
  },
  {
    id: "7",
    src: "/yaf-canada/worship-leader-singing.webp",
    alt: "YAF Canada worship leader singing",
  },
  {
    id: "8",
    src: "/usayaf/crowd-worship-phones-up.webp",
    alt: "AYAC USA crowd worshipping with phones raised",
  },
  { id: "9", src: "/images/slider-3.jpeg", alt: "Youth conference session" },
  { id: "10", src: "/ukyaf/ayac-keyboardist.webp", alt: "AYAC Europe Sure Foundation keyboardist" },
  {
    id: "11",
    src: "/yaf-canada/smiling-friends-audience.webp",
    alt: "Smiling friends in YAF Canada audience",
  },
  {
    id: "12",
    src: "/usayaf/worship-team-white-outfits.webp",
    alt: "AYAC USA worship team in white on stage",
  },
  { id: "13", src: "/images/slider-4.jpeg", alt: "Youth praise and worship" },
  { id: "14", src: "/ukyaf/joyful-praise-gathering.webp", alt: "Joyful praise gathering" },
  {
    id: "15",
    src: "/yaf-canada/bible-reading-closeup.webp",
    alt: "Youth reading Bible during service",
  },
  {
    id: "16",
    src: "/usayaf/woman-open-hands-worship.webp",
    alt: "Woman in open-handed worship at AYAC USA",
  },
  { id: "17", src: "/images/slider-5.jpeg", alt: "Youth community outreach" },
  { id: "18", src: "/ukyaf/ayac-worship-leader.webp", alt: "AYAC Europe worship leader" },
  {
    id: "19",
    src: "/yaf-canada/pastor-preaching-wide.webp",
    alt: "Pastor preaching at YAF Canada conference",
  },
  {
    id: "20",
    src: "/usayaf/leaders-standing-ovation.webp",
    alt: "Leaders standing in worship at AYAC USA",
  },
  { id: "21", src: "/images/community-bg.jpg", alt: "Community fellowship moment" },
  { id: "22", src: "/ukyaf/ayac-europe-speaker.webp", alt: "AYAC Europe Sure Foundation speaker" },
  {
    id: "23",
    src: "/yaf-canada/worship-duo-stage.webp",
    alt: "Worship duo on stage at YAF Canada",
  },
  {
    id: "24",
    src: "/usayaf/praise-night-singer-laughing.webp",
    alt: "Singer laughing at AYAC USA praise night",
  },
  { id: "25", src: "/images/about/worship-portrait.png", alt: "Worship portrait" },
  { id: "26", src: "/ukyaf/ayac-prayer-moment.webp", alt: "AYAC Europe prayer moment" },
  { id: "27", src: "/yaf-canada/youth-in-prayer.webp", alt: "Youth in prayer at YAF Canada" },
  {
    id: "28",
    src: "/usayaf/pastor-white-outfit-preaching.webp",
    alt: "Pastor in white preaching at AYAC USA",
  },
  { id: "29", src: "/images/about/fellowship-photo.png", alt: "Fellowship gathering" },
  { id: "30", src: "/ukyaf/ayac-worship-vocalist.webp", alt: "AYAC Europe worship vocalist" },
  {
    id: "31",
    src: "/yaf-canada/panel-discussion-stage.webp",
    alt: "Panel discussion at YAF Canada conference",
  },
  {
    id: "32",
    src: "/usayaf/worship-singers-stage.webp",
    alt: "Worship singers on stage at AYAC USA",
  },
  { id: "33", src: "/images/about/hero-bg.jpg", alt: "Youth alive conference" },
  {
    id: "34",
    src: "/ukyaf/southampton-congregation-worship.webp",
    alt: "Southampton congregation in worship",
  },
  {
    id: "35",
    src: "/yaf-canada/youth-sisters-listening.webp",
    alt: "Young women listening at YAF Canada",
  },
  {
    id: "36",
    src: "/usayaf/crowd-hands-phones-praise.webp",
    alt: "Crowd with hands and phones up at AYAC USA",
  },
  { id: "37", src: "/images/sermon-image.png", alt: "Youth sermon session" },
  {
    id: "38",
    src: "/ukyaf/youth-worship-hands-raised.webp",
    alt: "Youth worship with hands raised",
  },
  {
    id: "39",
    src: "/yaf-canada/pastor-colorful-backdrop.webp",
    alt: "Pastor speaking with colorful backdrop",
  },
  { id: "40", src: "/usayaf/singer-haze-stage.webp", alt: "Singer on hazy stage at AYAC USA" },
  { id: "41", src: "/ukyaf/ayac-prayer-session.webp", alt: "AYAC Europe prayer session" },
  {
    id: "42",
    src: "/yaf-canada/peaceful-worship-moment.webp",
    alt: "Peaceful worship moment at YAF Canada",
  },
  {
    id: "43",
    src: "/usayaf/pastor-at-podium.webp",
    alt: "Pastor at podium during AYAC USA Sure Foundation",
  },
  {
    id: "44",
    src: "/usayaf/worship-duo-hands-raised.webp",
    alt: "Worship duo with hands raised at AYAC USA",
  },
  { id: "45", src: "/yaf-canada/women-in-worship.webp", alt: "Women in worship at YAF Canada" },
  {
    id: "46",
    src: "/usayaf/pastor-red-tie-smiling.webp",
    alt: "Pastor smiling in red tie at AYAC USA",
  },
  {
    id: "47",
    src: "/yaf-canada/youth-taking-notes.webp",
    alt: "Youth taking notes during service",
  },
  { id: "48", src: "/usayaf/woman-clapping-joy.webp", alt: "Woman clapping with joy at AYAC USA" },
  {
    id: "49",
    src: "/yaf-canada/female-presenter-stage.webp",
    alt: "Female presenter on stage at YAF Canada",
  },
  {
    id: "50",
    src: "/usayaf/pastor-and-youth-podium.webp",
    alt: "Pastor and youth at podium at AYAC USA",
  },
  {
    id: "51",
    src: "/yaf-canada/youth-standing-worship.webp",
    alt: "Youth standing in worship at Winners Chapel",
  },
  {
    id: "52",
    src: "/usayaf/praise-night-joyful-moment.webp",
    alt: "Joyful moment at AYAC USA praise night",
  },
  {
    id: "53",
    src: "/yaf-canada/choir-leader-band.webp",
    alt: "Choir leader with band at YAF Canada",
  },
  {
    id: "54",
    src: "/usayaf/woman-reading-bible-service.webp",
    alt: "Woman reading Bible during AYAC USA service",
  },
  {
    id: "55",
    src: "/yaf-canada/senior-pastor-stage.webp",
    alt: "Senior pastor on stage at YAF Canada",
  },
  {
    id: "56",
    src: "/yaf-canada/youth-fellowship-speaker.webp",
    alt: "Youth fellowship speaker at YAF Canada",
  },
  {
    id: "57",
    src: "/yaf-canada/youth-member-portrait.webp",
    alt: "Youth member portrait at YAF Canada",
  },
  {
    id: "58",
    src: "/yaf-canada/worship-portrait-closeup.webp",
    alt: "Worship portrait closeup at YAF Canada",
  },
  {
    id: "59",
    src: "/yaf-canada/stage-speaker-portrait.webp",
    alt: "Stage speaker portrait at YAF Canada",
  },
  {
    id: "60",
    src: "/yaf-canada/senior-pastor-closeup.webp",
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
          <InfiniteSlider duration={120} gap={24} className="overflow-visible">
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
          <InfiniteSlider duration={130} gap={24} reverse className="overflow-visible">
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
