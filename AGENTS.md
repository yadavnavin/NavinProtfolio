# Portfolio Project Instructions

This repository is a premium personal software-engineering portfolio.

Before making UI or architectural changes, read:

- `DESIGN.md` — visual language, motion rules, typography, layout, and anti-patterns.
- `CONTENT.md` — portfolio content and messaging.
- `SITE_PLAN.md` — page structure and section responsibilities.
- `design-references/` — approved visual references when present.

## Source Code

Application source must use TypeScript.

Use:

- `.ts` for utilities, data, types, hooks, and non-React logic.
- `.tsx` for React components, layouts, and pages.

Do not create `.js` or `.jsx` application source files.

## Technology

Use the existing stack unless there is a compelling reason not to:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui with Base UI
- Motion
- GSAP + ScrollTrigger
- Morphicons
- Lucide

Do not install additional UI, animation, 3D, smooth-scroll, or component libraries without explicit approval.

## Design Process

Do not jump directly from a request to implementation when creating a major visual section.

For significant UI work:

1. Read `DESIGN.md`.
2. Inspect relevant references.
3. State the visual concept.
4. Implement one focused section.
5. Run formatting/type/build checks.
6. Inspect the result visually with Playwright when appropriate.
7. Refine it.
8. Use Impeccable for final design critique/polish.

Use the installed `gpt-taste` skill for art direction when appropriate.

Use `image-to-code` when implementing an approved visual reference.

## Design Quality

The website must feel intentionally art-directed, not like a generic AI-generated portfolio.

Avoid:

- generic SaaS gradients
- glowing purple blobs
- glassmorphism everywhere
- card grids for every section
- excessive pill badges
- huge collections of technology logos
- skill percentage bars
- generic bento layouts
- arbitrary rounded containers
- meaningless decorative particles
- animations added only because they look impressive
- excessive text-gradient headings
- copying stock shadcn visual styling

shadcn/Base UI should provide accessible behavior and primitives.
The visual design should be custom.

## Motion Hierarchy

Use:

- CSS for tiny hover/focus transitions.
- Motion for component state, layout transitions, entrances, gestures, and microinteractions.
- GSAP/ScrollTrigger for a small number of cinematic scroll sequences.
- Morphicons for icon-state transitions.

Do not use GSAP for ordinary button or card hover effects.

Every animation must have a visual, interaction, or narrative purpose.

Respect `prefers-reduced-motion`.

## Responsive Design

Mobile is not simply desktop stacked vertically.

Major visual compositions and cinematic interactions should be deliberately redesigned for mobile when necessary.

Support at minimum:

- mobile
- tablet
- laptop
- large desktop

## Quality

Before considering implementation complete, run:

- `pnpm exec biome check .`
- `pnpm build`

Do not knowingly leave TypeScript, Biome, accessibility, hydration, or build errors.

Favor semantic HTML, keyboard accessibility, performance, and minimal client-side JavaScript.