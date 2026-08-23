// E2E with CDP Network capture on the substack iframe target
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EMAIL = `nl.net.${Date.now()}@gmail.com`;

const profile = mkdtempSync(join(tmpdir(), "chrome-nl3-"));
const chrome = spawn(CHROME, [
  `--user-data-dir=${profile}`, "--headless=new", "--disable-gpu",
  "--no-first-run", "--remote-debugging-port=0",
  "--window-size=1440,1400", "--hide-scrollbars",
  "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "http://localhost:5211/",
], { stdio: ["ignore", "ignore", "pipe"] });
let stderr = "";
chrome.stderr.on("data", (d) => (stderr += d.toString()));
const wsUrl = await new Promise((res, rej) => {
  const t0 = Date.now();
  const iv = setInterval(() => {
    const m = stderr.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) { clearInterval(iv); res(m[1]); }
    else if (Date.now() - t0 > 20000) { clearInterval(iv); rej(new Error("no ws")); }
  }, 200);
});
const port = wsUrl.match(/:(\d+)\//)[1];

const sock = new WebSocket((await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page").webSocketDebuggerUrl);
let id = 0; const pend = new Map();
sock.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data.toString());
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
});
await new Promise((r) => sock.addEventListener("open", r, { once: true }));
const send = (method, params = {}) => new Promise((res) => {
  const i = ++id; pend.set(i, res); sock.send(JSON.stringify({ id: i, method, params }));
});
await send("Page.enable");
await new Promise((r) => setTimeout(r, 2500));
const evalJs = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true })).result?.result?.value;
await evalJs(`document.querySelector('footer')?.scrollIntoView({block:'center'})`);
await new Promise((r) => setTimeout(r, 5000));

const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const sub = targets.find((t) => (t.url || "").includes("substack.com"));
const s2 = new WebSocket(sub.webSocketDebuggerUrl);
let id2 = 0; const pend2 = new Map(); const responses = [];
s2.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data.toString());
  if (m.id && pend2.has(m.id)) { pend2.get(m.id)(m); pend2.delete(m.id); }
  if (m.method === "Network.responseReceived" && /api\/v1\/free/.test(m.params.response.url)) {
    responses.push({ url: m.params.response.url, status: m.params.response.status, requestId: m.params.requestId });
  }
});
await new Promise((r) => s2.addEventListener("open", r, { once: true }));
const send2 = (method, params = {}) => new Promise((res) => {
  const i = ++id2; pend2.set(i, res); s2.send(JSON.stringify({ id: i, method, params }));
});
await send2("Network.enable");
const evalIn = async (expr) => (await send2("Runtime.evaluate", { expression: expr, returnByValue: true })).result?.result?.value;

await evalIn(`(() => {
  const inp = document.querySelector('input[type="email"]');
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(inp, ${JSON.stringify(EMAIL)});
  inp.dispatchEvent(new Event('input', { bubbles: true }));
  inp.dispatchEvent(new Event('change', { bubbles: true }));
  return inp.value;
})()`);
await new Promise((r) => setTimeout(r, 1000));
await evalIn(`[...document.querySelectorAll('button')].find(b => /subscribe/i.test(b.textContent || ''))?.click()`);
await new Promise((r) => setTimeout(r, 7000));

console.log("API RESPONSES:", JSON.stringify(responses));
for (const r of responses.filter((x) => x.status !== 302)) {
  const body = await send2("Network.getResponseBody", { requestId: r.requestId });
  console.log(`STATUS ${r.status}:`, (body.result?.body || "").slice(0, 300));
}
console.log("FINAL TEXT:", (await evalIn(`document.body.innerText.replace(/\\s+/g,' ')`)).slice(0, 250));
chrome.kill();
process.exit(0);
