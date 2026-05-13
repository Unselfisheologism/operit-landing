/**
 * Dualmark Cloudflare Pages Function — Fully AEO Spec v1.0 Conformant
 *
 * Content negotiation per RFC 7231 §5.3.2
 * Implements: https://dualmark.dev/docs/spec/overview
 *
 * Run: npx wrangler pages dev dist --functions functions/
 * Deploy: npx wrangler pages deploy dist --project-name=twent
 *
 * Required: assets.run_worker_first = true (set in wrangler.toml or Pages dashboard)
 */

// AI bot UA registry (19 known crawlers + common patterns)
const AI_BOT_PATTERNS = [
  // Anthropic
  { pattern: /ClaudeBot/i, name: 'ClaudeBot', vendor: 'Anthropic' },
  { pattern: /anthropic-ai/i, name: 'Anthropic-AI', vendor: 'Anthropic' },
  { pattern: /Claude/i, name: 'Claude', vendor: 'Anthropic' },
  // OpenAI
  { pattern: /GPTBot/i, name: 'GPTBot', vendor: 'OpenAI' },
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User', vendor: 'OpenAI' },
  { pattern: /OpenAI/i, name: 'OpenAI', vendor: 'OpenAI' },
  // Google DeepMind
  { pattern: /Google-Extended/i, name: 'Google-Extended', vendor: 'Google' },
  { pattern: /Gemini/i, name: 'Gemini', vendor: 'Google' },
  { pattern: /Google-CloudAI/i, name: 'Google-CloudAI', vendor: 'Google' },
  { pattern: /GoogleOther/i, name: 'GoogleOther', vendor: 'Google' },
  // Meta
  { pattern: /Meta-ExternalAgent/i, name: 'Meta-ExternalAgent', vendor: 'Meta' },
  { pattern: /FacebookBot/i, name: 'FacebookBot', vendor: 'Meta' },
  // Common crawlers
  { pattern: /CCBot/i, name: 'CCBot', vendor: 'CommonCrawl' },
  { pattern: /Amazonbot/i, name: 'Amazonbot', vendor: 'Amazon' },
  { pattern: /Applebot/i, name: 'Applebot', vendor: 'Apple' },
  { pattern: /Bytespider/i, name: 'Bytespider', vendor: 'ByteDance' },
  { pattern: /Diffbot/i, name: 'Diffbot', vendor: 'Diffbot' },
  { pattern: /DuckDuckBot/i, name: 'DuckDuckBot', vendor: 'DuckDuckGo' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot', vendor: 'Perplexity' },
  { pattern: /omgili/i, name: 'Omgili', vendor: 'Bing' },
  { pattern: /PanguBot/i, name: 'PanguBot', vendor: 'Pangu' },
  // LLM / agent patterns
  { pattern: /Llama/i, name: 'Llama', vendor: 'Meta' },
  { pattern: /Mistral/i, name: 'Mistral', vendor: 'Mistral' },
  { pattern: /cohere/i, name: 'Cohere', vendor: 'Cohere' },
  { pattern: /MetaAI/i, name: 'MetaAI', vendor: 'Meta' },
  { pattern: /Voyager/i, name: 'Voyager', vendor: 'Hugging Face' },
  { pattern: /Browser-Use/i, name: 'Browser-Use', vendor: 'Browser-Use' },
  { pattern: /jina/i, name: 'Jina', vendor: 'Jina AI' },
  { pattern: /Windsurf/i, name: 'Windsurf', vendor: 'Codeium' },
  { pattern: /Cursor/i, name: 'Cursor', vendor: 'Anysphere' },
  { pattern: /claude-code/i, name: 'Claude-Code', vendor: 'Anthropic' },
  { pattern: /opencode/i, name: 'OpenCode', vendor: 'OpenCode' },
  { pattern: /Aider/i, name: 'Aider', vendor: 'Aider' },
  { pattern: /Augment/i, name: 'Augment', vendor: 'Augment' },
  { pattern: /devin/i, name: 'Devin', vendor: 'Cognition' },
  { pattern: /SWE-agent/i, name: 'SWE-agent', vendor: 'SWE-agent' },
  { pattern: /LangChain/i, name: 'LangChain', vendor: 'LangChain' },
  { pattern: /Auto-GPT/i, name: 'Auto-GPT', vendor: 'Auto-GPT' },
  { pattern: /DataEnrichmentBot/i, name: 'DataEnrichmentBot', vendor: 'DataEnrichment' },
  { pattern: /InfoTigerBot/i, name: 'InfoTigerBot', vendor: 'InfoTiger' },
  { pattern: /Meltwater/i, name: 'Meltwater', vendor: 'Meltwater' },
  { pattern: /SerpAPIClient/i, name: 'SerpAPIClient', vendor: 'SerpAPI' },
  { pattern: /Sentify/i, name: 'Sentify', vendor: 'Sentify' },
  { pattern: /ShopGPT/i, name: 'ShopGPT', vendor: 'ShopGPT' },
  { pattern: /Keen耀/i, name: 'Keen耀', vendor: 'Keen' },
  { pattern: /ipfc-bot/i, name: 'IPFC-Bot', vendor: 'IPFC' },
  { pattern: /Magpie/i, name: 'Magpie', vendor: 'Magpie' },
  { pattern: /Aria/i, name: 'Aria', vendor: 'Maria' },
  { pattern: /ScribbleReader/i, name: 'ScribbleReader', vendor: 'Scribble' },
  { pattern: /SeekWriteAI/i, name: 'SeekWriteAI', vendor: 'SeekWrite' },
  { pattern: /iasksmartbot/i, name: 'iasksmartbot', vendor: 'iAsk' },
  { pattern: /TelegramBot/i, name: 'TelegramBot', vendor: 'Telegram' },
  { pattern: /RTG-Google-Free/i, name: 'RTG-Google-Free', vendor: 'RTG' },
  { pattern: /CC Intelligence/i, name: 'CC-Intelligence', vendor: 'CommonCrawl' },
  { pattern: /Datario/i, name: 'Datario', vendor: 'Datario' },
  { pattern: /Embedchain/i, name: 'Embedchain', vendor: 'Embedchain' },
  { pattern: /FriendlyCrawler/i, name: 'FriendlyCrawler', vendor: 'Friendly' },
  { pattern: /ImagesiftBot/i, name: 'ImagesiftBot', vendor: 'Imagesift' },
  { pattern: /Kangaroo Bot/i, name: 'Kangaroo-Bot', vendor: 'Kangaroo' },
  { pattern: /Mantra WebSpeed Tester/i, name: 'Mantra-WebSpeed-Tester', vendor: 'Mantra' },
  { pattern: /MozScan/i, name: 'MozScan', vendor: 'Moz' },
  { pattern: /nu-dev/i, name: 'nu-dev', vendor: 'nu' },
  { pattern: /PhantomJS/i, name: 'PhantomJS', vendor: 'PhantomJS' },
  { pattern: /proudspectrebot/i, name: 'proudspectrebot', vendor: 'proudspectre' },
  { pattern: /SemiProxy/i, name: 'SemiProxy', vendor: 'SemiProxy' },
  { pattern: /ShiftSecurityBot/i, name: 'ShiftSecurityBot', vendor: 'ShiftSecurity' },
  { pattern: /TheFindBot/i, name: 'TheFindBot', vendor: 'TheFind' },
  { pattern: /TinTin/i, name: 'TinTin', vendor: 'TinTin' },
  { pattern: /ToplistBot/i, name: 'ToplistBot', vendor: 'Toplist' },
  { pattern: /Trendictionbot/i, name: 'Trendictionbot', vendor: 'Trendiction' },
  { pattern: /TurnitinBot/i, name: 'TurnitinBot', vendor: 'Turnitin' },
  { pattern: /Waschatabot/i, name: 'Waschatabot', vendor: 'Waschata' },
  { pattern: /Xenu Link Sleuth/i, name: 'Xenu-Link-Sleuth', vendor: 'Xenu' },
  { pattern: /XING-contenttab-receiver/i, name: 'XING-contenttab-receiver', vendor: 'XING' },
  { pattern: /YouCodeBot/i, name: 'YouCodeBot', vendor: 'YouCode' },
  { pattern: /ZooBot/i, name: 'ZooBot', vendor: 'ZooBot' },
  { pattern: /AI2B[_-]?Crawler/i, name: 'AI2B-Crawler', vendor: 'AI2B' },
  { pattern: /AI[_-]?Crawler/i, name: 'AI-Crawler', vendor: 'AI' },
  { pattern: /AI[_-]?Bot/i, name: 'AI-Bot', vendor: 'AI' },
  { pattern: /Agent[_-]?Bot/i, name: 'Agent-Bot', vendor: 'Agent' },
];

/**
 * Parse Accept header per RFC 7231 §5.3.2
 * Returns sorted array of { type, subtype, q, specificity }
 */
function parseAccept(header) {
  if (!header) return [];

  const parts = [];
  const ranges = header.split(',').map((r) => r.trim());

  for (const range of ranges) {
    // Split on semicolon to get media range + q parameter
    const segments = range.split(';').map((s) => s.trim());
    const mediaRange = segments[0];
    let q = 1.0;

    for (const seg of segments.slice(1)) {
      if (seg.toLowerCase().startsWith('q=')) {
        q = parseFloat(seg.substring(2)) || 0;
      }
    }

    if (q <= 0) continue;

    const [type, subtype = '*'] = mediaRange.split('/').map((p) => p.trim().toLowerCase());
    const specificity = (type !== '*' ? 1 : 0) + (subtype !== '*' ? 1 : 0);

    parts.push({ type, subtype, q, specificity });
  }

  // Sort descending by q, then by specificity (most specific first on ties)
  parts.sort((a, b) => {
    if (b.q !== a.q) return b.q - a.q;
    return b.specificity - a.specificity;
  });

  return parts;
}

/**
 * Check if media range matches a format
 */
function matchesRange(range, format) {
  if (!range) return false;
  const { type, subtype } = range;
  if (type === '*' && subtype === '*') return true; // */*
  if (type === '*') return subtype === '*' || format.includes(subtype);
  if (subtype === '*') return true; // type/*
  if (format === 'markdown') {
    return type === 'text' && (subtype === 'markdown' || subtype === 'x-markdown');
  }
  return type === 'text' && subtype === format;
}

/**
 * Determine negotiated format (html | markdown | null)
 * null means 406 Not Acceptable
 */
function negotiateFormat(acceptHeader) {
  const ranges = parseAccept(acceptHeader);
  if (ranges.length === 0) return 'html'; // Default: no Accept = HTML

  const formats = ['html', 'markdown'];
  let bestFormat = null;
  let bestQ = -1;

  for (const fmt of formats) {
    for (const range of ranges) {
      if (matchesRange(range, fmt) && range.q > bestQ) {
        bestQ = range.q;
        bestFormat = fmt;
      }
    }
  }

  return bestFormat; // null if no match (406)
}

/**
 * Detect AI bot from User-Agent
 */
function detectAiBot(userAgent) {
  if (!userAgent) return null;
  for (const { pattern, name, vendor } of AI_BOT_PATTERNS) {
    if (pattern.test(userAgent)) return { name, vendor };
  }
  return null;
}

/**
 * Estimate token count (whitespace-split approximation)
 */
function estimateTokens(text) {
  return Math.ceil(text.trim().split(/\s+/).length * 1.3); // whitespace tokens × 1.3
}

/**
 * Build the canonical markdown URL for a given HTML path
 */
function getMarkdownTwin(pathname) {
  if (pathname === '/' || pathname === '' || pathname === '/index.html') {
    return '/index.md';
  }
  return pathname.replace(/\/$/, '') + '.md';
}

// Paths that should never be negotiated
const SKIP_PREFIXES = ['/api/', '/_next/', '/functions/', '/admin/', '/assets/'];
const SKIP_EXTENSIONS = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm', '.ogg', '.mp3', '.wav', '.zip', '.tar', '.gz', '.pdf', '.ico', '.avif'];

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Only handle GET and HEAD
  if (!['GET', 'HEAD'].includes(request.method)) {
    return fetch(request);
  }

  const pathname = url.pathname;

  // Skip static assets and internal paths
  const ext = pathname.includes('.') ? '.' + pathname.split('.').pop().split('?')[0].toLowerCase() : '';
  if (
    SKIP_EXTENSIONS.includes(ext) ||
    SKIP_PREFIXES.some((p) => pathname.startsWith(p))
  ) {
    return fetch(request);
  }

  const accept = request.headers.get('accept') || '';
  const userAgent = request.headers.get('user-agent') || '';
  const aiBot = detectAiBot(userAgent);

  // ─── RFC 7231 Content Negotiation ────────────────────────────
  const negotiated = negotiateFormat(accept);

  if (negotiated === null) {
    // 406 Not Acceptable
    return new Response(
      `Not Acceptable\n\nSupported types: text/html, text/markdown\n`,
      {
        status: 406,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Vary': 'Accept',
          'X-AEO-Version': '1.0',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    );
  }

  // ─── AI Bot implicit markdown (optional spec extension) ────────
  // Serve markdown to AI bots even if they Accept */* (browsers default)
  // But respect explicit Accept: text/html from any UA
  let serveMarkdown = negotiated === 'markdown';
  if (aiBot && !accept.includes('text/html') && !accept.includes('application/xhtml')) {
    serveMarkdown = true;
  }

  // ─── Markdown Twin ────────────────────────────────────────────
  if (serveMarkdown) {
    const mdPath = getMarkdownTwin(pathname);
    const mdUrl = new URL(request.url);
    mdUrl.pathname = mdPath;

    try {
      const mdResponse = await fetch(mdUrl.toString(), {
        headers: {
          'Accept': 'text/markdown, */*',
          'User-Agent': userAgent,
        },
      });

      if (mdResponse.ok) {
        const mdContent = await mdResponse.text();
        const tokens = estimateTokens(mdContent);

        // Determine Vary header
        let varyHeader = 'Accept';
        if (aiBot) varyHeader += ', User-Agent';

        const headers = {
          'Content-Type': 'text/markdown; charset=utf-8', // charset REQUIRED per spec
          'Vary': varyHeader,
          'X-Markdown-Tokens': String(tokens),             // REQUIRED per spec
          'X-Robots-Tag': 'noindex, nofollow',           // REQUIRED per spec
          'X-AEO-Version': '1.0',                         // recommended
          'X-Content-Type-Options': 'nosniff',            // recommended
          'X-Markdown-Twin': 'true',
          'X-Source-URL': url.pathname,
          'X-Generator': 'Twent-Dualmark/1.0',
          'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
          'X-Bot-Detected': aiBot ? `${aiBot.name} (${aiBot.vendor})` : 'none',
        };

        // Link header points back to HTML counterpart
        const htmlPath = pathname === '/index.md' ? '/' : pathname.replace(/\.md$/, '');
        headers['Link'] = `<${htmlPath}>; rel="alternate"; type="text/html"; title="HTML version"`;

        // For HEAD requests, skip body
        if (request.method === 'HEAD') {
          return new Response(null, { status: 200, headers });
        }

        return new Response(mdContent, { status: 200, headers });
      }

      // Markdown twin not found → serve HTML (markdown twin is optional for 200)
      // But log it for observability
      console.log(`Dualmark miss: ${pathname} → ${mdPath} not found`);
    } catch (err) {
      console.error(`Dualmark error: ${pathname}`, err.message);
    }
  }

  // ─── HTML Response ───────────────────────────────────────────
  const htmlResponse = await fetch(request);

  if (!htmlResponse.headers.get('content-type')?.includes('text/html')) {
    return htmlResponse;
  }

  // Determine Vary
  let varyValue = 'Accept';
  if (aiBot) varyValue += ', User-Agent';

  // Markdown twin URL for Link header
  const mdTwin = getMarkdownTwin(pathname === '/index.html' ? '/' : pathname);

  const newHeaders = new Headers(htmlResponse.headers);
  newHeaders.set('Vary', varyValue);
  // Append Link header (don't overwrite existing)
  const existingLink = newHeaders.get('Link') || '';
  const newLink = `<${mdTwin}>; rel="alternate"; type="text/markdown"; title="AI-readable markdown twin"`;
  newHeaders.set('Link', existingLink ? `${existingLink}, ${newLink}` : newLink);
  // Surrogate-Key for cache purging
  newHeaders.set('Surrogate-Key', 'dualmark markdown-twin');
  // Recommended: AEO version
  newHeaders.set('X-AEO-Version', '1.0');

  return new Response(htmlResponse.body, {
    status: htmlResponse.status,
    statusText: htmlResponse.statusText,
    headers: newHeaders,
  });
}
