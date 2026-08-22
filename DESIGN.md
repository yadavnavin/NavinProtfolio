# Portfolio Design Direction

## Goal

Create a distinctive, premium software-engineering portfolio that feels like a digital studio or experimental technology publication rather than a conventional developer portfolio.

The experience should communicate:

- engineering depth
- product thinking
- curiosity
- craft
- technical ambition

It should feel contemporary and memorable without sacrificing usability.

---

## Core Direction

Editorial technology × interactive engineering × restrained experimentation.

The website should combine:

- oversized expressive typography
- disciplined whitespace
- asymmetric compositions
- technical diagrams and system-inspired visuals
- refined microinteractions
- a small number of cinematic moments
- strong visual hierarchy
- carefully art-directed project presentation

Avoid making every section visually loud.

Contrast calm sections with a few highly expressive interactions.

---

## Visual Personality

Desired:

- premium
- sharp
- technical
- thoughtful
- experimental
- mature
- minimal where appropriate
- surprising where valuable

Not desired:

- playful startup template
- cyberpunk dashboard
- generic developer portfolio
- generic SaaS landing page
- gaming website
- neon overload
- animation showcase with no purpose

---

## Color

Start primarily neutral.

Preferred foundation:

- warm off-white / very light neutral background
- near-black foreground
- subtle muted gray
- one intentional accent color

Dark mode may be considered later.

Do not introduce multiple competing accent colors without a design reason.

Avoid default AI purple gradients.

---

## Typography

Typography should carry much of the visual identity.

Use:

- strong sans-serif for primary/interface typography
- mono selectively for engineering metadata
- optional editorial/display face only if it materially improves the concept

Current Geist installation may be used as the foundation.

Typography should use strong differences in:

- scale
- weight
- spacing
- line length
- alignment

Avoid excessively small body text.

---

## Grid

Use a strong underlying grid.

Desktop layouts may intentionally break the grid for emphasis.

Prefer:

- generous outer margins
- meaningful negative space
- varied section rhythms
- asymmetric project compositions

Avoid repeating the exact same centered container for every section.

---

## Surfaces

Do not put everything inside cards.

Use:

- open layouts
- rules/lines
- typography
- spacing
- image framing
- subtle surface changes

Cards should exist only when the content model genuinely requires a card.

---

## Icons

Use Lucide when standard icons are needed.

Use Morphicons when an icon represents changing interface state.

Morphing icons should feel subtle and functional rather than decorative.

---

## Motion System

### Level 1 — CSS

Use for:

- focus states
- basic color transitions
- tiny hover transitions

### Level 2 — Motion

Use for:

- text/image reveals
- navigation interaction
- hover responses
- project previews
- layout transitions
- shared element transitions
- cursor-related microinteractions
- subtle scroll-linked movement

### Level 3 — GSAP + ScrollTrigger

Reserve for:

- signature hero sequence
- major project storytelling sequence
- pinned narrative sections
- complex scroll choreography

There should generally be no more than 2–3 major GSAP sequences on the site.

### Level 4 — WebGL / 3D

Not part of the initial stack.

Only introduce Three.js/R3F later if an approved visual concept cannot be accomplished effectively with DOM/SVG/CSS.

---

## Signature Interaction

The portfolio should eventually contain one memorable interaction tied to engineering rather than arbitrary decoration.

Candidate direction:

An interactive system/map representing concepts such as:

Product
→ Interface
→ API
→ Data
→ Automation
→ AI

As the visitor interacts or scrolls, the system transforms into or connects with actual project stories.

Do not implement this until the homepage visual direction is approved.

---

## Imagery

Prioritize:

1. real screenshots of public projects
2. custom diagrams
3. abstract engineering/system graphics
4. generated visual artwork that follows this design system

Avoid generic:

- laptop stock photography
- programmers at desks
- fake dashboards
- random AI illustrations
- generic Unsplash backgrounds

---

## Project Presentation

Projects are case studies, not small portfolio cards.

Each major project should have its own composition.

Possible information:

- index
- project name
- one-sentence purpose
- role
- year
- selected technologies
- engineering challenge
- key architecture/system idea
- visual
- link if public

Do not repeat an identical template for every project.

---

## Mobile

Mobile should preserve the design concept but may simplify cinematic effects.

Do not merely convert every desktop row into:

`flex-direction: column`.

Reconsider:

- type scale
- order
- visual framing
- interaction
- animation
- navigation

for small screens.

---

## Accessibility

All meaningful information must remain available without animation.

Honor reduced-motion preferences.

Ensure:

- keyboard navigation
- visible focus
- semantic markup
- sufficient contrast
- usable touch targets

---

## Performance

Prefer transform/opacity animations.

Lazy-load expensive visual sections.

Avoid unnecessary client components.

Do not introduce heavy media or WebGL merely for aesthetics.

---

## Anti-AI Design Rules

Explicitly avoid:

- "Hi, I'm Navin 👋"
- centered hero + two CTA buttons + profile image
- skill progress bars
- giant technology-logo clouds
- glowing background orbs
- gradient text everywhere
- glass cards
- repetitive bento blocks
- every container having `rounded-2xl`
- testimonial-style sections
- generic "My Journey" timelines
- fake metrics
- unnecessary floating particles
- identical reveal animation on every element
- excessive `whileHover={{ scale: ... }}`