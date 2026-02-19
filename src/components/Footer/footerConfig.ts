import { YoutubeLogo, FacebookLogo, InstagramLogo, XLogo, TiktokLogo } from "@phosphor-icons/react";

export const resourceLinks = [
  { label: "Home", href: "#" },
  { label: "About us", href: "#about" },
  { label: "Sermons", href: "#sermons" },
  { label: "Events", href: "#events" },
  { label: "Blogs", href: "#" },
  { label: "Give online", href: "https://business.payaza.africa/pay/livingfaithchurch-youthalive" },
];

export const socialLinks = [
  {
    icon: YoutubeLogo,
    label: "YouTube",
    href: "https://www.youtube.com/@youthaliveglobal?sub_confirmation=1",
    color: "#FF0000",
    glow: "rgba(255, 0, 0, 0.4)",
  },
  {
    icon: FacebookLogo,
    label: "Facebook",
    href: "https://www.facebook.com/Youthaliveglobal",
    color: "#1877F2",
    glow: "rgba(24, 119, 242, 0.4)",
  },
  {
    icon: InstagramLogo,
    label: "Instagram",
    href: "https://www.instagram.com/youthaliveglobal",
    color: "#E4405F",
    glow: "rgba(228, 64, 95, 0.4)",
  },
  {
    icon: XLogo,
    label: "Twitter / X",
    href: "https://x.com/youthaliveglb",
    color: "var(--color-text-primary)",
    glow: "rgba(128, 128, 128, 0.3)",
  },
  {
    icon: TiktokLogo,
    label: "TikTok",
    href: "https://www.tiktok.com/@youthaliveglobal",
    color: "#00F2EA",
    glow: "rgba(0, 242, 234, 0.4)",
  },
];

export type SocialLink = (typeof socialLinks)[number];
export type ResourceLink = (typeof resourceLinks)[number];
