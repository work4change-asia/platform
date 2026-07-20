import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { JobCarousel } from "./job-carousel";
import type { JobCardData } from "@/lib/home-data";

const SAMPLE_JOBS: JobCardData[] = [
  {
    id: "1",
    title: "Product Designer",
    organization: "Google Inc",
    location: "Singapore",
    postedAt: "2h ago",
    href: "#",
  },
  {
    id: "2",
    title: "Email Marketing Specialist",
    organization: "Spotify",
    location: "Singapore",
    workModality: "Remote",
    postedAt: "5h ago",
    href: "#",
  },
  {
    id: "3",
    title: "Full-stack Developer",
    organization: "GitHub",
    location: "Japan",
    postedAt: "1d ago",
    href: "#",
  },
  {
    id: "4",
    title: "Content Writer",
    organization: "WordPress",
    location: "Philippines",
    workModality: "Remote",
    postedAt: "1d ago",
    href: "#",
  },
];

const meta = {
  title: "UI/JobCarousel",
  component: JobCarousel,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[700px] bg-cream p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof JobCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobs: SAMPLE_JOBS,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevButton = canvas.getByLabelText("Previous");
    const nextButton = canvas.getByLabelText("Next");

    await expect(prevButton).toBeDisabled();
    await expect(nextButton).not.toBeDisabled();
    await expect(canvas.getByText("Slide 1 of 4")).toBeInTheDocument();

    await userEvent.click(nextButton);
    await expect(prevButton).not.toBeDisabled();
    await expect(canvas.getByText("Slide 2 of 4")).toBeInTheDocument();

    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    await expect(nextButton).toBeDisabled();
    await expect(canvas.getByText("Slide 4 of 4")).toBeInTheDocument();

    await userEvent.click(prevButton);
    await expect(nextButton).not.toBeDisabled();
    await expect(canvas.getByText("Slide 3 of 4")).toBeInTheDocument();
  },
};

export const FeaturedOnDark: Story = {
  args: {
    jobs: SAMPLE_JOBS,
    featured: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[700px] bg-gray-950 p-6">
        <Story />
      </div>
    ),
  ],
};
