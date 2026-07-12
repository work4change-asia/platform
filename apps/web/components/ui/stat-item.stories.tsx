import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatItem } from "./stat-item";

const meta = {
  title: "UI/StatItem",
  component: StatItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-teal p-10 rounded-card">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "200+",
    label: "new jobs posts every week",
  },
};

export const AllStats: Story = {
  args: { value: "", label: "" },
  render: () => (
    <div className="bg-teal p-10 rounded-card grid grid-cols-2 gap-10">
      <StatItem value="200+" label="new jobs posts every week" />
      <StatItem value="160" label="active organisations and counting" />
      <StatItem value="200+" label="subscribers" />
      <StatItem value="2000+" label="monthly visits" />
    </div>
  ),
};
