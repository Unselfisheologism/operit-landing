// End-to-end: type email into the Substack embed, submit, capture result
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL_ = "http://localhost:5211/";
const EMAIL = process.argv[2] || `nl.e2e.${Date.now()}@gmail.com`;

const profile = mkdtempSync(join(tmpdir(), "chrome-nl2-"));
const chrome = spawn(CHROME, [
  `--user-data-dir=${profile}`, "--headless=new", "--disable-gpu",
  "--no-first-run", "--no-default-browser-check", "--remote-debugging-port=0",
  "--window-size=1440,1400", "--hide-scrollbars", URL_,
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
const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const sock = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
let id = 0; const pend = new Map();
sock.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data.toString());
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
});
await new Promise((r) => sock.addEventListener("open", r, { once: true }));
const send = (method, params = {}) => new Promise((res) => {
  const i = ++id; pend.set(i, res); sock.send(JSON.stringify({ id: i, method, params }));
});
async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value ?? null;
}

await send("Page.enable");
await new Promise((r) => setTimeout(r, 2500));
await evalJs(`document.querySelector('footer')?.scrollIntoView({block:'center'})`);
await new Promise((r) => setTimeout(r, 4500));

// The Substack iframe is cross-origin: drive its DOM through the iframe element
// is blocked, so use CDP to find the OOPIF/child target instead.
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
console.log("TARGETS:", targets.map((t) => `${t.type}:${(t.url || "").slice(0, 60)}`).join(" | "));
const subTarget = targets.find((t) => (t.url || "").includes("substack.com"));
if (!subTarget) {
  console.log("NO SUBSTACK TARGET FOUND — cannot drive the form");
} else {
  const s2 = new WebSocket(subTarget.webSocketDebuggerUrl);
  let id2 = 0; const pend2 = new Map();
  s2.addEventListener("message", (ev) => {
    const m = JSON.parse(ev.data.toString());
    if (m.id && pend2.has(m.id)) { pend2.get(m.id)(m); pend2.delete(m.id); }
  });
  await new Promise((r) => s2.addEventListener("open", r, { once: true }));
  const send2 = (method, params = {}) => new Promise((res) => {
    const i = ++id2; pend2.set(i, res); s2.send(JSON.stringify({ id: i, method, params }));
  });
  async function evalIn(expr) {
    const r = await send2("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
    return r.result?.result?.value ?? JSON.stringify(r).slice(0, 200);
  }

  // Fill the email input and click Subscribe inside the Substack iframe
  console.log("HAS INPUT:", await evalIn(`!!document.querySelector('input[type="email"]')`));
  console.log("SET VALUE:", await evalIn(`(() => {
    const inp = document.querySelector('input[type="email"]');
    if (!inp) return false;
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(inp, ${JSON.stringify(EMAIL)});
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    return inp.value;
  })()`));
  console.log("CLICK:", await evalIn(`(() => {
    const btn = [...document.querySelectorAll('button')].find(b => /subscribe/i.test(b.textContent || ''));
    if (!btn) return 'no-button';
    btn.click();
    return 'clicked:' + btn.textContent.trim();
  })()`));

  await new Promise((r) => setTimeout(r, 6000));
  console.log("AFTER SUBMIT URL:", subTarget.url);
  console.log("PAGE STATE:", await evalIn(`({
    success: !!document.querySelector('[class*="success"], [class*="Success"]'),
    bodyText: (document.body.innerText || '').replace(/\\s+/g, ' ').slice(0, 300),
    url: location.href,
  })`));
}
chrome.kill();
process.exit(0);
