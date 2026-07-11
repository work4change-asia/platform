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

export const FullTime: Story = {
  args: {
    id: "1",
    title: "Product Designer",
    organization: "Google Inc",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Singapore",
    description:
      "Join our team as a Product Designer and help shape the future of digital experiences for millions of users across Asia.",
    postedAt: "2h ago",
    href: "/job-board/1-product-designer-google",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const PartTime: Story = {
  args: {
    id: "2",
    title: "Content Writer",
    organization: "WordPress",
    contractType: "part-time",
    contractLabel: "Part Time",
    location: "Remote",
    description:
      "Create compelling content that helps millions of website owners get the most out of the world's most popular CMS.",
    postedAt: "1d ago",
    href: "/job-board/2-content-writer-wordpress",
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const LongTitle: Story = {
  args: {
    id: "3",
    title: "Senior Communications and Advocacy Officer for Asia Pacific Region",
    organization: "Save the Children",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Bangkok, Thailand",
    description:
      "Lead communications strategy and advocacy campaigns that amplify the voices of children and communities across the Asia Pacific region.",
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

export const Grid: Story = {
  args: {
    id: "",
    title: "",
    organization: "",
    contractType: "full-time",
    contractLabel: "",
    location: "",
    description: "",
    postedAt: "",
    href: "",
  },
  render: () => (
    <div className="grid grid-cols-3 gap-6 w-[900px]">
      {[
        {
          id: "1",
          title: "Product Designer",
          organization: "Google Inc",
          contractType: "full-time" as const,
          contractLabel: "Full Time",
          location: "Singapore",
          description:
            "Join our team as a Product Designer and help shape the future of digital experiences.",
          postedAt: "2h ago",
          href: "#",
        },
        {
          id: "2",
          title: "Content Writer",
          organization: "WordPress",
          contractType: "part-time" as const,
          contractLabel: "Part Time",
          location: "Remote",
          description:
            "Create compelling content that helps millions of website owners get the most out of the world's most popular CMS.",
          postedAt: "1d ago",
          href: "#",
        },
        {
          id: "3",
          title: "Programme Officer",
          organization: "UNDP Asia",
          contractType: "full-time" as const,
          contractLabel: "Full Time",
          location: "Bangkok, Thailand",
          description:
            "Support sustainable development programmes across Asia, working with governments and civil society to advance the SDGs.",
          postedAt: "4d ago",
          href: "#",
        },
        {
          id: "4",
          title: "Data Analyst",
          organization: "Grab",
          contractType: "full-time" as const,
          contractLabel: "Full Time",
          location: "Jakarta, Indonesia",
          description:
            "Turn data into insights that drive product decisions for Southeast Asia's leading superapp.",
          postedAt: "3d ago",
          href: "#",
        },
        {
          id: "5",
          title: "Research Fellow",
          organization: "Asia Foundation",
          contractType: "full-time" as const,
          contractLabel: "Fellowship",
          location: "Manila, Philippines",
          description:
            "Conduct policy research on governance, development, and civil society across the Asia-Pacific region.",
          postedAt: "5d ago",
          href: "#",
        },
        {
          id: "6",
          title: "Fundraising Manager",
          organization: "Save the Children",
          contractType: "full-time" as const,
          contractLabel: "Full Time",
          location: "Ho Chi Minh City",
          description:
            "Lead fundraising strategy and donor engagement to support life-changing programmes for children across Vietnam.",
          postedAt: "5d ago",
          href: "#",
        },
      ].map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  ),
};
