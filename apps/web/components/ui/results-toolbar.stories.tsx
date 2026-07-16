import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { ResultsToolbar } from "./results-toolbar";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "relevant", label: "Most Relevant" },
] as const;

const PER_PAGE_OPTIONS = [12, 24, 48];

const meta = {
  title: "UI/ResultsToolbar",
  component: ResultsToolbar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-cream p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ResultsToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function StatefulToolbar() {
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>("latest");
  const [perPage, setPerPage] = useState(12);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <ResultsToolbar
      count={23}
      itemLabel="Open Jobs"
      sort={sort}
      sortOptions={SORT_OPTIONS}
      onSortChange={setSort}
      perPage={perPage}
      perPageOptions={PER_PAGE_OPTIONS}
      onPerPageChange={setPerPage}
      view={view}
      onViewChange={setView}
    />
  );
}

export const Default: Story = {
  args: {
    count: 23,
    itemLabel: "Open Jobs",
    sort: "latest",
    sortOptions: SORT_OPTIONS,
    onSortChange: () => {},
    perPage: 12,
    perPageOptions: PER_PAGE_OPTIONS,
    onPerPageChange: () => {},
    view: "grid",
    onViewChange: () => {},
  },
  render: () => <StatefulToolbar />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const sortSelect = canvas.getByLabelText("Sort by");
    await userEvent.selectOptions(sortSelect, "oldest");
    await expect(sortSelect).toHaveValue("oldest");

    const perPageSelect = canvas.getByLabelText("Results per page");
    await userEvent.selectOptions(perPageSelect, "24");
    await expect(perPageSelect).toHaveValue("24");

    const gridViewButton = canvas.getByLabelText("Grid view");
    const listViewButton = canvas.getByLabelText("List view");
    await userEvent.click(listViewButton);
    await expect(listViewButton).toHaveAttribute("aria-pressed", "true");
    await expect(gridViewButton).toHaveAttribute("aria-pressed", "false");
  },
};

export const ListViewActive: Story = {
  args: {
    count: 23,
    itemLabel: "Open Jobs",
    sort: "latest",
    sortOptions: SORT_OPTIONS,
    onSortChange: () => {},
    perPage: 12,
    perPageOptions: PER_PAGE_OPTIONS,
    onPerPageChange: () => {},
    view: "list",
    onViewChange: () => {},
  },
};

export const LargeCount: Story = {
  args: {
    count: 1240,
    itemLabel: "Open Jobs",
    sort: "latest",
    sortOptions: SORT_OPTIONS,
    onSortChange: () => {},
    perPage: 12,
    perPageOptions: PER_PAGE_OPTIONS,
    onPerPageChange: () => {},
    view: "grid",
    onViewChange: () => {},
  },
};
