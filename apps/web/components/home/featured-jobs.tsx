import NextLink from "next/link";
import { JobCard } from "@/components/ui/job-card";
import { buttonVariants } from "@/components/ui/button";
import type { JobCardData } from "@/lib/home-data";

type FeaturedJobsProps = {
  jobs: JobCardData[];
};

export function FeaturedJobs({ jobs }: FeaturedJobsProps) {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-tiny font-semibold uppercase tracking-widest text-teal-light">
            What we offer
          </p>
          <h2 className="text-h4 font-semibold text-teal">Fresh from the Field</h2>
        </div>

        {/* Segmented toggle — static for now */}
        <div className="mb-8 flex justify-center gap-3">
          <span className={buttonVariants({ variant: "primary", size: "sm" })}>All Jobs</span>
          <span className={buttonVariants({ variant: "secondary", size: "sm" })}>
            Share An Opening
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <NextLink
            href="/job-board"
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            More Jobs
          </NextLink>
        </div>
      </div>
    </section>
  );
}
