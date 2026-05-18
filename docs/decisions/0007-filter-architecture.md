# ADR-0007: Filter and Search Architecture

Date: 2026-05-18
Status: Accepted

## Context

The Job Board has a 5-filter system (keyword, work modality, contract type, thematic area, country) described as a "dynamic display" where results update in near real-time as filters change, without a separate search trigger.

## Decision

- **Filter state in URL query params** — not component-local state
- **Server-side filtering** — query Postgres on each filter change, not client-side in-memory filtering
- **`useTransition`** (React 18) — keeps filter controls interactive while server fetch is in progress
- **Postgres full-text search** — `tsvector` computed column with GIN index for keyword search
- **Array overlap operator** (`&&`) with GIN-indexed `text[]` column for thematic area multi-select
- **Debounced keyword input** (300ms), immediate response on select changes

## Reasoning

**URL params as state:** filter selections are shareable URLs, crawlable by search engines, and survive browser back/forward navigation. Filtered results are indexable — a user searching "fellowship Singapore climate" can land directly on a pre-filtered page.

**Server-side filtering:** loading all opportunities client-side does not scale. At 100+ new listings per week the dataset grows to thousands within months. Server-side filtering works at any volume and keeps the initial page load fast.

**`useTransition`:** marks the filter state update as non-urgent. Old results stay visible while new results load — no blank states, no layout shifts. Spinner only appears if the fetch takes longer than a threshold.

**Postgres FTS over external search:** at the expected volume (thousands of records), Postgres `tsvector` + GIN index is fast enough and eliminates an external service dependency. Revisit with Meilisearch or pgvector if semantic search becomes a requirement.

## Thematic Area UI note

34 options cannot be presented as a flat checkbox list within the "no vertical scroll" constraint. A searchable combobox (shadcn/ui `Combobox` on Radix) is required. Same applies to Country (100+ options).

## Filter query pattern

```sql
SELECT * FROM jobs
WHERE status = 'published'
  AND (deadline IS NULL OR deadline >= NOW())
  AND ($keyword  IS NULL OR search_vector @@ plainto_tsquery($keyword))
  AND ($modality IS NULL OR work_modality = ANY($modality::text[]))
  AND ($contract IS NULL OR contract_type = ANY($contract::text[]))
  AND ($areas    IS NULL OR thematic_areas && $areas::text[])
  AND ($country  IS NULL OR country = ANY($country::text[]))
ORDER BY created_at DESC
LIMIT 20 OFFSET $cursor
```
