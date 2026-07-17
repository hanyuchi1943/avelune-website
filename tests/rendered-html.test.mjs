import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("keeps every public route available to Next.js", async () => {
  for (const route of ["", "product", "about", "gallery", "faq", "contact"]) {
    await access(new URL(`app/${route ? `${route}/` : ""}page.tsx`, root));
  }
});

test("does not depend on ignored Codex build tooling", async () => {
  const [viteConfig, packageJson] = await Promise.all([
    readFile(new URL("vite.config.ts", root), "utf8"),
    readFile(new URL("package.json", root), "utf8"),
  ]);
  assert.doesNotMatch(viteConfig, /sites-vite-plugin|@cloudflare\/vite-plugin|vinext/);
  assert.match(packageJson, /"build": "next build --webpack"/);
});
