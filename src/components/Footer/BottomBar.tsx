import { socialLinks } from "./footerConfig";

export default function BottomBar() {
  return (
    <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-[var(--color-text-muted)] text-xs">
        &copy; {new Date().getFullYear()} Youth Alive Global. All rights reserved.
      </p>
      <div className="flex items-center gap-1">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-2.5 text-[var(--color-text-muted)] rounded-lg transition-all duration-300 group/icon"
            aria-label={link.label}
          >
            {/* Glow on hover */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle, ${link.glow.replace("0.4", "0.1")}, transparent 70%)`,
              }}
            />
            <link.icon
              size={16}
              weight="fill"
              className="relative z-10 transition-colors duration-300"
            />
            {/* Colored overlay on hover */}
            <link.icon
              size={16}
              weight="fill"
              className="absolute top-2.5 left-2.5 z-20 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"
              style={{ color: link.color }}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
