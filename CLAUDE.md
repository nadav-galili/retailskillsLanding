

Package manager is **pnpm** (`.npmrc` configures `shamefully-hoist=true` and multi-platform support for darwin-arm64).

## Design System

The site follows the **Neon Editorial** design system defined in [`design.md`](./design.md). The UI design reviewer agent at [`.claude/agents/ui-design-reviewer.md`](./.claude/agents/ui-design-reviewer.md) enforces these rules. Key principles:

- **No 1px borders** between sections — use background color shifts (`surface` → `surface-elevated`)
- **No drop shadows** — use neon glow (`.neon-glow`, `.neon-glow-strong`)
- **Glassmorphism** — use `.glass` class for floating elements (navbar)
- **Extreme whitespace** — `py-28` or `py-32` between major sections
- **No `rounded-full` pills** — use `rounded-md` to `rounded-xl`
- **Font deviation**: design.md specifies Inter, but we use **Heebo** because this is a Hebrew-first site

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

### Tailwind v4 Theme (Neon Editorial)

Configured via `@theme` block in `src/app/globals.css` (no `tailwind.config.ts`). Color tokens:

- **Primary** (neon cyan): `primary` (#99f7ff), `primary-light` (#00f1fe / primary_container), `primary-dark` (#66d4dd / primary_dim)
- **Secondary** (neon green): `secondary` (#39FF14), `secondary-dim` (#2ed611) — active states, stat accents, step badges, feature callout icons, hover highlights, background glow orbs
- **Tertiary** (neon yellow): `tertiary` (#FFF01F), `tertiary-dim` (#d9cc1a) — eyebrow labels, warnings, badges, stat highlights, step accents, alert backgrounds, subtle glow orbs
- **WhatsApp**: `wa-header` (#1a2e35), `wa-bubble-user` (#005c4b) — scoped to WhatsApp chat UI
- **CTA**: `cta` (#00f1fe), `cta-hover` (#33f5fe) — gradient endpoints
- **On-primary**: `on-primary` (#0e0e0e) — dark text on neon backgrounds
- **Surfaces**: `surface` (#0e0e0e), `surface-lowest` (#000000), `surface-elevated` (#131313), `surface-card` (#1a1919), `surface-high` (#201f1f), `surface-highest` (#262626)
- **Text**: `text-primary` (#ffffff), `text-secondary` (#adaaaa)
- **Border**: `border` (rgba white 8% — ghost border)
- **Accent aliases**: `accent`/`accent-light`/`accent-dark` map to primary values for backward compat

Font: Heebo (Hebrew+Latin subsets via `next/font/google`).

### Reusable UI Components

- **`src/components/ui/Button.tsx`** — Variants: `primary` (neon gradient + glow), `secondary` (ghost + green hover), `tertiary` (text-only). Sizes: `sm`, `md`, `lg`. Supports `href` for Link rendering.
- **`src/components/ui/Card.tsx`** — Base card. `interactive` prop adds hover-to-highest + neon glow + primary-dark border.
- **`src/components/ui/Input.tsx`** — Dark bg, ghost border, neon focus glow. `as="textarea"` support. `error` prop for validation.
- **`src/components/ui/Chip.tsx`** — Selection chip. `selected` prop toggles secondary green style.
- **`src/components/ui/AnimateOnScroll.tsx`** — IntersectionObserver scroll animation wrapper.

## Key Conventions

- **RTL**: Use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start`, `end`) instead of `ml-*`/`mr-*`/`left`/`right`
- **Client components**: Only where needed — Navbar (mobile menu), ChatWindow + demo components, ContactForm, AnimateOnScroll
- **`cn()` utility** at `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class merging
- **Scroll animations**: `AnimateOnScroll` wrapper uses IntersectionObserver to add `.visible` class (CSS transitions defined in globals.css)
- Path alias: `@/*` → `./src/*`
- `ANTHROPIC_API_KEY` must be set in `.env.local` for the demo chat to work
