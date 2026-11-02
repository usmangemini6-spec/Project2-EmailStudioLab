---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for email files

These rules apply to every email file in any campaign, and only to email files.

Each email file must follow this order and these rules.

## 1. Subject and preview

- The first line is `Subject: ...`. Keep it to 50 characters or fewer.
- The second line is `Preview: ...`. Keep it to 90 characters or fewer.
- Count the characters after `Subject: ` and `Preview: `.

## 2. Greeting

- Greet the reader with `{{first_name}}`. For example: `Hello {{first_name}},`
- Do not type a real name.

## 3. One main link

- Use exactly one main link, written like this:
  `[Button text](https://kettlebird.example/steep-club)`
- Do not add a second main link.
- The unsubscribe link in the footer does not count as a main link.

## 4. Ending

End the file with our sign-off from `brand/voice.md`, then the footer. Copy them exactly.

Sign-off:

Thank you for your time.

Warm sips,
The Kettlebird team

Footer (two lines of plain text, not inside a code block):

You're getting this because you joined the Kettlebird Tea waitlist.
Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Nothing comes after the footer.
