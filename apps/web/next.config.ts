import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import path from "node:path";
import { env } from "./env";

const devAllowedOrigins =
  env.NODE_ENV === "development" && env.NEXT_DEV_ALLOWED_ORIGINS
    ? env.NEXT_DEV_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : undefined;

const nextConfig: NextConfig = {
  output: "standalone",
  // Required for standalone to trace deps across the pnpm workspace root
  outputFileTracingRoot: path.join(import.meta.dirname, "../../"),
  // Set NEXT_DEV_ALLOWED_ORIGINS in .env.local (comma-separated) to allow dev server access
  // (HMR, JS bundles) from hostnames other than localhost, e.g. a Tailscale hostname.
  ...(devAllowedOrigins ? { allowedDevOrigins: devAllowedOrigins } : {}),
};

export default withPayload(nextConfig);
