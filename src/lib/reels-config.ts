/** Metadata for a single vertical video reel */
export interface ReelConfig {
  id: string;
  /** Full CDN URL to the mp4 */
  src: string;
  title: string;
  branch: string;
  region: string;
}

const CDN_BASE = "https://globalreels.winnerschapelsudbury.org/videos";

export const REELS: ReelConfig[] = [
  {
    id: "hope-crusade-dami-ajala",
    src: `${CDN_BASE}/hope-crusade-pastor-dami-ajala.mp4`,
    title: "Hope Crusade Highlight",
    branch: "Pastor Dami Ajala",
    region: "Africa",
  },
  {
    id: "hope-crusade-deacon-olushola",
    src: `${CDN_BASE}/hope-crusade-deacon-olushola.mp4`,
    title: "Hope Crusade Moment",
    branch: "Deacon Olushola",
    region: "Africa",
  },
  {
    id: "hope-crusade-david-ekwueme",
    src: `${CDN_BASE}/hope-crusade-pastor-david-ekwueme.mp4`,
    title: "Hope Crusade Word",
    branch: "Pastor David Ekwueme",
    region: "Africa",
  },
  {
    id: "ayac-2025-spirit-tunnel",
    src: `${CDN_BASE}/ayac-2025-spirit-tunnel.mp4`,
    title: "Spirit Tunnel",
    branch: "AYAC 2025",
    region: "Africa",
  },
  {
    id: "ayac-2025-thats-a-wrap",
    src: `${CDN_BASE}/ayac-2025-thats-a-wrap.mp4`,
    title: "That's a Wrap!",
    branch: "AYAC 2025",
    region: "Africa",
  },
  {
    id: "ayac-europe-2025-mte",
    src: `${CDN_BASE}/ayac-europe-2025-mte.mp4`,
    title: "MTE Highlights",
    branch: "AYAC Europe 2025",
    region: "Europe",
  },
  {
    id: "ayac-europe-2025-congrats",
    src: `${CDN_BASE}/ayac-europe-2025-congratulations.mp4`,
    title: "Congratulations!",
    branch: "AYAC Europe 2025",
    region: "Europe",
  },
  {
    id: "bible-trivia-praise",
    src: `${CDN_BASE}/bible-trivia-praise-until-shiloh.mp4`,
    title: "Praise Until Shiloh",
    branch: "Bible Trivia",
    region: "Global",
  },
  {
    id: "christian-but-trend",
    src: `${CDN_BASE}/christian-but-trend.mp4`,
    title: "Christian But...",
    branch: "Youth Alive",
    region: "Global",
  },
  {
    id: "fasting-skit-reminder",
    src: `${CDN_BASE}/fasting-skit-reminder.mp4`,
    title: "Fasting Reminder",
    branch: "Youth Alive",
    region: "Global",
  },
  {
    id: "shabach-prayer-praise",
    src: `${CDN_BASE}/shabach-brother-prayer-praise.mp4`,
    title: "Prayer & Praise",
    branch: "Shabach",
    region: "Africa",
  },
  {
    id: "yaf-monthly-service",
    src: `${CDN_BASE}/yaf-monthly-service-promo.mp4`,
    title: "Monthly Service Promo",
    branch: "YAF",
    region: "Global",
  },
  {
    id: "yaf-breaking-cycles",
    src: `${CDN_BASE}/yaf-breaking-cycles-valentines.mp4`,
    title: "Breaking Cycles",
    branch: "YAF Valentines",
    region: "Global",
  },
  {
    id: "youth-aflame-promo",
    src: `${CDN_BASE}/youth-aflame-promo.mp4`,
    title: "Youth Aflame Promo",
    branch: "Youth Aflame",
    region: "North America",
  },
  {
    id: "worst-dates-church",
    src: `${CDN_BASE}/worst-dates-church-edition.mp4`,
    title: "Worst Dates: Church Edition",
    branch: "Youth Alive",
    region: "Global",
  },
  {
    id: "untitled-clip",
    src: `${CDN_BASE}/untitled-clip.mp4`,
    title: "Quick Clip",
    branch: "Youth Alive",
    region: "Global",
  },
  {
    id: "untitled-2026",
    src: `${CDN_BASE}/untitled-2026-02-19.mp4`,
    title: "Fresh Drop",
    branch: "Youth Alive",
    region: "Global",
  },
];

/** Fisher-Yates shuffle — returns a new array */
export function shuffleReels(reels: ReelConfig[]): ReelConfig[] {
  const shuffled = [...reels];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
