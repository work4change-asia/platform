import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyInfoCard } from "./company-info-card";

const meta = {
  title: "JobDetail/CompanyInfoCard",
  component: CompanyInfoCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CompanyInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orgName: "Google Inc",
    orgInitial: "G",
    orgTagline: "Social networking service",
    founded: "March 21, 2006",
    orgType: "International Organisation",
    companySize: "120-300 Employers",
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
    companySize: "8,000+ Staff",
    website: "https://asia.undp.org",
  },
};
