import NextImage from "next/image";
import NextLink from "next/link";
import {
  ArrowUpRightIcon,
  GlobeIcon,
  LocationIcon,
  TimeCommitmentIcon,
} from "@/components/ui/icons";
import { Badge } from "./badge";
import { getInitials } from "@/lib/avatar";
import { orgLogos } from "@/lib/org-logos";

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
          ? "group relative flex aspect-square w-full max-w-72 flex-col overflow-hidden rounded-card border border-transparent bg-charcoal p-5 transition-[box-shadow,border-color] hover:border-2 hover:border-orange hover:shadow-card-hover-featured focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          : "group flex aspect-square w-full max-w-72 flex-col rounded-card bg-white p-5 border border-charcoal/30 transition-[box-shadow,border-color] hover:border-2 hover:border-teal-light hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light focus-visible:shadow-card-hover"
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

      {/* Title + organisation: grows to fill the space between the badges and the footer */}
      <div className="flex flex-1 flex-col justify-start gap-2">
        <h3
          className={`mt-3 min-h-[5.25rem] text-lg font-bold line-clamp-3 ${featured ? "text-white" : "text-gray-text"}`}
        >
          {title}
        </h3>

        <div className="flex min-w-0 items-center gap-2">
          {orgLogos[organization] ? (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white">
              <NextImage
                src={orgLogos[organization]}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-muted">
              <span className="text-sm font-semibold text-teal">{getInitials(organization)}</span>
            </div>
          )}
          <span
            className={`line-clamp-2 text-base font-semibold ${featured ? "text-cream" : "text-gray-text"}`}
          >
            {organization}
          </span>
        </div>
      </div>

      <div>
        {/* More Details + timestamp */}
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1 text-sm font-normal text-teal-light transition-[font-weight] group-hover:font-bold">
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
