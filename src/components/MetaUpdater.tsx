// MetaUpdater - Dynamically updates document meta tags based on language
// Updates: og:locale, document.title, lang attribute, meta description
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '../i18n';
import { getOgLocale } from './HreflangTags';

// Page meta data per route (used for title/description updates)
const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Twent - Best Personal Assistant AI for Android (2026)',
    description: 'Twent is the best personal assistant AI app for Android. Connect 1000+ apps, run terminals, automate workflows, and use AI that actually does things. Free download.',
  },
  '/pricing': {
    title: 'Twent Pricing - Free AI Assistant for Android',
    description: 'Twent is free to download. Connect 1000+ apps, run terminals, and automate workflows with AI that actually does things.',
  },
  '/docs': {
    title: 'Twent Documentation - Getting Started with AI on Android',
    description: 'Learn how to set up and use Twent, the AI agent that actually works on your Android phone.',
  },
  '/blog': {
    title: 'Twent Blog - AI Agent News and Updates',
    description: 'Latest news, tutorials, and updates about Twent - the AI agent that actually works on Android.',
  },
  '/blog/marketplace': {
    title: 'Twent Marketplace - AI Skills & Integrations',
    description: 'Discover AI skills, MCP integrations, and Composio connections for the Twent AI agent.',
  },
  '/blog/marketplace-creators': {
    title: 'Twent Marketplace for Creators - Build AI Skills',
    description: 'Create and sell AI skills for the Twent marketplace. Reach millions of Android users.',
  },
  '/blog/android-automation-power-user': {
    title: 'Twent for Power Users - Android Automation with AI',
    description: 'Automate any Android task with Twent AI. Terminal access, script running, and more.',
  },
  '/blog/privacy-first-ai': {
    title: 'Privacy-First AI on Android - Twent',
    description: 'Your data stays on your phone. Twent is the privacy-first AI agent for Android.',
  },
  '/blog/terminal-on-android': {
    title: 'Terminal on Android with AI - Twent',
    description: 'Run Linux terminals on your Android phone with AI assistance. Full shell access powered by AI.',
  },
  '/blog/enterprise-ai-agent': {
    title: 'Enterprise AI Agent for Android - Twent',
    description: 'Deploy AI agents across your organization with Twent enterprise features.',
  },
  '/blog/ai-agent-for-developers': {
    title: 'AI Agent for Developers - Twent Android SDK',
    description: 'Build Android automation with Twent AI. MCP support, Composio integrations, and terminal access.',
  },
  '/vs/chatgpt': {
    title: 'Twent vs ChatGPT - AI Agents for Android',
    description: 'Compare Twent vs ChatGPT. Twent actually works on Android - not just a chatbot.',
  },
  '/vs/nebula': {
    title: 'Twent vs Nebula AI - Android Agent Comparison',
    description: 'Twent vs Nebula: See why Twent is the best AI agent for Android devices.',
  },
  '/vs/openclaw': {
    title: 'Twent vs OpenClaw - AI Agent Comparison',
    description: 'Compare Twent and OpenClaw AI agents for Android automation.',
  },
  '/vs/hermes-agent': {
    title: 'Twent vs Hermes Agent - Android AI Comparison',
    description: 'Twent vs Hermes Agent: Which AI agent works better on Android?',
  },
  '/vs/n8n': {
    title: 'Twent vs n8n - Workflow Automation Comparison',
    description: 'Compare Twent and n8n for Android workflow automation with AI.',
  },
  '/vs/anything-llm': {
    title: 'Twent vs AnythingLLM - AI Agent Comparison',
    description: 'Twent vs AnythingLLM: Mobile-first AI agent for Android.',
  },
  '/vs/gemini': {
    title: 'Twent vs Gemini - Google AI for Android Comparison (2026)',
    description: 'Compare Twent AI vs Google Gemini for Android. Twent offers device automation, local AI models, and BYOK privacy. Gemini is better for Workspace users.',
  },
  '/vs/replika': {
    title: 'Twent vs Replika - Best AI Companion App for Android (2026)',
    description: 'Compare Twent AI vs Replika for Android. Twent is the best alternative to Replika for getting things done, with terminal access, UI automation, and skill workflows.',
  },
  '/vs/copilot': {
    title: 'Twent vs Microsoft Copilot - AI Assistant for Android (2026)',
    description: 'Compare Twent AI vs Microsoft Copilot for Android. Twent offers full device automation, local models, and terminal access that Copilot cannot match.',
  },
  '/vs/claude': {
    title: 'Twent vs Claude Mobile - AI Assistant for Android (2026)',
    description: 'Compare Twent AI vs Claude for Android. Twent brings Claude Code execution, UI automation, and floating overlay to your Android device.',
  },
  '/vs/perplexity': {
    title: 'Twent vs Perplexity - AI That Searches vs AI That Acts (2026)',
    description: 'Twent vs Perplexity: Perplexity searches the web. Twent acts on your device. The best AI for Android users who want to get things done.',
  },
  '/vs/make': {
    title: 'Twent vs Make (Integromat) - Automation for Android (2026)',
    description: 'Compare Twent AI vs Make for Android automation. Twent runs AI agents directly on your phone with UI automation, terminals, and skill workflows.',
  },
  '/vs/zapier': {
    title: 'Twent vs Zapier - AI Automation for Android (2026)',
    description: 'Compare Twent AI vs Zapier for Android automation. Twent brings AI agents to your phone with full terminal access and UI automation.',
  },
  '/vs/qordinate': {
    title: 'Twent vs Qordinate - AI Agent for Android (2026)',
    description: 'Compare Twent AI vs Qordinate for Android. See why Twent is the better AI agent with more integrations, local models, and automation capabilities.',
  },
  '/vs/omnara': {
    title: 'Twent vs Omnara - AI Agent Orchestration for Android (2026)',
    description: 'Compare Twent AI vs Omnara for Android. Twent excels at device-level AI automation with MCP ecosystem and skill marketplace.',
  },
  '/vs/manus': {
    title: 'Twent vs Manus - AI Agent for Android (2026)',
    description: 'Compare Twent AI vs Manus for Android automation. Twent runs on your device with full terminal access and AI agent execution.',
  },
  '/vs/onspace': {
    title: 'Twent vs Onspace - AI Agent for Android (2026)',
    description: 'Compare Twent AI vs Onspace for Android. Twent is the privacy-first AI agent with BYOK model support and local AI execution.',
  },
  '/vs/soundhound': {
    title: 'Twent vs SoundHound AI - Voice AI Comparison for Android (2026)',
    description: 'Compare Twent AI vs SoundHound AI for Android. SoundHound excels at voice AI and music recognition. Twent is better for device automation, tasks, and productivity.',
  },
  '/vs/claude': {
    title: 'Twent vs Claude - AI Assistant for Android',
    description: 'Compare Twent and Claude AI assistants for Android.',
  },
  '/vs/perplexity': {
    title: 'Twent vs Perplexity - AI Search Comparison',
    description: 'Twent vs Perplexity: AI that searches vs AI that actually does things.',
  },
  '/vs/make': {
    title: 'Twent vs Make (Integromat) - Automation Comparison',
    description: 'Compare Twent and Make for AI-powered Android automation.',
  },
  '/vs/zapier': {
    title: 'Twent vs Zapier - AI Automation Comparison',
    description: 'Twent vs Zapier: Mobile AI automation that actually works on Android.',
  },
  '/vs/qordinate': {
    title: 'Twent vs Qordinate - AI Agent Comparison',
    description: 'Compare Twent and Qordinate AI agents for Android.',
  },
  '/vs/omnara': {
    title: 'Twent vs Omnara - AI Agent Comparison',
    description: 'Twent vs Omnara: Which AI agent is better for Android?',
  },
  '/vs/manus': {
    title: 'Twent vs Manus - AI Agent Comparison',
    description: 'Compare Twent and Manus AI agents for Android automation.',
  },
  '/vs/genspark': {
    title: 'Twent vs Genspark - AI Agent Comparison',
    description: 'Twent vs Genspark: Mobile AI agents for Android compared.',
  },
  '/vs/onspace': {
    title: 'Twent vs Onspace - AI Agent Comparison',
    description: 'Compare Twent and Onspace AI agents for Android.',
  },
};

// Get localized meta title
function getLocalizedTitle(path: string, langCode: string): string {
  const base = pageMeta[path]?.title || pageMeta['/'].title;
  if (langCode === 'en') return base;
  
  const lang = languages.find(l => l.code === langCode);
  const langName = lang?.nativeName || lang?.name || '';
  
  // Append language name to title for non-English
  const parts = base.split(' - ');
  if (parts.length >= 2) {
    return `${parts[0]} - ${parts[1]} [${langName}]`;
  }
  return `${base} [${langName}]`;
}

export function MetaUpdater({ currentPath }: { currentPath: string }) {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const langCode = i18n.language?.split('-')[0] || 'en';
    const locale = getOgLocale(langCode);
    
    // Update og:locale
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', locale);
    }
    
    // Update lang attribute
    document.documentElement.lang = langCode;
    
    // Update direction for RTL
    const lang = languages.find(l => l.code === langCode);
    document.documentElement.dir = lang?.dir || 'ltr';
    
    // Update page title
    const localizedTitle = getLocalizedTitle(currentPath, langCode);
    document.title = localizedTitle;
    
    // Update meta description (if page has specific one)
    const metaDesc = pageMeta[currentPath]?.description;
    if (metaDesc) {
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) {
        descEl.setAttribute('content', metaDesc);
      }
    }
    
    // Update og:url to include language prefix
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      const basePath = currentPath;
      const langPrefix = langCode === 'en' ? '' : `/${langCode}`;
      ogUrl.setAttribute('content', `https://twent.ai${langPrefix}${basePath}`);
    }
    
    // Update og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', localizedTitle);
    }
  }, [i18n.language, currentPath]);
  
  // This component renders nothing visible
  return null;
}

export default MetaUpdater;
