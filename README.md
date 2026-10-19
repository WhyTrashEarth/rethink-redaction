# Rethink Redaction

A static, document-inspired environmental proposal built with Astro 7.4.0 and self-hosted Atkinson Hyperlegible. Canonical site: https://rethinkredaction.org.

## Local development

Use Node 24.18.0 (the version in .nvmrc), or a compatible release satisfying Astro's Node >=22.22.0 requirement.

- `npm ci`
- `npm run dev`
- `npm run check`
- `npm run build`
- `npm run verify:build`
- `npm run preview`

The production output is `dist/`. No adapter, database, account, server runtime, environment secret, or external font request is required.

## Content and identity

The existing logo, social image, and favicon are retained. Original assets remain in `src/assets/`; exact copies of the logo and social image are served from `public/brand/`. The font license is in `public/licenses/`.

The fictional comparison follows the original dog/cat/sandwich motif. Withheld content does not exist in the source. The demonstration is not a redaction tool and never accepts documents.

IRES is a proposed framework, not a certified or adopted standard. Legal claims must remain jurisdiction-specific. No quantified material, cost, emissions, staffing, maintenance, or backlog savings have been measured by this project.

## Review and release

See `docs/review.md` for the audit, migration sequence, checks, and remaining review items. Do not push to an auto-deploy branch, publish, or send outreach without the owner's review.

The static `public/_headers` file supplies a restrictive policy for hosting that supports this convention, including Cloudflare Pages. Astro's ordinary local preview does not apply these HTTP headers. Confirm the actual host's handling, Node version, build command, route redirects, and 404 behavior before releasing.

No deployment command or hosting-account credentials are included.
