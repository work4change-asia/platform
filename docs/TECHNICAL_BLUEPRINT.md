# Work4Change Asia — Technical Blueprint

> Solo-developer TypeScript platform for job opportunities and professional resources in the non-profit, international cooperation, and impact sectors across Asia and Pacific.

---

## 1. Platform Overview

**Mission:** Strengthen the international cooperation and non-profit sectors by improving access to opportunities, fostering cross-border mobility, and enhancing employability across Asia.

**Access model:** Freely accessible to all users — browsing requires no account.

### Content surfaces

| Surface                | What it contains                                                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Job Board**          | Permanent FT/PT, Fixed-term, Temporary, Freelance/Consultancy, Internship, Volunteering, Fellowship, Traineeship, International Volunteering, Civic Service |
| **Opportunities Page** | Grants, Events, News, Calls for Proposals, Training programs                                                                                                |

### User types

| Phase | Users                                            |
| ----- | ------------------------------------------------ |
| MVP   | Admin (manages all content), Guest (browse only) |
| V2    | Opportunity Provider (org manages own listings)  |
| V3    | Opportunity Seeker (saved jobs, alerts, profile) |

The Provider and Seeker roles are modeled in the data layer from day one — they are not exposed in MVP but the schema does not fight their addition later.

---

## 2. Architecture

### Single-project layout

Payload CMS v3 runs **inside** the Next.js App Router project — not as a separate service. One codebase, one deployment, one build.

```
apps/
  web/                    ← Next.js App Router + Payload CMS v3
    app/
      (frontend)/         ← public-facing routes
        page.tsx          ← homepage
        job-board/
          page.tsx        ← browse + filter
          [id]-[slug]/
            page.tsx      ← single job page (SEO target)
        opportunities/
          page.tsx
          [id]-[slug]/
            page.tsx
      (payload)/          ← Payload admin (auto-generated)
        admin/[[...segments]]/
    payload.config.ts
    collections/
      Jobs.ts
      Grants.ts
      Events.ts
      News.ts
      Organizations.ts
      Users.ts

packages/
  domain/                 ← shared Valibot schemas + TypeScript types
                             (both web app and any future services import from here)
```

### Request flow

```
Browser
  → Cloudflare (CDN + DDoS + Asian PoPs)
    → Vercel Edge (global CDN, Next.js SSR/ISR)
      → Next.js App Router
          ├── Server Components (public pages — HTML rendered server-side)
          ├── /api/* routes (filter queries, future webhooks)
          └── /admin/* (Payload admin UI — rate-limited login)
              → Drizzle (via Payload PostgreSQL adapter)
                → Neon / Supabase (managed PostgreSQL)

Media uploads → Cloudflare R2 (S3-compatible)
```

---

## 3. Tech Stack

| Concern         | Choice                    | Key reason                                                                                                            |
| --------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| CMS + Admin UI  | **Payload CMS v3**        | Built on Next.js App Router; TypeScript-native; includes admin, auth, access control, draft/publish, REST+GraphQL API |
| Frontend        | **Next.js App Router**    | SSR/SSG for SEO; React Server Components; same project as Payload                                                     |
| Database        | **PostgreSQL**            | tsvector FTS + GIN indexes; array overlap for multi-select filters                                                    |
| ORM             | **Drizzle** (via Payload) | Payload's PostgreSQL adapter uses Drizzle; same instance for custom queries                                           |
| Package manager | **pnpm 11**               | `minimumReleaseAge` + `only-built-dependencies` supply-chain controls                                                 |
| Runtime         | **Node 24 LTS**           | Native TS stripping; native fetch; pinned in `engines`                                                                |
| Styling         | **Tailwind**              | Build-time utility CSS; no runtime CSS-in-JS                                                                          |
| Components      | **shadcn/ui** (copied)    | Radix UI accessibility primitives; owned and restyled to design system; not a versioned dependency                    |
| Component dev   | **Storybook**             | Component-first development; Figma addon links stories to designer frames                                             |
| Validation      | **Valibot**               | Zero deps; tree-shakeable; used at all I/O boundaries                                                                 |
| Testing         | **Vitest**                | Shared esbuild toolchain                                                                                              |
| Linting         | **Oxlint + Oxfmt**        | Type-aware via tsgo; Prettier-conformant; strict banned-pattern enforcement                                           |

### Hosting

| Layer     | Service          | Why                                                                    |
| --------- | ---------------- | ---------------------------------------------------------------------- |
| App       | Vercel           | Native Next.js; global edge CDN; zero-ops for solo dev                 |
| Database  | Neon or Supabase | Managed PostgreSQL; branching (Neon) or extras (Supabase)              |
| Media     | Cloudflare R2    | S3-compatible; Cloudflare CDN covers Singapore, Tokyo, HK, Sydney PoPs |
| DNS / CDN | Cloudflare       | Free CDN, DDoS protection, Asian PoPs in front of Vercel domain        |
| Staging   | Unraid (local)   | Dev and staging environment; follows Docker multi-stage pattern        |

### Deliberate trade-off: Payload's dependency footprint

Payload CMS v3 has a substantial transitive dependency footprint — the opposite of dep-minimalism. This is accepted because it delivers admin UI, auth, access control, content API, and draft/publish workflow that would otherwise be weeks of custom work for a solo developer.

**Documented fallback:** if Payload becomes untenable, the retreat path is Hono + Drizzle (already in the lockfile via Payload) + lightweight custom admin. The data model stays identical — the migration is days of work, not weeks.

---

## 4. Data Model

### Shared field group (composed into each collection)

```ts
const commonFields = [
  { name: 'title',           type: 'text',         required: true },
  { name: 'description',     type: 'richText' },
  { name: 'organization',    type: 'relationship',  relationTo: 'organizations' },
  { name: 'thematic_areas',  type: 'select',        hasMany: true, options: [...34 options] },
  { name: 'country',         type: 'select',        options: [...ISO 3166-1 alpha-2 codes] },
  { name: 'apply_url',       type: 'text' },
  { name: 'deadline',        type: 'date' },
  { name: 'status',          type: 'select',        options: ['draft', 'published', 'expired'] },
  // computed in DB: search_vector tsvector (GIN indexed, covers title + description)
]
```

### Collections

**jobs** (Job Board)

```ts
...commonFields,
work_modality:  'remote-global' | 'remote-local' | 'hybrid' | 'on-site'
contract_type:  'permanent-ft' | 'permanent-pt' | 'fixed-term' | 'temporary' |
                'freelance' | 'internship' | 'volunteering' | 'fellowship' |
                'traineeship' | 'intl-volunteering' | 'civic-service'
salary_range:   { min?, max?, currency?, display_text? }
```

**grants** — `...commonFields` + `funding_amount`, `eligibility`, `grant_type`

**events** — `...commonFields` + `event_date`, `event_format`, `registration_url`

**news** — `...commonFields` + `source_url`, `publication_date`, `news_type`

**organizations**

```ts
(name, logo(upload), website, hq_country(ISO), description);
```

**users**

```ts
email, role: 'admin' | 'provider' | 'seeker',
organization: relationship (nullable)   // provider role is modeled now, exposed in V2
```

### URL strategy

```
/job-board/[id]-[slug]          e.g. /job-board/a1b2-programme-manager-oxfam
/opportunities/[id]-[slug]      e.g. /opportunities/c3d4-youth-grant-2026
```

`[id]` prefix prevents slug collisions; `[slug]` carries the SEO-relevant text.

---

## 5. Search and Filtering

### Job Board — 5 filters

| Filter        | Type                                        | Storage                               |
| ------------- | ------------------------------------------- | ------------------------------------- |
| Keyword       | Free text → FTS                             | `tsvector` computed column, GIN index |
| Work Modality | Single/multi select                         | `text` enum column                    |
| Contract Type | Single/multi select                         | `text` enum column                    |
| Thematic Area | Multi-select (34 options)                   | `text[]` array, GIN index             |
| Country       | Multi-select (ISO codes, grouped by region) | `text` column                         |

**Filter state:** URL query params (shareable, crawlable, browser history-friendly)

```
/job-board?modality=remote-global&contract=fellowship&area=advocacy,fundraising&country=SG,JP
```

**Query pattern:**

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

**UX pattern:** `useTransition` — filter controls stay interactive while results update server-side; no blank/spinner flash.

**UI note:** Thematic Area (34 options) and Country (100+ options) must use a searchable combobox (shadcn/ui `Combobox` on Radix), not a flat checkbox list.

### Opportunities Page — simpler filters

Type (grant / event / news / training) + Thematic Area + Country + Deadline range

---

## 6. SEO

| Mechanism            | Implementation                                                      |
| -------------------- | ------------------------------------------------------------------- |
| Server-rendered HTML | Next.js Server Components — Google receives full HTML               |
| Dynamic metadata     | `generateMetadata()` per route — title, description, OG tags        |
| Structured data      | `JobPosting` (schema.org) on every job page — enables rich snippets |
| Sitemap              | `app/sitemap.ts` — auto-generated from published collections        |
| Robots               | `app/robots.ts` — allows `/`, disallows `/admin` and `/api`         |

Both `sitemap.ts` and `robots.ts` are ~20 lines each; they fall out of building the routes, not separate tasks.

---

## 7. Security Controls

### Supply chain

```yaml
# pnpm-workspace.yaml
minimumReleaseAge: 10080 # block packages published < 7 days ago
allowBuilds:
  esbuild: true # only package permitted to run postinstall
```

```ini
# .npmrc
save-exact=true
engine-strict=true
strict-peer-dependencies=true
audit-level=high
```

CI gates: `pnpm audit --prod --audit-level=high` + release-age lockfile diff check on every MR.

### TypeScript — banned patterns (Oxlint config)

| Banned                            | Rule                                           |
| --------------------------------- | ---------------------------------------------- |
| `any`                             | `typescript/no-explicit-any`                   |
| `!` non-null assertion            | `typescript/no-non-null-assertion`             |
| `as Foo` type assertions          | `typescript/consistent-type-assertions: never` |
| `@ts-ignore` / `@ts-expect-error` | `typescript/ban-ts-comment`                    |

Permitted: `as const` and `satisfies`.

Lint-suppression directives (`oxlint-disable`) are also banned — enforced by a separate CI grep gate.

### Validation (Valibot)

Used at every I/O boundary that Payload doesn't own:

1. **Env vars at startup** — discriminated union `DevConfig | ProdConfig`; misconfiguration is a startup failure with a clear message, not a runtime null-deref
2. **Custom API route handlers** — every handler parses input before touching it
3. **Shared domain package** — frontend form schema and backend handler schema are the same imported object

### Admin security

- Rate-limit `/admin/login` via Payload middleware
- Rename default `/admin` path via env var
- Payload access control defined on every collection from day one (even if MVP has only one admin)

### SAST

- Warning mode: pre-commit hook
- Error mode: pre-push hook
- CI: gate with project-specific severity thresholds
- Rule: fix the code, never add a suppression comment

---

## 8. Design System

**Approach:** shadcn/ui as the behavioral/accessibility base (Radix UI primitives), fully restyled to the Figma design tokens.

**Workflow:**

```
Designer → Figma component (visual spec)
         → map to shadcn/ui component
         → replace styles with design tokens
         → publish to Storybook story
         → link Storybook story to Figma frame (Figma addon)
```

Truly novel components with no shadcn equivalent: build from a Radix primitive if interactive, pure custom if purely visual.

**Figma → code:** Figma is the visual spec, not the code source. Figma exports produce static unstyled HTML with no state or accessibility — use them as a reference, not a starting point.

---

## 8b. Git & CI/CD

| Concern     | Choice                               | Note                                                                                                                                                          |
| ----------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Git hosting | **GitHub** (private repo)            | Current choice — easiest Vercel integration. Migrate to GitLab if GitHub becomes a pain; it's a few hours of work (git remote + CI config + Vercel reconnect) |
| Deployment  | **Vercel** native GitHub integration | Auto-deploys on push to `main`; preview URLs per branch                                                                                                       |
| CI          | **GitHub Actions**                   | Parallel jobs: lint, format:check, typecheck, test, audit, release-age check                                                                                  |

---

## 9. MVP Build Order

1. **Repo setup** — pnpm workspace, `.npmrc` hardening, Oxlint config, Vitest config, SAST hooks
2. **Design system** — Tailwind config with design tokens, shadcn/ui components, Storybook
3. **Payload collections** — `jobs`, `organizations`, draft/publish workflow, admin access control
4. **Homepage**
5. **Job Board** — list + filter + URL-param state + `useTransition`
6. **Single job page** — `generateMetadata`, `JobPosting` structured data
7. **Opportunities collections** — `grants`, `events`, `news`
8. **Opportunities page + single opportunity page**
9. **`sitemap.ts` + `robots.ts`** (falls out of step 6–8)

---

## 10. Out of Scope (MVP)

- User accounts (seeker / provider)
- Email notifications / job alerts
- Organization self-service portal
- Saved jobs
- Analytics dashboard
- i18n (English only)
- Paid/premium features
- Semantic search (Meilisearch / pgvector) — Postgres FTS is sufficient at launch volume

---

## 11. Growth Path

| Phase | What gets added                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------------- |
| V2    | Organization accounts; providers create/manage own listings; Payload access control gates `WHERE org == user.org` |
| V3    | Seeker accounts; saved jobs; email alerts; application tracking                                                   |
| V4    | Semantic search (pgvector); job matching; analytics                                                               |

The data model and auth system are designed to support V2 and V3 without schema migrations that break existing data.
