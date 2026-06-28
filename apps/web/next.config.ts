import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import path from "node:path";
import "./env";

const nextConfig: NextConfig = {
  output: "standalone",
  // Required for standalone to trace deps across the pnpm workspace root
  outputFileTracingRoot: path.join(import.meta.dirname, "../../"),
};

export default withPayload(nextConfig);
