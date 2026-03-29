# "The Living Demo" - Scroll-Driven WhatsApp Bot Showcase

## Context

The homepage currently uses basic fade-in animations (AnimateOnScroll). We want a **"wow" scroll-linked section** that showcases the WhatsApp bot in action — a phone mockup where messages appear as the user scrolls, with feature callouts animating alongside. Inspired by Apple/Stripe product pages.

**Library:** `motion` (motion.dev) — `useScroll`, `useTransform`, `useSpring`, `motion.div`

---

## The Effect

A **350vh tall section** with a **sticky phone mockup** centered on screen. As the user scrolls:

1. Phone slides up from below with neon glow
2. WhatsApp header fades in ("מנהלי חנויות — רשת שוק+")
3. Messages appear one-by-one showing a real bot conversation (summaries, competitive intel, alerts, campaigns)
4. Feature callout cards fade up on alternating sides next to the phone
5. Neon glow intensifies as more features are revealed
6. Phone scales down, CTA appears: "רוצה לראות את זה בפעולה?"

**Background:** `bg-surface-lowest` (#000000) — the deepest black to maximize neon glow contrast and create an architectural break from the Hero above.

---

## Scroll Timeline

| Progress | What Happens |
|----------|-------------|
| 0.00–0.10 | Phone slides up (translateY: 100→0), fades in, bg glow orbs appear |
| 0.10–0.15 | WhatsApp header bar fades in |
| 0.15–0.18 | User message: `/סיכום` |
| 0.20–0.28 | Bot response: daily summary + **Left callout: "סיכום אוטומטי"** |
| 0.28–0.31 | User: `מה עושים המתחרים?` |
| 0.33–0.42 | Bot: competitive intel + **Right callout: "מודיעין תחרותי"** |
| 0.42–0.50 | Alert notification (red accent) + **Left callout: "התראות בזמן אמת"** |
| 0.56–0.59 | User: `תכין קמפיין לסוף שבוע` |
| 0.61–0.72 | Bot: campaign copy + **Right callout: "יצירת קמפיינים"** |
| 0.72–0.85 | All visible, glow intensifies |
| 0.85–1.00 | Phone scales to 0.9, CTA fades up with button to `/demo` |

---

## Files to Create/Modify

### Install
```bash
pnpm add motion
```

### New Files

**1. `src/components/landing/WhatsAppShowcase.tsx`** (client component — main orchestrator)
- `useScroll({ target: containerRef, offset: ["start start", "end end"] })`
- `useSpring(scrollYProgress)` for smooth feel
- `useTransform` for phone entrance, glow intensity, end-of-section CTA
- Passes `smoothProgress` MotionValue to child components
- Renders: 350vh container → sticky 100vh inner → PhoneMockup + FeatureCallouts + CTA
- Desktop: phone center, callouts flanking sides (absolutely positioned)
- Mobile (<768px): no sticky scroll — uses `whileInView` instead, stacked layout

**2. `src/components/landing/PhoneMockup.tsx`** (pure CSS phone frame)
- Outer frame: `rounded-[2.5rem]`, `bg-surface-highest`, thin bezel with gradient border (`bg-gradient-to-b from-white/10 to-white/5`)
- Dynamic island notch at top
- WhatsApp header: `bg-[#1a2e35]` (dark WA green adapted for neon theme), group name + participant count
- Messages container: receives children, `overflow-hidden`
- Input bar placeholder at bottom
- Size: `w-[280px] md:w-[320px]`, `h-[540px] md:h-[580px]`

**3. `src/components/landing/ShowcaseMessage.tsx`** (animated message bubble)
- Receives `scrollProgress` MotionValue + `showRange: [number, number]`
- `useTransform` for opacity (0→1) and translateY (16→0) over short scroll distance
- Styling matches existing `MessageBubble.tsx`: user=`bg-[#005c4b]`, bot=`bg-surface-card`, alert=`bg-red-900/30 border-red-500/30`
- Supports `**bold**` formatting (simplified inline parser)
- RTL-aware: user messages `justify-end`, bot `justify-start`

**4. `src/components/landing/FeatureCallout.tsx`** (animated glassmorphism card)
- Receives `scrollProgress` MotionValue + `progressRange: [number, number]`
- Glass effect: `bg-surface/70 backdrop-blur-[16px] rounded-xl p-5`
- Neon glow on appearance
- Lucide icon + Hebrew title + description
- Animation: opacity + translateY fade-up (avoids RTL translateX complexity)
- `w-[220px]` on desktop, full-width stacked on mobile

### Modified Files

**5. `src/app/page.tsx`** — Insert `<WhatsAppShowcase />` between `<Hero />` and `<AnimateOnScroll><Products /></AnimateOnScroll>`

**6. `src/app/globals.css`** — Add reduced-motion media query:
```css
@media (prefers-reduced-motion: reduce) {
  .showcase-static { opacity: 1 !important; transform: none !important; }
}
```

---

## Message Content (Hebrew)

```
User:  /סיכום
Bot:   📋 סיכום יומי — 28.03.2026
       ✅ 14 מ-15 חנויות דיווחו
       📈 מכירות: ₪847,000 (↑12%)
       ⚠️ חנות ת"א מרכז: חוסר במלאי
       📋 3 משימות פתוחות

User:  מה עושים המתחרים?
Bot:   🔍 עדכון תחרותי
       רמי לוי: מבצע 1+1 על חלב
       שופרסל: הוזלה 15% ירקות
       יוחננוף: קמפיין חדש ברשתות

Alert: 🚨 התראה דחופה
       חוסר במלאי — חנות ת"א מרכז
       מנהל אזור קיבל התראה

User:  תכין קמפיין לסוף שבוע
Bot:   📢 קמפיין סוף שבוע
       🛒 "סוף שבוע = סל מלא!"
       הנחה 20% על מוצרי בסיס
       📱 קופי לוואטסאפ ושילוט — מוכן!
```

---

## Responsive Strategy

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop (lg+)** | 350vh container, sticky phone center, callouts on sides |
| **Tablet (md–lg)** | 300vh, phone center, callouts in 2-col grid below phone |
| **Mobile (<md)** | No sticky scroll. Phone + messages + callouts stack vertically. Uses `whileInView` instead of scroll-linked transforms |

Mobile detection via `useMediaQuery` hook (SSR-safe: default to desktop, swap on mount — no flash since phone starts at opacity 0 anyway).

---

## Accessibility

- `prefers-reduced-motion`: show static layout, all messages visible, no scroll effects
- Section has `<h2>` for screen readers
- Phone mockup: `aria-hidden="true"` (decorative)
- Callout titles/descriptions: NOT hidden (real feature content)
- CTA button: fully focusable and accessible

---

## Design System Compliance (Neon Editorial)

- No 1px borders between sections — bg shift from `surface` → `surface-lowest` → `surface`
- No drop shadows — neon glow on phone frame and callouts
- Glassmorphism on callout cards
- Extreme whitespace preserved (py-28 padding on entry/exit)
- `rounded-xl` to `rounded-[2.5rem]` — no `rounded-full`
- RTL: all logical properties (`start`/`end`, `ms-`/`me-`)
- Font: Heebo (inherited)
- Colors: primary (#99f7ff), secondary (#2ff801) for accents, surface hierarchy for depth

---

## Implementation Sequence

1. `pnpm add motion`
2. Move assets: `src/assets/*.png` → `public/images/` (showcase-bg.png, group-avatar.png, showcase-hero.png)
3. Create `PhoneMockup.tsx` — CSS phone frame + WhatsApp header with group-avatar.png
4. Create `ShowcaseMessage.tsx` — static first, then add scroll animation
5. Create `FeatureCallout.tsx` — static first, then add scroll animation
6. Create `WhatsAppShowcase.tsx` — wire everything with `useScroll`/`useTransform`/`useSpring`, integrate showcase-bg.png as background, showcase-hero.png as mobile fallback
7. Update `page.tsx` — insert between Hero and Products
8. Add responsive breakpoints + mobile `whileInView` fallback
9. Add reduced-motion handling
10. Add CSS to `globals.css`

---

## Verification

1. **Scroll test**: messages appear smoothly at various scroll speeds, reverse scroll hides them
2. **RTL test**: user messages on left (physical), bot on right, callouts on correct sides
3. **Responsive**: test at 375px, 768px, 1024px, 1440px
4. **Reduced motion**: enable OS setting, verify static fallback
5. **Performance**: Chrome DevTools Performance panel — all frames <16ms, only transform/opacity animated
6. **Build**: `pnpm build` passes with no TS errors
7. **Cross-browser**: Chrome, Safari, Firefox

---

## Generated Assets (in `src/assets/`)

Three Nano Banana assets have been created and will be integrated:

**1. `first_image.png`** — Flowing neon cyan light waves on black background
- **Usage:** Section background image, positioned behind the phone mockup
- **How:** `<Image>` with `absolute inset-0 object-cover opacity-30` — subtle atmospheric texture that enhances the neon glow without competing with the phone
- Move to `public/images/showcase-bg.png` for Next.js Image optimization

**2. `second_image.png`** — Neon cyan retail store icon (shopping bag + house, circular)
- **Usage:** WhatsApp group avatar in the phone header
- **How:** Circular `<Image>` (`w-8 h-8 rounded-full`) next to the group name in the WhatsApp header bar
- Move to `public/images/group-avatar.png`

**3. `third_image.png`** — Isometric phone with WhatsApp chat and floating data cards
- **Usage:** Mobile fallback hero image (replaces the scroll-driven phone mockup on small screens) + section heading visual on desktop before the scroll kicks in
- **How:** On mobile (<md), show this as a full-width image instead of the sticky scroll. On desktop, it fades out as the scroll-driven phone takes over (progress 0→0.05)
- Move to `public/images/showcase-hero.png`
