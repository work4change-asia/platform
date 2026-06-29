# Job Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Build the `/job-board/[slug]` route with four new reusable components and mock data so UX can be reviewed end-to-end.

**Architecture:** A server-side Next.js page looks up a slug in a static mock map, returns `notFound()` on miss, and assembles four new components from `components/job-detail/` alongside the existing `BubblePanel`. Each component is defined by its Storybook story before implementation.

**Tech Stack:** Next.js 15 App Router (server components), Tailwind CSS, shadcn/ui primitives already in the codebase, Storybook with `@storybook/nextjs-vite`, Vitest, pnpm workspaces.

## Global Constraints

- TypeScript strict mode — no `any`, no `as Foo`, no `!`, no `@ts-ignore`
- All new components are server components (no `"use client"`) unless they use React state or browser APIs
- Tailwind only — no inline `style=` except where the existing `BubblePanel` pattern requires it
- Imports use the `@/` alias for anything outside the current directory
- Stories use `import type { Meta, StoryObj } from "@storybook/nextjs-vite"`
- `pnpm typecheck` must pass after every commit
- Story first, then component, then Storybook visual verify, then commit

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `apps/web/lib/job-detail-data.ts` | `JobDetail` type + two mock entries + slug map |
| Create | `apps/web/components/job-detail/job-overview-card.tsx` | 8-cell icon+label grid card |
| Create | `apps/web/components/job-detail/job-overview-card.stories.tsx` | Storybook stories for JobOverviewCard |
| Create | `apps/web/components/job-detail/company-info-card.tsx` | Org details card (founded, type, size, website) |
| Create | `apps/web/components/job-detail/company-info-card.stories.tsx` | Storybook stories for CompanyInfoCard |
| Create | `apps/web/components/job-detail/company-header.tsx` | Logo placeholder + title + disabled Apply Now |
| Create | `apps/web/components/job-detail/company-header.stories.tsx` | Storybook stories for CompanyHeader |
| Create | `apps/web/components/job-detail/job-description.tsx` | Prose + responsibilities list + static share row |
| Create | `apps/web/components/job-detail/job-description.stories.tsx` | Storybook stories for JobDescription |
| Create | `apps/web/app/(frontend)/job-board/[slug]/page.tsx` | Route page — assembles all components |

---

## Task 1: Mock data layer

**Files:**
- Create: `apps/web/lib/job-detail-data.ts`

**Interfaces:**
- Consumes: `JobCardData` from `@/lib/home-data`
- Produces:
  - `type JobDetail` — extended type used by all four components and the page
  - `jobDetailsBySlug: Record<string, JobDetail>` — keyed by full slug string (e.g. `"1-product-designer-google"`)

- [x] **Step 1: Create the data file**

```ts
// apps/web/lib/job-detail-data.ts
import type { JobCardData } from "@/lib/home-data";

export type JobDetail = JobCardData & {
  descriptionBody: string;
  responsibilities: string[];
  workMode: string;
  experience: string;
  language: string;
  timeCommitment: string;
  sector: string;
  isInternationalContract: boolean;
  orgTagline: string;
  founded: string;
  orgType: string;
  companySize: string;
  website: string;
};

const jobDetails: JobDetail[] = [
  {
    id: "1",
    title: "Product Designer",
    organization: "Google Inc",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Seoul, South Korea",
    description:
      "Join our team as a Product Designer and help shape the future of digital experiences for millions of users across Asia.",
    postedAt: "2h ago",
    href: "/job-board/1-product-designer-google",
    descriptionBody:
      "We are looking for a Senior UX Designer to join our growing team. In this role you will work closely with product managers and engineers to define, design, and ship experiences used by millions.\n\nYou will conduct user research, create wireframes and prototypes, and iterate based on feedback. You will champion the user throughout the product development process and help establish design standards across the organisation.",
    responsibilities: [
      "Quisque semper gravida est et consectetur.",
      "Curabitur blandit lorem velit, vitae pretium leo placerat eget.",
      "Morbi mattis in ipsum ac tempus.",
      "Vestibulum sed purus ullamcorper, lobortis lectus nec.",
      "Vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.",
      "Lobortis vel lectus. Nulla at risus ut diam.",
      "Commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.",
      "Odio metus posuere libero, id condimentum erat velit nec neque.",
      "Ut sodales ut. Curabitur tempus augue.",
    ],
    workMode: "Remote (global)",
    experience: "3-5 Years",
    language: "English",
    timeCommitment: "Full-time",
    sector: "Digital Communications",
    isInternationalContract: true,
    orgTagline: "Social networking service",
    founded: "March 21, 2006",
    orgType: "International Organisation",
    companySize: "120-300 Employers",
    website: "https://google.com",
  },
  {
    id: "9",
    title: "Programme Officer",
    organization: "UNDP Asia",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Bangkok, Thailand",
    description:
      "Support sustainable development programmes across Asia, working with governments and civil society to advance the SDGs.",
    postedAt: "4d ago",
    href: "/job-board/9-programme-officer-undp",
    descriptionBody:
      "The Programme Officer will support the design, implementation, and monitoring of development programmes across the Asia-Pacific region. The role involves coordinating with government counterparts, civil society, and donor partners to ensure effective delivery of results.\n\nThe ideal candidate has experience in international development, strong analytical skills, and the ability to work in a multicultural environment.",
    responsibilities: [
      "Coordinate programme planning and implementation activities.",
      "Prepare reports, briefs, and communications for donors and stakeholders.",
      "Monitor programme budgets and expenditures.",
      "Facilitate workshops and training sessions with partners.",
      "Conduct field visits to programme sites across the region.",
    ],
    workMode: "On-site",
    experience: "5+ Years",
    language: "English, Thai (preferred)",
    timeCommitment: "Full-time",
    sector: "International Development",
    isInternationalContract: true,
    orgTagline: "United Nations Development Programme",
    founded: "January 1, 1966",
    orgType: "United Nations Agency",
    companySize: "8,000+ Staff",
    website: "https://asia.undp.org",
  },
];

export const jobDetailsBySlug: Record<string, JobDetail> = Object.fromEntries(
  jobDetails.map((job) => {
    const slug = job.href.replace("/job-board/", "");
    return [slug, job];
  }),
);
```

- [x] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [x] **Step 3: Commit**

```bash
git add apps/web/lib/job-detail-data.ts
git commit -m "feat(job-detail): add mock data layer"
```

---

## Task 2: JobOverviewCard component

**Files:**
- Create: `apps/web/components/job-detail/job-overview-card.stories.tsx`
- Create: `apps/web/components/job-detail/job-overview-card.tsx`

**Interfaces:**
- Consumes: icons from `@/components/ui/icons`
- Produces:
  ```ts
  type JobOverviewCardProps = {
    location: string;
    workMode: string;
    experience: string;
    language: string;
    contractLabel: string;
    timeCommitment: string;
    sector: string;
    isInternationalContract: boolean;
  };
  export function JobOverviewCard(props: JobOverviewCardProps): JSX.Element
  ```

- [x] **Step 1: Write the story first**

```tsx
// apps/web/components/job-detail/job-overview-card.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JobOverviewCard } from "./job-overview-card";

const meta = {
  title: "JobDetail/JobOverviewCard",
  component: JobOverviewCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof JobOverviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    location: "Seoul, South Korea",
    workMode: "Remote (global)",
    experience: "3-5 Years",
    language: "English",
    contractLabel: "Permanent FT",
    timeCommitment: "Full-time",
    sector: "Digital Communications",
    isInternationalContract: true,
  },
};

export const LocalContract: Story = {
  args: {
    location: "Bangkok, Thailand",
    workMode: "On-site",
    experience: "5+ Years",
    language: "English, Thai",
    contractLabel: "Full Time",
    timeCommitment: "Full-time",
    sector: "International Development",
    isInternationalContract: false,
  },
};
```

- [x] **Step 2: Implement the component**

```tsx
// apps/web/components/job-detail/job-overview-card.tsx
import {
  LocationIcon,
  GlobeIcon,
  ExperienceIcon,
  LanguageIcon,
  BriefcaseIcon,
  TimeCommitmentIcon,
  AreaIcon,
  BuildingIcon,
} from "@/components/ui/icons";

export type JobOverviewCardProps = {
  location: string;
  workMode: string;
  experience: string;
  language: string;
  contractLabel: string;
  timeCommitment: string;
  sector: string;
  isInternationalContract: boolean;
};

type CellProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function Cell({ icon, label, value }: CellProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-teal">{icon}</span>
      <span className="text-xs text-pale-blue">{label}</span>
      <span className="text-sm font-medium text-gray-text">{value}</span>
    </div>
  );
}

export function JobOverviewCard({
  location,
  workMode,
  experience,
  language,
  contractLabel,
  timeCommitment,
  sector,
  isInternationalContract,
}: JobOverviewCardProps) {
  return (
    <div className="rounded-card bg-white p-6 shadow-card">
      <h2 className="mb-6 text-base font-semibold text-gray-text">Job Overview</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <Cell icon={<LocationIcon size={20} />} label="Location" value={location} />
        <Cell icon={<GlobeIcon size={20} />} label="Work Mode" value={workMode} />
        <Cell icon={<ExperienceIcon size={20} />} label="Experience" value={experience} />
        <Cell icon={<LanguageIcon size={20} />} label="Language" value={language} />
        <Cell icon={<BriefcaseIcon size={20} />} label="Contract Type" value={contractLabel} />
        <Cell icon={<TimeCommitmentIcon size={20} />} label="Time Commitment" value={timeCommitment} />
        <Cell icon={<AreaIcon size={20} />} label="Sector" value={sector} />
        <Cell
          icon={<BuildingIcon size={20} />}
          label="International Contract"
          value={isInternationalContract ? "Yes" : "No"}
        />
      </div>
    </div>
  );
}
```

- [x] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [x] **Step 4: Verify in Storybook**

```bash
pnpm storybook
```

Open `http://localhost:6006` and navigate to **JobDetail / JobOverviewCard**. Check:
- Default story: 8 cells render in a 2-column grid, icons are teal, labels are muted, values are bold
- LocalContract story: International Contract cell shows "No"

- [x] **Step 5: Commit**

```bash
git add apps/web/components/job-detail/job-overview-card.tsx apps/web/components/job-detail/job-overview-card.stories.tsx
git commit -m "feat(job-detail): add JobOverviewCard component and story"
```

---

## Task 3: CompanyInfoCard component

**Files:**
- Create: `apps/web/components/job-detail/company-info-card.stories.tsx`
- Create: `apps/web/components/job-detail/company-info-card.tsx`

**Interfaces:**
- Consumes: `Link` from `@/components/ui/link`
- Produces:
  ```ts
  type CompanyInfoCardProps = {
    orgName: string;
    orgInitial: string;
    orgTagline: string;
    founded: string;
    orgType: string;
    companySize: string;
    website: string;
  };
  export function CompanyInfoCard(props: CompanyInfoCardProps): JSX.Element
  ```

- [x] **Step 1: Write the story first**

```tsx
// apps/web/components/job-detail/company-info-card.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyInfoCard } from "./company-info-card";

const meta = {
  title: "JobDetail/CompanyInfoCard",
  component: CompanyInfoCard,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CompanyInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orgName: "Google Inc",
    orgInitial: "G",
    orgTagline: "Social networking service",
    founded: "March 21, 2006",
    orgType: "International Organisation",
    companySize: "120-300 Employers",
    website: "https://google.com",
  },
};

export const LongName: Story = {
  args: {
    orgName: "United Nations Development Programme Asia",
    orgInitial: "U",
    orgTagline: "United Nations Development Programme",
    founded: "January 1, 1966",
    orgType: "United Nations Agency",
    companySize: "8,000+ Staff",
    website: "https://asia.undp.org",
  },
};
```

- [x] **Step 2: Implement the component**

```tsx
// apps/web/components/job-detail/company-info-card.tsx
import { Link } from "@/components/ui/link";

export type CompanyInfoCardProps = {
  orgName: string;
  orgInitial: string;
  orgTagline: string;
  founded: string;
  orgType: string;
  companySize: string;
  website: string;
};

type InfoRowProps = { label: string; value: React.ReactNode };

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 text-sm">
      <span className="text-pale-blue">{label}</span>
      <span className="text-right font-medium text-gray-text">{value}</span>
    </div>
  );
}

export function CompanyInfoCard({
  orgName,
  orgInitial,
  orgTagline,
  founded,
  orgType,
  companySize,
  website,
}: CompanyInfoCardProps) {
  return (
    <div className="rounded-card bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-muted text-base font-bold text-teal">
          {orgInitial}
        </div>
        <div>
          <p className="font-semibold text-gray-text">{orgName}</p>
          <p className="text-xs text-pale-blue">{orgTagline}</p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        <InfoRow label="Founded in" value={founded} />
        <InfoRow label="Organisation type" value={orgType} />
        <InfoRow label="Company size" value={companySize} />
        <InfoRow
          label="Website"
          value={
            <Link href={website} variant="default" target="_blank" rel="noopener noreferrer">
              {website.replace(/^https?:\/\//, "")}
            </Link>
          }
        />
      </div>

      <div className="mt-4">
        <span className="cursor-default text-sm text-pale-blue">
          Other job openings &rarr;
        </span>
      </div>
    </div>
  );
}
```

- [x] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [x] **Step 4: Verify in Storybook**

Navigate to **JobDetail / CompanyInfoCard**. Check:
- Default story: logo circle shows "G", four info rows render with correct label/value alignment, website is a clickable link
- LongName story: long org name wraps cleanly inside the card

- [x] **Step 5: Commit**

```bash
git add apps/web/components/job-detail/company-info-card.tsx apps/web/components/job-detail/company-info-card.stories.tsx
git commit -m "feat(job-detail): add CompanyInfoCard component and story"
```

---

## Task 4: CompanyHeader component

**Files:**
- Create: `apps/web/components/job-detail/company-header.stories.tsx`
- Create: `apps/web/components/job-detail/company-header.tsx`

**Interfaces:**
- Consumes: `Button` from `@/components/ui/button`, `HeartIcon` from `@/components/ui/icons`
- Produces:
  ```ts
  type CompanyHeaderProps = {
    orgName: string;
    orgInitial: string;
    jobTitle: string;
  };
  export function CompanyHeader(props: CompanyHeaderProps): JSX.Element
  ```

- [x] **Step 1: Write the story first**

```tsx
// apps/web/components/job-detail/company-header.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyHeader } from "./company-header";

const meta = {
  title: "JobDetail/CompanyHeader",
  component: CompanyHeader,
  parameters: { layout: "padded" },
} satisfies Meta<typeof CompanyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orgName: "Google Inc",
    orgInitial: "G",
    jobTitle: "Senior UX Designer",
  },
};

export const LongTitle: Story = {
  args: {
    orgName: "United Nations Development Programme Asia",
    orgInitial: "U",
    jobTitle: "Senior Programme Officer – Governance and Rule of Law",
  },
};
```

- [x] **Step 2: Implement the component**

```tsx
// apps/web/components/job-detail/company-header.tsx
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/ui/icons";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export type CompanyHeaderProps = {
  orgName: string;
  orgInitial: string;
  jobTitle: string;
};

export function CompanyHeader({ orgName, orgInitial, jobTitle }: CompanyHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-muted text-lg font-bold text-teal">
          {orgInitial}
        </div>
        <div>
          <p className="text-sm text-pale-blue">{orgName}</p>
          <h2 className="text-xl font-semibold text-gray-text">{jobTitle}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span aria-label="Save job" className="flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-gray-200 text-pale-blue">
          <HeartIcon size={18} />
        </span>
        <Button
          variant="primary"
          size="sm"
          disabled
          rightIcon={<ArrowUpRightIcon size={16} />}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}
```

- [x] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [x] **Step 4: Verify in Storybook**

Navigate to **JobDetail / CompanyHeader**. Check:
- Default story: logo circle, org name (muted), job title (bold), bookmark icon, disabled orange Apply Now button with arrow icon
- LongTitle story: long job title wraps cleanly; actions stay right-aligned on desktop, stack below on narrow viewports

- [x] **Step 5: Commit**

```bash
git add apps/web/components/job-detail/company-header.tsx apps/web/components/job-detail/company-header.stories.tsx
git commit -m "feat(job-detail): add CompanyHeader component and story"
```

---

## Task 5: JobDescription component

**Files:**
- Create: `apps/web/components/job-detail/job-description.stories.tsx`
- Create: `apps/web/components/job-detail/job-description.tsx`

**Interfaces:**
- Consumes: nothing from the project (pure HTML + Tailwind)
- Produces:
  ```ts
  type JobDescriptionProps = {
    descriptionBody: string;   // newline-separated paragraphs
    responsibilities: string[];
  };
  export function JobDescription(props: JobDescriptionProps): JSX.Element
  ```

- [x] **Step 1: Write the story first**

```tsx
// apps/web/components/job-detail/job-description.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JobDescription } from "./job-description";

const meta = {
  title: "JobDetail/JobDescription",
  component: JobDescription,
  parameters: { layout: "padded" },
} satisfies Meta<typeof JobDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    descriptionBody:
      "We are looking for a Senior UX Designer to join our growing team. In this role you will work closely with product managers and engineers to define, design, and ship experiences used by millions.\n\nYou will conduct user research, create wireframes and prototypes, and iterate based on feedback.",
    responsibilities: [
      "Quisque semper gravida est et consectetur.",
      "Curabitur blandit lorem velit, vitae pretium leo placerat eget.",
      "Morbi mattis in ipsum ac tempus.",
      "Vulputate turpis. Quisque ante odio.",
      "Lobortis vel lectus. Nulla at risus ut diam.",
    ],
  },
};

export const ManyResponsibilities: Story = {
  args: {
    descriptionBody:
      "A longer description to verify the layout holds when both sections are tall.\n\nSecond paragraph here.",
    responsibilities: Array.from({ length: 9 }, (_, i) => `Responsibility item ${i + 1} — a longer line of text to check wrapping behaviour.`),
  },
};
```

- [x] **Step 2: Implement the component**

```tsx
// apps/web/components/job-detail/job-description.tsx
export type JobDescriptionProps = {
  descriptionBody: string;
  responsibilities: string[];
};

export function JobDescription({ descriptionBody, responsibilities }: JobDescriptionProps) {
  const paragraphs = descriptionBody.split("\n").filter(Boolean);

  return (
    <div>
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-text">Job Description</h2>
        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-pale-blue">
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-4 text-base font-semibold text-gray-text">Responsibilities</h3>
        <ul className="space-y-2">
          {responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-pale-blue">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-center gap-4">
        <span className="text-sm text-pale-blue">Share this:</span>
        <span
          aria-hidden="true"
          className="cursor-default text-sm font-medium text-[#1877F2]"
        >
          Facebook
        </span>
        <span
          aria-hidden="true"
          className="cursor-default text-sm font-medium text-[#1DA1F2]"
        >
          Twitter
        </span>
        <span
          aria-hidden="true"
          className="cursor-default text-sm font-medium text-[#E60023]"
        >
          Pinterest
        </span>
      </div>
    </div>
  );
}
```

- [x] **Step 3: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [x] **Step 4: Verify in Storybook**

Navigate to **JobDetail / JobDescription**. Check:
- Default story: description paragraphs render with spacing, responsibilities show teal bullet dots, social share labels appear but are non-interactive
- ManyResponsibilities story: long list renders cleanly with no overflow

- [x] **Step 5: Commit**

```bash
git add apps/web/components/job-detail/job-description.tsx apps/web/components/job-detail/job-description.stories.tsx
git commit -m "feat(job-detail): add JobDescription component and story"
```

---

## Task 6: Route page and browser check

**Files:**
- Create: `apps/web/app/(frontend)/job-board/[slug]/page.tsx`

**Interfaces:**
- Consumes:
  - `jobDetailsBySlug` from `@/lib/job-detail-data`
  - `BubblePanel` from `@/components/ui/bubble-panel`
  - `Link` from `@/components/ui/link`
  - `CompanyHeader` from `@/components/job-detail/company-header`
  - `JobDescription` from `@/components/job-detail/job-description`
  - `JobOverviewCard` from `@/components/job-detail/job-overview-card`
  - `CompanyInfoCard` from `@/components/job-detail/company-info-card`
- Produces: the rendered `/job-board/[slug]` page

- [x] **Step 1: Create the route page**

```tsx
// apps/web/app/(frontend)/job-board/[slug]/page.tsx
import { notFound } from "next/navigation";
import { jobDetailsBySlug } from "@/lib/job-detail-data";
import { BubblePanel } from "@/components/ui/bubble-panel";
import { Link } from "@/components/ui/link";
import { CompanyHeader } from "@/components/job-detail/company-header";
import { JobDescription } from "@/components/job-detail/job-description";
import { JobOverviewCard } from "@/components/job-detail/job-overview-card";
import { CompanyInfoCard } from "@/components/job-detail/company-info-card";

type Props = { params: Promise<{ slug: string }> };

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobDetailsBySlug[slug];
  if (!job) notFound();

  const orgInitial = job.organization[0] ?? "O";

  return (
    <>
      <BubblePanel
        variant="teal"
        shape="standard"
        className="flex items-center justify-center py-16"
        media={
          <img
            src="/images/worldmap.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain object-right opacity-60"
          />
        }
      >
        <h1 className="text-h3 font-semibold text-cream">Job Details</h1>
      </BubblePanel>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" variant="muted">Home</Link>
            </li>
            <li aria-hidden className="text-pale-blue">/</li>
            <li>
              <Link href="/job-board" variant="muted">Find Job</Link>
            </li>
            <li aria-hidden className="text-pale-blue">/</li>
            <li className="font-medium text-gray-text">Job Details</li>
          </ol>
        </nav>

        <CompanyHeader
          orgName={job.organization}
          orgInitial={orgInitial}
          jobTitle={job.title}
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
          <JobDescription
            descriptionBody={job.descriptionBody}
            responsibilities={job.responsibilities}
          />
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <JobOverviewCard
              location={job.location}
              workMode={job.workMode}
              experience={job.experience}
              language={job.language}
              contractLabel={job.contractLabel}
              timeCommitment={job.timeCommitment}
              sector={job.sector}
              isInternationalContract={job.isInternationalContract}
            />
            <CompanyInfoCard
              orgName={job.organization}
              orgInitial={orgInitial}
              orgTagline={job.orgTagline}
              founded={job.founded}
              orgType={job.orgType}
              companySize={job.companySize}
              website={job.website}
            />
          </div>
        </div>
      </div>
    </>
  );
}
```

- [x] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: no errors.

- [x] **Step 3: Start the dev server**

```bash
pnpm dev
```

- [x] **Step 4: Browser check via Chrome DevTools**

Navigate to `http://localhost:3000`. Click a job card from the Featured Jobs carousel (e.g. "Product Designer" → Google Inc). Confirm:
- The URL changes to `/job-board/1-product-designer-google`
- The teal bubble panel hero renders with "Job Details" heading
- The breadcrumb shows Home / Find Job / Job Details
- The company header shows the "G" circle, "Google Inc", "Product Designer", and a disabled Apply Now button
- The two-column layout renders on desktop: description left, sidebar cards right
- On mobile width, the columns stack vertically

Also navigate directly to `http://localhost:3000/job-board/9-programme-officer-undp` to verify the second mock entry works.

Navigate to `http://localhost:3000/job-board/nonexistent-slug` and confirm a 404 page is shown.

- [x] **Step 5: Commit**

```bash
git add apps/web/app/(frontend)/job-board/[slug]/page.tsx
git commit -m "feat(job-detail): add job detail route page"
```
