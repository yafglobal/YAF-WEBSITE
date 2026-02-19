import Link from "next/link";
import { motion } from "motion/react";

export const MotionLink = motion.create(Link);

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Watch", href: "/watch" },
  { label: "Bible Plan", href: "/#bible-plan" },
  { label: "Community", href: "/#community" },
];

export const sectionIds = ["", "about", "watch", "bible-plan", "community"];
