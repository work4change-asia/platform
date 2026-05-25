import * as v from "valibot";

const DevConfig = v.object({
  NODE_ENV: v.literal("development"),
  DATABASE_URL: v.string(),
  PAYLOAD_SECRET: v.string(),
});

const TestConfig = v.object({
  NODE_ENV: v.literal("test"),
  DATABASE_URL: v.string(),
  PAYLOAD_SECRET: v.string(),
});

const ProdConfig = v.object({
  NODE_ENV: v.literal("production"),
  DATABASE_URL: v.pipe(v.string(), v.url()),
  PAYLOAD_SECRET: v.pipe(v.string(), v.minLength(32)),
});

export const env = v.parse(v.union([DevConfig, TestConfig, ProdConfig]), process.env);
