import { BubblePanel } from "@/components/ui/bubble-panel";
import { JobSearchFilters } from "@/components/job-board/job-search-filters";

export default function JobBoardPage() {
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
    </div>
  );
}
