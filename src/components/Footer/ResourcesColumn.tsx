import { ArrowUpRight } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";
import { resourceLinks } from "./footerConfig";

export default function ResourcesColumn() {
  return (
    <div className="md:col-span-2">
      <ScrollReveal delay={0.1}>
        <h4 className="font-display font-bold text-[var(--color-text-primary)] text-xs tracking-[0.2em] uppercase mb-6">
          Resources
        </h4>
        <ul className="space-y-3">
          {resourceLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-[var(--color-text-secondary)] text-sm hover:text-plum transition-colors duration-300 inline-flex items-center gap-1 group"
              >
                {link.label}
                <ArrowUpRight
                  size={12}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </div>
  );
}
