#!/usr/bin/env node
// viewport-screenshot: zero-dependency stdio MCP server (newline-delimited JSON-RPC 2.0).
// Tool `screenshot_viewport` renders a URL at an exact CSS viewport (e.g. 390x844 mobile)
// in headless Chrome and returns the PNG.
//
// Why CDP instead of --window-size: headless Chrome clamps the window to ~500px wide, so
// `--screenshot --window-size=390,844` yields a clipped desktop layout. Emulation via the
// DevTools protocol gives a true 390px viewport (correct 100vh, works on pages that send
// X-Frame-Options: DENY, no cropping step). Needs Node 22+ (global WebSocket).
//
// stdout carries protocol messages only; diagnostics go to stderr.
import { execFile } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

const CHROME_PATH = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const SERVER_INFO = { name: 'viewport-screenshot', version: '1.0.0' };
const DEFAULT_PROTOCOL = '2025-06-18';

const TOOL = {
  name: 'screenshot_viewport',
  description:
    'Screenshot an http(s) URL in headless Chrome at an exact CSS viewport size (default 390x844, ' +
    'a phone). Use for mobile/desktop layout checks of a local dev server. Optional scrollY scrolls ' +
    'the page before capture. Returns the PNG and the path it was saved to.',
  inputSchema: {
    type: 'object',
    properties: {
      url: { type: 'string', description: 'http:// or https:// URL to load' },
      width: { type: 'integer', minimum: 200, maximum: 2560, default: 390 },
      height: { type: 'integer', minimum: 200, maximum: 4000, default: 844 },
      scrollY: { type: 'integer', minimum: 0, default: 0, description: 'Vertical scroll offset in CSS px' },
      waitMs: { type: 'integer', minimum: 0, maximum: 15000, default: 3000, description: 'Settle time after load' },
    },
    required: ['url'],
  },
};

const log = (...args) => console.error('[viewport-screenshot]', ...args);
const send = (msg) => process.stdout.write(JSON.stringify(msg) + '\n');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function validateArgs(args = {}) {
  let url;
  try {
    url = new URL(String(args.url ?? ''));
  } catch {
    throw new Error('url must be an absolute http(s) URL');
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`url protocol ${url.protocol} not allowed (http/https only)`);
  }
  const int = (name, def, min, max) => {
    const v = args[name] ?? def;
    if (!Number.isInteger(v) || v < min || v > max) throw new Error(`${name} must be an integer ${min}-${max}`);
    return v;
  };
  return {
    url: url.href,
    width: int('width', 390, 200, 2560),
    height: int('height', 844, 200, 4000),
    scrollY: int('scrollY', 0, 0, 1_000_000),
    waitMs: int('waitMs', 3000, 0, 15000),
  };
}

async function waitForDevToolsPort(profileDir, child, deadline) {
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Chrome exited early (code ${child.exitCode})`);
    try {
      const port = readFileSync(join(profileDir, 'DevToolsActivePort'), 'utf8').split('\n')[0].trim();
      if (port) return port;
    } catch {
      /* not written yet */
    }
    await sleep(100);
  }
  throw new Error('Timed out waiting for Chrome DevTools port');
}

function connectCdp(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    const pending = new Map();
    let nextId = 1;
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      const p = pending.get(msg.id);
      if (!p) return;
      pending.delete(msg.id);
      msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
    };
    ws.onerror = () => reject(new Error('CDP websocket error'));
    ws.onopen = () =>
      resolve({
        call: (method, params = {}) =>
          new Promise((res, rej) => {
            const id = nextId++;
            pending.set(id, { resolve: res, reject: rej });
            ws.send(JSON.stringify({ id, method, params }));
          }),
        close: () => ws.close(),
      });
  });
}

async function screenshotViewport(rawArgs) {
  const { url, width, height, scrollY, waitMs } = validateArgs(rawArgs);
  if (typeof WebSocket === 'undefined') throw new Error('Node 22+ required (global WebSocket)');

  const profileDir = mkdtempSync(join(tmpdir(), 'viewport-screenshot-profile-'));
  const deadline = Date.now() + waitMs + 30000;
  const child = execFile(
    CHROME_PATH,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=0',
      `--user-data-dir=${profileDir}`,
      'about:blank',
    ],
    { timeout: waitMs + 35000, windowsHide: true },
    () => {},
  );
  let cdp;
  try {
    const port = await waitForDevToolsPort(profileDir, child, deadline);
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const page = targets.find((t) => t.type === 'page');
    if (!page) throw new Error('No page target in headless Chrome');
    cdp = await connectCdp(page.webSocketDebuggerUrl);
    await cdp.call('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await cdp.call('Page.enable');
    const nav = await cdp.call('Page.navigate', { url });
    if (nav.errorText) throw new Error(`Navigation to ${url} failed: ${nav.errorText}`);
    await sleep(waitMs);
    if (scrollY > 0) {
      await cdp.call('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' })`,
      });
      // Let scroll-triggered entrance animations (~1s on jamcraft.io) finish.
      await sleep(1500);
    }
    const { data } = await cdp.call('Page.captureScreenshot', { format: 'png' });
    const outPath = join(tmpdir(), `viewport-${width}x${height}-y${scrollY}-${Date.now()}.png`);
    writeFileSync(outPath, Buffer.from(data, 'base64'));
    return { data, outPath };
  } finally {
    cdp?.close();
    child.kill();
    await sleep(300);
    try {
      rmSync(profileDir, { recursive: true, force: true });
    } catch (e) {
      log('could not remove temp profile', profileDir, e.message);
    }
  }
}

async function callTool(params = {}) {
  if (params.name !== TOOL.name) {
    return { isError: true, content: [{ type: 'text', text: `Unknown tool: ${params.name}` }] };
  }
  try {
    const { data, outPath } = await screenshotViewport(params.arguments);
    return {
      content: [
        { type: 'image', data, mimeType: 'image/png' },
        { type: 'text', text: `saved to ${outPath}` },
      ],
    };
  } catch (e) {
    return { isError: true, content: [{ type: 'text', text: e.message }] };
  }
}

async function handle(msg) {
  const { id, method, params } = msg;
  const isRequest = id !== undefined && id !== null;
  const reply = (result) => isRequest && send({ jsonrpc: '2.0', id, result });
  switch (method) {
    case 'initialize':
      return reply({
        protocolVersion: params?.protocolVersion || DEFAULT_PROTOCOL,
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      });
    case 'ping':
      return reply({});
    case 'tools/list':
      return reply({ tools: [TOOL] });
    case 'tools/call':
      return reply(await callTool(params));
    default:
      if (method?.startsWith('notifications/')) return; // notifications get no reply
      if (isRequest) send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
  }
}

createInterface({ input: process.stdin }).on('line', (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
  }
  handle(msg).catch((e) => {
    log('handler error', e);
    if (msg.id !== undefined) send({ jsonrpc: '2.0', id: msg.id, error: { code: -32603, message: e.message } });
  });
});
log(`ready (chrome: ${CHROME_PATH})`);
