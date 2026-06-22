import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "./link";

const meta = {
  title: "UI/Link",
  component: Link,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "nav"],
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: "#", children: "View job details", variant: "default" },
};

export const Muted: Story = {
  args: { href: "#", children: "Skip for now", variant: "muted" },
};

export const Nav: Story = {
  args: { href: "#", children: "Job Board", variant: "nav" },
};

export const AllVariants: Story = {
  args: { href: "#" },
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" variant="default">
        Default link
      </Link>
      <Link href="#" variant="muted">
        Muted link
      </Link>
      <Link href="#" variant="nav">
        Nav link
      </Link>
    </div>
  ),
};
