// Drive a real (non-headless-style) Chrome: submit the substack form via keyboard
// events in the iframe target, and capture network responses. Also test whether
// headless detection is the issue by using --headless=old vs new is moot; instead
// this run types like a human and reports every /api/v1/free response.
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EMAIL = `nl.kbd.${Date.now()}@gmail.com`;

const profile = mkdtempSync(join(tmpdir(), "chrome-nl4-"));
const chrome = spawn(CHROME, [
  `--user-data-dir=${profile}`,
  // no --headless flag: use a tiny windowed browser if display allows, else headless
  ...(process.env.NL_HEADLESS ? ["--headless=new"] : ["--window-position=-32000,-32000"]),
  "--disable-gpu", "--no-first-run", "--remote-debugging-port=0",
  "--window-size=1440,1400", "--hide-scrollbars", "--no-sandbox",
  "http://localhost:5211/",
], { stdio: ["ignore", "ignore", "pipe"] });
let stderr = "";
chrome.stderr.on("data", (d) => (stderr += d.toString()));
const wsUrl = await new Promise((res, rej) => {
  const t0 = Date.now();
  const iv = setInterval(() => {
    const m = stderr.match(/DevTools listening on (ws:\/\/\S+)/);
    if (m) { clearInterval(iv); res(m[1]); }
    else if (Date.now() - t0 > 20000) { clearInterval(iv); rej(new Error("no ws: " + stderr.slice(-200))); }
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
console.log("SUB TARGET:", !!sub);
const s2 = new WebSocket(sub.webSocketDebuggerUrl);
let id2 = 0; const pend2 = new Map(); const responses = [];
s2.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data.toString());
  if (m.id && pend2.has(m.id)) { pend2.get(m.id)(m); pend2.delete(m.id); }
  if (m.method === "Network.responseReceived" && /api\/v1\/free/.test(m.params.response.url)) {
    responses.push({ url: m.params.response.url.slice(0, 80), status: m.params.response.status });
  }
});
await new Promise((r) => s2.addEventListener("open", r, { once: true }));
const send2 = (method, params = {}) => new Promise((res) => {
  const i = ++id2; pend2.set(i, res); s2.send(JSON.stringify({ id: i, method, params }));
});
await send2("Network.enable");

// Focus input via CDP DOM (real focus + typed keys)
const doc = await send2("DOM.getDocument");
const inpNode = await send2("DOM.querySelector", { nodeId: doc.result.root.nodeId, selector: 'input[type="email"]' });
console.log("INPUT NODE:", inpNode.result.nodeId > 0);
await send2("DOM.focus", { nodeId: inpNode.result.nodeId });
for (const ch of EMAIL) {
  await send2("Input.dispatchKeyEvent", { type: "keyDown", text: ch });
  await send2("Input.dispatchKeyEvent", { type: "keyUp" });
}
await new Promise((r) => setTimeout(r, 500));
console.log("TYPED VALUE:", await evalInHelper());
function evalInHelper() {
  return new Promise(async (resolve) => {
    const r = await send2("Runtime.evaluate", { expression: `document.querySelector('input[type="email"]')?.value`, returnByValue: true });
    resolve(r.result?.result?.value);
  });
}

// Click Subscribe via mouse at button coords
const btnBox = await send2("DOM.getBoxModel", {
  nodeId: (await send2("DOM.getDocument")).result.root.nodeId,
});
const btnQ = await send2("DOM.querySelector", { nodeId: doc.result.root.nodeId, selector: 'button[type="submit"], button' });
const box = await send2("DOM.getBoxModel", { nodeId: btnQ.result.nodeId });
if (box.result) {
  const c = JSON.parse(box.result.model.content);
  const cx = (c[0] + c[4]) / 2, cy = (c[1] + c[5]) / 2;
  console.log("BTN CENTER:", Math.round(cx), Math.round(cy));
  await send2("Input.dispatchMouseEvent", { type: "mousePressed", x: cx, y: cy, button: "left", clickCount: 1 });
  await send2("Input.dispatchMouseEvent", { type: "mouseReleased", x: cx, y: cy, button: "left", clickCount: 1 });
} else {
  console.log("NO BTN BOX — fallback click()");
  await evalJs(`0`);
}
await new Promise((r) => setTimeout(r, 7000));
console.log("RESPONSES:", JSON.stringify(responses));
const state = await (async () => {
  const r = await send2("Runtime.evaluate", { expression: `document.body.innerText.replace(/\\s+/g,' ').slice(0,250)`, returnByValue: true });
  return r.result?.result?.value;
})();
console.log("FINAL:", state);
chrome.kill();
process.exit(0);
