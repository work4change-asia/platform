# Featured Roles carousel (job board)

## Problem

The job board page needs a "Featured Roles" section, shown directly under the results toolbar (below the results count), showcasing featured jobs on a light grey background (`bg-gray-100`, the same token the results toolbar's view-toggle uses). A carousel already exists for this purpose on the home page (`FeaturedJobs`), but its carousel mechanics are inline in that component rather than reusable.

## Approach

### 1. Extract `JobCarousel`

New file: `apps/web/components/ui/job-carousel.tsx`.

Pulls the carousel mechanics out of the home page's `FeaturedJobs` component:

- Resize-observer-driven container width tracking
- Card width / step-px math (peek + gap)
- Prev/next arrow buttons with disabled-at-ends state
- Sliding track (`translateX` transition)

Props: `{ jobs: JobCardData[]; featured?: boolean }`. Renders `JobCard` per job, passing `featured` through to each card — variant is a presentation choice made by the caller, not data on `JobCardData`. Nothing about background, heading, or CTAs lives here. `JobCarousel` itself has no breakpoint logic — whether it's shown at all sizes or only below a breakpoint is entirely up to the caller (see below).

Accessibility, since this becomes the shared primitive:

- An `aria-live="polite"` region announces the current slide (e.g. "Slide 2 of 5") on change, for screen reader users.
- The sliding `translateX` transition respects `prefers-reduced-motion` (e.g. via Tailwind's `motion-reduce:transition-none`), so it becomes an instant jump instead of an animated slide for users who've opted out of motion.
- Touch/swipe drag on mobile is explicitly deferred — v1 stays button-driven only, matching current behavior. Not a regression, just not addressed in this pass.

### 2. Rename `FeaturedJobs` → `FreshFromTheField`

- `apps/web/components/home/featured-jobs.tsx` → `apps/web/components/home/fresh-from-the-field.tsx`
- Component renamed `FeaturedJobs` → `FreshFromTheField`
- Keeps its existing cream background, eyebrow ("Start Here, Find Purpose"), "Fresh from the Field" heading, and CTA buttons ("See All Jobs", "Share An Opening")
- Keeps its existing responsive split exactly as today: `JobCarousel` renders only below the `sm` breakpoint (mobile), the existing desktop static grid (`sm:grid sm:grid-cols-[repeat(auto-fill,18rem)]`) is unchanged and still kicks in at `sm:` and up. Extraction must not change what desktop users see.
- Update import/usage in `apps/web/app/(frontend)/page.tsx`

### 3. New `FeaturedRoles` section

New file: `apps/web/components/job-board/featured-roles.tsx`.

- Light grey background (`bg-gray-100`), heading in `text-teal` to read against it
- "FEATURED ROLES" heading, no eyebrow/subtext
- Wraps `JobCarousel` with `featured` set, fed the same mock `featuredJobs` data from `apps/web/lib/home-data.ts` (same data source as the home page, since the job board's real results grid is still out of scope)
- Always a carousel, at every breakpoint — no desktop grid fallback here (unlike `FreshFromTheField`)
- Rendered in `apps/web/app/(frontend)/job-board/page.tsx`, directly under `JobResultsToolbar`

## Storybook

- Add a story for `JobCarousel` (the reusable primitive) — this is the piece meant for reuse.
- No new stories for `FreshFromTheField` or `FeaturedRoles`: both are thin composition wrappers around already-storied pieces (`JobCard`, `JobCarousel`) with page-specific copy and background only. A story there would just re-exercise the primitive.

## Out of scope

- Real featured-jobs data fetching (still mock data, matching the rest of the job board page's current placeholder state)
- Job board results grid itself
