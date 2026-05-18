# Work4Change Asia

Career platform for job opportunities and professional resources in the non-profit, international cooperation, and impact sectors across Asia and Pacific.

Free to use for opportunity seekers and recruiting organisations.

## Stack

- **Framework** — Next.js (App Router) + Payload CMS v3
- **Database** — PostgreSQL (Neon / Supabase)
- **Styling** — Tailwind CSS + shadcn/ui
- **Package manager** — pnpm
- **Language** — TypeScript throughout

## Docs

- [`docs/TECHNICAL_BLUEPRINT.md`](docs/TECHNICAL_BLUEPRINT.md) — architecture, data model, stack decisions, security controls
- [`docs/specs/`](docs/specs/) — feature specifications
- [`docs/plans/`](docs/plans/) — implementation plans

## Getting started

> Setup instructions will be added once the project scaffold is in place.

## Development

```bash
pnpm install
pnpm dev          # Next.js + Payload dev server
pnpm storybook    # component development
pnpm test         # Vitest
pnpm typecheck    # tsc --noEmit
pnpm lint         # Oxlint
```
