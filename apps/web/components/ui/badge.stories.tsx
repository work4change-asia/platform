import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";
import { LocationIcon } from "./icons";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "full-time",
        "part-time",
        "location",
        "filter",
        "active",
        "inactive",
        "success",
        "danger",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullTime: Story = {
  args: { variant: "full-time", children: "Full Time" },
};

export const PartTime: Story = {
  args: { variant: "part-time", children: "Part Time" },
};

export const Location: Story = {
  render: () => (
    <Badge variant="location"><LocationIcon size={11} />Bangkok, Thailand</Badge>
  ),
};

export const Active: Story = {
  args: { variant: "active", children: "Active" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge variant="full-time">Full Time</Badge>
      <Badge variant="part-time">Part Time</Badge>
      <Badge variant="location"><LocationIcon size={11} />Bangkok</Badge>
      <Badge variant="filter">Remote ✕</Badge>
      <Badge variant="active">Active</Badge>
      <Badge variant="inactive">Inactive</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="danger">Expired</Badge>
    </div>
  ),
};
