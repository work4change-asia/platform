# ADR-0004: Component System

Date: 2026-05-18
Status: Accepted

## Context

A designer is delivering Figma screens and a design system (colors, spacing, typography tokens). The question was whether to use a component library, import Figma exports directly, or build fully custom components.

## Decision

**shadcn/ui** as the behavioral/accessibility base, fully restyled to the Figma design tokens. Components are copied into the codebase via the shadcn CLI — they are not a versioned npm dependency.

**Storybook** for component development, with the Figma addon (`@storybook/addon-designs`) linking each story to its Figma frame.

## Reasoning

Components have two layers: **behavior** (keyboard navigation, ARIA, focus trapping, scroll locking) and **appearance** (colors, spacing, typography). The designer specifies appearance. shadcn/ui (built on Radix UI primitives) handles behavior.

Separating these concerns means:

- Accessibility is solved by Radix, not reinvented
- Designer's visual spec maps directly onto restyled components
- Every component is a file in the repo — auditable, modifiable, no upstream surprises

The Storybook ↔ Figma link creates a tight feedback loop: the designer reviews the live component alongside their Figma frame in one view.

## Alternatives rejected

**Figma export / code generation (Locofy, Anima, Dev Mode)**

- Exports produce static HTML/CSS with no state, no accessibility, and no interactivity
- Would require rebuilding all behavior from scratch anyway
- Rejected

**Fully custom components (no library base)**

- Would require reimplementing modal focus trapping, combobox keyboard nav, dropdown positioning, etc.
- Each is exactly where homegrown implementations introduce accessibility regressions
- Rejected

**MUI / Chakra / Mantine**

- Heavy runtime, opinionated theming that fights custom design systems
- Large dependency surface
- Rejected

**Emotion / styled-components**

- Runtime CSS generation — extra JS shipped to every page
- No build-time purging
- Rejected in favour of Tailwind (build-time, no runtime)
