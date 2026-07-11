import { Button } from "@/components/ui/button";
import { HeartIcon, ArrowUpRightIcon } from "@/components/ui/icons";

export type CompanyHeaderProps = {
  orgName: string;
  orgInitial: string;
  jobTitle: string;
};

export function CompanyHeader({ orgName, orgInitial, jobTitle }: CompanyHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-muted text-lg font-bold text-teal">
          {orgInitial}
        </div>
        <div>
          <p className="text-sm text-pale-blue">{orgName}</p>
          <h2 className="text-xl font-semibold text-gray-text">{jobTitle}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          aria-label="Save job"
          className="flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-gray-200 text-pale-blue"
        >
          <HeartIcon size={18} />
        </span>
        <Button variant="primary" size="sm" disabled rightIcon={<ArrowUpRightIcon size={16} />}>
          Apply Now
        </Button>
      </div>
    </div>
  );
}
