# Results Toolbar — Design Spec

## Context

The `feat/featured-jobs-page` branch is building out the Job Board page. Above this component sits the pill-based filter UI (`JobSearchFilters`). Directly underneath, the Figma reference (`Filter header.svg` / `Filter header.png` in the design export) shows a toolbar with a live results count, sort/per-page dropdowns, and a grid/list view toggle.

This toolbar needs to be reused on other listing pages (e.g. Opportunities), so it's built as a generic, presentational `components/ui` primitive rather than a job-board-specific component.

## Reference

Source mock: `~/Sync/from-mongo/Filter header.png`

Layout, left to right:
- Bold teal count ("23") + gray label ("Open Jobs")
- "Latest" sort dropdown (white bg, bordered, chevron-down)
- "12 per page" dropdown (same style)
- Grid/list view icon toggle in a bordered box, grid active by default

## Component API

`components/ui/results-toolbar.tsx`

```ts
type SortOption = { value: string; label: string };

type ResultsToolbarProps = {
  count: number;
  itemLabel: string; // e.g. "Open Jobs", "Opportunities"
  sort: string;
  sortOptions: SortOption[];
  onSortChange: (value: string) => void;
  perPage: number;
  perPageOptions: number[];
  onPerPageChange: (value: number) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  className?: string;
};
```

Fully controlled — no internal state. This matches the project rule that filter/display state lives in URL query params, never component-only state. The component only renders and emits change events; the parent page owns the state.

Defaults used by callers (not hardcoded in the component, since it's generic):
- Sort options: Latest, Oldest, Most Relevant
- Per-page options: 12, 24, 48

## Visual details (design tokens only, no new colors)

- Count: bold number in `text-teal`, "Open Jobs"-style label beside it in `text-gray-700`
- Spacing: `gap-4` (16px, via the token — no hardcoded pixel value) between the count block and the sort dropdown
- Dropdowns: native `<select>` elements styled like the existing `search-bar.tsx` pattern — white background, `border-gray-100`, `rounded-dropdown`, text in `text-gray-700`, with a `ChevronDownIcon` in `text-gray-400` overlaid (native arrow hidden) since no shadcn Select is installed yet and native `<select>` keeps this accessible and simple
- View toggle: bordered box (`border-gray-100`, `rounded-dropdown`) containing two icon buttons (`GridViewIcon`, `ListViewIcon`); the active button gets a `bg-gray-100` chip background
- New icons: `GridViewIcon` and `ListViewIcon` added to `components/ui/icons/`, following the existing icon pattern (`currentColor`, shared `IconProps`, exported from `icons/index.ts`)
- Section wrapper: `bg-cream` — the same "soft white" token already used for the search bar section in `JobSearchFilters`
- Note: `gray-400`/`gray-700` aren't in `globals.css`'s custom palette (which only defines `gray-100`/`gray-200`/`gray-900`/`gray-950`/`gray-text`) — they resolve from Tailwind v4's bundled default gray scale, which coexists with the custom overrides. Confirmed via Storybook during implementation rather than assumed.

## Testing

This repo tests UI components via Storybook's `addon-vitest` integration (stories run as tests through `pnpm test`, project "storybook") — there are no separate React Testing Library test files for components yet. This component will follow that existing convention:

- `components/ui/results-toolbar.stories.tsx` with a default story
- A `play` function (using `storybook/test` interactions) that exercises: changing sort, changing per-page, and toggling the view — asserting the corresponding `onChange` callbacks fire with the right values

## Integration

`job-board/page.tsx` renders `ResultsToolbar` between `JobSearchFilters` and the (future) results grid. Since the results-fetching/grid work hasn't landed yet, the page will own `sort` / `perPage` / `view` as local state for now, wired to the component's props — this is a placeholder integration to prove the component works end-to-end. Moving this state to `searchParams` is a follow-up once the actual results-grid and server-side filtering work lands (per the project rule that filtering is server-side only and state lives in the URL).

## Out of scope

- Wiring real sort/filter/pagination logic against the jobs collection
- The results grid itself (cards below the toolbar)
- URL query param persistence (follow-up, tracked as a note above)
