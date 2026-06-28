FROM node:22-alpine AS base
RUN corepack enable

# ── deps: install only (separate layer for cache) ──────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/domain/package.json ./packages/domain/
RUN pnpm install --frozen-lockfile

# ── builder ────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=deps /app/packages/domain/node_modules ./packages/domain/node_modules
COPY . .
# Dummy values so env.ts schema validation passes at build time.
# Real values are injected by Fly.io at runtime.
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://dummy:dummy@localhost/dummy
ENV PAYLOAD_SECRET=00000000000000000000000000000000
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter web build

# ── runner ─────────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
