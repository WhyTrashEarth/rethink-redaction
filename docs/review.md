# Review record — 19 October 2026

## Baseline

- Confirmed repository: https://github.com/WhyTrashEarth/rethink-redaction
- Canonical site from configuration, also inspected live: https://rethinkredaction.org
- Local HEAD and remote main both e2bdcf2d7b6cf095d0c4e9f840672e38997dde7a.
- Clean checkout before edits. Package declaration Astro ^5.17.1; resolved version 5.18.0; sitemap 3.7.0.
- Five static pages; no server adapter, content collections, framework islands, application data collection, or custom Vite plugins.
- Original build passed. Baseline dependency audit: 15 advisories (1 critical, 13 high, 1 low). These counts describe dependencies, not a finding that the public static site was exploitable.
- Original logo and social image existed but were unused. Social metadata pointed to missing /og.png. About lacked an h1; keyboard focus referred to an undefined CSS variable; print styling was absent.
- Existing text presented universal legal claims and unmeasured operational/environmental benefits too confidently. IRES needed an explicit proposal status.

## Migration plan and execution

1. Preserve the clean baseline and identity assets; compare local HEAD with GitHub main.
2. Verify the Astro 6 and 7 migration guides, current registry versions, and Node compatibility.
3. Reproduce the Astro 5 build before changing dependencies.
4. Pin Astro 7.4.0, sitemap 3.7.4, and Atkinson Hyperlegible 5.3.0. Add Astro type checking and pin its dependencies.
5. Build the existing site on Astro 7 before redesign. Its Rust compiler exposed a missing closing html tag; fixing that restored the build.
6. Implement the redesign and source qualifications; retain the existing public route paths and add /sources/.
7. Run build, semantic/asset/route checks, dependency audit, browser interactions, responsive checks, and size budgets. Keep all release actions pending review.

Guide references:

- https://docs.astro.build/en/guides/upgrade-to/v6/
- https://docs.astro.build/en/guides/upgrade-to/v7/
- https://docs.astro.build/en/upgrade-astro/

Astro 7.4.0's registry engine requirement is Node >=22.22.0. This work used Node 24.18.0. No removed content-collection API or custom Vite migration was needed.

## Redesign

Paper and ink, fine rules, numbered document exhibits, the original wordmark, a restrained green comparison surface, and the user-selected Atkinson Hyperlegible. No generic card grid or substitute identity.

Comparison controls use native radios with keyboard support. Solid fill and proposed treatments share the same fictional text and omissions. A static outlined comparison remains when JavaScript is unavailable. Screen-reader labels say only [withheld]; there are no hidden names or secret values.

The environmental mission remains central. Savings are a hypothesis requiring measurements. IRES is explicitly a proposal, and source notes distinguish federal law, court security guidance, and untested project expectations.

## Verification

- Astro type check: 0 errors, 0 warnings, 0 hints across 17 checked files.
- Production build: six HTML pages including the 404.
- Built-site verification: all 101 internal links/assets and fragments checked; headings, skip links, canonical metadata, sitemap, missing-asset checks, no-JavaScript fallback markup, and CSP compatibility passed.
- npm audit after upgrade: 0 reported advisories as checked on this date.
- Local HTTP preview: public routes, original /about redirect, brand assets, script, robots, and sitemap responded successfully; an unknown route returned a 404 with the designed error page.
- The local HTTP preview explicitly applied public/_headers. Browser console showed no CSP or application errors during the checked interactions.
- Keyboard: arrow keys changed radio selection; visible focus rendered; live status updated; skip link moved focus to main.
- Browser responsive checks: widths 320, 375, 768, 1200, and 1440; no horizontal overflow in the home page checks. All secondary routes checked at 320 pixels; the proposal page also inspected at desktop width.
- Self-hosted font loaded; brand image loaded.
- Text contrast: ink/paper 14.41:1, muted/paper 6.32:1, muted/comparison surface 5.65:1, green/paper 7.65:1. Focus/paper 6.10:1; outlined marker/white 5.16:1.
- Comparison JavaScript is about 1.3 kB before compression. CSS is about 15.5 kB before compression. No frontend framework or external runtime request is needed.
- Original logo and social image copies retain their source bytes.

## Review items and verification limits

- Review the design, the IRES description, and the revised public claims.
- Confirm the existing rethinkredaction@amantmail.com inbox is monitored; its address was preserved from the original site. No message was sent.
- No formal assistive-technology audit, Lighthouse lab score, real-user Core Web Vitals, physical printer trial, or emissions assessment is claimed.
- Print and reduced-motion/forced-color styles are included; physical printing and full cross-browser behavior remain unverified.
- The production hosting dashboard, build settings, and header handling were not changed or authenticated. Confirm Node support, npm ci + npm run build, output dist, redirects, and security headers before release.
- Do not push until review: the existing repository may be wired to automatic production deployment.
- At completion of the original design review, no commit, push, deployment, or outreach had been performed. The owner subsequently authorized pushing and deploying on 19 October 2026.

During the original design session, Git metadata was read-only and the configured SSH transport failed. Remote HEAD was verified successfully over HTTPS without changing the remote configuration.

## Portable review artifact

The outputs include an offline preview with inlined fonts, styles, logo, and comparison JavaScript. Its six pages and relative links were checked from the saved files. Browser policy permits only HTTP/HTTPS and blocked direct file-URL inspection, so no browser verification of the offline copy is claimed. The browser checks above apply to the locally served production build with its proposed HTTP security headers.
