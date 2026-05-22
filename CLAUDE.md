# Work4Change Asia — Claude Code Instructions

## Project

Career platform for the non-profit, international cooperation, and impact sectors across Asia and Pacific. Full architecture in [`docs/TECHNICAL_BLUEPRINT.md`](docs/TECHNICAL_BLUEPRINT.md).

## Design

- **Figma board**: https://www.figma.com/design/xn4TcxYjXSZRJun6ao9dQb/Untitled?node-id=0-1&m=dev&t=CaLb6SzqLSfKywmf-1

## Stack

- **Next.js App Router** + **Payload CMS v3** — single project, single deployment
- **PostgreSQL** via Drizzle (Payload's adapter; same instance for custom queries)
- **Tailwind CSS** + **shadcn/ui** (copied into codebase, not a versioned dependency)
- **pnpm** workspaces — `apps/web` + `packages/domain`
- **Valibot** for all I/O boundary validation
- **Vitest** for tests, **Oxlint + Oxfmt** for lint/format

## TypeScript — hard rules

These are enforced by Oxlint and must never be bypassed:

| Banned | Use instead |
|---|---|
| `any` | proper type, Valibot parser, or type guard |
| `as Foo` type assertions | Valibot `parse`, `instanceof`, or user-defined type guard |
| `!` non-null assertion | explicit null check or optional chaining |
| `@ts-ignore` / `@ts-expect-error` | fix the code |

`as const` and `satisfies` are permitted.

No lint-suppression comments (`oxlint-disable`, `eslint-disable`).

## Validation

- All environment variables validated at startup via Valibot discriminated union (`DevConfig | ProdConfig`)
- All custom API route inputs parsed with Valibot before use
- Shared schemas live in `packages/domain` — frontend and backend import from the same source

## Payload CMS conventions

- Collections defined in `apps/web/collections/`
- Shared field groups composed into collections (don't duplicate fields)
- Access control defined on every collection and operation — never leave it open by default
- `status` field on all content collections: `draft | published | expired`

## Project structure

```
apps/
  web/                  Next.js + Payload CMS v3
    app/
      (frontend)/       public-facing routes
      (payload)/        Payload admin (auto-generated)
    collections/        Payload collection definitions
    payload.config.ts
packages/
  domain/               shared Valibot schemas + TypeScript types
docs/
  TECHNICAL_BLUEPRINT.md
  decisions/            architecture decision records
  specs/                feature specifications
  plans/                implementation plans
```

## Commands

```bash
pnpm dev                # start dev server
pnpm typecheck          # tsc --noEmit (run before committing)
pnpm lint               # Oxlint (auto-fix)
pnpm format             # Oxfmt (auto-fix)
pnpm test               # Vitest
pnpm storybook          # Storybook dev server
pnpm payload generate:types  # regenerate types from Payload collections
```

## Superpowers skill paths

Override the superpowers defaults — save docs here instead:

- **Specs** (brainstorming skill): `docs/specs/YYYY-MM-DD-<topic>-design.md`
- **Plans** (writing-plans skill): `docs/plans/YYYY-MM-DD-<feature-name>.md`

## Key decisions — do not reverse without discussion

- **URL pattern**: `/job-board/[id]-[slug]` and `/opportunities/[id]-[slug]`
- **Filter state**: always in URL query params, never component-only state
- **Filtering**: server-side only — do not load all opportunities client-side
- **shadcn/ui**: restyle to design tokens, do not fight the Radix primitives underneath
- **Git**: GitHub (`git@github.com:work4change-asia/platform.git`), deploy via Vercel native integration

## Content model — two surfaces

- **Job Board**: jobs collection only (employment/engagement relationships)
- **Opportunities Page**: grants, events, news collections

Fellowships and traineeships belong to the Job Board, not the Opportunities Page.
