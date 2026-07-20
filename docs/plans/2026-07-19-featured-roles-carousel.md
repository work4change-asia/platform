# Featured Roles Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a teal "FEATURED ROLES" carousel section to the job board page, directly under the results toolbar, reusing job-card carousel behavior extracted from the home page into a shared `JobCarousel` primitive.

**Architecture:** Extract the carousel mechanics currently inline in the home page's `FeaturedJobs` component into a standalone `apps/web/components/ui/job-carousel.tsx`. Rename `FeaturedJobs` to `FreshFromTheField`, which keeps its existing cream background and desktop grid, delegating only its mobile carousel to `JobCarousel`. Add a new `FeaturedRoles` component for the job board that always renders as a carousel (all breakpoints) on a teal background, using the `featured` `JobCard` variant.

**Tech Stack:** Next.js App Router (React Server/Client Components), Tailwind CSS, Storybook (`@storybook/nextjs-vite`) with play-function tests run through the `storybook` Vitest project (real Chromium via Playwright).

## Global Constraints

- No `any`, `as Foo` assertions, `!` non-null assertions, or `@ts-ignore`/`@ts-expect-error` anywhere (per `CLAUDE.md`).
- No lint-suppression comments.
- Run `pnpm typecheck`, `pnpm lint`, and `pnpm test` before every commit (not just before PRs).
- Never chain shell commands with `&&`/`;` — run them as separate commands.
- Work stays on the `feat/featured-roles-carousel` branch (already checked out) — do not commit to `main`.
- Commits use the project's existing conventional-commit style (see `git log`).

---

### Task 1: Extract `JobCarousel` with a Storybook interaction test

**Files:**
- Create: `apps/web/components/ui/job-carousel.tsx`
- Create: `apps/web/components/ui/job-carousel.stories.tsx`

**Interfaces:**
- Produces: `JobCarousel` — `export function JobCarousel({ jobs, featured = false }: JobCarouselProps)`, where `JobCarouselProps = { jobs: JobCardData[]; featured?: boolean }` (`JobCardData` imported from `@/lib/home-data`). Renders a `<div>` containing: prev/next arrow buttons (`aria-label="Previous"` / `aria-label="Next"`, disabled at the first/last slide), a sliding track of `JobCard` components (each receiving `featured` from the carousel), and an `aria-live="polite"` `sr-only` paragraph reading `Slide {current + 1} of {jobs.length}`. No breakpoint logic, background, or heading — purely the carousel primitive. This is what Task 3 and Task 4 both consume.

- [ ] **Step 1: Write the story with a failing interaction test**

Create `apps/web/components/ui/job-carousel.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { JobCarousel } from "./job-carousel";
import type { JobCardData } from "@/lib/home-data";

const SAMPLE_JOBS: JobCardData[] = [
  {
    id: "1",
    title: "Product Designer",
    organization: "Google Inc",
    location: "Singapore",
    postedAt: "2h ago",
    href: "#",
  },
  {
    id: "2",
    title: "Email Marketing Specialist",
    organization: "Spotify",
    location: "Singapore",
    workModality: "Remote",
    postedAt: "5h ago",
    href: "#",
  },
  {
    id: "3",
    title: "Full-stack Developer",
    organization: "GitHub",
    location: "Japan",
    postedAt: "1d ago",
    href: "#",
  },
  {
    id: "4",
    title: "Content Writer",
    organization: "WordPress",
    location: "Philippines",
    workModality: "Remote",
    postedAt: "1d ago",
    href: "#",
  },
];

const meta = {
  title: "UI/JobCarousel",
  component: JobCarousel,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[700px] bg-cream p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof JobCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobs: SAMPLE_JOBS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevButton = canvas.getByLabelText("Previous");
    const nextButton = canvas.getByLabelText("Next");

    await expect(prevButton).toBeDisabled();
    await expect(nextButton).not.toBeDisabled();
    await expect(canvas.getByText("Slide 1 of 4")).toBeInTheDocument();

    await userEvent.click(nextButton);
    await expect(prevButton).not.toBeDisabled();
    await expect(canvas.getByText("Slide 2 of 4")).toBeInTheDocument();

    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    await expect(nextButton).toBeDisabled();
    await expect(canvas.getByText("Slide 4 of 4")).toBeInTheDocument();

    await userEvent.click(prevButton);
    await expect(nextButton).not.toBeDisabled();
    await expect(canvas.getByText("Slide 3 of 4")).toBeInTheDocument();
  },
};

export const FeaturedOnTeal: Story = {
  args: {
    jobs: SAMPLE_JOBS,
    featured: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[700px] bg-teal p-6">
        <Story />
      </div>
    ),
  ],
};
```

- [ ] **Step 2: Run the storybook test project to verify it fails**

Run: `pnpm vitest run --project storybook job-carousel` (from the repo root, where `vitest.config.ts` lives)
Expected: FAIL — `job-carousel.tsx` does not exist yet (module resolution error).

- [ ] **Step 3: Implement `JobCarousel`**

Create `apps/web/components/ui/job-carousel.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { JobCard } from "./job-card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { JobCardData } from "@/lib/home-data";

const PEEK_PX = 32;
const GAP_PX = 20;
const MAX_CARD_WIDTH_PX = 288; // matches JobCard's max-w-72

export type JobCarouselProps = {
  jobs: JobCardData[];
  featured?: boolean;
};

export function JobCarousel({ jobs, featured = false }: JobCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const size = entries[0]?.borderBoxSize[0]?.inlineSize;
      if (size) setContainerWidth(Math.round(size));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardWidth = Math.min(containerWidth - PEEK_PX, MAX_CARD_WIDTH_PX);
  const stepPx = cardWidth + GAP_PX;

  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(jobs.length - 1, i + 1));

  return (
    <div>
      <div className="mb-3 flex justify-end gap-2">
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
        >
          <ArrowLeftIcon size={22} />
        </button>
        <button
          onClick={next}
          disabled={current === jobs.length - 1}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
        >
          <ArrowRightIcon size={22} />
        </button>
      </div>

      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${current * stepPx}px)`, gap: GAP_PX }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{ minWidth: containerWidth > 0 ? cardWidth : "calc(100% - 32px)" }}
            >
              <JobCard {...job} featured={featured} />
            </div>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Slide {current + 1} of {jobs.length}
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run the storybook test project to verify it passes**

Run: `pnpm vitest run --project storybook job-carousel` (from the repo root)
Expected: PASS — both `Default` and `FeaturedOnTeal` stories build; `Default`'s play function passes all assertions.

- [ ] **Step 5: Typecheck and lint**

Run: `pnpm typecheck`
Expected: no errors.

Run: `pnpm lint`
Expected: no errors (auto-fixes applied if any).

- [ ] **Step 6: Commit**

```bash
git add apps/web/components/ui/job-carousel.tsx apps/web/components/ui/job-carousel.stories.tsx
git commit -m "feat(ui): extract JobCarousel as a reusable job-card carousel"
```

---

### Task 2: Rename `FeaturedJobs` to `FreshFromTheField` and delegate to `JobCarousel`

**Files:**
- Create: `apps/web/components/home/fresh-from-the-field.tsx`
- Delete: `apps/web/components/home/featured-jobs.tsx`
- Modify: `apps/web/app/(frontend)/page.tsx`

**Interfaces:**
- Consumes: `JobCarousel({ jobs, featured? })` from Task 1.
- Produces: `FreshFromTheField` — `export function FreshFromTheField({ jobs }: { jobs: JobCardData[] })`. Used by `apps/web/app/(frontend)/page.tsx` in place of `FeaturedJobs`.

This task has no new automated test — it is a refactor of already-visually-verified markup (Task 1's `JobCarousel` story already covers the carousel's own behavior). Verify by reading the diff carefully: the desktop grid markup and outer section markup must be byte-for-byte equivalent to the current `featured-jobs.tsx`, only the mobile carousel internals move to `JobCarousel`.

- [ ] **Step 1: Create the renamed component**

Create `apps/web/components/home/fresh-from-the-field.tsx`:

```tsx
import NextLink from "next/link";
import { JobCard } from "@/components/ui/job-card";
import { JobCarousel } from "@/components/ui/job-carousel";
import { buttonVariants } from "@/components/ui/button";
import type { JobCardData } from "@/lib/home-data";

type FreshFromTheFieldProps = {
  jobs: JobCardData[];
};

export function FreshFromTheField({ jobs }: FreshFromTheFieldProps) {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-tiny font-semibold uppercase tracking-widest text-orange">
            Start Here, Find Purpose
          </p>
          <h2 className="text-h4 font-semibold text-teal">Fresh from the Field</h2>
        </div>

        {/* Mobile carousel */}
        <div className="sm:hidden">
          <JobCarousel jobs={jobs} />
        </div>

        {/* Desktop grid — fixed card-width columns so cards never stretch past their square size */}
        <div className="hidden sm:grid sm:grid-cols-[repeat(auto-fill,18rem)] sm:justify-center sm:gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <NextLink
            href="/job-board"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            See All Jobs
          </NextLink>
          <NextLink href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Share An Opening
          </NextLink>
        </div>
      </div>
    </section>
  );
}
```

Note: this component no longer needs `"use client"` — `useEffect`/`useRef`/`useState`/arrow-button state all moved into `JobCarousel`, and everything left here (`NextLink`, static markup) works as a Server Component.

- [ ] **Step 2: Delete the old file**

```bash
git rm apps/web/components/home/featured-jobs.tsx
```

- [ ] **Step 3: Update the home page import**

In `apps/web/app/(frontend)/page.tsx`, change:

```tsx
import { FeaturedJobs } from "@/components/home/featured-jobs";
```

to:

```tsx
import { FreshFromTheField } from "@/components/home/fresh-from-the-field";
```

And change:

```tsx
<FeaturedJobs jobs={featuredJobs} />
```

to:

```tsx
<FreshFromTheField jobs={featuredJobs} />
```

- [ ] **Step 4: Run the full test suite**

Run: `pnpm typecheck`
Expected: no errors (confirms no stale imports of `FeaturedJobs` remain anywhere).

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm test`
Expected: all existing tests pass, including the `JobCarousel` story test from Task 1.

- [ ] **Step 5: Manual visual check**

Run: `pnpm dev`, open `/` in a browser at a mobile width (e.g. 375px) and confirm the "Fresh from the Field" section still shows a swipeable single-card carousel with working prev/next arrows. Resize to desktop width (≥640px) and confirm it switches back to the existing multi-column grid, unchanged from before this refactor.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(home): rename FeaturedJobs to FreshFromTheField, delegate to JobCarousel"
```

---

### Task 3: Add the `FeaturedRoles` job board section

**Files:**
- Create: `apps/web/components/job-board/featured-roles.tsx`
- Modify: `apps/web/app/(frontend)/job-board/page.tsx`

**Interfaces:**
- Consumes: `JobCarousel({ jobs, featured? })` from Task 1; `featuredJobs: JobCardData[]` from `@/lib/home-data`.
- Produces: `FeaturedRoles` — `export function FeaturedRoles({ jobs }: { jobs: JobCardData[] })`. Rendered by `apps/web/app/(frontend)/job-board/page.tsx` directly below the existing `<div className="bg-cream py-6">...<JobResultsToolbar /></div>` block.

No new automated test for this component (per the design spec, it's a thin composition wrapper around already-tested `JobCarousel`/`JobCard`). Verify visually in Step 4.

- [ ] **Step 1: Create `FeaturedRoles`**

Create `apps/web/components/job-board/featured-roles.tsx`:

```tsx
import { JobCarousel } from "@/components/ui/job-carousel";
import type { JobCardData } from "@/lib/home-data";

type FeaturedRolesProps = {
  jobs: JobCardData[];
};

export function FeaturedRoles({ jobs }: FeaturedRolesProps) {
  return (
    <section className="bg-teal py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-h4 font-semibold text-cream">FEATURED ROLES</h2>
        <JobCarousel jobs={jobs} featured />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire it into the job board page**

In `apps/web/app/(frontend)/job-board/page.tsx`, add the import:

```tsx
import { FeaturedRoles } from "@/components/job-board/featured-roles";
import { featuredJobs } from "@/lib/home-data";
```

And render it directly after the results-toolbar block, so the return statement's closing section becomes:

```tsx
      <JobSearchFilters />

      <div className="bg-cream py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* count is a placeholder until the results grid (out of scope here) ships */}
          <JobResultsToolbar
            count={0}
            sort={sort}
            perPage={perPage}
            view={view}
            currentSearch={currentSearch}
          />
        </div>
      </div>

      <FeaturedRoles jobs={featuredJobs} />
    </div>
  );
}
```

- [ ] **Step 3: Run the full test suite**

Run: `pnpm typecheck`
Expected: no errors.

Run: `pnpm lint`
Expected: no errors.

Run: `pnpm test`
Expected: all tests pass.

- [ ] **Step 4: Manual visual check**

Run: `pnpm dev`, open `/job-board` in a browser.

- Confirm a teal "FEATURED ROLES" section appears directly under the results toolbar, with dark (`featured`-variant) job cards.
- Confirm it behaves as a carousel (arrows, sliding) at both mobile and desktop widths — unlike the home page section, it should never switch to a static grid.
- Tab through the prev/next buttons with the keyboard and confirm focus rings are visible (`focus-visible:outline-2 outline-teal-light` on `JobCard`, default browser focus ring on the arrow buttons).
- Enable "reduce motion" in OS/browser accessibility settings and confirm the slide transition becomes an instant jump instead of animating.
- Check arrow icon contrast against the teal background — `border-gray-200`/`text-gray-400` should still read clearly on `bg-teal` (`#0a3b44`); if not, flag it as a follow-up rather than reworking `JobCarousel`'s color scheme unilaterally.

- [ ] **Step 5: Commit**

```bash
git add apps/web/components/job-board/featured-roles.tsx apps/web/app/\(frontend\)/job-board/page.tsx
git commit -m "feat(job-board): add Featured Roles carousel section"
```

---

## Post-plan check

- [ ] Re-read `docs/specs/2026-07-19-featured-roles-carousel-design.md` and confirm every item is covered: `JobCarousel` extraction with `featured` prop (Task 1), home page keeps its desktop grid and only swaps mobile carousel internals (Task 2), job board section is always-carousel on teal (Task 3), `aria-live` + `prefers-reduced-motion` handling (Task 1), swipe/touch drag explicitly not implemented (Task 1, matches spec's deferred note), Storybook story only for `JobCarousel` (Task 1).
