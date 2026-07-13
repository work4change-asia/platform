import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OrganizationInfoCard } from "./organization-info-card";

const meta = {
  title: "JobDetail/OrganizationInfoCard",
  component: OrganizationInfoCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof OrganizationInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orgName: "Google Inc",
    orgInitial: "G",
    orgTagline: "Social networking service",
    founded: "March 21, 2006",
    orgType: "International Organisation",
    orgSize: "120-300 Employees",
    website: "https://google.com",
  },
};

export const LongName: Story = {
  args: {
    orgName: "United Nations Development Programme Asia",
    orgInitial: "U",
    orgTagline: "United Nations Development Programme",
    founded: "January 1, 1966",
    orgType: "United Nations Agency",
    orgSize: "8,000+ Staff",
    website: "https://asia.undp.org",
  },
};
