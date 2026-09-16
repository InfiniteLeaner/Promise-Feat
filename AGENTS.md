# AGENTS.md — Promise-Feat (Web Store)

"Promise Feats" online store (shoes/fashion). **The only git repo on this machine.**

## Stack
- Vanilla HTML/CSS/JS — no framework, no build step
- Deployed to Cloudflare Pages: `promise-feat.pages.dev`
- Boxicons + Ionicons CDNs

## Structure
- Page folders: home-page, store-page, design-page, about-us-page, login-page
- `index.html` — entry point
- `cart.js` — cart logic (10KB)
- `welcome-page.css` — shared styles (12KB)
- `welcome-page.js` — shared JS
- `media/` — images (logo, products)

## Conventions
- Vanilla JS, no framework. Follow existing file structure (page folders)
- Shared styles in `welcome-page.css`
- Cart logic in `cart.js`

## Commands
- No build step. Open `index.html` in browser or `python3 -m http.server`
- Check `git status` before editing — active history

## Verification (browser testing via Playwright MCP)
The Playwright MCP server is available in opencode. Use it to verify web
changes without installing anything:
1. Serve locally: `python3 -m http.server 8000` in this directory
2. Use Playwright MCP to navigate to `http://localhost:8000/<page>/`
3. Check: page loads without console errors, navigation works, cart.js
   functions (add/remove items, totals update), responsive layout at
   mobile width (375px), no broken images
4. For accessibility: check keyboard navigation, alt text, contrast

This is the regression-detection loop for this project — run it after any
HTML/CSS/JS change before committing.

## Must not change casually
- `cart.js` — cart logic is load-bearing; changing it breaks the store
- `welcome-page.css` — shared across all pages
- Cloudflare Pages deployment config