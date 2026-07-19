/**
 * Dualmark Cloudflare Pages Function — AEO Spec v1.0 Conformant
 *
 * Content negotiation per RFC 7231 §5.3.2
 * Implements: https://dualmark.dev/docs/spec/overview
 *
 * KEY: Uses context.env.ASSETS.fetch() for static assets to avoid
 * recursive loops. NEVER use fetch(request) — it re-triggers this
 * function and causes Error 1019.
 *
 * UPGRADE: Adds prerender layer for search engine crawlers.
 * - AI bots → markdown (existing)
 * - Search engine crawlers → pre-rendered HTML with schema markup (NEW)
 * - Humans → React SPA (existing)
 */

// ─── AI Bot UA registry ─────────────────────────────────────────────────────
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

// ─── Search Engine Bot patterns (for prerender) ─────────────────────────────
// These bots need full HTML content, not markdown or empty React shell.
const SEARCH_ENGINE_BOTS = [
  { pattern: /Googlebot/i, name: 'Googlebot', vendor: 'Google' },
  { pattern: /Bingbot/i, name: 'Bingbot', vendor: 'Microsoft' },
  { pattern: /BingPreview/i, name: 'BingPreview', vendor: 'Microsoft' },
  { pattern: /Yandex/i, name: 'Yandex', vendor: 'Yandex' },
  { pattern: /Baidu/i, name: 'Baidu', vendor: 'Baidu' },
  { pattern: /Sogou/i, name: 'Sogou', vendor: 'Sogou' },
  { pattern: /Exabot/i, name: 'Exabot', vendor: 'Exalead' },
  { pattern: /Konqueror/i, name: 'Konqueror', vendor: 'KDE' },
  { pattern: /Yahoo! Slurp/i, name: 'Yahoo-Slurp', vendor: 'Yahoo' },
];

// ─── Page metadata from pages.json (embedded for edge performance) ───────────
const PAGE_META = {
  '/': {
    title: 'Twent - AI Agent for Android (2026) | Automates Everything',
    description: 'The AI agent that runs ON your Android — automates apps, runs Ubuntu terminal & connects 1000+ services. Download Twent free.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/pricing': {
    title: 'Twent Pricing — Free AI Agent for Android',
    description: 'No credit card needed. Get full access to Android automation, Ubuntu terminal & 1000+ integrations — completely free.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/docs': {
    title: 'Twent Docs — Getting Started',
    description: 'Step-by-step guides: automate apps, run Ubuntu terminal, connect MCP skills. Everything you need to get started.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/blog': {
    title: 'Twent Blog — News and Tutorials',
    description: 'Tutorials, deep-dives & product news. Learn how to get the most from your Android device with AI assistance.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/changelog': {
    title: 'Twent Changelog (2026) - What\'s New',
    description: 'Every update, feature & bug fix. Stay up to date with the Android app that actually ships. Free download.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/ai-agent-for-developers': {
    title: 'Code on Your Phone — MCP, CLI & Ubuntu Terminal',
    description: 'Run Claude Code, Codex & full CLI tools on your Android device. Git, SSH, MCP & VS Code Server in a mobile shell.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/android-automation-power-user': {
    title: 'Android Automation — Auto-Tap, Swipe & AI Scripts',
    description: 'Auto-tap, swipe, type & run custom scripts on any Android app. No root needed. Your phone works for you.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/privacy-first-ai-android': {
    title: 'Privacy-First AI on Android — BYOK & Local Models',
    description: 'Your data never leaves your device. Bring your own API keys (encrypted locally), run offline AI models. Zero telemetry.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/terminal-on-android': {
    title: 'Ubuntu Terminal on Android — Full Linux (No Root)',
    description: 'Run Ubuntu 24.04 LTS on your Android phone. apt, Python, Node, SSH — a real Linux environment in your pocket.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/ai-marketplace-creators': {
    title: 'Build & Sell AI Skills on Twent',
    description: 'Turn your automations into products. Build skills once, reach millions of Android users. Simple publishing, fair revenue share.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/enterprise-ai-agent': {
    title: 'Twent Teams — AI Agents for Your Organization',
    description: 'Deploy AI agents across your team with admin controls, compliance settings & usage dashboards. Built for Android fleets.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/privacy': {
    title: 'Twent Privacy Policy - Your Data, Your Control',
    description: 'How your data is handled: encryption standards, what we never collect, and our transparency commitments.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/terms': {
    title: 'Twent Terms of Service - Free AI Agent Android',
    description: 'Clear, human-readable terms for using Twent. No fine print surprises — just fair terms for a free product.',
    type: 'website',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/blog/marketplace': {
    title: 'Twent Marketplace — AI Skills & Integrations',
    description: 'Browse AI skills, MCP tools & Composio connections. Supercharge your Android setup with curated extensions.',
    type: 'article',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
  '/blog/best-ai-apps-android': {
    title: '25 Best AI Apps for Android in 2026',
    description: 'A curated ranking of the top AI apps for Android in 2026 — from chatbots to agentic tools. Find the right one for you.',
    type: 'article',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
  },
};

// Add comparison pages dynamically
const VS_PAGES = [
  'chatgpt', 'claude', 'gemini', 'nebula', 'openclaw', 'hermes-agent',
  'n8n', 'anything-llm', 'replika', 'copilot', 'perplexity', 'make',
  'zapier', 'qordinate', 'omnara', 'manus', 'onspace',
];
for (const vs of VS_PAGES) {
  const name = vs.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  PAGE_META[`/vs/${vs}`] = {
    title: `Twent vs ${name} - Android AI Comparison (2026)`,
    description: `ChatGPT chats. Twent acts — controls apps, runs terminals & automates your workflow from your Android device.`,
    type: 'article',
    image: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
    competitor: name,
  };
}

// ─── Lightweight Markdown → HTML converter ───────────────────────────────────
// Zero dependencies. Handles the markdown patterns used in twent.xyz content.
function mdToHtml(md) {
  // Strip YAML frontmatter
  let content = md.replace(/^---[\s\S]*?---\n*/, '');

  const lines = content.split('\n');
  const out = [];
  let i = 0;
  let inCodeBlock = false;
  let codeLang = '';
  let codeLines = [];
  let inTable = false;
  let tableRows = [];

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function inlineFormat(s) {
    // Bold + italic
    s = s.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    // Bold
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__(.+?)__/g, '<strong>$1</strong>');
    // Italic
    s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
    s = s.replace(/_(.+?)_/g, '<em>$1</em>');
    // Strikethrough
    s = s.replace(/~~(.+?)~~/g, '<del>$1</del>');
    // Inline code
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Links [text](url)
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
    // Images ![alt](url)
    s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
    return s;
  }

  function flushTable() {
    if (!inTable || tableRows.length === 0) return;
    let html = '<div class="table-wrapper"><table>';
    for (let r = 0; r < tableRows.length; r++) {
      const cells = tableRows[r].split('|').map(c => c.trim()).filter(c => c !== '');
      // Skip separator row (---|---|---)
      if (cells.every(c => /^[-:]+$/.test(c))) continue;
      const tag = r === 0 ? 'th' : 'td';
      const rowTag = r === 0 ? 'thead' : (r === 1 ? 'tbody' : '');
      if (r === 0) html += '<thead>';
      if (r === 1) html += '<tbody>';
      html += '<tr>';
      for (const cell of cells) {
        html += `<${tag}>${inlineFormat(escapeHtml(cell))}</${tag}>`;
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    out.push(html);
    inTable = false;
    tableRows = [];
  }

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.trimStart().startsWith('```')) {
      if (inCodeBlock) {
        out.push(`<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        inCodeBlock = false;
        codeLines = [];
        codeLang = '';
      } else {
        flushTable();
        inCodeBlock = true;
        codeLang = line.trim().slice(3).trim();
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      i++;
      continue;
    }

    // Tables
    if (line.includes('|') && line.trim().startsWith('|')) {
      if (!inTable) inTable = true;
      tableRows.push(line);
      i++;
      continue;
    } else {
      flushTable();
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = inlineFormat(escapeHtml(headingMatch[2]));
      const id = headingMatch[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      out.push(`<h${level} id="${id}">${text}</h${level}>`);
      i++;
      continue;
    }

    // Blockquotes
    if (line.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(`<blockquote>${inlineFormat(escapeHtml(quoteLines.join('\n')))}</blockquote>`);
      continue;
    }

    // Unordered lists
    if (/^[-*+]\s/.test(line)) {
      out.push('<ul>');
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        const text = lines[i].replace(/^[-*+]\s+/, '');
        out.push(`<li>${inlineFormat(escapeHtml(text))}</li>`);
        i++;
      }
      out.push('</ul>');
      continue;
    }

    // Ordered lists
    if (/^\d+\.\s/.test(line)) {
      out.push('<ol>');
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        const text = lines[i].replace(/^\d+\.\s+/, '');
        out.push(`<li>${inlineFormat(escapeHtml(text))}</li>`);
        i++;
      }
      out.push('</ol>');
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}\s*$/.test(line.trim())) {
      out.push('<hr />');
      i++;
      continue;
    }

    // Paragraph (collect consecutive non-empty lines)
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('>') &&
      !lines[i].startsWith('```') &&
      !/^[-*+]\s/.test(lines[i]) &&
      !/^\d+\.\s/.test(lines[i]) &&
      !/^[-*_]{3,}\s*$/.test(lines[i].trim()) &&
      !(lines[i].includes('|') && lines[i].trim().startsWith('|'))
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      out.push(`<p>${inlineFormat(escapeHtml(paraLines.join('\n')))}</p>`);
    }
  }

  flushTable();
  return out.join('\n');
}

// ─── HTML wrapper with schema markup ─────────────────────────────────────────
function wrapHtml({ pathname, title, description, bodyHtml, type, image, lastmod }) {
  const canonical = `https://twent.xyz${pathname === '/' ? '' : pathname}`;
  const ogImage = image || 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp';
  const now = new Date().toISOString();
  const dateModified = lastmod || now;

  // Build JSON-LD schema based on page type
  let schema = '';
  if (type === 'article') {
    schema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      author: { '@type': 'Organization', name: 'Twent AI' },
      publisher: {
        '@type': 'Organization',
        name: 'Twent AI',
        url: 'https://twent.xyz',
        logo: { '@type': 'ImageObject', url: 'https://twent.xyz/twent-logo-32.webp' },
      },
      datePublished: dateModified,
      dateModified: dateModified,
      mainEntityOfPage: canonical,
      image: ogImage,
    }, null, 0);
  } else {
    // Organization + SoftwareApplication for landing/pricing/docs pages
    schema = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Twent AI',
          url: 'https://twent.xyz',
          logo: 'https://twent.xyz/twent-logo-32.webp',
          sameAs: [
            'https://github.com/Unselfisheologism/Twent',
          ],
        },
        {
          '@type': 'SoftwareApplication',
          name: 'Twent',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Android 8.0+',
          url: 'https://twent.xyz',
          description: 'AI agent for Android — automates apps, runs Ubuntu terminal & connects 1000+ services.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          screenshot: 'https://twent.xyz/TWENT-OPENGRAPH-IMG.webp',
        },
      ],
    }, null, 0);
  }

  // Breadcrumb schema
  const breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://twent.xyz' },
      ...(pathname !== '/' ? [{
        '@type': 'ListItem',
        position: 2,
        name: title.split(' - ')[0].split(' | ')[0].split(' — ')[0].trim(),
        item: canonical,
      }] : []),
    ],
  }, null, 0);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtmlAttr(title)}</title>
  <meta name="title" content="${escapeHtmlAttr(title)}" />
  <meta name="description" content="${escapeHtmlAttr(description)}" />
  <meta name="author" content="Twent AI" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <link rel="canonical" href="${canonical}" />

  <!-- Open Graph -->
  <meta property="og:type" content="${type === 'article' ? 'article' : 'website'}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${escapeHtmlAttr(title)}" />
  <meta property="og:description" content="${escapeHtmlAttr(description)}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:site_name" content="Twent" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonical}" />
  <meta name="twitter:title" content="${escapeHtmlAttr(title)}" />
  <meta name="twitter:description" content="${escapeHtmlAttr(description)}" />
  <meta name="twitter:image" content="${ogImage}" />

  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">${schema}</script>
  <script type="application/ld+json">${breadcrumbSchema}</script>

  <!-- Prefetch the React SPA for users who click through -->
  <link rel="prefetch" href="/src/main.tsx" />

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.7;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
      color: #1a1a2e;
      background: #fafafa;
    }
    h1 { font-size: 2rem; margin-top: 0; }
    h2 { font-size: 1.5rem; margin-top: 2rem; border-bottom: 1px solid #eee; padding-bottom: 0.3rem; }
    h3 { font-size: 1.25rem; margin-top: 1.5rem; }
    a { color: #2563eb; text-decoration: none; }
    a:hover { text-decoration: underline; }
    code {
      background: #f1f5f9;
      padding: 0.15em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
    }
    pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
    }
    pre code { background: none; padding: 0; color: inherit; }
    blockquote {
      border-left: 4px solid #2563eb;
      margin: 1rem 0;
      padding: 0.5rem 1rem;
      background: #f0f7ff;
      border-radius: 0 8px 8px 0;
    }
    .table-wrapper { overflow-x: auto; margin: 1rem 0; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #e2e8f0; padding: 0.6rem 1rem; text-align: left; }
    th { background: #f8fafc; font-weight: 600; }
    tr:hover { background: #f8fafc; }
    hr { border: none; border-top: 1px solid #eee; margin: 2rem 0; }
    ul, ol { padding-left: 1.5rem; }
    li { margin: 0.25rem 0; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    .cta {
      display: inline-block;
      background: #2563eb;
      color: #fff;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin: 1rem 0;
    }
    .cta:hover { background: #1d4ed8; text-decoration: none; }
  </style>
</head>
<body>
  <article>
    ${bodyHtml}
  </article>
  <hr />
  <p style="color:#64748b;font-size:0.9rem;">
    <a href="https://twent.xyz">Twent</a> — AI Agent for Android. Free download, no credit card required.
  </p>
  <noscript>
    <p>This page requires JavaScript for the full interactive experience.
       <a href="https://twent.xyz">Visit the homepage</a> or
       <a href="https://twent.xyz/pricing">view pricing</a>.</p>
  </noscript>
</body>
</html>`;
}

function escapeHtmlAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ─── Content Negotiation (existing) ──────────────────────────────────────────
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

function detectSearchBot(userAgent) {
  if (!userAgent) return null;
  for (const { pattern, name, vendor } of SEARCH_ENGINE_BOTS) {
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

// ─── Main Handler ────────────────────────────────────────────────────────────
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
  const searchBot = detectSearchBot(userAgent);

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

  // ─── AI Bot implicit markdown (existing behavior) ───
  let serveMarkdown = negotiated === 'markdown';
  if (aiBot) {
    const prefersHtml = accept.includes('text/html') || accept.includes('application/xhtml');
    if (!prefersHtml) serveMarkdown = true;
  }

  // ─── Markdown Twin (existing behavior for AI bots) ───
  if (serveMarkdown) {
    const mdPath = getMarkdownTwin(pathname);
    const mdUrl = new URL(request.url);
    mdUrl.pathname = mdPath;

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

  // ─── NEW: Prerender for Search Engine Bots ───
  if (searchBot) {
    const mdPath = getMarkdownTwin(pathname);
    const mdUrl = new URL(request.url);
    mdUrl.pathname = mdPath;

    const mdResponse = await env.ASSETS.fetch(mdUrl.toString());

    if (mdResponse.ok) {
      const mdContent = await mdResponse.text();
      const meta = PAGE_META[pathname] || PAGE_META['/'];

      // Extract lastmod from frontmatter
      const lastmodMatch = mdContent.match(/lastmod:\s*(.+)/);
      const lastmod = lastmodMatch ? lastmodMatch[1].trim() : undefined;

      const bodyHtml = mdToHtml(mdContent);
      const prerenderedHtml = wrapHtml({
        pathname,
        title: meta.title,
        description: meta.description,
        bodyHtml,
        type: meta.type || 'website',
        image: meta.image,
        lastmod,
      });

      let varyHeader = 'Accept, User-Agent';

      const headers = {
        'Content-Type': 'text/html; charset=utf-8',
        'Vary': varyHeader,
        'X-Prerendered': 'true',
        'X-AEO-Version': '1.0',
        'X-Generator': 'Twent-Dualmark/1.0',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Link': `<${getMarkdownTwin(pathname)}>; rel="alternate"; type="text/markdown"; title="AI-readable markdown twin"`,
      };

      if (request.method === 'HEAD') {
        return new Response(null, { status: 200, headers });
      }
      return new Response(prerenderedHtml, { status: 200, headers });
    }

    // If no markdown twin, fall through to normal HTML response
    console.log(`Prerender miss: ${pathname} — no markdown twin`);
  }

  // ─── HTML Response (existing behavior for humans) ───
  const htmlResponse = await env.ASSETS.fetch(request);

  if (!htmlResponse.headers.get('content-type')?.includes('text/html')) {
    return htmlResponse;
  }

  let varyValue = 'Accept';
  if (aiBot) varyValue += ', User-Agent';
  if (searchBot) varyValue += ', User-Agent';

  const mdTwin = getMarkdownTwin(pathname.replace('/index.html', ''));
  const newHeaders = new Headers(htmlResponse.headers);
  newHeaders.set('Vary', varyValue);
  const existingLink = newHeaders.get('Link') || '';
  const newLink = `<${mdTwin}>; rel="alternate"; type="text/markdown"; title="AI-readable markdown twin"`;
  newHeaders.set('Link', existingLink ? `${existingLink}, ${newLink}` : newLink);
  newHeaders.set('Surrogate-Key', 'dualmark markdown-twin');
  newHeaders.set('X-AEO-Version', '1.0');
  newHeaders.set('X-Generator', 'Twent-Dualmark/1.0');

  return new Response(htmlResponse.body, {
    status: htmlResponse.status,
    statusText: htmlResponse.statusText,
    headers: newHeaders,
  });
}
