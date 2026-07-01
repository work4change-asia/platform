import NextLink from "next/link";
import { JobCard } from "@/components/ui/job-card";
import { buttonVariants } from "@/components/ui/button";
import type { OpportunityData } from "@/lib/home-data";

type OpportunitiesPreviewProps = {
  opportunities: OpportunityData[];
};

export function OpportunitiesPreview({ opportunities }: OpportunitiesPreviewProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-h4 font-semibold text-teal">Opportunities</h2>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {opportunities.map((opp) => (
            <JobCard key={opp.id} {...opp} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <NextLink
            href="/opportunities"
            className={buttonVariants({ variant: "ghost", size: "sm" }) + " text-teal-light hover:bg-teal-light/10 focus-visible:outline-teal-light"}
          >
            More Opportunities
          </NextLink>
        </div>
      </div>
    </section>
  );
}
