import Link from "next/link";
import { motion } from "motion/react";

export const MotionLink = motion.create(Link);

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Watch", href: "/watch" },
  { label: "Bible Plan", href: "/bible-plan" },
  { label: "Community", href: "/community" },
];

export const watchDropdownItems = [
  { label: "All Videos", href: "/watch", flag: "" },
  { label: "Africa", href: "/watch/africa", flag: "🇳🇬" },
  { label: "North America", href: "/watch/north-america", flag: "🇨🇦" },
  { label: "Europe", href: "/watch/europe", flag: "🇬🇧" },
];

export const branchDropdownItems = [
  { label: "Africa", href: "/branches/africa", tagline: "Where the Fire Began" },
  { label: "Europe", href: "/branches/europe", tagline: "Burning Across Borders" },
  { label: "USA", href: "/branches/usa", tagline: "Ablaze in America" },
  { label: "Canada", href: "/branches/canada", tagline: "Northern Fire" },
];
