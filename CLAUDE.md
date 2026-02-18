# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server (port 3000)
bun run build    # Production build
bun start        # Run production server
bun lint         # Run ESLint
```

No test framework is configured. Use `bun run build` to verify changes compile.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Tailwind CSS 4** (via `@tailwindcss/postcss`, configured in `postcss.config.mjs`)
- **Motion 12** (Framer Motion) for scroll-driven animations
- **Phosphor Icons** (`@phosphor-icons/react`)
- **Fonts**: Unbounded (display/headings, `--font-unbounded`) and Instrument Sans (body, `--font-instrument`) via `next/font/google`

## Architecture

Single-page cinematic website. `src/app/page.tsx` is a thin orchestrator that renders section components in sequence:

```
Navbar → Hero → Marquee → About → GlobalPresence → Community →
ProgramsSection → AppSection → VideoSection → GiveSection → Footer
```

Each component in `src/components/` is self-contained with its own scroll animations and state — no shared state management. `ScrollReveal.tsx` is a reusable wrapper for scroll-triggered entrance animations (uses Motion's `useInView`).

### Theme System

Dark mode is default. Light mode toggled via `ThemeToggle.tsx` which adds/removes `.light` class on `<html>`. Theme persists to `localStorage` and is restored via an inline `<script>` in `layout.tsx` to prevent flash. All theme colors are CSS variables defined in `globals.css` under `@theme`.

**Core palette**: charcoal `#0A0A0A` background, fire `#FF4D00` primary accent, gold `#FFD700` secondary accent.

### Key Patterns

- **Hydration safety**: Pre-computed particle/random data as const arrays — never use `Math.random()` at render time
- **CSS-first animations**: Hero slideshow (`heroFade` keyframes, 5-slide 25s cycle), marquee, grain overlay, 3D buttons, fire borders — all in `globals.css`
- **Motion animations**: Parallax (`useScroll`/`useTransform`), scroll reveals, hover interactions — in components
- **Remote images**: `next.config.ts` allows `storage.googleapis.com/gci-static-assets/**`
- **3D buttons**: `src/components/ui/ThreeDButton.tsx` — CSS perspective transforms with fire/gold variants

### Path Alias

`@/*` maps to `./src/*` (configured in `tsconfig.json`). Always use `@/components/...` imports.
