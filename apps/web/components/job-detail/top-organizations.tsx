import { OrganizationCard } from "@/components/ui/organization-card";
import { PinterestIcon } from "@/components/ui/icons";

const topOrganizations = [
  {
    name: "Pinterest",
    location: "Seoul, South Korea",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-[#E60023] text-white">
        <PinterestIcon size={24} />
      </div>
    ),
  },
  {
    name: "Slack",
    location: "Guangzhou, China",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-teal-muted text-base font-bold text-teal">
        S
      </div>
    ),
  },
  {
    name: "WordPress",
    location: "Kuala Lumpur, Malaysia",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-teal-muted text-base font-bold text-teal">
        W
      </div>
    ),
  },
  {
    name: "Dribbble",
    location: "Delhi, India",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-teal-muted text-base font-bold text-teal">
        D
      </div>
    ),
  },
  {
    name: "Upwork",
    location: "Delhi, India",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-teal-muted text-base font-bold text-teal">
        U
      </div>
    ),
  },
  {
    name: "Telegram",
    location: "Seoul, South Korea",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-teal-muted text-base font-bold text-teal">
        T
      </div>
    ),
  },
  {
    name: "Freepik",
    location: "Seoul, South Korea",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-teal-muted text-base font-bold text-teal">
        F
      </div>
    ),
  },
  {
    name: "App Store",
    location: "Kuala Lumpur, Malaysia",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-teal-muted text-base font-bold text-teal">
        A
      </div>
    ),
  },
];

export function TopOrganizations() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-h5 font-semibold text-teal">Top Organisations</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {topOrganizations.map((organization) => (
          <OrganizationCard key={organization.name} {...organization} />
        ))}
      </div>
    </section>
  );
}
