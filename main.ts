// One-Line Laugh-Off entry — main.ts
// Writes exactly one funny line to /output/entry.txt.
// Sealed gate: UTF-8 text, 1-200 characters, single line.

const LINE =
  "I bought a self-help book about overcoming procrastination, and it arrived three weeks late because I kept putting off ordering it.";

function main(): void {
  // Runtime guard: sealed gate 1-200 chars, single line, non-whitespace.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry length ${LINE.length} outside sealed gate 1-200`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  // Judge-brief guard: the line must be one self-contained joke — it must
  // name the setup ("procrastination") and land its punch on the final
  // words ("putting off ordering it"), ending with a period.
  if (!LINE.includes("procrastination")) {
    throw new Error("entry must name the setup: procrastination");
  }
  if (!LINE.endsWith("putting off ordering it.")) {
    throw new Error("entry must land its punch on the final words");
  }
  if (!LINE.endsWith(".")) {
    throw new Error("entry must end with a period");
  }

  const outDir = process.env.OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const fs = require("node:fs");
  const path = require("node:path");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
  console.log(`entry ok: ${LINE.length} chars, 1 line`);
}

main();
