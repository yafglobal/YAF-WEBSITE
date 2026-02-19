# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server (port 3000)
bun run build    # Production build
bun start        # Run production server
bun lint         # Run ESLint
```

Use `bun run build` to verify changes compile.

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

## Frontend Code Standards

### Component Rules

- **One component per file**. File name must match component name (`UserProfile.tsx` exports `UserProfile`).
- **Functional components with hooks only** — no class components.
- **Max ~150 lines per component file**. If it's longer, split it into smaller focused components.
- **Co-locate** component-specific styles, tests, and types with the component when practical.

### Naming Conventions

- **Components**: `PascalCase` — `UserProfile.tsx`, `PaymentCard.tsx`
- **Hooks**: `camelCase` with `use` prefix — `useAuth.ts`, `usePayments.ts`
- **Utilities**: `camelCase` — `formatCurrency.ts`, `validateEmail.ts`

### State Management

- Start with React's built-in state (`useState`, `useReducer`, `useContext`).
- Only introduce external state management if there's a clear, justified need.
- Keep state as close to where it's used as possible — don't lift state unnecessarily.

### Performance

- Use `next/image` for all images (automatic optimization).
- Use `next/link` for internal navigation.
- Lazy load heavy components with `dynamic()` from Next.js.
- Avoid unnecessary re-renders — use `useMemo`/`useCallback` when it matters, but don't prematurely optimize.
- Keep bundle size in mind — check before adding large dependencies.

### API Calls

- All API calls go through a centralized API client (e.g., `lib/api.ts`).
- Handle loading, error, and success states for every API call.
- Show meaningful error messages to users — never expose raw error objects or stack traces.

## Code Quality

- Write code for the next person — clear variable names, comments for non-obvious logic, structured so someone unfamiliar can follow it.
- Leave the code better than you found it. If you touch a file and notice something messy, clean it up.
- Add comments that explain "why" not just "what".

## Testing

No test framework is currently configured for this project. When tests are added:

- Every new PR should include tests for new code.
- When modifying existing untested code, add tests for it (boy scout rule).
- Focus on testing business logic, critical user flows, and previously broken functionality — don't chase 100% coverage.
- **What to test**: Components with logic (conditional rendering, form validation, state changes), user interactions, critical user flows.
- **What NOT to test**: Pure UI components with no logic, third-party library behavior, implementation details (test what the user sees, not internal state).
- When fixing a bug, write a test for it first to prevent regression.
