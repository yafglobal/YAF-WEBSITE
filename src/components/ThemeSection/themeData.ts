export const theme2026 = {
  title: "Open Doors",
  subtitle: "2026 Global Church Theme",
  description:
    "God sets before every Winner a supernatural open door that no man, no circumstance, and no demonic opposition can shut, especially in areas of destiny, career, family, and ministry.",
  verse:
    "And to the angel of the church in Philadelphia write; These things saith he that is holy, he that is true, he that hath the key of David, he that openeth, and no man shutteth; and shutteth, and no man openeth; I know thy works: behold, I have set before thee an open door, and no man can shut it.",
  reference: "Revelation 3:7-8",
  image: "/images/open-doors-2026.png",
  highlights: [
    "Supernatural Access",
    "Divine Favour",
    "Breakthrough & Promotion",
    "New Realms of Opportunity",
  ],
  requirements: {
    intro:
      "In 2026, there are two things you must not forget in order to maintain your open doors:",
    items: ["Remember to keep God's Word", "Refuse to deny His name"],
  },
};

export interface YouthTheme {
  region: string;
  flag: string;
  title: string;
  subtitle: string;
  description: string;
  verse: string;
  reference: string;
  image: string;
  /** CSS aspect-ratio value matching the image's natural proportions */
  imageAspect: string;
  highlights: string[];
  /** Two key pillars displayed as bento cards */
  pillars: { title: string; accent: string; body: string }[];
  /** Short mission statement for the accent card */
  mission: string;
}

export const youthThemes2025: YouthTheme[] = [
  {
    region: "Nigeria",
    flag: "🇳🇬",
    title: "Built to Last",
    subtitle: "Youth Alive Nigeria — 2025 Theme",
    description:
      "A prophetic charge to build with intentionality — rooted in faith, fortified by the wisdom of God, and designed to withstand every storm.",
    verse:
      "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock: And the rain descended, and the floods came, and the winds blew, and beat upon that house; and it fell not: for it was founded upon a rock.",
    reference: "Matthew 7:24-25",
    image: "/themes/builttolast.png",
    imageAspect: "2042/1404",
    highlights: [
      "Enduring Faith",
      "Purposeful Living",
      "Unshakeable Identity",
      "Generational Impact",
    ],
    pillars: [
      {
        title: "Build Deep",
        accent: "Foundations",
        body: "Go beyond surface-level faith. Invest in the Word, in prayer, and in spiritual disciplines that forge unshakeable character.",
      },
      {
        title: "Build Right",
        accent: "Integrity",
        body: "Align every pursuit with God's blueprint — career, relationships, and ministry built on honesty, excellence, and obedience.",
      },
    ],
    mission:
      "This generation is called to build structures that outlast trends, outlive opposition, and stand as a testimony for generations to come.",
  },
  {
    region: "North America",
    flag: "🇺🇸",
    title: "Sure Foundation",
    subtitle: "Youth Alive North America — 2025 Theme",
    description:
      "A rallying cry to stand firm on the only foundation that guarantees lasting success — Jesus Christ, the Rock that cannot be moved.",
    verse: "For other foundation can no man lay than that is laid, which is Jesus Christ.",
    reference: "1 Corinthians 3:11",
    image: "/themes/surefoundation.png",
    imageAspect: "1718/952",
    highlights: ["Rooted in Christ", "Unshakeable Purpose", "Bold Faith", "Kingdom Excellence"],
    pillars: [
      {
        title: "Anchored",
        accent: "Identity",
        body: "In a world of shifting values, your identity is settled in Christ — not in culture, career titles, or social validation.",
      },
      {
        title: "Unstoppable",
        accent: "Purpose",
        body: "When your foundation is sure, every academic, professional, and spiritual pursuit is backed by divine guarantee.",
      },
    ],
    mission:
      "Young people across North America are being called to anchor their lives on Christ and build boldly in a season of unprecedented opportunity.",
  },
];
