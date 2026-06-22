import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthButtons } from "./auth-buttons";

const meta = {
  title: "Navigation/AuthButtons",
  component: AuthButtons,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
} satisfies Meta<typeof AuthButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: { size: "sm" },
  decorators: [
    (Story) => (
      <div className="flex items-center gap-3">
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  args: { size: "md" },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-3 w-64">
        <Story />
      </div>
    ),
  ],
};
