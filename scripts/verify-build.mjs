import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { gzipSync } from "node:zlib";
const root = resolve("dist");
const read = (p) => readFile(p, "utf8");
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? files(resolve(dir, e.name)) : [resolve(dir, e.name)],
      ),
    )
  ).flat();
}
const all = await files(root);
const pages = all.filter((p) => p.endsWith(".html"));
assert.equal(pages.length, 6, "Expected five public routes and a 404 page");
let links = 0;
for (const file of pages) {
  const html = await read(file);
  const route = "/" + relative(root, file).replace(/index\.html$/, "");
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    route + " must have one h1",
  );
  assert.match(html, /<html lang="en"/);
  assert.match(html, /id="main" tabindex="-1"/);
  assert.match(html, /class="skip-link" href="#main"/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  if (!file.endsWith("/404.html"))
    assert.match(
      html,
      /<link rel="canonical" href="https:\/\/rethinkredaction\.org\//,
    );
  assert.doesNotMatch(
    html,
    /\s(?:style|onclick|onload)="|<style\b|<iframe\b|<form\b/,
  );
  assert.doesNotMatch(html, /<script\b(?![^>]*\bsrc=)/);
  for (const [, tag, attrs] of html.matchAll(
    /<(a|link|script|img)\b([^>]+)>/g,
  )) {
    if (tag === "img") assert.match(attrs, /\balt="[^"]*"/);
    const match = attrs.match(/(?:href|src)="([^"]+)"/);
    if (!match) continue;
    const url = new URL(match[1], "https://rethinkredaction.org" + route);
    if (url.origin !== "https://rethinkredaction.org") {
      assert.equal(tag, "a", "Only source hyperlinks may leave the site");
      continue;
    }
    let target = resolve(root, "." + decodeURIComponent(url.pathname));
    assert.ok(target.startsWith(root + "/") || target === root);
    if ((await stat(target)).isDirectory())
      target = resolve(target, "index.html");
    assert.ok((await stat(target)).isFile(), "Missing asset " + url.pathname);
    if (url.hash) {
      const targetHtml = await read(target);
      assert.ok(
        targetHtml.includes(
          'id="' + decodeURIComponent(url.hash.slice(1)) + '"',
        ),
        "Missing fragment " + url.href,
      );
    }
    links++;
  }
  if (file.endsWith("/404.html"))
    assert.match(html, /name="robots" content="noindex, nofollow"/);
}
const home = await read(resolve(root, "index.html"));
assert.equal(
  (home.match(/<span class="sr-only">\[withheld\]<\/span>/g) || []).length,
  10,
);
assert.match(
  home,
  /class="comparison-controls" hidden/,
  "No-JS view must hide inactive controls",
);
assert.match(home, /<noscript>/);
const js = await read(resolve(root, "comparison.js"));
assert.doesNotMatch(
  js,
  /\bfetch\(|XMLHttpRequest|localStorage|sessionStorage|sendBeacon|document\.cookie|innerHTML/,
);
const sitemap = await read(resolve(root, "sitemap-0.xml"));
for (const route of ["", "about/", "contact/", "faq/", "sources/"])
  assert.ok(sitemap.includes("https://rethinkredaction.org/" + route));
assert.ok(!sitemap.includes("/404"));
const headers = await read(resolve(root, "_headers"));
assert.match(headers, /script-src 'self'/);
assert.match(headers, /frame-ancestors 'none'/);
assert.match(headers, /connect-src 'none'/);
const sizes = [];
for (const path of all) {
  const bytes = await readFile(path);
  sizes.push({
    file: relative(root, path),
    bytes: bytes.length,
    gzip: gzipSync(bytes).length,
  });
}
const css = sizes.find((x) => x.file.endsWith(".css"));
const runtime = sizes.find((x) => x.file === "comparison.js");
assert.ok(css.bytes < 25000, "CSS budget 25 kB");
assert.ok(runtime.bytes < 5000, "Comparison JavaScript budget 5 kB");
const report = {
  pages: pages.length,
  localLinksAndAssetsChecked: links,
  css,
  comparisonScript: runtime,
  totalBuildBytes: sizes.reduce((s, x) => s + x.bytes, 0),
  checks:
    "Routes, links, fragments, metadata, headings, skip links, static fallback, CSP compatibility, no outbound data code, and size budgets passed.",
};
console.log(JSON.stringify(report, null, 2));
