import { Cross, Briefcase, MusicNote, BookOpen, Handshake } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

export interface Offering {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: Icon;
  color: string;
  glowColor: string;
}

export const offerings: Offering[] = [
  {
    id: "spiritual",
    number: "01",
    title: "Spiritual Edification",
    subtitle: "Rooted in the Word",
    description:
      "Encounter the depths of God's word through powerful sermons, Bible study sessions, and life-transforming altar calls. Build an unshakeable foundation of faith.",
    icon: Cross,
    color: "from-fire to-fire-light",
    glowColor: "rgba(255, 77, 0, 0.15)",
  },
  {
    id: "career",
    number: "02",
    title: "Career Advancement",
    subtitle: "Excel in Your Field",
    description:
      "Job fairs, workshops, mentorship programs, and networking opportunities designed to launch and accelerate your career. Be a kingdom giant in your industry.",
    icon: Briefcase,
    color: "from-gold to-gold-dim",
    glowColor: "rgba(255, 215, 0, 0.12)",
  },
  {
    id: "worship",
    number: "03",
    title: "Praise & Worship",
    subtitle: "Enter His Presence",
    description:
      "Experience electrifying worship that sets your spirit ablaze. Our praise sessions are designed to usher you into a deeper, more intimate encounter with God.",
    icon: MusicNote,
    color: "from-fire via-fire-light to-gold",
    glowColor: "rgba(255, 107, 43, 0.12)",
  },
  {
    id: "development",
    number: "04",
    title: "Holistic Development",
    subtitle: "Grow Every Dimension",
    description:
      "From leadership training to health awareness, creative arts to financial literacy — we invest in every dimension of your life to produce well-rounded kingdom ambassadors.",
    icon: BookOpen,
    color: "from-gold-dim to-fire",
    glowColor: "rgba(184, 150, 12, 0.12)",
  },
  {
    id: "community",
    number: "05",
    title: "Community & Fellowship",
    subtitle: "You Belong Here",
    description:
      "Build lifelong connections with fellow purpose-driven youth. Engage in events, retreats, and activities tailored to broaden your perspective and deepen friendships.",
    icon: Handshake,
    color: "from-fire-light to-gold",
    glowColor: "rgba(255, 107, 43, 0.12)",
  },
];
