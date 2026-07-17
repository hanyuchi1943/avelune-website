import { NextRequest, NextResponse } from "next/server";

type Inquiry = { name?: unknown; email?: unknown; country?: unknown; petName?: unknown; petType?: unknown; personalisation?: unknown; message?: unknown; website?: unknown; startedAt?: unknown; pageUrl?: unknown };
const attempts = new Map<string, { count: number; resetAt: number }>();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, limit = 1000) => String(value ?? "").replace(/[<>]/g, "").replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, limit);

function allowed(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now(); const record = attempts.get(key);
  if (!record || record.resetAt < now) { attempts.set(key, { count: 1, resetAt: now + 60_000 }); return true; }
  if (record.count >= 5) return false;
  record.count += 1; return true;
}

export async function POST(request: NextRequest) {
  if (!allowed(request)) return NextResponse.json({ error: "Please wait a moment before trying again." }, { status: 429 });
  let payload: Inquiry;
  try { payload = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (clean(payload.website, 200)) return NextResponse.json({ error: "Unable to process this inquiry." }, { status: 400 });
  const startedAt = Number(payload.startedAt); if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) return NextResponse.json({ error: "Please take a moment to complete the form." }, { status: 400 });
  const name = clean(payload.name, 120), email = clean(payload.email, 180), country = clean(payload.country, 120), message = clean(payload.message, 4000);
  if (!name || !emailPattern.test(email) || !country || !message) return NextResponse.json({ error: "Please complete your name, email, country, and message." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY, to = process.env.INQUIRY_TO_EMAIL || "hello@avelune.com";
  if (!apiKey) return NextResponse.json({ error: "We could not send your inquiry right now. Please try again or contact us directly by email." }, { status: 503 });
  const fields = [["Full name", name], ["Customer email", email], ["Country", country], ["Pet name", clean(payload.petName, 120) || "—"], ["Pet type", clean(payload.petType, 120) || "—"], ["Personalization", clean(payload.personalisation, 200) || "—"], ["Message", message], ["Submitted", new Date().toISOString()], ["Page URL", clean(payload.pageUrl, 500) || "—"]];
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.INQUIRY_FROM_EMAIL || "AVELUNE <onboarding@resend.dev>", to: [to], reply_to: email, subject: `New AVELUNE inquiry — ${name}`, text: fields.map(([label, value]) => `${label}: ${value}`).join("\n\n") }) });
    if (!response.ok) return NextResponse.json({ error: "We could not send your inquiry right now. Please try again or contact us directly by email." }, { status: 502 });
  } catch { return NextResponse.json({ error: "We could not send your inquiry right now. Please try again or contact us directly by email." }, { status: 502 }); }
  return NextResponse.json({ success: true });
}

export function GET() { return NextResponse.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } }); }
