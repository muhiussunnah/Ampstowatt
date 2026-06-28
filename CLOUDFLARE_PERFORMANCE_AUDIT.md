# Cloudflare Performance Audit

Date: 2026-06-28

## Findings

- `https://www.ampstowatt.com/` returns `CF-Cache-Status: DYNAMIC` for HTML.
- Redirect responses such as `/amps-to-watts-calculator/` also return `CF-Cache-Status: DYNAMIC`.
- Hashed assets under `/_astro/` return `CF-Cache-Status: HIT`.
- Generated sitemap and HTML do not link to the redirected legacy URLs that were tested.
- The only Pages Function is `functions/_middleware.js`, and it exists only to redirect `ampstowatt.pages.dev` to `www.ampstowatt.com`.

## Repo Changes

- Added explicit HTML cache directives in `dist/_headers`.
- Added `dist/_routes.json` so Pages Functions skip immutable/static assets.

## Cloudflare Changes Needed

1. Create a Bulk Redirect:
   - Source: `https://ampstowatt.pages.dev/*`
   - Target: `https://www.ampstowatt.com/${1}`
   - Status: `301`
   - Preserve query string: enabled

2. After the Bulk Redirect is active, remove `functions/_middleware.js`.
   This lets Cloudflare Pages serve static HTML without the request going through middleware.

3. Create a Cache Rule for static HTML:
   - Expression:
     `(http.host eq "www.ampstowatt.com" and not starts_with(http.request.uri.path, "/_astro/") and not http.request.uri.path contains ".")`
   - Cache eligibility: eligible for cache / cache everything
   - Edge TTL: respect origin if available, otherwise 1 day
   - Browser TTL: respect origin

4. Purge Cloudflare cache after deploy.

## Expected Result

- HTML should move from `CF-Cache-Status: DYNAMIC` to `MISS` on first request and `HIT` on repeat requests.
- Legacy 301 paths should either be cached at the edge or handled by Bulk Redirects instead of Pages middleware.
- Google crawl average response time should trend down after Googlebot recrawls the cached canonical and redirected URLs.
