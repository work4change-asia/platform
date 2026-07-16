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
