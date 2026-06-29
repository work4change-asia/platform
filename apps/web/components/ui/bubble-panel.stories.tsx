import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BubblePanel } from "./bubble-panel";

const meta = {
  title: "UI/BubblePanel",
  component: BubblePanel,
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["teal", "orange", "muted", "cream", "dark"] },
    shape:   { control: "select", options: ["standard", "large"] },
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
  return (
    <div style={{ width, height, position: "relative" }}>{children}</div>
  );
}

// ─── Figma shape variants (at source canvas dimensions) ───────────────────────

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
  args: {},
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

// ─── Colour variants (standard shape at realistic card proportions) ───────────

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

// ─── Usage contexts ───────────────────────────────────────────────────────────

export const ContextPageBanner: Story = {
  name: "Context / Page banner",
  render: () => (
    <Frame width={1179} height={366}>
      <BubblePanel
        variant="teal"
        shape="standard"
        className="flex h-full items-center justify-center"
      >
        <h1 className="text-h3 font-semibold text-cream">Job Details</h1>
      </BubblePanel>
    </Frame>
  ),
  args: {},
};

export const ContextHero: Story = {
  name: "Context / Hero (desktop)",
  render: () => (
    <div style={{ width: 1440, padding: "0 40px" }}>
      <Frame width={1360} height={750}>
        <BubblePanel
          variant="teal"
          shape="large"
          className="flex h-full items-center px-20"
          media={
            <img
              src="/images/worldmap.svg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain object-right"
            />
          }
        >
          <div className="max-w-[480px]">
            <h1 className="mb-10 text-h2 font-semibold text-cream">
              Your gateway to{" "}
              <span className="text-orange">purpose-driven careers</span>{" "}
              across Asia
            </h1>
            <div className="flex gap-4">
              <button className="rounded-full bg-orange px-8 py-4 text-sm font-semibold text-cream">
                Explore Jobs
              </button>
              <button className="rounded-full border border-cream px-8 py-4 text-sm font-semibold text-cream">
                Explore Opportunities
              </button>
            </div>
          </div>
        </BubblePanel>
      </Frame>
    </div>
  ),
  args: {},
};

export const ContextPhotoFrame: Story = {
  name: "Context / Photo frame",
  render: () => (
    <Frame width={560} height={480}>
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


export const ContextCtaCard: Story = {
  name: "Context / CTA card",
  render: () => (
    <div className="max-w-md">
      <BubblePanel variant="orange" shape="standard" className="px-8 py-10">
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

