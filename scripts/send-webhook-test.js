#!/usr/bin/env node
/**
 * Send a test alert to the webhook before traffic arrives.
 * Usage:
 *   WEBHOOK_URL=https://hooks.slack.com/... node scripts/send-webhook-test.js
 *   or pass as arg: node scripts/send-webhook-test.js https://hooks...
 *   Optional: INDEXNOW_KEY=... ALERT_WEBHOOK_URL=...
 *
 * The webhook must respond 2xx. If it doesn't, this script exits 1 so you
 * notice before the launch.
 */
const url = process.argv[2] || process.env.WEBHOOK_URL || process.env.ALERT_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;

if (!url) {
  console.error('Missing webhook URL. Set WEBHOOK_URL env or pass as arg:');
  console.error('  WEBHOOK_URL=https://... node scripts/send-webhook-test.js');
  process.exit(1);
}

const payload = {
  event: 'prelaunch.webhook_test',
  site: 'https://twent.xyz',
  timestamp: new Date().toISOString(),
  message: '✅ Twent pre-launch webhook test — if you see this, alerts are live. Reply ACK before launch.',
  checks: {
    og: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
    robots: 'https://twent.xyz/robots.txt',
    sitemap: 'https://twent.xyz/sitemap.xml',
    llms: 'https://twent.xyz/llms.txt',
    openapi: 'https://twent.xyz/openapi.json',
    status: 'https://twent.xyz/api/site/status',
    apk: 'https://twent.xyz/api/download/apk/latest',
  },
};

console.log(`Sending test event to ${url.replace(/\/\/.*@/, '//***@').slice(0,120)}...`);
try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'twent-prelaunch-check/1.0' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  console.log(`Status: ${res.status} ${res.statusText}`);
  if (text) console.log(`Body: ${text.slice(0, 500)}`);
  if (!res.ok) {
    console.error(`Webhook did not return 2xx — alerts are BROKEN. Fix before traffic.`);
    process.exit(1);
  }
  console.log('✅ Webhook confirmed receiving. Safe to launch.');
} catch (e) {
  console.error('Webhook fetch failed:', e.message);
  console.error('Fix the webhook URL / network before launch.');
  process.exit(1);
}
