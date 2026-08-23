// Verify newsletter embed renders + iframe actually loads Substack
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL_ = process.argv[2] || "http://localhost:5211/";
const SHOT = process.argv[3];

const profile = mkdtempSync(join(tmpdir(), "chrome-nl-"));
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
const page = list.find((t) => t.type === "page");
const sock = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pend = new Map();
sock.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data.toString());
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
});
await new Promise((r) => sock.addEventListener("open", r, { once: true }));
const send = (method, params = {}) => new Promise((res) => {
  const i = ++id; pend.set(i, res); sock.send(JSON.stringify({ id: i, method, params }));
});
const errors = [];
sock.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data.toString());
  if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails.text);
});
await send("Runtime.enable");
// scroll to footer so lazy iframe loads
const scrollExpr = `document.querySelector('footer')?.scrollIntoView({block:'start'}); 'ok'`;
setTimeout(() => {}, 0);

async function evalJs(expr) {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value ?? { err: JSON.stringify(r).slice(0, 300) };
}

await send("Page.enable");
await new Promise((r) => setTimeout(r, 2500));
await evalJs(`document.querySelector('footer')?.scrollIntoView({block:'center'})`);
await new Promise((r) => setTimeout(r, 4000)); // give the substack iframe time to load

const info = await evalJs(`(() => {
  const card = document.querySelector('.drawably-host');
  const nl = document.querySelector('footer .drawably-host');
  const ifr = document.querySelector('iframe[src*="substack.com/embed"]');
  let inner = null;
  if (ifr) {
    try { inner = { ready: !!ifr.contentDocument, title: ifr.contentDocument?.title || null,
      hasInput: !!ifr.contentDocument?.querySelector('input[type="email"]'), len: (ifr.contentDocument?.body?.innerHTML || '').length }; }
    catch (e) { inner = { crossOriginBlocked: e.message }; }
  }
  return {
    newsletterCardExists: !!nl,
    cardHasSvg: !!(nl && nl.querySelector('svg')),
    iframeExists: !!ifr,
    iframeSize: ifr ? [ifr.width, ifr.height].join('x') : null,
    iframeLoaded: ifr ? ifr.getBoundingClientRect().height > 100 : false,
    iframeInner: inner,
    heading: document.querySelector('footer h2')?.textContent || null,
    jsErrors: ${JSON.stringify("PLACEHOLDER_ERRORS")},
  };
})()`);
info.jsErrors = errors.slice(0, 5);
console.log(JSON.stringify(info, null, 1));

if (SHOT) {
  await evalJs(`document.querySelector('footer')?.scrollIntoView({block:'center'})`);
  await new Promise((r) => setTimeout(r, 800));
  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(SHOT, Buffer.from(shot.result.data, "base64"));
  console.log("SHOT:", SHOT);
}
chrome.kill();
process.exit(0);
