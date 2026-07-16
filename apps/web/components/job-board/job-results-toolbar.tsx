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
