#!/usr/bin/env node
/**
 * Agent-readiness verification tests.
 * Run against a deployed URL: node scripts/verify-agent-readiness.js [base-url]
 * Default base-url: http://localhost:8788 (wrangler pages dev)
 */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = process.argv[2] || 'http://127.0.0.1:8788';

let failures = 0;
function check(name, cond, detail = '') {
  if (cond) console.log(`  ✅ ${name}`);
  else { failures++; console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`); }
}

async function fetchPath(path, opts = {}) {
  const res = await fetch(BASE + path, { redirect: 'manual', ...opts });
  const body = await res.text();
  return { status: res.status, headers: res.headers, body };
}

console.log(`\nVerifying agent readiness at ${BASE}\n`);

// ── 1. Real 404s for unknown paths ──
console.log('1. Agent-friendly 404s');
{
  const r = await fetchPath('/some-path-that-does-not-exist', {
    headers: { Accept: 'text/markdown' },
  });
  check('unknown path returns HTTP 404', r.status === 404, `got ${r.status}`);
  check('404 body is markdown pointing at sitemap/llms.txt',
    r.headers.get('content-type')?.includes('text/markdown') &&
    r.body.includes('/sitemap.md') && r.body.includes('/llms.txt'));

  const j = await fetchPath('/api/nonexistent', {
    headers: { Accept: 'application/json' },
  });
  check('API unknown path returns JSON error with resolution hint',
    j.status === 404 &&
    (() => { try { const e = JSON.parse(j.body); return e.error && e.message && e.resolution; } catch { return false; } })(),
    `status=${j.status} body=${j.body.slice(0, 80)}`);
}
{
  // Known routes must NOT 404
  for (const p of ['/', '/pricing', '/docs/', '/blog/', '/privacy', '/about', '/contact', '/vs/chatgpt']) {
    const r = await fetchPath(p);
    check(`known route ${p} does not return 404`, r.status !== 404, `got ${r.status}`);
  }
}

// ── 2. OpenAPI spec ──
console.log('\n2. OpenAPI spec published & parseable');
for (const p of ['/openapi.json', '/api/openapi.json']) {
  const r = await fetchPath(p);
  let spec = null;
  try { spec = JSON.parse(r.body); } catch {}
  check(`${p} returns valid OpenAPI 3.x JSON`, r.status === 200 && !!spec?.openapi?.startsWith('3.'));
  if (spec) {
    const ops = Object.values(spec.paths || {}).flatMap((m) =>
      Object.entries(m).filter(([k]) => ['get','post','put','patch','delete'].includes(k)).map(([, v]) => v));
    check(`${p}: every operation has operationId + description`,
      ops.length > 0 && ops.every((o) => o.operationId && o.description));
    check(`${p}: has typed Error schema`, !!spec.components?.schemas?.Error);
  }
}

// ── 3. Organization schema ──
console.log('\n3. Agent instructions & Organization schema');
{
  const r = await fetchPath('/agent.txt');
  check('/agent.txt served with explicit "When to Use" guidance',
    r.status === 200 && /when to use/i.test(r.body) && /when not to use|not the right tool/i.test(r.body));
  const l = await fetchPath('/llms.txt');
  check('/llms.txt contains "When to Use" section', l.status === 200 && /##\s*When to Use/i.test(l.body));
  check('/llms.txt lists developer resources (openapi)',
    l.body.includes('/openapi.json'));
}

// ── 5. Organization schema completeness ──
console.log('\n4. Organization schema (live)');
{
  const r = await fetchPath('/');
  const schemas = [...r.body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
    .filter(Boolean);
  const orgs = [];
  const walk = (n) => {
    if (!n || typeof n !== 'object') return;
    if (n['@type'] === 'Organization') orgs.push(n);
    for (const v of Object.values(n)) if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') walk(v);
  };
  schemas.forEach(walk);
  check('Organization JSON-LD present on homepage', orgs.length > 0);
  check('every Organization has contactPoint AND address',
    orgs.every((o) => o.contactPoint && o.address),
    `found ${orgs.length} org(s); missing: ${orgs.filter(o=>!o.address).length} address`);
}

// ── 6. Static files present in dist ──
console.log('\n6. Build artifacts');
{
  const dist = join(__dirname, '..', 'dist');
  for (const f of ['agent.txt', 'openapi.json', 'about.md', 'contact.md']) {
    let ok = false;
    try { ok = !!readFileSync(join(dist, f), 'utf-8'); } catch {}
    check(`dist/${f} exists after build`, ok);
  }
}

console.log(failures === 0 ? '\n✨ All checks passed\n' : `\n💥 ${failures} check(s) failed\n`);
process.exit(failures === 0 ? 0 : 1);
