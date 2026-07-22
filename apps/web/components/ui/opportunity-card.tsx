import NextLink from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { OpportunityType } from "@/lib/home-data";
import { Badge } from "./badge";

export type OpportunityContractType = "full-time" | "part-time";

const contractTypeLabels: Record<OpportunityContractType, string> = {
  "full-time": "Full Time",
  "part-time": "Part Time",
};

export type OpportunityCardProps = {
  id: string;
  title: string;
  organization: string;
  excerpt: string;
  tags: OpportunityType[];
  contractType?: OpportunityContractType;
  href: string;
};

export function OpportunityCard({
  title,
  organization,
  excerpt,
  tags,
  contractType,
  href,
}: OpportunityCardProps) {
  return (
    <div className="rounded-card border border-gray-100 bg-white p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="type">
            {tag}
          </Badge>
        ))}
        {contractType && (
          <Badge variant={contractType}>{contractTypeLabels[contractType]}</Badge>
        )}
      </div>

      <p className="mb-1 text-tiny font-medium text-pale-blue">{organization}</p>
      <h3 className="mb-2 text-base font-semibold text-gray-text">{title}</h3>
      <p className="mb-4 text-sm text-charcoal line-clamp-2">{excerpt}</p>

      <NextLink
        href={href}
        className="inline-flex items-center gap-1 text-sm font-normal text-teal-light transition-[font-weight] hover:font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light"
      >
        More Details
        <ArrowUpRightIcon size={14} />
      </NextLink>
    </div>
  );
}
