import { MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactColumn() {
  return (
    <div className="md:col-span-3">
      <ScrollReveal delay={0.2}>
        <h4 className="font-display font-bold text-[var(--color-text-primary)] text-xs tracking-[0.2em] uppercase mb-6">
          Get in Touch
        </h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3 text-[var(--color-text-secondary)] text-sm">
            <MapPin size={16} className="text-fire mt-0.5 shrink-0" weight="fill" />
            <span>Global Youth Office, Living Faith Church, Canaanland, Ota, Nigeria.</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--color-text-secondary)] text-sm">
            <Phone size={16} className="text-fire shrink-0" weight="fill" />
            <span>+234 816 287 9125</span>
          </div>
          <div className="flex items-center gap-3 text-[var(--color-text-secondary)] text-sm">
            <EnvelopeSimple size={16} className="text-fire shrink-0" weight="fill" />
            <span>info@winnersyouth.org</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
