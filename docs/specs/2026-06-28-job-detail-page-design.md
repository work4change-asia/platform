# Job Detail Page — Design Spec

**Date:** 2026-06-28
**Branch:** `feat/job-detail-page`
**Goal:** Implement the job detail page with mock data to test UX end-to-end before wiring real data.

## Scope

In scope:
- Route `/job-board/[slug]` rendering a full job detail page
- Mock data for one or two representative jobs
- Four new reusable UI components (each with a Storybook story)
- Static/non-functional: Apply Now button (disabled), bookmark icon, social share row

Out of scope for this pass:
- Similar Jobs section
- Top Companies section
- Join Us / email signup CTA
- Real Payload CMS data
- Apply Now flow
- Bookmark / save to profile
- Social sharing

## URL Pattern

`/job-board/[id]-[slug]` — e.g. `/job-board/1-product-designer-google`.

The Next.js route segment is `[slug]` (the full string including the id prefix). The page extracts the id by splitting on `-` and taking the first token, then looks it up in the mock data map. If no match, calls `notFound()`.

This matches the pattern already defined in CLAUDE.md and already used in `home-data.ts` `href` fields.

## Data Layer

**New file:** `apps/web/lib/job-detail-data.ts`

Defines `JobDetail` type extending `JobCardData` (from `home-data.ts`) with:

```ts
type JobDetail = JobCardData & {
  descriptionBody: string;        // prose paragraphs (plain text, newlines for paragraphs)
  responsibilities: string[];     // bullet list
  workMode: string;               // e.g. "Remote (global)"
  experience: string;             // e.g. "3-5 Years"
  language: string;               // e.g. "English"
  timeCommitment: string;         // e.g. "Full-time"
  sector: string;                 // e.g. "Digital Communications"
  isInternationalContract: boolean;
  founded: string;                // e.g. "March 21, 2006"
  orgType: string;                // e.g. "International Organisation"
  companySize: string;            // e.g. "120-300 Employers"
  website: string;                // e.g. "https://google.com"
  orgTagline: string;             // e.g. "Social networking service"
};
```

Exports:
- `jobDetails: JobDetail[]` — array of mock entries (start with 2: one for Google/Product Designer, one for UNDP/Programme Officer)
- `jobDetailsBySlug: Record<string, JobDetail>` — map keyed by full slug string (e.g. `"1-product-designer-google"`)

## Route

**File:** `apps/web/app/(frontend)/job-board/[slug]/page.tsx`

Server component. Logic:
1. Extract `params.slug`
2. Look up in `jobDetailsBySlug`
3. If not found: `notFound()`
4. Render page layout

No `generateStaticParams` needed at mock stage.

## Page Layout

Top to bottom:

### 1. Hero Banner
Reuses `BubblePanel` directly — no new component.

```tsx
<BubblePanel
  variant="teal"
  shape="standard"
  className="py-16 text-center"
  media={<img src="/images/worldmap.svg" aria-hidden className="..." />}
>
  <h1 className="text-h3 font-semibold text-cream">Job Details</h1>
</BubblePanel>
```

### 2. Breadcrumb
Inline — no new component. Uses existing `Link`.

`Home / Find Job / Job Details`

### 3. Company Header
Component: `CompanyHeader`

Contains:
- Org logo placeholder (colored circle with org initial, 56×56px)
- Org name (small, muted) + Job title (large, semibold) stacked
- Right side: static `HeartIcon` (bookmark, non-functional) + disabled "Apply Now" `Button`

### 4. Two-Column Body
Desktop: ~60/40 split. Mobile: stacked (description first, sidebar second).

**Left column:**
- `JobDescription` — prose paragraphs + "Responsibilities" subheading + bulleted list + social share row (static Facebook / Twitter / Pinterest icon links, `cursor-default pointer-events-none`)

**Right column (sticky on desktop):**
- `JobOverviewCard`
- `CompanyInfoCard`

## New Components

All live in `components/job-detail/`. Each ships with a `.stories.tsx` written first.

---

### `CompanyHeader`

Props:
```ts
type CompanyHeaderProps = {
  orgName: string;
  orgInitial: string;        // first letter for the logo placeholder
  jobTitle: string;
};
```

Apply Now button: `<Button disabled>Apply Now</Button>` — no `href`, no `onClick`.
Bookmark: `<HeartIcon />` wrapped in a `<span>` with `aria-label="Save job"`, no interaction.

Stories: default state, long org name wrapping.

---

### `JobOverviewCard`

Props:
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
```

Renders a white card with `shadow-card rounded-card` containing an 8-cell icon+label grid (2 columns × 4 rows). Each cell: icon on top, label below. Uses existing icons: `LocationIcon`, `GlobeIcon`, `ExperienceIcon`, `LanguageIcon`, `BriefcaseIcon`, `TimeCommitmentIcon`, `AreaIcon`, `BuildingIcon`.

Stories: fully populated, missing optional fields.

---

### `CompanyInfoCard`

Props:
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
```

Renders a white card with the org logo placeholder, name, tagline, and a small 4-row definition list (founded / org type / company size / website). Website renders as an external `Link`. Includes a dead "Other job openings" link at the bottom (`pointer-events-none`).

Stories: with website, long org name.

---

### `JobDescription`

Props:
```ts
type JobDescriptionProps = {
  descriptionBody: string;        // newline-separated paragraphs
  responsibilities: string[];
};
```

Renders:
- "Job Description" heading
- Prose (split on `\n`, render each as `<p>`)
- "Responsibilities" subheading
- `<ul>` with `<li>` per item
- Social share row: "Share this:" label + three icon links (Facebook, Twitter, Pinterest) — all `pointer-events-none cursor-default aria-hidden`

Stories: short description, long description with many responsibilities.

## Build Order

For each component: **story first, then component, then verify in Storybook** before wiring into the page.

1. `job-detail-data.ts` — mock data
2. `JobOverviewCard` + story
3. `CompanyInfoCard` + story
4. `CompanyHeader` + story
5. `JobDescription` + story
6. Route page — assemble components
7. Storybook smoke check on all new stories
8. Browser check: click a job card from the homepage carousel, confirm the detail page renders
