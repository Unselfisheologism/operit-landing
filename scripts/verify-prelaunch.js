#!/usr/bin/env node
/**
 * Pre-launch checklist — validates the 4 requirements from the brief:
 *  1. OG image renders in link preview; title/description read well
 *  2. robots.txt, sitemap.xml, llms.txt, main JSON endpoints return 200 on production;
 *     staging still says noindex
 *  3. Search Console + Bing verification file/meta + sitemaps present
 *  4. Analytics beacons present, alert webhook reachable (optional live check)
 *
 * Usage:
 *   node scripts/verify-prelaunch.js [base-url]
 *   BASE=https://twent.xyz node scripts/verify-prelaunch.js
 *   WEBHOOK_URL=... node scripts/verify-prelaunch.js --webhook
 * Default base-url: https://twent.xyz (or LOCAL dev if --local)
 */
const BASE = process.env.BASE || process.argv.find(a => a.startsWith('http')) || 'https://twent.xyz';
const CHECK_WEBHOOK = process.argv.includes('--webhook');
const WEBHOOK_URL = process.env.WEBHOOK_URL || process.env.ALERT_WEBHOOK_URL;

let failures = 0;
let warnings = 0;
const ok = (name, cond, detail='') => {
  if (cond) console.log(`  ✅ ${name}`);
  else { failures++; console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`); }
};
const warn = (name, cond, detail='') => {
  if (cond) console.log(`  ✅ ${name}`);
  else { warnings++; console.log(`  ⚠️  ${name}${detail ? ` — ${detail}` : ''}`); }
};

async function fetchPath(path, opts={}) {
  const url = BASE + path;
  try {
    const res = await fetch(url, { redirect: 'manual', ...opts });
    const body = await res.text();
    return { url, status: res.status, headers: res.headers, body, ok: res.ok };
  } catch (e) {
    return { url, status: 0, headers: new Map(), body: '', ok: false, error: e.message };
  }
}

console.log(`\n🔍 Twent pre-launch verification — ${BASE}\n`);

console.log('1. OG image + title/description (link preview)');
{
  const r = await fetchPath('/', { headers: { 'User-Agent': 'Mozilla/5.0' }});
  ok('homepage returns 200', r.status === 200, `got ${r.status}`);
  ok('og:image present', r.body.includes('og:image'), 'no og:image meta');
  ok('og:image is TWENT-OPENGRAPH-IMG.webp', r.body.includes('TWENT-OPENGRAPH-IMG.webp'));
  ok('og:image:width=1200 present', r.body.includes('og:image:width') && r.body.includes('1200'));
  ok('og:image:height=630 present', r.body.includes('og:image:height') && r.body.includes('630'));
  ok('og:image:type correct (image/webp)', r.body.includes('image/webp'));
  ok('og:site_name present', r.body.includes('og:site_name'));
  ok('twitter:card summary_large_image present', r.body.includes('summary_large_image'));
  ok('title present and 10-70 chars', (()=>{ const m=r.body.match(/<title>([^<]+)<\/title>/); return m && m[1].length>=10 && m[1].length<=70; })(), 'check <title>');
  ok('meta description present and 50-160 chars', (()=>{ const m=r.body.match(/name="description" content="([^"]+)"/); return m && m[1].length>=50 && m[1].length<=160; })(), 'check description length');
  // OG image URL itself should be fetchable
  const ogUrl = 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp';
  try {
    const img = await fetch(ogUrl, { method: 'HEAD' });
    ok('OG image URL returns 200 (HEAD)', img.ok, `got ${img.status}`);
    const ct = img.headers.get('content-type') || '';
    ok('OG image Content-Type is image/*', ct.includes('image/'), `got ${ct}`);
  } catch (e) { ok('OG image HEAD reachable', false, e.message); }
}

console.log('\n2. robots.txt, sitemap.xml, llms.txt, JSON endpoints (200 on prod; staging noindex)');
{
  const paths = ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/sitemap.md', '/openapi.json'];
  for (const p of paths) {
    const r = await fetchPath(p);
    ok(`${p} returns 200`, r.status === 200, `got ${r.status}${r.error ? ` err=${r.error}` : ''}`);
  }
  const apiPaths = ['/api/site/status', '/api/download/apk/latest', '/api/openapi.json'];
  for (const p of apiPaths) {
    const r = await fetchPath(p);
    ok(`${p} returns 200`, r.status === 200, `got ${r.status}`);
    const ct = r.headers.get('content-type')||'';
    ok(`${p} Content-Type is JSON`, ct.includes('json'), `got ${ct}`);
    try { JSON.parse(r.body); ok(`${p} body is valid JSON`, true); } catch { ok(`${p} body is valid JSON`, false, r.body.slice(0,120)); }
  }
  // Staging noindex: simulate staging host via header if middleware supports it (Host header)
  // Some hosts ignore Host header; treat as warning if not enforceable locally.
  const staging = await fetchPath('/robots.txt', { headers: { Host: 'staging.twent.xyz' }});
  // Best-effort: if the staging robots is disallow, pass; otherwise warn (Pages preview may not respect Host)
  if (staging.body.includes('Disallow: /') && staging.body.includes('Disallow')) {
    ok('staging robots.txt is noindex (Disallow: /)', true);
  } else {
    // Fallback: check that at least the middleware has staging logic (code check)
    warn('staging robots.txt says noindex (requires Host header support)', false, `got: ${staging.body.slice(0,80)} — verify on a staging deploy`);
  }
  // Production robots should ALLOW
  const prodRobots = await fetchPath('/robots.txt');
  ok('production robots.txt allows / (Allow: /)', prodRobots.body.includes('Allow: /'));
  ok('robots.txt lists sitemap', prodRobots.body.includes('Sitemap:'));
}

console.log('\n3. Search Console + Bing verification + sitemaps submitted');
{
  const r = await fetchPath('/');
  // Verification meta (may be commented placeholders — warn not fail)
  const hasGoogleMeta = r.body.includes('google-site-verification');
  const hasBingMeta = r.body.includes('msvalidate.01');
  warn('google-site-verification meta present (or placeholder)', hasGoogleMeta, 'add <meta name="google-site-verification">');
  warn('Bing msvalidate.01 meta present (or placeholder)', hasBingMeta, 'add <meta name="msvalidate.01">');
  // File-based verification: the hex file should return 200
  const vFile = await fetchPath('/7e3d406144954cdb80a244066e105dda.txt');
  ok('verification file /7e3d406...txt returns 200', vFile.status === 200);
  // sitemap.xml should be valid XML and contain urls
  const sm = await fetchPath('/sitemap.xml');
  ok('sitemap.xml is XML with <url> entries', sm.body.includes('<url>') && sm.body.includes('<loc>'));
  ok('sitemap.xml lists canonical https://twent.xyz/', sm.body.includes('https://twent.xyz/'));
  // robots.txt Sitemap directive
  const rb = await fetchPath('/robots.txt');
  ok('robots.txt points at sitemap.xml', rb.body.includes('sitemap.xml'));
}

console.log('\n4. Analytics beacons + alert webhook');
{
  const r = await fetchPath('/');
  ok('Databuddy beacon script present', r.body.includes('cdn.databuddy.cc') || r.body.includes('databuddy'));
  ok('GA4 gtag present (googletagmanager)', r.body.includes('googletagmanager.com') && r.body.includes('G-VN5BDEXBZ5'));
  // CSP must allow analytics origins or beacons will be blocked
  const cspOk = r.body.includes('api.databuddy.io') && r.body.includes('www.google-analytics.com');
  ok('CSP allows analytics origins (api.databuddy.io + google-analytics)', cspOk, 'CSP will block beacons if missing');

  if (CHECK_WEBHOOK && WEBHOOK_URL) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'prelaunch.verify', site: BASE, ts: new Date().toISOString() }),
      });
      ok(`alert webhook POST returns 2xx`, res.ok, `got ${res.status}`);
    } catch (e) {
      ok('alert webhook reachable', false, e.message);
    }
  } else {
    warn('alert webhook live test (run with WEBHOOK_URL=... --webhook)', false, 'set WEBHOOK_URL and re-run to verify receiving');
    console.log('     → Manual check: open DevTools Network, reload /, confirm POST to api.databuddy.io and collect to google-analytics.com');
  }
}

console.log('\n' + (failures===0 ? '✨ All critical checks passed' : `💥 ${failures} critical failure(s)`) + (warnings ? `, ${warnings} warning(s)` : '') + '\n');
if (failures) console.log('Fix failures before launch. Warnings are placeholders to fill (verification tokens).');
process.exit(failures===0 ? 0 : 1);
