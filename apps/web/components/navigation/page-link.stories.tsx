import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BriefcaseIcon } from "@/components/ui/icons";
import { PageLink } from "./page-link";

const meta = {
  title: "Navigation/PageLink",
  component: PageLink,
  parameters: {
    layout: "centered",
    nextjs: { navigation: { pathname: "/" } },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: { href: "/job-board", label: "Job Board" },
};

export const Active: Story = {
  args: { href: "/job-board", label: "Job Board" },
  parameters: { nextjs: { navigation: { pathname: "/job-board" } } },
};

export const ActiveNested: Story = {
  args: { href: "/job-board", label: "Job Board" },
  parameters: { nextjs: { navigation: { pathname: "/job-board/123-senior-developer" } } },
};

export const WithIcon: Story = {
  args: { href: "/job-board", label: "Job Board" },
  render: () => <PageLink href="/job-board" label="Job Board" icon={<BriefcaseIcon />} />,
};

export const WithIconActive: Story = {
  args: { href: "/job-board", label: "Job Board" },
  parameters: { nextjs: { navigation: { pathname: "/job-board" } } },
  render: () => <PageLink href="/job-board" label="Job Board" icon={<BriefcaseIcon />} />,
};

export const AllStates: Story = {
  args: { href: "/", label: "Home" },
  parameters: { nextjs: { navigation: { pathname: "/job-board" } } },
  render: () => (
    <div className="flex flex-col gap-4">
      <PageLink href="/" label="Home" />
      <PageLink href="/about" label="About" />
      <PageLink href="/job-board" label="Job Board" />
      <PageLink href="/opportunities" label="Opportunities" />
    </div>
  ),
};
