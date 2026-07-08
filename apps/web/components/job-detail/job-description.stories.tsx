import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JobDescription } from "./job-description";

const meta = {
  title: "JobDetail/JobDescription",
  component: JobDescription,
  parameters: { layout: "padded" },
} satisfies Meta<typeof JobDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    descriptionBody:
      "We are looking for a Senior UX Designer to join our growing team. In this role you will work closely with product managers and engineers to define, design, and ship experiences used by millions.\n\nYou will conduct user research, create wireframes and prototypes, and iterate based on feedback.",
    responsibilities: [
      "Quisque semper gravida est et consectetur.",
      "Curabitur blandit lorem velit, vitae pretium leo placerat eget.",
      "Morbi mattis in ipsum ac tempus.",
      "Vulputate turpis. Quisque ante odio.",
      "Lobortis vel lectus. Nulla at risus ut diam.",
    ],
  },
};

export const ManyResponsibilities: Story = {
  args: {
    descriptionBody:
      "A longer description to verify the layout holds when both sections are tall.\n\nSecond paragraph here.",
    responsibilities: Array.from({ length: 9 }, (_, i) => `Responsibility item ${i + 1} — a longer line of text to check wrapping behaviour.`),
  },
};
