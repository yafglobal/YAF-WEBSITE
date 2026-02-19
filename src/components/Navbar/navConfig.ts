import Link from "next/link";
import { motion } from "motion/react";

export const MotionLink = motion.create(Link);

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sermons", href: "/#sermons" },
  { label: "Events", href: "/#events" },
  { label: "Community", href: "/#community" },
];

export const sectionIds = ["", "about", "sermons", "events", "community"];
