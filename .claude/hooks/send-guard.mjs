// PreToolUse guard for Resend tools. Exit 2 blocks the call; exit 0 allows it.

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);
const CHECK_ADDRESSES = new Set(["send-email", "send-batch-emails"]);

function block(reason) {
  console.error(`Blocked by send-guard: ${reason}`);
  process.exit(2);
}

// Pull the bare address out of "Name <a@b.com>" or "a@b.com".
function bareAddress(value) {
  const s = String(value).trim();
  const m = s.match(/<([^>]*)>\s*$/);
  return (m ? m[1] : s).trim().toLowerCase();
}

// Turn a string, an array, or nothing into a list of addresses.
function toList(value) {
  if (value === undefined || value === null || value === "") return [];
  return Array.isArray(value) ? value : [value];
}

function checkEmailObject(obj, myEmail) {
  for (const field of ["to", "cc", "bcc"]) {
    for (const raw of toList(obj?.[field])) {
      const addr = bareAddress(raw);
      const ok = addr.endsWith("@resend.dev") || (myEmail && addr === myEmail);
      if (!ok) {
        block(`${addr || "(empty address)"} in "${field}" is not allowed. Only @resend.dev addresses and the owner's own email may be used.`);
      }
    }
  }
}

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let call;
try {
  call = JSON.parse(raw);
} catch {
  block("could not read the tool call, so it was stopped to be safe.");
}

// Names look like "mcp__resend__send-email". Use the last part.
const name = String(call?.tool_name ?? "").split("__").pop();
const input = call?.tool_input ?? {};

if (ALWAYS_BLOCK.has(name)) {
  block(`${name} can reach whole lists of people, so it is always blocked.`);
}

if (CHECK_ADDRESSES.has(name)) {
  const myEmail = (process.env.MY_EMAIL ?? "").trim().toLowerCase();
  // send-batch-emails may carry a list directly or under "emails".
  const items = name === "send-batch-emails"
    ? (Array.isArray(input) ? input : input.emails ?? input.batch ?? [])
    : [input];
  if (name === "send-batch-emails" && !Array.isArray(items)) {
    block("could not read the batch of emails, so it was stopped to be safe.");
  }
  for (const item of items) checkEmailObject(item, myEmail);
}

process.exit(0);
