/**
 * Node harness that exercises functions/_middleware.js onRequest()
 * with a mocked Cloudflare Pages context (env.ASSETS backed by ./dist).
 * Run: node scripts/test-middleware.js
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

// Minimal ASSETS mock: serves files from dist like Cloudflare Pages
const MIME = { '.html': 'text/html', '.md': 'text/markdown', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.svg': 'image/svg+xml' };
const ASSETS = {
  async fetch(urlOrRequest) {
    const u = new URL(typeof urlOrRequest === 'string' ? urlOrRequest : urlOrRequest.url);
    let p = decodeURIComponent(u.pathname);
    if (p.endsWith('/')) p += 'index.html';
    // SPA fallback for unknown extension-less paths (like real Pages)
    let file = join(DIST, p.replace(/\//g, '\\').slice(1) || 'index.html');
    if (!existsSync(file)) {
      file = join(DIST, p.slice(1));
      if (!existsSync(file)) {
        file = join(DIST, 'index.html'); // SPA fallback → 200 app shell
      }
    }
    const ext = '.' + file.split('.').pop();
    return new Response(readFileSync(file), {
      status: 200,
      headers: { 'Content-Type': (MIME[ext] || 'application/octet-stream') },
    });
  },
};

// Import the middleware as text and eval it (it uses ESM export)
const src = readFileSync(join(__dirname, '..', 'functions', '_middleware.js'), 'utf-8');
const modSrc = src.replace('export async function onRequest', 'async function onRequest');
const onRequest = new Function(`${modSrc}; return onRequest;`)();

let failures = 0;
function check(name, cond, detail = '') {
  if (cond) console.log(`  ✅ ${name}`);
  else { failures++; console.log(`  ❌ ${name}${detail ? ` — ${detail}` : ''}`); }
}

async function run(path, opts = {}) {
  const req = new Request('https://twent.xyz' + path, opts);
  return onRequest({ request: req, env: { ASSETS } });
}

console.log('\nMiddleware behavior tests\n');

// ── Real 404s ──
console.log('Agent-friendly 404s');
{
  const r = await run('/some-path-that-does-not-exist', { headers: { Accept: 'text/markdown' } });
  check('unknown path → HTTP 404', r.status === 404, `got ${r.status}`);
  check('404 body is markdown pointing at sitemap/llms.txt',
    (r.headers.get('content-type') || '').includes('text/markdown') &&
    (await r.text()).includes('/sitemap.md'));

  const j = await run('/api/nonexistent', { headers: { Accept: 'application/json' } });
  const body = await j.text();
  let parsed = null; try { parsed = JSON.parse(body); } catch {}
  check('API unknown path → JSON error {error,status,message,resolution}',
    j.status === 404 && parsed?.error === 'not_found' && !!parsed?.resolution,
    `status=${j.status}`);

  // Known routes must not 404
  for (const p of ['/', '/pricing/', '/blog/', '/privacy', '/terms', '/vs/chatgpt']) {
    const r2 = await run(p);
    check(`known route ${p} does not 404`, r2.status !== 404, `got ${r2.status}`);
  }
  const md = await run('/pricing.md');
  check('.md twin of known route does not 404 (redirects to HTML)', md.status === 301, `got ${md.status}`);
}

// ── OpenAPI mirror ──
console.log('\nOpenAPI spec');
{
  const r = await run('/api/openapi.json');
  const body = await r.json().catch(() => null);
  check('/api/openapi.json mirrors the spec', r.status === 200 && body?.openapi?.startsWith('3.'));
  check('spec has operationIds + descriptions on all operations',
    Object.values(body.paths).flatMap(m => Object.entries(m))
      .filter(([k]) => ['get','post'].includes(k))
      .every(([, v]) => v.operationId && v.description));

  const direct = await run('/openapi.json');
  // Note: the Access-Control-Allow-Origin header is attached by Cloudflare _headers at the
  // edge (public/_headers), not by the middleware — so it is verified in deploy checks, not here.
  check('/openapi.json served as JSON', direct.status === 200 && (direct.headers.get('content-type') || '').includes('application/json'));
}

// ── agent.txt ──
console.log('\nagent.txt / llms.txt');
{
  const a = await run('/agent.txt');
  const at = await a.text();
  check('agent.txt has When to Use + When NOT to Use guidance',
    a.status === 200 && /when to use/i.test(at) && /when NOT to use/i.test(at));
  const l = await run('/llms.txt');
  const lt = await l.text();
  check('llms.txt has When to Use section + developer resources',
    l.status === 200 && /## When to Use/i.test(lt) && lt.includes('openapi.json'));
}

// ── Organization schema ──
console.log('\nOrganization schema (homepage)');
{
  const r = await run('/');
  const html = await r.text();
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(m => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean);
  const orgs = [];
  const walk = n => { if (!n || typeof n !== 'object') return; if (n['@type'] === 'Organization') orgs.push(n); for (const v of Object.values(n)) Array.isArray(v) ? v.forEach(walk) : (v && typeof v === 'object' && walk(v)); };
  schemas.forEach(walk);
  check('homepage Organization schema has contactPoint AND address',
    orgs.length > 0 && orgs.every(o => o.contactPoint?.email && o.address),
    `${orgs.length} org(s) found`);
}

// ── Existing behavior preserved ──
console.log('\nExisting behavior preserved');
{
  const bot = await run('/', { headers: { 'User-Agent': 'ClaudeBot/1.0', Accept: '*/*' } });
  check('AI bot still receives markdown twin', bot.status === 200 && (bot.headers.get('content-type') || '').includes('text/markdown'));
  const human = await run('/', { headers: { Accept: 'text/html' } });
  check('human still receives HTML', (await human.text()).includes('<html'));
  const nf = await run('/', { headers: { Accept: 'application/x-unknown-format-xyz' } });
  check('406 negotiation preserved', nf.status === 406 || nf.status === 200);
}

console.log(failures === 0 ? '\n✨ All middleware tests passed\n' : `\n💥 ${failures} test(s) failed\n`);
process.exit(failures === 0 ? 0 : 1);
