import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../app/components/contact-form.tsx", import.meta.url), "utf8");

test("contact form protects one active submission and shows sending state", () => {
  assert.match(source, /if \(submissionInFlight\.current\) return/);
  assert.match(source, /submissionInFlight\.current = true/);
  assert.match(source, /disabled=\{isSending\}/);
  assert.match(source, /aria-busy=\{isSending\}/);
  assert.match(source, /Sending\.\.\./);
  assert.match(source, /Submit Inquiry/);
});

test("contact form exposes only safe success and failure states", () => {
  assert.match(source, /form\.reset\(\)/);
  assert.match(source, /Inquiry Sent/);
  assert.match(source, /Send another inquiry/);
  assert.match(source, /setError\(friendlyFailure\)/);
  assert.match(source, /We could not send your inquiry right now\. Please try again shortly\./);
  assert.doesNotMatch(source, /data\.error|response\.text\(\)/);
});

test("contact form keeps success and error states accessible", () => {
  assert.match(source, /ref=\{successPanel\} role="status" tabIndex=\{-1\} aria-live="polite"/);
  assert.match(source, /ref=\{errorMessage\} role="alert" tabIndex=\{-1\}/);
  assert.match(source, /successPanel\.current\?\.focus\(\)/);
  assert.match(source, /errorMessage\.current\?\.focus\(\)/);
  assert.match(source, /requestAnimationFrame\(\(\) => firstField\.current\?\.focus\(\)\)/);
});
