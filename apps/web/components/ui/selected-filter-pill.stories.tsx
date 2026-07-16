import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { SelectedFilterPill } from "./selected-filter-pill";

const meta = {
  title: "UI/SelectedFilterPill",
  component: SelectedFilterPill,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectedFilterPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Fully Remote (local)",
    onRemove: () => {},
  },
};

export const SelectedFilters: Story = {
  args: { label: "Bangalore", onRemove: () => {} },
  render: () => {
    const [filters, setFilters] = useState([
      "Bangalore",
      "Strategy & Organisational Development",
      "Fully Remote (local)",
      "Freelance/Consultancy",
    ]);

    return (
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <SelectedFilterPill
            key={filter}
            label={filter}
            onRemove={() => setFilters((prev) => prev.filter((f) => f !== filter))}
          />
        ))}
      </div>
    );
  },
};
