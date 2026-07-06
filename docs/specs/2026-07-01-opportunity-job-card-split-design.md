# Opportunity/Job card data model split

## Problem

`OpportunityData` is currently just a type alias for `JobCardData`:

```ts
export type OpportunityData = JobCardData;
```

Because the types are identical, `OpportunitiesPreview` compiles fine while rendering opportunities through `JobCard` (`apps/web/components/home/opportunities-preview.tsx`) instead of the already-existing `OpportunityCard` (`apps/web/components/ui/opportunity-card.tsx`). This means opportunities show a job-shaped badge (`contractType`/`contractLabel`, e.g. "Full Time") instead of their own type tags.

Separately, `OpportunityCard`'s `tags: string[]` is unconstrained. The current stories and home data use ad hoc values ("New", "Open") that don't correspond to any real opportunity type.

Opportunities are jobs, grants, events, news, etc. — they don't have a `contractType`. They need their own type list: Event, Grant, News, Mobility, Publication, Research & Academia, Networking & Exchanges, Training.

## Scope

Frontend/component layer only (`apps/web/lib/home-data.ts`, `apps/web/components/ui/opportunity-card.tsx`, `apps/web/components/home/opportunities-preview.tsx`, and Storybook stories). The Payload `grants`/`events`/`news` collections are not wired to real data yet and are out of scope for this pass — no `opportunity_type` field is added there.

## Data model

Decouple `OpportunityData` from `JobCardData` entirely and introduce an `OpportunityType` union, in `apps/web/lib/home-data.ts`:

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

`OpportunityData` drops `contractType`, `contractLabel`, `location`, `postedAt`, and `description` (renamed to `excerpt`) — none of these are rendered by `OpportunityCard`. Keeping them was what allowed the type alias to mask the wrong-component bug. `JobCardData` is unchanged.

`tags` is a constrained array (not a single value) per existing product decision — an opportunity may carry more than one type tag, but every value must come from `OpportunityType`.

## Components

`apps/web/components/ui/opportunity-card.tsx`: change `OpportunityCardProps.tags` from `string[]` to `OpportunityType[]` (imported from `@/lib/home-data`). No rendering logic changes — tags are already rendered as plain badge text.

## Home data

`apps/web/lib/home-data.ts`: rewrite `featuredOpportunities` to the new `OpportunityData` shape — map `description` → `excerpt`, drop the job-specific fields, and set `tags` to real `OpportunityType` values reflecting each sample opportunity (e.g. the "CFIs Call for Proposals" entry gets `["Grant"]`).

## Wiring fix

`apps/web/components/home/opportunities-preview.tsx`: replace the `JobCard` import/usage with `OpportunityCard`. This is the actual bug fix that makes opportunities render with their own card again.

## Stories

`apps/web/components/ui/opportunity-card.stories.tsx`: replace invalid tag values (`"New"`, `"Full Time"`, `"Open"`) with values from `OpportunityType` (e.g. `["Grant"]`, `["Training"]`, `["Event", "Networking & Exchanges"]`) across the `Default`, `Grant`, and `Stack` stories.

## Out of scope

- Payload collection changes (`grants`, `events`, `news` — no `opportunity_type` field added to the CMS schema).
- Job Board / Opportunities page implementation (both are still placeholders; not touched here).
- Any change to `JobCard`, `JobCardData`, or job stories.
