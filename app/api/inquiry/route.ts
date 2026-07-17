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

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function inquiryHtml(fields: Array<[string, string]>) {
  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #e7e0d6;color:#7d7468;font:11px/1.4 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;vertical-align:top;width:36%;">${escapeHtml(label)}</td>
          <td style="padding:14px 0;border-bottom:1px solid #e7e0d6;color:#26231f;font:15px/1.6 Georgia,serif;vertical-align:top;word-break:break-word;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:32px 16px;background:#f4f0e9;color:#26231f;">
    <main style="max-width:680px;margin:0 auto;background:#fffdf9;border:1px solid #e7e0d6;">
      <header style="padding:34px 40px 28px;border-bottom:1px solid #e7e0d6;">
        <p style="margin:0 0 18px;color:#7d7468;font:11px/1.4 Arial,sans-serif;letter-spacing:.16em;text-transform:uppercase;">New custom memorial inquiry</p>
        <h1 style="margin:0;color:#26231f;font:400 30px/1.2 Georgia,serif;letter-spacing:-.02em;">AVELUNE</h1>
      </header>
      <section style="padding:18px 40px 40px;">
        <table role="presentation" style="width:100%;border-collapse:collapse;">${rows}</table>
      </section>
      <footer style="padding:18px 40px;background:#f4f0e9;color:#7d7468;font:12px/1.5 Arial,sans-serif;">
        A quiet place for their love to stay.
      </footer>
    </main>
  </body>
</html>`;
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
      console.log("inquiry rate limited");
      return NextResponse.json({ error: "Please wait a moment before trying again." }, { status: 429 });
    }

    let payload: Inquiry;
    try {
      payload = await request.json();
    } catch {
      console.log("invalid inquiry request");
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    if (clean(payload.website, 200)) {
      console.log("inquiry honeypot triggered");
      return NextResponse.json({ error: "Unable to process this inquiry." }, { status: 400 });
    }

    const startedAt = Number(payload.startedAt);
    if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
      console.log("inquiry completed too quickly");
      return NextResponse.json({ error: "Please take a moment to complete the form." }, { status: 400 });
    }

    const name = clean(payload.name, 120);
    const email = clean(payload.email, 180);
    const country = clean(payload.country, 120);
    const message = clean(payload.message, 4000);

    if (!name || !emailPattern.test(email) || !country || !message) {
      console.log("inquiry validation failed");
      return NextResponse.json(
        { error: "Please complete your name, email, country, and message." },
        { status: 400 },
      );
    }

    if (!apiKey) {
      console.log("missing RESEND_API_KEY");
      return NextResponse.json(
        { error: "Server configuration missing: RESEND_API_KEY.", missing: ["RESEND_API_KEY"] },
        { status: 500 },
      );
    }
    if (!to) {
      console.log("missing INQUIRY_TO_EMAIL");
      return NextResponse.json(
        { error: "Server configuration missing: INQUIRY_TO_EMAIL.", missing: ["INQUIRY_TO_EMAIL"] },
        { status: 500 },
      );
    }
    if (!from) {
      console.log("missing INQUIRY_FROM_EMAIL");
      return NextResponse.json(
        { error: "Server configuration missing: INQUIRY_FROM_EMAIL.", missing: ["INQUIRY_FROM_EMAIL"] },
        { status: 500 },
      );
    }

    const submittedAt = new Date().toISOString();
    const fields: Array<[string, string]> = [
      ["Full name", name],
      ["Customer email", email],
      ["Country", country],
      ["Pet name", clean(payload.petName, 120) || "—"],
      ["Pet type", clean(payload.petType, 120) || "—"],
      ["Personalization request", clean(payload.personalisation, 200) || "—"],
      ["Message", message],
      ["Submission time", submittedAt],
      ["Page URL", clean(payload.pageUrl, 500) || "—"],
    ];

    try {
      console.log("about to call Resend");
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
          subject: "New Custom Memorial Inquiry | AVELUNE",
          text: fields.map(([label, value]) => `${label}: ${value}`).join("\n\n"),
          html: inquiryHtml(fields),
        }),
      });

      if (!response.ok) {
        const responseBody = await response.text();
        console.error("AVELUNE Resend request rejected", {
          status: response.status,
          responseBody,
        });
        console.log("Resend rejected inquiry delivery");
        return NextResponse.json(
          { error: `Resend rejected the inquiry delivery (HTTP ${response.status}): ${responseBody || "No response body."}` },
          { status: 502 },
        );
      }
    } catch (error) {
      const message = errorMessage(error);
      console.error("AVELUNE Resend request failed", { message });
      console.log("Resend request failed");
      return NextResponse.json({ error: `Resend request failed: ${message}` }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = errorMessage(error);
    console.error("AVELUNE inquiry route failed", { message });
    console.log("inquiry route failed");
    return NextResponse.json({ error: `Inquiry processing failed: ${message}` }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
