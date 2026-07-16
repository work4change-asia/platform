"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { badgeVariants } from "@/components/ui/badge";
import { SearchBar } from "@/components/ui/search-bar";
import { FILTER_CATEGORIES } from "@/components/job-board/filter-options";

export function JobSearchFilters() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string | null>>({});

  const expandedCategory = FILTER_CATEGORIES.find((category) => category.label === expanded);

  return (
    <section>
      <div className="bg-cream py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <SearchBar aria-label="Search jobs" />
        </div>
      </div>

      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-pill bg-cream p-2">
            {FILTER_CATEGORIES.map(({ label }) => {
              const isExpanded = expanded === label;
              return (
                <button
                  key={label}
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(isExpanded ? null : label)}
                  className={twMerge(
                    badgeVariants({ variant: isExpanded ? "active" : "inactive" }),
                    "px-4 py-2 text-sm transition-colors",
                    !isExpanded && "hover:border-orange hover:bg-orange hover:text-cream",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {expandedCategory && (
            <div className="mx-auto mt-4 flex max-w-5xl flex-wrap justify-center gap-2">
              {expandedCategory.options.map((option) => {
                const isSelected = selections[expandedCategory.label] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() =>
                      setSelections((prev) => ({
                        ...prev,
                        [expandedCategory.label]: isSelected ? null : option,
                      }))
                    }
                    className={twMerge(
                      badgeVariants({ variant: isSelected ? "active" : "filter" }),
                      "px-4 py-2 text-sm transition-colors",
                      !isSelected && "hover:bg-orange hover:text-cream",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
