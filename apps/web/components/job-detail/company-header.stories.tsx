import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyHeader } from "./company-header";

const meta = {
  title: "JobDetail/CompanyHeader",
  component: CompanyHeader,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CompanyHeader>;

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
