# ADR-0001: CMS and Admin Approach

Date: 2026-05-18
Status: Accepted

## Context

MVP requires an admin to manage "opportunities" (job listings and other content) in a backend. The content is structured records (title, org, deadline, filters, status), not editorial pages. A future phase will allow opportunity providers to manage their own listings.

The question was whether to use a full CMS framework, a headless CMS, or build a custom admin.

## Decision

**Payload CMS v3** — built directly on Next.js App Router.

## Reasoning

- Runs inside the Next.js project (not a separate service) — one codebase, one deployment
- TypeScript-native with typed collection schemas
- Admin UI included — no custom build required for MVP
- Auth system and role-based access control included — provider/seeker accounts are addable without rearchitecting
- Draft/publish workflow built in
- PostgreSQL adapter uses Drizzle under the hood
- REST + GraphQL API auto-generated from collection schemas

The key insight: opportunities are structured data (CRUD + workflow), not editorial content. A page-tree CMS would be the wrong abstraction.

## Alternatives rejected

**Wagtail (Django/Python)**
- Page-tree oriented — wrong abstraction for list-based structured data
- Python stack, user prefers TypeScript throughout
- Rejected

**Strapi / Directus (headless CMS)**
- Separate service from the frontend — two deployments to manage
- Less TypeScript-native than Payload v3
- Rejected on operational simplicity grounds for a solo developer

**Custom admin (Django admin equivalent in Node)**
- Would require building auth, access control, file uploads, and admin UI from scratch
- Weeks of work before any application-specific feature
- Rejected

**Fully custom (no CMS)**
- Maximum control, minimum footprint
- Incompatible with solo-developer timeline
- Rejected for MVP; documented as the fallback if Payload becomes untenable

## Trade-off accepted

Payload CMS v3 has a substantial transitive dependency footprint — the opposite of dep-minimalism. Accepted because the delivered value (admin UI, auth, access control, API generation, workflow) exceeds the cost for a solo developer.

**Documented fallback:** Hono + Drizzle (already in lockfile via Payload) + lightweight custom admin. Data model stays identical; migration is days of work, not weeks.
