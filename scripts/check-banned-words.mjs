#!/usr/bin/env node
// Guards against the word "company" creeping back into the codebase.
// We serve non-profits, NGOs and international bodies, so the domain term is
// "organisation" in user-facing copy and "organization"/"org*" in identifiers.
// Scans source files (contents and filename) under SCAN_DIRS. Fails on any match.
// Scoped to source dirs on purpose: it keeps the lockfile and other generated
// artefacts out, so a dependency that happens to contain "company" can't fail
// the build for something no one can fix in source.
//
// The lookbehind means legitimate words like "accompany" are not flagged.
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const BANNED = /(?<![a-z])compan(y|ies)/i;
const SELF = "scripts/check-banned-words.mjs";
const SCAN_DIRS = ["apps", "packages", "scripts", "docs"];
const SKIP_EXT = /\.(png|jpe?g|gif|webp|ico|woff2?|ttf|otf|eot|pdf|lock)$/i;

const files = execSync(
  `git ls-files --cached --others --exclude-standard -- ${SCAN_DIRS.join(" ")}`,
  {
    encoding: "utf8",
  },
)
  .split("\n")
  .filter(Boolean)
  .filter((file) => file !== SELF && !SKIP_EXT.test(file));

const hits = [];
for (const file of files) {
  if (BANNED.test(file)) hits.push(`${file}: banned term in filename`);

  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  text.split("\n").forEach((line, i) => {
    if (BANNED.test(line)) hits.push(`${file}:${i + 1}: ${line.trim()}`);
  });
}

if (hits.length > 0) {
  console.error(
    'Banned term "company" found. Use "organisation" (copy) or "organization"/"org*" (identifiers).\n',
  );
  console.error(hits.join("\n"));
  process.exit(1);
}
