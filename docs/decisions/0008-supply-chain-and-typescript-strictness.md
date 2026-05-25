# ADR-0008: Supply Chain Controls and TypeScript Strictness

Date: 2026-05-18
Status: Accepted

## Context

The reference document `~/ws/secure-fullstack-ts-decisions.md` was reviewed and compared against this project's stack. It identified supply chain attacks as a materially higher risk in an AI-assisted development landscape (automated agents can chain transitive vulnerabilities at a speed human red teams cannot match).

## Decision

Adopt the supply chain controls and TypeScript strictness rules from the reference document in full.

## Supply chain controls

**pnpm-workspace.yaml:**

```yaml
minimumReleaseAge: 10080 # block packages published < 7 days ago
allowBuilds:
  esbuild: true # only package permitted to run postinstall
```

**`.npmrc`:**

```ini
save-exact=true
engine-strict=true
strict-peer-dependencies=true
audit-level=high
```

**CI gates:**

- `pnpm audit --prod --audit-level=high` on every PR
- Release-age lockfile diff: queries npm registry for newly-added packages, fails if published inside 7-day window
- Suppression grep gate (linter cannot self-suppress its own disable directives)

## TypeScript banned patterns

| Banned                              | Lint rule                                      |
| ----------------------------------- | ---------------------------------------------- |
| `any`                               | `typescript/no-explicit-any`                   |
| `!` non-null assertion              | `typescript/no-non-null-assertion`             |
| `as Foo` type assertions            | `typescript/consistent-type-assertions: never` |
| `@ts-ignore` / `@ts-expect-error`   | `typescript/ban-ts-comment`                    |
| `oxlint-disable` / `eslint-disable` | CI grep gate                                   |

Permitted: `as const` and `satisfies`.

Replacement patterns:

1. Valibot parser at an I/O boundary
2. User-defined type guard (`x is Foo`)
3. `instanceof` in catch blocks
4. Fix the upstream `@types/*` package

## SAST

- Warning mode: pre-commit hook (surfaces fast, doesn't block)
- Error mode: pre-push hook (blocks bad code leaving the machine)
- CI: same tooling with project-specific severity thresholds
- Rule: fix the code, never add a suppression comment

## Validation at I/O boundaries (Valibot)

Payload CMS handles collection-level field validation internally. Valibot is used everywhere else:

1. **Env vars at startup** — discriminated union `DevConfig | ProdConfig`; misconfiguration is a startup failure with a clear message
2. **Custom API route bodies** — every handler parses input before use
3. **Shared domain package** — same Valibot schema imported by both frontend form and backend handler

## Reasoning

The reference document's argument: mature dependencies with large transitive trees are now a larger practical risk than younger dependencies with smaller footprints, because AI tooling enables automated vulnerability chaining across dependency graphs. The supply chain controls (7-day quarantine, postinstall allowlist, exact version pinning) are a direct response to this.

The TypeScript strictness rules are adopted because escape hatches (`any`, `!`, `as Foo`) break the type chain at exactly the boundaries where vulnerabilities hide — null-derefs, unsafe casts, unchecked external input.
