export interface BranchImage {
  src: string;
  alt: string;
  objectPosition?: string;
}

export interface BranchConfig {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  /** All-caps label for FlowingMenu */
  menuLabel: string;
  /** Abbreviated watermark for hero (e.g., "AF") */
  watermark: string;
  heroImage: string;
  menuImage: string;
  locationName: string;
  address: string;
  mapUrl: string;
  serviceTime: string;
  /** Link to the watch page for this branch */
  watchHref: string;
  images: BranchImage[];
}

export const BRANCHES: BranchConfig[] = [
  {
    slug: "africa",
    name: "Africa",
    region: "Headquarters",
    tagline: "Where the Fire Began",
    description:
      "The birthplace of Youth Alive — Canaanland, Nigeria. Our global headquarters where the movement ignited, fueling a generation with purpose, faith, and an unquenchable fire.",
    menuLabel: "AFRICA",
    watermark: "AF",
    heroImage: "/images/community-bg.jpg",
    menuImage: "/images/slider-1.jpeg",
    locationName: "Global Youth Headquarters",
    address: "Global Youth Office, Living Faith Church, Canaanland, Ota, Nigeria",
    mapUrl: "https://maps.google.com/?q=Living+Faith+Church+Canaanland+Ota+Nigeria",
    serviceTime: "Sundays",
    watchHref: "/watch/africa",
    images: [
      { src: "/images/community-bg.jpg", alt: "Youth Alive community gathering in Africa" },
      { src: "/images/slider-1.jpeg", alt: "Youth worship at Canaanland" },
      { src: "/images/slider-3.jpeg", alt: "Fellowship at Living Faith Church" },
      { src: "/images/about/fellowship-photo.png", alt: "Youth fellowship gathering" },
      {
        src: "/images/about/worship-portrait.png",
        alt: "Youth worshipper at Canaanland",
        objectPosition: "center 15%",
      },
      { src: "/images/slider-5.jpeg", alt: "Youth conference worship moment" },
      { src: "/images/slider-4.jpeg", alt: "Youth conference event" },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    region: "United Kingdom",
    tagline: "Burning Across Borders",
    description:
      "From the UK to the continent, Youth Alive Europe is igniting a generation across borders — with faith, community, and purpose-driven fellowship that knows no boundaries.",
    menuLabel: "EUROPE",
    watermark: "EU",
    heroImage: "/ukyaf/joyful-praise-gathering.webp",
    menuImage: "/ukyaf/youth-worship-hands-raised.webp",
    locationName: "AYAC Europe Centre",
    address: "1 Churchill Cl, Green Street Green Rd, Dartford DA1 1QE, United Kingdom",
    mapUrl:
      "https://maps.google.com/?q=1+Churchill+Cl+Green+Street+Green+Rd+Dartford+DA1+1QE+United+Kingdom",
    serviceTime: "Sundays",
    watchHref: "/watch/europe",
    images: [
      { src: "/ukyaf/joyful-praise-gathering.webp", alt: "Joyful praise gathering in the UK" },
      { src: "/ukyaf/youth-worship-hands-raised.webp", alt: "Youth worship with hands raised" },
      { src: "/ukyaf/youth-fellowship-friends.webp", alt: "Youth fellowship friends together" },
      {
        src: "/ukyaf/ayac-worship-leader.webp",
        alt: "AYAC worship leader performing",
        objectPosition: "center top",
      },
      {
        src: "/ukyaf/ayac-worship-vocalist.webp",
        alt: "Worship vocalist at AYAC Europe",
        objectPosition: "center top",
      },
      {
        src: "/ukyaf/southampton-congregation-worship.webp",
        alt: "Southampton congregation in worship",
      },
      {
        src: "/ukyaf/ayac-keyboardist.webp",
        alt: "Keyboardist at AYAC Europe worship",
        objectPosition: "center top",
      },
    ],
  },
  {
    slug: "usa",
    name: "United States",
    region: "North America",
    tagline: "Ablaze in America",
    description:
      "Youth Alive USA is transforming young lives coast to coast — through faith-driven community, career empowerment, and fellowship that propels a generation forward.",
    menuLabel: "USA",
    watermark: "US",
    heroImage: "/usayaf/crowd-hands-phones-praise.webp",
    menuImage: "/usayaf/pastor-white-outfit-preaching.webp",
    locationName: "YAF USA Centre",
    address: "4825 Glenn Dale Rd, Bowie, MD 20720, United States",
    mapUrl: "https://maps.google.com/?q=4825+Glenn+Dale+Rd+Bowie+MD+20720+United+States",
    serviceTime: "Sundays",
    watchHref: "/watch/north-america",
    images: [
      // ── Bento hero (slot 0 — large, landscape) ──────────────────────────
      {
        src: "/usayaf/newusatwo/108A2860-Enhanced-NR.jpg",
        alt: "YAF USA community gathered inside the venue",
        objectPosition: "center 40%",
      },
      // ── Bento squares (slots 1–2) ────────────────────────────────────────
      {
        src: "/usayaf/newusatwo/85127808.png",
        alt: "Crowd with hands raised at YAF USA praise night",
        objectPosition: "center 20%",
      },
      {
        src: "/usayaf/newusatwo/85123194.png",
        alt: "Two young women smiling at YAF USA",
        objectPosition: "center 20%",
      },
      // ── Bento wide rows (slots 3–4) ──────────────────────────────────────
      {
        src: "/usayaf/newusatwo/108A2729.jpg",
        alt: "YAF USA youth group celebrating outside at night",
        objectPosition: "center 45%",
      },
      {
        src: "/usayaf/newusatwo/85105618.jpg",
        alt: "Kingdom Giants crew representing YAF USA outdoors",
        objectPosition: "center 30%",
      },
      // ── Bento squares (slots 5–6) ────────────────────────────────────────
      {
        src: "/usayaf/newusatwo/85127670.png",
        alt: "Three young women jumping with joy at YAF USA",
        objectPosition: "center top",
      },
      {
        src: "/usayaf/newusatwo/85127642.png",
        alt: "Three young men in Kingdom Giant tees at YAF USA",
        objectPosition: "center 20%",
      },
      // ── Lightbox-only extras ─────────────────────────────────────────────
      {
        src: "/usayaf/newusatwo/85122861.png",
        alt: "Young man in a powerful moment of worship",
        objectPosition: "center 20%",
      },
      {
        src: "/usayaf/newusatwo/85123166.png",
        alt: "Three friends smiling together at YAF USA",
        objectPosition: "center 25%",
      },
      {
        src: "/usayaf/newusatwo/85124954.png",
        alt: "Men worshipping in black and white",
        objectPosition: "center 25%",
      },
      {
        src: "/usayaf/newusatwo/85124967.png",
        alt: "Woman in white dress bowed in worship under stage lights",
        objectPosition: "center 30%",
      },
      {
        src: "/usayaf/newusatwo/85127623.png",
        alt: "Three women in Kingdom Giant tees at community outreach",
        objectPosition: "center 20%",
      },
      // ── Existing images (lightbox) ───────────────────────────────────────
      {
        src: "/usayaf/crowd-hands-phones-praise.webp",
        alt: "Crowd with hands and phones raised in praise",
        objectPosition: "center 55%",
      },
      {
        src: "/usayaf/pastor-white-outfit-preaching.webp",
        alt: "Pastor preaching at YAF USA",
        objectPosition: "center 25%",
      },
      {
        src: "/usayaf/praise-night-joyful-moment.webp",
        alt: "Joyful moment during praise night",
        objectPosition: "center 20%",
      },
      {
        src: "/usayaf/worship-duo-hands-raised.webp",
        alt: "Worship duo with hands raised on stage",
        objectPosition: "center 35%",
      },
      {
        src: "/usayaf/woman-open-hands-worship.webp",
        alt: "Woman worshipping with open hands",
        objectPosition: "center 40%",
      },
      {
        src: "/usayaf/praise-night-worship-leader.webp",
        alt: "Worship leader during praise night",
        objectPosition: "center 30%",
      },
      {
        src: "/usayaf/woman-clapping-joy.webp",
        alt: "Woman clapping with joy during service",
        objectPosition: "center 40%",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    tagline: "Northern Fire",
    description:
      "From Mississauga to communities across the country, Youth Alive Canada is building a vibrant network of young believers united in faith, purpose, and relentless pursuit.",
    menuLabel: "CANADA",
    watermark: "CA",
    heroImage: "/yaf-canada/youth-hands-raised-worship.webp",
    menuImage: "/yaf-canada/stage-speaker-portrait.webp",
    locationName: "YAF Canada Centre",
    address: "1093 Meyerside Dr Unit 2, Mississauga, ON L5T 1J6, Canada",
    mapUrl: "https://maps.google.com/?q=1093+Meyerside+Dr+Unit+2+Mississauga+ON+L5T+1J6+Canada",
    serviceTime: "Sundays, 12:00 PM",
    watchHref: "/watch/north-america",
    images: [
      {
        src: "/yaf-canada/youth-hands-raised-worship.webp",
        alt: "Youth with hands raised in worship",
      },
      {
        src: "/yaf-canada/senior-pastor-closeup.webp",
        alt: "National Pastor of Canada",
        objectPosition: "center 20%",
      },
      {
        src: "/yaf-canada/choir-leader-band.webp",
        alt: "Choir leader with band",
        objectPosition: "center 35%",
      },
      { src: "/yaf-canada/smiling-friends-audience.webp", alt: "Smiling friends in audience" },
      {
        src: "/yaf-canada/worship-duo-stage.webp",
        alt: "Worship duo performing on stage",
        objectPosition: "center 30%",
      },
      { src: "/yaf-canada/youth-in-prayer.webp", alt: "Youth in prayer during service" },
      { src: "/yaf-canada/peaceful-worship-moment.webp", alt: "Peaceful worship moment" },
    ],
  },
];

export function getBranchBySlug(slug: string): BranchConfig | undefined {
  return BRANCHES.find((b) => b.slug === slug);
}
