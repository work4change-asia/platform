# Brand Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire Work4Change Asia brand colors and Manrope typography into the Next.js + Tailwind CSS project via CSS custom properties.

**Architecture:** All token values live as CSS custom properties on `:root` in `globals.css`. `tailwind.config.ts` references them via `var(--token-name)` — never raw hex. Manrope is loaded at build time via `next/font/google` and injected as a CSS variable consumed by the Tailwind font stack.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, `next/font/google`, Vitest

**Prerequisite:** `apps/web` must be scaffolded as a Next.js + Payload CMS v3 project with Tailwind CSS before running this plan. This plan picks up from a working scaffold.

**Spec:** `docs/superpowers/specs/2026-05-22-brand-tokens-design.md`

---

## File Map

| Action | File                               | Responsibility                                                         |
| ------ | ---------------------------------- | ---------------------------------------------------------------------- |
| Modify | `apps/web/app/globals.css`         | Defines all brand token CSS custom properties on `:root`               |
| Modify | `apps/web/tailwind.config.ts`      | Extends Tailwind theme with brand color aliases and font stack         |
| Modify | `apps/web/app/layout.tsx`          | Loads Manrope via `next/font/google`, injects `--font-manrope` CSS var |
| Create | `apps/web/app/globals.test.css.ts` | Vitest: verifies Tailwind config exports expected brand keys           |

---

## Task 1: Add CSS custom property tokens to `globals.css`

**Files:**

- Modify: `apps/web/app/globals.css`

- [ ] **Step 1: Add brand tokens to `:root`**

Open `apps/web/app/globals.css`. Inside the existing `:root` block (or create one if absent), add all brand token variables. The final `:root` block must contain at minimum:

```css
@layer base {
  :root {
    /* Primary palette */
    --color-teal-deep: #0a3b44; /* nav, headers, structural elements */
    --color-orange-warm: #ff8a42; /* CTAs, primary actions */
    --color-teal-bright: #2ab5c8; /* icons, links, secondary emphasis */
    --color-white-soft: #f4f1ec; /* content backgrounds, large light areas */

    /* Secondary palette */
    --color-black: #000000; /* body text, high-contrast — use sparingly */
    --color-rust: #c45a23; /* secondary highlights, data viz */
    --color-gray-charcoal: #3b3b3b; /* secondary text, icons, UI elements */
    --color-brown-warm: #d68a55; /* earthy accents, illustrations */
    --color-blue-pale: #a7bfc8; /* cards, tables, section backgrounds */
  }
}
```

> Note: Tailwind v4 uses `@layer base` for `:root` declarations. If the scaffold uses Tailwind v3, omit the `@layer base` wrapper.

- [ ] **Step 2: Commit**

```bash
git add apps/web/app/globals.css
git commit -m "feat: add brand color tokens as CSS custom properties"
```

---

## Task 2: Extend Tailwind config with brand color aliases and font stack

**Files:**

- Modify: `apps/web/tailwind.config.ts`
- Create: `apps/web/tailwind.config.test.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/web/tailwind.config.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import config from "./tailwind.config";

describe("tailwind brand tokens", () => {
  const colors = config.theme?.extend?.colors as Record<string, Record<string, string>>;

  it("exports all primary brand color keys", () => {
    expect(colors.brand).toMatchObject({
      teal: "var(--color-teal-deep)",
      orange: "var(--color-orange-warm)",
      "teal-light": "var(--color-teal-bright)",
      "white-soft": "var(--color-white-soft)",
    });
  });

  it("exports all secondary brand color keys", () => {
    expect(colors.brand).toMatchObject({
      rust: "var(--color-rust)",
      charcoal: "var(--color-gray-charcoal)",
      brown: "var(--color-brown-warm)",
      "blue-pale": "var(--color-blue-pale)",
    });
  });

  it("sets Manrope as the first sans font", () => {
    const fontFamily = config.theme?.extend?.fontFamily as Record<string, string[]>;
    expect(fontFamily.sans[0]).toBe("var(--font-manrope)");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/web && pnpm vitest run tailwind.config.test.ts
```

Expected: FAIL — `colors.brand` is undefined or missing keys.

- [ ] **Step 3: Extend the Tailwind config**

Open `apps/web/tailwind.config.ts` and update the `theme.extend` section:

```ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "var(--color-teal-deep)",
          orange: "var(--color-orange-warm)",
          "teal-light": "var(--color-teal-bright)",
          "white-soft": "var(--color-white-soft)",
          rust: "var(--color-rust)",
          charcoal: "var(--color-gray-charcoal)",
          brown: "var(--color-brown-warm)",
          "blue-pale": "var(--color-blue-pale)",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd apps/web && pnpm vitest run tailwind.config.test.ts
```

Expected: PASS — all 3 tests green.

- [ ] **Step 5: Commit**

```bash
git add apps/web/tailwind.config.ts apps/web/tailwind.config.test.ts
git commit -m "feat: extend Tailwind theme with brand color aliases and Manrope font stack"
```

---

## Task 3: Load Manrope via `next/font/google` in `layout.tsx`

**Files:**

- Modify: `apps/web/app/layout.tsx`
- Create: `apps/web/app/layout.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/web/app/layout.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("applies the Manrope font variable class to <html>", () => {
    const { container } = render(
      <RootLayout>
        <div>test</div>
      </RootLayout>,
    );
    const html = container.querySelector("html");
    expect(html?.className).toContain("__variable_");
  });
});
```

> Note: `next/font/google` generates a hashed class name like `__variable_abc123` for the CSS variable. The test checks the class is present without hardcoding the hash.

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/web && pnpm vitest run app/layout.test.tsx
```

Expected: FAIL — no font variable class on `<html>`.

- [ ] **Step 3: Update `layout.tsx` to load Manrope**

```tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Work4Change Asia",
  description: "Career platform for the non-profit and impact sectors across Asia and Pacific.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd apps/web && pnpm vitest run app/layout.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Run all tests to check for regressions**

```bash
cd apps/web && pnpm test
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/layout.tsx apps/web/app/layout.test.tsx
git commit -m "feat: load Manrope via next/font and inject --font-manrope CSS variable"
```

---

## Task 4: Smoke-test brand tokens in the browser

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

```bash
cd apps/web && pnpm dev
```

- [ ] **Step 2: Open the browser and verify**

Navigate to `http://localhost:3000`. Open DevTools → Elements → inspect `<html>`:

- The `class` attribute should include a `__variable_` class (Manrope font variable)
- In the Computed styles for `:root`, confirm `--color-teal-deep`, `--color-orange-warm`, and the other 7 variables are listed with correct hex values

- [ ] **Step 3: Verify Tailwind utility classes resolve**

Add a temporary element to any page (remove after verification):

```tsx
<div className="bg-brand-teal text-brand-white-soft p-4">Brand token test</div>
```

Expected in browser: dark teal background (`#0A3B44`) with soft white text (`#F4F1EC`).

- [ ] **Step 4: Remove the temporary test element and stop the server**
