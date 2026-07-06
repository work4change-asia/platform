# Opportunity/Job Card Data Model Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decouple `OpportunityData` from `JobCardData`, add a constrained `OpportunityType` tag list, and fix `OpportunitiesPreview` to render opportunities through `OpportunityCard` instead of `JobCard`.

**Architecture:** Pure frontend/type-layer change in `apps/web`. No new components — `OpportunityCard` already exists and already renders `tags` correctly; the bug is that its type accepted any `string[]` and a sibling component (`OpportunitiesPreview`) never used it. This plan tightens the types (which makes the mismatch impossible to reintroduce) and fixes the one wiring bug.

**Tech Stack:** Next.js App Router, TypeScript, Storybook (`@storybook/nextjs-vite`), Vitest, pnpm workspaces (`apps/web`).

## Global Constraints

- No `any`, `as Foo` assertions, `!` non-null assertions, or lint-suppression comments (Oxlint-enforced, see project `CLAUDE.md`).
- Run `pnpm typecheck` and `pnpm lint` before each commit (project convention).
- Spec: `docs/specs/2026-07-01-opportunity-job-card-split-design.md`.
- Scope is frontend/component layer only — no Payload collection changes.
- This is a pure data/type/wiring change with no branching logic, so there is no unit-testable behavior to drive with Vitest. Verification is `tsc --noEmit` (type safety is the actual thing being fixed) plus visual confirmation in Storybook, per the existing pattern for `job-card.tsx`/`opportunity-card.tsx` (neither has a `.test.tsx` file today — only `.stories.tsx`).

---

### Task 1: Add `OpportunityType` and decouple `OpportunityData` from `JobCardData`

**Files:**
- Modify: `apps/web/lib/home-data.ts:1-18` (type declarations), `apps/web/lib/home-data.ts:170-204` (`featuredOpportunities` data)

**Interfaces:**
- Produces: `export type OpportunityType` (union of 8 string literals), `export type OpportunityData` (new shape: `id`, `title`, `organization`, `excerpt`, `tags: OpportunityType[]`, `href`)
- Consumed by: Task 2 (`OpportunityCardProps`), Task 3 (`OpportunitiesPreview`), Task 4 (stories)

- [ ] **Step 1: Replace the `OpportunityData` alias with the new type and add `OpportunityType`**

In `apps/web/lib/home-data.ts`, replace:

```ts
export type OpportunityData = JobCardData;
```

with:

```ts
export type OpportunityType =
  | "Event"
  | "Grant"
  | "News"
  | "Mobility"
  | "Publication"
  | "Research & Academia"
  | "Networking & Exchanges"
  | "Training";

export type OpportunityData = {
  id: string;
  title: string;
  organization: string;
  excerpt: string;
  tags: OpportunityType[];
  href: string;
};
```

Leave `JobCardData` (lines 6-16) untouched.

- [ ] **Step 2: Rewrite `featuredOpportunities` to match the new shape**

Replace the existing `featuredOpportunities` array (currently lines 170-204) with:

```ts
export const featuredOpportunities: OpportunityData[] = [
  {
    id: "1",
    title: "Digital Marketer",
    organization: "Instagram",
    excerpt: "We are looking for a digital marketer to join our team and lead our digital outreach efforts. Apply today.",
    tags: ["Mobility"],
    href: "/opportunities/1-digital-marketer-instagram",
  },
  {
    id: "2",
    title: "Digital Marketer",
    organization: "Slack",
    excerpt: "We are seeking a Digital Marketing Specialist to lead our internal outreach efforts and grow our brand presence across Asia.",
    tags: ["Training"],
    href: "/opportunities/2-digital-marketer-slack",
  },
  {
    id: "3",
    title: "CFIs Call for Proposals: Empowering Civil Society in 2025",
    organization: "Asia Foundation",
    excerpt: "The Asia Foundation invites civil society organizations across Asia to submit proposals for capacity-building grants supporting democracy, governance, and social development.",
    tags: ["Grant"],
    href: "/opportunities/3-cfi-proposals-asia-foundation",
  },
];
```

- [ ] **Step 3: Run typecheck to confirm the file compiles standalone-consistent**

Run: `cd apps/web && pnpm typecheck`
Expected: New errors will appear in `opportunity-card.tsx` and `opportunities-preview.tsx` (they haven't been updated yet) — confirm the errors are ONLY in those two files, and that `home-data.ts` itself has no errors. This confirms Step 1-2 are internally correct before Tasks 2-3 fix the consumers.

- [ ] **Step 4: Commit**

```bash
git add apps/web/lib/home-data.ts
git commit -m "feat(home-data): decouple OpportunityData from JobCardData, add OpportunityType"
```

---

### Task 2: Constrain `OpportunityCard` tags to `OpportunityType`

**Files:**
- Modify: `apps/web/components/ui/opportunity-card.tsx:1-11`

**Interfaces:**
- Consumes: `OpportunityType` from `@/lib/home-data` (Task 1)
- Produces: `OpportunityCardProps.tags: OpportunityType[]` — relied on by Task 4 (stories)

- [ ] **Step 1: Import `OpportunityType` and update the prop type**

In `apps/web/components/ui/opportunity-card.tsx`, add the import and change the `tags` field:

```ts
import NextLink from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { OpportunityType } from "@/lib/home-data";

export type OpportunityCardProps = {
  id: string;
  title: string;
  organization: string;
  excerpt: string;
  tags: OpportunityType[];
  href: string;
};
```

No changes to the component body (`OpportunityCard` function) — it already renders `tags` generically.

- [ ] **Step 2: Run typecheck**

Run: `cd apps/web && pnpm typecheck`
Expected: Errors now only in `opportunity-card.stories.tsx` (invalid tag strings) and `opportunities-preview.tsx` (still passing `JobCard`-shaped data) — `opportunity-card.tsx` itself is clean.

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/ui/opportunity-card.tsx
git commit -m "feat(opportunity-card): constrain tags prop to OpportunityType"
```

---

### Task 3: Fix `OpportunitiesPreview` to render `OpportunityCard`

**Files:**
- Modify: `apps/web/components/home/opportunities-preview.tsx`

**Interfaces:**
- Consumes: `OpportunityCard` / `OpportunityCardProps` from `@/components/ui/opportunity-card` (Task 2), `OpportunityData` from `@/lib/home-data` (Task 1)

- [ ] **Step 1: Swap the `JobCard` import/usage for `OpportunityCard`**

Replace the full contents of `apps/web/components/home/opportunities-preview.tsx` with:

```tsx
import NextLink from "next/link";
import { OpportunityCard } from "@/components/ui/opportunity-card";
import { buttonVariants } from "@/components/ui/button";
import type { OpportunityData } from "@/lib/home-data";

type OpportunitiesPreviewProps = {
  opportunities: OpportunityData[];
};

export function OpportunitiesPreview({ opportunities }: OpportunitiesPreviewProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-h4 font-semibold text-teal">Opportunities</h2>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {opportunities.map((opp) => (
            <OpportunityCard key={opp.id} {...opp} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <NextLink
            href="/opportunities"
            className={buttonVariants({ variant: "ghost", size: "sm" }) + " text-teal-light hover:bg-teal-light/10 focus-visible:outline-teal-light"}
          >
            More Opportunities
          </NextLink>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run typecheck**

Run: `cd apps/web && pnpm typecheck`
Expected: Errors now only in `opportunity-card.stories.tsx` (Task 4 not yet done). `opportunities-preview.tsx` and `home-data.ts` are clean.

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/home/opportunities-preview.tsx
git commit -m "fix(home): render opportunities with OpportunityCard instead of JobCard"
```

---

### Task 4: Fix invalid tag values in `OpportunityCard` stories

**Files:**
- Modify: `apps/web/components/ui/opportunity-card.stories.tsx`

**Interfaces:**
- Consumes: `OpportunityCardProps` (Task 2), `OpportunityType` values

- [ ] **Step 1: Replace invalid tags with valid `OpportunityType` values**

Replace the full contents of `apps/web/components/ui/opportunity-card.stories.tsx` with:

```tsx
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
    tags: ["Mobility"],
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
    tags: ["Grant"],
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
        tags={["Event", "Networking & Exchanges"]}
        href="#"
      />
      <OpportunityCard
        id="2"
        title="Digital Marketer"
        organization="Slack"
        excerpt="Are you an Email Marketing Specialist and are looking to join a team as an Email Marketing Specialist and lead our digital marketing."
        tags={["Training"]}
        href="#"
      />
    </div>
  ),
};
```

- [ ] **Step 2: Run typecheck and lint**

Run: `cd apps/web && pnpm typecheck && pnpm lint`
Expected: No errors anywhere in the four modified files.

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/ui/opportunity-card.stories.tsx
git commit -m "fix(opportunity-card): use valid OpportunityType values in stories"
```

---

### Task 5: Visual verification

**Files:** None (verification only)

- [ ] **Step 1: Start Storybook and check `OpportunityCard` stories render correctly**

Run: `cd apps/web && pnpm storybook`

Open the `UI/OpportunityCard` stories (`Default`, `Grant`, `Stack`) in the browser. Confirm each renders its tag badges with the new values (`Mobility`, `Grant`, `Event`/`Networking & Exchanges`, `Training`) and no console errors.

- [ ] **Step 2: Start the dev server and check the homepage Opportunities section**

Run: `cd apps/web && pnpm dev`

Navigate to `/` and confirm the "Opportunities" section now renders cards with tag badges (e.g. "Grant") instead of a contract-type badge (e.g. "Full Time"). Use chrome-devtools MCP to screenshot the section and inspect the console for errors.

- [ ] **Step 3: Run full verification suite**

Run: `cd apps/web && pnpm typecheck && pnpm lint && pnpm test`
Expected: All pass, no regressions (existing `page-link.test.ts` is unaffected by this change).

---

## Self-Review Notes

- **Spec coverage:** Data model (Task 1), components (Task 2), home data (Task 1 Step 2), wiring fix (Task 3), stories (Task 4) — all spec sections have a corresponding task. Out-of-scope items (Payload collections, Job Board/Opportunities pages, JobCard) are untouched, consistent with the spec.
- **Type consistency:** `OpportunityType` is defined once in Task 1 and imported (not redefined) in Tasks 2 and 4. `OpportunityData`/`OpportunityCardProps` field names (`id`, `title`, `organization`, `excerpt`, `tags`, `href`) match exactly across Tasks 1-3.
- **No placeholders:** every step shows the literal code to write.
