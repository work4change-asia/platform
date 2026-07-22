import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OpportunityCard } from "./opportunity-card";

const meta = {
  title: "UI/OpportunityCard",
  component: OpportunityCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof OpportunityCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1",
    title: "Call for Audit Consultants: Grant Compliance Review",
    organization: "SAARC Development Fund",
    excerpt:
      "SAARC Development Fund's Bhutan office is seeking qualified consultants or consultancy firms to conduct an audit of a specific grant under a partnership education initiative.",
    tags: ["Grant"],
    href: "/opportunities/1-audit-consultants-saarc-development-fund",
  },
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
};

export const Grant: Story = {
  args: {
    id: "2",
    title: "CFIs Call for Proposals: Empowering Civil Society in 2025",
    organization: "Asia Foundation",
    excerpt:
      "The Asia Foundation invites civil society organizations across Asia to submit proposals for capacity-building grants supporting democracy, governance, and social development initiatives.",
    tags: ["Grant"],
    href: "/opportunities/2-cfi-proposals-asia-foundation",
  },
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
};

export const WithContractType: Story = {
  args: {
    id: "4",
    title: "Training & Capacity Strengthening Programme for Public Health Professionals",
    organization: "International Vaccine Institute (IVI)",
    excerpt:
      "IVI's Training & Capacity Strengthening Department is opening applications for public health professionals across Asia to join hands-on training in vaccine research, clinical operations, and programme management.",
    tags: ["Training"],
    contractType: "full-time",
    href: "/opportunities/4-training-capacity-strengthening-ivi",
  },
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
};

export const PartTime: Story = {
  args: {
    id: "5",
    title: "Guest Lecturer, Social Enterprise Programme",
    organization: "Singapore Management University",
    excerpt:
      "SMU is seeking a part-time guest lecturer to deliver sessions on social enterprise and impact venture building as part of its executive education programme.",
    tags: ["Training"],
    contractType: "part-time",
    href: "/opportunities/5-guest-lecturer-smu",
  },
  decorators: [
    (Story) => (
      <div className="w-[640px]">
        <Story />
      </div>
    ),
  ],
};

export const Stack: Story = {
  args: { id: "", title: "", organization: "", excerpt: "", tags: [], href: "" },
  render: () => (
    <div className="flex flex-col gap-4 w-[640px]">
      <OpportunityCard
        id="1"
        title="Call for Audit Consultants: Grant Compliance Review"
        organization="SAARC Development Fund"
        excerpt="SAARC Development Fund's Bhutan office is seeking qualified consultants or consultancy firms to conduct an audit of a specific grant under a partnership education initiative."
        tags={["Grant"]}
        href="#"
      />
      <OpportunityCard
        id="2"
        title="Training & Capacity Strengthening Programme for Public Health Professionals"
        organization="International Vaccine Institute (IVI)"
        excerpt="IVI's Training & Capacity Strengthening Department is opening applications for public health professionals across Asia to join hands-on training in vaccine research and programme management."
        tags={["Training"]}
        href="#"
      />
    </div>
  ),
};
