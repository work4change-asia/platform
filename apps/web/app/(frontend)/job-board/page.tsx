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
