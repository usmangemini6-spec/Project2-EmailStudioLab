---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Take one campaign folder and write one version of each email for each lead group.

## Step 1: Check the argument

The campaign folder is the argument, for example `campaigns/steep-club-launch`.

If no folder was given, or it has no `emails/` folder:

1. Stop. Write nothing.
2. Use Glob to find `campaigns/*/emails/*.md`.
3. Reply with the list of campaign folders that have emails, and ask which one to use.

## Step 2: Find the groups

1. Read `leads/leads.csv`. Use only the `group` column.
2. The groups are `tea-curious`, `gift-buyers` and `daily-drinkers`. Use the names exactly as they appear in the file.
3. Never copy a lead's name or email address into an email. Greetings stay as `{{first_name}}`.
4. If a group in the file is not one of these three, stop and say so.

## Step 3: Read the sources

- `brand/voice.md` for the voice, words to use, words to avoid and the sign-off.
- `.claude/rules/emails.md` for the rules every email file must follow.
- The campaign's `plan.md`, if it exists, for the message for each group.
- Every email in `<campaign folder>/emails/*.md`. Do not read or copy from any `groups/` folder.

## Step 4: Write the versions

For each email and each group, write a new file at:

`<campaign folder>/groups/<group>/emails/<same file name>`

Keep these exactly as in the original:

- The structure and order of every section.
- The `Subject:` and `Preview:` lines.
- The greeting `Hello {{first_name}},`.
- The one main link and its button text.
- Every placeholder in square brackets, such as `[PRICE ONE MONTH]`.
- The sign-off and the footer, copied exactly.

Change only two things:

1. **The opening line.** This is the first line after the greeting. Rewrite it so it fits the group.
2. **One example.** Pick one short example in the body and rewrite it so it fits the group. Examples are things like a moment to enjoy tea or a person to share it with. If an email has no natural example, add one short sentence.

What fits each group (from the plan):

- **tea-curious:** New to tea. Easy, friendly steps. "You do not need to know anything."
- **gift-buyers:** Want to give tea. Thoughtful and simple. "A thoughtful gift, one box at a time."
- **daily-drinkers:** Drink tea every day. Want something new. "Your daily cup, with something new in it."

## Rules for the new lines

- Follow `brand/voice.md`: warm, calm, honest. Short, plain sentences.
- At most one exclamation mark per email. Prefer none.
- Never use the words or claims that `brand/voice.md` says to avoid.
- No health claims.
- Do not invent prices, discounts, delivery dates, tea names, ingredients or other facts. If a fact is needed, use an existing placeholder.
- Do not add a second link.
- Do not put a code block or extra text after the footer.

## Step 5: Do not overwrite

If a group file already exists, skip it. Do not replace it. Count it as skipped.

## Step 6: Check before replying

For each file you wrote, check these:

- The first line is `Subject:` and the second is `Preview:`, both the same as the original.
- There is exactly one main link, the same as the original.
- The file ends with the sign-off and the footer, copied exactly.

Fix any file that fails before you reply.

## Step 7: Reply with a short summary only

Reply with:

- How many files you wrote, and how many you skipped, if any.
- One example opening line for each group.

Do not paste whole emails. Do not add anything else.
