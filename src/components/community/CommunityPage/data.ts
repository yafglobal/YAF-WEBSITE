export interface ContinentImage {
  src: string;
  alt: string;
}

export interface ContinentData {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  locationName: string;
  address: string;
  mapUrl: string;
  images: ContinentImage[];
}

export const continents: ContinentData[] = [
  {
    id: "africa",
    name: "Africa",
    region: "Headquarters",
    tagline: "Where the Fire Began",
    description:
      "The birthplace of Youth Alive — Canaanland, Nigeria. Our global headquarters where the movement ignited, fueling a generation with purpose, faith, and an unquenchable fire.",
    locationName: "Global Youth Headquarters",
    address: "Global Youth Office, Living Faith Church, Canaanland, Ota, Nigeria",
    mapUrl: "https://maps.google.com/?q=Living+Faith+Church+Canaanland+Ota+Nigeria",
    images: [
      {
        src: "/images/community-bg.jpg",
        alt: "Youth Alive community gathering in Africa",
      },
      { src: "/images/slider-1.jpeg", alt: "Youth worship at Canaanland" },
      {
        src: "/images/slider-2.jpeg",
        alt: "Youth Alive conference in Nigeria",
      },
      {
        src: "/images/slider-3.jpeg",
        alt: "Fellowship at Living Faith Church",
      },
      {
        src: "/images/about/fellowship-photo.png",
        alt: "Youth fellowship gathering",
      },
      {
        src: "/images/about/worship-portrait.png",
        alt: "Worship moment at conference",
      },
      { src: "/images/slider-4.jpeg", alt: "Youth conference event" },
    ],
  },
  {
    id: "europe",
    name: "Europe",
    region: "United Kingdom",
    tagline: "Burning Across Borders",
    description:
      "From the UK to the continent, Youth Alive Europe is igniting a generation across borders — with faith, community, and purpose-driven fellowship that knows no boundaries.",
    locationName: "AYAC Europe Centre",
    address: "1 Churchill Cl, Green Street Green Rd, Dartford DA1 1QE, United Kingdom",
    mapUrl:
      "https://maps.google.com/?q=1+Churchill+Cl+Green+Street+Green+Rd+Dartford+DA1+1QE+United+Kingdom",
    images: [
      {
        src: "/ukyaf/joyful-praise-gathering.webp",
        alt: "Joyful praise gathering in the UK",
      },
      {
        src: "/ukyaf/ayac-europe-speaker.webp",
        alt: "AYAC Europe speaker on stage",
      },
      {
        src: "/ukyaf/youth-worship-hands-raised.webp",
        alt: "Youth worship with hands raised",
      },
      {
        src: "/ukyaf/ayac-worship-leader.webp",
        alt: "AYAC worship leader performing",
      },
      {
        src: "/ukyaf/southampton-congregation-worship.webp",
        alt: "Southampton congregation in worship",
      },
      {
        src: "/ukyaf/ayac-prayer-moment.webp",
        alt: "Prayer moment at AYAC Europe",
      },
      {
        src: "/ukyaf/youth-fellowship-friends.webp",
        alt: "Youth fellowship friends together",
      },
    ],
  },
  {
    id: "usa",
    name: "United States",
    region: "North America",
    tagline: "Ablaze in America",
    description:
      "Youth Alive USA is transforming young lives coast to coast — through faith-driven community, career empowerment, and fellowship that propels a generation forward.",
    locationName: "YAF USA Centre",
    address: "4825 Glenn Dale Rd, Bowie, MD 20720, United States",
    mapUrl: "https://maps.google.com/?q=4825+Glenn+Dale+Rd+Bowie+MD+20720+United+States",
    images: [
      {
        src: "/usayaf/crowd-hands-phones-praise.webp",
        alt: "Crowd with hands and phones raised in praise",
      },
      {
        src: "/usayaf/pastor-white-outfit-preaching.webp",
        alt: "Pastor preaching at YAF USA",
      },
      {
        src: "/usayaf/praise-night-joyful-moment.webp",
        alt: "Joyful moment during praise night",
      },
      {
        src: "/usayaf/worship-team-white-outfits.webp",
        alt: "Worship team performing on stage",
      },
      {
        src: "/usayaf/woman-open-hands-worship.webp",
        alt: "Woman worshipping with open hands",
      },
      {
        src: "/usayaf/praise-night-worship-leader.webp",
        alt: "Worship leader during praise night",
      },
      {
        src: "/usayaf/singer-haze-stage.webp",
        alt: "Singer performing on stage with haze",
      },
    ],
  },
  {
    id: "canada",
    name: "Canada",
    region: "North America",
    tagline: "Northern Fire",
    description:
      "From Mississauga to communities across the country, Youth Alive Canada is building a vibrant network of young believers united in faith, purpose, and relentless pursuit.",
    locationName: "YAF Canada Centre",
    address: "1093 Meyerside Dr Unit 2, Mississauga, ON L5T 1J6, Canada",
    mapUrl: "https://maps.google.com/?q=1093+Meyerside+Dr+Unit+2+Mississauga+ON+L5T+1J6+Canada",
    images: [
      {
        src: "/yaf-canada/youth-hands-raised-worship.webp",
        alt: "Youth with hands raised in worship",
      },
      {
        src: "/yaf-canada/female-presenter-stage.webp",
        alt: "Female presenter on stage",
      },
      {
        src: "/yaf-canada/choir-leader-band.webp",
        alt: "Choir leader with band",
      },
      {
        src: "/yaf-canada/smiling-friends-audience.webp",
        alt: "Smiling friends in audience",
      },
      {
        src: "/yaf-canada/worship-duo-stage.webp",
        alt: "Worship duo performing on stage",
      },
      {
        src: "/yaf-canada/youth-taking-notes.webp",
        alt: "Youth taking notes during session",
      },
      {
        src: "/yaf-canada/peaceful-worship-moment.webp",
        alt: "Peaceful worship moment",
      },
    ],
  },
];
