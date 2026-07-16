import NextLink from "next/link";
import { twMerge } from "tailwind-merge";
import { LocationIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/button";

export type OrganizationCardProps = {
  name: string;
  location: string;
  logo: React.ReactNode;
  href: string;
};

export function OrganizationCard({ name, location, logo, href }: OrganizationCardProps) {
  return (
    <div className="rounded-card border border-charcoal/30 bg-white p-5 transition-[box-shadow,border-color] hover:border-teal-light hover:shadow-card">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
          {logo}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-gray-text">{name}</p>
          <p className="flex items-center gap-1 whitespace-nowrap text-[10px] text-pale-blue">
            <LocationIcon size={11} className="shrink-0" />
            {location}
          </p>
        </div>
      </div>
      <NextLink
        href={href}
        className={twMerge(
          buttonVariants({ variant: "outline", size: "sm" }),
          "w-full hover:bg-teal hover:text-cream",
        )}
      >
        Open Positions
      </NextLink>
    </div>
  );
}
