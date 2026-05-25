# ADR-0005: Git Hosting

Date: 2026-05-18
Status: Accepted

## Context

The project needs a Git host. The developer has an existing Gitea instance on a local Unraid server, some dissatisfaction with GitHub, and is deploying to Vercel.

## Decision

**GitHub** (private repo under the `work4change-asia` org).

Repo: `git@github.com:work4change-asia/platform.git`

A GitHub organisation was created (free tier) rather than using a personal account, so the repo lives at a branded URL and collaborator permissions are cleanly separated from the developer's personal account.

## Reasoning

- Vercel has first-class GitHub integration — automatic deploys, branch preview URLs, commit-linked deployments — with no additional configuration
- GitHub Actions provides the CI pipeline we need
- Pragmatic: fastest path to a working deployment pipeline for a solo developer
- Migration is low-cost if needed: `git remote set-url` + CI config update + Vercel reconnect = a few hours of work

## Alternatives considered

**GitLab.com**

- Vercel has first-class GitLab integration (same as GitHub)
- Stronger CI/CD pipeline features
- Not GitHub/Microsoft
- Would be the preferred alternative if GitHub becomes a problem
- Rejected for now on pragmatism grounds only

**Self-hosted Gitea (on Unraid)**

- Already running, full control
- Vercel has no native Gitea integration — deployments would require Gitea Actions + Vercel CLI
- Loss of: automatic Vercel preview deployments, commit-linked dashboard, one-click rollback
- CI/CD availability tied to Unraid uptime
- Rejected for production use; suitable for local dev mirroring if desired

## Migration path

If GitHub becomes untenable: migrate to GitLab.com.
Steps: push to new remote, update GitHub Actions → GitLab CI syntax (minor), reconnect Vercel to GitLab repo, update any webhook URLs. Estimated effort: half a day.
