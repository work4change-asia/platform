import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JobOverviewCard } from "./job-overview-card";

const meta = {
  title: "JobDetail/JobOverviewCard",
  component: JobOverviewCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof JobOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    location: "Seoul, South Korea",
    workMode: "Remote (global)",
    experience: "3-5 Years",
    language: "English",
    contractLabel: "Permanent FT",
    timeCommitment: "Full-time",
    sector: "Digital Communications",
    isInternationalContract: true,
  },
};

export const LocalContract: Story = {
  args: {
    location: "Bangkok, Thailand",
    workMode: "On-site",
    experience: "5+ Years",
    language: "English, Thai",
    contractLabel: "Full Time",
    timeCommitment: "Full-time",
    sector: "International Development",
    isInternationalContract: false,
  },
};
