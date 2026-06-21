import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Upload } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "link", "inverse"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "Apply Now" },
};

export const Secondary: Story = {
  args: { variant: "secondary", size: "md", children: "Learn More" },
};

export const Outline: Story = {
  args: { variant: "outline", size: "md", children: "Save Job" },
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "md", children: "Cancel" },
};

export const Inverse: Story = {
  args: { variant: "inverse", size: "md", children: "Log In" },
  decorators: [
    (Story) => (
      <div className="bg-teal p-8 rounded-card">
        <Story />
      </div>
    ),
  ],
};

export const WithIconRight: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" rightIcon={<ArrowRight size={20} />}>Icon Right</Button>
        <Button variant="primary" rightIcon={<Upload size={20} />}>Upload</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="outline" rightIcon={<ArrowRight size={20} />}>Icon Right</Button>
        <Button variant="outline" rightIcon={<Upload size={20} />}>Upload</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center bg-teal p-6 rounded-card">
        <Button variant="inverse" rightIcon={<ArrowRight size={20} />}>Icon Right</Button>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center bg-teal p-6 rounded-card">
        <Button variant="inverse">Inverse</Button>
        <Button variant="inverse" disabled>Inverse Disabled</Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small (44px)</Button>
      <Button size="md">Medium (48px)</Button>
      <Button size="lg">Large (64px)</Button>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-pale-blue">Each variant encodes disabled differently per Figma</p>
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary" disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="outline" disabled>Outline</Button>
        <Button variant="ghost" disabled>Ghost</Button>
      </div>
      <div className="flex flex-wrap gap-4 items-center bg-teal p-6 rounded-card">
        <Button variant="inverse" disabled>Inverse</Button>
      </div>
    </div>
  ),
};
