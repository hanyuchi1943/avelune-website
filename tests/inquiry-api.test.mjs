import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app/api/inquiry/route.ts", import.meta.url), "utf8");

test("inquiry API has the required production safeguards", () => {
  assert.match(source, /export async function POST/);
  assert.match(source, /RESEND_API_KEY/);
  assert.match(source, /INQUIRY_TO_EMAIL/);
  assert.match(source, /INQUIRY_FROM_EMAIL/);
  assert.match(source, /resendApiKey: apiKey \? "present" : "missing"/);
  assert.match(source, /Server configuration missing:/);
  assert.match(source, /reply_to: email/);
  assert.match(source, /payload\.website/);
  assert.match(source, /Date\.now\(\) - startedAt < 2500/);
  assert.match(source, /status: 429/);
  assert.match(source, /emailPattern\.test\(email\)/);
  assert.match(source, /status: 405/);
  assert.match(source, /console\.log\("missing RESEND_API_KEY"\)/);
  assert.match(source, /console\.log\("missing INQUIRY_TO_EMAIL"\)/);
  assert.match(source, /console\.log\("missing INQUIRY_FROM_EMAIL"\)/);
  assert.match(source, /console\.log\("about to call Resend"\)/);
});
