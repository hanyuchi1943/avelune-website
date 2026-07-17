import { NextRequest, NextResponse } from "next/server";

type Inquiry = {
  name?: unknown;
  email?: unknown;
  country?: unknown;
  petName?: unknown;
  petType?: unknown;
  personalisation?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
  pageUrl?: unknown;
};

const attempts = new Map<string, { count: number; resetAt: number }>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, limit = 1000) =>
  String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);

function allowed(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || record.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (record.count >= 5) return false;

  record.count += 1;
  return true;
}

function errorMessage(error: unknown) {
  return error instanceof Error && error.message ? error.message : "Unexpected server error.";
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;

  console.info("AVELUNE inquiry email configuration", {
    resendApiKey: apiKey ? "present" : "missing",
    inquiryToEmail: to ?? "missing",
    inquiryFromEmail: from ?? "missing",
  });

  try {
    if (!allowed(request)) {
      return NextResponse.json({ error: "Please wait a moment before trying again." }, { status: 429 });
    }

    let payload: Inquiry;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    if (clean(payload.website, 200)) {
      return NextResponse.json({ error: "Unable to process this inquiry." }, { status: 400 });
    }

    const startedAt = Number(payload.startedAt);
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
      return NextResponse.json({ error: "Please take a moment to complete the form." }, { status: 400 });
    }

    const name = clean(payload.name, 120);
    const email = clean(payload.email, 180);
    const country = clean(payload.country, 120);
    const message = clean(payload.message, 4000);

    if (!name || !emailPattern.test(email) || !country || !message) {
      return NextResponse.json(
        { error: "Please complete your name, email, country, and message." },
        { status: 400 },
      );
    }

    const missing = [
      !apiKey && "RESEND_API_KEY",
      !to && "INQUIRY_TO_EMAIL",
      !from && "INQUIRY_FROM_EMAIL",
    ].filter(Boolean);

    if (missing.length) {
      return NextResponse.json(
        { error: `Server configuration missing: ${missing.join(", ")}.`, missing },
        { status: 500 },
      );
    }

    const fields = [
      ["Full name", name],
      ["Customer email", email],
      ["Country", country],
      ["Pet name", clean(payload.petName, 120) || "—"],
      ["Pet type", clean(payload.petType, 120) || "—"],
      ["Personalization", clean(payload.personalisation, 200) || "—"],
      ["Message", message],
      ["Submitted", new Date().toISOString()],
      ["Page URL", clean(payload.pageUrl, 500) || "—"],
    ];

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `New AVELUNE inquiry — ${name}`,
          text: fields.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
        }),
      });

      if (!response.ok) {
        const responseBody = await response.text();
        console.error("AVELUNE Resend request rejected", {
          status: response.status,
          responseBody,
        });
        return NextResponse.json(
          { error: `Resend rejected the inquiry delivery (HTTP ${response.status}): ${responseBody || "No response body."}` },
          { status: 502 },
        );
      }
    } catch (error) {
      const message = errorMessage(error);
      console.error("AVELUNE Resend request failed", { message });
      return NextResponse.json({ error: `Resend request failed: ${message}` }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = errorMessage(error);
    console.error("AVELUNE inquiry route failed", { message });
    return NextResponse.json({ error: `Inquiry processing failed: ${message}` }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
