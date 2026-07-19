import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JobCard } from "./job-card";

const meta = {
  title: "UI/JobCard",
  component: JobCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof JobCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LongTitle: Story = {
  args: {
    id: "3",
    title: "Senior Communications and Advocacy Officer for Asia Pacific Region",
    organization: "Save the Children",
    location: "Thailand",
    postedAt: "3d ago",
    href: "/job-board/3-communications-officer-stc",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const LongOrgName: Story = {
  args: {
    id: "7",
    title: "Programme Officer",
    organization:
      "United Nations Economic and Social Commission for Asia and the Pacific (UNESCAP)",
    location: "Thailand",
    postedAt: "6d ago",
    href: "/job-board/7-programme-officer-unescap",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const WithWorkModality: Story = {
  args: {
    id: "4",
    title: "Senior Energy Analysts - IEA Regional Cooperation Centre",
    organization: "Financial Action Task Force",
    location: "Singapore",
    workModality: "Remote",
    postedAt: "8 Jul",
    href: "#",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const Featured: Story = {
  args: {
    id: "5",
    title: "Regional Leader, East Asia (EAS)",
    organization: "World Vision",
    location: "Thailand",
    postedAt: "8 Jul",
    href: "#",
    featured: true,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const FeaturedWithWorkModality: Story = {
  args: {
    id: "6",
    title: "Senior Energy Analysts - IEA Regional Cooperation Centre - Singapore",
    organization: "Financial Action Task Force",
    location: "Singapore",
    workModality: "Remote",
    postedAt: "8 Jul",
    href: "#",
    featured: true,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const Grid: Story = {
  args: {
    id: "",
    title: "",
    organization: "",
    location: "",
    postedAt: "",
    href: "",
  },
  render: () => (
    <div className="grid grid-cols-4 gap-6 w-[1200px] bg-cream p-6">
      {[
        {
          id: "1",
          title: "Senior Energy Analysts - IEA Regional Cooperation Centre - Singapore",
          organization: "Financial Action Task Force",
          location: "Singapore",
          workModality: "Remote",
          postedAt: "8 Jul",
          href: "#",
          featured: true,
        },
        {
          id: "2",
          title: "Regional Leader, East Asia (EAS)",
          organization: "World Vision",
          location: "Thailand",
          postedAt: "8 Jul",
          href: "#",
          featured: true,
        },
        {
          id: "3",
          title: "Event Coordinator",
          organization: "Team Everest",
          location: "India",
          postedAt: "8 Jul",
          href: "#",
          featured: true,
        },
        {
          id: "4",
          title: "Part-time Intern",
          organization: "PIInet",
          location: "Hong Kong",
          postedAt: "8 Jul",
          href: "#",
          featured: true,
        },
        {
          id: "5",
          title: "Afghanistan Mission Development Manager",
          organization: "WeWorld Onlus",
          location: "Afghanistan",
          postedAt: "8 Jul",
          href: "#",
        },
        {
          id: "6",
          title: "Administrative and Finance Officer",
          organization: "Baan Dek Foundation",
          location: "Thailand",
          postedAt: "8 Jul",
          href: "#",
        },
        {
          id: "7",
          title: "Senior Manager Board Secretariat",
          organization: "Alliance for Financial Inclusion (AFI)",
          location: "Malaysia",
          postedAt: "8 Jul",
          href: "#",
        },
        {
          id: "8",
          title: "Project Coordinator",
          organization: "GreenViet",
          location: "Vietnam",
          postedAt: "8 Jul",
          href: "#",
        },
      ].map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  ),
};
