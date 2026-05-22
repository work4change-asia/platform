# Brand Token Implementation — Design Spec

**Date:** 2026-05-22
**Status:** Approved
**Source:** Work4Change Asia Brand Book (Google Drive, `1-z0eh4IckSibXP8HQml4vfG3J-1XuFGi`)

---

## Summary

Wire the Work4Change Asia brand colors and typography into the Next.js + Tailwind CSS project using CSS custom properties as the single source of truth, referenced by the Tailwind config. Light mode only for MVP.

---

## Approach

**CSS custom properties + Tailwind references (Option A)**

All token values live in `globals.css` as CSS variables. `tailwind.config.ts` references them via `var(--token-name)` — never raw hex. This is the shadcn/ui-native pattern and leaves the door open for dark mode later with zero structural changes (just add a `.dark {}` block).

---

## Color Tokens

Defined on `:root` in `apps/web/app/globals.css`:

```css
:root {
  /* Primary palette */
  --color-teal-deep:     #0A3B44;  /* nav, headers, structural elements */
  --color-orange-warm:   #FF8A42;  /* CTAs, primary actions */
  --color-teal-bright:   #2AB5C8;  /* icons, links, secondary emphasis */
  --color-white-soft:    #F4F1EC;  /* content backgrounds, large light areas */

  /* Secondary palette */
  --color-black:         #000000;  /* body text, high-contrast — use sparingly */
  --color-rust:          #C45A23;  /* secondary highlights, data viz */
  --color-gray-charcoal: #3B3B3B;  /* secondary text, icons, UI elements */
  --color-brown-warm:    #D68A55;  /* earthy accents, illustrations */
  --color-blue-pale:     #A7BFC8;  /* cards, tables, section backgrounds */
}
```

---

## Tailwind Config (`apps/web/tailwind.config.ts`)

```ts
import defaultTheme from 'tailwindcss/defaultTheme'

theme: {
  extend: {
    colors: {
      brand: {
        teal:         'var(--color-teal-deep)',
        orange:       'var(--color-orange-warm)',
        'teal-light': 'var(--color-teal-bright)',
        'white-soft': 'var(--color-white-soft)',
        rust:         'var(--color-rust)',
        charcoal:     'var(--color-gray-charcoal)',
        brown:        'var(--color-brown-warm)',
        'blue-pale':  'var(--color-blue-pale)',
      },
    },
    fontFamily: {
      sans: ['var(--font-manrope)', ...defaultTheme.fontFamily.sans],
    },
  },
},
```

Utility classes: `bg-brand-teal`, `text-brand-orange`, `bg-brand-blue-pale`, etc.

---

## Typography

**Typeface:** Manrope (Google Fonts) — loaded via `next/font/google` in `apps/web/app/layout.tsx`.

```tsx
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '600'],     // regular + semi-bold only
  variable: '--font-manrope',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  )
}
```

Manrope is set as the default `sans` stack — no extra utility class needed anywhere.

### Type scale

The brand book's scale maps exactly to Tailwind defaults; no custom sizes required:

| Role | Size | Weight | Tailwind classes |
|---|---|---|---|
| H1 | 36px | Semi Bold | `text-4xl font-semibold` |
| H2 | 24px | Semi Bold | `text-2xl font-semibold` |
| H3 | 18px | Regular | `text-lg font-normal` |
| Body | 16px | Regular | `text-base font-normal` |

---

## Storybook Compatibility

CSS variables and Tailwind classes work in Storybook automatically once `globals.css` is imported in `.storybook/preview.ts`. The only exception is `next/font/google`, which requires a small mock (~5 lines) in the Storybook preview to set `--font-manrope` and load Manrope via a `@import`. This is handled when Storybook is set up — it does not affect this design.

---

## Out of Scope

- Dark mode (deferred to post-MVP)
- Spacing / padding system (not specified in brand book)
- Border radius, shadow/elevation system (not specified in brand book)
- Logo usage rules (visual-only in brand book, not extractable as tokens)
- Component-level specs (buttons, inputs, cards) — separate design work
