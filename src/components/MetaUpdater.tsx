// MetaUpdater - Dynamically updates document meta tags based on language
// Updates: og:locale, document.title, lang attribute, meta description
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n";
import { getOgLocale } from "./HreflangTags";

// Page meta data per route (used for title/description updates)
// All descriptions optimized: 120-160 chars, compelling CTA
const pageMeta: Record<string, { title: string; description: string; ogImage?: string }> = {
  "/": {
    title: "Twent — AI Agent for Android That Actually Acts",
    description:
      "Your personal agentic OS in your pocket. Automate any app, run a real Ubuntu terminal, connect 1000+ services. Free download.",
  },
  "/pricing": {
    title: "Twent Pricing — Free AI Agent for Android",
    description:
      "No credit card needed. Get full access to Android automation, Ubuntu terminal & 1000+ integrations — completely free.",
  },
  "/docs": {
    title: "Twent Docs — Getting Started",
    description:
      "Step-by-step guides: automate apps, run Ubuntu terminal, connect MCP skills. Everything you need to get started.",
  },
  "/blog": {
    title: "Twent Blog — News and Tutorials",
    description:
      "Tutorials, deep-dives & product news. Learn how to get the most from your Android device with AI assistance.",
  },
  "/blog/marketplace": {
    title: "Twent Marketplace — AI Skills & Integrations",
    description:
      "Browse AI skills, MCP tools & Composio connections. Supercharge your Android setup with curated extensions.",
  },
  "/ai-marketplace-creators": {
    title: "Build & Sell AI Skills on Twent",
    description:
      "Turn your automations into products. Build skills once, reach millions of Android users. Simple publishing, fair revenue share.",
  },
  "/blog/best-ai-apps-android": {
    title: "25 Best AI Apps for Android in 2026",
    description:
      "A curated ranking of the top AI apps for Android in 2026 — from chatbots to agentic tools. Find the right one for you.",
  },
  "/android-automation-power-user": {
    title: "Android Automation — Auto-Tap, Swipe & AI Scripts",
    description:
      "Auto-tap, swipe, type & run custom scripts on any Android app. No root needed. Your phone works for you.",
  },
  "/privacy-first-ai-android": {
    title: "Privacy-First AI on Android — BYOK & Local Models",
    description:
      "Your data never leaves your device. Bring your own API keys (encrypted locally), run offline AI models. Zero telemetry.",
  },
  "/terminal-on-android": {
    title: "Ubuntu Terminal on Android — Full Linux (No Root)",
    description:
      "Run Ubuntu 24.04 LTS on your Android phone. apt, Python, Node, SSH — a real Linux environment in your pocket.",
  },
  "/enterprise-ai-agent": {
    title: "Twent Teams — AI Agents for Your Organization",
    description:
      "Deploy AI agents across your team with admin controls, compliance settings & usage dashboards. Built for Android fleets.",
  },
  "/ai-agent-for-developers": {
    title: "Code on Your Phone — MCP, CLI & Ubuntu Terminal",
    description:
      "Run Claude Code, Codex & full CLI tools on your Android device. Git, SSH, MCP & VS Code Server in a mobile shell.",
    ogImage: "/developer-hero.png",
  },
  "/changelog": {
    title: "Twent Changelog — What's New",
    description:
      "Every update, feature & bug fix. Stay up to date with the Android app that actually ships. Free download.",
    ogImage: "/TWENT-OPENGRAPH-IMG.png",
  },
  "/privacy": {
    title: "Twent Privacy Policy — Your Data, Your Control",
    description:
      "How your data is handled: encryption standards, what we never collect, and our transparency commitments.",
    ogImage: "/privacy-hero.png",
  },
  "/terms": {
    title: "Twent Terms of Service",
    description:
      "Clear, human-readable terms for using Twent. No fine print surprises — just fair terms for a free product.",
    ogImage: "/TWENT-OPENGRAPH-IMG.png",
  },
  "/404": {
    title: "Page Not Found | Twent",
    description:
      "That page doesn't exist — but you can still download Twent and try the Android app that actually does things.",
    ogImage: "/TWENT-OPENGRAPH-IMG.png",
  },
  "/vs/chatgpt": {
    title: "Twent vs ChatGPT — Which AI for Android?",
    description:
      "ChatGPT chats. Twent acts — controls apps, runs terminals & automates your workflow from your Android device.",
  },
  "/vs/nebula": {
    title: "Twent vs Nebula AI — Android Agent Comparison",
    description:
      "Device automation, local models & Ubuntu terminal — see how Twent compares to Nebula for Android power users.",
  },
  "/vs/openclaw": {
    title: "Twent vs OpenClaw — Android AI Agent Comparison",
    description:
      "More integrations, offline models & UI automation. How Twent stacks up against OpenClaw for Android.",
  },
  "/vs/hermes-agent": {
    title: "Twent vs Hermes Agent — Android Comparison",
    description:
      "Hermes Agent runs in Twent with full Ubuntu terminal & UI control. See how they compare on Android.",
  },
  "/vs/n8n": {
    title: "Twent vs n8n — Automation on Android vs the Cloud",
    description:
      "n8n runs in the cloud. Twent runs on your Android device with full terminal access & app automation.",
  },
  "/vs/anything-llm": {
    title: "Twent vs AnythingLLM — Mobile AI Agent Comparison",
    description:
      "AnythingLLM is desktop-first. Twent brings agentic execution, automation & a skills marketplace to your phone.",
  },
  "/vs/gemini": {
    title: "Twent vs Google Gemini — Android AI (2026)",
    description:
      "Gemini lives in a browser. Twent runs on your device with BYOK privacy, offline models & full automation.",
  },
  "/vs/replika": {
    title: "Twent vs Replika — Productivity vs Companionship AI",
    description:
      "Replika is for conversation. Twent is for getting things done — automation, terminal & integrations on Android.",
  },
  "/vs/copilot": {
    title: "Twent vs Microsoft Copilot — Android AI Comparison",
    description:
      "Copilot is browser-based. Twent gives you a floating AI overlay, automation & local models on your device.",
  },
  "/vs/claude": {
    title: "Twent vs Claude — Mobile AI Agent Comparison",
    description:
      "Claude on mobile is limited. Twent brings Claude Code execution, floating overlay & Android automation to the same device.",
  },
  "/vs/perplexity": {
    title: "Twent vs Perplexity — Search AI vs Action AI",
    description:
      "Perplexity finds answers. Twent acts on them — automates tasks, runs terminals & executes workflows on your phone.",
  },
  "/vs/make": {
    title: "Twent vs Make — Automation on Android vs Visual Workflows",
    description:
      "Make builds cloud workflows. Twent runs agents locally on your Android — with full terminal access & no internet required.",
  },
  "/vs/zapier": {
    title: "Twent vs Zapier — Automation That Lives on Your Phone",
    description:
      "Zapier connects cloud apps. Twent connects to everything on your Android device, including apps Zapier can't reach.",
  },
  "/vs/qordinate": {
    title: "Twent vs Qordinate — Android AI Agent Comparison",
    description:
      "More integrations, offline capability & automation depth. How Twent compares to Qordinate for Android power users.",
  },
  "/vs/omnara": {
    title: "Twent vs Omnara — Android AI Agent Comparison",
    description:
      "Twent delivers device-level automation, MCP ecosystem & a skills marketplace. See the full comparison for Android.",
  },
  "/vs/manus": {
    title: "Twent vs Manus — Mobile AI Agent Comparison",
    description:
      "Manus runs in the cloud. Twent runs on your Android with terminal access, local AI & full app control.",
  },
  "/vs/onspace": {
    title: "Twent vs Onspace — Android AI Agent Comparison",
    description:
      "Privacy-first, offline models & Ubuntu terminal. See how Twent and Onspace compare on Android in 2026.",
  },
};

// Route-specific keywords for SEO
// Each route maps to relevant search terms — natural, non-repetitive
const routeKeywords: Record<string, string[]> = {
  "/": [
    "AI assistant for Android",
    "phone automation app",
    "personal agent OS",
    "Android productivity",
    "mobile AI tools",
  ],
  "/pricing": [
    "free AI app Android no credit card",
    "is Twent AI free",
    "Twent pricing plans",
    "AI assistant Android free download",
    "free automation app no subscription",
    "Twent vs paid AI apps"
  ],
  "/docs": [
    "Twent AI setup guide",
    "how to use Twent Android",
    "AI agent Android tutorial",
    "Twent getting started",
    "Android AI assistant setup guide",
    "automate apps with AI Android",
    "MCP tools tutorial Android",
    "skills marketplace Twent guide"
  ],
  "/blog": [
    "Twent AI blog",
    "Android AI agent news",
    "AI automation tutorials",
    "mobile AI how-to guides",
    "AI agent articles 2026",
    "Android AI tips and tricks",
    "phone AI assistant guides"
  ],
  "/blog/marketplace": [
    "Twent AI skills store",
    "MCP plugins Android",
    "Composio AI integrations",
    "AI plugins for Twent",
    "buy AI skills Android",
    "Twent marketplace apps"
  ],
  "/ai-marketplace-creators": [
    "sell AI skills Android",
    "build AI mini apps",
    "AI app store creator",
    "monetize AI tools",
    "Twent developer platform",
    "make money AI apps"
  ],
  "/blog/best-ai-apps-android": [
    "top AI apps 2026",
    "ChatGPT Android alternative",
    "best AI tools mobile",
    "AI app ranking",
  ],
  "/android-automation-power-user": [
    "Android automation app",
    "how to automate apps on Android",
    "auto tap Android without root",
    "phone automation scripts",
    "auto swipe task",
    "script runner Android",
    "tasker alternative free",
    "UI automation Android app",
    "best Android automation 2026",
    "automate android phone"
  ],
  "/privacy-first-ai-android": [
    "private AI app for Android",
    "how to use AI privately on phone",
    "best offline AI app Android",
    "BYOK encryption AI Android",
    "local AI models phone",
    "offline AI assistant no internet",
    "no data collection AI app",
    "AI privacy features Android",
    "best private AI assistant"
  ],
  "/terminal-on-android": [
    "Ubuntu terminal on Android without root",
    "how to run Linux on Android phone",
    "best terminal app for Android 2026",
    "SSH on Android phone free",
    "Linux environment Android no root",
    "Ubuntu 24.04 on phone",
    "apt install on Android",
    "Python terminal Android",
    "mobile development environment phone"
  ],
  "/enterprise-ai-agent": [
    "team AI deployment",
    "business automation",
    "AI admin dashboard",
    "enterprise mobile tools",
  ],
  "/ai-agent-for-developers": [
    "Claude Code mobile",
    "code on phone",
    "MCP SDK Android",
    "mobile development environment",
  ],
  "/changelog": [
    "Twent AI update history",
    "Twent app changelog 2026",
    "latest Twent AI features",
    "Twent new release notes",
    "what's new in Twent AI"
  ],
  "/privacy": [
    "data protection",
    "AI privacy",
    "encryption standards",
    "BYOK security",
  ],
  "/terms": [
    "terms of service",
    "user agreement",
    "legal terms AI app",
  ],
  "/404": [
    "page not found",
    "lost page",
    "broken link fix",
  ],
  "/vs/chatgpt": [
    "ChatGPT Android app download",
    "ChatGPT vs Twent AI automation",
    "OpenAI assistant on Android",
    "ChatGPT alternative for automation",
    "AI chatbot Android comparison",
    "ChatGPT Android no internet"
  ],
  "/vs/nebula": [
    "Nebula AI Android alternative",
    "Nebula AI vs Twent mobile",
    "Nebula AI vs agentic AI",
    "best AI chatbot Android",
    "AI companion Android"
  ],
  "/vs/openclaw": [
    "OpenClaw Android alternative",
    "OpenClaw vs Twent automation",
    "AI agent Android comparison",
    "mobile AI automation tools"
  ],
  "/vs/hermes-agent": [
    "Hermes Agent vs Twent Android",
    "AI agent CLI mobile",
    "Claude Code Android vs Twent",
    "best AI agent for Android"
  ],
  "/vs/n8n": [
    "n8n vs Twent automation",
    "workflow automation mobile Android",
    "n8n alternative phone",
    "AI automation without cloud"
  ],
  "/vs/anything-llm": [
    "AnythingLLM alternative mobile",
    "local LLM Android app",
    "best offline AI app",
    "Twent vs local AI models"
  ],
  "/vs/gemini": [
    "Google Gemini Android download",
    "Gemini vs Twent automation",
    "Bard alternative Android",
    "Gemini AI agent features",
    "Google AI vs mobile automation"
  ],
  "/vs/replika": [
    "Replika vs Twent productivity",
    "AI companion vs AI agent",
    "Replika alternative Android free",
    "best AI for Android mental health"
  ],
  "/vs/copilot": [
    "Microsoft Copilot Android app",
    "Copilot vs Twent AI",
    "Windows AI assistant mobile alternative",
    "best AI for Android Microsoft users"
  ],
  "/vs/claude": [
    "Claude Android download",
    "Claude vs Twent device automation",
    "Anthropic AI on phone",
    "Claude Code mobile vs Twent"
  ],
  "/vs/perplexity": [
    "Perplexity AI Android",
    "Perplexity vs Twent actions",
    "answer engine vs AI agent",
    "AI search mobile Android"
  ],
  "/vs/make": [
    "Make.com alternative Android",
    "Integromat vs Twent",
    "visual workflow builder mobile",
    "no-code automation phone"
  ],
  "/vs/zapier": [
    "Zapier alternative Android mobile",
    "Zapier vs Twent automation",
    "cloud automation vs on-device AI",
    "best mobile automation app"
  ],
  "/vs/qordinate": [
    "Qordinate AI alternative",
    "Qordinate vs Twent Android",
    "productivity AI phone comparison"
  ],
  "/vs/omnara": [
    "Omnara AI alternative",
    "Omnara vs Twent mobile",
    "best AI assistant Android 2026"
  ],
  "/vs/manus": [
    "Manus AI alternative mobile",
    "Manus vs Twent autonomous AI",
    "best autonomous AI for Android"
  ],
  "/vs/onspace": [
    "Onspace AI alternative",
    "Onspace vs Twent privacy AI",
    "privacy AI Android comparison"
  ],
};

// Get localized meta title
function getLocalizedTitle(path: string, langCode: string): string {
  const base = pageMeta[path]?.title || pageMeta["/"].title;
  if (langCode === "en") return base;

  const lang = languages.find((l) => l.code === langCode);
  const langName = lang?.nativeName || lang?.name || "";

  // Append language name to title for non-English
  const parts = base.split(" - ");
  if (parts.length >= 2) {
    return `${parts[0]} - ${parts[1]} [${langName}]`;
  }
  return `${base} [${langName}]`;
}

export function MetaUpdater({ currentPath, canonicalPath }: { currentPath: string; canonicalPath?: string }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const langCode = i18n.language?.split("-")[0] || "en";
    const locale = getOgLocale(langCode);

    // Update og:locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute("content", locale);
    }

    // Update lang attribute
    document.documentElement.lang = langCode;

    // Update direction for RTL
    const lang = languages.find((l) => l.code === langCode);
    document.documentElement.dir = lang?.dir || "ltr";

    // Update page title
    const localizedTitle = getLocalizedTitle(currentPath, langCode);
    document.title = localizedTitle;

    // Update meta description (if page has specific one)
    const metaDesc = pageMeta[currentPath]?.description;
    if (metaDesc) {
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) {
        descEl.setAttribute("content", metaDesc);
      }
      // Also update og:description and twitter:description for social
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", metaDesc);
      }
      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) {
        twitterDesc.setAttribute("content", metaDesc);
      }
    }

    // Update meta keywords (if route has specific keywords)
    const keywords = routeKeywords[currentPath];
    if (keywords && keywords.length > 0) {
      const keywordsStr = keywords.join(", ");
      const keywordsEl = document.querySelector('meta[name="keywords"]');
      if (keywordsEl) {
        keywordsEl.setAttribute("content", keywordsStr);
      }
    }

    // Update canonical tag
    // If they differ (e.g. /details → canonical=/), the duplicate page gets the canonical of the preferred version
    const canonical = canonicalPath || currentPath;
    const langPrefix = langCode === "en" ? "" : `/${langCode}`;
    const canonicalUrl = `https://twent.xyz${langPrefix}${canonical}`;

    // Update or create canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // Update og:url to include language prefix
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute(
        "content",
        `https://twent.xyz${langPrefix}${currentPath}`,
      );
    }

    // Update og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", localizedTitle);
    }

    // Update og:image and twitter:image per-page
    const pageData = pageMeta[currentPath];
    const ogImagePath = pageData?.ogImage || "/TWENT-OPENGRAPH-IMG.webp";
    const ogImageUrl = `https://twent.xyz${ogImagePath}`;

    const setImageMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };

    // OG image
    setImageMeta('meta[property="og:image"]', ogImageUrl);
    setImageMeta('meta[property="og:image:secure_url"]', ogImageUrl);
    setImageMeta('meta[property="og:image:alt"]', localizedTitle);

    // Twitter image
    setImageMeta('meta[name="twitter:image"]', ogImageUrl);
    setImageMeta('meta[name="twitter:image:alt"]', localizedTitle);

    // OG image dimensions — vary by image type
    const isHeroImage = ogImagePath.includes("-hero");
    const ogImgWidth = document.querySelector('meta[property="og:image:width"]');
    const ogImgHeight = document.querySelector('meta[property="og:image:height"]');
    const twImgWidth = document.querySelector('meta[name="twitter:image:width"]');
    const twImgHeight = document.querySelector('meta[name="twitter:image:height"]');
    if (ogImgWidth) ogImgWidth.setAttribute("content", isHeroImage ? "1200" : "1200");
    if (ogImgHeight) ogImgHeight.setAttribute("content", isHeroImage ? "630" : "630");
    if (twImgWidth) twImgWidth.setAttribute("content", "1200");
    if (twImgHeight) twImgHeight.setAttribute("content", "630");
  }, [i18n.language, currentPath]);

  // This component renders nothing visible
  return null;
}

export default MetaUpdater;
