Standards for our Next.js frontend application.

Project Structure

FOR THE FRONTEND TEAM

Component Conventions

One component per file. File name matches component name.

Use functional components with hooks. No class components.

Keep components focused. If a component file is over 150 lines, consider splitting it.

Co-locate component-specific styles, tests, and types with the component when practical.

Naming

Components: PascalCase — UserProfile.tsx, PaymentCard.tsx

Hooks: camelCase with use prefix — useAuth.ts, usePayments.ts

Utilities: camelCase — formatCurrency.ts, validateEmail.ts

State Management

Start with React's built-in state (useState, useReducer, useContext).

Only introduce external state management (Zustand, Redux, etc.) if there's a clear need and the team agrees.

Keep state as close to where it's used as possible. Don't lift state unnecessarily.

API Calls

All API calls go through a centralized API client (e.g., an Axios or fetch wrapper in lib/api.ts).

Handle loading, error, and success states for every API call.

Show meaningful error messages to users — never show raw error objects or stack traces.

Example API Client

// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async get(path: string) {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  async post(path: string, body: unknown) {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
};

Linting & Formatting

We use ESLint and Prettier to enforce consistent code style automatically. This means we don't argue about tabs vs. spaces or semicolons in code reviews — the tools handle it.

Setup

ESLint and Prettier configs live in each repo's root

Both run automatically on pre-commit (via Husky + lint-staged)

CI also runs linting — a PR with lint errors won't pass checks

VS Code Settings

Add this to your VS Code settings for auto-formatting on save:

{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}

Performance Basics

Use next/image for all images (automatic optimization)

Use next/link for internal navigation

Lazy load heavy components with dynamic() from Next.js

Avoid unnecessary re-renders — memoize expensive computations with useMemo and stable references with useCallback when it matters (don't premature optimize)

Keep bundle size in mind — check before adding large dependencies