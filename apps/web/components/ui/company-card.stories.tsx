import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyCard } from "./company-card";
import { PinterestIcon } from "@/components/ui/icons";

const meta = {
  title: "UI/CompanyCard",
  component: CompanyCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CompanyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Pinterest: Story = {
  args: {
    name: "Pinterest",
    location: "Seoul, South Korea",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-[#E60023] text-white">
        <PinterestIcon size={24} />
      </div>
    ),
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const InitialFallback: Story = {
  args: {
    name: "Slack",
    location: "Guangzhou, China",
    href: "#",
    logo: (
      <div className="flex h-full w-full items-center justify-center bg-teal-muted text-base font-bold text-teal">
        S
      </div>
    ),
  },
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export const Grid: Story = {
  args: { name: "", location: "", href: "", logo: null },
  render: () => (
    <div className="grid w-[900px] grid-cols-4 gap-5">
      {[
        { name: "Pinterest", location: "Seoul, South Korea", bg: "#E60023", initial: "P" },
        { name: "Slack", location: "Guangzhou, China", bg: "#4A154B", initial: "S" },
        { name: "WordPress", location: "Kuala Lumpur, Malaysia", bg: "#21759B", initial: "W" },
        { name: "Dribbble", location: "Delhi, India", bg: "#EA4C89", initial: "D" },
        { name: "Upwork", location: "Delhi, India", bg: "#14A800", initial: "U" },
        { name: "Telegram", location: "Seoul, South Korea", bg: "#26A5E4", initial: "T" },
        { name: "Freepik", location: "Seoul, South Korea", bg: "#1273EB", initial: "F" },
        { name: "App Store", location: "Kuala Lumpur, Malaysia", bg: "#0D96F6", initial: "A" },
      ].map((company) => (
        <CompanyCard
          key={company.name}
          name={company.name}
          location={company.location}
          href="#"
          logo={
            <div
              className="flex h-full w-full items-center justify-center text-base font-bold text-white"
              style={{ backgroundColor: company.bg }}
            >
              {company.initial}
            </div>
          }
        />
      ))}
    </div>
  ),
};
