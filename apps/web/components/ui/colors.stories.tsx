import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";

type ColorEntry = { name: string; hex: string; className: string };

const brand: ColorEntry[] = [
  { name: "teal", hex: "#0a3b44", className: "bg-teal" },
  { name: "teal-light", hex: "#2ab5c8", className: "bg-teal-light" },
  { name: "teal-dark", hex: "#127a88", className: "bg-teal-dark" },
  { name: "teal-muted", hex: "#c3e3e8", className: "bg-teal-muted" },
  { name: "orange", hex: "#ff8a42", className: "bg-orange" },
  { name: "orange-light", hex: "#ffceaf", className: "bg-orange-light" },
  { name: "caramel", hex: "#c45a23", className: "bg-caramel" },
  { name: "cream", hex: "#f4f1ec", className: "bg-cream" },
  { name: "pale-blue", hex: "#a7bfc8", className: "bg-pale-blue" },
  { name: "brown", hex: "#d68a55", className: "bg-brown" },
];

const neutrals: ColorEntry[] = [
  { name: "charcoal", hex: "#3b3b3b", className: "bg-charcoal" },
  { name: "gray-950", hex: "#1a1a1a", className: "bg-gray-950" },
  { name: "gray-900", hex: "#191f33", className: "bg-gray-900" },
  { name: "gray-text", hex: "#18191c", className: "bg-gray-text" },
  { name: "gray-200", hex: "#d4dce0", className: "bg-gray-200" },
  { name: "gray-100", hex: "#dfe3eb", className: "bg-gray-100" },
];

const semantic: ColorEntry[] = [
  { name: "success", hex: "#0ba02c", className: "bg-success" },
  { name: "danger", hex: "#e05151", className: "bg-danger" },
  { name: "warning", hex: "#ffa500", className: "bg-warning" },
];

const badge: ColorEntry[] = [
  { name: "badge-teal-bg", hex: "#eafdff", className: "bg-badge-teal-bg" },
  { name: "badge-yellow-bg", hex: "#fffeea", className: "bg-badge-yellow-bg" },
  { name: "badge-yellow-text", hex: "#ddc02e", className: "bg-badge-yellow-text" },
];

function ColorSwatch({ name, hex, className }: ColorEntry) {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-gray-100">
      <div className={`h-20 w-full ${className}`} />
      <div className="flex flex-col gap-0.5 bg-white p-3">
        <span className="text-sm font-medium text-gray-text">{name}</span>
        <span className="text-xs uppercase text-pale-blue">{hex}</span>
      </div>
    </div>
  );
}

function ColorGrid({ entries }: { entries: ColorEntry[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {entries.map((entry) => (
        <ColorSwatch key={entry.name} {...entry} />
      ))}
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">{label}</p>
      {children}
    </div>
  );
}

const meta = {
  title: "UI/Colors",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <Section label="Brand Colors">
        <ColorGrid entries={brand} />
      </Section>
      <Section label="Neutrals">
        <ColorGrid entries={neutrals} />
      </Section>
      <Section label="Semantic Status">
        <ColorGrid entries={semantic} />
      </Section>
      <Section label="Badge / Label Surfaces">
        <ColorGrid entries={badge} />
      </Section>
    </div>
  ),
};
