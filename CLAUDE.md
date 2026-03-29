# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server with Turbopack (http://localhost:3000)
pnpm build        # Production build
pnpm start        # Serve production build
pnpm lint         # ESLint
```

Package manager is **pnpm** (`.npmrc` configures `shamefully-hoist=true` and multi-platform support for darwin-arm64).

## Architecture

Hebrew RTL marketing site for Retail-Skillz built with **Next.js 16 App Router**, **TypeScript**, **Tailwind CSS v4**, and **lucide-react** icons. Dark theme, all content in Hebrew.

### Routing

- `/` — Landing page (Hero, Products, Stats, HowItWorks, Testimonials, CTA sections)
- `/whatsapp-bot`, `/dashboards`, `/learning` — Product pages using shared `ProductHero`, `FeatureGrid`, `ProductCTA` components
- `/contact` — Contact form (client-side only, no backend — see TODO in `ContactForm.tsx`)
- `/demo` — Full-screen WhatsApp-style chat demo (renders as `fixed inset-0 z-[100]` overlay to bypass root layout's Navbar/Footer)
- `/api/demo/chat` — POST streaming endpoint for Claude API

### Claude API Demo Flow

`ChatWindow.tsx` → `fetch('/api/demo/chat')` → `route.ts` → `claude.ts` (Anthropic SDK, `claude-sonnet-4-20250514`) → streams back via `ReadableStream`

- **`src/lib/seed-data.ts`** — Fake retail data (15 stores, WhatsApp messages, competitors, tasks) all in Hebrew
- **`src/lib/prompts.ts`** — `getSystemPrompt()` injects seed data into Claude's system prompt; defines Hebrew response formatting and command handlers (`/סיכום`, `/מי_חסר`, `/משימות`)
- **`src/lib/claude.ts`** — Anthropic SDK wrapper, returns a stream object
- **`src/app/api/demo/chat/route.ts`** — In-memory rate limiting (30 req/10 min per IP), streams text deltas back to client. Must use Node.js runtime (not Edge)

### Tailwind v4 Theme

Configured via `@theme` block in `src/app/globals.css` (no `tailwind.config.ts`). Key custom colors: `primary` (deep blue), `accent` (cyan), `cta` (orange), `surface`/`surface-elevated`/`surface-card` (dark backgrounds), `text-primary`/`text-secondary`, `border`. Font: Heebo (Hebrew+Latin subsets via `next/font/google`).

## Key Conventions

- **RTL**: Use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start`, `end`) instead of `ml-*`/`mr-*`/`left`/`right`
- **Client components**: Only where needed — Navbar (mobile menu), ChatWindow + demo components, ContactForm, AnimateOnScroll
- **`cn()` utility** at `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class merging
- **Scroll animations**: `AnimateOnScroll` wrapper uses IntersectionObserver to add `.visible` class (CSS transitions defined in globals.css)
- Path alias: `@/*` → `./src/*`
- `ANTHROPIC_API_KEY` must be set in `.env.local` for the demo chat to work
