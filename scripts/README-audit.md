# Canonical host and accessibility regression checks

## SEO output

```sh
npm run build
npm run test:seo
npm run astro -- check
```

The SEO test inspects every generated HTML page and all text/XML/JSON output for the redirecting `www` host. It validates canonical path and Open Graph parity, parses JSON-LD, checks robots' sitemap declaration, and validates every sitemap URL against an existing generated page's canonical.

## Accessibility without installing browser tooling

Serve built files and QA-only scripts on loopback in separate terminals:

```sh
python3 -m http.server 4317 --bind 127.0.0.1 --directory dist
python3 -m http.server 4318 --bind 127.0.0.1 --directory scripts
```

Open `http://127.0.0.1:4317/` in a browser. Load the helper in DevTools:

```js
const script = document.createElement('script');
script.src = 'http://127.0.0.1:4318/audit-accessibility.js';
const loaded = new Promise((resolve, reject) => {
  script.onload = resolve;
  script.onerror = reject;
});
document.head.append(script);
await loaded;
await auditLousAccessibility();
```

This checks sitemap pages plus the custom 404 at 390px and 1440px, using pinned axe-core 4.10.3 from cdnjs in temporary same-origin frames. Fail the gate if `failures` is nonempty. Full results are available in `window.lousAuditResults`. Run narrower batches with `{paths:['/','/contact/'], widths:[390]}`.

These scripts are not part of the generated website. They make no contact-form submissions. Browser testing must also inspect mobile navigation, FAQ expansion, CTA destinations, and visual appearance. Axe's `incomplete` results still require manual review (e.g. gradients and overlapping content); zero automated violations is not proof of full WCAG conformance or a Lighthouse score of 100.

Production uses `X-Frame-Options: DENY`; do not expect the frame-based local harness to run against live pages. Verify live metadata via HTTP and run axe on the actual top-level live page. Verify the hosting provider's published commit, not merely a successful Git push. Keep the existing www-to-apex redirect.
