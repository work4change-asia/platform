import { JobCarousel } from "@/components/ui/job-carousel";
import type { JobCardData } from "@/lib/home-data";

type FeaturedRolesProps = {
  jobs: JobCardData[];
};

export function FeaturedRoles({ jobs }: FeaturedRolesProps) {
  return (
    <section className="bg-teal py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-h4 font-semibold text-cream">FEATURED ROLES</h2>
        <JobCarousel jobs={jobs} featured />
      </div>
    </section>
  );
}
