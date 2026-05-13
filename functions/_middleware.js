/**
 * Dualmark Cloudflare Pages Function
 * 
 * Content negotiation middleware: serves HTML to browsers, markdown to AI agents.
 * Based on Dualmark's edge content negotiation pattern.
 * 
 * AI agents are detected by:
 * 1. Accept header: text/markdown preferred
 * 2. User-Agent: AI crawler/agent signatures
 * 
 * Markdown twins are served from public/*.md files (generated at build time
 * by: node scripts/generate-markdown-twins.js)
 */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Only intercept GET requests
  if (request.method !== 'GET') {
    return fetch(request);
  }

  // Skip static assets (images, CSS, JS, fonts)
  const skipExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm', '.ogg', '.mp3', '.wav', '.zip', '.tar', '.gz', '.pdf'];
  const pathname = url.pathname;
  const ext = pathname.includes('.') ? '.' + pathname.split('.').pop().split('?')[0].toLowerCase() : '';
  if (skipExtensions.includes(ext)) {
    return fetch(request);
  }

  // Skip API routes and internal paths
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.startsWith('/functions/')) {
    return fetch(request);
  }

  // === AI AGENT DETECTION ===
  
  const accept = request.headers.get('accept') || '';
  const userAgent = request.headers.get('user-agent') || '';

  // AI agent user-agent signatures
  const aiBotPatterns = [
    /ClaudeBot/i,
    /anthropic-ai/i,
    /GPTBot/i,
    /ChatGPT-User/i,
    /CCBot/i,
    /Google-Extended/i,
    /Amazonbot/i,
    /Meta-ExternalAgent/i,
    /FacebookBot/i,
    /Applebot/i,
    /Bytespider/i,
    /CC Intelligence/i,
    /Diffbot/i,
    /Datario/i,
    /DataEnrichmentBot/i,
    /DeepRender/i,
    /DnBCrawler/i,
    /DunceBot/i,
    /EditorConfigBot/i,
    /embedchain/i,
    /FriendlyCrawler/i,
    /Gemini/i,
    /Google-CloudAI/i,
    /GPTBot/i,
    /iasksmartbot/i,
    /ICC-Crawler/i,
    /ImagesiftBot/i,
    /InfoTigerBot/i,
    /ipfc-bot/i,
    /Keen耀/i,
    /Kangaroo Bot/i,
    /Magpie/i,
    /Mantra WebSpeed Tester/i,
    /Mediapartners-Google/i,
    /Meltwater/i,
    /Mindustry/i,
    /Mona/i,
    /MozScan/i,
    /nu-dev/i,
    /omgili/i,
    /omgilibot/i,
    /PanguBot/i,
    /PerplexityBot/i,
    /Petal Bot/i,
    /PhantomJS/i,
    /Pinterest/i,
    /proudspectrebot/i,
    /RTG-Google-Free/i,
    /Saleswise/i,
    /Scrapy/i,
    /ScribbleReader/i,
    /SeekWriteAI/i,
    /SemiProxy/i,
    /SEOd.ai/i,
    /SerpAPIClient/i,
    /SentiBot/i,
    /Sentify/i,
    /serpstatbot/i,
    /ShiftSecurityBot/i,
    /ShopGPT/i,
    /Sir-Travelo/i,
    /Slackbot/i,
    /SocialSearchBot/i,
    /Sogou web spider/i,
    /TelegramBot/i,
    /Telesculptor/i,
    /TheFindBot/i,
    /TinTin/i,
    /Titan Client/i,
    /ToplistBot/i,
    /Trendictionbot/i,
    /TurnitinBot/i,
    /Twitterbot/i,
    /UptimeRobot/i,
    /W3C_Validator/i,
    /Waschatabot/i,
    /WebBot/i,
    /Xenu Link Sleuth/i,
    /XING-contenttab-receiver/i,
    /YaCy/i,
    /YouCodeBot/i,
    /ZooBot/i,
    // Common AI agent patterns
    /AI2B[_-]?Crawler/i,
    /AI[_-]?Crawler/i,
    /AI[_-]?Bot/i,
    /Agent[_-]?Bot/i,
    /Aria/i,
    /curl\/.*Python/i,
    /python-requests/i,
    /LangChain/i,
    /Auto-GPT/i,
    /Llama/i,
    /Mistral/i,
    /claudebot/i,
    /anthropic/i,
    /openai/i,
    /cohere/i,
    /meta-externalagent/i,
    /perplexity/i,
    /metaphora/i,
    /voyager/i,
    /browser-use/i,
    /jina/i,
    /DuckDuckBot/i,
    /Ai2Dev/i,
    /AiDevBot/i,
    /CodeInterpreter/i,
    / Windsurf/i,
    / Cursor/i,
    /claude-code/i,
    /opencode/i,
    /Aider/i,
    /Augment/i,
    /devin/i,
    /SWE-agent/i,
  ];

  const isAiBot = aiBotPatterns.some((pattern) => pattern.test(userAgent));

  // Content negotiation: prefer markdown
  const prefersMarkdown =
    accept.includes('text/markdown') ||
    accept.includes('text/x-markdown') ||
    accept.includes('application/json') ||
    accept.includes('text/plain') ||
    (accept.includes('*/*') && isAiBot);

  // If AI agent detected or prefers markdown, serve markdown twin
  if (isAiBot || prefersMarkdown) {
    // Build the markdown URL: / → /index.md, /pricing → /pricing.md
    let mdPath;
    if (pathname === '/' || pathname === '/index.html') {
      mdPath = '/index.md';
    } else {
      // For /vs/chatgpt, look for /vs/chatgpt.md
      mdPath = pathname.endsWith('.md') ? pathname : pathname + '.md';
    }

    // Try to fetch the markdown file
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

        // Build response with markdown content
        const response = new Response(mdContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
            // Dualmark headers
            'X-Markdown-Twin': 'true',
            'X-Source-URL': url.pathname,
            'X-Generator': 'Twent-Dualmark/1.0',
            // Vary for caching
            'Vary': 'Accept, User-Agent',
          },
        });

        // Add Link header for HTML counterpart
        const htmlUrl = url.pathname.replace(/\.md$/, '') || '/';
        response.headers.set(
          'Link',
          `<${htmlUrl}>; rel="canonical"; title="HTML version", ` +
          `<${htmlUrl}>; rel="alternate"; type="text/html"; title="HTML version"`
        );

        return response;
      }
    } catch (err) {
      // Markdown file not found, fall through to HTML
      console.log(`Markdown not found for ${pathname}, serving HTML: ${err.message}`);
    }
  }

  // === HTML RESPONSE: add dualmark Link headers ===
  const htmlResponse = await fetch(request);

  // Only add dualmark headers for HTML responses
  if (htmlResponse.headers.get('content-type')?.includes('text/html')) {
    // Create a new response with dualmark headers
    const newHeaders = new Headers(htmlResponse.headers);

    // Determine the canonical path and markdown twin URL
    let htmlPath = pathname === '' ? '/' : pathname;
    let mdTwinPath;
    if (htmlPath === '/' || htmlPath === '/index.html') {
      mdTwinPath = '/index.md';
    } else {
      mdTwinPath = htmlPath.replace(/\/$/, '') + '.md';
    }

    // Add Link header pointing to markdown twin
    newHeaders.set(
      'Link',
      `<${mdTwinPath}>; rel="alternate"; type="text/markdown"; title="AI-readable markdown twin"`
    );

    // Add Surrogate-Key for Cloudflare cache purging
    newHeaders.set('Surrogate-Key', 'dualmark markdown-twin');

    return new Response(htmlResponse.body, {
      status: htmlResponse.status,
      statusText: htmlResponse.statusText,
      headers: newHeaders,
    });
  }

  return htmlResponse;
}
