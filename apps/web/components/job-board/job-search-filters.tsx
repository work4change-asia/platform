"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { badgeVariants } from "@/components/ui/badge";
import { SearchBar } from "@/components/ui/search-bar";

const FILTER_CATEGORIES = ["Work Modality", "Type of Contract", "Thematic Area", "Job Function", "Location"];

export function JobSearchFilters() {
  const [selected, setSelected] = useState<string | null>(null);

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
            {FILTER_CATEGORIES.map((category) => {
              const isSelected = selected === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(isSelected ? null : category)}
                  className={twMerge(
                    badgeVariants({ variant: isSelected ? "active" : "inactive" }),
                    "px-4 py-2 text-sm transition-colors",
                    !isSelected && "hover:border-orange hover:bg-orange hover:text-cream",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
