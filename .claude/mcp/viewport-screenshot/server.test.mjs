// Run: node --test .claude/mcp/viewport-screenshot/server.test.mjs
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';

let server;
let nextId = 1;
const waiting = new Map();

function request(method, params) {
  const id = nextId++;
  server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout waiting for ${method}`)), 5000);
    waiting.set(id, (msg) => {
      clearTimeout(timer);
      resolve(msg);
    });
  });
}

before(() => {
  server = spawn(process.execPath, [fileURLToPath(new URL('./server.mjs', import.meta.url))], {
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  createInterface({ input: server.stdout }).on('line', (line) => {
    const msg = JSON.parse(line); // stdout must be protocol-only JSON
    waiting.get(msg.id)?.(msg);
  });
});

after(() => server.kill());

test('initialize echoes protocol version and advertises tools', async () => {
  const res = await request('initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'test', version: '0' },
  });
  assert.equal(res.result.protocolVersion, '2025-06-18');
  assert.deepEqual(res.result.capabilities, { tools: {} });
  assert.equal(res.result.serverInfo.name, 'viewport-screenshot');
  server.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
});

test('tools/list includes screenshot_viewport', async () => {
  const res = await request('tools/list', {});
  const tool = res.result.tools.find((t) => t.name === 'screenshot_viewport');
  assert.ok(tool, 'screenshot_viewport listed');
  assert.deepEqual(tool.inputSchema.required, ['url']);
});

test('ping returns empty result', async () => {
  const res = await request('ping');
  assert.deepEqual(res.result, {});
});

for (const url of ['javascript:alert(1)', 'file:///C:/Windows/win.ini', 'data:text/html,hi', 'not a url']) {
  test(`tools/call rejects ${url}`, async () => {
    const res = await request('tools/call', { name: 'screenshot_viewport', arguments: { url } });
    assert.equal(res.result.isError, true);
  });
}

test('tools/call rejects out-of-range width', async () => {
  const res = await request('tools/call', {
    name: 'screenshot_viewport',
    arguments: { url: 'http://localhost:1/', width: 50 },
  });
  assert.equal(res.result.isError, true);
  assert.match(res.result.content[0].text, /width/);
});

test('unknown method returns JSON-RPC -32601', async () => {
  const res = await request('nope/nothing');
  assert.equal(res.error.code, -32601);
});
