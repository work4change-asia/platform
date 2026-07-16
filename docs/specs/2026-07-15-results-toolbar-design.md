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
type SortOption<TSort extends string = string> = { value: TSort; label: string };

type ResultsToolbarProps<TSort extends string = string> = {
  count: number;
  itemLabel: string; // e.g. "Open Jobs", "Opportunities"
  sort: TSort;
  sortOptions: SortOption<TSort>[];
  onSortChange: (value: TSort) => void;
  sortAriaLabel?: string; // default: "Sort by"
  perPage: number;
  perPageOptions: number[];
  onPerPageChange: (value: number) => void;
  perPageAriaLabel?: string; // default: "Results per page"
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  className?: string;
};
```

Fully controlled — no internal state. This matches the project rule that filter/display state lives in URL query params, never component-only state. The component only renders and emits change events; the parent page owns the state.

`sort` is generic over the caller's own union of sort values (e.g. `"latest" | "oldest" | "relevant"`), so passing a value that isn't in `sortOptions` is a type error instead of a silent runtime mismatch.

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

## Accessibility

- Sort and per-page `<select>` elements get `aria-label` from `sortAriaLabel`/`perPageAriaLabel` (defaulted as above) — the mock has no visible `<label>` text, so the accessible name has to come from the attribute, matching how `search-bar.tsx` uses `aria-label`.
- Grid/list toggle buttons: each gets `aria-label` ("Grid view" / "List view") and `aria-pressed` reflecting whether it matches the current `view` — same toggle-button semantics as a two-state switch, not a full radiogroup, since there are only two mutually exclusive options.
- All interactive elements (selects, toggle buttons) get `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown`, matching the existing focus treatment in `selected-filter-pill.tsx`.
- Covered by `@storybook/addon-a11y`'s automated checks in the stories below.

## Responsive behavior

The mock is a fixed-width (1180px) desktop capture. Below the `sm` breakpoint, the toolbar wraps: count block on its own row, dropdowns + view toggle wrapping to a second row (`flex flex-wrap gap-4`), consistent with how the rest of the job-board page uses `sm:`/`lg:` breakpoints for padding. No separate mobile layout — wrapping is enough at this stage.

## Testing

This repo tests UI components via Storybook's `addon-vitest` integration (stories run as tests through `pnpm test`, project "storybook") — there are no separate React Testing Library test files for components yet. This component will follow that existing convention:

- `components/ui/results-toolbar.stories.tsx` with named stories: `Default` (grid active), `ListViewActive`, and a variant with a large count (e.g. 1,240) to check number formatting doesn't break the layout. `@chromatic-com/storybook` snapshots every story, so these are the visual-regression baselines — a single "Default" story isn't enough coverage for that pipeline.
- Since the component is fully controlled, a story with static args can't demonstrate real interaction: firing a change on the native `<select>` would have React snap the DOM back to the old value on re-render because nothing updates the `value` prop. Stories that exercise interaction wrap the component in local `useState` (the same pattern `SelectedFilterPill`'s `SelectedFilters` story already uses) so the prop round-trips back in.
- A `play` function (using `storybook/test` interactions) on the stateful story exercises: changing sort, changing per-page, and toggling the view — asserting both the `onChange` callback fires with the right value and the visible state updates.

## Integration

`job-board/page.tsx` is a server component; it reads `sort` / `perPage` / `view` from its `searchParams` prop (with defaults applied) and passes them to a small client wrapper that renders `ResultsToolbar`. The wrapper's `onSortChange`/`onPerPageChange`/`onViewChange` handlers build the next query string with the changed param and call `router.replace` (via `next/navigation`'s `useRouter` + `usePathname` + `useSearchParams`), preserving the pill filters' existing query params. This keeps `sort`/`perPage`/`view` in the URL from the start, per the project rule that filter/display state never lives in component-only state — there's no local-state placeholder stage.

The (future) results grid isn't part of this task; `ResultsToolbar` is wired end-to-end against the URL, but nothing downstream reads `sort`/`perPage`/`view` yet to actually fetch/re-order jobs.

## Out of scope

- Wiring real sort/filter/pagination logic against the jobs collection (the URL holds the state, but no query uses it yet)
- The results grid itself (cards below the toolbar)
