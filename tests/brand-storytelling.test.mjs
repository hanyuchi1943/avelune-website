import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("core pages use the approved AVELUNE keepsake language", async () => {
  const [home, product, about, gallery, faq, contact] = await Promise.all([
    source("app/page.tsx"),
    source("app/product/page.tsx"),
    source("app/about/page.tsx"),
    source("app/gallery/page.tsx"),
    source("app/faq/page.tsx"),
    source("app/contact/page.tsx"),
  ]);

  assert.match(home, /A quiet place for(?:<br\/>)?their love to stay\./);
  assert.match(home, /Personalized wooden keepsakes, thoughtfully made to hold the memories that matter most\./);
  assert.match(home, /Worldwide enquiries welcome/);
  assert.match(product, /Final materials, dimensions, finishes, pricing and production details are confirmed before an order is accepted\./);
  assert.match(product, /Approx\. 250 × 200 × 100 mm\./);
  assert.match(product, /Final dimensions and production details will be confirmed before an order is accepted\./);
  assert.match(about, /AVELUNE was created from a simple belief/);
  assert.match(gallery, /Details made to feel personal, considered, and at home\./);
  assert.match(faq, /What happens after I submit the inquiry form\?/);
  assert.match(contact, /Tell us a little about the companion you are remembering and the keepsake you have in mind\./);
});

test("public storytelling pages do not publish retired product or contact claims", async () => {
  const pages = await Promise.all([
    source("app/page.tsx"),
    source("app/product/page.tsx"),
    source("app/about/page.tsx"),
    source("app/gallery/page.tsx"),
    source("app/faq/page.tsx"),
    source("app/contact/page.tsx"),
    source("app/components/chrome.tsx"),
  ]);
  const combined = pages.join("\n");

  assert.doesNotMatch(combined, /hello@avelune\.com|Hidden magnetic closure/);
});
