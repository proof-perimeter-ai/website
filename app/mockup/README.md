# Proof Perimeter Mockup

This folder contains the isolated clickable mockup app mounted at `/mockup`.

## Routes

- `/mockup` redirects to `/mockup/home`
- `/mockup/home`
- `/mockup/templates`
- `/mockup/workflows`
- `/mockup/models`

## Isolation Rules

- Keep all mockup-specific code inside `website/app/mockup`.
- Do not import marketing-site components such as `SiteNav`, `SiteFooter`, or shared content utilities.
- Keep styles in `mockup.css` and scope them under `.pp-mockup`.
- The mockup builds with the normal website build; there is no separate build process.

## Indexing Controls

The routes are public but should not be indexed:

- `app/mockup/layout.tsx` sets route metadata with `noindex` / `nofollow`.
- `app/robots.ts` disallows `/mockup`.
- `next.config.ts` adds `X-Robots-Tag` headers for `/mockup/:path*`.
- Mockup URLs are intentionally not listed in `app/sitemap.ts`.

These controls are for compliant crawlers. They do not make the public URLs private.

## Removing The Mockup

To remove the mockup later:

1. Delete `website/app/mockup`.
2. Remove the `/mockup` disallow entries from `website/app/robots.ts`.
3. Remove the `/mockup/:path*` header rule from `website/next.config.ts`.
