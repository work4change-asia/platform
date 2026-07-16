# Results Toolbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable `ResultsToolbar` UI primitive (count + sort/per-page dropdowns + grid/list toggle) and wire it into the Job Board page, driven entirely by URL query params.

**Architecture:** A generic, presentational `components/ui/results-toolbar.tsx` component (no internal state) is paired with job-board-specific config/parsing helpers and a thin client wrapper that syncs its state to `searchParams` via `next/navigation`. The server-rendered `job-board/page.tsx` reads and validates the query params, passing typed values down.

**Tech Stack:** Next.js App Router (server + client components), Tailwind v4 design tokens, `tailwind-merge`, Storybook `addon-vitest` for component tests, plain Vitest for pure-function unit tests.

## Global Constraints

- No `any`, no `as Foo` type assertions, no `!` non-null assertion, no `@ts-ignore`/`@ts-expect-error`, no lint-suppression comments (project TypeScript hard rules).
- `as const` and `satisfies` are permitted.
- Design tokens only, no new colors: `text-teal`, `text-gray-700`, `text-gray-400`, `border-gray-100`, `bg-gray-100`, `bg-cream`, `rounded-dropdown`. `gray-400`/`gray-700` aren't in `globals.css`'s custom palette but resolve from Tailwind v4's bundled default gray scale, which coexists with the custom overrides — verify this renders correctly in Storybook rather than assuming it.
- Filter/display state always lives in URL query params, never component-only state — this is a documented project decision, not a suggestion.
- Testing convention in this repo: Storybook stories run as tests via `@storybook/addon-vitest` (`pnpm test`, project "storybook"); pure-function logic gets plain Vitest unit tests (project "unit", files matching `apps/**/*.test.ts`). There are no React Testing Library component test files in this codebase — don't introduce that pattern.
- `components/ui/` components must be generic, reusable primitives — no job-board-specific copy or logic baked in. Job-board-specific config/wiring lives in `components/job-board/`.
- Accessibility: interactive elements need `aria-label`s (the design has no visible `<label>` text) and `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown`, matching the existing treatment in `components/ui/selected-filter-pill.tsx`.
- Spec: `docs/specs/2026-07-15-results-toolbar-design.md`

---

### Task 1: ResultsToolbar UI component (icons + component + stories)

**Files:**
- Create: `apps/web/components/ui/icons/grid-view.tsx`
- Create: `apps/web/components/ui/icons/list-view.tsx`
- Modify: `apps/web/components/ui/icons/index.ts`
- Create: `apps/web/components/ui/results-toolbar.tsx`
- Create: `apps/web/components/ui/results-toolbar.stories.tsx`
- Test: `apps/web/components/ui/results-toolbar.stories.tsx` (stories run as tests via `addon-vitest`)

**Interfaces:**
- Consumes: `ChevronDownIcon` from `@/components/ui/icons` (existing), `twMerge` from `tailwind-merge` (existing dependency).
- Note: `ResultsToolbar` is a generic function component (`<TSort extends string = string>`). `satisfies Meta<typeof ResultsToolbar>` itself compiles fine — the actual gotcha (confirmed during implementation) is that Storybook's `StoryObj<Meta>` type requires every story to supply `args` even when it uses a custom `render` function instead. A story with only `render` and no `args` fails `pnpm typecheck` with "Property 'args' is missing." Give the `Default` story an explicit `args` object alongside its `render`, matching the pattern already used in `selected-filter-pill.stories.tsx`'s `SelectedFilters` story.
- Produces (consumed by Task 3): from `@/components/ui/results-toolbar` — the `ResultsToolbar` component, and its exported types `SortOption<TSort extends string = string>` (`{ value: TSort; label: string }`) and `ResultsToolbarProps<TSort extends string = string>`:
  ```ts
  type ResultsToolbarProps<TSort extends string = string> = {
    count: number;
    itemLabel: string;
    sort: TSort;
    sortOptions: readonly SortOption<TSort>[];
    onSortChange: (value: TSort) => void;
    sortAriaLabel?: string; // default: "Sort by"
    perPage: number;
    perPageOptions: readonly number[];
    onPerPageChange: (value: number) => void;
    perPageAriaLabel?: string; // default: "Results per page"
    view: "grid" | "list";
    onViewChange: (view: "grid" | "list") => void;
    className?: string;
  };
  ```
  Also produces `GridViewIcon` and `ListViewIcon`, exported from `@/components/ui/icons`.

- [ ] **Step 1: Create the grid-view icon**

```tsx
// apps/web/components/ui/icons/grid-view.tsx
import type { IconProps } from "./icon";

export function GridViewIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  );
}
```

- [ ] **Step 2: Create the list-view icon**

```tsx
// apps/web/components/ui/icons/list-view.tsx
import type { IconProps } from "./icon";

export function ListViewIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="1" y="2" width="14" height="5" rx="1" fill="currentColor" />
      <rect x="1" y="9" width="14" height="5" rx="1" fill="currentColor" />
    </svg>
  );
}
```

- [ ] **Step 3: Export the new icons from the icons barrel**

In `apps/web/components/ui/icons/index.ts`, the list is alphabetical. Insert `GridViewIcon` between the existing `GraphIcon` and `HealthIcon` exports:

```ts
export { GraphIcon } from "./graph";
export { GridViewIcon } from "./grid-view";
export { HealthIcon } from "./health";
```

Insert `ListViewIcon` between the existing `LanguageIcon` and `LocationIcon` exports:

```ts
export { LanguageIcon } from "./language";
export { ListViewIcon } from "./list-view";
export { LocationIcon } from "./location";
```

- [ ] **Step 4: Write the stories file (this will fail — `results-toolbar.tsx` doesn't exist yet)**

```tsx
// apps/web/components/ui/results-toolbar.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { ResultsToolbar } from "./results-toolbar";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "relevant", label: "Most Relevant" },
] as const;

const PER_PAGE_OPTIONS = [12, 24, 48];

const meta = {
  title: "UI/ResultsToolbar",
  component: ResultsToolbar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof ResultsToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function StatefulToolbar() {
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>("latest");
  const [perPage, setPerPage] = useState(12);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <ResultsToolbar
      count={23}
      itemLabel="Open Jobs"
      sort={sort}
      sortOptions={SORT_OPTIONS}
      onSortChange={setSort}
      perPage={perPage}
      perPageOptions={PER_PAGE_OPTIONS}
      onPerPageChange={setPerPage}
      view={view}
      onViewChange={setView}
    />
  );
}

export const Default: Story = {
  args: {
    count: 23,
    itemLabel: "Open Jobs",
    sort: "latest",
    sortOptions: SORT_OPTIONS,
    onSortChange: () => {},
    perPage: 12,
    perPageOptions: PER_PAGE_OPTIONS,
    onPerPageChange: () => {},
    view: "grid",
    onViewChange: () => {},
  },
  render: () => <StatefulToolbar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const sortSelect = canvas.getByLabelText("Sort by");
    await userEvent.selectOptions(sortSelect, "oldest");
    await expect(sortSelect).toHaveValue("oldest");

    const perPageSelect = canvas.getByLabelText("Results per page");
    await userEvent.selectOptions(perPageSelect, "24");
    await expect(perPageSelect).toHaveValue("24");

    const gridViewButton = canvas.getByLabelText("Grid view");
    const listViewButton = canvas.getByLabelText("List view");
    await userEvent.click(listViewButton);
    await expect(listViewButton).toHaveAttribute("aria-pressed", "true");
    await expect(gridViewButton).toHaveAttribute("aria-pressed", "false");
  },
};

export const ListViewActive: Story = {
  args: {
    count: 23,
    itemLabel: "Open Jobs",
    sort: "latest",
    sortOptions: SORT_OPTIONS,
    onSortChange: () => {},
    perPage: 12,
    perPageOptions: PER_PAGE_OPTIONS,
    onPerPageChange: () => {},
    view: "list",
    onViewChange: () => {},
  },
};

export const LargeCount: Story = {
  args: {
    count: 1240,
    itemLabel: "Open Jobs",
    sort: "latest",
    sortOptions: SORT_OPTIONS,
    onSortChange: () => {},
    perPage: 12,
    perPageOptions: PER_PAGE_OPTIONS,
    onPerPageChange: () => {},
    view: "grid",
    onViewChange: () => {},
  },
};
```

- [ ] **Step 5: Run the test suite to verify it fails**

Run: `pnpm test -- results-toolbar.stories`
Expected: FAIL — cannot resolve `./results-toolbar` (module not found).

- [ ] **Step 6: Implement the ResultsToolbar component**

```tsx
// apps/web/components/ui/results-toolbar.tsx
import { twMerge } from "tailwind-merge";
import { ChevronDownIcon, GridViewIcon, ListViewIcon } from "@/components/ui/icons";

export type SortOption<TSort extends string = string> = { value: TSort; label: string };

export type ResultsToolbarProps<TSort extends string = string> = {
  count: number;
  itemLabel: string;
  sort: TSort;
  sortOptions: readonly SortOption<TSort>[];
  onSortChange: (value: TSort) => void;
  sortAriaLabel?: string;
  perPage: number;
  perPageOptions: readonly number[];
  onPerPageChange: (value: number) => void;
  perPageAriaLabel?: string;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  className?: string;
};

const selectClassName =
  "appearance-none rounded-dropdown border border-gray-100 bg-white py-3 pr-9 pl-4 text-sm text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown";

const toggleButtonClassName =
  "flex size-8 items-center justify-center rounded-dropdown text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown";

export function ResultsToolbar<TSort extends string = string>({
  count,
  itemLabel,
  sort,
  sortOptions,
  onSortChange,
  sortAriaLabel = "Sort by",
  perPage,
  perPageOptions,
  onPerPageChange,
  perPageAriaLabel = "Results per page",
  view,
  onViewChange,
  className,
}: ResultsToolbarProps<TSort>) {
  return (
    <div className={twMerge("flex flex-wrap items-center gap-4", className)}>
      <p className="text-lg">
        <span className="font-bold text-teal">{count}</span>{" "}
        <span className="text-gray-700">{itemLabel}</span>
      </p>

      <div className="relative">
        <select
          aria-label={sortAriaLabel}
          value={sort}
          onChange={(event) => {
            const nextSort = sortOptions.find((option) => option.value === event.target.value);
            if (nextSort) onSortChange(nextSort.value);
          }}
          className={selectClassName}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={16}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="relative">
        <select
          aria-label={perPageAriaLabel}
          value={perPage}
          onChange={(event) => onPerPageChange(Number(event.target.value))}
          className={selectClassName}
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={16}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex gap-1 rounded-dropdown border border-gray-100 p-1">
        <button
          type="button"
          aria-label="Grid view"
          aria-pressed={view === "grid"}
          onClick={() => onViewChange("grid")}
          className={twMerge(toggleButtonClassName, view === "grid" && "bg-gray-100")}
        >
          <GridViewIcon size={16} />
        </button>
        <button
          type="button"
          aria-label="List view"
          aria-pressed={view === "list"}
          onClick={() => onViewChange("list")}
          className={twMerge(toggleButtonClassName, view === "list" && "bg-gray-100")}
        >
          <ListViewIcon size={16} />
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Run the test suite to verify it passes**

Run: `pnpm test -- results-toolbar.stories`
Expected: PASS — all 3 stories render, `Default`'s play function assertions pass.

- [ ] **Step 8: Typecheck**

Run: `pnpm typecheck`
Expected: no errors. If it complains that `args` is missing on the `Default` story, apply the fix from the Interfaces note above (add an explicit `args` object alongside `render`).

- [ ] **Step 9: Commit**

```bash
git add apps/web/components/ui/icons/grid-view.tsx apps/web/components/ui/icons/list-view.tsx apps/web/components/ui/icons/index.ts apps/web/components/ui/results-toolbar.tsx apps/web/components/ui/results-toolbar.stories.tsx
git commit -m "feat(ui): add ResultsToolbar component"
```

---

### Task 2: Job-board sort/perPage/view config and URL-param parsing

**Files:**
- Create: `apps/web/components/job-board/results-toolbar-config.ts`
- Test: `apps/web/components/job-board/results-toolbar-config.test.ts`

**Interfaces:**
- Consumes: nothing (pure module, no imports beyond types).
- Produces (consumed by Task 3):
  ```ts
  export const JOB_SORT_OPTIONS: readonly { value: "latest" | "oldest" | "relevant"; label: string }[];
  export type JobSortValue = "latest" | "oldest" | "relevant";
  export const JOB_PER_PAGE_OPTIONS: readonly [12, 24, 48];
  export type JobPerPageValue = 12 | 24 | 48;
  export function isJobSortValue(value: string): value is JobSortValue;
  export function isJobPerPageValue(value: number): value is JobPerPageValue;
  export function resolveSort(value: string | undefined): JobSortValue; // defaults to "latest"
  export function resolvePerPage(value: string | undefined): JobPerPageValue; // defaults to 12
  export function resolveView(value: string | undefined): "grid" | "list"; // defaults to "grid"
  ```

- [ ] **Step 1: Write the failing test**

```ts
// apps/web/components/job-board/results-toolbar-config.test.ts
import { describe, expect, it } from "vitest";
import {
  isJobPerPageValue,
  isJobSortValue,
  resolvePerPage,
  resolveSort,
  resolveView,
} from "./results-toolbar-config";

describe("isJobSortValue", () => {
  it("accepts a known sort value", () => {
    expect(isJobSortValue("oldest")).toBe(true);
  });

  it("rejects an unknown sort value", () => {
    expect(isJobSortValue("popularity")).toBe(false);
  });
});

describe("isJobPerPageValue", () => {
  it("accepts a known per-page value", () => {
    expect(isJobPerPageValue(24)).toBe(true);
  });

  it("rejects an unknown per-page value", () => {
    expect(isJobPerPageValue(100)).toBe(false);
  });

  it("rejects NaN", () => {
    expect(isJobPerPageValue(Number.NaN)).toBe(false);
  });
});

describe("resolveSort", () => {
  it("passes through a valid value", () => {
    expect(resolveSort("relevant")).toBe("relevant");
  });

  it("falls back to latest for an invalid value", () => {
    expect(resolveSort("bogus")).toBe("latest");
  });

  it("falls back to latest when undefined", () => {
    expect(resolveSort(undefined)).toBe("latest");
  });
});

describe("resolvePerPage", () => {
  it("passes through a valid value", () => {
    expect(resolvePerPage("24")).toBe(24);
  });

  it("falls back to 12 for an invalid value", () => {
    expect(resolvePerPage("999")).toBe(12);
  });

  it("falls back to 12 when undefined", () => {
    expect(resolvePerPage(undefined)).toBe(12);
  });
});

describe("resolveView", () => {
  it("passes through list", () => {
    expect(resolveView("list")).toBe("list");
  });

  it("falls back to grid for anything else", () => {
    expect(resolveView("bogus")).toBe("grid");
    expect(resolveView(undefined)).toBe("grid");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- results-toolbar-config`
Expected: FAIL — cannot resolve `./results-toolbar-config` (module not found).

- [ ] **Step 3: Write the minimal implementation**

```ts
// apps/web/components/job-board/results-toolbar-config.ts
export const JOB_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "relevant", label: "Most Relevant" },
] as const;

export type JobSortValue = (typeof JOB_SORT_OPTIONS)[number]["value"];

export const JOB_PER_PAGE_OPTIONS = [12, 24, 48] as const;

export type JobPerPageValue = (typeof JOB_PER_PAGE_OPTIONS)[number];

export function isJobSortValue(value: string): value is JobSortValue {
  return JOB_SORT_OPTIONS.some((option) => option.value === value);
}

export function isJobPerPageValue(value: number): value is JobPerPageValue {
  return JOB_PER_PAGE_OPTIONS.some((option) => option === value);
}

export function resolveSort(value: string | undefined): JobSortValue {
  return value !== undefined && isJobSortValue(value) ? value : "latest";
}

export function resolvePerPage(value: string | undefined): JobPerPageValue {
  const parsed = Number(value);
  return isJobPerPageValue(parsed) ? parsed : 12;
}

export function resolveView(value: string | undefined): "grid" | "list" {
  return value === "list" ? "list" : "grid";
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test -- results-toolbar-config`
Expected: PASS — all cases green.

- [ ] **Step 5: Commit**

```bash
git add apps/web/components/job-board/results-toolbar-config.ts apps/web/components/job-board/results-toolbar-config.test.ts
git commit -m "feat(job-board): add sort/per-page/view config and URL-param parsing"
```

---

### Task 3: Wire ResultsToolbar into the Job Board page via URL params

**Files:**
- Create: `apps/web/components/job-board/job-results-toolbar.tsx`
- Modify: `apps/web/app/(frontend)/job-board/page.tsx`

**Interfaces:**
- Consumes:
  - `ResultsToolbar`, `SortOption` from `@/components/ui/results-toolbar` (Task 1)
  - `JOB_SORT_OPTIONS`, `JOB_PER_PAGE_OPTIONS`, `JobSortValue`, `JobPerPageValue`, `resolveSort`, `resolvePerPage`, `resolveView` from `@/components/job-board/results-toolbar-config` (Task 2)
- Produces: `JobResultsToolbar` client component, consumed only by `job-board/page.tsx`.
- Note: the client wrapper takes the current query string as a `currentSearch: string` prop computed server-side, instead of calling `useSearchParams()` client-side. The server component already has the parsed `searchParams`; re-reading them via the hook would duplicate that work and — more importantly — `useSearchParams()` in a Client Component without a `<Suspense>` boundary is a known Next.js pitfall (it opts the subtree out of static rendering and can warn/fail at build time). Passing the string down avoids the hook entirely.

No automated test for this task: this repo has no test harness for Next.js server components or page-level `searchParams` behavior (only Storybook component tests and plain-function unit tests exist). The parsing logic itself is already unit-tested in Task 2 — this task is pure wiring, verified manually below.

- [ ] **Step 1: Create the client wrapper**

```tsx
// apps/web/components/job-board/job-results-toolbar.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { ResultsToolbar } from "@/components/ui/results-toolbar";
import {
  JOB_PER_PAGE_OPTIONS,
  JOB_SORT_OPTIONS,
  type JobPerPageValue,
  type JobSortValue,
} from "@/components/job-board/results-toolbar-config";

type JobResultsToolbarProps = {
  count: number;
  sort: JobSortValue;
  perPage: JobPerPageValue;
  view: "grid" | "list";
  currentSearch: string;
};

export function JobResultsToolbar({
  count,
  sort,
  perPage,
  view,
  currentSearch,
}: JobResultsToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(currentSearch);
    params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <ResultsToolbar
      count={count}
      itemLabel="Open Jobs"
      sort={sort}
      sortOptions={JOB_SORT_OPTIONS}
      onSortChange={(value) => updateParam("sort", value)}
      perPage={perPage}
      perPageOptions={JOB_PER_PAGE_OPTIONS}
      onPerPageChange={(value) => updateParam("perPage", String(value))}
      view={view}
      onViewChange={(value) => updateParam("view", value)}
    />
  );
}
```

- [ ] **Step 2: Update the Job Board page to read searchParams and render the toolbar**

Read the current file first (`apps/web/app/(frontend)/job-board/page.tsx`) — it currently renders `BubblePanel` and `JobSearchFilters` with no props. Replace its contents with:

```tsx
// apps/web/app/(frontend)/job-board/page.tsx
import { BubblePanel } from "@/components/ui/bubble-panel";
import { JobSearchFilters } from "@/components/job-board/job-search-filters";
import { JobResultsToolbar } from "@/components/job-board/job-results-toolbar";
import { resolvePerPage, resolveSort, resolveView } from "@/components/job-board/results-toolbar-config";

type JobBoardPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toSearchString(params: Record<string, string | string[] | undefined>): string {
  const result = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    for (const entry of Array.isArray(value) ? value : [value]) {
      result.append(key, entry);
    }
  }
  return result.toString();
}

export default async function JobBoardPage({ searchParams }: JobBoardPageProps) {
  const params = await searchParams;
  const sort = resolveSort(firstParam(params.sort));
  const perPage = resolvePerPage(firstParam(params.perPage));
  const view = resolveView(firstParam(params.view));
  const currentSearch = toSearchString(params);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BubblePanel
          variant="teal"
          shape="standard"
          className="flex h-[366px] items-center justify-center"
          media={
            <img
              src="/images/worldmap-dots-featured-jobs.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-bottom opacity-40"
            />
          }
        >
          <h1 className="text-h3 font-normal text-cream">Featured Jobs</h1>
        </BubblePanel>
      </div>

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
    </div>
  );
}
```

- [ ] **Step 3: Manually verify in the browser**

Start the dev server if it isn't running:

Run: `pnpm dev`
Expected: `Ready in <N>ms` on `http://localhost:3000`.

Navigate to `http://localhost:3000/job-board` and take a screenshot. Confirm:
- The toolbar renders below the filter pills, above nothing else yet.
- It shows "0 Open Jobs", a "Latest" dropdown, a "12 per page" dropdown, and the grid icon highlighted (list icon not highlighted).

Navigate to `http://localhost:3000/job-board?sort=oldest&perPage=24&view=list` and take a screenshot. Confirm:
- The sort dropdown shows "Oldest".
- The per-page dropdown shows "24 per page".
- The list icon is highlighted instead of the grid icon.

Change the sort dropdown back to "Latest" via the UI and confirm the browser URL updates to include `sort=latest` without a full page reload (the other query params are preserved).

- [ ] **Step 4: Commit**

```bash
git add apps/web/components/job-board/job-results-toolbar.tsx "apps/web/app/(frontend)/job-board/page.tsx"
git commit -m "feat(job-board): wire ResultsToolbar into the Job Board page via URL params"
```
