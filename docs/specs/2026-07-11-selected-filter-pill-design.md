# Selected Filter Pill — Design

## Purpose

An indicator badge showing a currently-applied search filter, with a control to remove it. Matches the mockup at `~/shared/from-mongo/selected-filter-pills.png`: cream pill, brown label text, small ✕ on the right.

## Scope

Component + Storybook story only. Wiring into `job-search-filters.tsx` (rendering a live row of selected filters, removing them from state/URL) is out of scope — that section's filter state isn't URL-driven yet, so integration belongs to a separate piece of work.

## Design

### New icon: `apps/web/components/ui/icons/x-mark.tsx`

Exports `XMarkIcon`, following the existing `IconProps` pattern used by other icons in the directory. Two crossing `currentColor` strokes, no background — unlike `CloseIcon` (`close.tsx`), which bakes in a white circle meant for floating buttons over images and doesn't match the mockup's bare ✕. Registered in `icons/index.ts`.

### New component: `apps/web/components/ui/selected-filter-pill.tsx`

```tsx
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

Reuses `badgeVariants({ variant: "filter" })` (cream background, brown text, `gap-1`) from `badge.tsx` so it stays visually in sync with the unselected filter-option badges already used in `job-search-filters.tsx`. Only the ✕ button is an interactive click target — the label itself is inert text, not part of the button.

`SelectedFilterPillProps` is exported so a future "row of selected filters" component (the `job-search-filters.tsx` integration, out of scope here) can type its list of filters against it.

The button uses `-m-1 p-1` to grow the hit area to roughly 24×24px without enlarging the visible 10px icon, and `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown` to match the focus-ring convention already used in `button.tsx`.

### Storybook story: `apps/web/components/ui/selected-filter-pill.stories.tsx`

- `Default` — single pill.
- `SelectedFilters` — a `useState`-backed row of pills matching the mockup's example labels ("Bangalore", "Strategy & Organisational Development", "Fully Remote (local)", "Freelance/Consultancy"), where clicking ✕ actually removes the pill from the list.

## Testing

No unit test framework is wired up for component-level rendering in this repo yet (Vitest is used for domain/schema logic). Verification is via Storybook: visual match to mockup, keyboard focus/activation on the ✕ button, and the `Interactive` story removing pills on click.
