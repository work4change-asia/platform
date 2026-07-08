import NextLink from "next/link";
import { ArrowUpRightIcon, BuildingIcon, LocationIcon, TimeCommitmentIcon } from "@/components/ui/icons";
import { Badge } from "./badge";
import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./badge";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export type JobCardProps = {
  id: string;
  title: string;
  organization: string;
  contractType: BadgeVariant;
  contractLabel: string;
  location: string;
  description: string;
  postedAt: string;
  href: string;
};

export function JobCard({
  title,
  organization,
  contractType,
  contractLabel,
  location,
  description,
  postedAt,
  href,
}: JobCardProps) {
  return (
    <NextLink
      href={href}
      className="group flex flex-col rounded-card bg-white p-5 border border-charcoal/30 transition-[box-shadow,border-color] hover:border-teal-light hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light focus-visible:shadow-card"
    >
      {/* Top: location + contract type badges */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant="location"><LocationIcon size={11} />{location}</Badge>
        <Badge variant={contractType}>{contractLabel}</Badge>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold text-gray-text line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-3 text-sm text-pale-blue line-clamp-3 leading-relaxed">
        {description}
      </p>

      {/* More Details — visual label only, whole card is the link */}
      <span className="mb-4 flex items-center gap-1 text-sm font-medium text-teal-light">
        More Details
        <ArrowUpRightIcon size={14} />
      </span>

      {/* Bottom: company + timestamp */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <BuildingIcon size={14} className="text-pale-blue" />
          </div>
          <span className="text-sm font-medium text-gray-text">{organization}</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-pale-blue">
          <TimeCommitmentIcon size={12} />
          {postedAt}
        </span>
      </div>
    </NextLink>
  );
}
