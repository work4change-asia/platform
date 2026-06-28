import NextLink from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

export type OpportunityCardProps = {
  id: string;
  title: string;
  organization: string;
  excerpt: string;
  tags: string[];
  href: string;
};

export function OpportunityCard({
  title,
  organization,
  excerpt,
  tags,
  href,
}: OpportunityCardProps) {
  return (
    <div className="rounded-card border border-gray-100 bg-white p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-pill bg-orange px-3 py-0.5 text-xs font-medium text-cream"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mb-1 text-tiny font-medium text-pale-blue">{organization}</p>
      <h3 className="mb-2 text-base font-semibold text-gray-text">{title}</h3>
      <p className="mb-4 text-sm text-charcoal line-clamp-2">{excerpt}</p>

      <NextLink
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-teal-light underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light"
      >
        View more
        <ArrowRightIcon size={16} />
      </NextLink>
    </div>
  );
}
