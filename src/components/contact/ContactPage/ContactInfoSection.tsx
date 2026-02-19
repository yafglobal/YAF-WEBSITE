"use client";

import { MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactInfoSection() {
  return (
    <div className="flex flex-col gap-8">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-plum-dark rounded-full" />
          <span className="font-display text-xs font-bold tracking-[0.2em] uppercase text-plum-dark">
            Get in Touch
          </span>
        </div>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-plum-dark">
          For More Details /{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum via-plum-mid to-plum-muted">
            Contact Us!
          </span>
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="w-24 h-1 rounded-full bg-gradient-to-r from-plum-dark to-plum-muted" />
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="text-plum-dark/80 text-base md:text-lg leading-relaxed max-w-lg font-medium">
          Have questions about Youth Alive Global, our programs, or how to get involved? We&apos;d
          love to hear from you. Reach out to us through any of the channels below.
        </p>
      </ScrollReveal>

      {/* Contact info blocks */}
      <div className="flex flex-col gap-5 mt-2">
        <ScrollReveal delay={0.2}>
          <div className="flex items-start gap-4 group">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-plum-dark/15 flex items-center justify-center group-hover:bg-plum-dark/25 transition-colors">
              <MapPin size={22} className="text-plum" weight="fill" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-plum-dark mb-1">Our Address</p>
              <p className="text-plum-dark/80 text-sm leading-relaxed font-medium">
                Global Youth Office, Living Faith Church,
                <br />
                Canaanland, Ota, Nigeria.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="flex items-start gap-4 group">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-plum-dark/15 flex items-center justify-center group-hover:bg-plum-dark/25 transition-colors">
              <Phone size={22} className="text-plum" weight="fill" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-plum-dark mb-1">Phone</p>
              <a
                href="tel:+2348162879125"
                className="text-plum-dark/80 text-sm font-medium hover:text-plum-dark transition-colors"
              >
                +234 816 287 9125
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex items-start gap-4 group">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-plum-dark/15 flex items-center justify-center group-hover:bg-plum-dark/25 transition-colors">
              <EnvelopeSimple size={22} className="text-plum" weight="fill" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-plum-dark mb-1">Email</p>
              <a
                href="mailto:info@winnersyouth.org"
                className="text-plum-dark/80 text-sm font-medium hover:text-plum-dark transition-colors"
              >
                info@winnersyouth.org
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
