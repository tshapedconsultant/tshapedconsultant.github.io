# tshapedconsultant.com

Site for [Andrés Lage Freire](https://tshapedconsultant.com/) — AI Governance Engineering.

## Hosting

**Canonical host is GitHub Pages**, not Netlify.

- Repository: [tshapedconsultant/tshapedconsultant.github.io](https://github.com/tshapedconsultant/tshapedconsultant.github.io)
- Custom domain: `tshapedconsultant.com` (`CNAME` in `public/CNAME`)
- DNS: apex A records on `185.199.x` (GitHub Pages); `www` CNAME to `tshapedconsultant.github.io`
- Live responses send `Server: GitHub.com`
- Deploy: push `main` → `.github/workflows/pages.yml` builds with Vite and publishes `dist`

Vite `base` must stay `'/'`. A repo-name base (`/tshapedconsultant.github.io/`) would break CSS and JS on the custom domain.

`dist/404.html` is a **copy of `index.html`**, not a redirect to `/`. That SPA fallback is what makes nested routes such as `/governance/eu-ai-act-mapping` work on Pages. Do not replace it with a naive “send everything home” redirect.

### Why Pages, not Netlify

The site already deploys from this GitHub repo. Mixing Netlify (`netlify.toml`, `public/_headers`, `public/_redirects`) with Pages caused two implied hosts and headers that Pages never sends. Those Netlify files were **removed**.

GitHub Pages does not honour `_headers`. The live Content-Security-Policy is the **`<meta http-equiv="Content-Security-Policy">` in `index.html`**. Formspree must stay in `connect-src` and `form-action`. The JSON-LD block is an inline script; its SHA-256 belongs in `script-src` (`npm run csp:hash` after any JSON-LD or inline-script change).

If you migrate to Netlify later, restore HTTP headers there (`X-Frame-Options`, `frame-ancestors`, CSP, HSTS). Copy the current meta CSP as the starting policy and add `frame-ancestors 'none'` (headers only). Until then, do not reintroduce Netlify config in this repo.

## Local

```bash
npm ci
npm run dev
```

Dev server: http://localhost:5174

```bash
npm run build
npm run preview
```

Enquiry form: set `VITE_FORM_ENDPOINT` (Formspree) in `.env` locally and as the `VITE_FORM_ENDPOINT` GitHub Actions secret for production.

## Search Console and Bing

After each deploy that changes routes or `sitemap.xml`:

1. [Google Search Console](https://search.google.com/search-console) — property `https://tshapedconsultant.com/`
2. Confirm ownership (HTML file or DNS TXT). The domain already points at GitHub Pages.
3. Sitemaps → submit `https://tshapedconsultant.com/sitemap.xml`
4. URL inspection → request indexing for `/`, `/whitepaper`, `/hybrid-profiles`, `/agentic-ai-montesquieu`, `/governance/eu-ai-act-mapping`
5. [Bing Webmaster Tools](https://www.bing.com/webmasters) — add the same property and submit the same sitemap

`robots.txt` allows crawlers (including GPTBot and ClaudeBot) and points at the XML sitemap.

## Routes

| Path | Content |
| --- | --- |
| `/` | Home (English, canonical) |
| `/es/` | Home (Spanish) |
| `/whitepaper` | Whitepaper (legacy `#whitepaper` redirects here) |
| `/es/whitepaper` | Spanish whitepaper landing + PDF |
| `/hybrid-profiles` | Essay |
| `/es/hybrid-profiles` | Spanish intro + link to English essay |
| `/agentic-ai-montesquieu` | Essay |
| `/es/agentic-ai-montesquieu` | Spanish essay |
| `/governance/eu-ai-act-mapping` | EU AI Act mapping |
| `/es/governance/eu-ai-act-mapping` | Spanish mapping page |

The header language switcher (EN | ES) keeps the current page. Hash URLs such as `/#whitepaper` and `/es#whitepaper` still work; they replace to the path routes above.

A Calendly booking link can be added later when a real URL exists. The hero already has **Discuss an AI Governance Diagnostic**.
