import { JobCarousel } from "@/components/ui/job-carousel";
import type { JobCardData } from "@/lib/home-data";

type FeaturedRolesProps = {
  jobs: JobCardData[];
};

export function FeaturedRoles({ jobs }: FeaturedRolesProps) {
  return (
    <section className="bg-pale-blue py-4 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-center text-h6 font-semibold text-gray-text">FEATURED ROLES</h2>
        <JobCarousel jobs={jobs} featured edgeFadeFrom="from-pale-blue" />
      </div>
    </section>
  );
}
