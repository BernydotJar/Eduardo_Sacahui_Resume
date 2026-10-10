# Meridian domain deployment handoff

## Requested hostname
`meridian.lch-app.com`

At inspection on 2026-10-09:
- `lch-app.com` returned DNS **NXDOMAIN**. No confirmed ownership or zone access.
- `lch-app.cloud` resolves via Cloudflare and serves HTTPS.
- This change does not imply the .com domain has been purchased, registered or assigned.

## Existing working deployment
The static demo is served by GitHub Pages, independent of a custom domain:
`https://bernydotjar.github.io/Eduardo_Sacahui_Resume/recruiting-demo/`

## Production-grade deployment plan
1. Confirm domain ownership and the authoritative DNS provider for **lch-app.com**.
2. Extract Meridian into its own repository and install a dedicated CI/CD pipeline.
3. Host independently on Firebase Hosting or Cloudflare Pages and bind `meridian.lch-app.com` to that project. Do not attach a second custom domain directly to the existing portfolio GitHub Pages repository, because it is site-wide, not path-scoped.
4. Add the provider-issued DNS records; enable TLS, HTTP-to-HTTPS redirect, security headers, rollback and monitoring.
5. Validate certificate, CNAME/DNS propagation, caching, direct and deep-link navigations (HashRouter), and browser smoke tests.
6. Publish a public demo only with synthetic data. Require authenticated access before any real recruiting/HR data is processed.

No DNS records were modified by this release.
