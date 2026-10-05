---
name: validate-jamcraft-site
description: Visual + security validation loop for the Jamcraft portfolio (jamcraft-app/). Use when asked to run a "validation loop", "screenshot the site", "check mobile layout", "verify CSP/security headers locally", deep-link checks, or before shipping/committing any Jamcraft UI, CSP, customHttp.yml or asset change. Covers dev-server screenshots at desktop and true 390px mobile width, an in-page a11y/overflow audit, and a production build served with the real Amplify headers.
---

# Validate the Jamcraft site

Paths below are relative to the repo root unless they start with `cd jamcraft-app`.

## 1. Start the dev server

```bash
cd jamcraft-app && npx vite --port 5199 --strictPort   # run in background
curl -sI http://localhost:5199/ | head -1                # expect 200
```

If the browser shows `does not provide an export named ...` after a file was rewritten
mid-save, HMR is serving a stale module: stop and restart the server (not just reload).

## 2. Screenshots (desktop + mobile)

Preferred: the `viewport-screenshot` MCP server (`.mcp.json`) -> `screenshot_viewport`
`{url, width, height, scrollY, waitMs}`. It emulates the viewport over CDP, so
`width: 390` is a real 390px phone layout (correct `100vh`, works with `X-Frame-Options: DENY`).
- Desktop: `{url: "http://localhost:5199/", width: 1366, height: 768}`
- Mobile: `{url: "http://localhost:5199/", width: 390, height: 844}`, then `scrollY: 900, 1800, ...`

Fallback, plain headless Chrome (desktop only):

```bash
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --hide-scrollbars --virtual-time-budget=5000 --window-size=1366,768 \
  --screenshot=out.png http://localhost:5199/
```

Caveats:
- `--headless=new` clamps window width to ~500px. `--window-size=390,844` gives a CLIPPED
  desktop layout that looks like horizontal overflow but is not. Never judge mobile this way.
- Tall `--window-size` heights inflate the `100vh` hero; keep height at a real screen height.

Fallback, Claude-in-Chrome mobile: `resize_window` is ignored on a maximized window. Instead
inject a same-origin iframe and zoom on it:

```js
const f = Object.assign(document.createElement('iframe'), { src: location.origin + '/' });
f.style.cssText = 'position:fixed;top:0;left:0;width:390px;height:844px;z-index:99999;border:0;background:#000';
document.body.append(f);
// scroll: f.contentWindow.scrollTo(0, 900)
```

then `computer zoom` on region `[0, 0, 390, 844]`.

## 3. In-page audit

Paste `scripts/audit.js` (one expression returning JSON) into `javascript_tool` / DevTools,
at desktop and inside the 390px iframe (`f.contentWindow.eval(<audit.js>)`). It reports:
h1 count, heading outline + skipped levels, images missing `alt`, broken images, eager images
below the fold, unnamed links/buttons, `target=_blank` without `noopener`, duplicate ids, and
horizontal-overflow offenders (outermost elements whose right edge > `clientWidth`).
All arrays empty and `scrollWidth === clientWidth` = pass.

## 4. Production build with real headers

```bash
cd jamcraft-app && npm run build
node ../.claude/skills/validate-jamcraft-site/scripts/preview-with-headers.mjs   # background; PORT=4322 to change
curl -sI http://localhost:4321/ | grep -i content-security-policy                # must be present
```

The script serves `build/` with every header from repo-root `customHttp.yml` (minus HSTS and
`upgrade-insecure-requests`, which break plain-http localhost). Run it from `jamcraft-app/`
so `vite` resolves. Then on http://localhost:4321/:
- Console (`read_console_messages`, pattern `Content Security Policy|Refused`): must be empty.
- `[...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src)` -> `[]`
  (scroll to the bottom first so lazy images load).
- `(await fetch('/')).headers.get('content-security-policy')` -> non-null.
- Screenshot desktop + mobile again via `screenshot_viewport` (works despite `X-Frame-Options: DENY`).

Stop the preview server when done.

## 5. Deep links

Each must land with the section heading at the top, below the sticky header:
- `http://localhost:5199/#podcasts` (and `#projects`, `#workshops`, `#speaking`, `#contact`)
- Legacy `http://localhost:5199/projects` -> URL rewritten to `/#projects`, scrolled to Projects.
  (`/about`, `/testimonials` likewise per `resolveLegacyPath` in `src/config/sections.ts`.)

Check with `location.href` plus `document.getElementById('podcasts').getBoundingClientRect().top`
(small positive number = header height), or a `screenshot_viewport` of the deep-link URL.

## 6. The loop

Repeat per iteration (the project asks for 10):
1. Screenshot desktop (1366x768) and mobile (390x844, a few `scrollY` steps).
2. Run `scripts/audit.js` at both widths.
3. Write down 3 concrete improvements (visual, a11y, perf, security).
4. For each: write a failing test first (`npm test -- --run <file>` shows it red), then fix.
5. `cd jamcraft-app && npm test -- --run && npm run lint && npm run build` - all green.
6. Re-screenshot to confirm the fix; commit one concern per commit.

Record any new gotcha here so the next run does not rediscover it.
