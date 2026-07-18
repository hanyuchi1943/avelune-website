import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("public pages have commercial metadata, a branded 404 page, and index rules", async () => {
  const [layout, product, about, gallery, faq, contact, privacy, sitemap, robots, notFound] = await Promise.all([
    source("app/layout.tsx"),
    source("app/product/page.tsx"),
    source("app/about/page.tsx"),
    source("app/gallery/page.tsx"),
    source("app/faq/page.tsx"),
    source("app/contact/page.tsx"),
    source("app/privacy/page.tsx"),
    source("app/sitemap.ts"),
    source("app/robots.ts"),
    source("app/not-found.tsx"),
  ]);

  assert.match(layout, /twitter:/);
  assert.match(layout, /icons:/);
  for (const page of [product, about, gallery, faq, contact, privacy]) {
    assert.match(page, /description:/);
    assert.match(page, /canonical:/);
  }
  assert.match(sitemap, /"\/privacy"/);
  assert.match(sitemap, /"\/terms"/);
  assert.match(robots, /disallow: \["\/api\/"\]/);
  assert.match(notFound, /Page not found/);
  assert.match(notFound, /Return Home/);
});

test("public product imagery resolves to existing local assets", async () => {
  const pages = await Promise.all([
    source("app/page.tsx"),
    source("app/product/page.tsx"),
    source("app/about/page.tsx"),
    source("app/gallery/page.tsx"),
  ]);
  const imagePaths = [...pages.join("\n").matchAll(/"(\/images\/avelune\/[^"\n]+)"/g)].map((match) => match[1]);

  assert.ok(imagePaths.length > 0);
  await Promise.all(imagePaths.map((path) => access(new URL(`public${path}`, root))));
});

test("gallery statically imports each temporary lifestyle image", async () => {
  const gallery = await source("app/gallery/page.tsx");

  for (const image of ["gallery-fireplace.jpg", "gallery-flowers.jpg", "gallery-bookshelf.jpg"]) {
    assert.match(gallery, new RegExp(`import .+ from ".+${image}"`));
    await access(new URL(`public/images/avelune/${image}`, root));
  }
});
