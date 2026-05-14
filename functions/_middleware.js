/**
 * Dualmark Cloudflare Pages Function — AEO Spec v1.0 Conformant
 *
 * Content negotiation per RFC 7231 §5.3.2
 * Implements: https://dualmark.dev/docs/spec/overview
 *
 * KEY: Uses context.env.ASSETS.fetch() for static assets to avoid
 * recursive loops. NEVER use fetch(request) — it re-triggers this
 * function and causes Error 1019.
 */

// AI bot UA registry
const AI_BOT_PATTERNS = [
  { pattern: /ClaudeBot/i, name: 'ClaudeBot', vendor: 'Anthropic' },
  { pattern: /anthropic-ai/i, name: 'Anthropic-AI', vendor: 'Anthropic' },
  { pattern: /Claude/i, name: 'Claude', vendor: 'Anthropic' },
  { pattern: /GPTBot/i, name: 'GPTBot', vendor: 'OpenAI' },
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User', vendor: 'OpenAI' },
  { pattern: /OpenAI/i, name: 'OpenAI', vendor: 'OpenAI' },
  { pattern: /Google-Extended/i, name: 'Google-Extended', vendor: 'Google' },
  { pattern: /Gemini/i, name: 'Gemini', vendor: 'Google' },
  { pattern: /Google-CloudAI/i, name: 'Google-CloudAI', vendor: 'Google' },
  { pattern: /GoogleOther/i, name: 'GoogleOther', vendor: 'Google' },
  { pattern: /Meta-ExternalAgent/i, name: 'Meta-ExternalAgent', vendor: 'Meta' },
  { pattern: /FacebookBot/i, name: 'FacebookBot', vendor: 'Meta' },
  { pattern: /CCBot/i, name: 'CCBot', vendor: 'CommonCrawl' },
  { pattern: /Amazonbot/i, name: 'Amazonbot', vendor: 'Amazon' },
  { pattern: /Applebot/i, name: 'Applebot', vendor: 'Apple' },
  { pattern: /Bytespider/i, name: 'Bytespider', vendor: 'ByteDance' },
  { pattern: /Diffbot/i, name: 'Diffbot', vendor: 'Diffbot' },
  { pattern: /DuckDuckBot/i, name: 'DuckDuckBot', vendor: 'DuckDuckGo' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot', vendor: 'Perplexity' },
  { pattern: /omgili/i, name: 'Omgili', vendor: 'Bing' },
  { pattern: /PanguBot/i, name: 'PanguBot', vendor: 'Pangu' },
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

function parseAccept(header) {
  if (!header) return [];
  const parts = [];
  const ranges = header.split(',').map((r) => r.trim());
  for (const range of ranges) {
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
  parts.sort((a, b) => {
    if (b.q !== a.q) return b.q - a.q;
    return b.specificity - a.specificity;
  });
  return parts;
}

function matchesRange(range, format) {
  if (!range) return false;
  const { type, subtype } = range;
  if (type === '*' && subtype === '*') return true;
  if (type === '*') return subtype === '*' || format.includes(subtype);
  if (subtype === '*') return true;
  if (format === 'markdown') {
    return type === 'text' && (subtype === 'markdown' || subtype === 'x-markdown');
  }
  return type === 'text' && subtype === format;
}

function negotiateFormat(acceptHeader) {
  const ranges = parseAccept(acceptHeader);
  if (ranges.length === 0) return 'html';
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
  return bestFormat;
}

function detectAiBot(userAgent) {
  if (!userAgent) return null;
  for (const { pattern, name, vendor } of AI_BOT_PATTERNS) {
    if (pattern.test(userAgent)) return { name, vendor };
  }
  return null;
}

function estimateTokens(text) {
  return Math.ceil(text.trim().split(/\s+/).length * 1.3);
}

function getMarkdownTwin(pathname) {
  if (pathname === '/' || pathname === '' || pathname === '/index.html') return '/index.md';
  return pathname.replace(/\/$/, '') + '.md';
}

const SKIP_PREFIXES = ['/api/', '/_next/', '/functions/', '/admin/', '/assets/'];
const SKIP_EXTENSIONS = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm', '.ogg', '.mp3', '.wav', '.zip', '.tar', '.gz', '.pdf', '.avif'];

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Only handle GET and HEAD
  if (!['GET', 'HEAD'].includes(request.method)) {
    return env.ASSETS.fetch(request);
  }

  const pathname = url.pathname;
  const ext = pathname.includes('.') ? '.' + pathname.split('.').pop().split('?')[0].toLowerCase() : '';

  if (SKIP_EXTENSIONS.includes(ext) || SKIP_PREFIXES.some((p) => pathname.startsWith(p))) {
    return env.ASSETS.fetch(request);
  }

  const accept = request.headers.get('accept') || '';
  const userAgent = request.headers.get('user-agent') || '';
  const aiBot = detectAiBot(userAgent);

  // ─── RFC 7231 Content Negotiation ───
  const negotiated = negotiateFormat(accept);

  if (negotiated === null) {
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

  // ─── AI Bot implicit markdown (optional spec extension) ───
  let serveMarkdown = negotiated === 'markdown';
  if (aiBot && !accept.includes('text/html') && !accept.includes('application/xhtml')) {
    serveMarkdown = true;
  }

  // ─── Markdown Twin ───
  if (serveMarkdown) {
    const mdPath = getMarkdownTwin(pathname);
    const mdUrl = new URL(request.url);
    mdUrl.pathname = mdPath;

    // Fetch from ASSETS binding (static file, no loop)
    const mdResponse = await env.ASSETS.fetch(mdUrl.toString());

    if (mdResponse.ok) {
      const mdContent = await mdResponse.text();
      const tokens = estimateTokens(mdContent);

      let varyHeader = 'Accept';
      if (aiBot) varyHeader += ', User-Agent';

      const htmlPath = pathname.replace(/\.md$/, '') || '/';

      const headers = {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': varyHeader,
        'X-Markdown-Tokens': String(tokens),
        'X-Robots-Tag': 'noindex, nofollow',
        'X-AEO-Version': '1.0',
        'X-Content-Type-Options': 'nosniff',
        'X-Markdown-Twin': 'true',
        'X-Generator': 'Twent-Dualmark/1.0',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Link': `<${htmlPath}>; rel="alternate"; type="text/html"; title="HTML version"`,
      };

      if (request.method === 'HEAD') {
        return new Response(null, { status: 200, headers });
      }
      return new Response(mdContent, { status: 200, headers });
    }

    console.log(`Dualmark miss: ${pathname} → ${mdPath}`);
  }

  // ─── HTML Response ───
  // CRITICAL: use env.ASSETS.fetch() — never fetch(request) as it loops back into this function
  const htmlResponse = await env.ASSETS.fetch(request);

  if (!htmlResponse.headers.get('content-type')?.includes('text/html')) {
    return htmlResponse;
  }

  let varyValue = 'Accept';
  if (aiBot) varyValue += ', User-Agent';

  const mdTwin = getMarkdownTwin(pathname.replace('/index.html', ''));
  const newHeaders = new Headers(htmlResponse.headers);
  newHeaders.set('Vary', varyValue);
  const existingLink = newHeaders.get('Link') || '';
  const newLink = `<${mdTwin}>; rel="alternate"; type="text/markdown"; title="AI-readable markdown twin"`;
  newHeaders.set('Link', existingLink ? `${existingLink}, ${newLink}` : newLink);
  newHeaders.set('Surrogate-Key', 'dualmark markdown-twin');
  newHeaders.set('X-AEO-Version', '1.0');

  return new Response(htmlResponse.body, {
    status: htmlResponse.status,
    statusText: htmlResponse.statusText,
    headers: newHeaders,
  });
}