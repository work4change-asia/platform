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
