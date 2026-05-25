# ADR-0003: Database Provider

Date: 2026-05-18
Status: Accepted

## Context

PostgreSQL is the database (non-negotiable — needed for `tsvector` full-text search and `&&` array overlap operators for multi-select filtering). The question was where to host it.

Requirements: free or cheap to start, reliable, global availability convenient for a solo developer, no self-hosted maintenance burden for production.

## Decision

**Neon** (managed PostgreSQL, serverless).

## Reasoning

- Generous free tier: 512MB storage, 191 compute hours/month
- **Branching** — create a database branch per feature branch or Vercel preview deployment; each environment gets isolated data with no shared state
- Serverless: scales to zero when idle — no wasted compute at low traffic, important for a new platform
- This is what Vercel Postgres runs on under the hood; going direct gives a better free tier and removes Vercel as an intermediary
- Simple env var connection string — no lock-in

## Alternatives rejected

**Vercel Postgres** (Neon under the hood)

- More convenient dashboard integration with Vercel
- Free tier is more restrictive than going to Neon directly (256MB vs 512MB)
- Adds Vercel as an intermediary with no benefit
- Rejected

**Supabase**

- Free tier: 500MB, but **free projects are paused after 1 week of inactivity** — a real risk for a new platform with low early traffic
- Includes auth, storage, realtime — features not needed since Payload handles content and auth
- Paid tier starts at $25/month
- Rejected for free tier pausing behaviour

**Railway**

- No meaningful free tier (trial credit only, then usage-based)
- Rejected

**Render PostgreSQL**

- Free tier databases are **deleted after 90 days**
- Rejected

**Self-hosted on Unraid**

- Free, full control
- Ties production database reliability to home server uptime
- Suitable for local development and staging only
- Rejected for production
