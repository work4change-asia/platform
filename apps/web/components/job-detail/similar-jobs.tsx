import NextLink from "next/link";
import { JobCard } from "@/components/ui/job-card";
import { buttonVariants } from "@/components/ui/button";
import type { JobCardData } from "@/lib/home-data";

type SimilarJobsProps = {
  jobs: JobCardData[];
};

export function SimilarJobs({ jobs }: SimilarJobsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-2 text-tiny font-semibold uppercase tracking-widest text-orange">
          We Also Offer
        </p>
        <h2 className="text-h4 font-semibold text-teal">Similar Jobs</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <NextLink href="/job-board" className={buttonVariants({ variant: "outline", size: "sm" })}>
          More Jobs
        </NextLink>
      </div>
    </section>
  );
}
