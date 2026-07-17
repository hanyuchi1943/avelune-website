# AVELUNE Website

Public AVELUNE brand and inquiry website built with Next.js.

## Required environment variables

Create a local `.env.local` file (never commit it):

```bash
RESEND_API_KEY=re_xxxxxxxxx
INQUIRY_TO_EMAIL=hello@avelune.com
# Optional: use a verified Resend sender before launch
INQUIRY_FROM_EMAIL="AVELUNE <hello@your-verified-domain.com>"
```

## Local testing

```bash
npm install
npm run dev
```

Visit `/contact`. Fill the required fields, wait at least three seconds, and submit. A successful Resend response shows the confirmation message. Check the recipient inbox and use the customer email as Reply-To.

## Vercel setup

1. In Vercel, open the project’s **Settings → Environment Variables**.
2. Add `RESEND_API_KEY` with the Resend API key.
3. Add `INQUIRY_TO_EMAIL` with `hello@avelune.com` or the final recipient.
4. Add `INQUIRY_FROM_EMAIL` only after verifying the sending domain in Resend; otherwise the safe development sender is used.
5. Apply variables to Production, Preview, and Development as required, then redeploy.

## Inquiry protection

The API route accepts POST only, validates required fields, removes unsafe control characters and angle brackets, uses a hidden honeypot, requires a minimum completion time, and applies an in-memory per-instance rate limit. For globally shared rate limiting at higher volume, connect a Vercel-compatible store such as Upstash Redis.
