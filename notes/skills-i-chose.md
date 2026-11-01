# Skills I chose

Searched skills.sh on 1 Nov 2026 for "email marketing", "email sequence", "campaign plan" and "resend". Star counts come from each skill's GitHub repository. Nothing has been installed yet.

## Use these

1. **anthropics/knowledge-work-plugins** (for writing campaigns)
   - Skills: `campaign-plan` and `email-sequence`. Also `draft-outreach` if I need one-off emails (it lives in the repo's `sales/skills/` folder, not `marketing/`).
   - Published by Anthropic, the company that makes Claude. The repo has about 34,300 stars, an Apache 2.0 license, and was updated today.
   - Why: they do exactly what a studio needs, planning a campaign and then writing the email series. They only have about 3,000 installs, so they are newer and smaller than the big community packs. The official publisher makes up for that.

2. **resend/resend-skills** (for sending email)
   - Skills: `resend` (24K installs), plus `resend/email-best-practices` for deliverability and good email habits.
   - Published by Resend, the company that runs the email-sending service. The repo has about 208 stars (146 for email-best-practices), an MIT license, and was updated on 28 Oct 2026.
   - Why: the people who build the sending service wrote the instructions for using it, so they should match how the API really works. The star count is low because it is a niche vendor repo, not because it is untrusted.

## Avoid these

1. **mbfinotti/sales-skills** (e.g. `cold-email-deliverability`, `sales-outbound-sequence`)
   - Each skill shows about 30,000 installs, but the repo has only 3 stars. Those two numbers don't fit together, so the install counts look inflated.
   - They are also built for cold sales outreach, which is a different job from running a marketing studio.

2. **gocallum/nextjs16-agent-skills** (`resend-integration-skills`)
   - An unofficial Resend guide from one person's repo. It has 23 stars, about 412 installs, an unclear license (the GitHub API reports none, the repo page says MIT), and was last updated in January 2026.
   - Resend publishes its own official skills, so there is no reason to trust a copy that may be out of date.

## How I decided

Before installing any skill, check these three things:

1. **Who publishes it.** Prefer the company that owns the product (anthropics, resend) over a stranger's copy. Open the GitHub repo and check the owner is who the skill claims.
2. **Whether the numbers agree.** Compare installs on skills.sh with GitHub stars, license, and last update. Big installs with almost no stars, no license, or no updates in months is a warning sign.
3. **What it actually says and does.** Read the skill's `SKILL.md` before installing. Skills are instructions that Claude follows, so make sure it doesn't ask for secrets, run odd commands, or reach out to unfamiliar sites.
