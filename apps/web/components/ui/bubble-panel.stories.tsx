import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BubblePanel } from "./bubble-panel";

const meta = {
  title: "UI/BubblePanel",
  component: BubblePanel,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["teal", "orange", "muted", "cream", "dark"] },
    shape: { control: "select", options: ["standard", "large"] },
  },
  args: { variant: "teal", shape: "standard" },
} satisfies Meta<typeof BubblePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper: wrapper that locks the panel to a specific Figma canvas ratio
function Frame({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return <div style={{ width, height, position: "relative" }}>{children}</div>;
}

// ─── Shapes (at source canvas dimensions) ──────────────────────────────────────

/** Rectangle 9692 — standard shape, 710 × 309 */
export const ShapeStandard9692: Story = {
  name: "Shape / Standard (9692 · 710×309)",
  render: () => (
    <Frame width={710} height={309}>
      <BubblePanel variant="orange" shape="standard" className="h-full px-10 py-8">
        <p className="text-sm font-semibold">Standard shape at source canvas size</p>
      </BubblePanel>
    </Frame>
  ),
  args: { variant: "orange" },
};

/** Rectangle 9694 — standard shape, 875 × 320 */
export const ShapeStandard9694: Story = {
  name: "Shape / Standard (9694 · 875×320)",
  render: () => (
    <Frame width={875} height={320}>
      <BubblePanel variant="muted" shape="standard" className="h-full px-10 py-8">
        <p className="text-sm font-semibold">Standard shape at 875 × 320</p>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};

/** Rectangle 9700 — large shape, 1180 × 652 */
export const ShapeLarge9700: Story = {
  name: "Shape / Large (9700 · 1180×652)",
  render: () => (
    <Frame width={1180} height={652}>
      <BubblePanel variant="teal" shape="large" className="h-full px-16 py-14">
        <p className="text-sm font-semibold">Large shape at source canvas size</p>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};

// ─── Colours (standard shape at realistic card proportions) ───────────────────

export const ColourTeal: Story = {
  name: "Colour / Teal",
  render: () => (
    <Frame width={710} height={260}>
      <BubblePanel variant="teal" shape="standard" className="h-full px-10 py-8">
        <p className="font-semibold">Teal — primary brand panel</p>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};

export const ColourOrange: Story = {
  name: "Colour / Orange",
  render: () => (
    <Frame width={710} height={260}>
      <BubblePanel variant="orange" shape="standard" className="h-full px-10 py-8">
        <p className="font-semibold">Orange — accent / CTA panel</p>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};

export const ColourMuted: Story = {
  name: "Colour / Muted",
  render: () => (
    <Frame width={710} height={260}>
      <BubblePanel variant="muted" shape="standard" className="h-full px-10 py-8">
        <p className="font-semibold">Muted teal — photo frame / soft panel</p>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};

export const ColourCream: Story = {
  name: "Colour / Cream",
  render: () => (
    <Frame width={710} height={260}>
      <BubblePanel variant="cream" shape="standard" className="h-full px-10 py-8">
        <p className="font-semibold">Cream — light surface panel</p>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};

export const ColourDark: Story = {
  name: "Colour / Dark",
  render: () => (
    <Frame width={710} height={260}>
      <BubblePanel variant="dark" shape="standard" className="h-full px-10 py-8">
        <p className="font-semibold">Dark — high-contrast panel</p>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};

// ─── Usage contexts — desktop, props mirrored 1:1 from the real component ─────

/** Matches components/home/hero.tsx */
export const ContextHero: Story = {
  name: "Context / Hero (home)",
  render: () => (
    <div style={{ width: 1440, padding: "0 10.5%" }}>
      <BubblePanel
        variant="teal"
        shape="large"
        className="flex min-h-[520px] items-center px-16 py-20"
        media={
          <img
            src="/images/worldmap.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain object-right opacity-90"
          />
        }
      >
        <div className="max-w-xl">
          <h1 className="mb-5 text-h2 font-semibold text-cream">
            Your gateway to <span className="text-orange">purpose-driven careers</span> across Asia
          </h1>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-pill bg-orange px-6 py-3 text-sm font-semibold text-cream">
              Jobs
            </button>
            <button className="rounded-pill border border-cream px-6 py-3 text-sm font-semibold text-cream">
              Opportunities
            </button>
          </div>
        </div>
      </BubblePanel>
    </div>
  ),
  args: {},
};

/** Matches components/home/testimonial.tsx */
export const ContextTestimonial: Story = {
  name: "Context / Testimonial photo (home)",
  render: () => (
    <Frame width={560} height={560}>
      <BubblePanel
        variant="muted"
        shape="large"
        className="h-full w-full"
        media={
          <img
            src="/images/testimonial-photo.png"
            alt="Professional reading at a desk"
            className="absolute inset-0 h-full w-full object-cover [object-position:center_15%]"
          />
        }
      />
    </Frame>
  ),
  args: {},
};

/** Matches components/home/stats.tsx */
export const ContextStatsCta: Story = {
  name: "Context / Stats CTA (home)",
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <BubblePanel variant="orange" shape="large" className="px-8 py-10">
        <h2 className="mb-8 text-h5 font-semibold text-teal">
          Join our community of opportunity seekers &amp; providers!
        </h2>
        <button className="rounded-pill bg-teal px-8 py-3 text-sm font-semibold text-cream">
          Create An Account
        </button>
      </BubblePanel>
    </div>
  ),
  args: {},
};

/** Matches app/(frontend)/job-board/[slug]/page.tsx */
export const ContextPageBanner: Story = {
  name: "Context / Job Details banner (job board)",
  render: (args) => (
    <Frame width={1179} height={366}>
      <BubblePanel
        {...args}
        className="flex h-full items-center justify-center"
        media={
          <img
            src="/images/worldmap-dots-job-details.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-bottom opacity-40"
          />
        }
      >
        <h1 className="text-h3 font-normal text-cream">Job Details</h1>
      </BubblePanel>
    </Frame>
  ),
  args: {
    variant: "teal",
    shape: "standard",
  },
};

/** Matches components/job-detail/join-us-cta.tsx */
export const ContextJoinUsCta: Story = {
  name: "Context / Join Us CTA (job detail)",
  render: () => (
    <Frame width={1179} height={280}>
      <BubblePanel
        variant="orange"
        shape="standard"
        className="flex h-full items-center px-10 py-10 sm:px-16"
        media={
          <img
            src="/images/worldmap-dots-job-details.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-bottom opacity-40"
          />
        }
      >
        <div className="flex w-full items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="mb-2 text-h4 font-semibold text-teal">Join Us</h2>
            <p className="text-sm text-teal">
              Curious about this content? Join our community and create your profile to explore more
              opportunities!
            </p>
          </div>
          <div className="flex w-full max-w-md gap-3 lg:shrink-0">
            <input
              type="email"
              placeholder="Email Address"
              className="h-12 flex-1 rounded-pill bg-white px-5 text-sm text-charcoal placeholder:text-pale-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            />
            <button className="rounded-pill bg-teal px-6 py-3 text-sm font-semibold text-cream">
              Submit
            </button>
          </div>
        </div>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};
