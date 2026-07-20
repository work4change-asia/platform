# Featured Roles carousel (job board)

## Problem

The job board page needs a "Featured Roles" section, shown directly under the results toolbar (below the results count), showcasing featured jobs on a teal background. A carousel already exists for this purpose on the home page (`FeaturedJobs`), but its carousel mechanics are inline in that component rather than reusable.

## Approach

### 1. Extract `JobCarousel`

New file: `apps/web/components/ui/job-carousel.tsx`.

Pulls the carousel mechanics out of the home page's `FeaturedJobs` component:

- Resize-observer-driven container width tracking
- Card width / step-px math (peek + gap)
- Prev/next arrow buttons with disabled-at-ends state
- Sliding track (`translateX` transition)

Props: `{ jobs: JobCardData[] }`. Renders `JobCard` per job — nothing about background, heading, or CTAs lives here. Carousel behavior applies at all breakpoints (no desktop grid fallback) — this becomes the shared default for both callers below.

### 2. Rename `FeaturedJobs` → `FreshFromTheField`

- `apps/web/components/home/featured-jobs.tsx` → `apps/web/components/home/fresh-from-the-field.tsx`
- Component renamed `FeaturedJobs` → `FreshFromTheField`
- Keeps its existing cream background, eyebrow ("Start Here, Find Purpose"), "Fresh from the Field" heading, and CTA buttons ("See All Jobs", "Share An Opening")
- Its sliding-cards rendering is delegated to `JobCarousel`; the existing desktop static-grid breakpoint is dropped in favor of the carousel at all sizes
- Update import/usage in `apps/web/app/(frontend)/page.tsx`

### 3. New `FeaturedRoles` section

New file: `apps/web/components/job-board/featured-roles.tsx`.

- Teal background
- "FEATURED ROLES" heading, no eyebrow/subtext
- Wraps `JobCarousel`, fed the same mock `featuredJobs` data from `apps/web/lib/home-data.ts` (same data source as the home page, since the job board's real results grid is still out of scope)
- All jobs rendered with the `featured` JobCard variant
- Rendered in `apps/web/app/(frontend)/job-board/page.tsx`, directly under `JobResultsToolbar`

## Storybook

- Add a story for `JobCarousel` (the reusable primitive) — this is the piece meant for reuse.
- No new stories for `FreshFromTheField` or `FeaturedRoles`: both are thin composition wrappers around already-storied pieces (`JobCard`, `JobCarousel`) with page-specific copy and background only. A story there would just re-exercise the primitive.

## Out of scope

- Real featured-jobs data fetching (still mock data, matching the rest of the job board page's current placeholder state)
- Job board results grid itself
