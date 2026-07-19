import NextLink from "next/link";
import {
  ArrowUpRightIcon,
  GlobeIcon,
  LocationIcon,
  TimeCommitmentIcon,
} from "@/components/ui/icons";
import { Badge } from "./badge";
import { getInitials } from "@/lib/avatar";

export type JobCardProps = {
  id: string;
  title: string;
  organization: string;
  location: string;
  workModality?: string;
  postedAt: string;
  href: string;
  featured?: boolean;
};

export function JobCard({
  title,
  organization,
  location,
  workModality,
  postedAt,
  href,
  featured = false,
}: JobCardProps) {
  return (
    <NextLink
      href={href}
      className={
        featured
          ? "group relative flex aspect-square w-full max-w-72 flex-col overflow-hidden rounded-card border border-transparent bg-charcoal p-5 transition-[box-shadow,border-color] hover:border-orange hover:shadow-[0px_12px_28px_rgba(255,138,66,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          : "group flex aspect-square w-full max-w-72 flex-col rounded-card bg-white p-5 border border-charcoal/30 transition-[box-shadow,border-color] hover:border-teal-light hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light focus-visible:shadow-card"
      }
    >
      {featured && (
        <span
          aria-hidden="true"
          className="absolute -right-11 top-6 flex h-5 w-36 rotate-45 items-center justify-center bg-orange text-[10px] font-semibold tracking-wide text-charcoal"
        >
          FEATURED
        </span>
      )}

      {/* Top: location + work modality badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="location" className={featured ? "bg-orange text-charcoal" : undefined}>
          <LocationIcon size={11} />
          {location}
        </Badge>
        {workModality && (
          <Badge variant="location" className="bg-teal-muted text-teal">
            <GlobeIcon size={11} />
            {workModality}
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3
        className={`mt-4 mb-2 text-base font-semibold line-clamp-3 ${featured ? "text-white" : "text-gray-text"}`}
      >
        {title}
      </h3>

      <div className="mt-auto">
        {/* Organisation */}
        <div className="flex min-w-0 items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-muted">
            <span className="text-xs font-semibold text-teal">{getInitials(organization)}</span>
          </div>
          <span
            className={`line-clamp-2 text-sm font-medium ${featured ? "text-cream" : "text-gray-text"}`}
          >
            {organization}
          </span>
        </div>

        {/* More Details + timestamp */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <span
            className={`flex items-center gap-1 text-sm font-medium ${featured ? "text-teal-light" : "text-teal-dark"}`}
          >
            More Details
            <ArrowUpRightIcon size={14} />
          </span>
          <span
            className={`flex shrink-0 items-center gap-1 whitespace-nowrap text-xs ${featured ? "text-white/60" : "text-charcoal"}`}
          >
            <TimeCommitmentIcon size={12} />
            {postedAt}
          </span>
        </div>
      </div>
    </NextLink>
  );
}
