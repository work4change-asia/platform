# ADR-0006: Content Type Architecture

Date: 2026-05-18
Status: Accepted

## Context

The platform has two distinct public surfaces:

- **Job Board** — opportunities with an employment/engagement relationship (jobs, internships, fellowships, traineeships, volunteering, consultancies, civic service)
- **Opportunities Page** — everything else (grants, events, news, calls for proposals, training programs)

These surfaces have different schemas, different filter systems, and different user intent. The question was how to model this in the database and CMS.

## Decision

**Separate Payload collections per content type**, composed from a shared field group.

Collections: `jobs`, `grants`, `events`, `news`
Shared fields: `title`, `description`, `organization`, `thematic_areas`, `country`, `apply_url`, `deadline`, `status`, `search_vector`
Job-specific fields: `work_modality`, `contract_type`, `salary_range`
Grant-specific fields: `funding_amount`, `eligibility`, `grant_type`
Event-specific fields: `event_date`, `event_format`, `registration_url`

## Reasoning

- Each collection gets its own clean schema — no nullable columns that only apply to some types
- Admin UX is clear: separate sections for jobs, grants, events, news
- Filter systems are decoupled: Job Board has 5 filters; Opportunities Page has a simpler set
- Shared field group defined once in code, spread into each collection — single place to update common fields
- Separate Postgres tables per collection — queries are clean, indexes are targeted

## Alternatives rejected

**Single `opportunities` table with a `type` discriminator**

- Simpler initial setup
- Becomes a wide table with many nullable columns as content types diverge
- Filter queries become complex (type-conditional field availability)
- Admin UX requires conditional field visibility
- Rejected

**Single table + JSONB for type-specific metadata**

- Flexible but loses type safety on the variable fields
- Harder to query and index efficiently
- Rejected

## Content type clarifications

Fellowships and traineeships belong to the **Job Board**, not the Opportunities Page — they represent engagement relationships. This was an explicit decision made during design.
