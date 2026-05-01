// MetaUpdater - Dynamically updates document meta tags based on language
// Updates: og:locale, document.title, lang attribute, meta description
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n";
import { getOgLocale } from "./HreflangTags";

// Page meta data per route (used for title/description updates)
// All descriptions optimized: 120-160 chars, compelling CTA
const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Twent - Best AI Agent for Android | Automates Everything",
    description:
      "The AI agent that runs ON your Android — automates apps, runs Ubuntu terminal & connects 1000+ services. Download Twent free.",
  },
  "/pricing": {
    title: "Twent Pricing - Free AI Agent for Android",
    description:
      "Twent is 100% free. Automate Android apps, run Ubuntu terminal & connect 1000+ services. No credit card. Get started now.",
  },
  "/docs": {
    title: "Twent Docs - Getting Started with AI on Android",
    description:
      "Step-by-step guides for Twent AI agent on Android — automate apps, run Ubuntu terminal & connect 1000+ services. Start free.",
  },
  "/blog": {
    title: "Twent Blog - AI Agent News and Updates",
    description:
      "Tutorials, feature deep-dives & AI agent news for Android users. Learn how to automate your phone step by step. Start free.",
  },
  "/blog/marketplace": {
    title: "Twent Marketplace - AI Skills & Integrations",
    description:
      "Browse AI skills, MCP integrations & Composio connections for the Twent AI agent. Supercharge your Android AI. Try free.",
  },
  "/blog/marketplace-creators": {
    title: "Twent Marketplace for Creators - Build & Sell AI Skills",
    description:
      "Sell AI skills, workflows & mini apps to millions of Android users. Build once, earn forever. Join the Twent marketplace free.",
  },
  "/blog/best-ai-apps-android": {
    title: "25 Best AI Apps for Android in 2026 | Twent",
    description:
      "25 best AI apps for Android in 2026 ranked — ChatGPT, Claude, Gemini, Twent & more. Find your perfect AI. Read the guide now.",
  },
  "/blog/android-automation-power-user": {
    title: "Android Automation App - Auto-Tap, Swipe & AI Scripts",
    description:
      "The ultimate Android automation app: auto-tap, swipe, type & run scripts with AI. No root needed. Automate any app. Download Twent free.",
  },
  "/blog/privacy-first-ai": {
    title: "Privacy-First AI on Android - BYOK & Local Models",
    description:
      "BYOK encryption, local AI models & offline mode. Your data never leaves your device. The most private AI for Android. Free.",
  },
  "/blog/terminal-on-android": {
    title: "Ubuntu Terminal on Android - Full Linux with AI (No Root)",
    description:
      "Run a real Ubuntu 24.04 LTS terminal on Android. apt, Python, Node, SSH — Linux in your pocket. Download Twent free today.",
  },
  "/blog/enterprise-ai-agent": {
    title: "Enterprise AI Agent for Android - Twent Teams",
    description:
      "Deploy AI agents across your team. Admin dashboard, compliance controls & audit trails. Enterprise-grade AI on Android. Free trial.",
  },
  "/blog/ai-agent-for-developers": {
    title: "AI Agent for Android Developers - MCP, CLI & SDK",
    description:
      "Claude Code, Codex & CLI tools on your Android phone. Full Ubuntu terminal, git, MCP & SSH. Ship code from anywhere. Free.",
  },
  "/changelog": {
    title: "Twent Changelog - Latest Updates & Features",
    description:
      "See every update, feature & fix for Twent AI agent — the Android app that actually ships. Stay up to date. Free download.",
  },
  "/privacy": {
    title: "Twent Privacy Policy - How We Handle Your Data",
    description:
      "How Twent handles your data — encryption, no data sales & transparency reports. Built privacy-first for Android. Free download.",
  },
  "/terms": {
    title: "Twent Terms of Service - Legal Terms",
    description:
      "Legal terms for using Twent — the AI agent for Android. Clear, fair & human-readable. Everything you need to know. Free download.",
  },
  "/404": {
    title: "Page Not Found | Twent",
    description:
      "Page not found — but Twent AI can help you find what you need. The best AI agent for Android. Download the free app now.",
  },
  "/vs/chatgpt": {
    title: "Twent vs ChatGPT - AI Agent for Android",
    description:
      "ChatGPT chats. Twent ACTS — taps apps, runs terminals & automates your Android device. The AI agent that does things. Download free.",
  },
  "/vs/nebula": {
    title: "Twent vs Nebula AI - Best Android Agent",
    description:
      "Twent vs Nebula: Twent wins with local AI models, UI automation & Ubuntu terminal. Full-featured AI agent for Android. Try free.",
  },
  "/vs/openclaw": {
    title: "Twent vs OpenClaw - AI Agent for Android",
    description:
      "Twent vs OpenClaw: more integrations, local AI & device-level automation. The better AI agent for Android. Download free.",
  },
  "/vs/hermes-agent": {
    title: "Twent vs Hermes Agent - AI Agent for Android",
    description:
      "Twent runs Hermes Agent on your Android with full Ubuntu terminal & UI automation. The ultimate AI agent for Android. Download free.",
  },
  "/vs/n8n": {
    title: "Twent vs n8n - AI Workflow Automation for Android",
    description:
      "Twent runs AI agents ON your Android — not in the cloud. UI automation + Ubuntu terminal. The most powerful Android AI. Free.",
  },
  "/vs/anything-llm": {
    title: "Twent vs AnythingLLM - Best AI Agent for Android",
    description:
      "Twent brings AI agent execution to Android with local models, automation & skills marketplace. The best AI agent for Android. Try free.",
  },
  "/vs/gemini": {
    title: "Twent vs Google Gemini - AI for Android (2026)",
    description:
      "Twent vs Google Gemini: Twent offers device automation, local AI models & BYOK privacy. No Gemini Workspace required. Download free.",
  },
  "/vs/replika": {
    title: "Twent vs Replika - Best AI Companion for Android (2026)",
    description:
      "Twent vs Replika: Twent is the best Replika alternative for Android — automation, terminal & skills marketplace. Free download.",
  },
  "/vs/copilot": {
    title: "Twent vs Microsoft Copilot - AI Assistant for Android",
    description:
      "Twent vs Microsoft Copilot: Twent runs ON your Android with full automation & local AI. No browser needed. Download free.",
  },
  "/vs/claude": {
    title: "Twent vs Claude Mobile - AI Agent for Android (2026)",
    description:
      "Twent vs Claude Mobile: Twent brings Claude Code execution, UI automation & floating overlay to your Android device. Try free.",
  },
  "/vs/perplexity": {
    title: "Twent vs Perplexity - AI That Searches vs AI That Acts",
    description:
      "Perplexity searches. Twent ACTS — automates apps, runs terminals & executes AI tasks on your phone. The action AI. Free.",
  },
  "/vs/make": {
    title: "Twent vs Make - Automation for Android (2026)",
    description:
      "Twent vs Make: Twent runs AI agents ON your Android phone, not in the cloud. The most powerful automation. Free download.",
  },
  "/vs/zapier": {
    title: "Twent vs Zapier - AI Automation for Android (2026)",
    description:
      "Twent vs Zapier: AI agents on your Android with full terminal & UI automation. Powerful automation. Try Twent free today.",
  },
  "/vs/qordinate": {
    title: "Twent vs Qordinate - Best AI Agent for Android (2026)",
    description:
      "Twent vs Qordinate: more integrations, local AI models & automation features. The better AI agent for Android. Try free.",
  },
  "/vs/omnara": {
    title: "Twent vs Omnara - AI Agent for Android (2026)",
    description:
      "Twent vs Omnara: device-level AI automation, MCP ecosystem & skills marketplace. The best AI agent for Android. Try free today.",
  },
  "/vs/manus": {
    title: "Twent vs Manus - AI Agent for Android (2026)",
    description:
      "Twent vs Manus: Twent runs ON your Android with full terminal access & AI agent execution. The future of mobile AI. Try Twent free.",
  },
  "/vs/onspace": {
    title: "Twent vs Onspace - Best AI Agent for Android (2026)",
    description:
      "Twent vs Onspace: BYOK privacy, local AI models & Ubuntu terminal. The best AI agent for Android. Download Twent free today.",
  },
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

export function MetaUpdater({ currentPath }: { currentPath: string }) {
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

    // Update og:url to include language prefix
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      const basePath = currentPath;
      const langPrefix = langCode === "en" ? "" : `/${langCode}`;
      ogUrl.setAttribute(
        "content",
        `https://twent.xyz${langPrefix}${basePath}`,
      );
    }

    // Update og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", localizedTitle);
    }
  }, [i18n.language, currentPath]);

  // This component renders nothing visible
  return null;
}

export default MetaUpdater;
