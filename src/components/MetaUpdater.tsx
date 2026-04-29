// MetaUpdater - Dynamically updates document meta tags based on language
// Updates: og:locale, document.title, lang attribute, meta description
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n";
import { getOgLocale } from "./HreflangTags";

// Page meta data per route (used for title/description updates)
const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Twent - Best AI Agent for Android (2026) | Runs on Your Phone, Automates Everything",
    description:
      "Twent is an agentic AI agent for Android that automates apps, runs a full Ubuntu terminal, and connects 1000+ services. Free download.",
  },
  "/pricing": {
    title: "Twent Pricing - Free AI Agent for Android",
    description:
      "Twent is free to download. Connect 1000+ apps, run a full Ubuntu terminal, and automate workflows with an AI agent that actually does things on your phone.",
  },
  "/docs": {
    title: "Twent Documentation - Getting Started with AI on Android",
    description:
      "Learn how to set up and use Twent, the AI agent that actually works on your Android phone.",
  },
  "/blog": {
    title: "Twent Blog - AI Agent News and Updates",
    description:
      "Latest news, tutorials, and updates about Twent - the AI agent that actually works on Android.",
  },
  "/blog/marketplace": {
    title: "Twent Marketplace - AI Skills & Integrations",
    description:
      "Discover AI skills, MCP integrations, and Composio connections for the Twent AI agent.",
  },
  "/blog/marketplace-creators": {
    title: "Twent Marketplace for Creators - Build AI Skills",
    description:
      "Create and sell AI skills for the Twent marketplace. Reach millions of Android users.",
  },
  "/blog/best-ai-apps-android": {
    title: "25 Best AI Apps for Android - Turn Your Phone Into a Supercomputer | Twent",
    description:
      "The definitive guide to the best AI apps for Android in 2025–2026. From ChatGPT to Claude to Twent — discover 25 apps that unlock your phone's true potential.",
  },
  "/blog/android-automation-power-user": {
    title: "Android Automation App - Auto-Tap, Swipe & Run Scripts with AI | Twent",
    description:
      "Twent is the Android automation app that lets you auto-tap, swipe, type, and run scripts with AI. Automate any phone task without root. Features terminal access, local AI, and skill marketplace. Free download.",
  },
  "/blog/privacy-first-ai": {
    title: "Privacy-First AI on Android - Private AI Assistant with BYOK & Local Models",
    description:
      "Keep your data on your device with Twent's privacy-first AI agent. Features BYOK, local AI models, offline operation, and open-source transparency. Free download.",
  },
  "/blog/terminal-on-android": {
    title: "Ubuntu on Android - Full Linux Terminal with AI Assistance (No Root Required)",
    description:
      "Run a real Ubuntu 24.04 LTS terminal on your Android phone with AI assistance. Access apt, run Linux commands, and automate your terminal with AI. No root required - works on any Android 8.0+ device.",
  },
  "/blog/enterprise-ai-agent": {
    title: "Enterprise AI Agent for Android - Twent",
    description:
      "Deploy AI agents across your organization with Twent enterprise features.",
  },
  "/blog/ai-agent-for-developers": {
    title: "AI Agent for Developers - Twent Android SDK",
    description:
      "Build Android automation with Twent AI. MCP support, Composio integrations, and terminal access.",
  },
  "/vs/chatgpt": {
    title: "Twent vs ChatGPT - AI Agents for Android",
    description:
      "Compare Twent vs ChatGPT. Twent actually works on Android - not just a chatbot.",
  },
  "/vs/nebula": {
    title: "Twent vs Nebula AI - Android Agent Comparison",
    description:
      "Twent vs Nebula: See why Twent is the best AI agent for Android devices.",
  },
  "/vs/openclaw": {
    title: "Twent vs OpenClaw for Android - AI Agent Comparison",
    description:
      "Compare Twent and OpenClaw for Android AI automation. See why Twent is the better AI agent for device-level automation.",
  },
  "/vs/hermes-agent": {
    title: "Twent vs Hermes Agent - Android AI Comparison",
    description:
      "Twent vs Hermes Agent: Which AI agent works better on Android?",
  },
  "/vs/n8n": {
    title: "Twent vs n8n - Workflow Automation Comparison",
    description:
      "Compare Twent and n8n for Android workflow automation with AI.",
  },
  "/vs/anything-llm": {
    title: "Twent vs AnythingLLM - AI Agent Comparison",
    description: "Twent vs AnythingLLM: Mobile-first AI agent for Android.",
  },
  "/vs/gemini": {
    title: "Twent vs Gemini - Google AI for Android Comparison (2026)",
    description:
      "Compare Twent AI vs Google Gemini for Android. Twent offers device automation, local AI models, and BYOK privacy. Gemini is better for Workspace users.",
  },
  "/vs/replika": {
    title: "Twent vs Replika - Best AI Companion App for Android (2026)",
    description:
      "Compare Twent AI vs Replika for Android. Twent is the best alternative to Replika for getting things done, with terminal access, UI automation, and skill workflows.",
  },
  "/vs/copilot": {
    title: "Twent vs Microsoft Copilot - AI Assistant for Android (2026)",
    description:
      "Compare Twent AI vs Microsoft Copilot for Android. Twent offers full device automation, local models, and terminal access that Copilot cannot match.",
  },
  "/vs/claude": {
    title: "Twent vs Claude Mobile - AI Assistant for Android (2026)",
    description:
      "Compare Twent AI vs Claude for Android. Twent brings Claude Code execution, UI automation, and floating overlay to your Android device.",
  },
  "/vs/perplexity": {
    title: "Twent vs Perplexity - AI That Searches vs AI That Acts (2026)",
    description:
      "Twent vs Perplexity: Perplexity searches the web. Twent acts on your device. The best AI for Android users who want to get things done.",
  },
  "/vs/make": {
    title: "Twent vs Make (Integromat) - Automation for Android (2026)",
    description:
      "Compare Twent AI vs Make for Android automation. Twent runs AI agents directly on your phone with UI automation, terminals, and skill workflows.",
  },
  "/vs/zapier": {
    title: "Twent vs Zapier - AI Automation for Android (2026)",
    description:
      "Compare Twent AI vs Zapier for Android automation. Twent brings AI agents to your phone with full terminal access and UI automation.",
  },
  "/vs/qordinate": {
    title: "Twent vs Qordinate - AI Agent for Android (2026)",
    description:
      "Compare Twent AI vs Qordinate for Android. See why Twent is the better AI agent with more integrations, local models, and automation capabilities.",
  },
  "/vs/omnara": {
    title: "Twent vs Omnara - AI Agent Orchestration for Android (2026)",
    description:
      "Compare Twent AI vs Omnara for Android. Twent excels at device-level AI automation with MCP ecosystem and skill marketplace.",
  },
  "/vs/manus": {
    title: "Twent vs Manus - AI Agent for Android (2026)",
    description:
      "Compare Twent AI vs Manus for Android automation. Twent runs on your device with full terminal access and AI agent execution.",
  },
  "/vs/onspace": {
    title: "Twent vs Onspace - AI Agent for Android (2026)",
    description:
      "Compare Twent AI vs Onspace for Android. Twent is the privacy-first AI agent with BYOK model support and local AI execution.",
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
