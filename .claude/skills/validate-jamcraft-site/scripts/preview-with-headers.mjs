// Serves jamcraft-app/build on :4321 with the response headers from the repo-root
// customHttp.yml, so CSP / security-header breakage shows up locally before Amplify.
// Run from jamcraft-app/ (vite is resolved from process.cwd()/node_modules):
//   cd jamcraft-app && npm run build && node ../.claude/skills/validate-jamcraft-site/scripts/preview-with-headers.mjs
// Optional: PORT=4322 to change the port.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const customHttpUrl = new URL('../../../../customHttp.yml', import.meta.url);
const yml = readFileSync(customHttpUrl, 'utf8');

const headers = {};
for (const m of yml.matchAll(/- key: '([^']+)'\s*\n\s*value: (?:'([^']*)'|"([^"]*)")/g)) {
  headers[m[1]] = m[2] ?? m[3];
}
if (!headers['Content-Security-Policy']) {
  console.error(`No Content-Security-Policy found in ${customHttpUrl.pathname}`);
  process.exit(1);
}
// localhost is plain http: HSTS and upgrade-insecure-requests would break loading.
delete headers['Strict-Transport-Security'];
headers['Content-Security-Policy'] = headers['Content-Security-Policy']
  .split(';')
  .map((d) => d.trim())
  .filter((d) => d && d !== 'upgrade-insecure-requests')
  .join('; ');

// Resolve vite's ESM entry from the app's node_modules, not from this script's folder.
const requireFromApp = createRequire(join(process.cwd(), 'package.json'));
let vitePkgPath;
try {
  vitePkgPath = requireFromApp.resolve('vite/package.json');
} catch {
  console.error('Cannot find vite. Run this from jamcraft-app/ after npm install.');
  process.exit(1);
}
const viteEntry = join(dirname(vitePkgPath), 'dist', 'node', 'index.js');
const { preview } = await import(pathToFileURL(viteEntry).href);

const port = Number(process.env.PORT) || 4321;
const server = await preview({ root: process.cwd(), preview: { port, strictPort: true, headers } });
server.printUrls();
console.log('Headers applied:', Object.keys(headers).join(', '));
