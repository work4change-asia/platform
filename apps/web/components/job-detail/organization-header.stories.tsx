import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OrganizationHeader } from "./organization-header";

const meta = {
  title: "JobDetail/OrganizationHeader",
  component: OrganizationHeader,
  parameters: { layout: "padded" },
} satisfies Meta<typeof OrganizationHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orgName: "Google Inc",
    orgInitial: "G",
    jobTitle: "Senior UX Designer",
  },
};

export const LongTitle: Story = {
  args: {
    orgName: "United Nations Development Programme Asia",
    orgInitial: "U",
    jobTitle: "Senior Programme Officer – Governance and Rule of Law",
  },
};
