---
name: Product Specimen Portfolio
description: An artifact-led software engineering portfolio that reveals the systems underneath finished products.
colors:
  cobalt-signal: "#3157f5"
  cobalt-soft: "#dfe5ff"
  mineral-paper: "#f3f1eb"
  raised-paper: "#f8f6f4"
  graphite: "#171716"
  graphite-muted: "#66645f"
  rule: "#c9c5bc"
  rule-strong: "#8f8c85"
typography:
  display:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "clamp(3.4rem, 4.25vw, 3.85rem)"
    fontWeight: 640
    lineHeight: 0.94
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 7vw, 6rem)"
    fontWeight: 630
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist Mono, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.05em"
rounded:
  square: "0px"
  optical: "999px"
spacing:
  touch-target: "44px"
  gutter: "clamp(1.25rem, 3.5vw, 4.25rem)"
  section: "clamp(8rem, 13vw, 13rem)"
components:
  navigation-link:
    textColor: "{colors.graphite}"
    rounded: "{rounded.square}"
    height: "44px"
    padding: "0 0.6rem"
  unavailable-action:
    textColor: "{colors.graphite-muted}"
    rounded: "{rounded.square}"
    height: "44px"
  topology-control:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-muted}"
    rounded: "{rounded.square}"
    height: "10.5rem"
---

# Design System: Product Specimen Portfolio

## Overview

**Creative North Star: "The Product Specimen"**

The portfolio treats software work as evidence under inspection: finished products remain legible on the surface while precise rules, routes, and system diagrams reveal the engineering underneath. The mood is editorial, technical, calm, and exacting rather than promotional.

Warm paper and disciplined graphite establish a tactile publication-like ground. Cobalt appears only as a signal for routes, focus, state, and evidence. Asymmetric compositions and generous pauses prevent the page from feeling like a repeated card catalogue.

**Key Characteristics:**

- Artifact-led project storytelling
- Twelve-column editorial alignment with deliberate asymmetry
- Inspection geometry built from rules, nodes, routes, and one optical lens
- Flat mineral surfaces with restrained optical depth
- Purposeful motion that preserves a complete static reading

## Colors

The palette combines warm mineral neutrals with a single high-clarity cobalt signal.

### Primary

- **Cobalt Signal:** Reserved for active topology routes, selected nodes, focus outlines, navigation emphasis, and tiny evidence markers.
- **Cobalt Soft:** A supporting tint for selected or explanatory states; it must not become a broad decorative wash.

### Neutral

- **Mineral Paper:** The continuous page ground and default SVG fill.
- **Raised Paper:** The subtle lifted material inside the optical probe and image backing.
- **Graphite:** Primary text, decisive rules, and high-emphasis geometry.
- **Graphite Muted:** Explanations, metadata, captions, and secondary controls.
- **Rule / Rule Strong:** The inspection grid, dividers, artifact frames, and structural boundaries.

**The One Signal Rule.** Cobalt is the only accent and should occupy a small fraction of any viewport; its rarity gives state changes meaning.

**The Continuous Paper Rule.** Sections share one mineral ground. Use rules and spacing—not alternating colored bands—to establish chapters.

## Typography

**Display Font:** Geist (with Arial and sans-serif fallbacks)  
**Body Font:** Geist (with Arial and sans-serif fallbacks)  
**Label/Mono Font:** Geist Mono (with Consolas and monospace fallbacks)

**Character:** A compact grotesk carries both product confidence and engineering clarity. Mono is an annotation instrument, never a novelty layer.

### Hierarchy

- **Display:** Heavy, tightly tracked, and nearly solid-set; reserved for the hero thesis and major product names.
- **Headline:** Large editorial section statements with compact line-height and intentional wrapping.
- **Title:** Medium-weight project and system labels, generally kept under two lines.
- **Body:** Comfortable reading copy with a line-height of 1.55 and a typical maximum measure around 32–34rem.
- **Label:** Small mono metadata, indices, flows, and system annotations; uppercase only when the label behaves like an instrument readout.

**The Wide Editorial Rule.** Major statements should form two to four intentional lines, not narrow six-line towers.

**The Annotation Rule.** Mono belongs to evidence, sequence, state, and metadata. Narrative prose remains sans-serif.

## Layout

The desktop composition uses a twelve-column grid inside a fluid 100rem maximum canvas. Outer gutters scale from 1.25rem to 4.25rem and major chapters use 8rem to 13rem of vertical space. Content may span or skip columns to create tension, but all section edges, rules, images, and diagrams must resolve to the shared grid.

The hero separates its thesis, proof list, system map, and topology rail rather than collapsing them into a centered block. SeeMyUI occupies full visual authority in its chapter; confidential systems use distinct diagrams inside one consolidated narrative.

At tablet widths, diagrams and evidence reflow while preserving their reading order. At mobile widths, the navigation becomes a two-row structure, the hero map becomes full-width, topology becomes an ordered vertical sequence, and the SeeMyUI artifact moves before its annotations. No section may rely on horizontal clipping, and every interactive target remains at least 44px.

**The Shared Datum Rule.** A rule, image edge, or text block should align to a documented column before it is allowed to break the grid.

## Elevation & Depth

The system is flat by default. Depth comes from paper tone, hairline structure, overlapping routes, and a single optical-glass probe. The probe alone may use translucent raised paper, a restrained blur, and a soft graphite shadow; ordinary containers and project chapters do not float.

**The One Lens Rule.** Optical glass is a signature inspection device, not a reusable card treatment.

**The Flat Evidence Rule.** Screenshots and diagrams are framed with borders and captions, never generic ambient card shadows.

## Shapes

The dominant shape language is square and technical: zero-radius frames, rectilinear paths, small square nodes, and hairline borders. The circular inspection lens is the intentional exception and creates contrast with the system grid. Avoid arbitrary rounded containers and pill-shaped decoration.

## Components

### Navigation

- **Style:** Minimal sticky paper bar with a single bottom rule, compact sans labels, and a split identity lockup.
- **States:** Hover uses a precise underline; keyboard focus uses a 2px cobalt outline with visible offset.
- **Mobile:** Identity and links occupy separate rows while retaining 44px targets.

### Topology Controls

- **Shape:** Open rectangular hit areas connected by a shared rule and square nodes.
- **State:** The active node and route turn cobalt; inactive text remains muted graphite.
- **Behavior:** Desktop supports the GSAP inspection sequence and direct selection. Mobile presents the same information as readable ordered steps. Reduced-motion mode keeps every layer visible and selected state operable.

### Artifact Frame

- **Corner Style:** Square.
- **Background:** Raised paper behind the authentic project image.
- **Border:** One strong graphite-neutral rule around the image and a lighter rule beneath the caption.
- **Caption:** Mono process flow paired with an honest unavailable state when a URL is unverified.

### Evidence Rows

- **Shape:** Open rows separated by horizontal rules; no outer card shell.
- **State:** A small cobalt square may appear on hover to aid scanning.
- **Content:** Capability, proof, related work, and technologies remain distinct columns rather than repeated project summaries.

### Unavailable Actions

- **Style:** Muted graphite with an explicit “Unavailable” or verification-pending label.
- **Behavior:** Render as non-interactive text with disabled semantics; never disguise placeholder destinations as links.

## Do's and Don'ts

### Do:

- **Do** lead project chapters with authentic artifacts or semantic system diagrams.
- **Do** use generous negative space and asymmetric column spans to establish hierarchy.
- **Do** reserve cobalt for interaction, routing, selection, and small proof marks.
- **Do** use CSS for hover/focus, Motion for state transitions, and GSAP only for the signature inspection sequence.
- **Do** preserve complete static content and honor reduced-motion preferences.
- **Do** redesign mobile reading order when desktop composition would become awkward.

### Don't:

- **Don't** return to repeated atlas labels, orange nodes, identical project cards, or bento grids.
- **Don't** use generic SaaS gradients, glowing blobs, widespread glassmorphism, or text gradients.
- **Don't** add decorative particles, stock engineering imagery, fake dashboards, fabricated metrics, or deceptive links.
- **Don't** place the SeeMyUI screenshot in the hero; it is the primary artifact in the selected-work chapter.
- **Don't** animate ordinary hover feedback with GSAP or hide information behind animation.
