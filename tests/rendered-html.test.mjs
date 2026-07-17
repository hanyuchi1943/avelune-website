import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the AVELUNE public homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /A quiet place for/i);
  assert.match(html, /Create Your Keepsake/i);
  assert.match(html, /<img/i);
  assert.doesNotMatch(html, /_next\/image/i);
});

test("renders each public route", async () => {
  for (const path of ["/product", "/about", "/gallery", "/faq", "/contact"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /AVELUNE/);
    assert.doesNotMatch(html, /_next\/image/i);
  }
});
