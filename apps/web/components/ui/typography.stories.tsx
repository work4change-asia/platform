import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/Typography",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-8 text-teal">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">Display 01 — 56px / 64px / SemiBold</p>
        <p className="text-display font-semibold">Work4Change Asia</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">H1 — 48px / SemiBold (brand book)</p>
        <h1 className="text-h1">Career Platform for Impact</h1>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">H2 — 48px / SemiBold (brand book)</p>
        <h2 className="text-h2">Find Your Next Role</h2>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">H3 — 40px / Regular (brand book)</p>
        <h3 className="text-h3">Find Opportunities in Asia</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">H4 — 36px / Regular</p>
        <h4 className="text-h4">Browse the Job Board</h4>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">H5 — 32px / Regular</p>
        <h5 className="text-h5">Grants &amp; Events</h5>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">H6 — 24px / Regular</p>
        <h6 className="text-h6">Non-Profit Sector</h6>
      </div>
      <hr className="border-gray-100" />
      <div className="flex flex-col gap-4 text-charcoal">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">Body XL — 20px / 32px</p>
          <p className="text-xl font-normal">We connect impact-driven professionals with organisations across Asia and the Pacific.</p>
          <p className="text-xl font-medium">We connect impact-driven professionals with organisations across Asia and the Pacific.</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">Body Large — 18px / 28px</p>
          <p className="text-lg font-normal">Browse fellowships, grants, internships, and full-time roles — all free.</p>
          <p className="text-lg font-medium">Browse fellowships, grants, internships, and full-time roles — all free.</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">Body Medium — 16px / 24px</p>
          <p className="text-base font-normal">Submit your application before the deadline closes.</p>
          <p className="text-base font-medium">Submit your application before the deadline closes.</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">Body Small — 14px / 20px</p>
          <p className="text-sm font-normal">Posted 3 days ago · Full Time · Remote</p>
          <p className="text-sm font-medium">Posted 3 days ago · Full Time · Remote</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">Body XS — 12px / 18px</p>
          <p className="text-xs font-normal">4 days remaining</p>
          <p className="text-xs font-medium">4 days remaining</p>
        </div>
      </div>
      <hr className="border-gray-100" />
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">Button — 16px / 24px / Medium · Caption — 14px / 28px / SemiBold uppercase</p>
        <p className="text-base font-medium text-teal">Apply Now</p>
        <p className="text-sm font-semibold uppercase tracking-wider text-orange">Caption</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">Tiny — 12px / 16px / Regular</p>
        <p className="text-tiny font-normal text-pale-blue">4 Days Remaining</p>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-4 text-teal text-h6">
      <p className="font-light">Manrope Light — 300</p>
      <p className="font-normal">Manrope Regular — 400</p>
      <p className="font-medium">Manrope Medium — 500</p>
      <p className="font-semibold">Manrope SemiBold — 600</p>
      <p className="font-bold">Manrope Bold — 700</p>
    </div>
  ),
};
