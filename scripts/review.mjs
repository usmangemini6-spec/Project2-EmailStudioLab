// Usage: node scripts/review.mjs <campaign-folder>
// Runs Claude Code headless to review a campaign's emails.
// Saves review/findings.json. Exits 1 if any finding is high severity.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign-folder>");
  process.exit(2);
}

const schema = JSON.stringify(JSON.parse(readFileSync(resolve(root, "review/findings.schema.json"), "utf8")));
let prompt =
  `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

// If the last review was for the same folder, tell Claude what it found then.
const norm = (f) => resolve(root, f);
const findingsPath = resolve(root, "review/findings.json");
if (existsSync(findingsPath)) {
  try {
    const last = JSON.parse(readFileSync(findingsPath, "utf8"));
    if (last.folder && norm(last.folder) === norm(folder) && Array.isArray(last.findings)) {
      prompt +=
        `

Earlier findings:
${JSON.stringify(last.findings, null, 2)}

` +
        "These are findings from the last review. Report only problems that are new or still not fixed. Don't repeat ones that have been fixed.";
    }
  } catch {
    // Unreadable old file: review from scratch.
  }
}

const result = spawnSync(
  "claude",
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", schema,
    "--allowedTools", "Read,Glob,Grep",
  ],
  { cwd: root, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
);

if (result.status !== 0) {
  console.error("Claude failed:", result.stderr || result.stdout);
  process.exit(2);
}

let parsed;
try {
  parsed = JSON.parse(result.stdout);
} catch {
  console.error("Could not read Claude's output as JSON:\n" + result.stdout);
  process.exit(2);
}

// Output may be one object, or a list whose last item is the result.
const final = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
const output = final?.structured_output;
if (!output || !Array.isArray(output.findings)) {
  console.error("No structured_output in result:\n" + JSON.stringify(final, null, 2));
  process.exit(2);
}

mkdirSync(resolve(root, "review"), { recursive: true });
writeFileSync(findingsPath, JSON.stringify({ folder, findings: output.findings }, null, 2) + "\n");

const count = (s) => output.findings.filter((f) => f.severity === s).length;
const high = count("high");
console.log(
  `${folder}: ${output.findings.length} findings (${high} high, ${count("medium")} medium, ${count("low")} low)`
);
process.exit(high > 0 ? 1 : 0);
