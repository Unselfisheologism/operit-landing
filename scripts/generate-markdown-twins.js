#!/usr/bin/env node
/**
 * Dualmark Markdown Twin Generator
 * 
 * Generates markdown twins for every page on the site.
 * Run: node scripts/generate-markdown-twins.js
 * 
 * This script creates .md files that AI agents can read.
 * The Cloudflare Pages Function handles content negotiation
 * to serve HTML to browsers and markdown to AI agents.
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Page definitions with SEO metadata
const PAGES = [
  {
    slug: 'index',
    url: '/',
    title: 'Twent - AI Agent for Android (2026) | Automates Everything',
    description: 'Your personal agentic OS in your pocket. Automate any app, run a real Ubuntu terminal, connect 1000+ services. Free download.',
    type: 'landing',
  },
  {
    slug: 'pricing',
    url: '/pricing',
    title: 'Twent Pricing — Free AI Agent for Android',
    description: 'No credit card needed. Get full access to Android automation, Ubuntu terminal & 1000+ integrations — completely free.',
    type: 'pricing',
  },
  {
    slug: 'docs',
    url: '/docs',
    title: 'Twent Docs — Getting Started',
    description: 'Step-by-step guides: automate apps, run Ubuntu terminal, connect MCP skills. Everything you need to get started.',
    type: 'docs',
  },
  {
    slug: 'blog',
    url: '/blog',
    title: 'Twent Blog — News and Tutorials',
    description: 'Tutorials, deep-dives & product news. Learn how to get the most from your Android device with AI assistance.',
    type: 'blog',
  },
  {
    slug: 'blog/marketplace',
    url: '/blog/marketplace',
    title: 'Twent Marketplace — AI Skills & Integrations',
    description: 'Browse AI skills, MCP tools & Composio connections. Supercharge your Android setup with curated extensions.',
    type: 'blog',
  },
  {
    slug: 'blog/best-ai-apps-android',
    url: '/blog/best-ai-apps-android',
    title: '25 Best AI Apps for Android in 2026',
    description: 'A curated ranking of the top AI apps for Android in 2026 — from chatbots to agentic tools. Find the right one for you.',
    type: 'blog',
  },
  {
    slug: 'ai-agent-for-developers',
    url: '/ai-agent-for-developers',
    title: 'Code on Your Phone — MCP, CLI & Ubuntu Terminal',
    description: 'Run Claude Code, Codex & full CLI tools on your Android device. Git, SSH, MCP & VS Code Server in a mobile shell.',
    type: 'landing',
  },
  {
    slug: 'android-automation-power-user',
    url: '/android-automation-power-user',
    title: 'Android Automation — Auto-Tap, Swipe & AI Scripts',
    description: 'Auto-tap, swipe, type & run custom scripts on any Android app. No root needed. Your phone works for you.',
    type: 'landing',
  },
  {
    slug: 'privacy-first-ai-android',
    url: '/privacy-first-ai-android',
    title: 'Privacy-First AI on Android — BYOK & Local Models',
    description: 'Your data never leaves your device. Bring your own API keys (encrypted locally), run offline AI models. Zero telemetry.',
    type: 'landing',
  },
  {
    slug: 'terminal-on-android',
    url: '/terminal-on-android',
    title: 'Ubuntu Terminal on Android — Full Linux (No Root)',
    description: 'Run Ubuntu 24.04 LTS on your Android phone. apt, Python, Node, SSH — a real Linux environment in your pocket.',
    type: 'landing',
  },
  {
    slug: 'ai-marketplace-creators',
    url: '/ai-marketplace-creators',
    title: 'Build & Sell AI Skills on Twent',
    description: 'Turn your automations into products. Build skills once, reach millions of Android users. Simple publishing, fair revenue share.',
    type: 'landing',
  },
  {
    slug: 'enterprise-ai-agent',
    url: '/enterprise-ai-agent',
    title: 'Twent Teams — AI Agents for Your Organization',
    description: 'Deploy AI agents across your team with admin controls, compliance settings & usage dashboards. Built for Android fleets.',
    type: 'landing',
  },
  {
    slug: 'changelog',
    url: '/changelog',
    title: 'Twent Changelog (2026) - What\'s New',
    description: 'Every update, feature & bug fix. Stay up to date with the Android app that actually ships. Free download.',
    type: 'changelog',
  },
  {
    slug: 'privacy',
    url: '/privacy',
    title: 'Twent Privacy Policy - Your Data, Your Control',
    description: 'How your data is handled: encryption standards, what we never collect, and our transparency commitments.',
    type: 'legal',
  },
  {
    slug: 'terms',
    url: '/terms',
    title: 'Twent Terms of Service - Free AI Agent Android',
    description: 'Clear, human-readable terms for using Twent. No fine print surprises — just fair terms for a free product.',
    type: 'legal',
  },
  {
    slug: 'vs/chatgpt',
    url: '/vs/chatgpt',
    title: 'Twent vs ChatGPT - Android AI Comparison (2026)',
    description: 'ChatGPT chats. Twent acts — controls apps, runs terminals & automates your workflow from your Android device.',
    type: 'compare',
  },
  {
    slug: 'vs/claude',
    url: '/vs/claude',
    title: 'Twent vs Claude - Mobile AI Agent (2026)',
    description: 'Claude on mobile is limited. Twent brings Claude Code execution, floating overlay & Android automation to the same device.',
    type: 'compare',
  },
  {
    slug: 'vs/gemini',
    url: '/vs/gemini',
    title: 'Twent vs Gemini - Android AI Agent (2026)',
    description: 'Gemini lives in a browser. Twent runs on your device with BYOK privacy, offline models & full automation.',
    type: 'compare',
  },
  {
    slug: 'vs/nebula',
    url: '/vs/nebula',
    title: 'Twent vs Nebula - Android AI Agent (2026)',
    description: 'Device automation, local models & Ubuntu terminal — see how Twent compares to Nebula for Android power users.',
    type: 'compare',
  },
  {
    slug: 'vs/openclaw',
    url: '/vs/openclaw',
    title: 'Twent vs OpenClaw - Android AI Agent (2026)',
    description: 'More integrations, offline models & UI automation. How Twent stacks up against OpenClaw for Android.',
    type: 'compare',
  },
  {
    slug: 'vs/hermes-agent',
    url: '/vs/hermes-agent',
    title: 'Twent vs Hermes Agent - Android Comparison (2026)',
    description: 'Hermes Agent runs in Twent with full Ubuntu terminal & UI control. See how they compare on Android.',
    type: 'compare',
  },
  {
    slug: 'vs/n8n',
    url: '/vs/n8n',
    title: 'Twent vs n8n - Automation on Android vs Cloud (2026)',
    description: 'n8n runs in the cloud. Twent runs on your Android device with full terminal access & app automation.',
    type: 'compare',
  },
  {
    slug: 'vs/anything-llm',
    url: '/vs/anything-llm',
    title: 'Twent vs AnythingLLM - Mobile AI Agent (2026)',
    description: 'AnythingLLM is desktop-first. Twent brings agentic execution, automation & a skills marketplace to your phone.',
    type: 'compare',
  },
  {
    slug: 'vs/replika',
    url: '/vs/replika',
    title: 'Twent vs Replika - Productivity vs Companion AI (2026)',
    description: 'Replika is for conversation. Twent is for getting things done — automation, terminal & integrations on Android.',
    type: 'compare',
  },
  {
    slug: 'vs/copilot',
    url: '/vs/copilot',
    title: 'Twent vs Copilot - Android AI Comparison (2026)',
    description: 'Copilot is browser-based. Twent gives you a floating AI overlay, automation & local models on your device.',
    type: 'compare',
  },
  {
    slug: 'vs/perplexity',
    url: '/vs/perplexity',
    title: 'Twent vs Perplexity - Search AI vs Action AI (2026)',
    description: 'Perplexity finds answers. Twent acts on them — automates tasks, runs terminals & executes workflows on your phone.',
    type: 'compare',
  },
  {
    slug: 'vs/make',
    url: '/vs/make',
    title: 'Twent vs Make - Automation on Android vs Workflows (2026)',
    description: 'Make builds cloud workflows. Twent runs agents locally on your Android — with full terminal access & no internet required.',
    type: 'compare',
  },
  {
    slug: 'vs/zapier',
    url: '/vs/zapier',
    title: 'Twent vs Zapier - Automation That Lives on Your Phone (2026)',
    description: 'Zapier connects cloud apps. Twent connects to everything on your Android device, including apps Zapier can\'t reach.',
    type: 'compare',
  },
  {
    slug: 'vs/qordinate',
    url: '/vs/qordinate',
    title: 'Twent vs Qordinate - Android AI Agent Comparison (2026)',
    description: 'More integrations, offline capability & automation depth. How Twent compares to Qordinate for Android power users.',
    type: 'compare',
  },
  {
    slug: 'vs/omnara',
    url: '/vs/omnara',
    title: 'Twent vs Omnara - Android AI Agent Comparison (2026)',
    description: 'Twent delivers device-level automation, MCP ecosystem & a skills marketplace. See the full comparison for Android.',
    type: 'compare',
  },
  {
    slug: 'vs/manus',
    url: '/vs/manus',
    title: 'Twent vs Manus - Mobile AI Agent (2026)',
    description: 'Manus runs in the cloud. Twent runs on your Android with terminal access, local AI & full app control.',
    type: 'compare',
  },
  {
    slug: 'vs/onspace',
    url: '/vs/onspace',
    title: 'Twent vs Onspace - Android AI Agent Comparison (2026)',
    description: 'Privacy-first, offline models & Ubuntu terminal. See how Twent and Onspace compare on Android in 2026.',
    type: 'compare',
  },
];

// Markdown templates per page type
const templates = {
  landing: (page) => `# ${page.title}

> ${page.description}

## What is Twent?

Twent is a personal agentic AI OS for Android that combines a full Ubuntu 24.04 terminal, local AI model execution, and deep system automation. It runs entirely on your Android device with no cloud dependency.

## Core Features

### AI Agent Capabilities
- Screen reading and UI automation (tap, swipe, scroll, type)
- Floating chat bubble overlay
- Voice wake word activation
- Persistent memory system
- MCP (Model Context Protocol) plugins
- Composio integration (1000+ app connections)

### Full Ubuntu Terminal
- Runs Ubuntu 24.04 (Noble) on Android without root
- Full CLI with bash, zsh, fish shells
- Package manager (apt, npm, pip, cargo)
- Git, SSH, and development tools
- Compiler support: Python, Node.js, Go, Rust, C/C++

### Local AI & Privacy
- Runs GGUF models locally on device
- BYOK - Bring Your Own Key for API access (encrypted locally)
- MNN (Mobile Neural Networks) for efficient inference
- Zero telemetry - no data leaves your device
- On-device embedding generation

### Developer Tools
- Claude Code integration
- OpenAI Codex support
- Git and GitHub CLI
- VS Code Server
- SSH client and server

### Automation & Workflows
- Visual workflow builder
- Tasker integration
- Scheduled triggers
- Conditional logic (if/then/else)

## Pricing

Twent is free. Everything is free. No credit card required.
- **Free**: Ubuntu terminal, basic AI, no cloud dependency
- **Pro**: All features, priority support ($9.99/mo — coming later)

## Technical Requirements

- Android 8.0+ (API 26)
- 3GB+ RAM recommended
- 500MB+ storage
- arm64-v8a architecture
- No root required

## Related Pages

- [Home](/) - Main landing page
- [Pricing](/pricing) - Free plan details
- [Documentation](/docs) - Full documentation

## Download

Get Twent at https://twent.xyz — direct APK download, no Play Store required.

## Contact

- Website: https://twent.xyz
- Support: support@twent.xyz
`,

  pricing: (page) => `# ${page.title}

> ${page.description}

## Pricing

**Your receipt, sir. Total damage: $0.00.**

Every feature. Every tool. Every capability. All included, all free.

## Features Included Free

| Feature | Price |
|---------|-------|
| Ubuntu 24.04 Terminal | $0.00 |
| UI Automation Agent | $0.00 |
| 50+ Built-in Tools | $0.00 |
| MCP Server Support | $0.00 |
| Skills & Workflows | $0.00 |
| Voice Activation | $0.00 |
| Smart Memory | $0.00 |
| BYOK (Your API Keys) | $0.00 |
| Local Model Support | $0.00 |
| File Generation | $0.00 |
| Mini-Apps | $0.00 |
| Character Cards | $0.00 |

## FAQ

### Is Twent really free?
Yes. Right now, everything is completely free. All 50+ tools, the Ubuntu terminal, overlay agent, MCP servers, skills, workflows — the whole thing.

### How do you distribute the app if it's not on the Play Store?
We distribute the APK directly from our website. Download, install, and you're good to go.

### Will there be ads?
Eventually, yes — powered by AI ads. A future Pro plan ($20) will remove them entirely.

### What's the marketplace?
The marketplace is an upcoming agentic app store — users can sell skills, workflows, plugins, and MCP servers.

## Technical Requirements

- Android 8.0+ (API 26)
- 3GB+ RAM recommended
- 500MB+ storage
- arm64-v8a architecture
- No root required

## Download

Get Twent at https://twent.xyz — direct APK download, no credit card needed.
`,

  blog: (page) => `# ${page.title}

> ${page.description}

## The Twent Journal

Deep dives on agentic AI, on-device intelligence, and building the future of human-computer interaction.

## Articles

### The Twent Marketplace: Your Agentic App Store
- Published: April 19, 2026
- Category: Product
- Read time: 5 min
[Read the full article](https://twent.xyz/blog/marketplace)

### 25 Best AI Apps for Android to Turn Your Phone Into a Supercomputer
- Published: April 29, 2026
- Category: Roundup
- Read time: 12 min
[Read the full article](https://twent.xyz/blog/best-ai-apps-android)

## About Twent

Twent is a personal agentic AI OS for Android that combines a full Ubuntu 24.04 terminal, local AI model execution, and deep system automation. It runs entirely on your Android device with no cloud dependency.

## Related Pages

- [Home](https://twent.xyz/) - Main landing page
- [Pricing](https://twent.xyz/pricing) - Free plan details
`,

  compare: (page) => `# ${page.title}

> ${page.description}

## Twent vs [Competitor]

Twent is an AI agent for Android that can actually do things — not just chat, but automate, run terminals, and connect to 1000+ apps. Here's how it compares.

## Twent Core Capabilities

### Device Automation
- Tap, swipe, scroll, type on any app
- Screen reading and UI interaction
- No root required
- Works on Android 8.0+

### Full Ubuntu Terminal
- Ubuntu 24.04 LTS on Android
- apt, npm, pip, cargo package managers
- Python, Node.js, Go, Rust, C/C++ compilers
- Git, SSH, VS Code Server

### Local AI & Privacy
- Runs GGUF models locally
- BYOK (Bring Your Own Key) — your API keys never leave your device
- Zero telemetry, zero data collection
- MNN for efficient on-device inference

### Agent Swarm
- Claude Code for serious refactoring
- OpenAI Codex for quick scripts
- Hermes Agent for deep research
- Each agent runs on your device

### Integrations
- MCP (Model Context Protocol) servers
- Composio (1000+ app integrations)
- Skills marketplace
- Reusable AI behaviors

## Comparison Table

| Feature | Twent | [Competitor] |
|---------|-------|---------------|
| Local AI | ✓ | ? |
| Ubuntu Terminal | ✓ | ? |
| Android Automation | ✓ | ? |
| No Internet Required | ✓ | ? |
| MCP Plugins | ✓ | ? |
| BYOK Privacy | ✓ | ? |
| Free Tier | ✓ | ? |

## Get Twent

Download at https://twent.xyz — direct APK, no Play Store required.

## Related Comparisons

- [vs ChatGPT](https://twent.xyz/vs/chatgpt)
- [vs Claude](https://twent.xyz/vs/claude)
- [vs Gemini](https://twent.xyz/vs/gemini)
- [vs n8n](https://twent.xyz/vs/n8n)
`,

  docs: (page) => `# ${page.title}

> ${page.description}

## Twent Documentation

### Getting Started

1. Download the APK from https://twent.xyz
2. Install on Android 8.0+ (no root required)
3. Launch Twent and start chatting

### Core Concepts

#### AI Agent
Twent's AI agent can see your screen, interact with any app, and execute tasks on your behalf. It uses a floating chat bubble overlay for easy access.

#### Ubuntu Terminal
Access a full Ubuntu 24.04 LTS terminal on your Android device. Run Python scripts, use Git, SSH into servers — all from your phone.

#### Skills
Skills are behavior bundles that give your AI instant expertise. Install a code review skill and it knows how to analyze diffs. One tap, new capability unlocked.

#### MCP Servers
Model Context Protocol servers plug your AI into GitHub, Slack, Notion, databases — any tool with an API.

#### Memory
Every conversation, preference, and piece of context gets stored in a local knowledge graph. Close the app, come back next week — your AI knows exactly where you left off.

### Automation

Twent can automate any Android app through UI interaction:
- Tap buttons, fill forms, navigate menus
- Extract data from any app
- Chain tools into automated pipelines
- Morning routines, file management, social posting

### Developer Tools

- Claude Code integration for serious refactoring
- OpenAI Codex for quick scripts
- Full Git CLI
- SSH client and server
- VS Code Server support

### Privacy

- All data stays on your device
- BYOK — Bring Your Own API keys (encrypted locally)
- Zero telemetry, zero tracking
- Local GGUF models via MNN

### Pricing

Everything is free. No credit card required.

## Related Pages

- [Home](https://twent.xyz/)
- [Pricing](https://twent.xyz/pricing)
- [AI Agent for Developers](https://twent.xyz/ai-agent-for-developers)
`,

  changelog: (page) => `# ${page.title}

> ${page.description}

## Changelog

All notable changes to Twent will be documented here.

### What's New

#### Version Updates
- See the full changelog at https://twent.xyz/changelog

## Download

Get the latest version at https://twent.xyz
`,

  legal: (page) => `# ${page.title}

> ${page.description}

## Legal Information

For full legal terms, visit:
- [Privacy Policy](https://twent.xyz/privacy)
- [Terms of Service](https://twent.xyz/terms)

## Summary

Twent is a free product provided as-is. We don't collect telemetry or share user data.
`,

  default: (page) => `# ${page.title}

> ${page.description}

## About Twent

Twent is a personal agentic AI OS for Android that combines a full Ubuntu 24.04 terminal, local AI model execution, and deep system automation.

## Key Features

- AI agent that can tap, swipe, type on any app
- Full Ubuntu 24.04 terminal on Android
- Local AI with privacy (BYOK, offline models)
- Claude Code, OpenAI Codex integration
- MCP servers and Composio integrations
- Zero telemetry

## Get Started

Download at https://twent.xyz — direct APK, no Play Store required.
`,
};

// Estimate token count (approximation — per Dualmark spec)
function estimateTokens(text) {
  // Rough approximation: ~4 chars per token for English
  return Math.ceil(text.length / 4);
}

// Generate markdown for a page
function generateMarkdown(page) {
  const template = templates[page.type] || templates.default;
  return template(page);
}

// Main
function main() {
  const outDir = join(ROOT, 'functions');
  mkdirSync(outDir, { recursive: true });

  // Copy page data for the Pages Function to use
  const pagesJson = JSON.stringify(PAGES, null, 2);
  writeFileSync(join(outDir, 'pages.json'), pagesJson);

  // Also write markdown twins to public directory for direct .md URL access
  const publicDir = join(ROOT, 'public');
  
  PAGES.forEach((page) => {
    const md = generateMarkdown(page);
    const tokens = estimateTokens(md);
    
    // Add dualmark metadata block at top
    const metaBlock = `---\ntitle: ${page.title}\ndescription: ${page.description}\ntype: ${page.type}\nai-readability:\n  tokens: ${tokens}\n  score: 100\n  level: Advanced\n---\n\n`;
    
    const fullMd = metaBlock + md;
    
    // Determine output path
    const slug = page.slug;
    let outPath;
    
    if (slug === 'index') {
      outPath = join(publicDir, 'index.md');
    } else {
      // Convert slug to path: vs/chatgpt -> vs/chatgpt.md
      const pathParts = slug.split('/');
      outPath = join(publicDir, ...pathParts) + '.md';
    }
    
    // Ensure directory exists
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, fullMd);
    
    console.log(`Generated: ${outPath} (${tokens} tokens)`);
  });

  console.log(`\n✓ Generated ${PAGES.length} markdown twins`);
  console.log(`\nNote: The Cloudflare Pages Function (functions/_middleware.js)`);
  console.log(`handles content negotiation. Markdown files in public/ serve as`);
  console.log(`fallback for direct .md URL access.`);
}

main();