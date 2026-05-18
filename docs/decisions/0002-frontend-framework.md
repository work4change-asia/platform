# ADR-0002: Frontend Framework

Date: 2026-05-18
Status: Accepted

## Context

The public-facing site needs to rank well in search results — job listings must be server-rendered HTML, not client-side JavaScript. The framework needs to be TypeScript-native and work well with Payload CMS v3.

## Decision

**Next.js App Router** (React Server Components).

## Reasoning

- Payload CMS v3 is built on Next.js App Router — they run in the same project with no additional configuration
- Server Components render full HTML for crawlers — critical for SEO on job listing pages
- `generateMetadata()` per route enables dynamic Open Graph and schema.org structured data
- ISR (Incremental Static Regeneration) for browse pages — fast + crawlable
- `useTransition` (React 18) enables smooth filter UX while fetching server-side
- Native Vercel deployment with zero configuration

## Alternatives rejected

No serious alternative was considered — Payload v3's architecture made Next.js the only practical choice that avoided running two separate services.
