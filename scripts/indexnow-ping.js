#!/usr/bin/env node
/**
 * indexnow-ping.js — notify Bing/IndexNow that twent.xyz pages changed.
 *
 * ChatGPT search runs on the Bing index, so pinging IndexNow after each deploy
 * is how new/updated pages reach ChatGPT answers quickly (Gamma growth-hack #6).
 *
 * Usage:
 *   node scripts/indexnow-ping.js                     # ping homepage + key pages
 *   node scripts/indexnow-ping.js /vs/claude /pricing # ping specific paths
 *
 * The key file public/cd5287f369272c04383b923b454c5748.txt must be deployed
 * before this works — IndexNow fetches it to verify ownership.
 */

const KEY = "cd5287f369272c04383b923b454c5748";
const HOST = "twent.xyz";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const defaults = [
  "/",
  "/pricing",
  "/docs",
  "/blog",
  "/best-android-ai",
  "/ai-agent-for-developers",
  "/android-automation-power-user",
  "/privacy-first-ai-android",
  "/terminal-on-android",
  "/enterprise-ai-agent",
];

const args = process.argv.slice(2);
const paths = args.length ? args : defaults;
const urlList = paths.map((p) => `https://${HOST}${p}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

async function main() {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow ${res.status} — pinged ${urlList.length} URL(s)`);
  if (!res.ok) {
    console.error(await res.text().catch(() => ""));
    process.exitCode = 1;
  }
}

main();
