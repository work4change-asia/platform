import NextLink from "next/link";
import { JobCard } from "@/components/ui/job-card";
import { JobCarousel } from "@/components/ui/job-carousel";
import { buttonVariants } from "@/components/ui/button";
import type { JobCardData } from "@/lib/home-data";

type FreshFromTheFieldProps = {
  jobs: JobCardData[];
};

export function FreshFromTheField({ jobs }: FreshFromTheFieldProps) {
  return (
    <section className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-tiny font-semibold uppercase tracking-widest text-orange">
            Start Here, Find Purpose
          </p>
          <h2 className="text-h4 font-semibold text-teal">Fresh from the Field</h2>
        </div>

        {/* Mobile carousel */}
        <div className="sm:hidden">
          <JobCarousel jobs={jobs} />
        </div>

        {/* Desktop grid — fixed card-width columns so cards never stretch past their square size */}
        <div className="hidden sm:grid sm:grid-cols-[repeat(auto-fill,18rem)] sm:justify-center sm:gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <NextLink
            href="/job-board"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            See All Jobs
          </NextLink>
          <NextLink href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Share An Opening
          </NextLink>
        </div>
      </div>
    </section>
  );
}
