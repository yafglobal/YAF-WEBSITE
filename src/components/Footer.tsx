"use client";

import Image from "next/image";
import {
  YoutubeLogo,
  FacebookLogo,
  InstagramLogo,
  XLogo,
  TiktokLogo,
  MapPin,
  Phone,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

const resourceLinks = [
  { label: "Home", href: "#" },
  { label: "About us", href: "#about" },
  { label: "Sermons", href: "#sermons" },
  { label: "Events", href: "#events" },
  { label: "Blogs", href: "#" },
  { label: "Give online", href: "#give" },
];

const socialLinks = [
  { icon: YoutubeLogo, label: "YouTube", href: "#" },
  { icon: FacebookLogo, label: "Facebook", href: "#" },
  { icon: InstagramLogo, label: "Instagram", href: "#" },
  { icon: XLogo, label: "Twitter / X", href: "#" },
  { icon: TiktokLogo, label: "TikTok", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-fire/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-8">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <ScrollReveal>
              <Image
                src="/images/logo.png"
                alt="Youth Alive Global"
                width={155}
                height={40}
                className="brightness-200 h-8 w-auto mb-6"
              />
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-ash text-sm">
                  <MapPin size={16} className="text-fire mt-0.5 shrink-0" weight="fill" />
                  <span>
                    Global Youth Office, Living Faith Church, Canaanland, Ota,
                    Nigeria.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-ash text-sm">
                  <Phone size={16} className="text-fire shrink-0" weight="fill" />
                  <span>+234 816 287 9125</span>
                </div>
                <div className="flex items-center gap-3 text-ash text-sm">
                  <EnvelopeSimple size={16} className="text-fire shrink-0" weight="fill" />
                  <span>info@winnersyouth.org</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Resources */}
          <div>
            <ScrollReveal delay={0.1}>
              <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-6">
                Resources
              </h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-ash text-sm hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Social */}
          <div>
            <ScrollReveal delay={0.2}>
              <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-6">
                Social
              </h4>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-3 text-ash text-sm hover:text-white transition-colors duration-300 group"
                    >
                      <link.icon
                        size={18}
                        className="text-white/20 group-hover:text-fire transition-colors"
                        weight="fill"
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Newsletter / Connect */}
          <div>
            <ScrollReveal delay={0.3}>
              <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-6">
                Stay Connected
              </h4>
              <p className="text-ash text-sm leading-relaxed mb-4">
                Join our global community and stay updated with the latest from
                Youth Alive.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-fire/10 border border-fire/20 text-fire font-display font-semibold text-sm rounded-xl hover:bg-fire/20 transition-all duration-300"
              >
                Contact Us
              </a>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} Youth Alive Global. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="p-2 text-white/15 hover:text-fire transition-colors"
                aria-label={link.label}
              >
                <link.icon size={18} weight="fill" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
