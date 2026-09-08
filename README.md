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
4. URL inspection → request indexing for `/`, `/whitepaper/`, `/hybrid-profiles/`, `/agentic-ai-montesquieu/`, `/governance/eu-ai-act-mapping/`, and the Spanish pair `/es/`, `/es/whitepaper/`, `/es/hybrid-profiles/`, `/es/agentic-ai-montesquieu/`, `/es/governance/eu-ai-act-mapping/`
5. Confirm hreflang: each HTML page should advertise `en-GB`, `es`, and `x-default` (English). Google’s Rich Results Test is a manual step in Search Console / the [Rich Results Test](https://search.google.com/test/rich-results) — run it on a Spanish URL after deploy if you want a visual check; the tags are already in `index.html`, nested SPA fallbacks, and `applyDocumentHead`.
6. [Bing Webmaster Tools](https://www.bing.com/webmasters) — add the same property and submit the same sitemap

`robots.txt` allows crawlers (including GPTBot and ClaudeBot) and points at the XML sitemap.

`Gobernanza-Determinista-IA.pdf` is listed in `sitemap.xml` with `lastmod` and linked from `/es/whitepaper/` with a descriptive Spanish title. Do not rewrite the PDF binary unless the Spanish text itself changes.

## Routes

| Path | Content |
| --- | --- |
| `/` | Home (English, canonical) |
| `/es/` | Home (Spanish) |
| `/whitepaper` | Whitepaper (legacy `#whitepaper` redirects here) |
| `/es/whitepaper` | Spanish whitepaper landing + PDF |
| `/hybrid-profiles` | Essay |
| `/es/hybrid-profiles` | Spanish essay (full Castilian; English remains canonical) |
| `/agentic-ai-montesquieu` | Essay |
| `/es/agentic-ai-montesquieu` | Spanish essay |
| `/governance/eu-ai-act-mapping` | EU AI Act mapping |
| `/es/governance/eu-ai-act-mapping` | Spanish mapping page |

The header language switcher (EN | ES) keeps the current path and hash on every route — mapping, whitepaper (including `#s00`), essays, and home `#diagnostic`.

### Spanish locale and partial translation

English remains canonical. Core commercial pages under `/es/` (home, EU AI Act mapping, whitepaper landing) are fully translated into Castilian (Spain). Essays are fully in Spanish when a publication-grade version exists (Montesquieu and hybrid profiles); Medium insight cards keep the English article URLs and use Spanish titles and excerpts until an original Spanish post exists. Mapping statuses stay **Implemented / Reference / Planned**. Keep **EU AI Act**, **ISO**, **DGOM™**, and **compliance-as-code** in English (with a short gloss where needed). Do not invent Spanish client testimonials.

A Calendly booking link can be added later when a real URL exists. The hero already has **Discuss an AI Governance Diagnostic**.
