# Selected Filter Pill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `SelectedFilterPill` component that shows an applied search filter as a cream pill with a clickable ✕ to remove it, matching `~/shared/from-mongo/selected-filter-pills.png`.

**Architecture:** A new `XMarkIcon` (plain crossing strokes, no background) joins the existing icon set in `apps/web/components/ui/icons/`. `SelectedFilterPill` reuses `badgeVariants({ variant: "filter" })` from `apps/web/components/ui/badge.tsx` for its base look and wraps the icon in a `<button>` with an accessible label. A Storybook story demonstrates the mockup layout and interactive removal.

**Tech Stack:** Next.js App Router, React, `class-variance-authority` (via existing `badgeVariants`), `tailwind-merge`, Storybook (`@storybook/nextjs-vite`).

## Global Constraints

- No `any`, no `as Foo` assertions, no `!` non-null assertion, no `@ts-ignore`/`@ts-expect-error` (Oxlint-enforced project rule).
- No lint-suppression comments.
- Icons render at `currentColor` and follow the shared `IconProps` type (`apps/web/components/ui/icons/icon.tsx`): `size?: number | string`, width/height set from `size`, `viewBox` scales the artwork.
- This repo has no component-level test runner wired up (`pnpm test` runs Vitest against `packages/domain` and other non-UI code only). Verification for UI tasks in this plan is: `pnpm typecheck`, `pnpm lint`, and a manual/visual check in Storybook — not automated component tests.
- Run `pnpm typecheck` and `pnpm lint` after every task before committing.

---

### Task 1: Add `XMarkIcon`

**Files:**
- Create: `apps/web/components/ui/icons/x-mark.tsx`
- Modify: `apps/web/components/ui/icons/index.ts`

**Interfaces:**
- Consumes: `IconProps` from `./icon` (`{ size?: number | string } & Omit<SVGProps<SVGSVGElement>, "width" | "height">`).
- Produces: `XMarkIcon(props: IconProps): JSX.Element` — a plain ✕ with no background, for use inside `SelectedFilterPill` (Task 2).

- [ ] **Step 1: Create the icon file**

```tsx
// apps/web/components/ui/icons/x-mark.tsx
import type { IconProps } from "./icon";

export function XMarkIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Register the export**

In `apps/web/components/ui/icons/index.ts`, the exports are alphabetically ordered by icon name. Add the new line after `export { VisibilityIcon } from "./visibility";` (the last entry):

```ts
export { VisibilityIcon } from "./visibility";
export { XMarkIcon } from "./x-mark";
```

- [ ] **Step 3: Typecheck and lint**

Run: `pnpm typecheck`
Expected: no errors.

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add apps/web/components/ui/icons/x-mark.tsx apps/web/components/ui/icons/index.ts
git commit -m "feat(ui): add XMarkIcon"
```

---

### Task 2: Add `SelectedFilterPill` component

**Files:**
- Create: `apps/web/components/ui/selected-filter-pill.tsx`

**Interfaces:**
- Consumes: `badgeVariants` from `./badge` (`apps/web/components/ui/badge.tsx`, already exports `variant: "filter"` → `"bg-cream text-brown gap-1"`); `XMarkIcon` from `./icons` (Task 1); `twMerge` from `tailwind-merge` (already a project dependency, see `badge.tsx`).
- Produces: `SelectedFilterPill(props: SelectedFilterPillProps): JSX.Element` and `SelectedFilterPillProps` type, for use in the story (Task 3) and, later, in `job-search-filters.tsx` (out of scope for this plan).

- [ ] **Step 1: Create the component**

```tsx
// apps/web/components/ui/selected-filter-pill.tsx
import { twMerge } from "tailwind-merge";
import { badgeVariants } from "./badge";
import { XMarkIcon } from "./icons";

export type SelectedFilterPillProps = {
  label: string;
  onRemove: () => void;
  className?: string;
};

export function SelectedFilterPill({ label, onRemove, className }: SelectedFilterPillProps) {
  return (
    <span className={twMerge(badgeVariants({ variant: "filter" }), "py-1.5 pr-2 pl-3 text-sm", className)}>
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="-m-1 rounded-full p-1 text-brown/70 hover:text-brown focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown"
      >
        <XMarkIcon size={10} />
      </button>
    </span>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `pnpm typecheck`
Expected: no errors.

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/ui/selected-filter-pill.tsx
git commit -m "feat(ui): add SelectedFilterPill component"
```

---

### Task 3: Add Storybook stories

**Files:**
- Create: `apps/web/components/ui/selected-filter-pill.stories.tsx`

**Interfaces:**
- Consumes: `SelectedFilterPill`, `SelectedFilterPillProps` from `./selected-filter-pill` (Task 2).

- [ ] **Step 1: Create the stories file**

```tsx
// apps/web/components/ui/selected-filter-pill.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { SelectedFilterPill } from "./selected-filter-pill";

const meta = {
  title: "UI/SelectedFilterPill",
  component: SelectedFilterPill,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectedFilterPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Fully Remote (local)",
    onRemove: () => {},
  },
};

export const SelectedFilters: Story = {
  args: { label: "Bangalore", onRemove: () => {} },
  render: () => {
    const [filters, setFilters] = useState([
      "Bangalore",
      "Strategy & Organisational Development",
      "Fully Remote (local)",
      "Freelance/Consultancy",
    ]);

    return (
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <SelectedFilterPill
            key={filter}
            label={filter}
            onRemove={() => setFilters((prev) => prev.filter((f) => f !== filter))}
          />
        ))}
      </div>
    );
  },
};
```

- [ ] **Step 2: Typecheck and lint**

Run: `pnpm typecheck`
Expected: no errors.

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/ui/selected-filter-pill.stories.tsx
git commit -m "feat(ui): add SelectedFilterPill stories"
```

- [ ] **Step 4: Visual check in Storybook (parent session, not the implementing subagent)**

This step requires browser tooling (e.g. `chrome-devtools`) that a task-implementing subagent may not have — run it in the parent session after Task 3 is committed, not as part of the subagent's own task.

Run: `pnpm storybook` (skip if already running).
Open `http://localhost:6006`, navigate to "UI/SelectedFilterPill":
- `Default` story shows one cream pill, brown text, brown ✕ on the right.
- `SelectedFilters` story shows four pills in a row matching `~/shared/from-mongo/selected-filter-pills.png`. Click each ✕ and confirm the pill disappears from the row.
- Tab to a pill's ✕ with the keyboard and confirm a visible focus ring appears, and pressing Enter/Space removes it.

---

## Out of Scope

Wiring `SelectedFilterPill` into `apps/web/components/job-board/job-search-filters.tsx` to reflect and remove live selections — that section's filter state isn't URL-driven yet per project conventions, so integration is a separate piece of work.
