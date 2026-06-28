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
    title: "Digital Marketer",
    organization: "Instagram",
    excerpt:
      "Are you an Email Marketing Specialist? We are looking for a digital marketer to join our team. Join our digital outreach efforts.",
    tags: ["New", "Full Time"],
    href: "/opportunities/1-digital-marketer-instagram",
  },
  decorators: [(Story) => <div className="w-[640px]"><Story /></div>],
};

export const Grant: Story = {
  args: {
    id: "2",
    title: "CFIs Call for Proposals: Empowering Civil Society in 2025",
    organization: "Asia Foundation",
    excerpt:
      "The Asia Foundation invites civil society organizations across Asia to submit proposals for capacity-building grants supporting democracy, governance, and social development initiatives.",
    tags: ["Grant", "Open"],
    href: "/opportunities/2-cfi-proposals-asia-foundation",
  },
  decorators: [(Story) => <div className="w-[640px]"><Story /></div>],
};

export const Stack: Story = {
  args: { id: "", title: "", organization: "", excerpt: "", tags: [], href: "" },
  render: () => (
    <div className="flex flex-col gap-4 w-[640px]">
      <OpportunityCard
        id="1"
        title="Digital Marketer"
        organization="Instagram"
        excerpt="Are you an Email Marketing Specialist? We are looking for a digital marketer to join our team. Join our digital outreach efforts. We use talent for all our customer outreach."
        tags={["New", "Full Time"]}
        href="#"
      />
      <OpportunityCard
        id="2"
        title="Digital Marketer"
        organization="Slack"
        excerpt="Are you an Email Marketing Specialist and are looking to join a team as an Email Marketing Specialist and lead our digital marketing."
        tags={["New", "Part Time"]}
        href="#"
      />
    </div>
  ),
};
