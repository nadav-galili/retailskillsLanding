# Design System Strategy: Neon Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Kinetic Monolith**

This design system is built to disrupt the "safe" corporate aesthetic of B2B SaaS. It rejects the standard "light mode / blue primary" template in favor of a high-contrast, editorial experience that feels like a premium digital magazine from the near future.

The system utilizes **Kinetic Monolithism**: a philosophy where large, dark, immovable blocks of content (The Monolith) are electrified by precise, high-energy neon strikes (The Kinetic). We break the grid through intentional asymmetry—using generous whitespace (`spacing.24`) to let elements breathe and overlapping typography to create a sense of depth and motion. This isn't just a landing page; it's a high-performance interface.

---

## 2. Colors & Surface Architecture

The palette is anchored in an abyssal black, allowing neon accents to function as light sources rather than just decorative colors.

* **The Abyssal Foundation:** Use `background` (#0e0e0e) for the primary canvas. To create depth, avoid borders. Use `surface_container_low` (#131313) for secondary sections and `surface_container_high` (#201f1f) for elevated interactive cards.
* **The "No-Line" Rule:** Section transitions must be handled via background shifts. A transition from `surface` to `surface_container_low` creates a sophisticated, architectural break that 1px borders cannot replicate.
* **The Glass & Gradient Rule:** For "floating" navbars or high-priority feature cards, use a backdrop-blur (12px-20px) combined with `surface` at 70% opacity.
* **Signature Textures:** Apply a subtle linear gradient to primary CTAs: `primary_container` (#00f1fe) to `primary` (#99f7ff). This adds "soul" and prevents the neon from looking flat or "cheap."

---

## 3. Typography: The Editorial Edge

We use **Inter** exclusively, but we treat it with extreme variance in scale to establish an authoritative hierarchy.

* **Display-LG (3.5rem):** Reserved for Hero H1s. Use tight letter-spacing (-0.04em) and `on_surface` (White). This is your "Editorial Statement."
* **The Contrast Gap:** Body text should never compete with headlines. Use `body-md` (0.875rem) in `on_surface_variant` (#adaaaa) for long-form descriptions. The drop in scale and color creates an immediate sense of professional hierarchy.
* **Labels (0.6875rem):** Use `label-sm` in uppercase with 0.1em letter-spacing for category tags or "eyebrow" headers, rendered in `secondary` (#2ff801) to draw the eye without overwhelming the layout.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are forbidden. We use light emission and surface nesting to define space.

* **The Layering Principle:** Stack `surface_container_highest` on top of `surface_container_low`. The subtle shift from #262626 to #131313 creates "lift" naturally.
* **Neon Glow (The Kinetic Shadow):** When an element needs to "pop," apply a soft, outer glow using the primary color at 10-15% opacity with a large blur (32px-64px). This mimics a neon tube reflecting off a dark wall.
* **The "Ghost Border" Fallback:** For input fields or containers requiring definition on dark backgrounds, use `outline_variant` at 20% opacity. It should be felt, not seen.
* **Glassmorphism:** Use semi-transparent `surface_bright` with a heavy blur for floating modals. This ensures the "Neon Editorial" vibe remains cohesive and integrated into the dark space.

---

## 5. Components

### Buttons
* **Primary:** `primary_container` background, `on_primary` text. `rounded-md` (0.375rem). Use a subtle neon glow on hover.
* **Secondary:** Ghost style. `outline` border at 40% opacity, `on_surface` text. On hover, the border becomes 100% `secondary` (#2ff801).
* **Tertiary:** Text-only in `primary`. Underlined only on hover with a 2px offset.

### Input Fields
* **State:** Background `surface_container_lowest` (#000000). Border `outline_variant` (20% opacity).
* **Focus:** Border transitions to 100% `primary` (#99f7ff) with a 4px `primary` outer glow.

### Cards & Lists
* **The Rule of Zero Dividers:** Forbid divider lines. Separate list items using `spacing.4` (1.4rem) of vertical whitespace.
* **Interactive Cards:** Use `surface_container` (#1a1919). On hover, shift to `surface_container_highest` (#262626) and add a `px` (1px) border of `primary_dim`.

### Selection Chips
* **Selection:** `secondary_container` background with `on_secondary_container` text. High-energy, indicates "Active" state instantly.

---

## 6. Do's and Don'ts

### Do
* **DO** use extreme whitespace (`spacing.20` and `spacing.24`) between major sections to emphasize the "Editorial" look.
* **DO** use `secondary` (#39FF14) as a high-energy accent beyond just active states—stat highlights, step badges, feature callout icons, hover effects on interactive elements, and subtle background glow orbs (`bg-secondary/5`). It brings the "Kinetic" energy.
* **DO** use `tertiary` (#FFF01F) as a warm counterpoint—eyebrow labels, warning states, "New" badges, stat highlights, step accents, alert backgrounds (`bg-tertiary/10`), and subtle glow orbs (`bg-tertiary/3`). It adds depth to the cyan+green palette.
* **DO** align text-heavy blocks to a tight column (e.g., 60ch width) to maintain readability amidst the dark background.

### Don't
* **DON'T** use 1px solid gray lines to separate sections. It kills the "Monolith" aesthetic.
* **DON'T** use standard 0,0,0 black. Use the specified `background` (#0e0e0e) or `surface_container_lowest` (#000000) for true depth.
* **DON'T** use `rounded-full` (pills) for everything. Stick to the `md` (0.375rem) to `xl` (0.75rem) range to keep the "Cyberpunk" edge sharp and professional.

---

## 7. Implementation Notes

### Font Deviation
The design system specifies **Inter**, but this site is a Hebrew RTL marketing site. Inter has poor Hebrew glyph coverage. We use **Heebo** (Google Fonts, Hebrew + Latin subsets) and apply the design system's typography rules (scale, letter-spacing, weight) to it.

### Token Mapping
The Tailwind v4 `@theme` block in `globals.css` maps design system tokens to CSS custom properties:

| Design System Token | CSS Variable | Tailwind Class | Value |
|---|---|---|---|
| `background` | `--color-surface` | `bg-surface` | #0e0e0e |
| `surface_container_lowest` | `--color-surface-lowest` | `bg-surface-lowest` | #000000 |
| `surface_container_low` | `--color-surface-elevated` | `bg-surface-elevated` | #131313 |
| `surface_container` | `--color-surface-card` | `bg-surface-card` | #1a1919 |
| `surface_container_high` | `--color-surface-high` | `bg-surface-high` | #201f1f |
| `surface_container_highest` | `--color-surface-highest` | `bg-surface-highest` | #262626 |
| `primary` | `--color-primary` | `text-primary` | #99f7ff |
| `primary_container` | `--color-primary-light` | `bg-primary-light` | #00f1fe |
| `primary_dim` | `--color-primary-dark` | `border-primary-dark` | #66d4dd |
| `on_primary` | `--color-on-primary` | `text-on-primary` | #0e0e0e |
| `on_surface` | `--color-text-primary` | `text-text-primary` | #ffffff |
| `on_surface_variant` | `--color-text-secondary` | `text-text-secondary` | #adaaaa |
| `secondary` | `--color-secondary` | `text-secondary` | #39FF14 |
| `secondary_dim` | `--color-secondary-dim` | `text-secondary-dim` | #2ed611 |
| `tertiary` | `--color-tertiary` | `text-tertiary` | #FFF01F |
| `tertiary_dim` | `--color-tertiary-dim` | `text-tertiary-dim` | #d9cc1a |
| `wa_header` | `--color-wa-header` | `bg-wa-header` | #1a2e35 |
| `wa_bubble_user` | `--color-wa-bubble-user` | `bg-wa-bubble-user` | #005c4b |
| `outline_variant` | `--color-border` | `border-border` | rgba(255,255,255,0.08) |

### CSS Utility Classes
- `.neon-glow` — 32px blur, primary at 12% opacity
- `.neon-glow-strong` — 64px blur, primary at 15% opacity
- `.neon-glow-green` — 32px blur, secondary at 12% opacity
- `.neon-glow-yellow` — 32px blur, tertiary at 10% opacity
- `.glass` — backdrop-blur-16px + surface at 70% opacity

### Reusable Components
See `src/components/ui/` for Button, Card, Input, and Chip components that encode these design patterns.
